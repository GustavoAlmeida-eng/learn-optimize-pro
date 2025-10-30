import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, PlayCircle, Target, TrendingUp, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const IndexEnem = () => {
  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVideo = () => {
    document.getElementById("video")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero personalizado para ENEM */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt="Students studying"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-slide-up">
              Rumo à Aprovação no ENEM e Vestibulares
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up-delay-1">
              Prepare-se com simulados realistas, questões de provas anteriores e análise
              detalhada do seu desempenho. A sua aprovação começa aqui!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
              <Button
                size="lg"
                onClick={scrollToPlans}
                className="group"
              >
                Começar Preparação
                <ArrowRight className="group-hover:translate-x-1 transition-transform ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToVideo}
                className="group"
              >
                <PlayCircle className="group-hover:scale-110 transition-transform mr-2" />
                Ver Como Funciona
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up-delay-3">
              <div>
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  1000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Questões do ENEM
                </div>
              </div>
              <div>
                <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  95%
                </div>
                <div className="text-sm text-muted-foreground">
                  Taxa de Aprovação
                </div>
              </div>
              <div>
                <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  Top 10
                </div>
                <div className="text-sm text-muted-foreground">
                  Universidades
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSection />
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
                  "Os simulados me ajudaram muito a entender o formato do ENEM. Consegui melhorar minha nota em 200 pontos!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Maria Rodrigues</p>
                    <p className="text-sm text-muted-foreground">Aprovada em Medicina - USP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "A plataforma é muito completa. Gostei especialmente das análises de desempenho que mostram onde preciso melhorar."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">JS</span>
                  </div>
                  <div>
                    <p className="font-semibold">João Silva</p>
                    <p className="text-sm text-muted-foreground">Aprovado em Engenharia - UFMG</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "Recomendo para todos que estão se preparando! O conteúdo é atualizado e muito bem organizado."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">AP</span>
                  </div>
                  <div>
                    <p className="font-semibold">Ana Paula</p>
                    <p className="text-sm text-muted-foreground">Aprovada em Direito - UFRJ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />
      
      {/* Nova seção: Por que escolher o EstudaMax */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por Que Escolher o EstudaMax?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Foco no ENEM</h3>
              <p className="text-muted-foreground">
                Questões e simulados baseados nas provas anteriores do ENEM
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análise Detalhada</h3>
              <p className="text-muted-foreground">
                Relatórios completos sobre seu desempenho e evolução
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professores Experientes</h3>
              <p className="text-muted-foreground">
                Conteúdo elaborado por professores aprovados nas melhores universidades
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sempre Atualizado</h3>
              <p className="text-muted-foreground">
                Novos conteúdos e questões adicionados regularmente
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingPlans planType="enem" />
      <FAQ />
      <Footer />
    </div>
  );
};

export default IndexEnem;
