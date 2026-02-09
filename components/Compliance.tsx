import React from 'react';
import { ShieldCheck, FileText, AlertCircle, Clock, CheckCircle2, Search, Filter } from 'lucide-react';
import { MOCK_DOCUMENTS, MOCK_COMPLIANCE } from '../constants';

const Compliance: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">Compliance & Docs</h2>
          <p className="text-slate-400 font-medium">Verify documents and monitor regulatory risks</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            Upload Document
          </button>
          <button className="px-6 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">
            Request Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-slate-900/40 flex items-center justify-between">
              <h4 className="font-bold text-white uppercase tracking-widest text-xs">Verified Trade Ledger</h4>
              <div className="flex items-center space-x-2 text-emerald-400 text-[10px] font-black uppercase">
                <ShieldCheck size={14} />
                <span>Blockchain Secure</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Document</th>
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                    <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Blockchain ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_DOCUMENTS.map((doc) => (
                    <tr key={doc.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-slate-800 rounded-lg text-blue-400 border border-white/5 group-hover:scale-110 transition-transform">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{doc.type}</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase">{doc.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6