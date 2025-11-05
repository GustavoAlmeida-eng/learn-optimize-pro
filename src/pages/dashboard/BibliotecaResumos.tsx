import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const resumos = [
  { id: 1, titulo: "Brasil Colônia", materia: "História", arquivo: "brasil-colonia.pdf" },
  { id: 2, titulo: "Império Brasileiro", materia: "História", arquivo: "imperio-brasileiro.pdf" },
  { id: 3, titulo: "República Velha", materia: "História", arquivo: "republica-velha.pdf" },
  { id: 4, titulo: "Cartografia", materia: "Geografia", arquivo: "cartografia.pdf" },
  { id: 5, titulo: "Climatologia", materia: "Geografia", arquivo: "climatologia.pdf" },
  { id: 6, titulo: "Geopolítica", materia: "Geografia", arquivo: "geopolitica.pdf" },
  { id: 7, titulo: "Modernismo", materia: "Literatura", arquivo: "modernismo.pdf" },
  { id: 8, titulo: "Romantismo", materia: "Literatura", arquivo: "romantismo.pdf" },
  { id: 9, titulo: "Realismo", materia: "Literatura", arquivo: "realismo.pdf" },
  { id: 10, titulo: "Filósofos Pré-Socráticos", materia: "Filosofia", arquivo: "pre-socraticos.pdf" },
];

const BibliotecaResumos = () => {
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
              <FileText className="h-8 w-8 text-secondary" />
              Resumos
            </h1>
            <p className="text-muted-foreground">
              Resumos práticos e diretos ao ponto
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

export default BibliotecaResumos;
