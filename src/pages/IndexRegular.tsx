import Header from "@/components/Header";
import VideoSectionRegular from "@/components/VideoSectionRegular";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, PlayCircle, BookOpen, GraduationCap, Target, TrendingUp, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const IndexRegular = () => {
  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVideo = () => {
    document.getElementById("video")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero personalizado para Ensino Regular */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt="Students studying"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-accent/10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-slide-up">
              Transforme Suas Notas com Estudo Inteligente
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up-delay-1">
              Domine todas as matérias do ensino fundamental e médio com exercícios organizados
              por série, disciplina e nível de dificuldade. Aprenda no seu ritmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
              <Button
                size="lg"
                onClick={scrollToPlans}
                className="group"
              >
                Começar a Estudar
                <ArrowRight className="group-hover:translate-x-1 transition-transform ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToVideo}
                className="group"
              >
                <PlayCircle className="group-hover:scale-110 transition-transform mr-2" />
                Ver Demonstração
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up-delay-3">
              <div>
                <GraduationCap className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  8000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Exercícios por Série
                </div>
              </div>
              <div>
                <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  95%
                </div>
                <div className="text-sm text-muted-foreground">
                  Aproveitamento Escolar
                </div>
              </div>
              <div>
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  5k+
                </div>
                <div className="text-sm text-muted-foreground">
                  Estudantes Regulares
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSectionRegular />
      <Features />
      
      {/* Nova seção: Depoimentos */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O Que Nossos Alunos Dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "Minhas notas melhoraram muito desde que comecei a usar a plataforma. Os exercícios são excelentes!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">LC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lucas Costa</p>
                    <p className="text-sm text-muted-foreground">Aluno do 2º Ano - EM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "Adoro os vídeos explicativos! Eles me ajudam a entender as matérias de um jeito mais fácil."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">BM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Beatriz Mendes</p>
                    <p className="text-sm text-muted-foreground">Aluna do 1º Ano - EM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "A plataforma é muito organizada. Consigo estudar todas as matérias num só lugar!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">PS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Pedro Santos</p>
                    <p className="text-sm text-muted-foreground">Aluno do 3º Ano - EM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />
      
      {/* Nova seção: Vantagens da Plataforma */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Vantagens da Nossa Plataforma
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Todas as Matérias</h3>
              <p className="text-muted-foreground">
                Conteúdo completo de todas as disciplinas do Ensino Médio
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exercícios Práticos</h3>
              <p className="text-muted-foreground">
                Milhares de questões para treinar e fixar o conteúdo
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Acompanhamento</h3>
              <p className="text-muted-foreground">
                Monitore seu progresso em tempo real com relatórios detalhados
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Videoaulas</h3>
              <p className="text-muted-foreground">
                Aprenda com videoaulas explicativas de alta qualidade
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingPlans planType="regular" />
      <FAQ />
      <Footer />
    </div>
  );
};

export default IndexRegular;
