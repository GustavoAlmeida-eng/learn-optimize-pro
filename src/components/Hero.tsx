import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVideo = () => {
    document.getElementById("video")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Students studying"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-slide-up">
            Otimize Seus Estudos com Inteligência
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up-delay-1">
            Meça seu conhecimento de forma precisa e evolua com questões
            personalizadas. Do geral ao específico, conquiste seus objetivos acadêmicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <Button
              size="xl"
              variant="hero"
              onClick={scrollToPlans}
              className="group"
            >
              Começar Agora
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={scrollToVideo}
              className="group"
            >
              <PlayCircle className="group-hover:scale-110 transition-transform" />
              Assistir Vídeo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up-delay-3">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                10k+
              </div>
              <div className="text-sm text-muted-foreground">
                Questões Disponíveis
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                95%
              </div>
              <div className="text-sm text-muted-foreground">
                Taxa de Aprovação
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                5k+
              </div>
              <div className="text-sm text-muted-foreground">
                Estudantes Ativos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
