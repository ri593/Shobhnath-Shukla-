
import React, { useState, useMemo, useRef } from 'react';
import { ShieldCheck, FileText, AlertCircle, Clock, CheckCircle2, Search, Filter, Upload, Loader2, X, Activity, Sparkles, AlertTriangle } from 'lucide-react';
import { MOCK_DOCUMENTS, MOCK_COMPLIANCE } from '../constants';
import { TradeDocument } from '../types';
import { getDocumentExplanation, verifyDocumentAudit } from '../services/geminiService';

const Compliance: React.FC = () => {
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [documents, setDocuments] = useState<TradeDocument[]>(MOCK_DOCUMENTS);
  const [isUploading, setIsUploading] = useState(false);
  const [hoveredDocId, setHoveredDocId] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingExplanations, setLoadingExplanations] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAlerts = useMemo(() => {
    if (severityFilter === 'All') return MOCK_COMPLIANCE;
    return MOCK_COMPLIANCE.filter(alert => alert.severity === severityFilter);
  }, [severityFilter]);

  const filteredDocuments = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return documents;
    return documents.filter(doc => 
      doc.id.toLowerCase().includes(term) || 
      doc.type.toLowerCase().includes(term)
    );
  }, [documents, searchTerm]);

  const filterOptions = ['All', 'High', 'Medium', 'Low'];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const type = file.name.split('.')[0].replace(/_/g, ' ') || 'Trade Document';
      // Step 1: Trigger AI Document Audit
      const aiResult = await verifyDocumentAudit(file.name, type);

      const newDoc: TradeDocument = {
        id: `DOC-00${documents.length + 1}`,
        type: type,
        status: aiResult.isConsistent ? 'Verified' : 'Rejected',
        date: new Date().toISOString().split('T')[0],
        blockchainId: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
        aiVerification: aiResult
      };

      setDocuments([newDoc, ...documents]);
    } catch (error) {
      console.error('Audit failed:', error);
      // Fallback if AI fails
      const fallbackDoc: TradeDocument = {
        id: `DOC-00${documents.length + 1}`,
        type: file.name.split('.')[0] || 'Unknown Document',
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        blockchainId: 'Error during audit'
      };
      setDocuments([fallbackDoc, ...documents]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleMouseEnter = async (doc: TradeDocument) => {
    setHoveredDocId(doc.id);
    if (!explanations[doc.id] && !loadingExplanations[doc.id]) {
      setLoadingExplanations(prev => ({ ...prev, [doc.id]: true }));
      try {
        const explanation = await getDocumentExplanation(doc.type, doc.status);
        setExplanations(prev => ({ ...prev, [doc.id]: explanation || 'Explanation unavailable.' }));
      } catch (err) {
        setExplanations(prev => ({ ...prev, [doc.id]: 'Failed to generate AI insight.' }));
      } finally {
        setLoadingExplanations(prev => ({ ...prev, [doc.id]: false }));
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">Compliance & Docs</h2>
          <p className="text-slate-400 font-medium">Verify documents and monitor regulatory risks</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.png,.jpg"
          />
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 size={14} className="animate-spin text-blue-400" />
            ) : (
              <Upload size={14} className="text-blue-400" />
            )}
            <span>{isUploading ? 'AI Auditing...' : 'Upload & Verify'}</span>
          </button>
          <button className="px-6 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">
            Request Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-1">Trade Ledger</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Immutable Records</p>
              </div>

              <div className="relative flex-1 max-w-md w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search size={16} />
                </div>
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Find document by ID or Type..."
                  className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium text-slate-200 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto relative">
              {filteredDocuments.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Document</th>
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Audit Result</th>
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Blockchain ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredDocuments.map((doc) => (
                      <tr 
                        key={doc.id} 
                        className="hover:bg-white/5 transition-colors group relative"
                        onMouseEnter={() => handleMouseEnter(doc)}
                        onMouseLeave={() => setHoveredDocId(null)}
                      >
                        <td className="p-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 border border-white/5">
                              <FileText size={16} />
                            </div>
                            <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{doc.id}</span>
                          </div>
                        </td>
                        <td className="p-6 text-xs font-medium text-slate-300">{doc.type}</td>
                        <td className="p-6">
                          <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            doc.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                            doc.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                            'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {doc.status === 'Verified' ? <CheckCircle2 size={10} /> : doc.status === 'Pending' ? <Clock size={10} /> : <AlertTriangle size={10} />}
                            <span>{doc.status}</span>
                          </div>
                        </td>
                        <td className="p-6">
                           {doc.aiVerification ? (
                             <div className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest ${doc.aiVerification.isConsistent ? 'text-emerald-500' : 'text-rose-500'}`}>
                                <Sparkles size={12} className={doc.aiVerification.isConsistent ? "animate-pulse" : ""} />
                                <span>{doc.aiVerification.isConsistent ? 'Consistent' : 'Inconsistent'}</span>
                             </div>
                           ) : (
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Legacy Data</span>
                           )}
                        </td>
                        <td className="p-6">
                          <code className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                            {doc.blockchainId}
                          </code>
                        </td>

                        {/* AI Tooltip */}
                        {hoveredDocId === doc.id && (
                          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 z-[100] w-80 glass border border-blue-500/30 rounded-2xl p-4 shadow-2xl animate-fade-in pointer-events-none">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2 text-blue-400">
                                <Sparkles size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">FinAI Audit Insight</span>
                              </div>
                              {doc.aiVerification && (
                                <span className="text-[8px] font-black bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
                                  Confidence: {Math.round(doc.aiVerification.confidence * 100)}%
                                </span>
                              )}
                            </div>
                            
                            {loadingExplanations[doc.id] ? (
                              <div className="flex items-center space-x-2 py-2">
                                <Loader2 size={12} className="animate-spin text-slate-500" />
                                <span className="text-[10px] text-slate-500 italic font-medium animate-pulse">Synthesizing context...</span>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                                  {explanations[doc.id]}
                                </p>
                                
                                {doc.aiVerification && doc.aiVerification.findings.length > 0 && (
                                  <div className="pt-2 border-t border-white/10">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Audit Findings</p>
                                    <ul className="space-y-1">
                                      {doc.aiVerification.findings.map((f, i) => (
                                        <li key={i} className="flex items-start space-x-1.5 text-[10px] text-slate-300 font-medium">
                                          <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${doc.aiVerification?.isConsistent ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                          <span>{f}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 glass border-l border-b border-blue-500/30 rotate-45 hidden md:block" />
                          </div>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-600">
                    <Search size={32} />
                  </div>
                  <h5 className="text-white font-bold mb-1">No documents found</h5>
                  <p className="text-xs text-slate-500">Try adjusting your search for "{searchTerm}"</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-xs font-bold text-blue-400 hover:underline uppercase tracking-widest"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Regulatory Alerts</h4>
              <div className="flex space-x-1">
                {filterOptions.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSeverityFilter(opt)}
                    className={`px-2 py-0.5 rounded text-[8px] font-black uppercase transition-all ${
                      severityFilter === opt ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      alert.severity === 'High' ? 'bg-rose-500/10 text-rose-400' : 
                      alert.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {alert.severity} Risk
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] font-bold text-white mb-1">{alert.region} Protocol</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 overflow-hidden relative">
            <div className="absolute -top-6 -right-6 opacity-5">
              <ShieldCheck size={120} />
            </div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Compliance Rating</h4>
              <div className="flex items-end space-x-2 mb-2">
                <span className="text-4xl font-black text-white">99.8</span>
                <span className="text-sm font-bold text-emerald-500 mb-1.5">%</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-500/10 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.8%' }} />
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
                System health is excellent. All trade lanes verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
