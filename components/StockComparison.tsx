
import React from 'react';
import { Scale, TrendingUp, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { StockComparisonData } from '../types';

const COMPARISON_DATA: StockComparisonData[] = [
  { symbol: 'AAPL', price: '$189.24', marketCap: '2.9T', ytd: '+12.4%', revenue: '383B', performance: [120, 135, 130, 145, 160, 189] },
  { symbol: 'MSFT', price: '$415.10', marketCap: '3.1T', ytd: '+18.2%', revenue: '227B', performance: [300, 320, 350, 380, 400, 415] },
  { symbol: 'GOOGL', price: '$154.32', marketCap: '1.9T', ytd: '+9.8%', revenue: '307B', performance: [110, 115, 125, 135, 145, 154] },
  { symbol: 'AMZN', price: '$178.22', marketCap: '1.8T', ytd: '+14.5%', revenue: '574B', performance: [140, 150, 155, 165, 172, 178] },
];

const chartData = [
  { name: 'Market Cap (T)', AAPL: 2.9, MSFT: 3.1, GOOGL: 1.9, AMZN: 1.8 },
  { name: 'Revenue (100B)', AAPL: 3.8, MSFT: 2.2, GOOGL: 3.0, AMZN: 5.7 },
];

const StockComparison: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center">
            <Scale className="mr-3 text-blue-500" size={28} />
            Stock Comparison
          </h2>
          <p className="text-slate-400 font-medium">Side-by-side performance & fundamental analysis</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20">Add Asset</button>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center">
              <DollarSign className="mr-2 text-emerald-400" size={20} />
              Financial Matrix
            </h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Normalized View</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="AAPL" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="MSFT" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="GOOGL" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AMZN" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Activity className="mr-2 text-rose-400" size={20} />
              Relative Strength
            </h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ranked Performance</span>
          </div>
          <div className="space-y-4">
            {COMPARISON_DATA.map((stock, i) => (
              <div key={stock.symbol} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group">
                <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs group-hover:scale-110 transition-transform">
                      {stock.symbol}
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white">{stock.price}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">YTD: <span className="text-emerald-400">{stock.ytd}</span></p>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-300">MCap: {stock.marketCap}</p>
                  <p className="text-xs font-bold text-slate-500">Rev: {stock.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
         <div className="p-6 border-b border-white/5 bg-slate-900/40">
            <h4 className="font-bold text-white uppercase tracking-widest text-xs">Performance Breakdown</h4>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Ticker</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Price</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">YTD Return</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">P/E Ratio</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Div Yield</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON_DATA.map(s => (
                  <tr key={s.symbol} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-black text-blue-400">{s.symbol}</td>
                    <td className="p-6 font-bold text-white">{s.price}</td>
                    <td className="p-6 font-bold text-emerald-400">{s.ytd}</td>
                    <td className="p-6 font-medium text-slate-300">28.4x</td>
                    <td className="p-6 font-medium text-slate-300">0.82%</td>
                    <td className="p-6">
                      <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-lg">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default StockComparison;
