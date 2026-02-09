import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, Ship, Anchor, Truck, Sparkles, Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { MARKET_TRENDS_CHART, MOCK_COMPLIANCE } from '../constants';
import { getDailyTradeBriefing } from '../services/geminiService';

interface DashboardProps {
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const [briefing, setBriefing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const text = await getDailyTradeBriefing(profile);
        setBriefing(text);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [profile]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* AI Intelligence Briefing */}
      <div className="glass p-6 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-transparent relative overflow-hidden group shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-xl animate-float">
            <Sparkles className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Trade Intelligence Briefing</h4>
            {loading ? (
              <div className="flex items-center space-x-2 py-1">
                <Loader2 size={16} className="animate-spin text-slate-500" />
                <span className="text-sm text-slate-500 italic">Synthesizing global logistics data...</span>
              </div>
            ) : (
              <p className="text-slate-100 font-medium text-sm md:text-base leading-relaxed">
                {briefing || "Global shipping lanes are experiencing normal traffic. EU customs updates are pending for textiles."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Shipments', val: '14', icon: <Ship size={18} />, color: 'text-blue-400' },
          { label: 'Network Partners', val: '128', icon: <Globe size={18} />, color: 'text-emerald-400' },
          { label: 'Pending Docs', val: '5', icon: <Anchor size={18} />, color: 'text-amber-400' },
          { label: 'Verified Nodes', val: '1.2k', icon: <TrendingUp size={18} />, color: 'text-indigo-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <div className={`p-1.5 rounded-lg bg-white/5 ${stat.color}`}>{stat.icon}</div>
            </div>
            <h3 className="text-3xl font-black text-white">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Global Volume Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold flex items-center">
              <TrendingUp size={22} className="mr-3 text-emerald-500" />
              Trade Volume Index
            </h4>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Volume</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MARKET_TRENDS_CHART}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Alerts Card */}
        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold flex items-center">
              <AlertCircle size={22} className="mr-3 text-rose-500" />
              Critical Alerts
            </h4>
          </div>
          <div className="space-y-4">
            {MOCK_COMPLIANCE.map((alert) => (
              <div key={alert.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/20 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${alert.severity === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {alert.severity} Priority
                  </span>
                  <span className="text-[10px] text-slate-500">{alert.timestamp}</span>
                </div>
                <p className="text-sm font-bold text-white mb-1">{alert.region} Update</p>
                <p className="text-xs text-slate-400 line-clamp-2">{alert.message}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">View All Alerts</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;