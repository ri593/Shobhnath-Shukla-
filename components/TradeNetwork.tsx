import React, { useState, useMemo } from 'react';
import { Search, UserPlus, ShieldCheck, Globe, Star, ArrowRight, ExternalLink, Loader2, Sparkles, Filter, ChevronDown, ChevronUp, Briefcase, Zap, X } from 'lucide-react';
import { TradePartner, TradeRole } from '../types';
import { findTradePartners } from '../services/geminiService';
import { MOCK_USER } from '../constants';

interface TradeNetworkProps {
  partners: TradePartner[];
}

const ROLES: (TradeRole | 'All Roles')[] = [
  'All Roles',
  'Manufacturer',
  'Logistics',
  'Distributor',
  'Retailer',
  'Supplier',
  'Freight Forwarder'
];

const TradeNetwork: React.FC<TradeNetworkProps> = ({ partners }) => {
  const [matchmakingReq, setMatchmakingReq] = useState('');
  const [matchmakingResult, setMatchmakingResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<TradeRole | 'All Roles'>('All Roles');
  const [expandedPartners, setExpandedPartners] = useState<Set<string>>(new Set());

  const handleMatchmake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchmakingReq.trim()) return;
    setLoading(true);
    setMatchmakingResult(null);
    try {
      const res = await findTradePartners(MOCK_USER, matchmakingReq);
      setMatchmakingResult(res);
    } catch (e) {
      console.error(e);
      setMatchmakingResult("Unable to synthesize network data. Please refine your requirements and try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePartner = (id: string) => {
    const next = new Set(expandedPartners);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedPartners(next);
  };

  const filteredPartners = useMemo(() => {
    let result = partners;
    
    if (roleFilter !== 'All Roles') {
      result = result.filter(p => p.role === roleFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.country.toLowerCase().includes(term) || 
        p.role.toLowerCase().includes(term)
      );
    }

    return result;
  }, [partners, searchTerm, roleFilter]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">Global Trade Network</h2>
          <p className="text-slate-400 font-medium">Verified partners and AI-driven matchmaking</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
            My Connections
          </button>
          <button className="px-6 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center w-fit transition-transform hover:scale-105 active:scale-95">
            <UserPlus size={16} className="mr-2" />
            Onboard Partner
          </button>
        </div>
      </div>

      {/* AI Matchmaker Section */}
      <div className="glass p-8 rounded-[2.5rem] border border-blue-500/30 bg-gradient-to-br from-blue-600/5 to-transparent relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
          <Sparkles size={160} />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 animate-float">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">AI Trade Matchmaker</h3>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Strategy Mode Active</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-lg">
              Input specific supply chain requirements to identify optimal trade lanes, vetted manufacturers, and logistics partners.
            </p>

            <form onSubmit={handleMatchmake} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
              <div className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                  <input 
                    value={matchmakingReq}
                    onChange={(e) => setMatchmakingReq(e.target.value)}
                    placeholder="e.g., 'Sustainable electronics manufacturer in South Korea'..."
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-6 py-5 outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium text-white transition-all"
                  />
                </div>
                <button 
                  disabled={loading || !matchmakingReq.trim()} 
                  className="px-8 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-50 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Synthesize'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="flex-1">
            {loading ? (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center space-y-4 bg-white/5 border border-white/5 rounded-3xl p-8 border-dashed">
                <Loader2 className="animate-spin text-blue-500" size={32} />
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest animate-pulse">Scanning Global Nodes</p>
                  <p className="text-xs text-slate-400 mt-1 italic">Vetting potential matches for consistency...</p>
                </div>
              </div>
            ) : matchmakingResult ? (
              <div className="h-full bg-slate-900/60 border border-blue-500/20 rounded-3xl p-8 animate-scale-in relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                   <Sparkles size={24} className="text-blue-500/20 group-hover:text-blue-500/40 transition-colors" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center">
                    <Zap size={12} className="mr-2" />
                    Strategic Matchmaking Insight
                  </h4>
                  <button onClick={() => setMatchmakingResult(null)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                </div>
                <div className="text-slate-200 text-sm font-medium leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {matchmakingResult}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-3xl p-8 group border-dashed">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-slate-600 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all">
                  <Briefcase size={32} />
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-center">
                  Ready to optimize your supply chain.<br/>Describe your needs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Partner Directory Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-white">Global Directory</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Network of {partners.length} verified entities</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, region..."
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-w-[240px]"
            />
          </div>
          
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-300 outline-none hover:bg-white/10 transition-all cursor-pointer"
          >
            {ROLES.map(role => (
              <option key={role} value={role} className="bg-[#0f172a]">{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Partner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="glass rounded-[2rem] border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 text-blue-400 group-hover:scale-110 transition-transform">
                    {partner.role === 'Logistics' ? <Globe size={24} /> : <Briefcase size={24} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white leading-tight mb-1">{partner.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center">
                      <Globe size={10} className="mr-1" />
                      {partner.country}
                    </p>
                  </div>
                </div>
                {partner.isVerified && (
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20" title="Blockchain Verified">
                    <ShieldCheck size={16} />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4 px-4 py-3 bg-white/5 rounded-2xl">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Reliability</p>
                  <p className="text-lg font-black text-white">{partner.reliabilityScore}%</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Status</p>
                  <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">Active</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{partner.role}</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-700'} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {partner.specialization}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-900/40 border-t border-white/5 flex items-center justify-between">
              <button 
                onClick={() => togglePartner(partner.id)}
                className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest flex items-center transition-colors"
              >
                {expandedPartners.has(partner.id) ? (
                  <>Collapse <ChevronUp size={12} className="ml-1" /></>
                ) : (
                  <>Full Profile <ChevronDown size={12} className="ml-1" /></>
                )}
              </button>
              <button className="p-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                <ExternalLink size={14} />
              </button>
            </div>

            {expandedPartners.has(partner.id) && (
              <div className="p-6 bg-slate-950/50 border-t border-white/5 animate-slide-up">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Capabilities</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Fast Onboarding', 'EU Compliant', 'ESG Rated', 'API Access'].map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Initiate KYC Audit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredPartners.length === 0 && (
        <div className="py-20 glass rounded-[2.5rem] border border-white/5 text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-600 border border-white/5">
            <Search size={40} />
          </div>
          <h4 className="text-xl font-black text-white mb-2">No partners match your criteria</h4>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 font-medium">Try broadening your search or use the AI Matchmaker to find new strategic opportunities.</p>
          <button 
            onClick={() => { setSearchTerm(''); setRoleFilter('All Roles'); }}
            className="px-8 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeNetwork;