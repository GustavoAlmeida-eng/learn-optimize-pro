import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Seleção de planos */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Escolha Sua Jornada de Estudos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temos planos específicos para cada objetivo. Qual é o seu?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate('/enem')}
            >
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-center">ENEM e Vestibulares</CardTitle>
                <CardDescription className="text-center">
                  Prepare-se para conquistar sua vaga na universidade
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Simulados realistas do ENEM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Questões de provas anteriores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Análise comparativa com médias nacionais</span>
                  </li>
                </ul>
                <Button size="lg" className="w-full group">
                  Ver Planos ENEM
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-secondary"
              onClick={() => navigate('/regular')}
            >
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl text-center">Ensino Regular</CardTitle>
                <CardDescription className="text-center">
                  Reforce o aprendizado escolar e melhore suas notas
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span>Exercícios por série e disciplina</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span>Conteúdo alinhado com currículo escolar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span>Acompanhamento de evolução</span>
                  </li>
                </ul>
                <Button size="lg" variant="secondary" className="w-full group">
                  Ver Planos Regular
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
