import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3,
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  Library,
  Settings,
  CreditCard,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [planType, setPlanType] = useState<'enem' | 'regular' | null>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Buscar o tipo de plano do usuário
        const { data: profileData } = await supabase
          .from('profiles')
          .select('plan_type')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profileData) {
          setPlanType(profileData.plan_type as 'enem' | 'regular');
        }

        // Verificar se o usuário tem uma assinatura ativa
        const { data: subscriptionData, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();

        if (subscriptionData && !error) {
          setHasActiveSubscription(true);
        } else {
          setHasActiveSubscription(false);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user, navigate, toast]);

  const allMenuItems = [
    {
      title: "Novo Simulado Personalizado",
      description: planType === 'enem' 
        ? "Configure simulados para ENEM e vestibulares"
        : "Configure simulados do ensino médio",
      icon: GraduationCap,
      path: "/dashboard/novo-simulado",
      color: "bg-primary/10 text-primary",
      requiresSubscription: true,
    },
    {
      title: "Análise de Desempenho",
      description: "Veja estatísticas detalhadas e seu progresso",
      icon: BarChart3,
      path: "/dashboard/desempenho",
      color: "bg-secondary/10 text-secondary",
      requiresSubscription: true,
    },
    {
      title: "Meus Simulados",
      description: "Revise simulados anteriores e veja correções",
      icon: Clock,
      path: "/dashboard/historico",
      color: "bg-accent/10 text-accent",
      requiresSubscription: true,
    },
    {
      title: "Biblioteca de Conteúdo",
      description: "Acesse mapas mentais, resumos e slides",
      icon: Library,
      path: "/dashboard/biblioteca",
      color: "bg-primary/10 text-primary",
      requiresSubscription: true,
    },
    {
      title: "Buscar Questões",
      description: planType === 'enem'
        ? "Questões específicas de ENEM e vestibulares"
        : "Questões do ensino médio por disciplina",
      icon: BookOpen,
      path: "/dashboard/questoes",
      color: "bg-secondary/10 text-secondary",
      requiresSubscription: true,
    },
    {
      title: "Minha Conta",
      description: "Atualize dados pessoais e preferências",
      icon: Settings,
      path: "/dashboard/configuracoes",
      color: "bg-accent/10 text-accent",
      requiresSubscription: false,
    },
    {
      title: "Minha Assinatura",
      description: "Gerencie planos e faturas",
      icon: CreditCard,
      path: "/dashboard/assinatura",
      color: "bg-primary/10 text-primary",
      requiresSubscription: false,
    },
    {
      title: "Ajuda / Suporte",
      description: "FAQ, tutoriais e contato com suporte",
      icon: HelpCircle,
      path: "/dashboard/ajuda",
      color: "bg-secondary/10 text-secondary",
      requiresSubscription: false,
    },
  ];

  const menuItems = hasActiveSubscription 
    ? allMenuItems 
    : allMenuItems.filter(item => !item.requiresSubscription);

  const greetingMessage = planType === 'enem' 
    ? "Preparado para conquistar sua aprovação? 🎯"
    : "Pronto para aprender mais hoje? 📚";

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-lg">Carregando...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {!hasActiveSubscription && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium">
              Você está no modo de avaliação. Para acessar todos os recursos, assine um plano na seção "Minha Assinatura".
            </p>
          </div>
        )}
        
        <div className={`mb-8 p-6 rounded-lg ${
          planType === 'enem' 
            ? 'bg-gradient-to-r from-primary/10 to-primary/5' 
            : 'bg-gradient-to-r from-secondary/10 to-secondary/5'
        }`}>
          <h2 className="text-3xl font-heading font-bold mb-2">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-lg text-muted-foreground">
            {greetingMessage}
          </p>
          {planType && (
            <p className="text-sm text-muted-foreground mt-2">
              Plano: <span className="font-semibold">
                {planType === 'enem' ? 'ENEM e Vestibulares' : 'Ensino Regular'}
              </span>
            </p>
          )}
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
