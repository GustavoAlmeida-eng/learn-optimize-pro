import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Eye, ArrowLeft } from "lucide-react";

interface QuestoesGeradas {
  id: string;
  created_at: string;
  tipo: string;
  serie_ou_vestibular: string;
  materias: any;
  conteudos: any;
  questoes: any;
}

const QuestoesHistorico = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questoesGeradas, setQuestoesGeradas] = useState<QuestoesGeradas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestoesHistorico();
  }, []);

  const fetchQuestoesHistorico = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('questoes_geradas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestoesGeradas(data || []);
    } catch (error) {
      console.error('Error fetching questions history:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o histórico",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-heading font-bold mb-2">Histórico de Questões</h1>
            <p className="text-muted-foreground">
              Acesse questões geradas anteriormente
            </p>
          </div>
        </div>

        {questoesGeradas.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center mb-4">
                Você ainda não gerou nenhuma questão.
              </p>
              <Button onClick={() => navigate("/dashboard/questoes")}>
                Gerar Questões
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {questoesGeradas.map((item) => {
              const dataFormatada = new Date(item.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {item.tipo === 'enem' ? item.serie_ou_vestibular : `${item.serie_ou_vestibular}º Ano`}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          Gerado em {dataFormatada}
                        </CardDescription>
                      </div>
                      <Badge>{item.questoes.length} questões</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Matérias:</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(item.materias) ? (
                          item.materias.map((materia: string) => (
                            <Badge key={materia} variant="outline">
                              {materia}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">-</Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/dashboard/questoes/${item.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Questões
                    </Button>
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

export default QuestoesHistorico;
