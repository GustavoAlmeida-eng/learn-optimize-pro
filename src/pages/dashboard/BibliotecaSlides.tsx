import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Presentation, Download, ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  { id: 1, titulo: "Present Perfect", materia: "Inglês", arquivo: "present-perfect.pptx" },
  { id: 2, titulo: "Phrasal Verbs", materia: "Inglês", arquivo: "phrasal-verbs.pptx" },
  { id: 3, titulo: "Verb Tenses", materia: "Inglês", arquivo: "verb-tenses.pptx" },
  { id: 4, titulo: "Pretérito Perfecto", materia: "Espanhol", arquivo: "preterito-perfecto.pptx" },
  { id: 5, titulo: "Verbos Irregulares", materia: "Espanhol", arquivo: "verbos-irregulares.pptx" },
  { id: 6, titulo: "Estratificação Social", materia: "Sociologia", arquivo: "estratificacao.pptx" },
  { id: 7, titulo: "Movimentos Sociais", materia: "Sociologia", arquivo: "movimentos-sociais.pptx" },
  { id: 8, titulo: "Cultura e Sociedade", materia: "Sociologia", arquivo: "cultura-sociedade.pptx" },
  { id: 9, titulo: "Dissertação Argumentativa", materia: "Redação", arquivo: "dissertacao.pptx" },
  { id: 10, titulo: "Coesão e Coerência", materia: "Redação", arquivo: "coesao-coerencia.pptx" },
];

const BibliotecaSlides = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard/biblioteca")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2 flex items-center gap-2">
              <Presentation className="h-8 w-8 text-accent" />
              Apresentações em Slides
            </h1>
            <p className="text-muted-foreground">
              Apresentações visuais e didáticas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((slide) => (
            <Card key={slide.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{slide.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground">{slide.materia}</p>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BibliotecaSlides;
