import { useState, useEffect } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, PlayCircle, Eye, CreditCard, Loader2 } from "lucide-react";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Simulado {
  id: string;
  titulo: string;
  created_at: string;
  duracao_minutos: number | null;
  total_questoes: number;
  questoes_respondidas: number;
  acertos: number;
  nota: number | null;
  status: string;
}

const Historico = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hasActiveSubscription, loading } = useSubscriptionCheck();
  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [loadingSimulados, setLoadingSimulados] = useState(true);

  useEffect(() => {
    if (hasActiveSubscription) {
      fetchSimulados();
    }
  }, [hasActiveSubscription]);

  const fetchSimulados = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('simulados')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSimulados(data || []);
    } catch (error) {
      console.error('Error fetching simulados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os simulados",
        variant: "destructive",
      });
    } finally {
      setLoadingSimulados(false);
    }
  };

  if (loading || loadingSimulados) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!hasActiveSubscription) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Acesso Premium Necessário</CardTitle>
              <CardDescription className="text-base">
                Esta funcionalidade está disponível apenas para usuários com plano ativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-muted-foreground">
                Para acessar o histórico de simulados, você precisa ter um plano ativo. 
                Assine agora e tenha acesso completo a todas as funcionalidades da plataforma!
              </p>
              <Button onClick={() => navigate("/dashboard/assinatura")} size="lg">
                Ver Planos Disponíveis
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">Meus Simulados</h1>
          <p className="text-muted-foreground">
            Revise seu histórico de simulados, continue simulados incompletos ou analise seu desempenho.
          </p>
        </div>

        {simulados.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center mb-4">
                Você ainda não criou nenhum simulado.
              </p>
              <Button onClick={() => navigate("/dashboard/novo-simulado")}>
                Criar Primeiro Simulado
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {simulados.map((simulado) => {
              const dataFormatada = new Date(simulado.created_at).toLocaleDateString('pt-BR');
              const taxaAcerto = simulado.questoes_respondidas > 0
                ? Math.round((simulado.acertos / simulado.questoes_respondidas) * 100)
                : 0;

              return (
                <Card key={simulado.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{simulado.titulo}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {dataFormatada}
                          </span>
                          {simulado.duracao_minutos && (
                            <span>{simulado.duracao_minutos} min</span>
                          )}
                          <span>{simulado.total_questoes} questões</span>
                        </CardDescription>
                      </div>
                      <Badge variant={simulado.status === "concluido" ? "default" : "secondary"}>
                        {simulado.status === "concluido" ? "Concluído" : "Incompleto"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Respondidas</p>
                        <p className="text-2xl font-bold text-primary">
                          {simulado.questoes_respondidas}/{simulado.total_questoes}
                        </p>
                      </div>
                      {simulado.status === "concluido" && (
                        <>
                          <div>
                            <p className="text-sm text-muted-foreground">Acertos</p>
                            <p className="text-2xl font-bold text-primary">
                              {simulado.acertos}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Taxa</p>
                            <p className="text-2xl font-bold">
                              {taxaAcerto}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Nota</p>
                            <p className="text-2xl font-bold text-primary">
                              {simulado.nota?.toFixed(0) || "-"}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {simulado.status === "incompleto" ? (
                        <Button
                          className="flex-1"
                          onClick={() => navigate(`/dashboard/simulado/${simulado.id}`)}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Continuar Simulado
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate(`/dashboard/simulado/${simulado.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Analisar Questões
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={() => navigate(`/dashboard/simulado/${simulado.id}/analise`)}
                          >
                            <Brain className="h-4 w-4 mr-2" />
                            Ver Análise IA
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Historico;
