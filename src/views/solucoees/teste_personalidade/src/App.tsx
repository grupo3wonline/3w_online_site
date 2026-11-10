
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import TestSelector from "./pages/TestSelector";
import VocationalTest from "./pages/VocationalTest";
import VocationalResults from "./pages/VocationalResults";
import EnneagramTest from "./pages/EnneagramTest";
import EnneagramResults from "./pages/EnneagramResults";
import DiscTest from "./pages/DiscTest";
import DiscResults from "./pages/DiscResults";
import NotFound from "./pages/NotFound";
import MentalHealthCalculator from "./pages/MentalHealthCalculator";
import MentalHealthResults from "./pages/MentalHealthResults";
import MentalAgeTest from "./pages/MentalAgeTest";
import MentalAgeResults from "./pages/MentalAgeResults";
import IQTest from "./pages/IQTest";
import IQResults from "./pages/IQResults";
import AnimalProfileTest from "./pages/AnimalProfileTest";
import AnimalProfileResults from "./pages/AnimalProfileResults";
import ThreeAnimalsTest from "./pages/ThreeAnimalsTest";
import ThreeAnimalsResults from "./pages/ThreeAnimalsResults";
import TropicalForestTest from "./pages/TropicalForestTest";
import TropicalForestResults from "./pages/TropicalForestResults";
import ProfilerTest from "./pages/ProfilerTest";
import ProfilerResults from "./pages/ProfilerResults";
import BigFiveTest from "./pages/BigFiveTest";
import BigFiveResults from "./pages/BigFiveResults";
import MBTITest from "./pages/MBTITest";
import MBTIResults from "./pages/MBTIResults";
import STARTest from "./pages/STARTest";
import STARResults from "./pages/STARResults";
import TemperamentTest from "./pages/TemperamentTest";
import TemperamentResults from "./pages/TemperamentResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/teste_personalidade/">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Index />} />
            <Route path="/servicos" element={<Index />} />
            <Route path="/contato" element={<Index />} />
            <Route path="/termos" element={<Index />} />
            <Route path="/privacidade" element={<Index />} />
            <Route path="/ferramentas" element={<TestSelector />} />
            <Route path="/tests/vocational" element={<VocationalTest />} />
            <Route path="/tests/vocational/results" element={<VocationalResults />} />
            <Route path="/tests/enneagram" element={<EnneagramTest />} />
            <Route path="/tests/enneagram/results" element={<EnneagramResults />} />
            <Route path="/tests/disc" element={<DiscTest />} />
            <Route path="/tests/disc/results" element={<DiscResults />} />
            <Route path="/tests/mental-health" element={<MentalHealthCalculator />} />
            <Route path="/tests/mental-health/results" element={<MentalHealthResults />} />
            <Route path="/tests/mental-age" element={<MentalAgeTest />} />
            <Route path="/tests/mental-age/results" element={<MentalAgeResults />} />
            <Route path="/tests/iq" element={<IQTest />} />
            <Route path="/tests/iq/results" element={<IQResults />} />
            <Route path="/tests/animal-profile" element={<AnimalProfileTest />} />
            <Route path="/tests/animal-profile/results" element={<AnimalProfileResults />} />
            <Route path="/tests/three-animals" element={<ThreeAnimalsTest />} />
            <Route path="/tests/three-animals/results" element={<ThreeAnimalsResults />} />
            <Route path="/tests/tropical-forest" element={<TropicalForestTest />} />
            <Route path="/tests/tropical-forest/results" element={<TropicalForestResults />} />
            <Route path="/tests/profiler" element={<ProfilerTest />} />
            <Route path="/tests/profiler/results" element={<ProfilerResults />} />
            <Route path="/tests/big-five" element={<BigFiveTest />} />
            <Route path="/tests/big-five/results" element={<BigFiveResults />} />
            <Route path="/tests/mbti" element={<MBTITest />} />
            <Route path="/tests/mbti/results" element={<MBTIResults />} />
            <Route path="/tests/star" element={<STARTest />} />
            <Route path="/tests/star/results" element={<STARResults />} />
            <Route path="/tests/temperament" element={<TemperamentTest />} />
            <Route path="/tests/temperament/results" element={<TemperamentResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
