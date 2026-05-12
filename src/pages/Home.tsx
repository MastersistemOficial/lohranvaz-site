import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  BrainCircuit,
  GraduationCap,
  Briefcase,
  Users,
  Check,
  Menu,
  X,
  Instagram,
  Phone,
  Mail,
  Globe
} from "lucide-react";
import {
  trackEvent,
  Logo,
  Footer,
  FADE_UP_VARIANTS,
  STAGGER_CHILDREN,
} from "../components/Shared";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Lohran Vaz | Psicólogo Clínico";
    window.scrollTo(0, 0);
  }, []);

  const formLoadTime = useRef(Date.now());
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipoAtendimento: "Pessoa Física",
    mensagem: "",
    website: "", // honeypot
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const normalizePhone = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (
      !formData.nome ||
      formData.nome.trim().length < 2 ||
      !/[a-zA-Z]/.test(formData.nome)
    ) {
      errors.nome = "Informe seu nome.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !formData.email ||
      !emailRegex.test(formData.email) ||
      formData.email.includes("teste") ||
      formData.email.startsWith("@")
    ) {
      errors.email = "Informe um e-mail válido.";
    }

    const phoneDigits = normalizePhone(formData.telefone);
    const repeatedPhonePattern = /^(.)\1+$/;
    if (
      phoneDigits.length < 10 ||
      phoneDigits.length > 13 ||
      repeatedPhonePattern.test(phoneDigits)
    ) {
      errors.telefone = "Informe um telefone válido com DDD.";
    }

    if (!formData.tipoAtendimento) {
      errors.tipoAtendimento = "Selecione o tipo de atendimento.";
    }

    if (!formData.mensagem || formData.mensagem.trim().length < 10) {
      errors.mensagem = "Escreva uma mensagem um pouco mais completa.";
    } else if (formData.mensagem.length > 1000) {
      errors.mensagem =
        "Sua mensagem está muito longa. Reduza o texto para enviar.";
    }

    // Basic check for script tags or excessive links
    if (
      /<script/i.test(formData.mensagem) ||
      (formData.mensagem.match(/http/g) || []).length > 3
    ) {
      errors.mensagem = "Mensagem inválida. Remova links ou scripts.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) {
      return; // silently ignore
    }

    // Min time check (3 seconds)
    if (Date.now() - formLoadTime.current < 3000) {
      setFormErrors({ general: "Revise as informações antes de enviar." });
      return;
    }

    // Cooldown check (45 seconds)
    const lastSubmit = localStorage.getItem("lastFormSubmitForm");
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 45000) {
      setFormErrors({
        general: "Aguarde alguns segundos antes de enviar novamente.",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");
    setFormErrors({});

    try {
      const payload = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        telefone: normalizePhone(formData.telefone),
        tipoAtendimento: formData.tipoAtendimento,
        mensagem: formData.mensagem.trim(),
        origem: "Site Lohran Vaz",
        submittedAt: new Date().toISOString(),
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbw0wfF_Q9fl0SN8BuRliCTanuRmQaC21X2hZ0XFdKAh5G4y1kcoqoF5iFRBXdGIMQDFww/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
          mode: "no-cors",
        },
      );

      setFormStatus("success");
      localStorage.setItem("lastFormSubmitForm", Date.now().toString());
      trackEvent("form_submit_success");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        tipoAtendimento: "Pessoa Física",
        mensagem: "",
        website: "",
      });
    } catch (error) {
      setFormStatus("error");
      trackEvent("form_submit_error", error);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 w-full z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="/" className="active:scale-[0.98] transition-all">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-widest font-medium text-secondary">
            <button
              onClick={() => scrollToSection("sobre")}
              className="hover:text-accent transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("para-voce")}
              className="hover:text-accent transition-colors"
            >
              Para Você
            </button>
            <button
              onClick={() => scrollToSection("metodo")}
              className="hover:text-accent transition-colors"
            >
              Método
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-accent transition-colors"
            >
              FAQ
            </button>
            <a href="/artigos" className="hover:text-accent transition-colors">
              Artigos
            </a>
            <button
              onClick={() => scrollToSection("contato")}
              className="px-6 py-2.5 bg-primary text-bg-base hover:bg-accent transition-colors duration-500 rounded-none tracking-widest text-xs"
            >
              AGENDAR
            </button>
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
                <button
                  align="left"
                  onClick={() => scrollToSection("sobre")}
                  className="hover:text-accent transition-colors text-left"
                >
                  Sobre
                </button>
                <button
                  align="left"
                  onClick={() => scrollToSection("para-voce")}
                  className="hover:text-accent transition-colors text-left"
                >
                  Para Você
                </button>
                <button
                  align="left"
                  onClick={() => scrollToSection("metodo")}
                  className="hover:text-accent transition-colors text-left"
                >
                  Método
                </button>
                <button
                  align="left"
                  onClick={() => scrollToSection("faq")}
                  className="hover:text-accent transition-colors text-left"
                >
                  FAQ
                </button>
                <a
                  href="/artigos"
                  className="hover:text-accent transition-colors text-left"
                >
                  Artigos
                </a>
                <a
                  href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20primeira%20conversa."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    trackEvent("schedule_click");
                  }}
                  className="block mt-4 px-6 py-4 w-full bg-primary text-bg-base hover:bg-accent active:scale-[0.98] transition-all duration-300 text-center tracking-widest text-xs"
                >
                  AGENDAR CONVERSA
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-[95vh] flex items-center overflow-hidden">
          {/* Oversized background typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
            <h1 className="font-heading text-[18vw] leading-none whitespace-nowrap tracking-widest text-primary select-none mt-20">
              LOHRAN VAZ
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER_CHILDREN}
              className="md:col-span-6 lg:col-span-5 flex flex-col justify-center"
            >
              <motion.h1
                variants={FADE_UP_VARIANTS}
                className="text-5xl md:text-6xl lg:text-7xl font-heading leading-[1.05] mb-8 text-primary font-medium tracking-tight"
              >
                Psicologia que traz{" "}
                <span className="italic font-light text-accent">clareza</span>{" "}
                para mentes exigidas e vidas reais.
              </motion.h1>

              <motion.p
                variants={FADE_UP_VARIANTS}
                className="text-lg text-secondary leading-relaxed mb-12 font-light max-w-md"
              >
                Ansiedade, sobrecarga, pressão e conflitos não precisam definir
                quem você é nem a forma como você vive e se relaciona.
              </motion.p>

              <motion.div
                variants={FADE_UP_VARIANTS}
                className="flex flex-col sm:flex-row gap-4 mb-16"
              >
                <a
                  href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20primeira%20conversa."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("schedule_click")}
                  className="group relative px-8 py-4 bg-primary text-bg-base overflow-hidden font-medium tracking-wide flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
                >
                  <div className="absolute inset-0 w-full h-full bg-accent origin-bottom transform scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Agendar conversa{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20voc%C3%AA."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click")}
                  className="group px-8 py-4 bg-transparent border border-primary/20 text-primary font-medium tracking-wide hover:border-primary active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2"
                >
                  Falar no WhatsApp
                </a>
              </motion.div>

              <motion.div
                variants={FADE_UP_VARIANTS}
                className="text-xs uppercase tracking-widest text-muted font-medium flex items-center gap-3"
              >
                <span className="w-8 h-px bg-muted/50"></span>
                Psicólogo Clínico | CRP 05/80269
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, clipPath: "inset(10% 0 10% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="md:col-span-6 lg:col-span-7 h-[600px] md:h-[750px] w-full rounded-t-[100px] md:rounded-t-[200px] overflow-hidden relative group"
            >
              {/* Premium cinematic placeholder */}
              <div className="absolute inset-0 bg-beige/30"></div>
              <img
                src="/perfil.png"
                alt="Lohran Vaz"
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </motion.div>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="sobre" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={STAGGER_CHILDREN}
            >
              <h2 className="text-4xl md:text-5xl font-heading leading-tight mb-8 font-medium">
                Psicologia com profundidade.{" "}
                <span className="italic text-accent">
                  Visão humana e estratégica.
                </span>
              </h2>
              <div className="space-y-6 text-lg text-secondary font-light leading-relaxed mb-12">
                <p>
                  Sou Lohran Vaz, psicólogo clínico com abordagem em TCC,
                  pós-graduado em Direitos Humanos e especialista em Psicologia
                  Organizacional.
                </p>
                <p>
                  Atuo com pessoas que vivem sob alta pressão e precisam de
                  clareza, organização mental e equilíbrio emocional para viver
                  com mais leveza e propósito.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-12">
                {[
                  {
                    icon: BrainCircuit,
                    text: "Terapia Cognitivo-Comportamental",
                  },
                  {
                    icon: GraduationCap,
                    text: "Pós-graduação em Direitos Humanos",
                  },
                  { icon: Briefcase, text: "Psicologia Organizacional" },
                  { icon: Users, text: "Palestrante & Consultor" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <item.icon className="w-5 h-5 text-accent shrink-0 mt-1 stroke-[1.5]" />
                    <span className="text-secondary text-sm font-medium leading-snug">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6 border border-beige bg-white rounded-2xl md:rounded-bl-none text-sm text-secondary font-light italic relative">
                <div className="absolute -left-px top-1/2 -translate-y-1/2 w-1 h-12 bg-accent rounded-r-md"></div>
                "Também atuo com empresas e líderes em saúde mental
                organizacional e desenvolvimento humano."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, clipPath: "circle(50% at 50% 50%)" }}
              whileInView={{ opacity: 1, clipPath: "circle(100% at 50% 50%)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-[500px] md:h-[700px] rounded-full sm:rounded-[200px] overflow-hidden relative"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2669"
                alt="Ambiente de consultório de terapia"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale-[40%] contrast-125"
              />
            </motion.div>
          </div>
        </section>

        {/* 3. PARA VOCÊ QUE SECTION */}
        <section
          id="para-voce"
          className="py-32 bg-[#FAF8F5] relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-beige/30 rounded-full blur-[100px]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP_VARIANTS}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading leading-tight font-medium mb-6">
                Carrega muito. Entrega muito. <br className="hidden md:block" />
                <span className="italic text-accent">
                  E está cansado de aguentar tudo.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={STAGGER_CHILDREN}
              className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-16"
            >
              {[
                "Ansiedade",
                "Burnout",
                "TDAH",
                "Sobrecarga mental",
                "Pressão profissional",
                "Relações e conflitos",
                "Desorganização e foco",
                "Excesso de responsabilidades",
              ].map((problem, i) => (
                <motion.div
                  key={i}
                  variants={FADE_UP_VARIANTS}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                  <span className="font-heading text-xl md:text-2xl text-primary font-medium tracking-wide">
                    {problem}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. PROCESS SECTION */}
        <section id="metodo" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP_VARIANTS}
              className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-medium">
                Como funciona <br />
                <span className="italic text-accent">meu trabalho</span>
              </h2>
              <p className="text-secondary font-light max-w-sm md:text-right pb-2">
                Uma jornada estruturada para promover evolução psíquica
                consistente e clareza.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={STAGGER_CHILDREN}
              className="grid md:grid-cols-4 gap-8 relative"
            >
              {/* Connecting line desktop */}
              <div className="hidden md:block absolute top-[28px] left-[40px] right-[calc(25%+40px)] h-px bg-primary/10"></div>

              {[
                {
                  step: "01",
                  title: "Acolhimento e compreensão",
                  desc: "Entendimento profundo do seu momento e histórico.",
                },
                {
                  step: "02",
                  title: "Avaliação estratégica",
                  desc: "Mapeamento de padrões, gatilhos e dinâmicas.",
                },
                {
                  step: "03",
                  title: "Plano personalizado",
                  desc: "Técnicas terapêuticas e organização de rotina.",
                },
                {
                  step: "04",
                  title: "Acompanhamento",
                  desc: "Evolução, manutenção e desenvolvimento.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={FADE_UP_VARIANTS}
                  className="relative premium-card bg-white p-8 pt-10 rounded-2xl md:rounded-[40px] overflow-hidden group"
                >
                  <div className="w-14 h-14 rounded-full bg-bg-base flex items-center justify-center font-heading text-xl font-medium text-accent mb-8 group-hover:bg-primary group-hover:text-bg-base transition-colors duration-500 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-secondary text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. TESTIMONIALS SECTION */}
        <section className="py-32 dark-section relative overflow-hidden">
          {/* Subtle green cinematic glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FADE_UP_VARIANTS}
              className="text-center mb-24"
            >
              <h2 className="text-3xl md:text-5xl font-heading italic text-beige font-light">
                "Mudança silenciosa, resultados visíveis."
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={STAGGER_CHILDREN}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  init: "G.S.S",
                  text: "A forma objetiva e ao mesmo tempo acolhedora fizeram toda a diferença para minha melhora. Hoje me sinto mais leve, seguro e no controle das minhas escolhas.",
                },
                {
                  init: "A.B",
                  text: "Com o acompanhamento entendi meu TDAH de verdade e aprendi estratégias que mudaram minha rotina, meu foco e minha autoestima.",
                },
                {
                  init: "G.A.F",
                  text: "O processo me ajudou a organizar minha mente, meus objetivos e minha carreira. Evoluí como profissional e como pessoa.",
                },
              ].map((test, idx) => (
                <motion.div
                  key={idx}
                  variants={FADE_UP_VARIANTS}
                  className="p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-8 h-px bg-accent mb-8 opacity-50"></div>
                  <p className="text-lg text-beige/80 font-light leading-relaxed mb-10 font-heading italic">
                    "{test.text}"
                  </p>
                  <div className="text-sm font-medium tracking-widest text-white/50">
                    {test.init}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section id="faq" className="py-32 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-medium mb-4">
                Dúvidas Frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Como funcionam os atendimentos?",
                  a: "As sessões ocorrem semanalmente ou quinzenalmente, com duração média de 50 minutos formadas por acolhimento e técnicas para promover melhoria em sua rotina.",
                },
                {
                  q: "O atendimento é online?",
                  a: "Sim. O atendimento online permite a você conforto, sigilo total e poder manter sua constância de tratamento independentemente da sua rotina e localização pelo mundo.",
                },
                {
                  q: "Você atende ansiedade e TDAH?",
                  a: "Sim. Tenho foco específico em auxiliar pacientes a criarem estratégias cognitivas para lidar com transtornos de ansiedade, sobrecarga e as nuances do TDAH adulto.",
                },
                {
                  q: "A terapia é apenas para empresários?",
                  a: "Não. Apesar da comunicação focar na alta pressão que lideranças sentem, atendo qualquer pessoa que esteja disposta a desenvolver maturidade emocional e organização diante dos conflitos diários.",
                },
                {
                  q: "Como funciona a primeira conversa?",
                  a: "É um momento de alinhamento e acolhimento para mapear a raiz do que te aflige e montar a direção do trabalho. Caso sinta segurança, iniciamos a proposta.",
                },
                {
                  q: "Você também atua em empresas?",
                  a: "Sim, através de palestras, consultorias e treinamento sobre saúde mental organizacional, auxiliando a criar ambientes mais sustentáveis.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-primary/10">
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={activeFaq === idx}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full text-left py-6 flex items-center justify-between font-heading text-xl md:text-2xl font-medium text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md transition-all"
                  >
                    <span>{faq.q}</span>
                    <span className="relative flex h-6 w-6 items-center justify-center shrink-0">
                      <span
                        className={`absolute h-px w-4 bg-current transition-transform duration-500 hover:rotate-180`}
                      ></span>
                      <span
                        className={`absolute h-4 w-px bg-current transition-transform duration-500 ${activeFaq === idx ? "rotate-90" : ""}`}
                      ></span>
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        id={`faq-answer-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="pb-8 text-secondary font-light leading-relaxed pr-8">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CONTACT & CTA SECTION */}
        <section id="contato" className="relative">
          {/* CTA Banner Area */}
          <div className="py-32 bg-primary text-bg-base relative overflow-hidden">
            {/* Subtle green cinematic glow */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-accent/20 blur-[120px] pointer-events-none translate-y-1/2"></div>

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight mb-12 font-medium"
              >
                Você não precisa esperar sua mente entrar em colapso{" "}
                <span className="italic font-light text-beige">
                  para começar a cuidar dela.
                </span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20primeira%20conversa."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("schedule_click")}
                  className="inline-block px-10 py-5 bg-beige text-primary font-medium tracking-wide hover:bg-white hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300"
                >
                  Agendar conversa
                </a>
                <a
                  href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20voc%C3%AA."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click")}
                  className="inline-block px-10 py-5 bg-transparent border border-beige/30 text-beige font-medium tracking-wide hover:border-beige active:scale-[0.98] transition-all duration-300"
                >
                  Falar no WhatsApp
                </a>
              </motion.div>
            </div>
          </div>

          {/* Form Area */}
          <div className="py-24 bg-bg-base">
            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-12 lg:sticky lg:top-32"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-heading font-medium mb-6 leading-tight">
                    Vamos conversar sobre o seu <span className="italic text-accent">momento</span>.
                  </h3>
                  <p className="text-secondary font-light leading-relaxed">
                    Sinta-se à vontade para entrar em contato através dos canais abaixo ou preenchendo o formulário. O sigilo e a discrição são totais.
                  </p>
                </div>

                <div className="space-y-6">
                  <a href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-primary hover:text-accent transition-colors group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-accent transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted/80 uppercase tracking-widest font-medium mb-1">WhatsApp</div>
                      <div className="font-medium">+55 (21) 99819-8208</div>
                    </div>
                  </a>

                  <a href="mailto:lohran.vaz@eleveme.io" className="flex items-center gap-4 text-primary hover:text-accent transition-colors group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-accent transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted/80 uppercase tracking-widest font-medium mb-1">E-mail</div>
                      <div className="font-medium">lohran.vaz@eleveme.io</div>
                    </div>
                  </a>

                  <a href="https://instagram.com/lohranvaz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-primary hover:text-accent transition-colors group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-accent transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted/80 uppercase tracking-widest font-medium mb-1">Instagram</div>
                      <div className="font-medium">@lohranvaz</div>
                    </div>
                  </a>

                  <a href="https://eleveme.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-primary hover:text-accent transition-colors group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-accent transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted/80 uppercase tracking-widest font-medium mb-1">Plataforma Eleve.me</div>
                      <div className="font-medium">eleveme.io</div>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white p-8 md:p-14 rounded-[32px] shadow-sm"
              >
                <div className="mb-10">
                  <h3 className="text-2xl font-heading font-medium tracking-wide">
                    Envie uma mensagem
                  </h3>
                  <div className="w-12 h-px bg-accent mt-4"></div>
                </div>

                <form
                  className="space-y-8"
                  onSubmit={handleFormSubmit}
                  noValidate
                >
                  {/* Honeypot field - deliberately hidden */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {formStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-primary/5 text-primary p-8 rounded-xl border border-primary/10 text-center flex flex-col items-center justify-center min-h-[300px]"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Check className="w-12 h-12 mb-4 text-accent" />
                      </motion.div>
                      <h4 className="text-xl font-heading font-medium mb-2">
                        Mensagem enviada com sucesso.
                      </h4>
                      <p className="text-sm font-light mb-8">
                        Em breve entrarei em contato.
                      </p>

                      <a
                        href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20enviei%20uma%20mensagem%20pelo%20site%20e%20gostaria%20de%20continuar%20pelo%20WhatsApp."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("whatsapp_click")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-medium rounded-full hover:bg-[#20bd5a] active:scale-95 transition-all w-fit mx-auto"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Falar no WhatsApp
                      </a>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {formErrors.general && (
                        <div className="text-sm text-center p-3 bg-red-50 text-red-800 rounded-xl border border-red-100">
                          {formErrors.general}
                        </div>
                      )}

                      <div className="flex flex-col gap-4">
                        <label className="text-xs uppercase tracking-widest text-muted font-medium ml-1">
                          Tipo de Atendimento
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {[
                            "Pessoa Física",
                            "Pessoa Jurídica",
                            "Palestra / Empresa",
                            "Outro",
                          ].map((option) => (
                            <label
                              key={option}
                              className="flex-1 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="tipoAtendimento"
                                value={option}
                                checked={formData.tipoAtendimento === option}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    tipoAtendimento: e.target.value,
                                  })
                                }
                                className="peer sr-only"
                              />
                              <div
                                className={`text-center py-3 sm:py-4 rounded-xl border text-secondary peer-checked:bg-primary peer-checked:border-primary peer-checked:text-bg-base transition-all font-light text-xs sm:text-sm ${formErrors.tipoAtendimento ? "border-red-400" : "border-primary/10"}`}
                              >
                                {option}
                              </div>
                            </label>
                          ))}
                        </div>
                        {formErrors.tipoAtendimento && (
                          <span className="text-xs text-red-500 ml-1 mt-1">
                            {formErrors.tipoAtendimento}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="nome" className="sr-only">
                          Nome completo
                        </label>
                        <input
                          id="nome"
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) =>
                            setFormData({ ...formData, nome: e.target.value })
                          }
                          className={`w-full bg-transparent border-b px-1 py-4 text-primary placeholder-muted/60 focus:outline-none transition-all font-light ${formErrors.nome ? "border-red-400 focus:border-red-500" : "border-primary/20 focus:border-accent"}`}
                          placeholder="Nome completo"
                        />
                        {formErrors.nome && (
                          <span className="text-xs text-red-500 ml-1 mt-2">
                            {formErrors.nome}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
                        <div className="flex flex-col">
                          <label htmlFor="email" className="sr-only">
                            E-mail
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className={`w-full bg-transparent border-b px-1 py-4 text-primary placeholder-muted/60 focus:outline-none transition-all font-light ${formErrors.email ? "border-red-400 focus:border-red-500" : "border-primary/20 focus:border-accent"}`}
                            placeholder="E-mail"
                          />
                          {formErrors.email && (
                            <span className="text-xs text-red-500 ml-1 mt-2">
                              {formErrors.email}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="telefone" className="sr-only">
                            Telefone / WhatsApp
                          </label>
                          <input
                            id="telefone"
                            type="tel"
                            required
                            value={formData.telefone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                telefone: formatPhone(e.target.value),
                              })
                            }
                            className={`w-full bg-transparent border-b px-1 py-4 text-primary placeholder-muted/60 focus:outline-none transition-all font-light ${formErrors.telefone ? "border-red-400 focus:border-red-500" : "border-primary/20 focus:border-accent"}`}
                            placeholder="Telefone / WhatsApp"
                          />
                          {formErrors.telefone && (
                            <span className="text-xs text-red-500 ml-1 mt-2">
                              {formErrors.telefone}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="mensagem" className="sr-only">
                          Mensagem / Como posso ajudar?
                        </label>
                        <textarea
                          id="mensagem"
                          rows={4}
                          required
                          value={formData.mensagem}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mensagem: e.target.value,
                            })
                          }
                          className={`w-full bg-transparent border-b px-1 py-4 text-primary placeholder-muted/60 focus:outline-none transition-all resize-none font-light ${formErrors.mensagem ? "border-red-400 focus:border-red-500" : "border-primary/20 focus:border-accent"}`}
                          placeholder="Mensagem / Como posso ajudar?"
                        ></textarea>
                        {formErrors.mensagem && (
                          <span className="text-xs text-red-500 ml-1 mt-2">
                            {formErrors.mensagem}
                          </span>
                        )}
                      </div>

                      {formStatus === "error" && (
                        <div className="text-center p-4 bg-red-50 text-red-800 rounded-xl mt-4">
                          <p className="text-sm mb-3">
                            Não foi possível enviar sua mensagem agora. Você
                            também pode falar comigo pelo WhatsApp.
                          </p>
                          <a
                            href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20tentei%20enviar%20uma%20mensagem%20pelo%20site%2C%20mas%20o%20formul%C3%A1rio%20n%C3%A3o%20funcionou."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("whatsapp_click")}
                            className="inline-block px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded hover:bg-[#20bd5a] transition-colors"
                          >
                            Falar no WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {formStatus !== "success" && (
                    <div className="mt-8 flex flex-col items-center">
                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="w-full py-5 flex items-center justify-center gap-2 bg-primary text-bg-base font-medium tracking-widest uppercase text-xs hover:bg-accent active:scale-[0.99] transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-bg-base"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          "Enviar contato"
                        )}
                      </button>

                      <p className="text-[10px] text-muted/60 mt-4 text-center max-w-[280px]">
                        Ao enviar, você concorda que seus dados sejam utilizados
                        apenas para retorno do contato solicitado.
                      </p>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. FOOTER */}
      <Footer />
    </>
  );
}
