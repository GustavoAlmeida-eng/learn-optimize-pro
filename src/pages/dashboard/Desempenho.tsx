import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { materia: "Matemática", acertos: 75, erros: 25 },
  { materia: "Física", acertos: 68, erros: 32 },
  { materia: "Química", acertos: 82, erros: 18 },
  { materia: "Biologia", acertos: 90, erros: 10 },
  { materia: "História", acertos: 85, erros: 15 },
  { materia: "Geografia", acertos: 78, erros: 22 },
];

const evolutionData = [
  { mes: "Jan", nota: 65 },
  { mes: "Fev", nota: 68 },
  { mes: "Mar", nota: 72 },
  { mes: "Abr", nota: 75 },
  { mes: "Mai", nota: 78 },
  { mes: "Jun", nota: 82 },
];

const enemComparisonData = [
  { categoria: "Suas questões", valor: 78 },
  { categoria: "Média ENEM", valor: 65 },
];

const distribuicaoPontos = [
  { nome: "0-400", value: 5 },
  { nome: "400-600", value: 25 },
  { nome: "600-800", value: 45 },
  { nome: "800-1000", value: 25 },
];

const COLORS = ["hsl(197, 83%, 40%)", "hsl(148, 76%, 80%)", "hsl(60, 56%, 91%)", "hsl(220, 20%, 40%)"];

const Desempenho = () => {
  const navigate = useNavigate();
  const { hasActiveSubscription, loading } = useSubscriptionCheck();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-lg">Carregando...</p>
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
                Para visualizar sua análise de desempenho, você precisa ter um plano ativo. 
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
          <h1 className="text-3xl font-heading font-bold mb-2">Análise de Desempenho</h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso através de gráficos detalhados e compare seu desempenho
            com as estatísticas do ENEM. Use estes dados para identificar pontos de melhoria.
          </p>
        </div>

        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList>
            <TabsTrigger value="geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="evolucao">Evolução</TabsTrigger>
            <TabsTrigger value="comparacao">Comparação ENEM</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho por Matéria</CardTitle>
                  <CardDescription>
                    Percentual de acertos e erros em cada disciplina
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="materia" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="acertos" fill="hsl(197, 83%, 40%)" name="Acertos %" />
                      <Bar dataKey="erros" fill="hsl(0, 84%, 60%)" name="Erros %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Pontuação</CardTitle>
                  <CardDescription>
                    Faixa de pontos mais frequente em seus simulados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={distribuicaoPontos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ nome, value }) => `${nome}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {distribuicaoPontos.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">780</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +15 pontos desde o último mês
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Total de Questões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Questões respondidas até hoje
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Taxa de Acerto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">78%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Média geral de acertos
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="evolucao" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução das Notas</CardTitle>
                <CardDescription>
                  Acompanhe o progresso da sua pontuação ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="nota"
                      stroke="hsl(197, 83%, 40%)"
                      strokeWidth={2}
                      name="Nota Média (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparacao" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparação com ENEM</CardTitle>
                <CardDescription>
                  Compare seu desempenho com a média nacional do ENEM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enemComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valor" fill="hsl(197, 83%, 40%)" name="Pontuação %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reincidência de Temas</CardTitle>
                  <CardDescription>
                    Temas que mais aparecem no ENEM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Interpretação de Texto</span>
                      <span className="font-bold">23%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Funções Matemáticas</span>
                      <span className="font-bold">18%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Química Orgânica</span>
                      <span className="font-bold">15%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>História do Brasil</span>
                      <span className="font-bold">14%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notas de Corte</CardTitle>
                  <CardDescription>
                    Principais universidades - Nota mínima
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>USP - Medicina</span>
                      <span className="font-bold">850</span>
                    </li>
                    <li className="flex justify-between">
                      <span>UNICAMP - Engenharia</span>
                      <span className="font-bold">780</span>
                    </li>
                    <li className="flex justify-between">
                      <span>UFMG - Direito</span>
                      <span className="font-bold">750</span>
                    </li>
                    <li className="flex justify-between">
                      <span>UFRJ - Arquitetura</span>
                      <span className="font-bold">720</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Desempenho;
