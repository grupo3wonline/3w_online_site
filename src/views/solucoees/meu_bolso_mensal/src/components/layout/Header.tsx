import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Início", path: "/", icon: "fa-home" },
  { label: "Sobre", path: "/sobre", icon: "fa-info-circle" },
  { label: "Serviços", path: "/servicos", icon: "fa-briefcase" },
  { label: "Ferramentas", path: "/ferramentas", icon: "fa-calculator" },
  { label: "Contato", path: "/contato", icon: "fa-envelope" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-app">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="CalcFinance Pro - Página Inicial"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-card group-hover:shadow-elevated transition-shadow">
              <i className="fa-solid fa-calculator text-primary-foreground text-lg"></i>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg text-foreground">
                CalcFinance
              </span>
              <span className="font-display font-bold text-lg text-primary">
                Pro
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Menu principal"
          >
            {navItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <i className={`fa-solid ${item.icon} text-xs`}></i>
                    {item.label}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ir para {item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    document.documentElement.classList.toggle("dark");
                  }}
                  aria-label="Alternar tema"
                >
                  <i className="fa-solid fa-moon text-sm"></i>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Alternar tema claro/escuro</p>
              </TooltipContent>
            </Tooltip>
            <Link to="/ferramentas">
              <Button className="btn-gradient rounded-lg shadow-card hover:shadow-elevated">
                <i className="fa-solid fa-rocket mr-2 text-sm"></i>
                Começar Agora
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground"
                  aria-label="Abrir menu"
                >
                  <i className="fa-solid fa-bars text-lg"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <i className="fa-solid fa-calculator text-primary-foreground text-lg"></i>
                      </div>
                      <div>
                        <span className="font-display font-bold text-lg text-foreground">
                          CalcFinance
                        </span>
                        <span className="font-display font-bold text-lg text-primary">
                          Pro
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-4" aria-label="Menu mobile">
                    <ul className="space-y-1">
                      {navItems.map((item) => (
                        <li key={item.path}>
                          <SheetClose asChild>
                            <Link
                              to={item.path}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isActive(item.path)
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                              }`}
                            >
                              <i className={`fa-solid ${item.icon} w-5`}></i>
                              {item.label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t border-border space-y-3">
                    <SheetClose asChild>
                      <Link to="/ferramentas" className="block">
                        <Button className="w-full btn-gradient rounded-lg">
                          <i className="fa-solid fa-rocket mr-2"></i>
                          Começar Agora
                        </Button>
                      </Link>
                    </SheetClose>
                    <p className="text-xs text-muted-foreground text-center">
                      Desenvolvido por{" "}
                      <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Grupo 3W Online
                      </a>
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}