import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Presentation, ArrowLeft, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Slide {
  numero: number;
  titulo: string;
  conteudo: string;
  notas?: string;
}

interface Slides {
  id: string;
  titulo: string;
  materia: string;
  conteudo: Slide[];
}

const conteudosParaGerar = [
  { titulo: "Funções Matemáticas", materia: "Matemática" },
  { titulo: "Geometria Analítica", materia: "Matemática" },
  { titulo: "Leis de Newton", materia: "Física" },
  { titulo: "Eletromagnetismo", materia: "Física" },
  { titulo: "Química Orgânica", materia: "Química" },
  { titulo: "Equilíbrio Químico", materia: "Química" },
  { titulo: "Genética e Hereditariedade", materia: "Biologia" },
  { titulo: "Ecossistemas", materia: "Biologia" },
  { titulo: "Primeira Guerra Mundial", materia: "História" },
  { titulo: "Revolução Francesa", materia: "História" },
  { titulo: "Climatologia e Tempo", materia: "Geografia" },
  { titulo: "Globalização", materia: "Geografia" },
  { titulo: "Análise Sintática", materia: "Português" },
  { titulo: "Figuras de Linguagem", materia: "Português" },
  { titulo: "Present Perfect", materia: "Inglês" },
  { titulo: "Conditional Sentences", materia: "Inglês" },
  { titulo: "Teoria Platônica", materia: "Filosofia" },
  { titulo: "Ética e Moral", materia: "Filosofia" },
  { titulo: "Classes Sociais", materia: "Sociologia" },
  { titulo: "Cultura e Sociedade", materia: "Sociologia" },
];

const BibliotecaSlides = () => {
  const navigate = useNavigate();
  const [slidesCollection, setSlidesCollection] = useState<Slides[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedSlides, setSelectedSlides] = useState<Slides | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchSlides();
    checkAndGenerateContent();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase.from("slides").select("*").order("materia", { ascending: true });
      if (error) throw error;
      setSlidesCollection(data || []);
    } catch (error) {
      console.error("Erro ao buscar slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndGenerateContent = async () => {
    try {
      const { data: existing } = await supabase.from("slides").select("id");
      if (!existing || existing.length === 0) {
        setGenerating(true);
        await generateAllContent();
      }
    } catch (error) {
      console.error("Erro ao verificar conteúdo:", error);
    }
  };

  const generateAllContent = async () => {
    let successCount = 0;
    for (const item of conteudosParaGerar) {
      try {
        const { error } = await supabase.functions.invoke("gerar-conteudo-educacional", {
          body: { tipo: "slide", materia: item.materia, titulo: item.titulo },
        });
        if (!error) successCount++;
      } catch (error) {
        console.error(`Erro ao gerar ${item.titulo}:`, error);
      }
    }
    setGenerating(false);
    if (successCount > 0) {
      toast.success(`${successCount} apresentações geradas com sucesso!`);
      fetchSlides();
    }
  };

  const handleOpenSlides = (slides: Slides) => {
    setSelectedSlides(slides);
    setCurrentSlideIndex(0);
    setDialogOpen(true);
  };

  if (loading || generating) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">{generating ? "Gerando slides com IA..." : "Carregando..."}</p>
        </div>
      </DashboardLayout>
    );
  }

  const currentSlide = selectedSlides?.conteudo[currentSlideIndex];

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
              Slides
            </h1>
            <p className="text-muted-foreground">Apresentações completas geradas por IA</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slidesCollection.map((slides) => (
            <Card key={slides.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{slides.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground">{slides.materia}</p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="sm" onClick={() => handleOpenSlides(slides)}>
                  Abrir Apresentação
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedSlides?.titulo}</DialogTitle>
            </DialogHeader>
            {currentSlide && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-center">{currentSlide.titulo}</h2>
                  <div className="text-lg whitespace-pre-line text-center max-w-3xl">{currentSlide.conteudo}</div>
                  {currentSlide.notas && (
                    <div className="mt-6 text-sm text-muted-foreground italic">
                      <p><strong>Notas:</strong> {currentSlide.notas}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Button variant="outline" onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)} disabled={currentSlideIndex === 0}>
                    <ChevronLeft className="h-4 w-4 mr-2" />Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Slide {currentSlideIndex + 1} de {selectedSlides?.conteudo.length}
                  </span>
                  <Button variant="outline" onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)} disabled={!selectedSlides || currentSlideIndex === selectedSlides.conteudo.length - 1}>
                    Próximo<ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default BibliotecaSlides;
