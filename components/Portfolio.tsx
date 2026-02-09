
import React, { useState, useEffect } from 'react';
import { Asset, UserProfile } from '../types';
// Add Activity to the imports to fix the 'Cannot find name Activity' error on line 148
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Briefcase, RefreshCcw, Sparkles, Loader2, CheckCircle2, X, Info, ShieldCheck, Target, TrendingUp, Activity } from 'lucide-react';
import { getRebalanceStrategy } from '../services/geminiService';

interface PortfolioProps {
  assets: Asset[];
  profile: UserProfile;
}

const THINKING_MESSAGES = [
  "Analyzing current market volatility...",
  "Auditing asset cross-correlations...",
  "Checking drift against target allocation...",
  "Optimizing for your risk tolerance...",
  "Finalizing strategic trade recommendations..."
];

const Portfolio: React.FC<PortfolioProps> = ({ assets, profile }) => {
  const [rebalancing, setRebalancing] = useState(false);
  const [rebalanceResult, setRebalanceResult] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    let interval: number;
    if (rebalancing) {
      interval = window.setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % THINKING_MESSAGES.length);
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [rebalancing]);

  const handleRebalance = async () => {
    setRebalancing(true);
    setRebalanceResult(null);
    try {
      const result = await getRebalanceStrategy(assets, profile);
      setRebalanceResult(result || "Your current allocation perfectly matches your goals. No changes needed.");
    } catch (e) {
      console.error(e);
      setRebalanceResult("Unable to connect to the advisor node. Please verify your connection and try again.");
    } finally {
      setRebalancing(false);
    }
  };

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Portfolio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center">
            <Briefcase className="mr-3 text-blue-500" size={32} />
            Investment Portfolio
          </h2>
          <p className="text-slate-400 font-medium">Tracking {assets.length} assets with an aggregate value of ${totalValue.toLocaleString()}</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleRebalance}
            disabled={rebalancing}
            className="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-70 overflow-hidden"
          >
            {rebalancing ? (
              <Loader2 size={18} className="animate-spin relative z-10" />
            ) : (
              <Sparkles size={18} className="relative z-10 animate-pulse" />
            )}
            <span className="font-black text-xs uppercase tracking-[0.15em] relative z-10">
              {rebalancing ? 'Synthesizing...' : 'AI Rebalance'}
            </span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95">
            <Plus size={18} />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* AI Rebalance Result Card */}
      {(rebalancing || rebalanceResult) && (
        <div className={`glass p-8 rounded-[2.5rem] border animate-fade-in ${rebalanceResult ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-blue-500/30 bg-blue-500/5'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-2xl ${rebalanceResult ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white shadow-lg animate-pulse'}`}>
                {rebalancing ? <RefreshCcw size={20} className="animate-spin" /> : <ShieldCheck size={20} />}
              </div>
              <div>
                <h4 className="text-lg font-black text-white">
                  {rebalancing ? 'AI Strategist Thinking' : 'Rebalancing Strategy'}
                </h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                  {rebalancing ? 'Real-time optimization' : 'Institutional Roadmap'}
                </p>
              </div>
            </div>
            {rebalanceResult && (
              <button onClick={() => setRebalanceResult(null)} className="p-2 text-slate-500 hover:text-white">
                <X size={20} />
              </button>
            )}
          </div>

          <div className="min-h-[100px] relative">
            {rebalancing ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="text-blue-400 text-sm font-medium animate-pulse">
                  {THINKING_MESSAGES[loadingStep]}
                </div>
                <div className="w-full max-w-xs h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 animate-loading-bar" style={{ width: '40%' }}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                    {rebalanceResult}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all">
                    Execute All Trades
                  </button>
                  <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest border border-white/5 transition-all">
                    Save as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Asset Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Asset Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-slate-900/40 flex items-center justify-between">
              <h4 className="font-bold text-white uppercase tracking-widest text-xs">Asset Allocation</h4>
              <div className="flex items-center space-x-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <Activity size={12} className="text-emerald-400" />
                <span>Real-time Feed</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset</th>
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Allocation</th>
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Market Value</th>
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">24h Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {assets.map((asset) => (
                    <tr key={asset.symbol} className="hover:bg-white/5 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-blue-400 border border-white/5 group-hover:scale-110 transition-transform">
                            {asset.symbol.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white leading-none mb-1">{asset.symbol}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{asset.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${asset.allocation}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-slate-300">{asset.allocation}%</span>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-bold text-white">${asset.value.toLocaleString()}</td>
                      <td className="p-6">
                        <div className={`flex items-center text-xs font-black ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
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
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Portfolio Health */}
          <div className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <TrendingUp size={80} />
            </div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Portfolio Health</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">92/100</p>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Excellent Score</p>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center text-emerald-500 font-black text-[10px]">
                  92%
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your portfolio drift is within optimal limits (2.4%). Your current allocation is perfectly synchronized with your <span className="text-white font-bold">{profile.riskTolerance}</span> profile.
              </p>
            </div>
          </div>

          {/* Goal Tracker */}
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center">
              <Target size={14} className="mr-2 text-blue-400" />
              Retirement Goal
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-2xl font-black text-white">$1.2M</span>
                <span className="text-xs font-bold text-slate-500">Target</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500" style={{ width: '45%' }}></div>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                45% of your target milestone reached
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
