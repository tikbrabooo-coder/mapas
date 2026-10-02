import React, { useEffect, useState } from 'react';
import { CHECKOUT_URLS } from './data';
import { Hero } from './components/Hero';
import { PreviewCarousel } from './components/PreviewCarousel';
import { Bonuses } from './components/Bonuses';
import { Pricing } from './components/Pricing';
import { Guarantee } from './components/Guarantee';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { UpgradeModal } from './components/UpgradeModal';
import { RecentPurchaseToast } from './components/RecentPurchaseToast';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedHref, setSelectedHref] = useState<string>(CHECKOUT_URLS.ESSENCIAL);
  useEffect(() => { const timer = window.setTimeout(() => setShowToast(true), 12000); return () => window.clearTimeout(timer); }, []);
  const handleOpenUpgradeModal = (href: string) => { setSelectedHref(href); setIsModalOpen(true); };
  return <main className="dark-tech-shell relative min-h-screen bg-black font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
    <Hero /><PreviewCarousel /><Bonuses /><Pricing onOpenUpgradeModal={handleOpenUpgradeModal} /><Guarantee /><FAQ /><Footer />
    <UpgradeModal open={isModalOpen} onOpenChange={setIsModalOpen} originalHref={selectedHref} />
    {showToast && <RecentPurchaseToast />}
  </main>;
}
