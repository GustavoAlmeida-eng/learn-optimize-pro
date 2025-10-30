import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, GraduationCap, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get('plan');
  const fromCheckout = searchParams.get('fromCheckout') === 'true';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [planType, setPlanType] = useState<'enem' | 'regular'>(
    (planFromUrl === 'regular' ? 'regular' : 'enem') as 'enem' | 'regular'
  );
  const [activeTab, setActiveTab] = useState(fromCheckout ? "signup" : "login");
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "Login realizado!",
        description: "Redirecionando para o dashboard...",
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password, fullName);
      
      // Verificar se há assinatura pendente do checkout
      const pendingSubscription = sessionStorage.getItem('pendingSubscription');
      
      if (pendingSubscription) {
        const subscriptionData = JSON.parse(pendingSubscription);
        
        // Aguardar para garantir que o usuário foi criado
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Buscar o usuário recém criado
        const { data: { user: newUser } } = await supabase.auth.getUser();
        
        if (newUser) {
          // Atualizar o tipo de plano no perfil
          await supabase
            .from('profiles')
            .update({ plan_type: subscriptionData.plan_type })
            .eq('id', newUser.id);

          // Criar assinatura
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 1);
          
          await supabase.from('subscriptions').insert({
            user_id: newUser.id,
            plan_name: subscriptionData.plan_name,
            plan_price: subscriptionData.plan_price,
            status: 'active',
            payment_method: 'credit_card',
            expires_at: expiresAt.toISOString(),
          });
          
          sessionStorage.removeItem('pendingSubscription');
          
          toast({
            title: "Conta criada com sucesso!",
            description: "Sua assinatura está ativa. Redirecionando para o dashboard...",
          });
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
          return;
        }
      }
      
      // Fluxo normal sem assinatura pendente
      // Atualizar metadata com tipo de plano
      await supabase.auth.updateUser({
        data: { plan_type: planType }
      });

      toast({
        title: "Conta criada com sucesso!",
        description: "Redirecionando para escolher seu plano...",
      });

      // Redirecionar para página de planos
      setTimeout(() => {
        navigate(`/${planType}#pricing`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <LogIn className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-heading text-center">
              Área do Cliente
            </CardTitle>
            <CardDescription className="text-center">
              Entre ou crie sua conta para acessar a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome Completo</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Seu nome"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Escolha seu plano</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setPlanType('enem')}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                          planType === 'enem'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <GraduationCap className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-semibold">ENEM</h3>
                        <p className="text-xs text-muted-foreground">Vestibulares</p>
                      </div>

                      <div
                        onClick={() => setPlanType('regular')}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                          planType === 'regular'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <BookOpen className="h-8 w-8 mb-2 text-primary" />
                        <h3 className="font-semibold">Regular</h3>
                        <p className="text-xs text-muted-foreground">Ensino Médio</p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                <a href="/#pricing" className="text-primary hover:underline font-medium">
                  Ver todos os planos disponíveis
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
