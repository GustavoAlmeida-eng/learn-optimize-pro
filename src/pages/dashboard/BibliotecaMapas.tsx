import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Download, ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mapas = [
  { id: 1, titulo: "Álgebra Básica", materia: "Matemática", arquivo: "algebra-basica.pdf" },
  { id: 2, titulo: "Geometria Plana", materia: "Matemática", arquivo: "geometria-plana.pdf" },
  { id: 3, titulo: "Trigonometria", materia: "Matemática", arquivo: "trigonometria.pdf" },
  { id: 4, titulo: "Mecânica", materia: "Física", arquivo: "mecanica.pdf" },
  { id: 5, titulo: "Termodinâmica", materia: "Física", arquivo: "termodinamica.pdf" },
  { id: 6, titulo: "Eletricidade", materia: "Física", arquivo: "eletricidade.pdf" },
  { id: 7, titulo: "Química Orgânica", materia: "Química", arquivo: "quimica-organica.pdf" },
  { id: 8, titulo: "Tabela Periódica", materia: "Química", arquivo: "tabela-periodica.pdf" },
  { id: 9, titulo: "Citologia", materia: "Biologia", arquivo: "citologia.pdf" },
  { id: 10, titulo: "Genética", materia: "Biologia", arquivo: "genetica.pdf" },
];

const BibliotecaMapas = () => {
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
              <Brain className="h-8 w-8 text-primary" />
              Mapas Mentais
            </h1>
            <p className="text-muted-foreground">
              Mapas mentais detalhados organizados por matéria
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

export default BibliotecaMapas;
