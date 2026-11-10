import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CookieConsentProvider } from "@/contexts";
import { Layout } from "@/components/shared";

// Pages
import HomePage from "./pages/HomePage";
import FerramentaPage from "./pages/FerramentaPage";
import SobrePage from "./pages/SobrePage";
import ServicosPage from "./pages/ServicosPage";
import ContatoPage from "./pages/ContatoPage";
import TermosDeUsoPage from "./pages/TermosDeUsoPage";
import PoliticaDePrivacidadePage from "./pages/PoliticaDePrivacidadePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const basePath = '/watermark_wizard_online/';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <CookieConsentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basePath}>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/ferramenta" element={<Layout><FerramentaPage /></Layout>} />
              <Route path="/sobre" element={<Layout><SobrePage /></Layout>} />
              <Route path="/servicos" element={<Layout><ServicosPage /></Layout>} />
              <Route path="/contato" element={<Layout><ContatoPage /></Layout>} />
              <Route path="/termos-de-uso" element={<Layout><TermosDeUsoPage /></Layout>} />
              <Route path="/politica-de-privacidade" element={<Layout><PoliticaDePrivacidadePage /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CookieConsentProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
