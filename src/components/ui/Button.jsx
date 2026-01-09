import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, primary, className = "", onClick, icon: Icon, loading }) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className={`
      relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase transition-all duration-300 transform hover:-translate-y-1 active:scale-95
      ${primary 
        ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-[0_10px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)]' 
        : 'bg-white/5 backdrop-blur-md text-white border border-white/20 hover:bg-white/10 hover:border-white/40'}
      ${loading ? 'opacity-80 cursor-wait' : ''}
      ${className}
    `}
  >
    {loading ? <Loader2 size={18} className="animate-spin" /> : Icon && <Icon size={18} />}
    {children}
  </button>
);

export default Button;

