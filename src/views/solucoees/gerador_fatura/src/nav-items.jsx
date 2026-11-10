import React from "react";
import { HomeIcon, FileTextIcon, ReceiptIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import AppPage from "./pages/AppPage.jsx";
import ReceiptPage from "./pages/ReceiptPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Início",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <LandingPage />,
  },
  {
    title: "Gerador de Notas Fiscais",
    to: "/app",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <AppPage />,
  },
  {
    title: "Recibos Fiscais",
    to: "/receipt",
    icon: <ReceiptIcon className="h-4 w-4" />,
    page: <ReceiptPage />,
  },
];
