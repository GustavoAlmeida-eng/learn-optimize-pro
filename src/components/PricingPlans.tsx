import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const subscriptionPlans = [
  {
    name: "Mensal",
    price: "R$ 49,90",
    period: "/mês",
    description: "Perfeito para começar",
    features: [
      "Acesso ilimitado a questões",
      "Estudo geral e específico",
      "Análise de desempenho",
      "Suporte por email",
    ],
    highlighted: false,
  },
  {
    name: "Semestral",
    price: "R$ 239,90",
    period: "/6 meses",
    description: "Mais popular",
    features: [
      "Tudo do plano Mensal",
      "20% de desconto",
      "Simulados exclusivos",
      "Suporte prioritário",
      "Relatórios avançados",
    ],
    highlighted: true,
    badge: "Mais Vendido",
  },
  {
    name: "Anual",
    price: "R$ 399,90",
    period: "/ano",
    description: "Melhor custo-benefício",
    features: [
      "Tudo do plano Semestral",
      "33% de desconto",
      "Acesso vitalício a atualizações",
      "Mentoria mensal",
      "Certificado de conclusão",
    ],
    highlighted: false,
  },
];

const simuladoPackages = [
  {
    name: "Pacote Básico",
    price: "R$ 29,90",
    description: "Ideal para testar",
    simulados: 2,
    questions: 25,
    features: [
      "2 simulados completos",
      "25 questões cada",
      "Correção detalhada",
      "Acesso por 30 dias",
    ],
  },
  {
    name: "Pacote Intermediário",
    price: "R$ 49,90",
    description: "Para praticar mais",
    simulados: 4,
    questions: 25,
    features: [
      "4 simulados completos",
      "25 questões cada",
      "Correção detalhada",
      "Acesso por 60 dias",
      "Análise de desempenho",
    ],
  },
  {
    name: "Pacote Completo",
    price: "R$ 79,90",
    description: "Preparação intensiva",
    simulados: 8,
    questions: 25,
    features: [
      "8 simulados completos",
      "25 questões cada",
      "Correção detalhada",
      "Acesso por 90 dias",
      "Análise de desempenho",
      "Simulados extras",
    ],
  },
];

const PricingPlans = () => {
  const navigate = useNavigate();

  const handleSubscriptionClick = (plan: typeof subscriptionPlans[0]) => {
    navigate(`/checkout?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price + plan.period)}`);
  };

  const handlePackageClick = (pkg: typeof simuladoPackages[0]) => {
    navigate(`/checkout?plan=${encodeURIComponent(pkg.name)}&price=${encodeURIComponent(pkg.price)}`);
  };

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Subscription Plans */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Planos de Assinatura
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para sua jornada de estudos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative animate-slide-up-delay-${index + 1} ${
                  plan.highlighted
                    ? "border-primary shadow-xl scale-105"
                    : "hover:shadow-lg"
                } transition-all duration-300 hover:-translate-y-2`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.highlighted ? "cta" : "default"}
                    className="w-full"
                    size="lg"
                    onClick={() => handleSubscriptionClick(plan)}
                  >
                    Assinar Agora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Simulado Packages */}
        <div>
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pacotes de Simulados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Teste seu conhecimento com simulados completos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {simuladoPackages.map((pkg, index) => (
              <Card
                key={index}
                className="animate-slide-up hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {pkg.simulados} simulados × {pkg.questions} questões
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => handlePackageClick(pkg)}
                  >
                    Comprar Pacote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
