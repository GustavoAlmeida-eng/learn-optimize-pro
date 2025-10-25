import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  HelpCircle,
  Library,
  LogOut,
  Settings,
  CreditCard,
} from "lucide-react";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Carregando...</div>
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    {
      title: "Novo Simulado Personalizado",
      description: "Configure e comece uma nova sessão de estudo com questões",
      icon: GraduationCap,
      path: "/dashboard/novo-simulado",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Análise de Desempenho",
      description: "Veja estatísticas detalhadas e seu progresso",
      icon: BarChart3,
      path: "/dashboard/desempenho",
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Meus Simulados",
      description: "Revise simulados anteriores e veja correções",
      icon: Clock,
      path: "/dashboard/historico",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Biblioteca de Conteúdo",
      description: "Acesse mapas mentais, resumos e slides",
      icon: Library,
      path: "/dashboard/biblioteca",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Buscar Questões",
      description: "Encontre questões específicas por tópico",
      icon: BookOpen,
      path: "/dashboard/questoes",
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Minha Conta",
      description: "Atualize dados pessoais e preferências",
      icon: Settings,
      path: "/dashboard/configuracoes",
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Minha Assinatura",
      description: "Gerencie planos e faturas",
      icon: CreditCard,
      path: "/dashboard/assinatura",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Ajuda / Suporte",
      description: "FAQ, tutoriais e contato com suporte",
      icon: HelpCircle,
      path: "/dashboard/ajuda",
      color: "bg-secondary/10 text-secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">EstudaMax</h1>
            <p className="text-sm text-muted-foreground">Área do Cliente</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button variant="outline" onClick={signOut} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-bold mb-2">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-muted-foreground">
            Escolha uma opção abaixo para continuar seus estudos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-border group"
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-heading">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                    Acessar →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
