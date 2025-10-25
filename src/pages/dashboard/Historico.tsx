import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Historico = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Meus Simulados</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Simulados</CardTitle>
            <CardDescription>
              Revise seus simulados anteriores e veja as correções
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Historico;
