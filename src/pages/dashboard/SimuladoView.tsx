import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

interface Questao {
  id: string;
  numero: number;
  materia: string;
  conteudo: string;
  enunciado: string;
  alternativas: string[];
  resposta_correta: number;
  resposta_usuario: number | null;
}

const SimuladoView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [simulado, setSimulado] = useState<any>(null);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSimulado();
  }, [id]);

  const fetchSimulado = async () => {
    try {
      const { data: simuladoData, error: simuladoError } = await supabase
        .from('simulados')
        .select('*')
        .eq('id', id)
        .single();

      if (simuladoError) throw simuladoError;

      const { data: questoesData, error: questoesError } = await supabase
        .from('questoes_simulado')
        .select('*')
        .eq('simulado_id', id)
        .order('numero');

      if (questoesError) throw questoesError;

      setSimulado(simuladoData);
      const parsedQuestoes = questoesData.map((q: any) => ({
        ...q,
        alternativas: JSON.parse(q.alternativas)
      }));
      setQuestoes(parsedQuestoes);

      // Load existing answers
      const existingAnswers: Record<string, number> = {};
      questoesData.forEach((q: any) => {
        if (q.resposta_usuario !== null) {
          existingAnswers[q.id] = q.resposta_usuario;
        }
      });
      setRespostas(existingAnswers);
    } catch (error) {
      console.error('Error fetching simulado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o simulado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResposta = (questaoId: string, alternativaIndex: number) => {
    setRespostas({ ...respostas, [questaoId]: alternativaIndex });
  };

  const handleSubmit = async () => {
    if (Object.keys(respostas).length < questoes.length) {
      toast({
        title: "Atenção",
        description: "Responda todas as questões antes de finalizar",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      // Update cada questão com resposta
      for (const [questaoId, respostaUsuario] of Object.entries(respostas)) {
        const questao = questoes.find(q => q.id === questaoId);
        const correta = questao?.resposta_correta === respostaUsuario;

        await supabase
          .from('questoes_simulado')
          .update({
            resposta_usuario: respostaUsuario,
            correta
          })
          .eq('id', questaoId);
      }

      // Calcular acertos e atualizar simulado
      const acertos = questoes.filter((q) => {
        return q.resposta_correta === respostas[q.id];
      }).length;

      const nota = Math.round((acertos / questoes.length) * 1000);

      await supabase
        .from('simulados')
        .update({
          status: 'concluido',
          questoes_respondidas: questoes.length,
          acertos,
          nota,
          completed_at: new Date().toISOString()
        })
        .eq('id', id);

      toast({
        title: "Simulado concluído!",
        description: `Você acertou ${acertos} de ${questoes.length} questões!`
      });

      navigate('/dashboard/historico');
    } catch (error) {
      console.error('Error submitting simulado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível finalizar o simulado",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard/historico')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">{simulado?.titulo}</h1>
          <p className="text-muted-foreground">
            {simulado?.total_questoes} questões • Status: {simulado?.status === 'concluido' ? 'Concluído' : 'Em andamento'}
          </p>
        </div>

        <div className="space-y-6">
          {questoes.map((questao) => (
            <Card key={questao.id}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Questão {questao.numero} - {questao.materia}</span>
                  {respostas[questao.id] !== undefined && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{questao.conteudo}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-medium">{questao.enunciado}</p>
                <RadioGroup
                  value={respostas[questao.id]?.toString()}
                  onValueChange={(value) => handleResposta(questao.id, parseInt(value))}
                  disabled={simulado?.status === 'concluido'}
                >
                  {questao.alternativas.map((alt, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg border">
                      <RadioGroupItem value={idx.toString()} id={`q${questao.id}-${idx}`} />
                      <Label htmlFor={`q${questao.id}-${idx}`} className="cursor-pointer flex-1">
                        {alt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {simulado?.status !== 'concluido' && (
            <div className="flex justify-end gap-4">
              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={submitting || Object.keys(respostas).length < questoes.length}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finalizando...
                  </>
                ) : (
                  'Finalizar Simulado'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SimuladoView;