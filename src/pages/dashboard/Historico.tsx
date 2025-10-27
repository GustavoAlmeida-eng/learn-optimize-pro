import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const simulados = [
  {
    id: 1,
    titulo: "Simulado ENEM - Completo",
    data: "15/06/2024",
    duracao: "180 min",
    questoes: 90,
    acertos: 68,
    nota: 755,
    status: "concluido",
  },
  {
    id: 2,
    titulo: "Matemática - Álgebra e Geometria",
    data: "10/06/2024",
    duracao: "60 min",
    questoes: 30,
    acertos: 24,
    nota: 800,
    status: "concluido",
  },
  {
    id: 3,
    titulo: "Ciências da Natureza",
    data: "05/06/2024",
    duracao: "90 min",
    questoes: 45,
    acertos: 32,
    nota: 711,
    status: "concluido",
  },
  {
    id: 4,
    titulo: "Linguagens e Códigos",
    data: "01/06/2024",
    duracao: "90 min",
    questoes: 45,
    acertos: 38,
    nota: 844,
    status: "concluido",
  },
];

const questoesExemplo = [
  {
    numero: 1,
    enunciado: "Qual é o resultado da equação x² - 5x + 6 = 0?",
    alternativas: ["x = 2 ou x = 3", "x = 1 ou x = 6", "x = -2 ou x = -3", "x = 0 ou x = 5"],
    resposta: 0,
    respostaUsuario: 0,
    correta: true,
  },
  {
    numero: 2,
    enunciado: "Em qual processo celular ocorre a produção de ATP?",
    alternativas: ["Fotossíntese", "Respiração celular", "Mitose", "Meiose"],
    resposta: 1,
    respostaUsuario: 0,
    correta: false,
  },
];

const Historico = () => {
  const [selectedSimulado, setSelectedSimulado] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">Meus Simulados</h1>
          <p className="text-muted-foreground">
            Revise seu histórico de simulados, veja correções detalhadas e acompanhe sua evolução.
            Clique em "Ver Detalhes" para revisar as questões e suas respostas.
          </p>
        </div>

        <div className="grid gap-4">
          {simulados.map((simulado) => (
            <Card key={simulado.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{simulado.titulo}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {simulado.data}
                      </span>
                      <span>{simulado.duracao}</span>
                      <span>{simulado.questoes} questões</span>
                    </CardDescription>
                  </div>
                  <Badge variant={simulado.status === "concluido" ? "default" : "secondary"}>
                    {simulado.status === "concluido" ? "Concluído" : "Em andamento"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Acertos</p>
                    <p className="text-2xl font-bold text-primary">
                      {simulado.acertos}/{simulado.questoes}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa</p>
                    <p className="text-2xl font-bold">
                      {Math.round((simulado.acertos / simulado.questoes) * 100)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nota Final</p>
                    <p className="text-2xl font-bold text-primary">{simulado.nota}</p>
                  </div>
                  <div className="flex items-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedSimulado(simulado.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{simulado.titulo}</DialogTitle>
                          <DialogDescription>
                            Revise suas respostas e veja as correções detalhadas
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 mt-4">
                          {questoesExemplo.map((questao) => (
                            <Card key={questao.numero}>
                              <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                  Questão {questao.numero}
                                  {questao.correta ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-600" />
                                  )}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <p className="font-medium">{questao.enunciado}</p>
                                <div className="space-y-2">
                                  {questao.alternativas.map((alt, idx) => (
                                    <div
                                      key={idx}
                                      className={`p-3 rounded-lg border ${
                                        idx === questao.resposta
                                          ? "bg-green-50 border-green-500"
                                          : idx === questao.respostaUsuario && !questao.correta
                                          ? "bg-red-50 border-red-500"
                                          : "bg-background"
                                      }`}
                                    >
                                      <p className="text-sm">
                                        {String.fromCharCode(65 + idx)}) {alt}
                                        {idx === questao.resposta && (
                                          <span className="ml-2 text-green-600 font-medium">
                                            (Correta)
                                          </span>
                                        )}
                                        {idx === questao.respostaUsuario &&
                                          !questao.correta && (
                                            <span className="ml-2 text-red-600 font-medium">
                                              (Sua resposta)
                                            </span>
                                          )}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Historico;
