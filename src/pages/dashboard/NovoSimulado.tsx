import { useState, useEffect } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import { CreditCard, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const vestibulares = [
  "ENEM",
  "FUVEST (USP)",
  "UNICAMP",
  "UNESP",
  "ITA",
  "IME",
  "UERJ",
  "UFMG",
  "UnB"
];

const series = ["1º Ano", "2º Ano", "3º Ano"];

const materias: Record<string, string[]> = {
  "Matemática": [
    "Aritmética", "Álgebra Básica", "Álgebra Linear", "Geometria Plana", 
    "Geometria Espacial", "Geometria Analítica", "Trigonometria", "Funções", 
    "Logaritmos", "Progressões", "Matrizes e Determinantes", "Análise Combinatória",
    "Probabilidade", "Estatística", "Números Complexos", "Polinômios",
    "Equações", "Inequações", "Sistemas Lineares", "Conjuntos",
    "Proporcionalidade", "Porcentagem", "Juros", "Razão e Proporção",
    "Regra de Três", "Medidas", "Gráficos", "Geometria de Posição",
    "Teoria dos Números", "Matemática Financeira"
  ],
  "Física": [
    "Cinemática", "Dinâmica", "Estática", "Hidrostática", "Hidrodinâmica",
    "Termologia", "Termodinâmica", "Óptica Geométrica", "Óptica Física",
    "Ondulatória", "Acústica", "Eletrostática", "Eletrodinâmica", 
    "Eletromagnetismo", "Física Moderna", "Mecânica", "Gravitação",
    "Trabalho e Energia", "Impulso e Quantidade de Movimento", "Leis de Newton",
    "Máquinas Térmicas", "Dilatação", "Calorimetria", "Mudanças de Estado",
    "Propagação do Calor", "Refração", "Reflexão", "Lentes e Espelhos",
    "Interferência e Difração", "Circuitos Elétricos"
  ],
  "Química": [
    "Estequiometria", "Gases", "Soluções", "Termoquímica", "Cinética Química",
    "Equilíbrio Químico", "Radioatividade", "Ligações Químicas", "Funções Inorgânicas",
    "Reações Orgânicas", "Isomeria", "Polímeros", "Química Ambiental",
    "Eletroquímica", "Tabelas Periódicas", "Ácidos e Bases", "Sais",
    "Óxidos", "Hidrocarbonetos", "Álcoois", "Éteres",
    "Aldeídos", "Cetonas", "Ácidos Carboxílicos", "Ésteres",
    "Aminas", "Amidas", "Bioquímica", "Química Nuclear"
  ],
  "Biologia": [
    "Citologia", "Histologia", "Genética", "Evolução", "Ecologia",
    "Fisiologia Humana", "Botânica", "Zoologia", "Microbiologia",
    "Bioquímica", "Imunologia", "Embriologia", "Parasitologia",
    "Virologia", "Biotecnologia", "Engenharia Genética", "Etologia",
    "Paleontologia", "Taxonomia", "Anatomia Comparada", "Reprodução",
    "Sistema Nervoso", "Sistema Endócrino", "Sistema Digestório", "Sistema Respiratório",
    "Sistema Circulatório", "Sistema Excretório", "Sistema Muscular", "Sistema Esquelético"
  ],
  "História": [
    "Brasil Colônia", "Brasil Império", "República Velha", "Era Vargas", "Regime Militar",
    "Nova República", "Grécia Antiga", "Roma Antiga", "Idade Média", "Renascimento",
    "Reforma Protestante", "Absolutismo", "Iluminismo", "Revolução Francesa",
    "Era Napoleônica", "Revolução Industrial", "Primeira Guerra Mundial", "Segunda Guerra Mundial",
    "Guerra Fria", "Globalização", "História da África", "História da América",
    "História da Ásia", "Neocolonialismo", "Imperialismo", "Crise de 1929",
    "Nazismo", "Fascismo", "Guerra do Vietnã"
  ],
  "Geografia": [
    "Geomorfologia", "Climatologia", "Hidrografia", "Biogeografia", "Cartografia",
    "Demografia", "Urbanização", "Globalização", "Geopolítica", "Agricultura",
    "Indústria", "Fontes de Energia", "Meio Ambiente", "Blocos Econômicos",
    "Organizações Internacionais", "Geografia do Brasil", "Geografia da América",
    "Geografia da África", "Geografia da Ásia", "Geografia da Europa",
    "Geografia da Oceania", "Migrações", "Problemas Ambientais Urbanos", "Recursos Naturais",
    "Transportes", "Comércio Internacional", "Desenvolvimento Sustentável", "Fusos Horários",
    "Coordenadas Geográficas", "Sensoriamento Remoto"
  ],
  "Português": [
    "Fonética e Fonologia", "Morfologia", "Sintaxe", "Semântica", "Estilística",
    "Interpretação de Textos", "Análise Literária", "Figuras de Linguagem", "Funções da Linguagem",
    "Variação Linguística", "Norma Culta", "Gêneros Textuais", "Coesão e Coerência",
    "Concordância Verbal e Nominal", "Regência Verbal e Nominal", "Crase", "Pontuação",
    "Ortografia", "Acentuação", "Classes de Palavras", "Orações Subordinadas",
    "Orações Coordenadas", "Discurso Direto e Indireto", "Modernismo", "Romantismo",
    "Realismo", "Naturalismo", "Barroco", "Arcadismo"
  ],
  "Inglês": [
    "Tempos Verbais", "Modais", "Condicionais", "Voz Passiva", "Discurso Indireto",
    "Pronomes", "Preposições", "Conjunções", "Artigos", "Substantivos",
    "Adjetivos", "Advérbios", "Verbos Irregulares", "Phrasal Verbs", "Reading Comprehension",
    "Writing Skills", "Listening Skills", "Speaking Skills", "Vocabulary",
    "Grammar", "Present Simple", "Present Continuous", "Past Simple",
    "Past Continuous", "Future Simple", "Future Continuous", "Present Perfect",
    "Past Perfect", "Future Perfect", "Used to"
  ],
  "Filosofia": [
    "Filosofia Antiga", "Filosofia Medieval", "Filosofia Moderna", "Filosofia Contemporânea",
    "Sócrates", "Platão", "Aristóteles", "Santo Agostinho", "São Tomás de Aquino",
    "Descartes", "Spinoza", "Leibniz", "Locke", "Hume",
    "Kant", "Hegel", "Marx", "Nietzsche", "Freud",
    "Sartre", "Beauvoir", "Foucault", "Habermas", "Ética",
    "Política", "Metafísica", "Epistemologia", "Lógica", "Estética"
  ],
  "Sociologia": [
    "Sociologia Clássica", "Sociologia Brasileira", "Cultura", "Socialização", "Desigualdade Social",
    "Movimentos Sociais", "Globalização", "Poder", "Estado", "Classes Sociais",
    "Trabalho", "Consumo", "Mídia", "Violência", "Gênero",
    "Raça", "Etnia", "Religião", "Família", "Educação",
    "Meio Ambiente", "Tecnologia", "Urbanização", "Ruralidade", "Políticas Públicas"
  ]
};

const NovoSimulado = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasActiveSubscription, loading: loadingSubscription } = useSubscriptionCheck();
  const [planType, setPlanType] = useState<string>("enem");
  const [selectedSerieOuVestibular, setSelectedSerieOuVestibular] = useState("");
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  const [selectedConteudos, setSelectedConteudos] = useState<Record<string, string[]>>({});
  const [observacoesAdicionais, setObservacoesAdicionais] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setPlanType(data.plan_type);
      }
    };

    fetchUserPlan();
  }, [user]);

  const handleMateriaToggle = (materia: string) => {
    if (selectedMaterias.includes(materia)) {
      setSelectedMaterias(selectedMaterias.filter(m => m !== materia));
      const newConteudos = { ...selectedConteudos };
      delete newConteudos[materia];
      setSelectedConteudos(newConteudos);
    } else {
      setSelectedMaterias([...selectedMaterias, materia]);
    }
  };

  const handleConteudoToggle = (materia: string, conteudo: string) => {
    const currentConteudos = selectedConteudos[materia] || [];
    if (currentConteudos.includes(conteudo)) {
      setSelectedConteudos({
        ...selectedConteudos,
        [materia]: currentConteudos.filter(c => c !== conteudo)
      });
    } else {
      setSelectedConteudos({
        ...selectedConteudos,
        [materia]: [...currentConteudos, conteudo]
      });
    }
  };

  const handleCreateSimulado = async () => {
    if (!selectedSerieOuVestibular || selectedMaterias.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione a série/vestibular e pelo menos uma matéria",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('gerar-simulado', {
        body: {
          tipo: planType,
          serieOuVestibular: selectedSerieOuVestibular,
          materias: selectedMaterias,
          conteudos: selectedConteudos,
          observacoesAdicionais
        }
      });

      if (functionError) throw functionError;

      toast({
        title: "Simulado criado!",
        description: "Seu simulado foi gerado com sucesso.",
      });

      navigate(`/dashboard/simulado/${functionData.simuladoId}`);
    } catch (error) {
      console.error('Error creating simulado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o simulado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (loadingSubscription) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
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
                Para criar simulados personalizados, você precisa ter um plano ativo. 
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
          <h1 className="text-3xl font-heading font-bold mb-2">Criar Novo Simulado</h1>
          <p className="text-muted-foreground">
            Configure seu simulado personalizado escolhendo {planType === 'enem' ? 'o vestibular' : 'a série'}, matérias e conteúdos específicos.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Selecione {planType === 'enem' ? 'o Vestibular' : 'a Série/Ano'}</CardTitle>
              <CardDescription>
                {planType === 'enem' ? 'Escolha o vestibular que deseja simular' : 'Escolha o ano escolar equivalente'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedSerieOuVestibular} onValueChange={setSelectedSerieOuVestibular}>
                <SelectTrigger>
                  <SelectValue placeholder={planType === 'enem' ? 'Selecione o vestibular' : 'Selecione a série'} />
                </SelectTrigger>
                <SelectContent>
                  {(planType === 'enem' ? vestibulares : series).map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Escolha as Matérias</CardTitle>
              <CardDescription>
                Selecione as disciplinas que deseja incluir no simulado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                ))
                }
              </div>
            </CardContent>
          </Card>

          {selectedMaterias.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>3. Conteúdos Específicos</CardTitle>
                <CardDescription>
                  Para cada matéria selecionada, escolha os conteúdos que deseja incluir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={selectedMaterias[0]}>
                  <TabsList className="flex-wrap h-auto">
                    {selectedMaterias.map((materia) => (
                      <TabsTrigger key={materia} value={materia}>
                        {materia}
                      </TabsTrigger>
                    ))
                    }
                  </TabsList>
                  {selectedMaterias.map((materia) => (
                    <TabsContent key={materia} value={materia}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 max-h-[400px] overflow-y-auto">
                        {materias[materia].map((conteudo) => (
                          <div key={conteudo} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${materia}-${conteudo}`}
                              checked={selectedConteudos[materia]?.includes(conteudo)}
                              onCheckedChange={() => handleConteudoToggle(materia, conteudo)}
                            />
                            <Label htmlFor={`${materia}-${conteudo}`} className="cursor-pointer">
                              {conteudo}
                            </Label>
                          </div>
                        ))
                        }
                      </div>
                    </TabsContent>
                  ))
                  }
                </Tabs>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>4. Observações Adicionais (Opcional)</CardTitle>
              <CardDescription>
                Especifique melhor o conteúdo do simulado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ex: Focar em questões de aplicação prática, incluir mais questões de nível difícil..."
                value={observacoesAdicionais}
                onChange={(e) => setObservacoesAdicionais(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              onClick={handleCreateSimulado} 
              size="lg"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Simulado...
                </>
              ) : (
                'Criar Simulado'
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NovoSimulado;
