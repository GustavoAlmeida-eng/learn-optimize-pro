import Header from "@/components/Header";
import VideoSection from "@/components/VideoSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, BookOpen, Brain, Users } from "lucide-react";
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
              Aprendizado Contínuo no Ensino Regular
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up-delay-1">
              Acompanhe o conteúdo escolar, reforce seu aprendizado e prepare-se para
              as provas com exercícios organizados por série e disciplina.
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
                <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  5000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Exercícios Escolares
                </div>
              </div>
              <div>
                <Brain className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  90%
                </div>
                <div className="text-sm text-muted-foreground">
                  Melhoria nas Notas
                </div>
              </div>
              <div>
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  3k+
                </div>
                <div className="text-sm text-muted-foreground">
                  Alunos Ativos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSection />
      <Features />
      <HowItWorks />
      <PricingPlans planType="regular" />
      <FAQ />
      <Footer />
    </div>
  );
};

export default IndexRegular;
