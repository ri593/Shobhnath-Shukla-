import React, { useState } from 'react';
import { 
  TrendingUp, ArrowRight, ShieldCheck, Zap, 
  BarChart3, Globe, Mail, Lock, UserPlus, 
  Sparkles, ChevronRight, Activity
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center p-4 lg:p-0">
      {/* Background 3D Perspective Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', 
             backgroundSize: '40px 40px',
             transform: 'perspective(1000px) rotateX(60deg) translateY(-20%)',
             transformOrigin: 'top'
           }} 
      />

      {/* Floating 3D Market Visualization Container */}
      <div className="hidden lg:flex absolute left-[10%] top-1/2 -translate-y-1/2 w-[40%] h-[600px] flex-col items-center justify-center pointer-events-none z-10">
        
        {/* Animated 3D Globe */}
        <div className="relative w-96 h-96 perspective-1000">
          <div className="absolute inset-0 rounded-full border border-blue-500/10 shadow-[0_0_80px_rgba(59,130,246,0.1)]" />
          
          {/* Globe Content */}
          <div className="animate-rotate-3d w-full h-full relative">
            {/* SVG Wireframe Globe */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 text-blue-500">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
              {[...Array(6)].map((_, i) => (
                <ellipse key={`lat-${i}`} cx="50" cy="50" rx="48" ry={10 + i * 15} fill="none" stroke="currentColor" strokeWidth="0.2" />
              ))}
              {[...Array(6)].map((_, i) => (
                <ellipse key={`long-${i}`} cx="50" cy="50" rx={10 + i * 15} ry="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
              ))}
            </svg>

            {/* Pulsing Market Nodes */}
            <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
            <div className="absolute top-[60%] left-[70%] w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700 shadow-[0_0_10px_#3b82f6]" />
            <div className="absolute top-[40%] left-[10%] w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-300 shadow-[0_0_10px_#ef4444]" />
          </div>

          {/* Orbiting Market Labels */}
          <div className="absolute inset-0 animate-orbit">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-full border-blue-500/30 flex items-center space-x-2 animate-float shadow-xl backdrop-blur-md">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">S&P 500</span>
                <span className="text-[10px] font-black text-emerald-400">+1.24%</span>
             </div>
          </div>
          <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '-5s', animationDirection: 'reverse' }}>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-full border-rose-500/30 flex items-center space-x-2 animate-float delay-500 shadow-xl backdrop-blur-md">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">NASDAQ</span>
                <span className="text-[10px] font-black text-rose-400">-0.42%</span>
             </div>
          </div>
        </div>

        {/* Floating 3D Heat Map Simulation */}
        <div className="mt-12 w-full max-w-sm glass p-6 rounded-3xl border border-white/5 animate-slide-up delay-300 opacity-0 shadow-2xl overflow-hidden relative" style={{ animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-20" />
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center">
              <Activity size={14} className="mr-2 text-blue-500" />
              Market Sentiment Heatmap
            </h4>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 opacity-60">
            {[...Array(18)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-md animate-pulse-grid`}
                style={{ 
                  backgroundColor: Math.random() > 0.4 ? '#10b981' : '#ef4444',
                  animationDelay: `${i * 150}ms`
                }} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Auth Container */}
      <div className="w-full max-w-md relative z-20 animate-scale-in">
        <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Background Decorative Blobs */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 animate-float">
              <TrendingUp size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">FinAI Advisor</h1>
            <p className="text-slate-400 font-medium">Your intelligent gateway to the markets.</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl mb-8 border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Join Now
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="alex@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center space-x-2 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 group mt-4"
            >
              <span>{isLogin ? 'Access Terminal' : 'Create Account'}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Features */}
          <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
             <div className="flex flex-col items-center text-center">
                <ShieldCheck className="text-emerald-500 mb-2" size={18} />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Secure AES</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <Zap className="text-amber-500 mb-2" size={18} />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">AI Engine</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <Globe className="text-blue-500 mb-2" size={18} />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Real-time</span>
             </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">
          Powered by Gemini Intelligence Group
        </p>
      </div>
    </div>
  );
};

export default LandingPage;