import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowRight, Check, ChevronDown, Clock, ShieldCheck, Sparkles, Star, X } from 'lucide-react';

const ASSET = 'https://rainbow-brioche-d5ce72.netlify.app/images/';
const HERO_SOURCE = 'https://raw.githubusercontent.com/tikbrabooo-coder/Teste-IMPORT/main/ChatGPT%20Image%207%20de%20out.%20de%202026%2C%2014_15_34.png';
const optimizeImage = (source: string, width: number, quality: 60 | 70 | 75 = 70) =>
  `/_vercel/image?url=${encodeURIComponent(source)}&w=${width}&q=${quality}`;
const HERO_MOCKUP = optimizeImage(HERO_SOURCE, 1024, 70);
const HERO_SRCSET = [640, 768, 1024, 1280]
  .map((width) => `${optimizeImage(HERO_SOURCE, width, 70)} ${width}w`)
  .join(', ');
const img = (name: string, width = 768) => optimizeImage(ASSET + encodeURIComponent(name), width, 70);
const CHECKOUTS = { ESSENCIAL: 'https://app.zuptos.com.br/checkout/597422a2be19f26c', COMPLETO: 'https://app.zuptos.com.br/checkout/dc9508e2442481d9', UPSELL: 'https://app.zuptos.com.br/checkout/40d7bf7e99b9c963' };

/** Repasse ao checkout os parâmetros de campanha recebidos pela página de vendas. */
const checkoutHref = (checkoutUrl: string) => {
  if (typeof window === 'undefined') return checkoutUrl;

  const incomingParams = new URLSearchParams(window.location.search);
  const trackingParams = [...incomingParams.entries()].filter(([key, value]) =>
    /^(utm_[a-z0-9_]+|fbclid|gclid|gbraid|wbraid|ttclid|twclid|msclkid)$/i.test(key) && value.trim() !== ''
  );

  if (trackingParams.length === 0) return checkoutUrl;

  const destination = new URL(checkoutUrl);
  trackingParams.forEach(([key, value]) => {
    if (!destination.searchParams.has(key)) destination.searchParams.set(key, value);
  });

  return destination.toString();
};
const bonuses = [['Mapa Visual de Big-O','ChatGPT Image 2 de out. de 2026, 11_10_44.png'],['Guia Visual de Siglas de TI','ChatGPT Image 2 de out. de 2026, 11_10_29.png'],['Mapa de Comparativos','ChatGPT Image 2 de out. de 2026, 11_14_26.png'],['Checklist de Revisão','ChatGPT Image 2 de out. de 2026, 11_18_51.png'],['Caderno Visual de Pegadinhas','ChatGPT Image 2 de out. de 2026, 11_17_31.png']];
const maps = [['Algoritmos e Estruturas de Dados','mapa-algoritmos-estruturas.jpg'],['Ciência da Computação','mapa-ciencia-computacao.jpg'],['Estruturas de Dados','mapa-estruturas-dados.jpg'],['Banco de Dados','mapa-banco-dados.jpg'],['Bancos de Dados Relacionais','mapa-bancos-relacionais.jpg'],['Engenharia de Software','mapa-engenharia-software.jpg']];
const Button=({href,children,muted=false,onClick}:{href?:string;children:React.ReactNode;muted?:boolean;onClick?:()=>void})=>{const isCheckout=Boolean(href&&(href.includes('payfast.greenn.com.br/redirect/')||href.includes('app.zuptos.com.br/checkout/')));const className=`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-center font-extrabold uppercase transition ${isCheckout?'go-to-checkout ':''}${muted?'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50':'bg-emerald-600 text-white shadow-pink-cta hover:bg-emerald-700'}`;const content=<><span>{children}</span><ArrowRight className="h-5 w-5"/></>;if(isCheckout)return <button type="button" onClick={()=>{if(href)window.location.assign(href)}} className={className}>{content}</button>;return <a href={href||'#'} onClick={onClick?e=>{e.preventDefault();onClick()}:undefined} className={className}>{content}</a>};
function Hero(){return <><aside className="w-full bg-[#E53935] px-3 py-2 text-center text-xs font-bold text-white sm:text-sm"><div className="mx-auto flex max-w-5xl items-center justify-center gap-2"><Clock className="h-4 w-4"/><span>⚡ Oferta por tempo limitado disponível apenas hoje</span></div></aside><section id="hero-section" className="bg-[#F0F4FA] px-4 pb-12 pt-8 text-slate-800 sm:pb-20 sm:pt-12"><div className="mx-auto max-w-4xl text-center"><h1 className="text-[2.05rem] font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"><span className="block sm:inline">+150 Mapas Mentais</span><span className="block sm:inline"> de <span className="hero-accent">Ciência da</span></span><span className="block sm:inline"> <span className="hero-accent">Computação.</span></span></h1><a href="#ofertas" className="mx-auto mt-8 block w-full max-w-[720px] sm:mt-12"><img src={HERO_MOCKUP} srcSet={HERO_SRCSET} sizes="(max-width: 672px) 100vw, 672px" alt="Mockup +150 Mapas Mentais de Ciência da Computação" width={1024} height={1024} fetchPriority="high" loading="eager" decoding="async" className="mx-auto aspect-square h-auto w-full object-contain"/></a><p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-xl">Revise os principais conceitos da Ciência da Computação de forma visual, organizada e sem se perder em conteúdos extensos.</p><div className="mx-auto mt-7 max-w-xl"><Button href="#ofertas">QUERO ACESSAR OS +150 MAPAS AGORA</Button></div></div></section></>}
function MapsSection(){
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let previousTime = 0;
    const pixelsPerSecond = 30;

    const animate = (time: number) => {
      if (previousTime) {
        const elapsed = Math.min(time - previousTime, 50);
        const loopWidth = firstGroup.offsetWidth;
        if (!pausedRef.current && loopWidth > 0) {
          viewport.scrollLeft += pixelsPerSecond * elapsed / 1000;
          if (viewport.scrollLeft >= loopWidth) {
            viewport.scrollLeft = viewport.scrollLeft % loopWidth;
          }
        }
      }
      previousTime = time;
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const renderCards = (clone = false) => maps.map(([title, source]) => (
    <article key={`${title}-${clone ? 'clone' : 'original'}`} className="carousel-card aspect-square w-[92vw] max-w-[680px] shrink-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:w-[72vw] lg:w-[60vw]">
      <div className="flex h-full flex-col p-3 sm:p-4">
        <p className="mb-2 text-center text-xs font-extrabold uppercase tracking-wider text-blue-700 sm:text-sm">{title}</p>
        <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
          <img src={img(source, 768)} alt={title} width={768} height={768} className="h-full w-full object-contain" loading="lazy" decoding="async" fetchPriority="low"/>
        </div>
      </div>
    </article>
  ));

  return <section id="mapas-preview" className="perf-section bg-[#F7FAFF] px-4 py-12 sm:py-16">
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-8 text-center text-2xl font-black text-slate-900 sm:text-4xl">VEJA NA <span className="heading-accent-cyan">PRÁTICA</span> UM POUCO DO QUE VOCÊ VAI RECEBER</h2>
      <div
        ref={viewportRef}
        className="maps-auto-viewport flex overflow-x-auto px-2 py-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onFocusCapture={() => { pausedRef.current = true; }}
        onBlurCapture={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
        aria-label="Carrossel horizontal automático dos mapas mentais"
      >
        <div ref={firstGroupRef} className="maps-auto-group flex shrink-0 gap-4 sm:gap-6">
          {renderCards()}
        </div>
        <div className="maps-auto-group flex shrink-0 gap-4 sm:gap-6" aria-hidden="true">
          {renderCards(true)}
        </div>
      </div>
    </div>
  </section>;
}
function Bonuses(){return <section id="bonus-section" className="perf-section bg-[#EEF6FF] px-4 py-12 sm:py-16"><div className="mx-auto max-w-6xl"><div className="mb-8 text-center"><h2 className="text-2xl font-black text-slate-900 sm:text-4xl">BÔNUS EXCLUSIVOS</h2><p className="mt-3 text-base text-slate-600 sm:text-lg">Além dos mapas principais, você recebe materiais extras para facilitar a revisão.</p></div><div className="flex gap-4 overflow-x-auto px-2 py-4 [scrollbar-width:none] sm:gap-6 sm:px-8">{bonuses.map(([title,source])=><article key={title} className="bonus-card w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-3xl"><div className="aspect-[4/3] overflow-hidden bg-slate-50"><img src={img(source, 480)} alt={title} width={480} height={360} className="h-full w-full object-contain" loading="lazy" decoding="async" fetchPriority="low"/></div><div className="p-5"><p className="text-base font-black">{title}</p><p className="mt-2 text-sm leading-relaxed text-slate-600">Material extra para consulta e revisão rápida.</p></div></article>)}</div></div></section>}
function Pricing({onUpgrade}:{onUpgrade:()=>void}){const featuresEssential=['+150 Mapas Mentais de Ciência da Computação','9 grandes áreas de estudo','Mapas organizados por assunto','Acesso digital imediato'];const featuresComplete=['+150 Mapas Mentais de Ciência da Computação','Arquitetura e Organização de Computadores','Sistemas Operacionais','Redes de Computadores','Banco de Dados','Engenharia de Software','9 grandes áreas de estudo','Mapa Visual de Big-O','Guia Visual de Siglas de TI','Mapa de Comparativos','Checklist de Revisão','Caderno Visual de Pegadinhas'];const Card=({complete}:{complete:boolean})=>{const features=complete?featuresComplete:featuresEssential;return <article className="pricing-card relative flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8">{complete&&<span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1.5 text-xs font-black uppercase text-white shadow-md"><Star className="mr-1 inline h-3.5 w-3.5 fill-current"/>MAIS ESCOLHIDO</span>}<h3 className="text-2xl font-black sm:text-3xl">{complete?'Plano Completo':'Material Essencial'}</h3>{!complete&&<p className="pricing-subtitle mt-1 text-xs font-black uppercase tracking-wide">+150 MAPAS MENTAIS DE CIÊNCIA DA COMPUTAÇÃO</p>}{complete&&<img src={HERO_MOCKUP} alt="Plano Completo +150 Mapas Mentais" width={1024} height={1024} className="mx-auto mt-5 w-full max-w-[330px] object-contain" loading="lazy" decoding="async" fetchPriority="low"/>}<ul className="mt-7 flex-1 space-y-3">{features.map((feature,i)=><li key={feature} className="flex items-center gap-3 text-sm font-bold sm:text-base"><Check className="h-5 w-5 shrink-0 text-blue-600"/><span>{feature}</span>{complete&&i>5&&<span className="ml-auto shrink-0 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-black text-blue-700">🎁 BÔNUS</span>}</li>)}</ul><div className="mt-8 border-t border-slate-100 pt-6 text-center"><p className="mb-1 text-base font-bold text-slate-400 line-through sm:text-lg">{complete?'R$ 37,90':'R$ 24,90'}</p><p className="text-3xl font-black sm:text-5xl">{complete?'R$ 27,00':'R$ 9,90'}</p><p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">Pagamento único. Sem mensalidade.</p><p className="mt-2 text-xs font-bold text-blue-700 sm:text-sm">Você recebe o acesso diretamente no WhatsApp após a confirmação do pagamento.</p><div className="mt-6">{complete?<Button href={checkoutHref(CHECKOUTS.COMPLETO)}>QUERO COMPRAR</Button>:<><Button muted onClick={onUpgrade}>QUERO O PLANO ESSENCIAL</Button><div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-black text-blue-700 sm:text-sm">99% preferem a promoção abaixo <ArrowDown className="h-4 w-4"/></div></>}</div>{complete&&<p className="mt-3 text-center text-xs font-semibold text-slate-500">Compra única • Acesso imediato • Garantia de 30 dias</p>}</div></article>};return <section id="ofertas" className="perf-section bg-[#F0F4FA] px-4 py-14 sm:py-20"><div className="mx-auto max-w-6xl"><h2 className="text-center text-2xl font-black text-slate-900 sm:text-4xl">ESCOLHA A MELHOR <span className="text-blue-600">OPÇÃO PARA VOCÊ</span></h2><div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2"><Card complete={false}/><Card complete/></div></div></section>}
function SocialProof(){const testimonials=["WhatsApp Image 2026-10-15 at 00.28.30 (1).jpeg","WhatsApp Image 2026-10-15 at 00.28.30 (2).jpeg","WhatsApp Image 2026-10-15 at 00.28.30 (3).jpeg","WhatsApp Image 2026-10-15 at 00.28.30 (4).jpeg","WhatsApp Image 2026-10-15 at 00.28.30 (5).jpeg","WhatsApp Image 2026-10-15 at 00.28.30 (6).jpeg","WhatsApp Image 2026-10-15 at 00.28.30 (7).jpeg","WhatsApp Image 2026-10-15 at 00.28.30.jpeg"];const testimonialUrl=(filename:string)=>optimizeImage(`https://raw.githubusercontent.com/tikbrabooo-coder/Teste-IMPORT/main/${encodeURIComponent(filename)}`, 640, 70);return <section id="depoimentos" className="bg-[#F8FBFF] px-4 py-12 sm:py-16"><div className="mx-auto max-w-3xl"><h2 className="text-center text-2xl font-black text-slate-900 sm:text-4xl">QUEM ESTÁ <span className="heading-accent-orange">ESTUDANDO TAMBÉM</span></h2><p className="mt-2 text-center text-sm font-semibold text-slate-500">Deslize para o lado e veja os depoimentos.</p><div className="mx-auto mt-6 max-w-xl overflow-x-auto rounded-2xl snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><div className="flex gap-4 px-1">{testimonials.map((filename,index)=><div key={filename} className="w-full shrink-0 snap-center"><img src={testimonialUrl(filename)} alt={`Depoimento ${index+1} sobre os mapas mentais`} className="block h-auto w-full rounded-2xl object-contain shadow-sm select-none" width={640} height={800} loading="lazy" decoding="async" fetchPriority="low" draggable={false}/></div>)}</div></div><div className="mt-4 flex justify-center gap-2"><span className="h-2.5 w-7 rounded-full bg-blue-600"/><span className="h-2.5 w-2.5 rounded-full bg-slate-300"/><span className="h-2.5 w-2.5 rounded-full bg-slate-300"/></div></div></section>}
function Guarantee(){return <section id="garantia" className="perf-section bg-[#F0F4FA] px-4 py-8 sm:py-12"><div className="mx-auto grid max-w-5xl items-center gap-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8"><div className="flex justify-center"><img src={img('garantia-30d.jpg', 320)} alt="Selo de garantia de 30 dias" width={320} height={320} className="h-44 w-44 object-contain sm:h-52 sm:w-52" loading="lazy" decoding="async" fetchPriority="low"/></div><div><h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">VOCÊ TEM <span className="heading-accent-green">30 DIAS</span> DE GARANTIA INCONDICIONAL</h2><p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">Após realizar a compra, você poderá acessar, baixar e explorar todos os +150 Mapas Mentais de Ciência da Computação e todos os bônus. Se por qualquer motivo você achar que o material não atende às suas expectativas, basta solicitar o reembolso integral dentro de 30 dias com apenas 1 clique.</p><p className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-700 sm:text-base"><ShieldCheck className="h-5 w-5 shrink-0 text-blue-600"/>Seu risco é absolutamente zero. Garantia blindada de 30 dias.</p></div></div></section>}
function FAQ(){const[open,setOpen]=useState<number|null>(0);const items=[{question:'O material é físico ou digital?',answer:'O material é 100% digital. Você recebe o acesso aos arquivos para estudar pelo celular, computador ou tablet, sem precisar esperar por entrega física.'},{question:'O que vem no Plano Completo?',answer:'O Plano Completo inclui os +150 Mapas Mentais de Ciência da Computação, organizados por áreas, além dos bônus exclusivos: Mapa Visual de Big-O, Guia Visual de Siglas de TI, Mapa de Comparativos, Checklist de Revisão e Caderno Visual de Pegadinhas.'},{question:'Qual é a diferença entre o Plano Essencial e o Plano Completo?',answer:'O Plano Essencial dá acesso aos +150 mapas, às 9 grandes áreas de estudo e ao conteúdo organizado por assunto. O Plano Completo reúne todo esse conteúdo e acrescenta os materiais bônus exclusivos para revisão.'},{question:'Posso estudar pelo celular?',answer:'Sim. O material foi preparado para acesso digital e pode ser consultado pelo celular, tablet ou computador.'},{question:'Como recebo o acesso ao material?',answer:'Após a confirmação do pagamento, você recebe o acesso diretamente no WhatsApp. O material é digital e pode ser consultado pelo celular, tablet ou computador.'},{question:'Como funciona a garantia de 30 dias?',answer:'Você tem 30 dias para conhecer o material. Caso ele não atenda às suas expectativas, pode solicitar o reembolso dentro das condições da plataforma de pagamento.'}];return <section id="faq" className="bg-[#F3F7FC] px-4 py-12 sm:py-16"><div className="mx-auto max-w-3xl"><h2 className="text-center text-3xl font-black text-slate-900 sm:text-4xl">PERGUNTAS <span className="heading-accent-purple">FREQUENTES</span></h2><div className="mx-auto mt-8 max-w-2xl space-y-3">{items.map((item,i)=><div key={item.question} className="faq-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><button type="button" onClick={()=>setOpen(open===i?null:i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-extrabold text-slate-900" aria-expanded={open===i}><span>{item.question}</span><ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open===i?'rotate-180':''}`}/></button><div className={`grid transition-all duration-300 ${open===i?'grid-rows-[1fr] opacity-100':'grid-rows-[0fr] opacity-0'}`}><div className="min-h-0 overflow-hidden px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.answer}</div></div></div>)}</div><div className="mx-auto mt-8 max-w-md"><Button href="#ofertas">QUERO VER AS OFERTAS</Button></div></div></section>}
function Footer(){return <footer className="bg-slate-950 px-4 py-8 text-center text-sm text-slate-400">© 2026 • +150 Mapas Mentais de Ciência da Computação</footer>}
function UpgradeModal({open,onClose}:{open:boolean;onClose:()=>void}){if(!open)return null;const modal=<div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-slate-950/75 p-4" role="dialog" aria-modal="true" aria-label="Oferta especial do Plano Completo"><div className="relative max-h-[82vh] w-full max-w-sm overflow-y-auto rounded-[22px] bg-white p-4 shadow-2xl sm:max-h-[88vh] sm:p-7"><button type="button" onClick={onClose} aria-label="Fechar oferta" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><X className="h-5 w-5"/></button><div className="pt-1 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50"><Sparkles className="h-6 w-6 text-blue-600"/></div><p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">Oferta especial</p><h2 className="mt-1.5 text-[21px] font-black leading-tight text-slate-900 sm:text-3xl">Leve o Plano Completo por R$ 19,90</h2><p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600 sm:text-base">Aproveite e leve o Plano Completo por <span className="font-black text-blue-700">R$ 7,10 a menos</span> que o valor normal de R$ 27,00.</p></div><div className="mt-4 rounded-2xl bg-[#F0F4FA] p-3.5 sm:mt-5 sm:p-4"><p className="text-center text-xs font-black text-slate-900 sm:text-sm">Você recebe no Plano Completo:</p><div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">{['+150 Mapas Mentais','9 áreas de estudo','Arquitetura','Sistemas Operacionais','Redes de Computadores','Banco de Dados','Engenharia de Software','5 bônus exclusivos'].map(item=><p key={item} className="flex items-start gap-1.5 text-[12px] font-semibold leading-tight text-slate-700 sm:text-sm"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"/><span>{item}</span></p>)}</div></div><div className="mt-4 sm:mt-5"><Button href={checkoutHref(CHECKOUTS.UPSELL)}>QUERO ADQUIRIR PLANO COMPLETO POR 19,90</Button></div><button type="button" onClick={()=>window.location.assign(checkoutHref(CHECKOUTS.ESSENCIAL))} className="go-to-checkout mt-3 block w-full rounded-xl py-2 text-center text-xs font-black text-slate-600 transition hover:text-blue-600">NÃO, QUERO LEVAR O PLANO DE R$ 9,90</button></div></div>;return typeof document!=='undefined'?createPortal(modal,document.body):null}
export default function App(){const[upgradeOpen,setUpgradeOpen]=useState(false);useEffect(()=>{window.scrollTo(0,0)},[]);return <main className="dark-tech-shell min-h-screen overflow-x-hidden"><Hero/><MapsSection/><Bonuses/><Pricing onUpgrade={()=>setUpgradeOpen(true)}/><SocialProof/><Guarantee/><FAQ/><Footer/><UpgradeModal open={upgradeOpen} onClose={()=>setUpgradeOpen(false)}/></main>}
