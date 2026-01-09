import React, { useState, useEffect } from 'react';
import { Award, Calculator, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { HERO_CONTENT, STATS } from '../../constants/data';
import ConstructionCalculator from '../calculator/ConstructionCalculator';

const Hero = ({ onOpenCalculator }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const interval = setInterval(() => {
      setLang(prev => prev === 'en' ? 'hi' : 'en');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="projects" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop" 
          className="w-full h-full object-cover animate-slow-pan opacity-60"
          alt="Luxury Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* Grid Stack to Prevent Layout Jitter - ONLY for Text */}
          <div className="grid grid-cols-1 grid-rows-1 mb-12">
            {['en', 'hi'].map((key) => {
              const isActive = lang === key;
              const content = HERO_CONTENT[key];
              
              return (
                <div 
                  key={key} 
                  className={`
                    col-start-1 row-start-1 flex flex-col items-center gap-8
                    transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.4,0.25,1)]
                    ${isActive 
                      ? 'opacity-100 transform-none blur-0 pointer-events-auto z-10' 
                      : 'opacity-0 translate-y-4 blur-xl pointer-events-none z-0'}
                  `}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-2xl">
                    <Award size={14} />
                    <span>{content.badge}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-[1.1] tracking-tight">
                    {key === 'en' ? (
                      <>Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Legacy</span><br/>Not Just Homes</>
                    ) : (
                      <>{content.title}</>
                    )}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                    {content.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* STATIC BUTTONS - Fixed width (w-80) to accommodate largest text without resizing */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-2 relative z-20">
            <Button primary icon={Calculator} onClick={onOpenCalculator} className="w-72 sm:w-80">{HERO_CONTENT[lang].ctaCalc}</Button>
            <Button icon={Phone} className="w-72 sm:w-80 !border-amber-500/50 !text-amber-400 hover:!bg-amber-500/10">{HERO_CONTENT[lang].ctaCall}</Button>
          </div>

          {/* Floating Stats */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto relative z-20">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="text-3xl font-serif text-white font-medium mb-1">{stat.val}</div>
                {stat.label && <div className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">{stat.label}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;

