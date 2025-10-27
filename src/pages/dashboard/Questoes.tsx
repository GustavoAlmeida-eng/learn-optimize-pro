import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

const materias = ["Matemática", "Física", "Química", "Biologia", "História", "Geografia", "Português", "Inglês"];
const dificuldades = ["Fácil", "Média", "Difícil"];

const questoesExemplo = [
  {
    id: 1,
    materia: "Matemática",
    dificuldade: "Média",
    enunciado: "Qual é o valor de x na equação 2x + 5 = 15?",
    alternativas: ["x = 5", "x = 10", "x = 7,5", "x = 2,5"],
    resposta: 0,
  },
  {
    id: 2,
    materia: "Física",
    dificuldade: "Fácil",
    enunciado: "Qual grandeza física mede a quantidade de matéria de um corpo?",
    alternativas: ["Peso", "Massa", "Volume", "Densidade"],
    resposta: 1,
  },
  {
    id: 3,
    materia: "Química",
    dificuldade: "Difícil",
    enunciado: "Qual é a fórmula molecular do ácido sulfúrico?",
    alternativas: ["H2SO4", "HCl", "H3PO4", "HNO3"],
    resposta: 0,
  },
];

const Questoes = () => {
  const { toast } = useToast();
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  const [selectedDificuldade, setSelectedDificuldade] = useState("");
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleMateriaToggle = (materia: string) => {
    if (selectedMaterias.includes(materia)) {
      setSelectedMaterias(selectedMaterias.filter(m => m !== materia));
    } else {
      setSelectedMaterias([...selectedMaterias, materia]);
    }
  };

  const handleResposta = (questaoId: number, alternativaIndex: number) => {
    setRespostas({ ...respostas, [questaoId]: alternativaIndex });
  };

  const handleVerificar = () => {
    if (Object.keys(respostas).length === 0) {
      toast({
        title: "Atenção",
        description: "Responda pelo menos uma questão",
        variant: "destructive",
      });
      return;
    }
    setMostrarResultado(true);
    
    const acertos = questoesExemplo.filter(q => respostas[q.id] === q.resposta).length;
    toast({
      title: "Resultado",
      description: `Você acertou ${acertos} de ${Object.keys(respostas).length} questões!`,
    });
  };

  const questoesFiltradas = questoesExemplo.filter(q => {
    const matchMateria = selectedMaterias.length === 0 || selectedMaterias.includes(q.materia);
    const matchDificuldade = !selectedDificuldade || q.dificuldade === selectedDificuldade;
    return matchMateria && matchDificuldade;
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">Buscar Questões</h1>
          <p className="text-muted-foreground">
            Pratique com questões específicas escolhendo matérias e níveis de dificuldade.
            Use os filtros abaixo para encontrar questões adequadas ao seu nível de estudo.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Busca</CardTitle>
              <CardDescription>
                Personalize sua busca por questões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Matérias</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {materias.map((materia) => (
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

              <div>
                <Label className="text-base mb-3 block">Dificuldade</Label>
                <Select value={selectedDificuldade} onValueChange={setSelectedDificuldade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as dificuldades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as dificuldades</SelectItem>
                    {dificuldades.map((dif) => (
                      <SelectItem key={dif} value={dif}>
                        {dif}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold">
                Questões Encontradas ({questoesFiltradas.length})
              </h2>
              {Object.keys(respostas).length > 0 && (
                <Button onClick={handleVerificar}>
                  Verificar Respostas
                </Button>
              )}
            </div>

            {questoesFiltradas.map((questao) => (
              <Card key={questao.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{questao.materia}</Badge>
                    <Badge
                      variant={
                        questao.dificuldade === "Fácil"
                          ? "default"
                          : questao.dificuldade === "Média"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {questao.dificuldade}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">Questão {questao.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">{questao.enunciado}</p>
                  <RadioGroup
                    value={respostas[questao.id]?.toString()}
                    onValueChange={(value) => handleResposta(questao.id, parseInt(value))}
                  >
                    {questao.alternativas.map((alt, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center space-x-2 p-3 rounded-lg border ${
                          mostrarResultado && idx === questao.resposta
                            ? "bg-green-50 border-green-500"
                            : mostrarResultado &&
                              respostas[questao.id] === idx &&
                              idx !== questao.resposta
                            ? "bg-red-50 border-red-500"
                            : "bg-background"
                        }`}
                      >
                        <RadioGroupItem value={idx.toString()} id={`q${questao.id}-${idx}`} />
                        <Label htmlFor={`q${questao.id}-${idx}`} className="cursor-pointer flex-1">
                          {String.fromCharCode(65 + idx)}) {alt}
                          {mostrarResultado && idx === questao.resposta && (
                            <span className="ml-2 text-green-600 font-medium">(Correta)</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Questoes;
