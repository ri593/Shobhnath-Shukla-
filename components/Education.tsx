import React from 'react';
import { BookOpen, Video, Target, ArrowRight, Zap, GraduationCap, Clock } from 'lucide-react';
import { EducationResource } from '../types';

const RESOURCES: EducationResource[] = [
  { title: 'The Modern Portfolio Theory', category: 'Fundamentals', description: 'Understanding risk-adjusted returns and diversification in a modern landscape.', type: 'Article' },
  { title: 'Crypto for Traditional Investors', category: 'Crypto', description: 'How to allocate digital assets without compromising long-term stability.', type: 'Strategy' },
  { title: 'Psychology of Bull Markets', category: 'Psychology', description: 'Identifying greed vs analysis when markets are hitting all-time highs.', type: 'Article' },
  { title: 'Options Trading Explained', category: 'Advanced', description: 'A visual guide to calls, puts, and hedging your existing portfolio.', type: 'Video' },
  { title: 'Macro Trends in 2025', category: 'Economics', description: 'Analyzing the global economic shift and its impact on your savings.', type: 'Strategy' },
  { title: 'Sustainable Investing Guide', category: 'ESG', description: 'Investing in the future of the planet while maintaining growth.', type: 'Article' },
];

const Education: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden glass p-12 rounded-[2.5rem] border border-white/5">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 rounded-lg text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/20">
            <GraduationCap size={14} />
            <span>Academy Beta</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
            Elevate Your <span className="text-gradient">Financial Intelligence</span>.
          </h2>
          <p className="text-lg text-slate-400 font-medium leading-relaxed mb-8">
            Access institutional-grade investment knowledge curated by our AI engine. From basic budgeting to advanced derivative strategies.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-500/20 flex items-center">
              Start Foundations Course
              <ArrowRight className="ml-2" size={18} />
            </button>
            <button className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black text-sm transition-all">
              Browse All Topics
            </button>
          </div>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES.map((res, i) => (
          <div 
            key={i} 
            className="group glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-2 cursor-pointer relative overflow-hidden animate-slide-up opacity-0"
            style={{ animationDelay: `${i * 100}ms` }}
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
              {res.type === 'Video' ? <Video size={64} /> : res.type === 'Strategy' ? <Target size={64} /> : <BookOpen size={64} />}
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded border border-blue-500/10">
                {res.category}
              </span>
              <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-bold">
                <Clock size={12} />
                <span>8 MIN READ</span>
              </div>
            </div>

            <h4 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
              {res.title}
            </h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 line-clamp-2">
              {res.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                {res.type === 'Video' ? <Video size={16} /> : <BookOpen size={16} />}
                <span>{res.type}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expert Tips */}
      <div className="glass p-8 rounded-[2rem] border border-amber-500/10 bg-amber-500/5">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
            <Zap size={32} />
          </div>
          <div>
            <h5 className="text-lg font-black text-amber-500 uppercase tracking-tight mb-1">AI Daily Pro-Tip</h5>
            <p className="text-slate-300 font-medium leading-relaxed">
              "Dollar-cost averaging (DCA) is statistically superior to market timing for over 90% of retail investors. Don't let volatility break your discipline—set your automated transfers and focus on your 10-year horizon."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;