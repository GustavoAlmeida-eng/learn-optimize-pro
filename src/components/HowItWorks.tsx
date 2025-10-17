import { BookOpen, Target, BarChart3, Trophy, Lightbulb, Zap } from "lucide-react";

const HowItWorks = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Banco de Questões Completo",
      description: "Acesse milhares de questões organizadas por disciplina, assunto e nível de dificuldade para estudar exatamente o que você precisa."
    },
    {
      icon: Target,
      title: "Estudo Personalizado",
      description: "Escolha estudar de forma geral ou específica. Nossa plataforma se adapta ao seu objetivo, seja ENEM, vestibulares ou aprovação escolar."
    },
    {
      icon: BarChart3,
      title: "Análise de Desempenho",
      description: "Acompanhe sua evolução com relatórios detalhados que mostram seus pontos fortes e as áreas que precisam de mais atenção."
    },
    {
      icon: Trophy,
      title: "Simulados Completos",
      description: "Pratique com simulados de 25 questões que medem seu conhecimento de forma abrangente, preparando você para qualquer prova."
    },
    {
      icon: Lightbulb,
      title: "Aprendizado Inteligente",
      description: "Nossa plataforma identifica suas dificuldades e sugere questões específicas para fortalecer seu conhecimento onde você mais precisa."
    },
    {
      icon: Zap,
      title: "Estude no Seu Ritmo",
      description: "Acesse a plataforma quando e onde quiser. Estude no seu tempo, sem pressão, com total flexibilidade para se adaptar à sua rotina."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Como Funciona Nossa Plataforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra todos os recursos que vão transformar sua forma de estudar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
