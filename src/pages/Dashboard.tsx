import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
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
  const [planType, setPlanType] = useState<'enem' | 'regular' | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('plan_type')
          .eq('id', user.id)
          .maybeSingle();
        
        if (data) {
          setPlanType(data.plan_type as 'enem' | 'regular');
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const menuItems = [
    {
      title: "Novo Simulado Personalizado",
      description: planType === 'enem' 
        ? "Configure simulados para ENEM e vestibulares"
        : "Configure simulados do ensino médio",
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
      description: planType === 'enem'
        ? "Questões específicas de ENEM e vestibulares"
        : "Questões do ensino médio por disciplina",
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

  const greetingMessage = planType === 'enem' 
    ? "Preparado para conquistar sua aprovação? 🎯"
    : "Pronto para aprender mais hoje? 📚";

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
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
