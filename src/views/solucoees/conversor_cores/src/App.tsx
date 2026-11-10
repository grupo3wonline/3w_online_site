import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import FerramentaPage from "./pages/Ferramenta";
import SobrePage from "./pages/Sobre";
import ServicosPage from "./pages/Servicos";
import ContatoPage from "./pages/Contato";
import NotFound from "./pages/NotFound";
import TermosDeUsoPage from "./pages/Termos";
import PoliticaPage from "./pages/Privacidade";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/conversor_cores/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ferramenta" element={<FerramentaPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/termos" element={<TermosDeUsoPage />} />
          <Route path="/privacidade" element={<PoliticaPage />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
