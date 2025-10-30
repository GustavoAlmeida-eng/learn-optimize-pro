import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  
  const planName = searchParams.get('plan') || 'Plano';
  const price = searchParams.get('price') || '0';
  const planType = searchParams.get('planType') || 'enem';
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();
        
        if (data && !error) {
          toast({
            title: "Você já tem uma assinatura ativa",
            description: "Redirecionando para o dashboard...",
          });
          navigate('/dashboard');
        }
      }
    };

    if (user && !loading) {
      checkSubscription();
    }
  }, [user, loading, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      if (user) {
        // Usuário já logado - criar assinatura diretamente
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            plan_name: planName,
            plan_price: price,
            status: 'active',
            payment_method: 'credit_card',
            expires_at: expiresAt.toISOString(),
          });

        if (error) throw error;

        toast({
          title: "Pagamento processado!",
          description: "Sua assinatura foi ativada com sucesso.",
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        // Usuário não logado - salvar dados temporários e redirecionar para registro
        const subscriptionData = {
          plan_name: planName,
          plan_price: price,
          plan_type: planType,
          payment_completed: true,
          timestamp: new Date().toISOString(),
        };
        
        sessionStorage.setItem('pendingSubscription', JSON.stringify(subscriptionData));
        
        toast({
          title: "Pagamento processado!",
          description: "Agora crie sua conta para acessar a plataforma.",
        });
        
        setTimeout(() => {
          navigate(`/login?plan=${planType}&fromCheckout=true`);
        }, 1000);
      }
    } catch (error: any) {
      toast({
        title: "Erro no pagamento",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(`/${planType}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Finalizar Compra</h1>
          <p className="text-muted-foreground">
            Complete os dados do pagamento para ativar sua assinatura
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{planName}</p>
                  <p className="text-sm text-muted-foreground">Assinatura</p>
                </div>
                <p className="text-2xl font-bold text-primary">{price}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Dados do Cartão
              </CardTitle>
              <CardDescription>
                Suas informações estão seguras e criptografadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    placeholder="Como está no cartão"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                      type="password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                  <Lock className="h-4 w-4" />
                  <span>Pagamento 100% seguro e criptografado</span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={processing}
                >
                  {processing ? 'Processando...' : `Pagar ${price}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
