import React from 'react';
import { Building2, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-950 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="text-amber-500" />
              <span className="text-2xl font-serif font-bold text-white">Apna House</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Redefining luxury construction in India. We build homes that stand as testaments to your success.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3"><Phone size={16} className="text-amber-500"/> +91 8839898191</li>
              <li>concierge@apnahouse.com</li>
              <li>Cyber City, Tower B, Level 18<br/>Gurugram, India</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Social</h4>
            <div className="flex gap-4">
              {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                <a key={social} href="#" className="text-slate-500 hover:text-amber-500 transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
          <p>&copy; 2026 Apna House Construction Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

