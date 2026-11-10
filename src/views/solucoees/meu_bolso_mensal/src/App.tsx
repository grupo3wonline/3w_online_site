import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import SobrePage from "@/pages/SobrePage";
import ServicosPage from "@/pages/ServicosPage";
import FerramentasPage from "@/pages/FerramentasPage";
import ContatoPage from "@/pages/ContatoPage";
import TermosPage from "@/pages/TermosPage";
import PrivacidadePage from "@/pages/PrivacidadePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/meu_bolso_mensal">
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/sobre" element={<Layout><SobrePage /></Layout>} />
          <Route path="/servicos" element={<Layout><ServicosPage /></Layout>} />
          <Route path="/ferramentas" element={<Layout showCTA={false}><FerramentasPage /></Layout>} />
          <Route path="/contato" element={<Layout><ContatoPage /></Layout>} />
          <Route path="/termos-de-uso" element={<Layout><TermosPage /></Layout>} />
          <Route path="/politica-de-privacidade" element={<Layout><PrivacidadePage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;