import React from 'react';
import { Globe, TrendingUp, TrendingDown, Activity, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { IndexData } from '../types';

const MOCK_INDICES: IndexData[] = [
  { name: 'S&P 500', value: '5,123.45', change: '+1.2%', isPositive: true },
  { name: 'Nasdaq', value: '16,234.12', change: '+1.5%', isPositive: true },
  { name: 'Dow Jones', value: '39,123.00', change: '-0.3%', isPositive: false },
  { name: 'BTC/USD', value: '64,321.00', change: '+2.4%', isPositive: true },
];

const MOCK_MOVERS = [
  { symbol: 'NVDA', name: 'Nvidia Corp', price: '$875.28', change: '+4.2%', isPositive: true },
  { symbol: 'TSLA', name: 'Tesla Inc', price: '$175.43', change: '-2.1%', isPositive: false },
  { symbol: 'META', name: 'Meta Platforms', price: '$505.20', change: '+1.8%', isPositive: true },
  { symbol: 'AMD', name: 'Adv Micro Dev', price: '$192.53', change: '+3.1%', isPositive: true },
  { symbol: 'AAPL', name: 'Apple Inc', price: '$172.62', change: '-0.4%', isPositive: false },
];

const MOCK_CHART_DATA = [
  { time: '09:30', value: 5080 },
  { time: '10:30', value: 5100 },
  { time: '11:30', value: 5090 },
  { time: '12:30', value: 5110 },
  { time: '13:30', value: 5130 },
  { time: '14:30', value: 5123 },
  { time: '15:30', value: 5145 },
];

const MarketSummary: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dynamic Header */}
      <div className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-emerald-500">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-emerald-500/20 shadow-emerald-500/10 animate-float">
            <Globe className="text-emerald-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Global Market Live</h2>
            <div className="flex items-center space-x-3 mt-1">
               <p className="text-slate-400 font-medium">Sentiment:</p>
               <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded border border-emerald-500/20">Bullish Pulse</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto">
          {MOCK_INDICES.map((idx) => (
            <div key={idx.name} className="bg-white/5 p-4 rounded-2xl border border-white/5 min-w-[140px] hover:border-white/10 transition-all hover:scale-[1.02]">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{idx.name}</p>
              <p className="text-lg font-black text-white tracking-tight leading-none mb-1">{idx.value}</p>
              <p className={`text-xs font-bold flex items-center ${idx.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {idx.isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
                {idx.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center text-white">
              <Activity className="mr-3 text-blue-400" size={22} />
              S&P 500 Intraday
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Market Open</span>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_DATA}>
                <XAxis dataKey="time" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
                  }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '900' }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={{ fill: '#3b82f6', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#0f172a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>09:30 AM</span>
            <div className="h-px flex-1 bg-white/5 mx-4" />
            <span>04:00 PM</span>
          </div>
        </div>

        {/* Top Movers */}
        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center text-white">
              <BarChart3 className="mr-3 text-amber-400" size={22} />
              Top Movers
            </h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">24h Volume</span>
          </div>
          <div className="space-y-4">
            {MOCK_MOVERS.map((mover, i) => (
              <div key={mover.symbol} className="flex items-center justify-between group p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs text-blue-400 border border-white/5 group-hover:scale-110 transition-transform">
                    {mover.symbol.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-white leading-none mb-1">{mover.symbol}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">{mover.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white mb-0.5">{mover.price}</p>
                  <p className={`text-[10px] font-black tracking-widest ${mover.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {mover.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
            View All Equities
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketSummary;