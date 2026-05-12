import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { Menu, X, ArrowLeft } from "lucide-react";
import {
  trackEvent,
  Logo,
  Footer,
  FADE_UP_VARIANTS,
  STAGGER_CHILDREN,
} from "../components/Shared";

const ARTICLES_DB: Record<string, any> = {
  "o-corpo-comeca-a-cobrar": {
    title: "O corpo começa a cobrar o que a mente ignorou",
    category: "Burnout",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1500",
    content: `
      <p>Existe um momento em que o corpo começa a falar aquilo que a mente tentou silenciar por tempo demais.</p>
      
      <p>Às vezes não vem como um grande colapso.<br/>Vem como:</p>
      
      <p>
        um cansaço constante,<br/>
        uma irritação sem motivo aparente,<br/>
        dores recorrentes,<br/>
        dificuldade para dormir,<br/>
        ansiedade,<br/>
        sensação de estar sempre “ligado”,<br/>
        perda de prazer,<br/>
        dificuldade de concentração,<br/>
        ou aquela impressão estranha de que você está funcionando… mas não está realmente bem.
      </p>

      <p>E talvez a pergunta mais importante seja:</p>
      <h3>Há quanto tempo você não se sente verdadeiramente em paz?</h3>
      
      <p>Muitas pessoas aprendem a sobreviver em estado de alerta constante. Se acostumam a resolver problemas, carregar responsabilidades, sustentar rotinas intensas e seguir funcionando independentemente do que sentem.</p>
      
      <p>Mas o corpo não interpreta produtividade como saúde.</p>
      
      <p>A mente pode racionalizar:<br/>
      “É só uma fase.”<br/>
      “Depois melhora.”<br/>
      “Agora não dá para parar.”<br/>
      “Tem gente dependendo de mim.”</p>
      
      <p>O corpo apenas responde ao excesso.</p>
      
      <p>A psicologia moderna já demonstra há bastante tempo a relação entre estresse crônico, sobrecarga emocional e alterações fisiológicas importantes. Cortisol elevado, hiperativação do sistema nervoso, piora do sono, irritabilidade, fadiga mental e até sintomas físicos persistentes podem surgir quando o organismo permanece em estado constante de pressão.</p>
      
      <p>O problema é que muitas pessoas só procuram ajuda quando o sofrimento deixa de ser silencioso.</p>
      
      <p>E existe algo muito comum em pessoas extremamente responsáveis:<br/>
      a dificuldade de confiar, dividir peso e reconhecer os próprios limites.</p>
      
      <p>Muitas vezes a lógica interna se torna:<br/>
      “Se eu não resolver, ninguém resolve.”<br/>
      “Se eu parar, tudo desmorona.”<br/>
      “Preciso continuar.”</p>
      
      <p>Mas isso nem sempre é força.<br/>
      Às vezes é apenas sobrevivência prolongada.</p>
      
      <p>E é nesse ponto que o cuidado psicológico deixa de ser apenas “falar sobre problemas”.</p>
      
      <p>Ele passa a ser:</p>
      
      <p>
        reorganização mental,<br/>
        clareza emocional,<br/>
        prevenção,<br/>
        consciência,<br/>
        equilíbrio,<br/>
        construção de uma vida que seja sustentável emocionalmente.
      </p>
      
      <p>Porque existe uma diferença enorme entre:<br/>
      funcionar…<br/>
      e viver bem.</p>
      
      <p>Talvez o corpo não esteja “atrapalhando”.<br/>
      Talvez ele esteja tentando avisar que alguma parte sua ficou tempo demais sem cuidado.</p>
    `,
  },
  "adoecendo-enquanto-funciona": {
    title: "Você pode estar funcionando e adoecendo ao mesmo tempo",
    category: "Sobrecarga Mental",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1500",
    content: `
      <p>Nem todo sofrimento paralisa.</p>
      
      <p>Algumas pessoas continuam produzindo, trabalhando, resolvendo problemas, cuidando da família e cumprindo responsabilidades enquanto adoecem silenciosamente.</p>
      
      <p>E justamente por continuarem funcionando, acreditam que está tudo bem.</p>
      
      <p>Mas produtividade não é sinônimo de saúde emocional.</p>
      
      <p>Existe um tipo de sofrimento moderno que quase passa despercebido porque ele se mistura com desempenho, rotina intensa e excesso de responsabilidades. A pessoa acorda cansada, vive acelerada, não consegue descansar de verdade, sente a mente constantemente ocupada… mas continua entregando resultados.</p>
      
      <p>Por fora:<br/>
      funcional.</p>
      
      <p>Por dentro:<br/>
      exausto.</p>
      
      <p>A psicologia chama atenção há anos para o impacto do estresse crônico e da sobrecarga emocional contínua. O organismo humano não foi feito para permanecer permanentemente em estado de alerta.</p>
      
      <p>Quando isso se torna rotina, começam a surgir:</p>
      
      <p>
        irritabilidade,<br/>
        ansiedade constante,<br/>
        dificuldade de concentração,<br/>
        alterações no sono,<br/>
        sensação de vazio,<br/>
        desconexão emocional,<br/>
        perda de prazer,<br/>
        e uma fadiga que descanso nenhum parece resolver.
      </p>
      
      <p>O mais perigoso é que muitas pessoas aprendem a normalizar isso.</p>
      
      <p>Transformam o sofrimento em rotina.<br/>
      Transformam exaustão em personalidade.<br/>
      Transformam sobrevivência em modo de vida.</p>
      
      <p>E aos poucos deixam de perceber o quanto estão distantes de si mesmas.</p>
      
      <p>Existe também um fator importante:<br/>
      pessoas muito responsáveis costumam receber reforço social pelo excesso.</p>
      
      <p>Elas são vistas como fortes, produtivas, resilientes.<br/>
      Mas raramente alguém pergunta:<br/>
      “Como você realmente está?”</p>
      
      <p>Cuidar da saúde mental não significa perder desempenho.<br/>
      Na maioria das vezes significa justamente o contrário:<br/>
      recuperar clareza, presença, equilíbrio e capacidade de sustentar a própria vida sem se destruir no processo.</p>
      
      <p>Porque continuar funcionando não significa necessariamente que você está bem.</p>
      
      <p>Às vezes significa apenas que você se acostumou a ignorar sinais importantes demais.</p>
    `,
  },
  "quem-cuida-de-quem-resolve": {
    title: "Quem cuida de quem resolve os problemas de todo mundo?",
    category: "Rotina e Pressão",
    readTime: "4 min de leitura",
    image:
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=1500",
    content: `
      <p>Existe uma solidão emocional muito comum em pessoas que sustentam muita coisa.</p>
      
      <p>Pessoas que resolvem.<br/>
      Que organizam.<br/>
      Que seguram problemas.<br/>
      Que tomam decisões.<br/>
      Que cuidam.<br/>
      Que lideram.<br/>
      Que protegem.</p>
      
      <p>Com o tempo, elas aprendem a ser apoio para todo mundo… mas quase nunca encontram espaço para também serem cuidadas.</p>
      
      <p>E isso cria uma lógica silenciosa:<br/>
      “Eu preciso aguentar.”<br/>
      “Não posso demonstrar fraqueza.”<br/>
      “Tem gente dependendo de mim.”</p>
      
      <p>A questão é que ninguém sustenta pressão constante sem pagar algum preço emocional por isso.</p>
      
      <p>Muitas vezes o sofrimento não aparece como um colapso imediato.<br/>
      Ele aparece como:</p>
      
      <p>
        irritabilidade,<br/>
        distanciamento emocional,<br/>
        dificuldade de relaxar,<br/>
        ansiedade,<br/>
        excesso de controle,<br/>
        sensação constante de responsabilidade,<br/>
        culpa ao descansar,<br/>
        dificuldade de confiar,<br/>
        ou incapacidade de desligar a mente.
      </p>
      
      <p>Existe um padrão muito frequente em pessoas altamente responsáveis:<br/>
      elas se tornam excelentes em resolver problemas externos enquanto se afastam das próprias necessidades emocionais.</p>
      
      <p>E aos poucos começam a existir apenas em função do que precisam sustentar.</p>
      
      <p>A terapia não existe para transformar pessoas fortes em pessoas frágeis.</p>
      
      <p>Ela existe para impedir que pessoas fortes precisem chegar ao limite para perceber que também precisam de suporte.</p>
      
      <p>Porque até quem carrega muita coisa precisa de espaço para respirar, reorganizar a mente e existir além das próprias responsabilidades.</p>
      
      <p>Talvez maturidade emocional não seja carregar tudo sozinho.</p>
      
      <p>Talvez seja reconhecer que ninguém deveria precisar suportar tudo sem apoio.</p>
    `,
  },
  "quando-descansar-nao-resolve-mais": {
    title: "Quando descansar não resolve mais",
    category: "Burnout",
    readTime: "4 min de leitura",
    image:
      "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?auto=format&fit=crop&q=80&w=1500",
    content: `
      <p>Existe um tipo de cansaço que não melhora com um fim de semana livre.</p>

      <p>Você dorme.<br/>
      Tenta desacelerar.<br/>
      Fica alguns dias longe do trabalho.<br/>
      Mas a sensação continua ali.</p>
      
      <p>A mente segue acelerada.<br/>
      O corpo continua pesado.<br/>
      A irritação permanece.<br/>
      O vazio permanece.</p>
      
      <p>E isso acontece porque nem todo cansaço é físico.</p>
      
      <p>Às vezes o que está exausto não é apenas o corpo.<br/>
      É o sistema emocional inteiro.</p>
      
      <p>Pessoas sob pressão constante frequentemente entram em um modo automático de funcionamento. Continuam produzindo, resolvendo problemas e cumprindo obrigações enquanto ignoram sinais importantes de desgaste psicológico.</p>
      
      <p>O problema é que o organismo humano consegue sustentar estados prolongados de alerta por um tempo… mas não indefinidamente.</p>
      
      <p>Chega um momento em que descansar já não é suficiente porque o que precisa de cuidado não é apenas o sono:<br/>
      é a forma como você está vivendo.</p>
      
      <p>A psicologia mostra que estresse crônico, excesso de responsabilidade e ausência de recuperação emocional real impactam diretamente:</p>
      
      <p>
        humor,<br/>
        concentração,<br/>
        memória,<br/>
        energia,<br/>
        relações,<br/>
        produtividade,<br/>
        e até a percepção da própria vida.
      </p>
      
      <p>E muitas pessoas só percebem isso quando começam a sentir que perderam a capacidade de sentir presença, prazer ou leveza.</p>
      
      <p>Como se tudo tivesse virado apenas obrigação.</p>
      
      <p>Cuidar da mente não é um luxo.<br/>
      É manutenção da própria capacidade de viver bem.</p>
      
      <p>Porque uma vida emocionalmente saudável não é aquela sem responsabilidades.</p>
      
      <p>É aquela em que você consegue sustentar suas responsabilidades sem perder a si mesmo no processo.</p>
    `,
  },
  "como-o-trabalho-invade-sua-vida": {
    title: "Como o trabalho invade sua vida sem você perceber",
    category: "Relações e Trabalho",
    readTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1500",
    content: `
      <p>Nem sempre o trabalho invade a vida de forma óbvia.</p>
      
      <p>Às vezes ele entra silenciosamente.</p>
      
      <p>Na dificuldade de desligar a mente.<br/>
      Na culpa ao descansar.<br/>
      Na sensação constante de urgência.<br/>
      Na necessidade de estar sempre disponível.<br/>
      Na irritação dentro de casa.<br/>
      Na incapacidade de relaxar mesmo nos momentos livres.</p>
      
      <p>E aos poucos a vida inteira começa a funcionar em torno da lógica da produtividade.</p>
      
      <p>Você conversa pensando em problemas.<br/>
      Descansa pensando no que falta fazer.<br/>
      Está presente fisicamente… mas mentalmente continua trabalhando.</p>
      
      <p>A mente moderna raramente descansa de verdade.</p>
      
      <p>Principalmente em pessoas que possuem muitas responsabilidades, cargos de liderança ou ambientes de alta cobrança.</p>
      
      <p>A questão é que o cérebro precisa de alternância.<br/>
      Precisa de recuperação.<br/>
      Precisa de espaço emocional.</p>
      
      <p>Quando tudo vira performance, até os relacionamentos começam a ser afetados.</p>
      
      <p>Muitas vezes sem perceber, a pessoa começa:</p>
      
      <p>
        a ficar emocionalmente distante,<br/>
        menos paciente,<br/>
        menos disponível,<br/>
        mais irritada,<br/>
        mais acelerada,<br/>
        ou simplesmente ausente emocionalmente.
      </p>
      
      <p>E o mais perigoso é que isso costuma acontecer de forma gradual.</p>
      
      <p>Até que um dia a pessoa percebe que:</p>
      
      <p>
        não consegue relaxar,<br/>
        não sente mais prazer nas coisas simples,<br/>
        vive cansada,<br/>
        ou sente que perdeu equilíbrio entre vida pessoal e profissional.
      </p>
      
      <p>O trabalho faz parte da vida.<br/>
      O problema começa quando ele ocupa espaço demais dentro da mente.</p>
      
      <p>A terapia ajuda justamente nesse processo de percepção, reorganização e construção de limites emocionais mais saudáveis.</p>
      
      <p>Porque produtividade sustentável não nasce de viver no limite.</p>
      
      <p>Ela nasce da capacidade de funcionar sem abandonar a própria saúde mental no caminho.</p>
    `,
  },
};

export default function Article() {
  const { slug } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const article = slug ? ARTICLES_DB[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) {
      document.title = `${article.title} | Lohran Vaz`;
    } else {
      document.title = "Artigo não encontrado | Lohran Vaz";
    }
  }, [slug, article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-heading mb-4">Artigo não encontrado.</h1>
          <Link
            to="/artigos"
            className="text-accent underline hover:text-primary transition-colors"
          >
            Voltar para Artigos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="fixed top-0 w-full z-40 glass-nav transition-all duration-300 border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="active:scale-[0.98] transition-all">
            <Logo />
          </Link>

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
            <Link to="/artigos" className="text-accent transition-colors">
              Artigos
            </Link>
            <Link
              to="/#contato"
              className="px-6 py-2.5 bg-primary text-bg-base hover:bg-accent active:scale-[0.98] transition-all duration-300 rounded-none tracking-widest text-xs"
            >
              AGENDAR
            </Link>
          </nav>

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
        <article className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CHILDREN}
            className="mb-12"
          >
            <motion.div variants={FADE_UP_VARIANTS} className="mb-8">
              <Link
                to="/artigos"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
                Voltar para Artigos
              </Link>
            </motion.div>

            <motion.div
              variants={FADE_UP_VARIANTS}
              className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted mb-6"
            >
              <span>{article.category}</span>
              <span className="w-1 h-1 rounded-full bg-accent"></span>
              <span>{article.readTime}</span>
            </motion.div>

            <motion.h1
              variants={FADE_UP_VARIANTS}
              className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.1] mb-12 text-primary font-medium tracking-tight"
            >
              {article.title}
            </motion.h1>

            <motion.div
              variants={FADE_UP_VARIANTS}
              className="w-full aspect-[16/10] md:aspect-[21/9] bg-beige/20 mb-16 overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover grayscale-[20%] contrast-110"
              />
            </motion.div>

            <motion.div
              variants={FADE_UP_VARIANTS}
              className="prose prose-lg prose-neutral max-w-none font-light text-secondary leading-relaxed 
                         prose-headings:font-heading prose-headings:font-medium prose-headings:text-primary prose-headings:mt-12 prose-headings:mb-6
                         prose-p:mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-24 pt-16 border-t border-primary/10 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-medium mb-6">
              Se esse texto fez sentido para você, talvez seja hora de olhar com
              mais cuidado para o que sua mente vem tentando dizer.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                to="/#contato"
                className="inline-block px-8 py-4 bg-primary text-bg-base font-medium tracking-wide hover:bg-accent active:scale-[0.98] transition-all duration-300"
              >
                Agendar conversa
              </Link>
              <a
                href="https://wa.me/5521998198208?text=Ol%C3%A1%2C%20Lohran.%20Li%20um%20artigo%20no%20seu%20site%20e%20gostaria%20de%20conversar."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click")}
                className="inline-block px-8 py-4 bg-transparent border border-primary/20 text-primary font-medium tracking-wide hover:border-primary active:scale-[0.98] transition-all duration-500"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </>
  );
}
