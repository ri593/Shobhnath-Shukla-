import React, { useState, useEffect } from 'react';
import { TrendingUp, Globe, Loader2, Sparkles, AlertTriangle, ArrowUpRight, BarChart2, AlertCircle, ShieldCheck } from 'lucide-react';
import { getTradeIntelligence } from '../services/geminiService';
import { UserProfile, MarketIntelligence } from '../types';

interface IntelligenceProps {
  profile: UserProfile;
}

const Intelligence: React.FC<IntelligenceProps> = ({ profile }) => {
  const [data, setData] = useState<MarketIntelligence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getTradeIntelligence(profile.regionsOfInterest);
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [profile]);

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'High':
        return <AlertTriangle size={14} className="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" />;
      case 'Moderate':
        return <AlertCircle size={14} className="text-amber-400" />;
      case 'Low':
        return <ShieldCheck size={14} className="text-emerald-400" />;
      default:
        return null;
    }
  };

  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Moderate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">Market Intelligence</h2>
          <p className="text-slate-400 font-medium">Deep-dive regional risk & opportunity analysis</p>
        </div>
        <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 flex items-center space-x-2 text-blue-400">
          <Sparkles size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">AI Prediction Mode</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4 glass rounded-3xl border border-white/5">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-slate-400 text-sm font-medium animate-pulse">Aggregating global trade signals...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((intel, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
                <Globe size={120} />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 text-emerald-400">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{intel.region}</h3>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] flex items-center space-x-2 border transition-all ${getRiskStyles(intel.riskLevel)}`}>
                  {getRiskIcon(intel.riskLevel)}
                  <span>{intel.riskLevel} Risk</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Dominant Trend</h4>
                  <p className="text-slate-200 text-sm leading-relaxed font-medium">{intel.trend}</p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2 flex items-center">
                    <Sparkles size={12} className="mr-1.5" />
                    Emerging Opportunity
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{intel.opportunity}"</p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                   <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                    Explore Raw Data
                    <ArrowUpRight size={14} className="ml-1" />
                   </button>
                   <BarChart2 size={16} className="text-slate-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Intelligence;