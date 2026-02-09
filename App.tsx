
import React, { useState } from 'react';
import { 
  LayoutDashboard, Wallet, TrendingUp, BookOpen, 
  MessageSquare, User, Menu, Bell, Settings, LogOut,
  LineChart, Scale, ShieldCheck, Globe, Users
} from 'lucide-react';
import MarketSummary from './components/MarketSummary';
import Portfolio from './components/Portfolio';
import MarketAnalysis from './components/MarketAnalysis';
import MarketTrends from './components/MarketTrends';
import StockComparison from './components/StockComparison';
import Education from './components/Education';
import Chatbot from './components/Chatbot';
import ProfileForm from './components/ProfileForm';
import LandingPage from './components/LandingPage';
import Notifications from './components/Notifications';
import Compliance from './components/Compliance';
import Intelligence from './components/Intelligence';
import TradeNetwork from './components/TradeNetwork';
import { UserProfile } from './types';
import { MOCK_USER, MOCK_ASSETS, MOCK_PARTNERS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);

  if (!isAuthenticated) {
    return <LandingPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Wallet size={20} /> },
    { id: 'intelligence', label: 'Market Intelligence', icon: <Globe size={20} /> },
    { id: 'network', label: 'Trade Network', icon: <Users size={20} /> },
    { id: 'analysis', label: 'Market Insights', icon: <TrendingUp size={20} /> },
    { id: 'trends', label: 'Sectors', icon: <LineChart size={20} /> },
    { id: 'comparison', label: 'Compare', icon: <Scale size={20} /> },
    { id: 'compliance', label: 'Compliance', icon: <ShieldCheck size={20} /> },
    { id: 'education', label: 'Academy', icon: <BookOpen size={20} /> },
    { id: 'advisor', label: 'AI Advisor', icon: <MessageSquare size={20} /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell size={20} /> },
    { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <MarketSummary />;
      case 'portfolio': return <Portfolio assets={MOCK_ASSETS} profile={userProfile} />;
      case 'intelligence': return <Intelligence profile={userProfile} />;
      case 'network': return <TradeNetwork partners={MOCK_PARTNERS} />;
      case 'analysis': return <MarketAnalysis assets={MOCK_ASSETS} />;
      case 'trends': return <MarketTrends />;
      case 'comparison': return <StockComparison />;
      case 'compliance': return <Compliance />;
      case 'education': return <Education />;
      case 'advisor': return <Chatbot profile={userProfile} />;
      case 'notifications': return <Notifications />;
      case 'profile': return <ProfileForm profile={userProfile} onUpdate={setUserProfile} />;
      default: return <MarketSummary />;
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 glass border-r border-white/5 transition-transform duration-500 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">FinAI</h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${
                  activeTab === tab.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab.icon}
                <span className="font-bold text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5 bg-slate-900/40">
            <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all text-sm font-bold">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 glass z-30">
          <button className="lg:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Market Connected</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs">
                {userProfile.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-none mb-1">{userProfile.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{userProfile.riskTolerance} Profile</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
