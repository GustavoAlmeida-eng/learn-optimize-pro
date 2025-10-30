import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Assinatura = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        const { data } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();
        
        setSubscription(data);
      }
      setLoading(false);
    };

    fetchSubscription();
  }, [user]);

  const handleUpgrade = async () => {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('plan_type')
      .eq('id', user?.id)
      .maybeSingle();
    
    const planRoute = profileData?.plan_type === 'regular' ? '/regular' : '/enem';
    navigate(`${planRoute}#pricing`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Carregando...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Minha Assinatura</h1>
        
        {subscription ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{subscription.plan_name}</CardTitle>
                <Badge>Ativo</Badge>
              </div>
              <CardDescription>
                Expira em: {new Date(subscription.expires_at).toLocaleDateString('pt-BR')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{subscription.plan_price}</p>
              <p className="text-sm text-muted-foreground">
                Método de pagamento: {subscription.payment_method === 'credit_card' ? 'Cartão de Crédito' : 'Outro'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nenhuma assinatura ativa</CardTitle>
              <CardDescription>
                Assine um plano para ter acesso completo a todos os recursos da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleUpgrade} size="lg">
                Ver Planos Disponíveis
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Assinatura;
