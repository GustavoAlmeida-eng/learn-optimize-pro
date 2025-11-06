import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";

interface Questao {
  numero: number;
  materia: string;
  conteudo: string;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
}

const QuestoesView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestoes();
  }, [id]);

  const fetchQuestoes = async () => {
    try {
      const { data, error } = await supabase
        .from('questoes_geradas')
        .select('questoes')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setQuestoes(data.questoes as unknown as Questao[]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as questões",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResposta = (questaoNumero: number, alternativaIndex: number) => {
    setRespostas({ ...respostas, [questaoNumero]: alternativaIndex });
  };

  const handleVerificar = () => {
    if (Object.keys(respostas).length < questoes.length) {
      toast({
        title: "Atenção",
        description: "Responda todas as questões antes de verificar",
        variant: "destructive",
      });
      return;
    }
    setMostrarResultado(true);
    
    const acertos = questoes.filter(q => respostas[q.numero] === q.respostaCorreta).length;
    toast({
      title: "Resultado",
      description: `Você acertou ${acertos} de ${questoes.length} questões!`,
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard/questoes")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Questões Geradas</h1>
            <p className="text-muted-foreground">
              Responda todas as questões e clique em "Verificar Respostas"
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {questoes.map((questao) => (
            <Card key={questao.numero}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{questao.materia}</Badge>
                  <Badge variant="secondary">{questao.conteudo}</Badge>
                </div>
                <CardTitle className="text-lg">Questão {questao.numero}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-medium whitespace-pre-line">{questao.enunciado}</p>
                <RadioGroup
                  value={respostas[questao.numero]?.toString()}
                  onValueChange={(value) => handleResposta(questao.numero, parseInt(value))}
                  disabled={mostrarResultado}
                >
                  {questao.alternativas.map((alt, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        mostrarResultado && idx === questao.respostaCorreta
                          ? "bg-green-50 border-green-500 dark:bg-green-950/20"
                          : mostrarResultado &&
                            respostas[questao.numero] === idx &&
                            idx !== questao.respostaCorreta
                          ? "bg-red-50 border-red-500 dark:bg-red-950/20"
                          : "bg-background"
                      }`}
                    >
                      <RadioGroupItem value={idx.toString()} id={`q${questao.numero}-${idx}`} />
                      <Label htmlFor={`q${questao.numero}-${idx}`} className="cursor-pointer flex-1">
                        {alt}
                        {mostrarResultado && idx === questao.respostaCorreta && (
                          <span className="ml-2 text-green-600 dark:text-green-400 font-medium">
                            (Correta)
                          </span>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {!mostrarResultado && (
          <div className="flex justify-center">
            <Button onClick={handleVerificar} size="lg">
              Verificar Respostas
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuestoesView;
