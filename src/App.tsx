import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowRight, Check, ChevronDown, Clock, ShieldCheck, Sparkles, Star, X } from 'lucide-react';

const ASSET = 'https://rainbow-brioche-d5ce72.netlify.app/images/';
const img = (name: string) => ASSET + encodeURIComponent(name).replace(/%2F/g, '/');

const CHECKOUTS = {
  ESSENCIAL: 'https://app.zuptos.com.br/checkout/3964ebc0548af57e',
  COMPLETO: 'https://app.zuptos.com.br/checkout/58864c8277caafae',
  UPSELL: 'https://app.zuptos.com.br/checkout/e8d0547d33daa9bd',
};

const bonuses = [
  ['Mapa Visual de Big-O', 'ChatGPT Image 2 de out. de 2026, 11_10_29.png'],
  ['Guia Visual de Siglas de TI', 'ChatGPT Image 2 de out. de 2026, 11_10_44.png'],
  ['Mapa de Comparativos', 'ChatGPT Image 2 de out. de 2026, 11_14_26.png'],
  ['Checklist de Revisão', 'ChatGPT Image 2 de out. de 2026, 11_17_31.png'],
  ['Caderno Visual de Pegadinhas', 'ChatGPT Image 2 de out. de 2026, 11_18_51.png'],
];

const maps = [
  ['Algoritmos e Estruturas de Dados', 'mapa-algoritmos-estruturas.jpg'],
  ['Ciência da Computação', 'mapa-ciencia-computacao.jpg'],
  ['Estruturas de Dados', 'mapa-estruturas-dados.jpg'],
  ['Banco de Dados', 'mapa-banco-dados.jpg'],
  ['Bancos de Dados Relacionais', 'mapa-bancos-relacionais.jpg'],
  ['Engenharia de Software', 'mapa-engenharia-software.jpg'],
];

const checkout = (url: string, name: string) => {
  try {
    const parsed = new URL(url);
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => value && parsed.searchParams.set(key, value));
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') fbq('track', 'InitiateCheckout', { content_name: name, content_type: 'product', currency: 'BRL' });
    window.location.assign(parsed.toString());
  } catch {
    window.location.assign(url);
  }
};

const Button = ({ href, children, muted = false, onClick }: { href?: string; children: React.ReactNode; muted?: boolean; onClick?: () => void }) => (
  <a href={href || '#'} onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } else if (href?.startsWith('http')) { e.preventDefault(); checkout(href, String(children)); } }} className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-center font-extrabold uppercase transition ${muted ? 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50' : 'bg-emerald-600 text-white shadow-pink-cta hover:bg-emerald-700'}`}><span>{children}</span><ArrowRight className="h-5 w-5" /></a>
);

function Hero() {
  return <><aside className="w-full bg-[#E53935] px-3 py-2 text-center text-xs font-bold text-white sm:text-sm"><div className="mx-auto flex max-w-5xl items-center justify-center gap-2"><Clock className="h-4 w-4" /><span>⚡ Oferta por tempo limitado disponível apenas hoje</span></div></aside><section id="hero-section" className="bg-[#F0F4FA] px-4 pb-12 pt-8 text-slate-800 sm:pb-20 sm:pt-12"><div className="mx-auto max-w-4xl text-center"><h1 className="text-[2.05rem] font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"><span className="block sm:inline">+300 Mapas Mentais</span><span className="block sm:inline"> de <span className="hero-accent">Ciência da</span></span><span className="block sm:inline"> <span className="hero-accent">Computação.</span></span><br /></h1><a href="#ofertas" className="mx-auto mt-8 block w-full max-w-2xl sm:mt-12"><img src={img('ChatGPT Image 2 de out. de 2026, 10_45_59.png')} alt="Mockup +300 Mapas Mentais de Ciência da Computação" className="mx-auto h-auto w-full object-contain" /></a><p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-xl">Revise os principais conceitos da Ciência da Computação de forma visual, organizada e sem se perder em conteúdos extensos.</p><div className="mx-auto mt-7 max-w-xl"><Button href="#ofertas">QUERO ACESSAR OS +300 MAPAS AGORA</Button></div><p className="mt-4 text-xs text-slate-500 sm:text-sm">Acesso imediato ao material digital após a confirmação do pagamento.</p></div></section></>;
}

function MapsSection() { return <section id="mapas-preview" className="perf-section bg-[#F7FAFF] px-4 py-12 sm:py-16"><div className="mx-auto max-w-6xl"><h2 className="mb-8 text-center text-2xl font-black text-slate-900 sm:text-4xl">VEJA NA <span className="heading-accent-cyan">PRÁTICA</span> UM POUCO DO QUE VOCÊ VAI RECEBER</h2><div className="flex snap-x snap-mandatory touch-auto gap-4 overflow-x-auto px-2 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:px-8">{maps.map(([title, source]) => <article key={title} className="carousel-card aspect-square w-[92vw] max-w-[680px] shrink-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:w-[72vw] lg:w-[60vw]"><div className="flex h-full flex-col p-3 sm:p-4"><p className="mb-2 text-center text-xs font-extrabold uppercase tracking-wider text-blue-700 sm:text-sm">{title}</p><div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-50"><img src={img(source)} alt={title} className="h-full w-full object-contain" loading="lazy" /></div></div></article>)}</div></div></section>; }

function Bonuses() { return <section id="bonus-section" className="perf-section bg-[#EEF6FF] px-4 py-12 sm:py-16"><div className="mx-auto max-w-6xl"><div className="mb-8 text-center"><h2 className="text-2xl font-black text-slate-900 sm:text-4xl">BÔNUS EXCLUSIVOS</h2><p className="mt-3 text-base text-slate-600 sm:text-lg">Além dos mapas principais, você recebe materiais extras para facilitar a revisão.</p></div><div className="flex gap-4 overflow-x-auto px-2 py-4 [scrollbar-width:none] sm:gap-6 sm:px-8">{bonuses.map(([title, source]) => <article key={title} className="bonus-card w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-3xl"><div className="aspect-[4/3] overflow-hidden bg-slate-50"><img src={img(source)} alt={title} className="h-full w-full object-contain" loading="lazy" /></div><div className="p-5"><p className="text-base font-black">{title}</p><p className="mt-2 text-sm leading-relaxed text-slate-600">Material extra para consulta e revisão rápida.</p></div></article>)}</div></div></section>; }

function Pricing({ onUpgrade }: { onUpgrade: () => void }) { const featuresEssential = ['+300 Mapas Mentais de Ciência da Computação', '9 grandes áreas de estudo', 'Mapas organizados por assunto', 'Acesso digital imediato']; const featuresComplete = ['+300 Mapas Mentais de Ciência da Computação', 'Arquitetura e Organização de Computadores', 'Sistemas Operacionais', 'Redes de Computadores', 'Banco de Dados', 'Engenharia de Software', 'Mapa Visual de Big-O', 'Guia Visual de Siglas de TI', 'Mapa de Comparativos', 'Checklist de Revisão', 'Caderno Visual de Pegadinhas']; const Card = ({ complete }: { complete: boolean }) => { const features = complete ? featuresComplete : featuresEssential; return <article className="pricing-card relative flex h-full flex-col rounded-3xl bg-white p-6 sm:p-8">{complete && <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1.5 text-xs font-black uppercase text-white shadow-md"><Star className="mr-1 inline h-3.5 w-3.5 fill-current" />MAIS ESCOLHIDO</span>}<h3 className="text-2xl font-black sm:text-3xl">{complete ? 'Plano Completo' : 'Material Essencial'}</h3>{!complete && <p className="pricing-subtitle mt-1 text-xs font-black uppercase tracking-wide">+300 MAPAS MENTAIS DE CIÊNCIA DA COMPUTAÇÃO</p>}{complete && <img src={img('ChatGPT Image 2 de out. de 2026, 10_45_59.png')} alt="Plano Completo" className="mx-auto mt-5 w-full max-w-[330px] object-contain" loading="lazy" />}<ul className="mt-7 flex-1 space-y-3">{features.map((feature, i) => <li key={feature} className="flex items-center gap-3 text-sm font-bold sm:text-base"><Check className="h-5 w-5 shrink-0 text-blue-600" /><span>{feature}</span>{complete && i > 5 && <span className="ml-auto shrink-0 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-black text-blue-700">🎁 BÔNUS</span>}</li>)}</ul><div className="mt-8 border-t border-slate-100 pt-6 text-center"><p className="text-3xl font-black sm:text-5xl">{complete ? 'R$ 27,00' : 'R$ 10,00'}</p><p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">Pagamento único. Sem mensalidade.</p><p className="mt-2 text-xs font-bold text-blue-700 sm:text-sm">Você recebe o acesso pelo WhatsApp.</p><div className="mt-6">{complete ? <Button href={CHECKOUTS.COMPLETO}>QUERO COMPRAR</Button> : <><Button muted onClick={onUpgrade}>QUERO O PLANO ESSENCIAL</Button><div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-black text-blue-700 sm:text-sm">99% preferem a promoção abaixo <ArrowDown className="h-4 w-4" /></div></>}</div>{complete && <p className="mt-3 text-center text-xs font-semibold text-slate-500">Compra única • Acesso imediato • Garantia de 30 dias</p>}</div></article>; }; return <section id="ofertas" className="perf-section bg-[#F0F4FA] px-4 py-14 sm:py-20"><div className="mx-auto max-w-6xl"><h2 className="text-center text-2xl font-black text-slate-900 sm:text-4xl">ESCOLHA A MELHOR <span className="text-blue-600">OPÇÃO PARA VOCÊ</span></h2><div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2"><Card complete={false} /><Card complete /></div></div></section>; }

export default function App() { const [showExit, setShowExit] = useState(false); const [showUpsell, setShowUpsell] = useState(false); const [faq, setFaq] = useState<number | null>(null); useEffect(() => { const onExit = (e: MouseEvent) => { if (e.clientY <= 8) setShowExit(true); }; document.addEventListener('mouseout', onExit); return () => document.removeEventListener('mouseout', onExit); }, []); const upgrade = () => setShowUpsell(true); return <main><Hero /><MapsSection /><Bonuses /><Pricing onUpgrade={upgrade} />{showExit && createPortal(<div />, document.body)}{showUpsell && createPortal(<div />, document.body)}</main>; }
