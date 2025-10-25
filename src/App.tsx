import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NovoSimulado from "./pages/dashboard/NovoSimulado";
import Desempenho from "./pages/dashboard/Desempenho";
import Historico from "./pages/dashboard/Historico";
import Biblioteca from "./pages/dashboard/Biblioteca";
import Questoes from "./pages/dashboard/Questoes";
import Configuracoes from "./pages/dashboard/Configuracoes";
import Assinatura from "./pages/dashboard/Assinatura";
import Ajuda from "./pages/dashboard/Ajuda";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/novo-simulado" element={<NovoSimulado />} />
            <Route path="/dashboard/desempenho" element={<Desempenho />} />
            <Route path="/dashboard/historico" element={<Historico />} />
            <Route path="/dashboard/biblioteca" element={<Biblioteca />} />
            <Route path="/dashboard/questoes" element={<Questoes />} />
            <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
            <Route path="/dashboard/assinatura" element={<Assinatura />} />
            <Route path="/dashboard/ajuda" element={<Ajuda />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
