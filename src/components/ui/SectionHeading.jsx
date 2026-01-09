import React from 'react';
import { Gem } from 'lucide-react';

const SectionHeading = ({ sub, title, center }) => (
  <div className={`mb-16 ${center ? 'text-center' : ''} animate-fade-in-up`}>
    <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] ${center ? 'mx-auto' : ''}`}>
      <Gem size={12} />
      <span>{sub}</span>
    </div>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium leading-tight">
      {title}
    </h2>
    <div className={`h-1 w-20 bg-gradient-to-r from-amber-500 to-transparent mt-6 ${center ? 'mx-auto' : ''}`} />
  </div>
);

export default SectionHeading;

