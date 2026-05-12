import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import BlogIndex from "./pages/BlogIndex";
import Article from "./pages/Article";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "./components/Shared";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg-base text-primary font-body overflow-x-hidden selection:bg-accent selection:text-white">
      <ScrollToTop />
      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20voc%C3%AA."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        onClick={() => trackEvent("whatsapp_click")}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 hover:shadow-[0_8px_40px_rgba(37,211,102,0.4)] transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<BlogIndex />} />
        <Route path="/artigos/:slug" element={<Article />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-bg-base text-primary flex items-center justify-center p-6">
              <div className="text-center">
                <h1 className="font-heading text-6xl mb-4 tracking-tight font-medium">
                  404
                </h1>
                <h2 className="text-2xl mb-4 font-medium font-heading">
                  Página não encontrada.
                </h2>
                <p className="text-secondary font-light mb-8 max-w-sm mx-auto">
                  O conteúdo que você tentou acessar não existe ou foi movido.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-bg-base font-medium tracking-wide hover:bg-accent active:scale-[0.98] transition-all duration-300"
                >
                  Voltar para o início
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
