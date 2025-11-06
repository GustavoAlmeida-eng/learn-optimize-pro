import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

interface Resumo {
  id: string;
  titulo: string;
  materia: string;
  conteudo: string;
}

interface ResumoContent {
  introducao: string;
  imagem_destaque?: string;
  imagem_principal?: string;
  secoes: Array<{
    titulo: string;
    conteudo: string;
    exemplos?: string[];
    destaque?: string;
  }>;
  resumo_final: string;
  dicas_estudo?: string[];
  questoes_pratica?: string[];
}

const conteudosParaGerar = [
  { titulo: "Brasil Colônia", materia: "História" },
  { titulo: "Império Brasileiro", materia: "História" },
  { titulo: "República Velha", materia: "História" },
  { titulo: "Era Vargas", materia: "História" },
  { titulo: "Ditadura Militar", materia: "História" },
  { titulo: "Cartografia", materia: "Geografia" },
  { titulo: "Climatologia", materia: "Geografia" },
  { titulo: "Geopolítica", materia: "Geografia" },
  { titulo: "Urbanização", materia: "Geografia" },
  { titulo: "Globalização", materia: "Geografia" },
  { titulo: "Modernismo", materia: "Literatura" },
  { titulo: "Romantismo", materia: "Literatura" },
  { titulo: "Realismo", materia: "Literatura" },
  { titulo: "Barroco", materia: "Literatura" },
  { titulo: "Literatura Contemporânea", materia: "Literatura" },
  { titulo: "Filósofos Pré-Socráticos", materia: "Filosofia" },
  { titulo: "Platão e Aristóteles", materia: "Filosofia" },
  { titulo: "Filosofia Moderna", materia: "Filosofia" },
  { titulo: "Sociologia Clássica", materia: "Sociologia" },
  { titulo: "Movimentos Sociais", materia: "Sociologia" },
  { titulo: "Classes Sociais", materia: "Sociologia" },
  { titulo: "Tempos Verbais em Inglês", materia: "Inglês" },
  { titulo: "Phrasal Verbs", materia: "Inglês" },
  { titulo: "Reading Comprehension", materia: "Inglês" },
  { titulo: "Business English", materia: "Inglês" },
];

const BibliotecaResumos = () => {
  const navigate = useNavigate();
  const [resumos, setResumos] = useState<Resumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedResumo, setSelectedResumo] = useState<Resumo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchResumos();
    checkAndGenerateContent();
  }, []);

  const fetchResumos = async () => {
    try {
      const { data, error } = await supabase
        .from("resumos")
        .select("*")
        .order("materia", { ascending: true });

      if (error) throw error;
      setResumos(data || []);
    } catch (error) {
      console.error("Erro ao buscar resumos:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndGenerateContent = async () => {
    try {
      const { data: existing } = await supabase
        .from("resumos")
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
            tipo: "resumo",
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
      toast.success(`${successCount} resumos gerados com sucesso!`);
      fetchResumos();
    }
  };

  const handleOpenResumo = (resumo: Resumo) => {
    setSelectedResumo(resumo);
    setDialogOpen(true);
  };

  if (loading || generating) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {generating ? "Gerando resumos com IA..." : "Carregando..."}
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
              <FileText className="h-8 w-8 text-secondary" />
              Resumos
            </h1>
            <p className="text-muted-foreground">
              Resumos completos gerados por IA
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumos.map((resumo) => (
            <Card key={resumo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{resumo.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground">{resumo.materia}</p>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => handleOpenResumo(resumo)}
                >
                  Abrir Resumo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedResumo?.titulo}</DialogTitle>
            </DialogHeader>
            {selectedResumo && (() => {
              try {
                const content: ResumoContent = JSON.parse(selectedResumo.conteudo);
                return (
                  <div className="space-y-6">
                    {content.imagem_principal && (
                      <div className="rounded-lg overflow-hidden border">
                        <img src={content.imagem_principal} alt={selectedResumo.titulo} className="w-full max-h-64 object-cover" />
                      </div>
                    )}

                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-lg leading-relaxed">{content.introducao}</p>
                    </div>

                    {content.secoes.map((secao, idx) => (
                      <Card key={idx} className="p-5">
                        <h3 className="text-xl font-bold mb-3 text-secondary">{secao.titulo}</h3>
                        <p className="mb-4 leading-relaxed">{secao.conteudo}</p>
                        
                        {secao.exemplos && secao.exemplos.length > 0 && (
                          <div className="mt-3 p-4 bg-accent/10 rounded-lg">
                            <h4 className="font-semibold mb-2">📌 Exemplos:</h4>
                            <ul className="space-y-2">
                              {secao.exemplos.map((ex, exIdx) => (
                                <li key={exIdx} className="flex items-start gap-2">
                                  <span className="text-accent">•</span>
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {secao.destaque && (
                          <div className="mt-3 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                            <p className="font-semibold">💡 {secao.destaque}</p>
                          </div>
                        )}
                      </Card>
                    ))}

                    <Card className="p-5 bg-secondary/10">
                      <h3 className="text-xl font-bold mb-3">🎯 Resumo Final</h3>
                      <p className="leading-relaxed">{content.resumo_final}</p>
                    </Card>

                    {content.dicas_estudo && content.dicas_estudo.length > 0 && (
                      <Card className="p-5 bg-accent/10">
                        <h3 className="text-xl font-bold mb-3">📚 Dicas de Estudo</h3>
                        <ul className="space-y-2">
                          {content.dicas_estudo.map((dica, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-accent">✓</span>
                              <span>{dica}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}

                    {content.questoes_pratica && content.questoes_pratica.length > 0 && (
                      <Card className="p-5 bg-primary/5">
                        <h3 className="text-xl font-bold mb-3">❓ Questões para Praticar</h3>
                        <ul className="space-y-3">
                          {content.questoes_pratica.map((questao, idx) => (
                            <li key={idx} className="p-3 bg-background rounded">
                              <strong>{idx + 1}.</strong> {questao}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}
                  </div>
                );
              } catch {
                return (
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{selectedResumo.conteudo}</ReactMarkdown>
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

export default BibliotecaResumos;
