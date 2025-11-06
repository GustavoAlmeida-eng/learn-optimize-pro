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

interface MapaContent {
  conceito_central: string;
  descricao_imagem?: string;
  imagem_principal?: string;
  ramos: Array<{
    titulo: string;
    subtopicos: string[];
    exemplos?: string;
    destaque?: string;
  }>;
  conexoes?: string[];
  dicas_estudo?: string[];
}

const conteudosParaGerar = [
  { titulo: "Álgebra Básica", materia: "Matemática" },
  { titulo: "Geometria Plana", materia: "Matemática" },
  { titulo: "Trigonometria", materia: "Matemática" },
  { titulo: "Funções Matemáticas", materia: "Matemática" },
  { titulo: "Estatística e Probabilidade", materia: "Matemática" },
  { titulo: "Mecânica Clássica", materia: "Física" },
  { titulo: "Termodinâmica", materia: "Física" },
  { titulo: "Eletromagnetismo", materia: "Física" },
  { titulo: "Óptica e Ondas", materia: "Física" },
  { titulo: "Física Moderna", materia: "Física" },
  { titulo: "Química Orgânica", materia: "Química" },
  { titulo: "Tabela Periódica", materia: "Química" },
  { titulo: "Reações Químicas", materia: "Química" },
  { titulo: "Estequiometria", materia: "Química" },
  { titulo: "Ligações Químicas", materia: "Química" },
  { titulo: "Citologia", materia: "Biologia" },
  { titulo: "Genética Mendeliana", materia: "Biologia" },
  { titulo: "Ecologia e Meio Ambiente", materia: "Biologia" },
  { titulo: "Evolução das Espécies", materia: "Biologia" },
  { titulo: "Fisiologia Humana", materia: "Biologia" },
  { titulo: "Brasil Colônia", materia: "História" },
  { titulo: "Revolução Industrial", materia: "História" },
  { titulo: "Guerras Mundiais", materia: "História" },
  { titulo: "Cartografia", materia: "Geografia" },
  { titulo: "Geopolítica Mundial", materia: "Geografia" },
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
          <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedMapa?.titulo}</DialogTitle>
            </DialogHeader>
            {selectedMapa && (() => {
              try {
                const content: MapaContent = JSON.parse(selectedMapa.conteudo);
                return (
                  <div className="space-y-6">
                    {content.imagem_principal && (
                      <div className="rounded-lg overflow-hidden border">
                        <img src={content.imagem_principal} alt={content.conceito_central} className="w-full" />
                      </div>
                    )}
                    
                    <div className="text-center p-6 bg-primary/10 rounded-lg">
                      <h2 className="text-3xl font-bold text-primary">{content.conceito_central}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.ramos.map((ramo, idx) => (
                        <Card key={idx} className="p-4">
                          <h3 className="text-xl font-bold mb-3 text-secondary">{ramo.titulo}</h3>
                          <ul className="space-y-2 mb-3">
                            {ramo.subtopicos.map((sub, subIdx) => (
                              <li key={subIdx} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                          {ramo.exemplos && (
                            <div className="mt-3 p-3 bg-accent/10 rounded">
                              <p className="text-sm"><strong>Exemplos:</strong> {ramo.exemplos}</p>
                            </div>
                          )}
                          {ramo.destaque && (
                            <div className="mt-2 p-2 bg-primary/10 rounded">
                              <p className="text-sm font-semibold">💡 {ramo.destaque}</p>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>

                    {content.conexoes && content.conexoes.length > 0 && (
                      <Card className="p-4 bg-secondary/10">
                        <h3 className="text-lg font-bold mb-2">🔗 Conexões entre Conceitos</h3>
                        <ul className="space-y-1">
                          {content.conexoes.map((conexao, idx) => (
                            <li key={idx} className="text-sm">{conexao}</li>
                          ))}
                        </ul>
                      </Card>
                    )}

                    {content.dicas_estudo && content.dicas_estudo.length > 0 && (
                      <Card className="p-4 bg-accent/10">
                        <h3 className="text-lg font-bold mb-2">📚 Dicas de Estudo</h3>
                        <ul className="space-y-1">
                          {content.dicas_estudo.map((dica, idx) => (
                            <li key={idx} className="text-sm">{dica}</li>
                          ))}
                        </ul>
                      </Card>
                    )}
                  </div>
                );
              } catch {
                return (
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{selectedMapa.conteudo}</ReactMarkdown>
                  </div>
                );
              }
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default BibliotecaMapas;
