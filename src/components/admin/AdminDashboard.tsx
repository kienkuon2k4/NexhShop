'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Store, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  BarChart3, 
  AlertCircle,
  ShoppingBag,
  Clock,
  Check,
  X,
  FileText,
  Building2,
  Phone,
  ShieldCheck,
  Lock,
  LogOut,
  Headphones,
  Send,
  MessageSquare,
  Search,
  CheckCheck,
  User,
  Bot,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';

interface AdminDashboardProps {
  onBackToMarketplace: () => void;
  onOpenLoginModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToMarketplace,
  onOpenLoginModal
}) => {
  const { currentUser, pendingShops, approveShop, rejectShop } = useAuth();
  const { conversations, sendMessageFromAdmin, markConversationAsReadByAdmin } = useChat();

  const [activeTab, setActiveTab] = useState<'pending' | 'active_shops' | 'analytics' | 'live_chat'>('pending');
  const [notification, setNotification] = useState<string | null>(null);

  // Chat tab state
  const [selectedConversationId, setSelectedConversationId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [chatFilter, setChatFilter] = useState<'ALL' | 'CUSTOMER' | 'SELLER'>('ALL');
  const [adminReplyText, setAdminReplyText] = useState('');
  const [chatSearch, setChatSearch] = useState('');

  // Danh sách các shop đã hoạt động cố định
  const [activeStores, setActiveStores] = useState([
    {
      id: 'shop-01',
      name: 'Gia Dụng Thông Minh Việt',
      owner: 'Nguyễn Văn Hùng (seller@nextshop.vn)',
      category: 'Gia Dụng & Bếp',
      phone: '0988 123 456',
      status: 'APPROVED',
      revenue: '350.000.000 ₫',
      joinDate: '10/11/2026'
    },
    {
      id: 'shop-02',
      name: 'NextStreet Sneaker Hub',
      owner: 'Lê Minh Tuấn (tuan.sneaker@nextshop.vn)',
      category: 'Thời Trang & Sneaker',
      phone: '0912 345 678',
      status: 'APPROVED',
      revenue: '720.000.000 ₫',
      joinDate: '01/11/2026'
    }
  ]);

  const handleApprove = (reqId: string, shopName: string) => {
    approveShop(reqId);
    setNotification(`Đã PHÊ DUYỆT thành công gian hàng "${shopName}"! Quyền tài khoản đã được cấp thành SELLER.`);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleReject = (reqId: string, shopName: string) => {
    rejectShop(reqId);
    setNotification(`Đã TỪ CHỐI hồ sơ gian hàng "${shopName}".`);
    setTimeout(() => setNotification(null), 5000);
  };

  const pendingCount = pendingShops.filter(s => s.status === 'PENDING').length;
  const totalUnreadChat = conversations.reduce((acc, c) => acc + (c.unreadCountForAdmin || 0), 0);

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    if (chatFilter === 'CUSTOMER' && c.userRole !== 'CUSTOMER') return false;
    if (chatFilter === 'SELLER' && c.userRole !== 'SELLER') return false;
    if (chatSearch.trim()) {
      const q = chatSearch.toLowerCase();
      const matchName = c.userName.toLowerCase().includes(q);
      const matchEmail = c.userEmail.toLowerCase().includes(q);
      const matchShop = c.shopName?.toLowerCase().includes(q);
      return matchName || matchEmail || matchShop;
    }
    return true;
  });

  const activeSelectedConv = conversations.find(c => c.id === selectedConversationId) || conversations[0];

  const handleSelectConversation = (convId: string) => {
    setSelectedConversationId(convId);
    markConversationAsReadByAdmin(convId);
  };

  const handleAdminSend = (textToSend?: string) => {
    const text = textToSend || adminReplyText;
    if (!text.trim() || !activeSelectedConv) return;

    sendMessageFromAdmin(activeSelectedConv.id, text.trim());
    if (!textToSend) setAdminReplyText('');
  };

  const cannedResponses = [
    'Dạ chào bạn, tôi là Quản Trị Viên sàn NextShop, xin hỏi bạn cần hỗ trợ gì ạ?',
    'Hồ sơ đăng ký gian hàng của bạn đã được tiếp nhận và đang được duyệt ngay trong hôm nay nhé!',
    'Đơn hàng của bạn đang được bàn giao cho đơn vị vận chuyển NextPass hỏa tốc 2 giờ.',
    'Shop của bạn đủ điều kiện tham gia Flash Sale sắp tới. Mời bạn vào Kênh Người Bán để cấu hình giá ưu đãi nhé!'
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 text-xs">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToMarketplace}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về trang chủ sàn</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black shadow-sm">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white">NextShop Admin Console</span>
              <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Super Admin: {currentUser?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400 text-xs hidden md:inline">Hệ thống Online</span>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="max-w-[1400px] w-full mx-auto px-4 pt-4">
          <div className="p-3.5 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-between font-bold animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white text-xs cursor-pointer">
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Content */}
      <div className="max-w-[1400px] w-full mx-auto px-4 py-6 flex-1 space-y-6">
        
        {/* Platform Overview KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Tổng GMV toàn sàn</span>
              <div className="text-2xl font-black text-slate-900 mt-1">32.500.000.000 ₫</div>
              <span className="text-emerald-600 text-[11px] font-bold mt-1 block">↑ +24.8% tuần này</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Hồ sơ chờ phê duyệt</span>
              <div className="text-2xl font-black text-amber-600 mt-1">{pendingCount} Hồ sơ</div>
              <span className="text-slate-400 text-[11px] mt-1 block">Cần thẩm định MST & Kho</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Chat Trực Tiếp Chờ Phản Hồi</span>
              <div className="text-2xl font-black text-rose-600 mt-1">{totalUnreadChat} Tin nhắn</div>
              <span className="text-slate-400 text-[11px] mt-1 block">Từ Người mua & Chủ shop</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
              <Headphones className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Tỷ lệ đơn giao thành công</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">98.6%</div>
              <span className="text-slate-400 text-[11px] mt-1 block">Đúng chuẩn NextPass 2H</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs trong Admin */}
        <div className="flex flex-wrap border-b border-slate-200 bg-white rounded-t-2xl px-6 pt-4 gap-4 shadow-xs">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'pending'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Hồ Sơ Chờ Phê Duyệt</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('live_chat')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'live_chat'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Trung Tâm Hỗ Trợ CSKH Trực Tuyến</span>
            {totalUnreadChat > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold animate-pulse">
                {totalUnreadChat}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('active_shops')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'active_shops'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Danh Sách Gian Hàng Đang Hoạt Động</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Thống Kê Doanh Thu & Sàn</span>
          </button>
        </div>

        {/* TAB 1: DANH SÁCH HỒ SƠ ĐĂNG KÝ MỞ SHOP CỦA NGƯỜI MUA */}
        {activeTab === 'pending' && (
          <div className="bg-white p-6 rounded-b-2xl border-x border-b border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-base text-slate-900">Kiểm Duyệt & Phê Duyệt Hồ Sơ Người Bán Mới</h2>
                <p className="text-slate-500 text-[11px]">
                  Người mua nộp đơn mở shop phải được Quản trị viên thẩm định MST/CCCD trước khi cấp quyền Bán hàng.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Tổng hồ sơ tiếp nhận: {pendingShops.length}
              </span>
            </div>

            {pendingShops.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                Chưa có hồ sơ đăng ký mở gian hàng nào đang chờ duyệt.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingShops.map((req) => (
                  <div 
                    key={req.id} 
                    className={`p-4 rounded-xl border transition ${
                      req.status === 'PENDING'
                        ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300/50'
                        : req.status === 'APPROVED'
                        ? 'bg-emerald-50/30 border-emerald-200'
                        : 'bg-rose-50/30 border-rose-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Cột thông tin hồ sơ */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900">{req.shopName}</span>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            req.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                            req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {req.status === 'PENDING' && '⏳ Chờ Admin Duyệt'}
                            {req.status === 'APPROVED' && '✓ Đã Phê Duyệt - Cấp Quyền SELLER'}
                            {req.status === 'REJECTED' && '✕ Đã Từ Chối'}
                          </span>
                          <span className="text-[10px] text-slate-400">Mã đơn: {req.id} • {req.createdAt}</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-600">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Tài khoản nộp đơn:</span>
                            <strong className="text-slate-800">{req.userEmail}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Ngành hàng:</span>
                            <strong className="text-slate-800">{req.category}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Số điện thoại:</span>
                            <strong className="text-slate-800">{req.phone}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">MST / CCCD:</span>
                            <strong className="text-slate-800">{req.taxOrId}</strong>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-600 bg-white/70 p-2 rounded-lg border border-slate-200/60">
                          <span className="text-slate-400 font-medium">Kho lấy hàng:</span> <strong className="text-slate-800">{req.address}</strong>
                        </div>
                      </div>

                      {/* Cột thao tác duyệt của Admin */}
                      <div className="flex items-center gap-2 shrink-0">
                        {req.status === 'PENDING' ? (
                          <>
                            <button
                              onClick={() => handleApprove(req.id, req.shopName)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm transition cursor-pointer flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Phê Duyệt Gian Hàng</span>
                            </button>

                            <button
                              onClick={() => handleReject(req.id, req.shopName)}
                              className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 font-bold text-xs transition cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Từ Chối</span>
                            </button>
                          </>
                        ) : (
                          <div className="text-xs font-bold text-slate-500 px-3 py-1 bg-slate-100 rounded-lg">
                            {req.status === 'APPROVED' ? 'Đã kích hoạt gian hàng' : 'Đã hủy hồ sơ'}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRUNG TÂM HỖ TRỢ CSKH TRỰC TUYẾN (LIVE CHAT QUẢN TRỊ VIÊN) */}
        {activeTab === 'live_chat' && (
          <div className="bg-white rounded-b-2xl border-x border-b border-slate-200 shadow-xs flex flex-col md:flex-row min-h-[640px] overflow-hidden">
            
            {/* Left Column: Conversations List */}
            <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
              
              {/* Header & Filter Controls */}
              <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-rose-600" />
                    <span>Hộp Thư Hỗ Trợ Trực Tiếp</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Trực tuyến
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Tìm tên, email hoặc tên shop..."
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-rose-400 outline-none transition"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex gap-1">
                  <button
                    onClick={() => setChatFilter('ALL')}
                    className={`flex-1 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                      chatFilter === 'ALL'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tất cả ({conversations.length})
                  </button>
                  <button
                    onClick={() => setChatFilter('CUSTOMER')}
                    className={`flex-1 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                      chatFilter === 'CUSTOMER'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Người mua ({conversations.filter(c => c.userRole === 'CUSTOMER').length})
                  </button>
                  <button
                    onClick={() => setChatFilter('SELLER')}
                    className={`flex-1 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                      chatFilter === 'SELLER'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Chủ shop ({conversations.filter(c => c.userRole === 'SELLER').length})
                  </button>
                </div>
              </div>

              {/* Conversations Scroll List */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    Không tìm thấy hội thoại nào phù hợp.
                  </div>
                ) : (
                  filteredConversations.map((conv) => {
                    const isSelected = conv.id === (activeSelectedConv?.id);
                    const lastMsg = conv.messages[conv.messages.length - 1];
                    const isSeller = conv.userRole === 'SELLER';

                    return (
                      <div
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv.id)}
                        className={`p-3.5 transition cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-white border-l-4 border-rose-600 shadow-sm'
                            : 'hover:bg-white/80'
                        }`}
                      >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white shadow-xs ${
                            isSeller 
                              ? 'bg-gradient-to-tr from-amber-500 to-orange-600' 
                              : 'bg-gradient-to-tr from-blue-500 to-indigo-600'
                          }`}>
                            {isSeller ? <Store className="w-5 h-5" /> : <User className="w-5 h-5" />}
                          </div>
                          {conv.unreadCountForAdmin > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center border-2 border-white">
                              {conv.unreadCountForAdmin}
                            </span>
                          )}
                        </div>

                        {/* Conv Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h4 className="font-extrabold text-xs text-slate-900 truncate">
                              {conv.userName}
                            </h4>
                            <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                              {conv.lastUpdated}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${
                              isSeller 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {isSeller ? 'Chủ Gian Hàng' : 'Người Mua'}
                            </span>
                            {conv.shopName && (
                              <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                                • {conv.shopName}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 truncate">
                            {lastMsg ? lastMsg.text : 'Chưa có tin nhắn...'}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Right Column: Chat Window With Selected User */}
            <div className="flex-1 flex flex-col bg-white">
              {activeSelectedConv ? (
                <>
                  {/* Chat Top Header */}
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white shadow-sm ${
                        activeSelectedConv.userRole === 'SELLER'
                          ? 'bg-gradient-to-tr from-amber-500 to-orange-600'
                          : 'bg-gradient-to-tr from-blue-500 to-indigo-600'
                      }`}>
                        {activeSelectedConv.userRole === 'SELLER' ? <Store className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-slate-900">
                            {activeSelectedConv.userName}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            activeSelectedConv.userRole === 'SELLER'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {activeSelectedConv.userRole === 'SELLER' ? '🏪 Đối Tác Bán Hàng (Seller)' : '👤 Khách Mua Hàng (Customer)'}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{activeSelectedConv.userEmail}</span>
                          {activeSelectedConv.shopName && (
                            <span>• Shop: <strong>{activeSelectedConv.shopName}</strong></span>
                          )}
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Đang kết nối phiên hỗ trợ
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        Admin ID: {currentUser?.id || 'admin-01'}
                      </span>
                    </div>
                  </div>

                  {/* Messages Flow */}
                  <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
                    {activeSelectedConv.messages.map((m) => {
                      const isMeAdmin = m.sender === 'agent';
                      const isBot = m.sender === 'bot';
                      const isUser = m.sender === 'user';

                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${isMeAdmin ? 'items-end' : 'items-start'}`}
                        >
                          {/* Sender Label */}
                          <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1 px-1">
                            {isMeAdmin ? (
                              <span className="font-bold text-rose-700 flex items-center gap-1">
                                <ShieldAlert className="w-3 h-3" />
                                {m.senderName} (Bạn)
                              </span>
                            ) : isBot ? (
                              <span className="font-bold text-amber-700 flex items-center gap-1">
                                <Bot className="w-3 h-3" />
                                {m.senderName}
                              </span>
                            ) : (
                              <span className="font-bold text-slate-700 flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {m.senderName}
                              </span>
                            )}
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                              isMeAdmin
                                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-br-xs shadow-md'
                                : isBot
                                ? 'bg-amber-50/80 border border-amber-200 text-amber-950 rounded-bl-xs'
                                : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                            }`}
                          >
                            {m.text}
                          </div>

                          {/* Timestamp */}
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 px-1">
                            <span>{m.time}</span>
                            {isMeAdmin && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Fast Canned Responses Chips */}
                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Câu trả lời mẫu nhanh của Quản Trị Viên:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cannedResponses.map((res, i) => (
                        <button
                          key={i}
                          onClick={() => handleAdminSend(res)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-700 text-[10px] font-medium transition cursor-pointer text-left truncate max-w-[320px]"
                          title={res}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Admin Reply Box */}
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleAdminSend(); }}
                    className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
                  >
                    <input
                      type="text"
                      placeholder={`Phản hồi trực tiếp cho ${activeSelectedConv.userName}...`}
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none text-xs text-slate-900 bg-slate-50 focus:bg-white transition"
                    />

                    <button
                      type="submit"
                      disabled={!adminReplyText.trim()}
                      className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md transition cursor-pointer flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>Gửi Phản Hồi</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                  <Headphones className="w-12 h-12 text-slate-300 mb-3" />
                  <p className="text-sm font-bold text-slate-600">Chọn một hội thoại bên trái để bắt đầu chat trực tiếp</p>
                  <p className="text-xs text-slate-400 mt-1">Bạn có thể phản hồi tin nhắn từ cả Người mua và Chủ shop.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: GIAN HÀNG ĐANG HOẠT ĐỘNG TRÊN SÀN */}
        {activeTab === 'active_shops' && (
          <div className="bg-white p-6 rounded-b-2xl border-x border-b border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-base text-slate-900">Danh Sách Gian Hàng Đang Kinh Doanh</h2>
                <p className="text-slate-500 text-[11px]">Quản lý tình trạng hoạt động và kiểm soát chất lượng gian hàng</p>
              </div>
              <span className="text-xs font-bold text-slate-500">Tổng cộng: {activeStores.length} shop</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                    <th className="py-3 px-3">TÊN GIAN HÀNG</th>
                    <th className="py-3 px-3">CHỦ SHOP / TÀI KHOẢN</th>
                    <th className="py-3 px-3">NGÀNH HÀNG</th>
                    <th className="py-3 px-3">HOTLINE</th>
                    <th className="py-3 px-3">DOANH THU GMV</th>
                    <th className="py-3 px-3">TRẠNG THÁI</th>
                    <th className="py-3 px-3 text-right">QUẢN TRỊ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {activeStores.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-[10px] text-slate-400">Tham gia: {s.joinDate}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-700">{s.owner}</td>
                      <td className="py-3 px-3 text-slate-600">{s.category}</td>
                      <td className="py-3 px-3 text-slate-600">{s.phone}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{s.revenue}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                          Hoạt Động
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button 
                          className="px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition cursor-pointer"
                        >
                          Kiểm Tra
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: THỐNG KÊ DOANH THU */}
        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-b-2xl border-x border-b border-slate-200 shadow-xs space-y-4">
            <h2 className="font-bold text-base text-slate-900">Báo Cáo Tăng Trưởng Doanh Số Toàn Sàn</h2>
            <p className="text-slate-500 text-[11px]">Dữ liệu được tổng hợp theo thời gian thực từ 4 ngành hàng chính</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-700">Tỷ trọng ngành hàng tháng này:</span>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex justify-between"><span>Gia Dụng & Bếp Thông Minh:</span> <strong>42% (13.65 tỷ ₫)</strong></li>
                  <li className="flex justify-between"><span>Thời Trang & Sneaker:</span> <strong>28% (9.10 tỷ ₫)</strong></li>
                  <li className="flex justify-between"><span>Điện Tử & Âm Thanh:</span> <strong>20% (6.50 tỷ ₫)</strong></li>
                  <li className="flex justify-between"><span>Balo & Phụ Kiện:</span> <strong>10% (3.25 tỷ ₫)</strong></li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-700">Hiệu suất vận hành NextPass:</span>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex justify-between"><span>Giao hỏa tốc dưới 2h:</span> <strong className="text-emerald-600">98.6%</strong></li>
                  <li className="flex justify-between"><span>Tỷ lệ hoàn trả hàng:</span> <strong className="text-slate-700">1.2%</strong></li>
                  <li className="flex justify-between"><span>Đánh giá hài lòng khách hàng:</span> <strong className="text-amber-600">4.88 / 5.0 ⭐</strong></li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
