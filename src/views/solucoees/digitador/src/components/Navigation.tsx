import { Button } from "@/components/ui/button";
import { Keyboard, Home, BookOpen, Timer, User, Trophy, MousePointer } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Keyboard className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">TypingMaster</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Button>
            </Link>
            
            <Link to="/lessons">
              <Button
                variant={isActive("/lessons") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Lições</span>
              </Button>
            </Link>
            
            <Link to="/speed-test">
              <Button
                variant={isActive("/speed-test") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Timer className="h-4 w-4" />
                <span>Teste Digitação</span>
              </Button>
            </Link>
            
            <Link to="/click-speed-test">
              <Button
                variant={isActive("/click-speed-test") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <MousePointer className="h-4 w-4" />
                <span>Teste Clique</span>
              </Button>
            </Link>
            
            <Link to="/practice">
              <Button
                variant={isActive("/practice") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Trophy className="h-4 w-4" />
                <span>Prática</span>
              </Button>
            </Link>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <Link to="/profile">
              <Button
                variant={isActive("/profile") ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;