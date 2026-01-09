import React, { useState } from 'react';
import { Download, CheckCircle2, FolderDown } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { ELEVATION_IMAGES, INTERIOR_IMAGES } from '../../constants/data';

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState('elevation');
  const [downloadState, setDownloadState] = useState('idle');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const images = activeTab === 'elevation' ? ELEVATION_IMAGES : INTERIOR_IMAGES;

  const handleDownload = () => {
    setDownloadState('loading');
    setTimeout(() => {
      setDownloadState('complete');
      setTimeout(() => setDownloadState('idle'), 3000);
    }, 2000);
  };

  return (
    <section id="gallery" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading sub="The Collection" title="Architectural Mastery" center />

        {/* Custom Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full inline-flex">
            {['elevation', 'interior'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-500 ${
                  activeTab === tab 
                    ? 'bg-amber-500 text-slate-900 shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'elevation' ? 'Modern Elevations' : 'Luxury Interiors'}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              
              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-20" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-[1px] bg-amber-500 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500">{img.style}</span>
                <h3 className="text-white text-2xl font-serif font-medium">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Download Action Bar */}
        <GlassCard className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-amber-500/10 rounded-full text-amber-500 hidden sm:block">
              <FolderDown size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-white mb-2">Download The Catalogue</h3>
              <p className="text-slate-400 max-w-md">Get high-resolution access to our complete 2026 portfolio, including floor plans and material specifications.</p>
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-col items-center gap-2">
            <Button 
              primary 
              onClick={handleDownload} 
              loading={downloadState === 'loading'}
              icon={downloadState === 'complete' ? CheckCircle2 : Download}
              className={downloadState === 'complete' ? '!bg-emerald-600 !shadow-emerald-900/20' : ''}
            >
              {downloadState === 'loading' ? 'Processing...' : downloadState === 'complete' ? 'Saved to Device' : 'Download Now'}
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default GallerySection;

