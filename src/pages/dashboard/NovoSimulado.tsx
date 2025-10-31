import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscriptionCheck } from "@/hooks/useSubscriptionCheck";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const series = ["1º Ano", "2º Ano", "3º Ano", "ENEM"];

const materias = {
  "Matemática": ["Álgebra", "Geometria", "Trigonometria", "Estatística"],
  "Física": ["Mecânica", "Termodinâmica", "Eletricidade", "Óptica"],
  "Química": ["Química Orgânica", "Química Inorgânica", "Físico-Química"],
  "Biologia": ["Citologia", "Genética", "Ecologia", "Evolução"],
  "Geografia": ["Geografia Física", "Geografia Humana", "Geopolítica"],
  "História": ["História Geral", "História do Brasil", "Atualidades"],
  "Português": ["Gramática", "Literatura", "Interpretação de Texto"],
  "Inglês": ["Grammar", "Reading", "Vocabulary"],
  "Espanhol": ["Gramática", "Leitura", "Vocabulário"],
  "Sociologia": ["Teorias Sociais", "Movimentos Sociais", "Cultura"],
  "Filosofia": ["Ética", "Lógica", "Filosofia Moderna"],
};

const NovoSimulado = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { hasActiveSubscription, loading } = useSubscriptionCheck();
  const [selectedSerie, setSelectedSerie] = useState("");
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  const [selectedConteudos, setSelectedConteudos] = useState<Record<string, string[]>>({});

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

  const handleCreateSimulado = () => {
    if (!selectedSerie || selectedMaterias.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione a série e pelo menos uma matéria",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Simulado criado!",
      description: "Seu simulado personalizado foi configurado com sucesso.",
    });
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
            Configure seu simulado personalizado escolhendo a série, matérias e conteúdos específicos.
            Você pode criar um simulado sob medida para focar nos temas que precisa estudar.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Selecione a Série/Ano</CardTitle>
              <CardDescription>
                Escolha o ano escolar ou tipo de prova equivalente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedSerie} onValueChange={setSelectedSerie}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a série" />
                </SelectTrigger>
                <SelectContent>
                  {series.map((serie) => (
                    <SelectItem key={serie} value={serie}>
                      {serie}
                    </SelectItem>
                  ))}
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
                ))}
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
                    ))}
                  </TabsList>
                  {selectedMaterias.map((materia) => (
                    <TabsContent key={materia} value={materia}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {materias[materia as keyof typeof materias].map((conteudo) => (
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
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button onClick={handleCreateSimulado} size="lg">
              Criar Simulado
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NovoSimulado;
