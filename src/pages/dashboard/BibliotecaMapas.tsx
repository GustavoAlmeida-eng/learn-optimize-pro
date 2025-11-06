import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

interface MapaMental {
  id: string;
  titulo: string;
  materia: string;
  conteudo: string;
}

const conteudosParaGerar = [
  { titulo: "Álgebra Básica", materia: "Matemática" },
  { titulo: "Geometria Plana", materia: "Matemática" },
  { titulo: "Trigonometria", materia: "Matemática" },
  { titulo: "Funções", materia: "Matemática" },
  { titulo: "Mecânica Clássica", materia: "Física" },
  { titulo: "Termodinâmica", materia: "Física" },
  { titulo: "Eletromagnetismo", materia: "Física" },
  { titulo: "Óptica", materia: "Física" },
  { titulo: "Química Orgânica", materia: "Química" },
  { titulo: "Tabela Periódica", materia: "Química" },
  { titulo: "Reações Químicas", materia: "Química" },
  { titulo: "Estequiometria", materia: "Química" },
  { titulo: "Citologia", materia: "Biologia" },
  { titulo: "Genética", materia: "Biologia" },
  { titulo: "Ecologia", materia: "Biologia" },
  { titulo: "Evolução", materia: "Biologia" },
  { titulo: "Brasil Colônia", materia: "História" },
  { titulo: "Revolução Industrial", materia: "História" },
  { titulo: "Cartografia", materia: "Geografia" },
  { titulo: "Geopolítica", materia: "Geografia" },
];

const BibliotecaMapas = () => {
  const navigate = useNavigate();
  const [mapas, setMapas] = useState<MapaMental[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedMapa, setSelectedMapa] = useState<MapaMental | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchMapas();
    checkAndGenerateContent();
  }, []);

  const fetchMapas = async () => {
    try {
      const { data, error } = await supabase
        .from("mapas_mentais")
        .select("*")
        .order("materia", { ascending: true });

      if (error) throw error;
      setMapas(data || []);
    } catch (error) {
      console.error("Erro ao buscar mapas:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndGenerateContent = async () => {
    try {
      const { data: existing } = await supabase
        .from("mapas_mentais")
        .select("id");

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
          body: {
            tipo: "mapa",
            materia: item.materia,
            titulo: item.titulo,
          },
        });

        if (!error) {
          successCount++;
        }
      } catch (error) {
        console.error(`Erro ao gerar ${item.titulo}:`, error);
      }
    }

    setGenerating(false);
    
    if (successCount > 0) {
      toast.success(`${successCount} mapas mentais gerados com sucesso!`);
      fetchMapas();
    }
  };

  const handleOpenMapa = (mapa: MapaMental) => {
    setSelectedMapa(mapa);
    setDialogOpen(true);
  };

  if (loading || generating) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {generating ? "Gerando mapas mentais com IA..." : "Carregando..."}
          </p>
        </div>
      </DashboardLayout>
    );
  }

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
              <Brain className="h-8 w-8 text-primary" />
              Mapas Mentais
            </h1>
            <p className="text-muted-foreground">
              Mapas mentais detalhados gerados por IA
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mapas.map((mapa) => (
            <Card key={mapa.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{mapa.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground">{mapa.materia}</p>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => handleOpenMapa(mapa)}
                >
                  Abrir Mapa Mental
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedMapa?.titulo}</DialogTitle>
            </DialogHeader>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{selectedMapa?.conteudo || ""}</ReactMarkdown>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default BibliotecaMapas;
