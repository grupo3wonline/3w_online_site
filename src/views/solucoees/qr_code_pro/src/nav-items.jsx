import { HomeIcon, QrCode, Lightbulb, BookOpen } from "lucide-react";
import Home from "./pages/Home.jsx";
import Generator from "./pages/Generator.jsx";
import Tips from "./pages/Tips.jsx";
import HowToUse from "./pages/HowToUse.jsx";

export const navItems = [
  {
    title: "Início",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Home />,
  },
  {
    title: "Gerador",
    to: "/gerador", 
    icon: <QrCode className="h-4 w-4" />,
    page: <Generator />,
  },
  {
    title: "Dicas",
    to: "/dicas",
    icon: <Lightbulb className="h-4 w-4" />,
    page: <Tips />,
  },
  {
    title: "Como Usar",
    to: "/como-usar",
    icon: <BookOpen className="h-4 w-4" />,
    page: <HowToUse />,
  },
];
