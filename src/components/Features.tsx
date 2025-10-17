import { CheckCircle, Target, TrendingUp } from "lucide-react";
import featureAnalytics from "@/assets/feature-analytics.jpg";
import featureQuestions from "@/assets/feature-questions.jpg";
import featurePersonalized from "@/assets/feature-personalized.jpg";

const features = [
  {
    icon: Target,
    title: "Questões Personalizadas",
    description:
      "Escolha entre estudos gerais ou específicos. Nossa plataforma adapta as questões ao seu nível e objetivos de aprendizado.",
    image: featureQuestions,
    gradient: "from-primary to-primary-glow",
  },
  {
    icon: TrendingUp,
    title: "Análise de Desempenho",
    description:
      "Acompanhe sua evolução em tempo real com estatísticas detalhadas. Identifique pontos fortes e áreas que precisam de mais atenção.",
    image: featureAnalytics,
    gradient: "from-secondary to-primary",
  },
  {
    icon: CheckCircle,
    title: "Simulados Realistas",
    description:
      "Prepare-se com simulados que medem seu conhecimento de forma abrangente. Cada simulado contém 25 questões cuidadosamente selecionadas.",
    image: featurePersonalized,
    gradient: "from-accent to-secondary",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por Que Escolher Nossa Plataforma?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologia educacional de ponta para maximizar seu potencial
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-16 items-center animate-slide-up`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity`}
                    />
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="relative rounded-2xl shadow-lg w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
