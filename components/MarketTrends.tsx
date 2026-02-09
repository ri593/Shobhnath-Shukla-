import React, { useState, useEffect } from 'react';
import { 
  BarChart2, Zap, TrendingUp, Loader2, Sparkles, 
  Cpu, FlaskConical, Droplets, Landmark, Activity, ChevronRight 
} from 'lucide-react';
import { getTrendAnalysis } from '../services/geminiService';

const SECTORS = [
  { id: 'Technology', icon: <Cpu size={18} />, performance: '+2.4%', status: 'Bullish', color: 'blue' },
  { id: 'Healthcare', icon: <FlaskConical size={18} />, performance: '+0.8%', status: 'Neutral', color: 'emerald' },
  { id: 'Energy', icon: <Droplets size={18} />, performance: '-1.2%', status: 'Bearish', color: 'amber' },
  { id: 'Financials', icon: <Landmark size={18} />, performance: '+1.5%', status: 'Bullish', color: 'indigo' },
];

const MarketTrends: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState(SECTORS[0].id);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = async (sector: string) => {
    setLoading(true);
    try {
      const text = await getTrendAnalysis(sector);
      setAnalysis(text || 'No analysis available for this sector.');
    } catch (error) {
      setAnalysis('Failed to load AI sector analysis. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis(selectedSector);
  }, [selectedSector]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center">
            <BarChart2 className="mr-3 text-blue-500" size={28} />
            Sector Analysis
          </h2>
          <p className="text-slate-400 font-medium">Deep dive into market verticals powered by Gemini AI</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900/50 p-1 rounded-xl border border-white/5">
          {['1W', '1M', '3M', 'YTD'].map((t) => (
            <button key={t} className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest transition-all ${t === '1M' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sector Navigation */}
        <div className="lg:col-span-1 space-y-3">
          {SECTORS.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.id)}
              className={`w-full group relative flex items-center justify-between p-4 rounded-2xl transition-all border ${
                selectedSector === sector.id 
                ? 'bg-blue-600/10 border-blue-500/30 text-white' 
                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${selectedSector === sector.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {sector.icon}
                </div>
                <span className="font-bold text-sm">{sector.id}</span>
              </div>
              <ChevronRight size={16} className={`transition-transform ${selectedSector === sector.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
              
              {selectedSector === sector.id && (
                <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
          
          <div className="mt-8 glass p-6 rounded-2xl border-amber-500/10 bg-amber-500/5">
             <div className="flex items-center space-x-2 text-amber-500 mb-2">
                <Zap size={16} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">Macro Alert</span>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed">
               Interest rate decisions expected next Tuesday. Major volatility anticipated across all sectors.
             </p>
          </div>
        </div>

        {/* AI Insight Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-8 rounded-3xl min-h-[500px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Sparkles size={200} />
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedSector} Outlook</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Performance: +4.2%</span>
                    <span className="text-slate-600 text-xs">|</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gemini 3 Flash</span>
                  </div>
                </div>
              </div>
              
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-[10px] font-black tracking-widest uppercase">
                Strong Buy
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="animate-spin text-blue-500" size={40} />
                <p className="text-slate-400 text-sm font-medium animate-pulse tracking-wide">Synthesizing market data for {selectedSector}...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap animate-fade-in">
                  {analysis}
                </div>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Growth Driver</p>
                    <p className="text-xs font-bold text-white">Generative AI Infrastructure</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Primary Risk</p>
                    <p className="text-xs font-bold text-white">Regulatory Scrutiny (EU/US)</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Top Ticker</p>
                    <p className="text-xs font-bold text-blue-400">$NVDA / $MSFT</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Detailed fundamental analysis available in Pro reports
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;