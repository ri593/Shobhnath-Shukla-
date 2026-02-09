import React, { useState } from 'react';
import { Search, UserPlus, ShieldCheck, Globe, Star, ArrowRight, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { TradePartner, TradeRole } from '../types';
import { findTradePartners } from '../services/geminiService';
import { MOCK_USER } from '../constants';

interface TradeNetworkProps {
  partners: TradePartner[];
}

const TradeNetwork: React.FC<TradeNetworkProps> = ({ partners }) => {
  const [matchmakingReq, setMatchmakingReq] = useState('');
  const [matchmakingResult, setMatchmakingResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatchmake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchmakingReq.trim()) return;
    setLoading(true);
    try {
      const res = await findTradePartners(MOCK_USER, matchmakingReq);
      setMatchmakingResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">Global Trade Network</h2>
          <p className="text-slate-400 font-medium">Verified partners and AI-driven matchmaking</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center">
          <UserPlus size={16} className="mr-2" />
          Onboard Partner
        </button>
      </div>

      {/* AI Matchmaker */}
      <div className="glass p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
          <Sparkles size={120} />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <h3 className="text-xl font-bold flex items-center">
              <Sparkles className="text-blue-400 mr-2" size={24} />
              AI Matchmaker
            </h3>
            <p className="text-slate-400 text-sm">Describe what you are looking for (e.g., "Sustainable textile manufacturer in Southeast Asia for organic cotton").</p>
            <form onSubmit={handleMatchmake} className="flex gap-4">
              <input 
                value={matchmakingReq}
                onChange={(e) => setMatchmakingReq(e.target.value)}
                placeholder="Find my next trade partner..."
                className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
              <button disabled={loading} className="px-8 py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-50 transition-all">
                {loading ? <Loader2 className="animate-spin" /> : 'Connect'}
              </button>
            </form>
          </div>
          
          {matchmakingResult && (
            <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-6 animate-scale-in">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Strategic Matchmaking Report</h4>
              <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                {matchmakingResult}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Partner Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="glass p-6 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/10 text-blue-400 font-black">
                {partner.name.charAt(0)}
              </div>
              <div className="flex items-center space-x-1 text-amber-400">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-black">{partner.reliabilityScore}%</span>
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">{partner.name}</h4>
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">
              <Globe size={12} />
              <span>{partner.country}</span>
              <span>•</span>
              <span>{partner.role}</span>
            </div>
            <div className="text-xs text-slate-400 mb-6 line-clamp-2">
              Specialized in {partner.specialization}. {partner.isVerified ? 'Blockchain verified identity.' : ''}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-blue-400">View Profile</button>
              <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeNetwork;