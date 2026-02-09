import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, AlertTriangle, Newspaper, Settings, 
  Trash2, Mail, Info, ArrowRight, Sparkles 
} from 'lucide-react';
import { Notification } from '../types';

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Price Breakout: NVDA',
    message: 'NVIDIA Corp has surged 5.2% in the last hour, crossing the $900 resistance level. AI sentiment is extremely bullish.',
    timestamp: '15 mins ago',
    isRead: false
  },
  {
    id: '2',
    type: 'news',
    title: 'Fed Meeting Minutes Released',
    message: 'Federal Reserve officials express concern over persistent inflation, hinting at "higher for longer" interest rates.',
    timestamp: '2 hours ago',
    isRead: false
  },
  {
    id: '3',
    type: 'system',
    title: 'Portfolio Rebalanced',
    message: 'Your conservative holdings were automatically adjusted to maintain target allocation of 60% equities / 40% bonds.',
    timestamp: 'Yesterday',
    isRead: true
  },
  {
    id: '4',
    type: 'alert',
    title: 'New Strategy Recommendation',
    message: 'Gemini AI has generated a new high-growth strategy for your Moderate risk profile. Review it in the AI Insights tab.',
    timestamp: '2 days ago',
    isRead: true
  }
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="text-amber-400" size={18} />;
      case 'news': return <Newspaper className="text-blue-400" size={18} />;
      case 'system': return <Settings className="text-slate-400" size={18} />;
      default: return <Info className="text-slate-400" size={18} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center">
            <Bell className="mr-3 text-blue-500" size={28} />
            Notifications
          </h2>
          <p className="text-slate-400 font-medium mt-1">Stay updated with market movements and AI alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={markAllRead}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all border border-white/5"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {notifications.length === 0 ? (
            <div className="glass p-12 rounded-3xl text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-500">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">You're all caught up!</h3>
              <p className="text-slate-400 text-sm">New notifications will appear here as the AI analyzes the market.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`group relative glass p-6 rounded-2xl border transition-all hover:border-white/10 ${notif.isRead ? 'opacity-70 border-white/5' : 'border-blue-500/20 shadow-lg shadow-blue-500/5'}`}
              >
                {!notif.isRead && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-slate-800/50 border border-white/5 ${!notif.isRead ? 'animate-glow' : ''}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-black tracking-tight ${notif.isRead ? 'text-slate-300' : 'text-white'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                      {notif.message}
                    </p>
                    <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notif.isRead && (
                        <button 
                          onClick={() => markAsRead(notif.id)}
                          className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notif.id)}
                        className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-rose-300 flex items-center"
                      >
                        <Trash2 size={12} className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <h3 className="text-xl font-black text-white mb-4 flex items-center">
              <Mail className="mr-2 text-blue-400" size={20} />
              AI Newsletter
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Get weekly deep-dives into emerging market trends and AI-driven portfolio strategies directly in your inbox.
            </p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="investor@finai.com"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-200"
              />
              <button className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 group">
                <span>Subscribe Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="mt-4 text-[9px] text-slate-500 text-center uppercase tracking-widest font-bold">
              Join 12,000+ smart investors
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5">
             <div className="flex items-center space-x-2 text-emerald-400 mb-3">
                <Sparkles size={18} />
                <h4 className="font-black text-sm uppercase tracking-widest">Real-time Pulse</h4>
             </div>
             <div className="space-y-3">
                {[
                  { label: 'Market Volatility', value: 'Low', color: 'text-emerald-400' },
                  { label: 'Fear/Greed Index', value: '64 (Greed)', color: 'text-emerald-400' },
                  { label: 'AI Prediction', value: 'Positive', color: 'text-blue-400' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                    <span className={`text-[10px] font-black ${stat.color} uppercase tracking-widest`}>{stat.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;