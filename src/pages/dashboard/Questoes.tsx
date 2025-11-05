import { useState, useEffect } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import { CreditCard, Loader2, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const materias: { [key: string]: string[] } = {
  "Matemática": ["Álgebra", "Geometria", "Trigonometria", "Estatística", "Análise Combinatória", 
    "Funções", "Equações", "Logaritmos", "Matrizes", "Probabilidade",
    "Números Complexos", "Polinômios", "Sistemas Lineares", "Sequências", "Progressões",
    "Limites", "Derivadas", "Integrais", "Geometria Analítica", "Geometria Espacial",
    "Razão e Proporção", "Regra de Três", "Porcentagem", "Juros", "Matemática Financeira",
    "Conjuntos", "Lógica", "Contagem", "Permutações", "Combinações"],
  "Física": ["Mecânica", "Cinemática", "Dinâmica", "Energia", "Termodinâmica",
    "Óptica", "Ondulatória", "Eletricidade", "Magnetismo", "Eletromagnetismo",
    "Física Moderna", "Relatividade", "Física Quântica", "Gravitação", "Hidrostática",
    "Trabalho e Potência", "Impulso", "Quantidade de Movimento", "Leis de Newton", "Atrito",
    "Movimento Circular", "Oscilações", "Calorimetria", "Dilatação", "Gases",
    "Reflexão", "Refração", "Espelhos", "Lentes", "Circuitos Elétricos"],
  "Química": ["Química Geral", "Química Orgânica", "Físico-Química", "Química Inorgânica", "Estequiometria",
    "Termoquímica", "Eletroquímica", "Cinética Química", "Equilíbrio Químico", "pH e pOH",
    "Soluções", "Propriedades Coligativas", "Radioatividade", "Tabela Periódica", "Ligações Químicas",
    "Reações Químicas", "Funções Orgânicas", "Isomeria", "Polímeros", "Bioquímica",
    "Oxidação-Redução", "Ácidos e Bases", "Sais", "Óxidos", "Nomenclatura",
    "Cálculos Estequiométricos", "Gases Ideais", "Colóides", "Corrosão", "Meio Ambiente"],
  "Biologia": ["Citologia", "Genética", "Evolução", "Ecologia", "Fisiologia",
    "Botânica", "Zoologia", "Microbiologia", "Biotecnologia", "Anatomia Humana",
    "Histologia", "Embriologia", "Bioquímica", "Imunologia", "Parasitologia",
    "Taxonomia", "Ciclos Biogeoquímicos", "Cadeias Alimentares", "Biomas", "Fotossíntese",
    "Respiração Celular", "DNA e RNA", "Mutações", "Herança Genética", "Doenças",
    "Sistema Nervoso", "Sistema Circulatório", "Sistema Digestório", "Sistema Reprodutor", "Sustentabilidade"]
};

const Questoes = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { hasActiveSubscription, loading } = useSubscriptionCheck();
  const [planType, setPlanType] = useState<string>("");
  const [serieOuVestibular, setSerieOuVestibular] = useState("");
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  const [conteudos, setConteudos] = useState<{ [key: string]: string[] }>({});
  const [observacoesAdicionais, setObservacoesAdicionais] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (hasActiveSubscription) {
      fetchUserPlan();
    }
  }, [hasActiveSubscription]);

  const fetchUserPlan = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setPlanType(data?.plan_type || 'enem');
    } catch (error) {
      console.error('Error fetching user plan:', error);
    }
  };

  const handleMateriaToggle = (materia: string) => {
    if (selectedMaterias.includes(materia)) {
      setSelectedMaterias(selectedMaterias.filter(m => m !== materia));
      const newConteudos = { ...conteudos };
      delete newConteudos[materia];
      setConteudos(newConteudos);
    } else {
      setSelectedMaterias([...selectedMaterias, materia]);
    }
  };

  const handleConteudoToggle = (materia: string, conteudo: string) => {
    const materiaConteudos = conteudos[materia] || [];
    if (materiaConteudos.includes(conteudo)) {
      setConteudos({
        ...conteudos,
        [materia]: materiaConteudos.filter(c => c !== conteudo),
      });
    } else {
      setConteudos({
        ...conteudos,
        [materia]: [...materiaConteudos, conteudo],
      });
    }
  };

  const handleGerarQuestoes = async () => {
    if (!serieOuVestibular) {
      toast({
        title: "Atenção",
        description: planType === 'enem' ? "Selecione o vestibular" : "Selecione a série",
        variant: "destructive",
      });
      return;
    }

    if (selectedMaterias.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione pelo menos uma matéria",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('gerar-questoes', {
        body: {
          tipo: planType,
          serieOuVestibular,
          materias: selectedMaterias,
          conteudos,
          observacoesAdicionais,
        }
      });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Questões geradas com sucesso!",
      });

      navigate(`/dashboard/questoes/${data.questoesId}`);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar as questões. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-lg">Carregando...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasActiveSubscription) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Acesso Premium Necessário</CardTitle>
              <CardDescription className="text-base">
                Esta funcionalidade está disponível apenas para usuários com plano ativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-muted-foreground">
                Para buscar e praticar questões, você precisa ter um plano ativo. 
                Assine agora e tenha acesso completo a todas as funcionalidades da plataforma!
              </p>
              <Button onClick={() => navigate("/dashboard/assinatura")} size="lg">
                Ver Planos Disponíveis
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">Buscar Questões</h1>
          <p className="text-muted-foreground">
            Configure os filtros e gere questões personalizadas para praticar.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Questões</CardTitle>
              <CardDescription>
                Personalize suas questões de estudo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">
                  {planType === 'enem' ? 'Vestibular' : 'Série/Ano'}
                </Label>
                <Select value={serieOuVestibular} onValueChange={setSerieOuVestibular}>
                  <SelectTrigger>
                    <SelectValue placeholder={planType === 'enem' ? 'Selecione o vestibular' : 'Selecione a série'} />
                  </SelectTrigger>
                  <SelectContent>
                    {planType === 'enem' ? (
                      <>
                        <SelectItem value="ENEM">ENEM</SelectItem>
                        <SelectItem value="FUVEST">FUVEST</SelectItem>
                        <SelectItem value="UNICAMP">UNICAMP</SelectItem>
                        <SelectItem value="UNESP">UNESP</SelectItem>
                        <SelectItem value="UERJ">UERJ</SelectItem>
                        <SelectItem value="ITA">ITA</SelectItem>
                        <SelectItem value="IME">IME</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="1">1º Ano</SelectItem>
                        <SelectItem value="2">2º Ano</SelectItem>
                        <SelectItem value="3">3º Ano</SelectItem>
                        <SelectItem value="4">4º Ano</SelectItem>
                        <SelectItem value="5">5º Ano</SelectItem>
                        <SelectItem value="6">6º Ano</SelectItem>
                        <SelectItem value="7">7º Ano</SelectItem>
                        <SelectItem value="8">8º Ano</SelectItem>
                        <SelectItem value="9">9º Ano</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base mb-3 block">Matérias</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(materias).map((materia) => (
                    <div key={materia} className="flex items-center space-x-2">
                      <Checkbox
                        id={materia}
                        checked={selectedMaterias.includes(materia)}
                        onCheckedChange={() => handleMateriaToggle(materia)}
                      />
                      <Label htmlFor={materia} className="cursor-pointer">
                        {materia}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {selectedMaterias.length > 0 && (
                <div>
                  <Label className="text-base mb-3 block">Conteúdos Específicos</Label>
                  <div className="space-y-4">
                    {selectedMaterias.map((materia) => (
                      <div key={materia} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3">{materia}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {materias[materia]?.map((conteudo) => (
                            <div key={conteudo} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${materia}-${conteudo}`}
                                checked={conteudos[materia]?.includes(conteudo) || false}
                                onCheckedChange={() => handleConteudoToggle(materia, conteudo)}
                              />
                              <Label htmlFor={`${materia}-${conteudo}`} className="cursor-pointer text-sm">
                                {conteudo}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-base mb-3 block">
                  Observações Adicionais (opcional)
                </Label>
                <Textarea
                  placeholder="Descreva detalhes específicos sobre o tipo de questões que você quer..."
                  value={observacoesAdicionais}
                  onChange={(e) => setObservacoesAdicionais(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              onClick={handleGerarQuestoes} 
              disabled={isGenerating}
              className="flex-1"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Questões...
                </>
              ) : (
                'Gerar Questões'
              )}
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/dashboard/questoes/historico")}
              size="lg"
            >
              <History className="mr-2 h-4 w-4" />
              Histórico de Questões
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Questoes;
