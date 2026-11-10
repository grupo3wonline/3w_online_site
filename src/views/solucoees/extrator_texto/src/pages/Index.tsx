import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import OCRApp from "@/components/OCRApp";
import DocumentSpecificExtractor from "@/components/DocumentSpecificExtractor";

type View = "landing" | "ocr" | "specific";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("landing");

  if (currentView === "ocr") {
    return <OCRApp onBack={() => setCurrentView("landing")} />;
  }

  if (currentView === "specific") {
    return <DocumentSpecificExtractor onBack={() => setCurrentView("landing")} />;
  }

  return (
    <LandingPage 
      onNavigateToOCR={() => setCurrentView("ocr")} 
      onNavigateToSpecific={() => setCurrentView("specific")} 
    />
  );
};

export default Index;
