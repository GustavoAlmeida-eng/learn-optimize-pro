import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, Brain } from "lucide-react";

const SimuladoAnalise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analise, setAnalise] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchAnalise();
  }, [id]);

  const fetchAnalise = async () => {
    try {
      const { data, error } = await supabase
        .from('analises_ia')
        .select('analise')
        .eq('simulado_id', id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setAnalise(data.analise);
      } else {
        await gerarAnalise();
      }
    } catch (error) {
      console.error('Error fetching analysis:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a análise",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const gerarAnalise = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('analisar-desempenho', {
        body: { simuladoId: id }
      });

      if (error) throw error;
      setAnalise(data.analise);
      
      toast({
        title: "Sucesso!",
        description: "Análise gerada com sucesso!",
      });
    } catch (error) {
      console.error('Error generating analysis:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar a análise. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading || generating) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {generating ? "Gerando análise de desempenho..." : "Carregando..."}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard/historico")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2 flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              Análise de Desempenho IA
            </h1>
            <p className="text-muted-foreground">
              Análise detalhada do seu desempenho no simulado
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Relatório de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-line text-foreground">
                {analise}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SimuladoAnalise;
