import React, { useState, useEffect } from 'react';
import { Building2, Phone, Menu, X } from 'lucide-react';

const Navbar = ({ onNavigateHome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu
    
    // If we're on calculator, navigate home first
    if (onNavigateHome) {
      onNavigateHome();
      // Wait a bit for the page to render, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'Projects', id: 'projects' },
    { label: 'Expertise', id: 'expertise' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button onClick={() => {
            if (onNavigateHome) {
              onNavigateHome();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-lg shadow-lg shadow-amber-500/20">
              <Building2 className="text-slate-900 h-6 w-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-white tracking-tight leading-none">Apna House</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-medium">Premium Construction</span>
            </div>
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-slate-300 hover:text-amber-400 font-medium text-sm uppercase tracking-widest transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-bold hover:bg-white/20 transition-all group animate-pulse">
              <Phone size={16} className="text-amber-400" />
              <span>+91 8839898191</span>
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 animate-fade-in-down">
          <div className="px-6 py-8 space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="block text-lg text-slate-300 font-medium hover:text-amber-400"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-amber-600 text-white rounded-lg font-bold uppercase tracking-wider">
                <Phone size={18} />
                <span>Call +91 8839898191</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

