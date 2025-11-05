import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import IndexEnem from "./pages/IndexEnem";
import IndexRegular from "./pages/IndexRegular";
import About from "./pages/About";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import NovoSimulado from "./pages/dashboard/NovoSimulado";
import SimuladoView from "./pages/dashboard/SimuladoView";
import SimuladoAnalise from "./pages/dashboard/SimuladoAnalise";
import Desempenho from "./pages/dashboard/Desempenho";
import Historico from "./pages/dashboard/Historico";
import Biblioteca from "./pages/dashboard/Biblioteca";
import BibliotecaMapas from "./pages/dashboard/BibliotecaMapas";
import BibliotecaResumos from "./pages/dashboard/BibliotecaResumos";
import BibliotecaSlides from "./pages/dashboard/BibliotecaSlides";
import Questoes from "./pages/dashboard/Questoes";
import QuestoesView from "./pages/dashboard/QuestoesView";
import QuestoesHistorico from "./pages/dashboard/QuestoesHistorico";
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
            <Route path="/enem" element={<IndexEnem />} />
            <Route path="/regular" element={<IndexRegular />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/novo-simulado" element={<NovoSimulado />} />
            <Route path="/dashboard/simulado/:id" element={<SimuladoView />} />
            <Route path="/dashboard/simulado/:id/analise" element={<SimuladoAnalise />} />
            <Route path="/dashboard/desempenho" element={<Desempenho />} />
            <Route path="/dashboard/historico" element={<Historico />} />
            <Route path="/dashboard/biblioteca" element={<Biblioteca />} />
            <Route path="/dashboard/biblioteca/mapas" element={<BibliotecaMapas />} />
            <Route path="/dashboard/biblioteca/resumos" element={<BibliotecaResumos />} />
            <Route path="/dashboard/biblioteca/slides" element={<BibliotecaSlides />} />
            <Route path="/dashboard/questoes" element={<Questoes />} />
            <Route path="/dashboard/questoes/:id" element={<QuestoesView />} />
            <Route path="/dashboard/questoes/historico" element={<QuestoesHistorico />} />
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
