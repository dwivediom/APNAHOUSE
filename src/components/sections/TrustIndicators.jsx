import React from 'react';
import { ShieldCheck, Wallet, CheckCircle2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { TRUST_ITEMS } from '../../constants/data';

const iconMap = {
  ShieldCheck,
  Wallet,
  CheckCircle2
};

const TrustIndicators = () => {
  return (
    <section id="expertise" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <GlassCard key={i} className="p-10 group">
                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;

