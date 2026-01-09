import React, { useState, useEffect } from 'react';
import { 
  Calculator, Ruler, Layers, Home, Hammer, Truck, HardHat, PaintBucket, 
  LayoutDashboard, Sparkles, Building2, FileText, Download, 
  Printer, Info, CheckCircle2, X
} from 'lucide-react';
import Navbar from '../layout/Navbar';

// --- ANIMATION UTILITIES ---

const useCountUp = (end, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const start = count; 
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(start + (end - start) * ease);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end]);

  return count;
};

const AnimatedValue = ({ value, isCurrency = false, className = "" }) => {
  const animatedVal = useCountUp(value, 800);
  
  const formatted = isCurrency 
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(animatedVal)
    : Math.round(animatedVal).toLocaleString();

  return <span className={className}>{formatted}</span>;
};

// --- DATA CONSTANTS ---

const REF_BUILD_UP_AREA = 3105;
const REF_USABLE_AREA = 3600;
const REF_CARPET_AREA = 2700;

const COST_LOW_PER_SQFT = 3142806 / REF_BUILD_UP_AREA;
const COST_HIGH_PER_SQFT = 4232995 / REF_BUILD_UP_AREA;

const SCALER = (currentBuildUp) => currentBuildUp / REF_BUILD_UP_AREA;

const UNITS = {
  ft: { label: 'Feet', factor: 1, min: 10, max: 150, step: 1, symbol: 'ft' },
  m: { label: 'Meters', factor: 0.3048, min: 3, max: 45, step: 0.1, symbol: 'm' },
  cm: { label: 'CM', factor: 30.48, min: 300, max: 4500, step: 10, symbol: 'cm' }
};

const SPACE_CONFIG = [
  { label: 'Parking', refVal: 216, icon: Truck },
  { label: 'Living Area', refVal: 253, icon: Home },
  { label: 'Drawing Area', refVal: 219, icon: LayoutDashboard },
  { label: 'Kitchen', refVal: 209, icon: Home },
  { label: 'Staircase', refVal: 324, icon: Layers },
  { label: 'Dining Area', refVal: 135, icon: Home },
  { label: 'Washarea', refVal: 15, icon: PaintBucket },
  { label: 'Dressing', refVal: 216, icon: Home },
  { label: 'Foyer', refVal: 54, icon: Home },
  { label: 'Pooja', refVal: 40, icon: Home },
  { label: 'Balcony', refVal: 30, icon: Home },
  { label: 'Skylight', refVal: 20, icon: Home },
  { label: 'Bedroom 1', refVal: 297, icon: Home },
  { label: 'Bedroom 2', refVal: 297, icon: Home },
  { label: 'Bedroom 3', refVal: 270, icon: Home },
  { label: 'Bedroom 4', refVal: 248, icon: Home },
  { label: 'Bathroom 1', refVal: 54, icon: Home },
  { label: 'Bathroom 2', refVal: 54, icon: Home },
];

const LABOUR_CONFIG = [
  { label: 'Mason', refLow: 184995, refHigh: 244193 },
  { label: 'Carpenter', refLow: 134171, refHigh: 177105 },
  { label: 'Painter', refLow: 12837, refHigh: 16944 },
  { label: 'Labour', refLow: 362340, refHigh: 478289 },
  { label: 'Black Smith', refLow: 37520, refHigh: 49526 },
];

const MATERIAL_CONFIG = [
  { label: 'Earth Work & Excavation', refLow: 82080, refHigh: 104242 },
  { label: 'Cement Bags', refLow: 237257, refHigh: 271422 },
  { label: 'Sands', refLow: 435907, refHigh: 527448 },
  { label: 'Aggregates/Gravels', refLow: 155847, refHigh: 219432 },
  { label: 'Steel', refLow: 247335, refHigh: 299275 },
  { label: 'Paints', refLow: 124200, refHigh: 175867 },
  { label: 'Flooring', refLow: 170775, refHigh: 256163 },
  { label: 'Granite', refLow: 52000, refHigh: 93600 },
  { label: 'Glazed Tiles', refLow: 28800, refHigh: 48672 },
  { label: 'Doors And Windows', refLow: 260415, refHigh: 365623 },
  { label: 'Plumbing', refLow: 173647, refHigh: 238765 },
  { label: 'Electrical', refLow: 170775, refHigh: 221666 },
];

// --- COMPONENTS ---

const GlassCard = ({ children, className = "", delay = 0 }) => (
  <div 
    className={`backdrop-blur-xl border rounded-2xl transition-all duration-500 bg-white/5 border-white/10 shadow-2xl hover:bg-white/10 overflow-hidden animate-fade-in-up ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const RangeSlider = ({ label, value, min, max, step = 1, onChange, unit }) => (
  <div className="space-y-4 group">
    <div className="flex justify-between items-center text-sm">
      <label className="text-slate-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
        {label}
        {label === 'Floors' && <span className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded">Max 5</span>}
      </label>
      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md p-1 rounded-md border border-white/10 group-hover:border-amber-500/30 transition-colors">
         <input 
            type="number"
            value={value}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-20 bg-transparent text-right font-mono text-amber-400 font-bold focus:outline-none text-white"
         />
         <span className="text-slate-400 text-[10px] font-bold uppercase w-6 border-l border-white/10 pl-2">{unit}</span>
      </div>
    </div>
    <div className="relative h-1.5 w-full">
        <input 
          type="range" 
          min={min} 
          max={max}
          step={step} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />
        <div className="absolute w-full h-full bg-white/10 rounded-full overflow-hidden z-10">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(245,158,11,0.3)]"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
        </div>
        <div 
            className="absolute h-5 w-5 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.3)] border border-white/20 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-100 ease-out flex items-center justify-center"
            style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 10px)` }}
        >
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
        </div>
    </div>
  </div>
);

const SectionTitle = ({ title, icon: Icon }) => (
  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
    <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Icon size={20} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-serif font-bold text-white tracking-tight">{title}</h3>
    </div>
    <div className="text-slate-500">
        <Info size={16} />
    </div>
  </div>
);

const ConstructionCalculator = ({ onClose, onNavigateHome }) => {
  const [inputs, setInputs] = useState({
    width: 45, 
    length: 69, 
    floors: 1,
  });

  const [unit, setUnit] = useState('ft');

  const [metrics, setMetrics] = useState({
    plotArea: 0,
    buildUpArea: 0,
    carpetArea: 0,
    usableArea: 0,
    costLow: 0,
    costHigh: 0,
  });

  useEffect(() => {
    const plotArea = inputs.width * inputs.length;
    const buildUpArea = plotArea * inputs.floors;
    const usableRatio = REF_USABLE_AREA / REF_BUILD_UP_AREA;
    const carpetRatio = REF_CARPET_AREA / REF_BUILD_UP_AREA;

    const usableArea = buildUpArea * usableRatio;
    const carpetArea = buildUpArea * carpetRatio;

    const costLow = buildUpArea * COST_LOW_PER_SQFT;
    const costHigh = buildUpArea * COST_HIGH_PER_SQFT;

    setMetrics({ plotArea, buildUpArea, carpetArea, usableArea, costLow, costHigh });
  }, [inputs]);

  const scale = SCALER(metrics.buildUpArea);

  // Conversion Helpers
  const toDisplay = (valInFeet) => valInFeet * UNITS[unit].factor;
  const fromDisplay = (valInUnit) => valInUnit / UNITS[unit].factor;
  const currentUnit = UNITS[unit];

  const calculateTotal = (config) => {
    return config.reduce((acc, item) => ({
      low: acc.low + (item.refLow * scale),
      high: acc.high + (item.refHigh * scale)
    }), { low: 0, high: 0 });
  };

  const labourTotal = calculateTotal(LABOUR_CONFIG);
  const materialTotal = calculateTotal(MATERIAL_CONFIG);

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // CSV Download functionality
  const handleDownloadCSV = () => {
    // Format currency for CSV
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR', 
        maximumFractionDigits: 0 
      }).format(value);
    };

    // Build CSV content
    let csvContent = "Apna House - Construction Cost Estimate Report\n";
    csvContent += `Generated on: ${new Date().toLocaleString('en-IN')}\n\n`;
    
    // Project Details
    csvContent += "PROJECT DETAILS\n";
    csvContent += `Width,${toDisplay(inputs.width).toFixed(2)} ${currentUnit.symbol}\n`;
    csvContent += `Length,${toDisplay(inputs.length).toFixed(2)} ${currentUnit.symbol}\n`;
    csvContent += `Floors,${inputs.floors}\n`;
    csvContent += `Plot Area,${Math.round(metrics.plotArea)} sqft\n`;
    csvContent += `Built Up Area,${Math.round(metrics.buildUpArea)} sqft\n`;
    csvContent += `Usable Area,${Math.round(metrics.usableArea)} sqft\n`;
    csvContent += `Carpet Area,${Math.round(metrics.carpetArea)} sqft\n`;
    const efficiency = metrics.buildUpArea > 0 ? ((metrics.carpetArea/metrics.buildUpArea)*100).toFixed(2) : '0.00';
    csvContent += `Efficiency,${efficiency}%\n\n`;
    
    // Cost Estimates
    csvContent += "COST ESTIMATES\n";
    csvContent += `Low Range,${formatCurrency(metrics.costLow)}\n`;
    csvContent += `High Range,${formatCurrency(metrics.costHigh)}\n\n`;
    
    // Space Allocation
    csvContent += "SPACE ALLOCATION\n";
    csvContent += "Space,Area (sqft)\n";
    SPACE_CONFIG.forEach(item => {
      csvContent += `${item.label},${Math.round(item.refVal * scale)}\n`;
    });
    csvContent += "\n";
    
    // Labour Estimates
    csvContent += "LABOUR ESTIMATES\n";
    csvContent += "Trade,Low Range,High Range\n";
    LABOUR_CONFIG.forEach(item => {
      csvContent += `${item.label},${formatCurrency(item.refLow * scale)},${formatCurrency(item.refHigh * scale)}\n`;
    });
    csvContent += `Total Labour,${formatCurrency(labourTotal.low)},${formatCurrency(labourTotal.high)}\n\n`;
    
    // Material Costs
    csvContent += "MATERIAL COSTS\n";
    csvContent += "Material,Low Range,High Range\n";
    MATERIAL_CONFIG.forEach(item => {
      csvContent += `${item.label},${formatCurrency(item.refLow * scale)},${formatCurrency(item.refHigh * scale)}\n`;
    });
    csvContent += `Total Materials,${formatCurrency(materialTotal.low)},${formatCurrency(materialTotal.high)}\n\n`;
    
    // Grand Total
    csvContent += "GRAND TOTAL\n";
    csvContent += `Total Project Cost (Low),${formatCurrency(metrics.costLow)}\n`;
    csvContent += `Total Project Cost (High),${formatCurrency(metrics.costHigh)}\n`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `ApnaHouse_Construction_Estimate_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-amber-500/30 text-slate-200 overflow-x-hidden">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type=number] {
            -moz-appearance: textfield;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(245, 158, 11, 0.3);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(245, 158, 11, 0.5);
        }
        @media print {
          nav, button, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .backdrop-blur-xl {
            backdrop-filter: none !important;
            background: white !important;
            border: 1px solid #ccc !important;
          }
        }
      `}</style>

      <Navbar onNavigateHome={onNavigateHome} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-32">
        
        {/* HEADER AREA */}
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-6">
             <CheckCircle2 size={14} className="text-amber-500" />
             <span>Market Rates Updated: Q1 2026</span>
           </div>
           <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-4">
             Residential Construction
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600"> Estimator</span>
           </h1>
           <p className="max-w-xl mx-auto text-slate-300 text-lg">
             Professional-grade cost analysis for modern residential projects.
           </p>
        </div>

        {/* CONTROLS & MAIN METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
           
           {/* Inputs Panel */}
           <GlassCard className="lg:col-span-4 p-8 flex flex-col justify-center border-t-4 border-t-amber-500" delay={200}>
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="text-amber-400" size={20} />
                    Project Dimensions
                </h2>
                <div className="p-1 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 flex text-[11px] font-bold">
                    {Object.entries(UNITS).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setUnit(key)}
                            className={`px-3 py-1.5 rounded-md transition-all ${unit === key ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            {config.label}
                        </button>
                    ))}
                </div>
              </div>
              
              <div className="space-y-8">
                 <RangeSlider 
                    label="Width" 
                    value={Number(toDisplay(inputs.width).toFixed(2))}
                    min={currentUnit.min} 
                    max={currentUnit.max}
                    step={currentUnit.step}
                    unit={currentUnit.symbol}
                    onChange={(val) => setInputs({...inputs, width: fromDisplay(val)})} 
                 />
                 <RangeSlider 
                    label="Length" 
                    value={Number(toDisplay(inputs.length).toFixed(2))} 
                    min={currentUnit.min} 
                    max={currentUnit.max} 
                    step={currentUnit.step}
                    unit={currentUnit.symbol}
                    onChange={(val) => setInputs({...inputs, length: fromDisplay(val)})} 
                 />
                 <RangeSlider 
                    label="Floors" 
                    value={inputs.floors} 
                    min={1} max={5} unit=""
                    onChange={(val) => setInputs({...inputs, floors: val})} 
                 />
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                 <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Plot Area</div>
                    <div className="text-lg font-mono text-white font-bold"><AnimatedValue value={metrics.plotArea} /> <span className="text-xs text-slate-400 font-normal">sqft</span></div>
                 </div>
                 <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Built Up</div>
                    <div className="text-lg font-mono text-white font-bold"><AnimatedValue value={metrics.buildUpArea} /> <span className="text-xs text-slate-400 font-normal">sqft</span></div>
                 </div>
              </div>
           </GlassCard>

           {/* Grand Total Display - High Trust Dark Card */}
           <GlassCard className="lg:col-span-8 p-0 border-0 bg-transparent shadow-none" delay={300}>
               <div className="h-full w-full rounded-2xl bg-[#0f172a] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-amber-900/20 flex flex-col justify-center items-center text-center ring-1 ring-amber-500/20">
                   {/* Abstract Geometric Overlay */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>
                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>
                   
                   <div className="relative z-10 w-full">
                      <div className="flex items-center justify-center gap-2 mb-8">
                          <div className="h-px w-8 bg-slate-700"></div>
                          <span className="text-amber-200/80 font-mono text-xs uppercase tracking-[0.25em]">Project Valuation</span>
                          <div className="h-px w-8 bg-slate-700"></div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-10">
                          <div className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
                              <AnimatedValue value={metrics.costLow} isCurrency />
                          </div>
                          <div className="h-px w-16 bg-slate-700/50 md:w-px md:h-16"></div>
                          <div className="text-3xl sm:text-5xl font-serif text-amber-400 tracking-tight">
                              <AnimatedValue value={metrics.costHigh} isCurrency />
                          </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
                         {[
                            { label: 'Usable Area', val: metrics.usableArea },
                            { label: 'Carpet Area', val: metrics.carpetArea },
                            { label: 'Efficiency', val: metrics.buildUpArea > 0 ? (metrics.carpetArea/metrics.buildUpArea)*100 : 0, suffix: '%' }
                         ].map((item, i) => (
                           <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-md">
                              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">{item.label}</div>
                              <div className="text-lg sm:text-xl font-bold text-white">
                                <AnimatedValue value={item.val} />
                                <span className="text-xs text-slate-500 ml-1 font-normal">{item.suffix || 'sqft'}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
               </div>
           </GlassCard>
        </div>

        {/* DETAILED BREAKDOWNS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: SPACE & LABOR */}
            <div className="lg:col-span-7 space-y-8">
               
               {/* Space Utilization */}
               <GlassCard className="p-8" delay={400}>
                  <SectionTitle title="Space Allocation" icon={LayoutDashboard} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                     {SPACE_CONFIG.map((item, idx) => (
                        <div key={idx} className="group relative p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 transition-all duration-200">
                           <div className="flex items-start justify-between mb-2">
                              <item.icon size={16} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
                              <div className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-amber-500 transition-colors"></div>
                           </div>
                           <div className="text-[11px] text-slate-400 uppercase tracking-wide font-bold mb-1">{item.label}</div>
                           <div className="text-base font-bold text-white"><AnimatedValue value={item.refVal * scale} /> <span className="text-[10px] text-slate-400 font-normal">sqft</span></div>
                        </div>
                     ))}
                  </div>
               </GlassCard>

               {/* Labour Table */}
               <GlassCard className="p-8" delay={500}>
                  <SectionTitle title="Labour Estimates" icon={HardHat} />
                  <div className="overflow-hidden rounded-xl border border-white/10">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-white/5 text-[11px] text-slate-400 font-bold uppercase tracking-wider border-b border-white/10">
                              <th className="p-4">Trade</th>
                              <th className="p-4 text-right">Low Range</th>
                              <th className="p-4 text-right">High Range</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                           {LABOUR_CONFIG.map((item, idx) => (
                              <tr key={idx} className="hover:bg-amber-500/10 transition-colors">
                                 <td className="p-4 text-slate-300 font-medium">{item.label}</td>
                                 <td className="p-4 text-slate-400 font-mono text-right"><AnimatedValue value={item.refLow * scale} isCurrency /></td>
                                 <td className="p-4 text-white font-bold font-mono text-right"><AnimatedValue value={item.refHigh * scale} isCurrency /></td>
                              </tr>
                           ))}
                           <tr className="bg-white/5 border-t border-white/10">
                              <td className="p-4 text-white font-bold">Total Labour</td>
                              <td className="p-4 text-slate-300 font-mono text-right font-bold"><AnimatedValue value={labourTotal.low} isCurrency /></td>
                              <td className="p-4 text-amber-400 font-mono text-right font-bold"><AnimatedValue value={labourTotal.high} isCurrency /></td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </GlassCard>
            </div>

            {/* RIGHT: MATERIALS */}
            <div className="lg:col-span-5">
               <GlassCard className="p-8 border-t-4 border-t-amber-500" delay={600}>
                  <SectionTitle title="Material Costs" icon={Hammer} />
                  <div className="flex flex-col">
                     <div className="grid grid-cols-12 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-4 py-3 border-b border-white/10 mb-2 bg-white/5 rounded-t-lg">
                        <div className="col-span-6">Material</div>
                        <div className="col-span-6 text-right">Estimate Range</div>
                     </div>
                     
                     <div className="space-y-1">
                        {MATERIAL_CONFIG.map((item, idx) => (
                           <div key={idx} className="grid grid-cols-12 items-center p-3 rounded-lg hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
                              <div className="col-span-5 text-sm font-semibold text-slate-300 group-hover:text-amber-400 transition-colors">
                                 {item.label}
                              </div>
                              <div className="col-span-7 flex flex-col items-end">
                                 <div className="text-sm font-mono font-bold text-white">
                                    <AnimatedValue value={item.refHigh * scale} isCurrency />
                                 </div>
                                 <div className="text-[10px] font-mono text-slate-400">
                                    min: <AnimatedValue value={item.refLow * scale} isCurrency />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 shadow-sm">
                        <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">Projected Material Cost</div>
                        <div className="flex justify-between items-end">
                           <div className="text-2xl font-serif font-bold text-amber-400"><AnimatedValue value={materialTotal.high} isCurrency /></div>
                           <div className="text-xs text-amber-500 font-mono mb-1 font-medium">Max Estimate</div>
                        </div>
                     </div>

                     {/* Export Buttons */}
                     <div className="no-print mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
                        <button 
                          onClick={onClose}
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <X size={16} />
                          <span>Close</span>
                        </button>
                        <button 
                          onClick={handlePrint}
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Printer size={16} />
                          <span>Print</span>
                        </button>
                        <button 
                          onClick={handleDownloadCSV}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-lg text-sm font-medium hover:shadow-[0_10px_20px_rgba(245,158,11,0.3)] transition-all shadow-lg shadow-amber-900/20"
                        >
                          <Download size={16} />
                          <span>Download Report</span>
                        </button>
                     </div>
                  </div>
               </GlassCard>
            </div>
        </div>

        <footer className="mt-20 py-12 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-slate-500">
                <FileText size={16} />
                <span className="text-sm font-semibold">Estimator Engine v2.0.4</span>
            </div>
            <p className="text-slate-400 text-xs max-w-2xl mx-auto leading-relaxed">
               Disclaimer: This estimation is based on average market rates as of Q1 2026. 
               Actual costs may vary based on location, quality of materials selected, and labor availability. 
               This tool is for planning purposes only and does not constitute a formal contractor quote.
            </p>
        </footer>

      </div>
    </div>
  );
};

export default ConstructionCalculator;
