
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, MessageSquare, Trash2 } from 'lucide-react';
import { ChatMessage, UserProfile } from '../types';
import { chatWithAdvisor } from '../services/geminiService';

interface ChatbotProps {
  profile: UserProfile;
}

const Chatbot: React.FC<ChatbotProps> = ({ profile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `Hello ${profile.name}! I'm your FinAI Advisor. I've analyzed your ${profile.riskTolerance} risk profile and current goals. How can I help you optimize your portfolio today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await chatWithAdvisor(input, profile, messages);
      const modelMsg: ChatMessage = { role: 'model', text: responseText || 'I am sorry, I am unable to process that at the moment.', timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = { role: 'model', text: 'I encountered an error connecting to the financial data network. Please try again.', timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'model',
      text: `Chat cleared. How can I assist you with your investments now?`,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-xl">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">AI Investment Advisor</h3>
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Market Expert Active</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                msg.role === 'user' ? 'ml-3 bg-blue-600' : 'mr-3 bg-slate-800'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none">
               <Loader2 size={16} className="animate-spin text-blue-500" />
               <span className="text-sm text-slate-400">FinAI is thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about dividends, risk management, or specific stocks..."
            className="w-full bg-slate-800 text-slate-100 pl-6 pr-14 py-4 rounded-2xl border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-500 mt-2 uppercase tracking-tighter">
          Financial advice provided by AI. Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
