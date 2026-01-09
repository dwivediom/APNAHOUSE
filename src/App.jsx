import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import TrustIndicators from './components/sections/TrustIndicators';
import GallerySection from './components/sections/GallerySection';
import CTAFooter from './components/sections/CTAFooter';
import Footer from './components/layout/Footer';
import ConstructionCalculator from './components/calculator/ConstructionCalculator';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-amber-500/30 text-slate-200 overflow-x-hidden">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes slow-pan {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-slow-pan { animation: slow-pan 20s linear infinite alternate; }
        
        .cursor-wait { cursor: wait; }
      `}</style>
      
      {showCalculator && (
        <ConstructionCalculator 
          onClose={() => setShowCalculator(false)} 
          onNavigateHome={() => setShowCalculator(false)}
        />
      )}
      
      {!showCalculator && (
        <>
          <Navbar onNavigateHome={null} />
          <Hero onOpenCalculator={() => setShowCalculator(true)} />
          <TrustIndicators />
          <GallerySection />
          <CTAFooter />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

