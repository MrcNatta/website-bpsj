import React, { useState, useEffect, useRef } from 'react';
import LogoKemenPU from './assets/logo-kemenpu.png';
import EngineerImg from './assets/engineer.png';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

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
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: `Halo Sobat Jalan! Terima kasih telah bertanya tentang "${text}". Balai Pelaksanaan Jalan Nasional Sulawesi Utara siap membantu Anda.`, 
        sender: 'bot' 
      }]);
    }, 1200);
  };

  useEffect(() => {
    if (isChatOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden relative">
      
      {/* ================= LANDING PAGE ================= */}
      {!isChatOpen && (
        <div className="flex-1 relative flex flex-col items-center">
          <div className="batik-fade-overlay"></div>
          
          <header className="relative z-10 w-full px-4 sm:px-8 py-6 flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo Kiri */}
            <div className="flex-shrink-0">
              <img src={LogoKemenPU} alt="Logo" className="h-10 sm:h-14 object-contain" />
            </div>

            {/* TEKS TENGAH (Balai Pelaksanaan...) - RESPONSIVE */}
            <div className="hidden sm:flex flex-1 justify-center text-center px-4">
               <h2 className="text-[#1e3a5f] font-extrabold text-[10px] md:text-xs lg:text-sm uppercase tracking-widest leading-tight">
                  Balai Pelaksanaan Jalan Nasional <br className="md:hidden" /> Sulawesi Utara
               </h2>
            </div>

            {/* Tombol Kanan */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => setIsHistoryOpen(true)}
                className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 text-[#1e3a5f] text-[10px] sm:text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-white transition-all"
              >
                 <span>🕒</span> Riwayat Obrolan
              </button>
            </div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 -mt-20">
            <div className="w-full max-w-4xl">
              <h1 className="text-[#1e3a5f] text-4xl sm:text-7xl font-black mb-4 tracking-tighter">Halo Sobat Jalan !</h1>
              <p className="text-[#1e3a5f]/70 text-lg sm:text-2xl font-bold mb-12 uppercase text-[10px] sm:text-base tracking-widest">Apa yang ingin anda ketahui hari ini ?</p>
              
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} 
                className="w-full max-w-3xl mx-auto bg-white border-[4px] border-[#1e3a5f] rounded-full flex items-center px-6 py-1 shadow-2xl"
              >
                <span className="text-slate-300 mr-3 text-xl sm:text-2xl">🔍</span>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ajukan Pertanyaan"
                  className="flex-1 bg-transparent border-none outline-none py-3 sm:py-4 text-sm sm:text-xl font-bold text-[#1e3a5f] placeholder:font-medium placeholder:text-slate-300"
                />
                <button type="submit" className="bg-[#fbb03b] p-2 sm:p-3 rounded-full hover:scale-110 transition-transform active:scale-95 shadow-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            </div>
          </main>
        </div>
      )}

      {/* ================= CHAT PAGE ================= */}
      {isChatOpen && (
        <div className="flex-1 flex flex-col h-full bg-[#f8fafc] relative">
          <header className="px-4 sm:px-8 py-4 bg-[#1e3a5f] text-white flex items-center justify-between shadow-xl z-20">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors text-xl">←</button>
              <div className="w-10 h-10 bg-white rounded-full p-1 shadow-inner flex-shrink-0">
                 <img src={LogoKemenPU} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-sm sm:text-base leading-tight truncate">BPJN Assistant</h2>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                   <span className="text-[10px] text-green-100 uppercase font-black tracking-widest">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[10px] font-bold transition-all border border-white/10"
            >
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
               <span className="hidden sm:inline">Riwayat Obrolan</span>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 chat-messages-area no-scrollbar">
            <div className="flex items-start gap-4">
              <img src={EngineerImg} alt="Bot" className="h-16 sm:h-20 w-auto drop-shadow-lg z-10" />
              <div className="bubble bg-white border border-slate-100 text-[#1e3a5f] rounded-tl-none font-medium">
                Halo Sobat Jalan! Saya Asisten Virtual BPJN Sulawesi Utara. Ada yang bisa saya bantu? 👷‍♀️
              </div>
            </div>

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

          <footer className="p-4 sm:p-8 bg-white border-t border-slate-100 z-10">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                  className="max-w-4xl mx-auto bg-slate-50 border-[3px] border-[#1e3a5f] rounded-full flex items-center px-6 py-1 shadow-lg">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pesan..." 
                className="flex-1 bg-transparent border-none outline-none py-3 text-sm sm:text-lg font-bold text-[#1e3a5f] placeholder:text-slate-400 placeholder:font-medium"
              />
              <button type="submit" className="bg-[#fbb03b] p-2.5 sm:p-3 rounded-full shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </footer>
        </div>
      )}

      {/* ================= POPUP RIWAYAT ================= */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsHistoryOpen(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl popup-anim">
            <div className="bg-[#2b59c3] p-6 text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <h3 className="font-bold text-base">Riwayat Obrolan</h3>
               </div>
               <button onClick={() => setIsHistoryOpen(false)} className="text-white hover:rotate-90 transition-all">✕</button>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto no-scrollbar">
              {historyData.map((item) => (
                <div key={item.id} className="mb-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#2b59c3] cursor-pointer transition-all">
                  <p className="text-sm font-bold text-[#1e3a5f]">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.date}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-50 text-center">
               <button onClick={() => setIsHistoryOpen(false)} className="text-[#2b59c3] text-xs font-black uppercase hover:underline">Tutup</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;