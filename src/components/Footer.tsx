import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent">
              EstudaMax
            </h3>
            <p className="text-background/80 text-sm">
              Otimize seus estudos e conquiste seus objetivos acadêmicos com
              nossa plataforma inteligente.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#pricing" className="hover:text-background transition-colors">
                  Planos
                </a>
              </li>
              <li>
                <a href="#video" className="hover:text-background transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Simulados
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contato@estudamax.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (11) 9999-9999
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                São Paulo, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>© 2025 EstudaMax. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
