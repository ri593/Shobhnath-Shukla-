import React, { useState } from 'react';
import { Asset, UserProfile } from '../types';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Briefcase, RefreshCcw, Sparkles, Loader2, CheckCircle2, X } from 'lucide-react';
import { getRebalanceStrategy } from '../services/geminiService';

interface PortfolioProps {
  assets: Asset[];
  profile: UserProfile;
}

const Portfolio: React.FC<PortfolioProps> = ({ assets, profile }) => {
  const [rebalancing, setRebalancing] = useState(false);
  const [rebalanceResult, setRebalanceResult] = useState<string | null>(null);

  const handleRebalance = async () => {
    setRebalancing(true);
    setRebalanceResult(null);
    try {
      const result = await getRebalanceStrategy(assets, profile);
      setRebalanceResult(result || "Your current allocation perfectly matches your goals. No changes needed.");
    } catch (e) {
      console.error(e);
      setRebalanceResult("Failed to generate rebalancing strategy. Please check your network connection.");
    } finally {
      setRebalancing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center">
            <Briefcase className="mr-2 text-emerald-400" size={24} />
            Asset Portfolio
          </h2>
          <p className="text-slate-400 text-sm">Detailed breakdown of your investments</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleRebalance}
            disabled={rebalancing}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-all border border-slate-700 active:scale-95 disabled:opacity-50"
          >
            {rebalancing ? <Loader2 size={18} className="animate-spin text-blue-500" /> : <Sparkles size={18} className="text-blue-500" />}
            <span className="font-bold text-xs uppercase tracking-widest">AI Rebalance</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-900/20 font-medium">
            <Plus size={18} />
            <span className="font-bold text-xs uppercase tracking-widest">Add Asset</span>
          </button>
        </div>
      </div>

      {rebalanceResult && (
        <div className="glass p-6 rounded-3xl border border-blue-500/30 bg-blue-500/5 animate-scale-in shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <button onClick={() => setRebalanceResult(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={20} />
             </button>
          </div>
          <div className="flex items-center space-x-3 text-blue-400 mb-4">
             <div className="p-2 bg-blue-600/10 rounded-xl">
                <Sparkles size={20} />
             </div>
             <h4 className="font-black text-xs uppercase tracking-widest">AI Trade Optimization Strategy</h4>
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-slate-200 whitespace-pre-wrap leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
            {rebalanceResult}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">
              Apply Recommendation
            </button>
            <button 
              onClick={() => setRebalanceResult(null)}
              className="flex-1 px-4 py-3 bg-white/5 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/30 border-b border-slate-800">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Allocation</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Value</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">24h Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mr-3 text-blue-400 font-black text-xs border border-slate-700 group-hover:scale-110 transition-transform">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-100">{asset.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-700">
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-full bg-slate-800 rounded-full h-1.5 max-w-[80px]">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${asset.allocation}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{asset.allocation}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-black text-white">${asset.value.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center text-xs font-black tracking-widest uppercase ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {asset.change24h >= 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                      {Math.abs(asset.change24h)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-[2rem] flex items-start space-x-4">
        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
          <Wallet size={20} />
        </div>
        <div>
          <h5 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-1">Strategic Rebalancing</h5>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Your current portfolio is monitored in real-time. We recommend rebalancing whenever an asset drifts more than 5% from its target allocation to maintain your {profile.riskTolerance} risk posture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;