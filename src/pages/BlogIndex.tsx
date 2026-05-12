import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  trackEvent,
  Logo,
  Footer,
  FADE_UP_VARIANTS,
  STAGGER_CHILDREN,
} from "../components/Shared";

const ARTICLES = [
  {
    slug: "o-corpo-comeca-a-cobrar",
    title: "O corpo começa a cobrar o que a mente ignorou",
    category: "Burnout",
    excerpt:
      "Existe um momento em que o corpo começa a falar aquilo que a mente tentou silenciar por tempo demais.",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1500", // Silhouette by window
  },
  {
    slug: "adoecendo-enquanto-funciona",
    title: "Você pode estar funcionando e adoecendo ao mesmo tempo",
    category: "Sobrecarga Mental",
    excerpt:
      "Algumas pessoas continuam produzindo e cumprindo responsabilidades enquanto adoecem silenciosamente.",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1500", // Motion blur executive
  },
  {
    slug: "quem-cuida-de-quem-resolve",
    title: "Quem cuida de quem resolve os problemas de todo mundo?",
    category: "Rotina e Pressão",
    excerpt:
      "A solidão emocional muito comum em pessoas que sustentam muita coisa e aprenderam a ser apoio para todos.",
    readTime: "4 min de leitura",
    image:
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=1500", // Minimalist heavy architecture
  },
  {
    slug: "quando-descansar-nao-resolve-mais",
    title: "Quando descansar não resolve mais",
    category: "Burnout",
    excerpt:
      "Existe um tipo de cansaço que não melhora com um fim de semana livre. O que está exausto não é apenas o corpo.",
    readTime: "4 min de leitura",
    image:
      "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?auto=format&fit=crop&q=80&w=1500", // Unmade minimalistic bed
  },
  {
    slug: "como-o-trabalho-invade-sua-vida",
    title: "Como o trabalho invade sua vida sem você perceber",
    category: "Relações e Trabalho",
    excerpt:
      "Na dificuldade de desligar a mente, a culpa ao descansar e a sensação constante de urgência que permeia os momentos livres.",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1500", // Minimal aesthetic workspace
  },
];

export default function BlogIndex() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Artigos | Lohran Vaz - Psicólogo Clínico";
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-40 glass-nav transition-all duration-300 border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="active:scale-[0.98] transition-all">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-widest font-medium text-secondary">
            <Link to="/#sobre" className="hover:text-accent transition-colors">
              Sobre
            </Link>
            <Link to="/#metodo" className="hover:text-accent transition-colors">
              Método
            </Link>
            <Link
              to="/#para-voce"
              className="hover:text-accent transition-colors"
            >
              Para Você
            </Link>
            <Link to="/artigos" className="text-primary transition-colors">
              Artigos
            </Link>
            <Link
              to="/#contato"
              className="px-6 py-2.5 bg-primary text-bg-base hover:bg-accent active:scale-[0.98] transition-all duration-300 rounded-none tracking-widest text-xs"
            >
              AGENDAR
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg-base border-b border-primary/5 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-8 gap-6 uppercase tracking-widest text-sm text-secondary font-medium">
                <Link
                  to="/#sobre"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-accent transition-colors text-left"
                >
                  Sobre
                </Link>
                <Link
                  to="/#metodo"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-accent transition-colors text-left"
                >
                  Método
                </Link>
                <Link
                  to="/#para-voce"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-accent transition-colors text-left"
                >
                  Para Você
                </Link>
                <Link
                  to="/artigos"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-primary transition-colors text-left"
                >
                  Artigos
                </Link>
                <Link
                  to="/#contato"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mt-4 px-6 py-4 w-full bg-primary text-bg-base hover:bg-accent active:scale-[0.98] transition-all duration-300 text-center tracking-widest text-xs"
                >
                  AGENDAR CONVERSA
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-32 pb-24 md:pt-48 md:pb-32 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CHILDREN}
            className="max-w-3xl mb-24"
          >
            <motion.span
              variants={FADE_UP_VARIANTS}
              className="text-xs uppercase tracking-widest text-muted font-medium mb-6 block"
            >
              Editorial
            </motion.span>
            <motion.h1
              variants={FADE_UP_VARIANTS}
              className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight mb-8 text-primary font-medium tracking-tight"
            >
              Reflexões sobre mente, rotina, pressão e vida contemporânea.
            </motion.h1>
            <motion.p
              variants={FADE_UP_VARIANTS}
              className="text-lg text-secondary leading-relaxed font-light max-w-2xl"
            >
              Textos sobre ansiedade, sobrecarga, relações, trabalho, TDAH,
              burnout e os impactos silenciosos da vida moderna.
            </motion.p>
          </motion.div>

          {/* Article Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CHILDREN}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
          >
            {ARTICLES.map((article, idx) => (
              <motion.div
                key={idx}
                variants={FADE_UP_VARIANTS}
                className="group cursor-pointer"
              >
                <Link to={`/artigos/${article.slug}`} className="block">
                  <div className="overflow-hidden mb-8 aspect-[4/3] bg-beige/20 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading={idx < 2 ? "eager" : "lazy"}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale-[40%] contrast-110"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted mb-4">
                    <span>{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-accent"></span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-heading font-medium leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
                    {article.title}
                  </h2>

                  <p className="text-secondary font-light leading-relaxed max-w-md">
                    {article.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
