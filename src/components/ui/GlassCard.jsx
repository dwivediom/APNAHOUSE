import React from 'react';

const GlassCard = ({ children, className = "", highlight = false }) => (
  <div className={`backdrop-blur-xl border rounded-2xl transition-all duration-500 ${highlight ? 'bg-amber-900/10 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'bg-white/5 border-white/10 shadow-2xl hover:bg-white/10'} ${className}`}>
    {children}
  </div>
);

export default GlassCard;

