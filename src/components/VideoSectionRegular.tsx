import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, Award } from "lucide-react";

const VideoSectionRegular = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoContent = [
    {
      id: "matematica",
      title: "Matemática Básica",
      description: "Aprenda os fundamentos essenciais de matemática",
      icon: BookOpen,
      content: "Neste módulo você aprenderá equações, funções, geometria e muito mais. Ideal para reforço escolar e preparação para provas.",
    },
    {
      id: "portugues",
      title: "Português & Redação",
      description: "Domine a gramática e produção textual",
      icon: FileText,
      content: "Desenvolva suas habilidades de interpretação de texto, gramática aplicada e técnicas de redação para melhorar suas notas.",
    },
    {
      id: "ciencias",
      title: "Ciências & Biologia",
      description: "Explore o mundo natural e suas leis",
      icon: Award,
      content: "Conteúdos de ciências naturais, biologia, física e química adaptados para cada série do ensino regular.",
    },
  ];

  return (
    <section id="video" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Como Funciona o EstudaMax Regular
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossos conteúdos interativos e descubra como transformar
              seu aprendizado escolar
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full animate-slide-up">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="overview">
                <Video className="w-4 h-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="materias">
                <BookOpen className="w-4 h-4 mr-2" />
                Matérias
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 hover:scale-110 transition-transform cursor-pointer"
                      onClick={() => setActiveVideo("main")}
                    >
                      <svg
                        className="w-10 h-10 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground font-medium">
                      Clique para assistir a demonstração completa
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <BookOpen className="h-10 w-10 text-secondary mb-2" />
                    <CardTitle>Conteúdo Organizado</CardTitle>
                    <CardDescription>
                      Por série e disciplina
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Exercícios separados do 6º ano do fundamental até o 3º ano do ensino médio,
                      cobrindo todas as matérias do currículo escolar.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Award className="h-10 w-10 text-accent mb-2" />
                    <CardTitle>Acompanhamento</CardTitle>
                    <CardDescription>
                      Monitore sua evolução
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Gráficos detalhados mostram seu progresso em cada matéria,
                      identificando pontos fortes e áreas que precisam de mais atenção.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Video className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Videoaulas</CardTitle>
                    <CardDescription>
                      Aprenda com especialistas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Acesso a videoaulas explicativas de todos os conteúdos,
                      com professores especializados em cada disciplina.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="materias" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                {videoContent.map((item) => (
                  <Card 
                    key={item.id}
                    className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={() => setActiveVideo(item.id)}
                  >
                    <CardHeader>
                      <item.icon className="h-10 w-10 text-primary mb-2" />
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {item.content}
                      </p>
                      <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
                        <Video className="h-6 w-6 text-primary mr-2" />
                        <span className="text-sm font-medium">Clique para ver</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {activeVideo && (
                <Card className="mt-6 border-2 border-primary">
                  <CardHeader>
                    <CardTitle>Prévia do Conteúdo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Video className="h-16 w-16 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Conteúdo em vídeo disponível na área de membros
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default VideoSectionRegular;
