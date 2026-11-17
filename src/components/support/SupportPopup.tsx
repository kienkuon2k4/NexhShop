'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  Phone, 
  Package, 
  RotateCcw, 
  Store, 
  ShieldCheck, 
  ChevronDown, 
  Sparkles,
  Headphones,
  CheckCheck,
  User,
  ShieldAlert,
  Radio
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';

interface SupportPopupProps {
  onOpenSellerRegister?: () => void;
  onOpenOrders?: () => void;
}

export const SupportPopup: React.FC<SupportPopupProps> = ({
  onOpenSellerRegister,
  onOpenOrders
}) => {
  const { currentUser } = useAuth();
  const { 
    activeConversation, 
    sendMessageFromUser, 
    requestLiveAgent, 
    switchChatModeToBot 
  } = useChat();

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLiveAgent = activeConversation.isConnectingAgent;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, activeConversation.messages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    sendMessageFromUser(text);
    if (!textToSend) setInputText('');
  };

  const handleActionClick = (action: string) => {
    if (action === 'CONNECT_AGENT') {
      requestLiveAgent();
    } else if (action === 'call_hotline') {
      window.open('tel:19008888');
    } else if (action === 'register_seller') {
      if (onOpenSellerRegister) onOpenSellerRegister();
      setIsOpen(false);
    } else if (action === 'go_orders') {
      if (onOpenOrders) onOpenOrders();
      setIsOpen(false);
    } else {
      handleSend(action);
    }
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 z-50 text-xs font-sans">
      
      {/* 1. NÚT NỔI TOGGLE POPUP (FLOATING BUTTON) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#273142] to-[#1f2735] text-white shadow-2xl hover:shadow-amber-500/20 border border-slate-700/80 hover:border-amber-400 transition-all duration-300 cursor-pointer active:scale-95"
        >
          {/* Pulsing online indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>

          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black group-hover:scale-110 transition shadow-sm">
            <Headphones className="w-4 h-4" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="font-extrabold text-xs text-white flex items-center gap-1">
              <span>Hỗ Trợ & Chat QTV</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-[10px] text-slate-300">
              {isLiveAgent ? '🟢 Chat với Quản trị viên' : 'Trực tuyến 24/7 • Phản hồi 1p'}
            </div>
          </div>

          {/* Badge if connected to Live Agent */}
          {isLiveAgent && (
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[9px] uppercase tracking-wider animate-pulse">
              Live QTV
            </span>
          )}
        </button>
      )}

      {/* 2. CỬA SỔ POPUP SUPPORT (CHAT BOX) */}
      {isOpen && (
        <div className="w-[calc(100vw-24px)] sm:w-[410px] max-w-md h-[540px] sm:h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#273142] to-[#19202c] text-white p-3.5 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black shadow-md ${
                  isLiveAgent 
                    ? 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white' 
                    : 'bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950'
                }`}>
                  {isLiveAgent ? <ShieldAlert className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#19202c]"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>{isLiveAgent ? 'Tổng Đài Quản Trị Viên' : 'NextCare Hỗ Trợ 24/7'}</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold">
                    {isLiveAgent ? 'Admin Live' : 'AI Bot'}
                  </span>
                </h3>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {currentUser ? `${currentUser.name} (${currentUser.role === 'SELLER' ? 'Người Bán' : currentUser.role === 'ADMIN' ? 'Admin' : 'Người Mua'})` : 'Khách Vãng Lai'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Thu nhỏ"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Segmented Tabs: AI Bot vs Live Admin Agent */}
          <div className="bg-slate-100 p-1.5 border-b border-slate-200 flex items-center gap-1">
            <button
              onClick={switchChatModeToBot}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                !isLiveAgent
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-amber-600" />
              <span>Trợ lý ảo NextCare</span>
            </button>

            <button
              onClick={requestLiveAgent}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                isLiveAgent
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-rose-700 bg-rose-50/70 border border-rose-200/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gặp Quản Trị Viên</span>
              {isLiveAgent && <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>}
            </button>
          </div>

          {/* Live Agent Banner info */}
          {isLiveAgent ? (
            <div className="bg-emerald-50 border-b border-emerald-200 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-900">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Đã kết nối Tổng Đài Viên / Admin trực tuyến
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                Admin Console
              </span>
            </div>
          ) : (
            <div className="bg-amber-50/90 border-b border-amber-200/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-amber-950 font-semibold">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-amber-600" />
                Hotline miễn phí:
              </span>
              <a 
                href="tel:19008888" 
                className="font-black text-rose-700 hover:underline"
              >
                1900 8888
              </a>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/60">
            {activeConversation.messages.map((m) => {
              const isUser = m.sender === 'user';
              const isAgent = m.sender === 'agent';
              const isBot = m.sender === 'bot';

              return (
                <div 
                  key={m.id} 
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Header Label */}
                  <div className="text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1 px-1">
                    {isAgent ? (
                      <span className="flex items-center gap-1 text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full border border-rose-200">
                        <ShieldAlert className="w-3 h-3 text-rose-600" />
                        {m.senderName}
                      </span>
                    ) : isBot ? (
                      <span className="flex items-center gap-1 text-amber-800">
                        <Bot className="w-3 h-3 text-amber-600" />
                        {m.senderName}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-600">
                        <User className="w-3 h-3" />
                        {m.senderName}
                      </span>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div 
                    className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                      isUser
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold rounded-br-xs'
                        : isAgent
                        ? 'bg-white border-2 border-rose-400 text-slate-900 font-medium rounded-bl-xs shadow-md'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Time + Status */}
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 px-1">
                    <span>{m.time}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                  </div>

                  {/* Quick action buttons attached to message */}
                  {m.quickActions && m.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {m.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(qa.action)}
                          className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-900 font-bold text-[11px] transition shadow-2xs cursor-pointer text-left flex items-center gap-1.5"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Common FAQ Chips */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[10px]">
            <button 
              onClick={() => handleSend('Tôi muốn tra cứu tình trạng đơn hàng')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              📦 Tra cứu đơn
            </button>
            <button 
              onClick={() => handleSend('Chính sách đổi trả bảo hành 15 ngày thế nào?')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              🛡️ Đổi trả 15 ngày
            </button>
            <button 
              onClick={() => handleSend('Làm sao để đăng ký mở gian hàng bán hàng trên NextShop?')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              🏪 Mở Shop bán
            </button>
            {!isLiveAgent && (
              <button 
                onClick={requestLiveAgent}
                className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition cursor-pointer border border-rose-200"
              >
                💬 Gặp QTV Sàn
              </button>
            )}
          </div>

          {/* Input Chat Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isLiveAgent 
                  ? "Nhập tin nhắn gửi tới Quản Trị Viên sàn..." 
                  : "Nhập câu hỏi (ví dụ: giao hàng, mở shop, bảo hành...)"
              }
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-xs text-slate-900 font-medium bg-slate-50 focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${
                isLiveAgent
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950'
              }`}
              title="Gửi tin nhắn"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
