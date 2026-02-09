
import React, { useState } from 'react';
import { UserProfile, RiskTolerance } from '../types';
import { Save, Sparkles, Loader2, FileText } from 'lucide-react';
import { getInvestmentRecommendations } from '../services/geminiService';

interface ProfileFormProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [recLoading, setRecLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const generateStrategy = async () => {
    setRecLoading(true);
    setRecommendation(null);
    try {
      const rec = await getInvestmentRecommendations(formData);
      setRecommendation(rec);
    } catch (err) {
      console.error(err);
    } finally {
      setRecLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Investor Profile</h2>
        <p className="text-slate-400 text-sm">Tailor your AI recommendations by keeping this updated</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-100 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-100 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Investment Goal</label>
              <textarea
                value={formData.investmentGoal}
                onChange={(e) => setFormData({ ...formData, investmentGoal: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-100 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Risk Tolerance</label>
                <select
                  value={formData.riskTolerance}
                  onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value as RiskTolerance })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-100 transition-all"
                >
                  {Object.values(RiskTolerance).map((rt) => (
                    <option key={rt} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Horizon (Years)</label>
                <input
                  type="number"
                  value={formData.horizonYears}
                  onChange={(e) => setFormData({ ...formData, horizonYears: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-100 transition-all"
                />
              </div>
            </div>

            <button type="submit" className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold transition-all">
              <Save size={18} />
              <span>Save Profile</span>
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-lg text-white">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Sparkles className="mr-2" size={20} />
              AI Strategy
            </h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Get a personalized investment roadmap generated by Gemini 3 Pro based on your unique profile settings.
            </p>
            <button 
              onClick={generateStrategy}
              disabled={recLoading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {recLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>{recLoading ? 'Analyzing...' : 'Generate Roadmap'}</span>
            </button>
          </div>
          
          {recommendation && (
            <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-2xl animate-in zoom-in duration-300">
              <div className="flex items-center space-x-2 text-blue-400 mb-3">
                <FileText size={18} />
                <h4 className="font-bold">FinAI Report</h4>
              </div>
              <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {recommendation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
