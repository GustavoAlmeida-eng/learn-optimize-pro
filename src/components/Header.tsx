import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, LogIn } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-heading text-xl font-bold text-primary">EstudaMax</span>
          </Link>

          {/* Navigation Buttons */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/enem")}
              className="gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              ENEM e Vestibulares
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/regular")}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Ensino Regular
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/sobre")}
            >
              Quem Somos
            </Button>
            <Button
              variant="default"
              onClick={() => navigate("/login")}
              className="gap-2 ml-2"
            >
              <LogIn className="h-4 w-4" />
              Área do Cliente
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => {
              // Add mobile menu logic here if needed
            }}
          >
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
