import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Configuracoes = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Sucesso",
      description: "Suas informações foram atualizadas",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e preferências da plataforma.
          </p>
        </div>

        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize seus dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" value={user?.email} disabled />
                </div>
                <Button onClick={handleSaveProfile}>Salvar</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
              </CardHeader>
              <CardContent>
                <Button>Alterar Senha</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Configuracoes;
