import React from 'react';
import { MousePointer2 } from 'lucide-react';
import Button from '../ui/Button';

const CTAFooter = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-amber-600/5"></div>
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-slate-900 mb-8 shadow-[0_0_40px_rgba(245,158,11,0.4)] animate-bounce">
          <MousePointer2 size={40} />
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8">Your Vision, Our Expertise</h2>
        <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto">
          Stop dreaming and start building. Schedule a VIP consultation with our lead architects today.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button primary className="!text-lg !px-12 !py-5">Get Premium Quote</Button>
          <div className="text-slate-400 font-medium">or call us at <span className="text-white border-b border-amber-500">+91 8839898191</span></div>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;

