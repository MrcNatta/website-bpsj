import React, { useState, useEffect, useRef } from 'react';
import LogoKemenPU from './assets/logo-kemenpu.png';
import EngineerImg from './assets/engineer.png';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Data Contoh Riwayat Obrolan
  const historyData = [
    { id: 1, title: 'Tanya Jalan Tol Manado Bitung', date: 'Hari ini' },
    { id: 2, title: 'Laporan Jalan Rusak Minahasa', date: 'Kemarin' },
    { id: 3, title: 'Informasi Jembatan Sulawesi', date: '3 Feb 2024' },
  ];

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    if (!isChatOpen) setIsChatOpen(true);

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: `Halo Sobat Jalan! Terima kasih telah bertanya tentang "${text}". Saya Asisten Virtual BPJN siap membantu memberikan informasi terkait hal tersebut.`,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  useEffect(() => {
    if (isChatOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden relative font-sans">
      
      {/* ================= LANDING PAGE ================= */}
      {!isChatOpen && (
        <div className="flex-1 relative flex flex-col items-center">
          <div className="batik-fade-overlay"></div>
          
          <header className="relative z-10 w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
            <img src={LogoKemenPU} alt="Logo" className="h-10 sm:h-16 object-contain" />
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="bg-white/70 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200 text-[#1e3a5f] text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-white transition-all"
            >
               <span className="text-lg">🕒</span> Riwayat Obrolan
            </button>
          </header>

          <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 -mt-20">
            <h1 className="text-[#1e3a5f] text-4xl sm:text-7xl font-black mb-4 tracking-tighter">Halo Sobat Jalan !</h1>
            <p className="text-[#1e3a5f]/70 text-lg sm:text-2xl font-bold mb-12">Apa yang ingin anda ketahui hari ini ?</p>
            
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} 
              className="w-full max-w-3xl bg-white border-[4px] border-[#1e3a5f] rounded-full flex items-center px-6 py-1 shadow-2xl focus-within:shadow-[#1e3a5f]/10 transition-shadow"
            >
              <span className="text-slate-300 mr-3 text-2xl">🔍</span>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ajukan Pertanyaan"
                className="flex-1 bg-transparent border-none outline-none py-4 text-lg font-bold text-[#1e3a5f] placeholder:font-medium placeholder:text-slate-300"
              />
              <button type="submit" className="bg-[#fbb03b] p-3 rounded-full hover:scale-110 transition-transform active:scale-95 shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </main>
        </div>
      )}

      {/* ================= CHAT PAGE ================= */}
      {isChatOpen && (
        <div className="flex-1 flex flex-col h-full bg-[#f8fafc] relative">
          {/* Header Chat Area */}
          <header className="px-4 sm:px-8 py-4 bg-[#1e3a5f] text-white flex items-center justify-between shadow-xl z-20">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors text-xl">←</button>
              <div className="w-10 h-10 bg-white rounded-full p-1 shadow-inner">
                 <img src={LogoKemenPU} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base leading-tight">BPJN Assistant</h2>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                   <span className="text-[10px] text-green-100 uppercase font-black tracking-widest">Online</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/10"
            >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
               <span className="hidden sm:inline">Riwayat Obrolan</span>
            </button>
          </header>

          {/* Area Pesan Chat (Background Batik) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 chat-messages-area no-scrollbar">
            {/* Bot Welcome Message */}
            <div className="flex items-start gap-4">
              <img src={EngineerImg} alt="Bot" className="h-16 sm:h-20 w-auto drop-shadow-lg z-10" />
              <div className="bubble bg-white border border-slate-100 text-[#1e3a5f] rounded-tl-none">
                Halo Sobat Jalan! Saya siap membantu menjawab pertanyaan Anda seputar infrastruktur nasional. 👷‍♀️
              </div>
            </div>

            {/* List Chat Dinamis */}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <img src={EngineerImg} alt="Bot" className="h-14 w-auto z-10" />}
                <div className={`
                  bubble shadow-md
                  ${msg.sender === 'user' 
                    ? 'bg-[#1e3a5f] text-white rounded-tr-none font-medium' 
                    : 'bg-white text-[#1e3a5f] rounded-tl-none border border-slate-50'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <footer className="p-4 sm:p-8 bg-white border-t border-slate-100 z-10">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
              className="max-w-4xl mx-auto bg-slate-50 border-[3px] border-[#1e3a5f] rounded-full flex items-center px-6 py-1 shadow-lg focus-within:bg-white transition-all"
            >
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pertanyaan Anda di sini..." 
                className="flex-1 bg-transparent border-none outline-none py-3 text-sm sm:text-lg font-bold text-[#1e3a5f] placeholder:text-slate-400 placeholder:font-medium"
              />
              <button type="submit" className="bg-[#fbb03b] p-2.5 sm:p-3 rounded-full shadow-md active:scale-95 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </footer>
        </div>
      )}

      {/* ================= POPUP MODAL RIWAYAT OBROLAN ================= */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Gelap Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsHistoryOpen(false)}
          ></div>

          {/* Kontainer Modal */}
          <div className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl popup-anim border border-slate-100">
            {/* Header Modal */}
            <div className="bg-[#2b59c3] p-6 text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <h3 className="font-bold text-base tracking-tight">Riwayat Obrolan</h3>
               </div>
               <button onClick={() => setIsHistoryOpen(false)} className="hover:rotate-90 transition-transform p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
               </button>
            </div>

            {/* List Riwayat */}
            <div className="p-4 max-h-[400px] overflow-y-auto no-scrollbar bg-slate-50/30">
              {historyData.map((item) => (
                <div 
                  key={item.id} 
                  className="group mb-2 p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#2b59c3] hover:shadow-md cursor-pointer transition-all flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-bold text-[#1e3a5f] group-hover:text-[#2b59c3]">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">{item.date}</p>
                  </div>
                  <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b59c3" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              ))}
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-slate-50 text-center bg-white">
               <button 
                 onClick={() => setIsHistoryOpen(false)}
                 className="text-[#2b59c3] text-xs font-black uppercase tracking-widest hover:underline"
               >
                 Tutup Riwayat
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;