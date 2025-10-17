import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Users, Trophy, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Quem Somos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A EstudaMax é uma plataforma educacional inovadora dedicada a transformar 
            a forma como estudantes se preparam para seus objetivos acadêmicos.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-heading">Nossa Missão</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Capacitar estudantes através de tecnologia educacional inteligente, 
                oferecendo ferramentas personalizadas que medem e desenvolvem o conhecimento 
                de forma precisa e eficiente. Acreditamos que cada estudante tem seu próprio 
                ritmo e necessidades únicas, e nossa plataforma se adapta a isso.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-10">
            O Que Oferecemos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Questões Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Milhares de questões adaptadas ao seu nível de conhecimento, 
                  permitindo estudo do mais geral ao mais específico conforme suas necessidades.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  Simulados Completos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Simulados de 25 questões que medem seu conhecimento de forma abrangente, 
                  preparando você para qualquer desafio acadêmico.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Análise Detalhada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Acompanhe sua evolução com relatórios detalhados que mostram 
                  seus pontos fortes e áreas que precisam de mais atenção.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Flexibilidade Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Seja para ENEM, vestibulares ou estudos regulares, nossa plataforma 
                  se adapta aos seus objetivos e ritmo de estudo.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Plans Overview */}
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2">
            <CardHeader>
              <CardTitle className="text-3xl font-heading text-center">
                Nossos Planos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Planos de Assinatura
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Acesso ilimitado a todas as questões da plataforma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Estatísticas e análises detalhadas de desempenho</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Planos de 1 mês, 6 meses ou 1 ano com descontos progressivos</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Pacotes de Simulados
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Simulados de 25 questões cada, medindo conhecimento geral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Pacotes com 2, 4 ou 8 simulados para prática intensiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ideal para se preparar para provas e vestibulares</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-10 pb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Pronto para Começar?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de estudantes que já estão alcançando seus objetivos com a EstudaMax.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/#pricing")}
                className="text-lg"
              >
                Ver Planos e Preços
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
