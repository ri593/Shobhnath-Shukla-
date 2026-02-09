import React, { useState, useEffect } from 'react';
import { RefreshCcw, TrendingUp, TrendingDown, Minus, Loader2, Sparkles } from 'lucide-react';
import { getMarketAnalysis } from '../services/geminiService';
import { Asset, MarketTrend } from '../types';

interface MarketAnalysisProps {
  assets: Asset[];
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ assets }) => {
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarketAnalysis(assets);
      setTrends(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch AI analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [assets]);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'bullish': return <TrendingUp className="text-emerald-400" size={18} />;
      case 'bearish': return <TrendingDown className="text-rose-400" size={18} />;
      default: return <Minus className="text-slate-400" size={18} />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'bullish': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'bearish': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center">
            <Sparkles className="mr-2 text-blue-400" size={24} />
            Market Insights
          </h2>
          <p className="text-slate-400 text-sm">AI-powered sentiment analysis for your holdings</p>
        </div>
        <button 
          onClick={fetchAnalysis}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-100 rounded-lg transition-all border border-slate-700 active:scale-95"
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Analysis</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
          <p className="text-slate-400 animate-pulse">Consulting the AI markets...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-center animate-shake">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map((trend, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-all group animate-scale-in opacity-0"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-slate-100">{trend.asset}</h4>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getSentimentColor(trend.sentiment)}`}>
                  {getSentimentIcon(trend.sentiment)}
                  <span>{trend.sentiment}</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {trend.reasoning}
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 uppercase tracking-widest font-bold">Prediction</span>
                <span className="text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded">{trend.predictedMove}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketAnalysis;