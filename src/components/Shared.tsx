import { Link, useLocation } from "react-router-dom";
import { Instagram, Phone, Mail, MessageCircle, Globe } from "lucide-react";

export const trackEvent = (eventName: string, eventData: any = {}) => {
  console.log("Event:", eventName, eventData);

  if (typeof window !== "undefined") {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", eventName, eventData);
    }
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", eventName, eventData);
    }
  }
};

export const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const STAGGER_CHILDREN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export const Logo = () => (
  <div className="relative inline-flex flex-col items-center justify-center -mt-2">
    <span className="font-heading text-2xl tracking-[0.2em] leading-none text-primary z-10 font-bold uppercase">
      Lohran
    </span>
    <span className="font-heading text-xl tracking-[0.3em] leading-none text-accent -mt-2 ml-6 opacity-90 mix-blend-multiply uppercase">
      Vaz
    </span>
  </div>
);

export const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToSection = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-bg-base border-t border-primary/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-sm">
            <div className="mb-8">
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-block hover:scale-[0.98] transition-transform"
              >
                <Logo />
              </Link>
            </div>
            <p className="text-muted font-light leading-relaxed mb-8">
              Psicologia clínica e estratégia organizacional voltada para
              resultados, sustentada na ética e na profundidade humana.
            </p>
            <div className="text-xs text-muted/60 font-medium tracking-widest uppercase mb-8">
              CRP: 05/80269 <br /> LOHRAN VAZ
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-bg-base font-bold text-xs">
                E
              </span>
              <a
                href="https://eleveme.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                eleveme.io
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-24">
            <div>
              <h4 className="font-heading text-lg font-medium mb-6">
                Navegação
              </h4>
              <ul className="space-y-4 font-light text-sm text-secondary">
                <li>
                  <button
                    onClick={() => scrollToSection("sobre")}
                    className="hover:text-accent transition-colors"
                  >
                    Sobre
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("metodo")}
                    className="hover:text-accent transition-colors"
                  >
                    Como funciona
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("para-voce")}
                    className="hover:text-accent transition-colors"
                  >
                    Para você
                  </button>
                </li>
                <li>
                  <Link
                    to="/artigos"
                    className="hover:text-accent transition-colors"
                  >
                    Artigos
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contato")}
                    className="hover:text-accent transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-medium mb-6">Contato</h4>
              <ul className="space-y-4 font-light text-sm text-secondary">
                <li>
                  <a
                    href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click")}
                    className="flex items-center gap-3 hover:text-accent transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+5521998198208"
                    className="flex items-center gap-3 hover:text-accent transition-colors"
                  >
                    <Phone className="w-4 h-4" /> (21) 99819-8208
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/lohranvaz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-accent transition-colors"
                  >
                    <Instagram className="w-4 h-4" /> @lohranvaz
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:lohran.vaz@eleveme.io"
                    className="flex items-center gap-3 hover:text-accent transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted/60 text-xs font-light">
            &copy; {new Date().getFullYear()} Lohran Vaz. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted/60 hover:text-primary transition-colors font-light"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-xs text-muted/60 hover:text-primary transition-colors font-light"
            >
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
