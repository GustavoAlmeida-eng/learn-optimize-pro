import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Assinatura = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Minha Assinatura</h1>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>Plano Anual ENEM</CardTitle>
              <Badge>Ativo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 49,90/mês</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Assinatura;
