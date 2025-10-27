import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Brain, Presentation, Download, ExternalLink } from "lucide-react";

const Biblioteca = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">Biblioteca de Conteúdo</h1>
          <p className="text-muted-foreground">
            Acesse materiais de apoio para otimizar seus estudos: mapas mentais organizados,
            resumos práticos e apresentações em slides de todos os conteúdos.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Mapa Geral de Estudos</CardTitle>
                  <CardDescription className="text-base">
                    Visão completa e integrada de todos os conteúdos do currículo
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-muted-foreground">
                Explore a conexão entre todas as matérias e entenda como os conteúdos se relacionam
                para uma compreensão mais profunda.
              </p>
              <div className="flex gap-3">
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir Mapa
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mapas Específicos</CardTitle>
                <CardDescription>
                  Mapas mentais detalhados por matéria e conteúdo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Matemática</p>
                    <p className="text-sm text-muted-foreground">15 mapas disponíveis</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Física</p>
                    <p className="text-sm text-muted-foreground">12 mapas disponíveis</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Química</p>
                    <p className="text-sm text-muted-foreground">14 mapas disponíveis</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Biologia</p>
                    <p className="text-sm text-muted-foreground">18 mapas disponíveis</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    Ver Todos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Resumos</CardTitle>
                <CardDescription>
                  Conteúdos resumidos e diretos ao ponto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">História do Brasil</p>
                    <p className="text-sm text-muted-foreground">20 resumos</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Geografia</p>
                    <p className="text-sm text-muted-foreground">16 resumos</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Literatura</p>
                    <p className="text-sm text-muted-foreground">25 resumos</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Filosofia</p>
                    <p className="text-sm text-muted-foreground">10 resumos</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    Ver Todos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Presentation className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Slides</CardTitle>
                <CardDescription>
                  Apresentações visuais e didáticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Inglês - Grammar</p>
                    <p className="text-sm text-muted-foreground">8 apresentações</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Espanhol</p>
                    <p className="text-sm text-muted-foreground">7 apresentações</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Sociologia</p>
                    <p className="text-sm text-muted-foreground">12 apresentações</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <p className="font-medium">Redação</p>
                    <p className="text-sm text-muted-foreground">6 apresentações</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    Ver Todos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Biblioteca;
