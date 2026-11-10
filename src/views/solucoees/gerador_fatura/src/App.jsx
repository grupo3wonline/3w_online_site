import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieBanner from "./components/layout/CookieBanner";

// Pages
import LandingPage from "./pages/LandingPage";
import AppPage from "./pages/AppPage";
import ReceiptPage from "./pages/ReceiptPage";
import TemplatePage from "./pages/TemplatePage";
import TemplatesPage from "./pages/TemplatesPage";
import SobrePage from "./pages/SobrePage";
import ServicosPage from "./pages/ServicosPage";
import FerramentasPage from "./pages/FerramentasPage";
import ContatoPage from "./pages/ContatoPage";
import TermosUsoPage from "./pages/TermosUsoPage";
import PoliticaPrivacidadePage from "./pages/PoliticaPrivacidadePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter basename="/gerador_fatura/">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/template" element={<TemplatePage />} />
          <Route path="/templates" element={<TemplatesPage />} />

          {/* Institutional Pages */}
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/ferramentas" element={<FerramentasPage />} />
          <Route path="/contato" element={<ContatoPage />} />

          {/* Legal Pages (LGPD) */}
          <Route path="/termos" element={<TermosUsoPage />} />
          <Route path="/privacidade" element={<PoliticaPrivacidadePage />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;