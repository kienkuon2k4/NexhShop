'use client';

import React, { useState } from 'react';
import { 
  Bolt, 
  MapPin, 
  Search, 
  Camera, 
  User as UserIcon, 
  ShoppingBag, 
  Package, 
  ChevronDown, 
  Menu,
  Utensils,
  Footprints,
  Headphones,
  Briefcase,
  Crown,
  Store,
  ShieldAlert,
  LogOut,
  LogIn,
  Settings
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatVND } from '@/utils/format';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: string) => void;
  onSearch: (query: string) => void;
  onGoHome: () => void;
  onNavigate: (view: 'home' | 'seller' | 'admin' | 'seller-register' | 'login' | 'buyer', tab?: 'orders' | 'addresses' | 'profile' | 'settings') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onSelectCategory,
  onSearch,
  onGoHome,
  onNavigate
}) => {
  const { currentUser, logout, addresses, buyerOrders } = useAuth();
  const [searchInput, setSearchInput] = useState('Nồi chiên không dầu điện tử Philips 6.5L');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleSellerPortalClick = () => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }
    if (currentUser.role === 'SELLER') {
      onNavigate('seller');
    } else {
      onNavigate('seller-register');
    }
  };

  // User Dropdown Menu Content Component
  const renderUserDropdownMenu = () => (
    <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 text-xs">
      {currentUser ? (
        <div className="space-y-2">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-extrabold text-slate-900 text-sm">{currentUser.name}</div>
            <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
            {currentUser.role !== 'CUSTOMER' && (
              <div className="mt-1.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currentUser.role === 'ADMIN' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {currentUser.role === 'ADMIN' && 'Quyền: Quản Trị Sàn'}
                  {currentUser.role === 'SELLER' && 'Quyền: Shop Bán Hàng'}
                </span>
              </div>
            )}
          </div>

          {/* Lối tắt quản lý tài khoản & đơn hàng */}
          <div className="border-t border-slate-100 pt-2 space-y-1">
            <button 
              onClick={() => { onNavigate('buyer', 'orders'); setShowUserDropdown(false); }}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition"
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-500" />
                <span>Đơn mua của tôi</span>
              </span>
              <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                {buyerOrders.length} đơn
              </span>
            </button>

            <button 
              onClick={() => { onNavigate('buyer', 'settings'); setShowUserDropdown(false); }}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition"
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-600" />
                <span>Cài đặt tài khoản</span>
              </span>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {addresses.length} địa chỉ
              </span>
            </button>
          </div>

          {currentUser.role === 'ADMIN' && (
            <button 
              onClick={() => { onNavigate('admin'); setShowUserDropdown(false); }}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer transition"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Vào Cổng Quản Trị Sàn</span>
            </button>
          )}

          {currentUser.role === 'SELLER' && (
            <button 
              onClick={() => { onNavigate('seller'); setShowUserDropdown(false); }}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-amber-800 hover:bg-amber-50 flex items-center gap-2 cursor-pointer transition"
            >
              <Store className="w-4 h-4" />
              <span>Vào Kênh Người Bán</span>
            </button>
          )}

          {currentUser.role === 'CUSTOMER' && (
            <button 
              onClick={() => { onNavigate('seller-register'); setShowUserDropdown(false); }}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition"
            >
              <Store className="w-4 h-4 text-amber-500" />
              <span>Đăng ký mở Shop bán hàng</span>
            </button>
          )}

          <div className="border-t border-slate-100 pt-2">
            <button 
              onClick={() => { logout(); setShowUserDropdown(false); }}
              className="w-full text-center py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold flex items-center justify-center gap-1.5 cursor-pointer transition text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất tài khoản</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2 space-y-2">
          <p className="text-slate-500 text-[11px]">Đăng nhập để nhận ưu đãi cá nhân hóa và quản lý gian hàng</p>
          <button 
            onClick={() => { onNavigate('login'); setShowUserDropdown(false); }}
            className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập ngay</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 shadow-md w-full max-w-full">
      
      {/* TẦNG TRÊN CÙNG: TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1f2735] text-slate-300 text-[11px] px-3 sm:px-6 py-1.5 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
          <button 
            onClick={handleSellerPortalClick}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer shrink-0"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Kênh Người Bán</span>
          </button>

          <span className="hidden sm:inline text-slate-600">|</span>

          {currentUser?.role === 'ADMIN' && (
            <button 
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition cursor-pointer shrink-0"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Cổng Quản Trị Sàn</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-slate-400 shrink-0">
          <span className="hidden md:inline">Hotline: <strong className="text-white">1900 8888</strong></span>
          <span className="text-amber-400 font-medium text-[10px] sm:text-xs">Cam kết 100% chính hãng</span>
        </div>
      </div>

      {/* TẦNG 1: MAIN TOP NAVBAR (Responsive: 2 tầng trên mobile, 1 tầng trên PC) */}
      <div className="bg-[#273142] text-white px-3 sm:px-6 py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 text-xs">
        
        {/* ROW 1 TRÊN MOBILE: LOGO (TRÁI) & USER + CART (PHẢI) */}
        <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
          
          {/* Logo nextshop.vn */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button onClick={onGoHome} className="flex items-center gap-2 group cursor-pointer text-left">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-base sm:text-lg shadow-sm group-hover:scale-105 transition">
                <Bolt className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950 text-slate-950" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                next<span className="text-amber-400">shop</span>
                <span className="text-[8px] sm:text-[9px] ml-1 px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold tracking-widest uppercase border border-white/10">vn</span>
              </span>
            </button>

            {/* Location Capsule */}
            <div 
              onClick={() => onNavigate('buyer', 'addresses')}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full header-chip cursor-pointer transition hover:border-amber-400/50"
              title="Nhấn để xem & quản lý sổ địa chỉ giao hàng"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 text-[11px]">
                Giao: <strong className="text-white">{addresses.find(a => a.isDefault)?.district || addresses[0]?.district || 'Hà Nội'} (2h)</strong>
              </span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </div>
          </div>

          {/* ACTION GROUP TRÊN MOBILE (chỉ hiện khi sm:hidden) */}
          <div className="flex items-center gap-2 sm:hidden shrink-0">
            {/* User Dropdown Button Mobile */}
            <div className="relative">
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="w-8 h-8 rounded-xl bg-slate-700/80 flex items-center justify-center text-amber-400 cursor-pointer active:scale-95"
                title="Tài khoản"
              >
                <UserIcon className="w-4 h-4" />
              </button>
              {showUserDropdown && renderUserDropdownMenu()}
            </div>

            {/* Cart Button Mobile */}
            <button 
              onClick={onOpenCart} 
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl cursor-pointer shadow-sm active:scale-95 font-black text-xs"
            >
              <div className="relative flex items-center">
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span className="absolute -top-2 -right-2 bg-slate-950 text-amber-400 font-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center border border-amber-400">
                  {cartCount}
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* OMNISEARCH BAR: Rộng 100% trên Mobile, flex-1 trên Desktop */}
        <form onSubmit={handleSearchSubmit} className="w-full sm:flex-1 sm:max-w-2xl relative min-w-0">
          <div className="flex items-center h-10 md:h-11 rounded-2xl bg-white shadow-sm border border-transparent focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30 overflow-hidden transition px-2">
            
            <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2.5 py-1.5 rounded-xl cursor-pointer transition shrink-0 hidden md:flex font-medium">
              <span>Tất cả</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, thương hiệu..." 
              className="flex-1 h-full px-2.5 text-xs sm:text-sm text-slate-900 outline-none placeholder:text-slate-400 bg-transparent font-medium min-w-0"
            />

            <button type="button" className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition shrink-0 hidden lg:flex">
              <Camera className="w-4 h-4" />
            </button>

            <button 
              type="submit" 
              className="ml-1 h-7 sm:h-8 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shrink-0 shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden sm:inline">Tìm</span>
            </button>
          </div>
        </form>

        {/* ACTION GROUP TRÊN DESKTOP (ẩn trên mobile, hiện từ sm trở lên) */}
        <div className="hidden sm:flex items-center gap-2.5 md:gap-3 shrink-0">
          
          <button 
            onClick={() => onNavigate('buyer', 'orders')}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl header-chip text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
            title="Đơn mua & Sổ địa chỉ của bạn"
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span>Đơn Hàng</span>
            {buyerOrders.length > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 font-black rounded-full text-[10px]">
                {buyerOrders.length}
              </span>
            )}
          </button>

          {/* MENU TÀI KHOẢN TRÊN DESKTOP */}
          <div className="relative">
            <div 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-xl header-chip cursor-pointer transition"
            >
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-amber-400 font-bold text-[11px]">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <div className="text-left hidden lg:block leading-tight">
                <div className="text-[10px] text-slate-400">
                  {currentUser ? (currentUser.role === 'ADMIN' ? 'Quản trị viên' : (currentUser.role === 'SELLER' ? 'Người bán' : 'Tài khoản')) : 'Tài khoản'}
                </div>
                <div className="font-bold text-white text-xs flex items-center gap-1">
                  {currentUser ? currentUser.name : 'Đăng nhập'} 
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                </div>
              </div>
            </div>

            {showUserDropdown && renderUserDropdownMenu()}
          </div>

          {/* GIỎ HÀNG DẠNG CAPSULE DESKTOP */}
          <button 
            onClick={onOpenCart} 
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-xl cursor-pointer transition shadow-md shadow-amber-500/20 active:scale-95"
          >
            <div className="relative flex items-center">
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span className="absolute -top-2.5 -right-2.5 bg-slate-950 text-amber-400 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-amber-400">
                {cartCount}
              </span>
            </div>
            <span className="text-xs font-black hidden sm:inline">
              {formatVND(cartTotal)}
            </span>
          </button>
        </div>

      </div>

      {/* TẦNG 2: SUBNAV DẢI CHIP DANH MỤC */}
      <div className="bg-[#1f2735] text-slate-300 px-3 sm:px-6 py-2 flex items-center gap-2 text-xs overflow-x-auto whitespace-nowrap border-t border-slate-700/60 custom-scroll max-w-full">
        
        <button 
          onClick={() => onSelectCategory('all')} 
          className="flex items-center gap-1.5 font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white transition mr-1 cursor-pointer shrink-0"
        >
          <Menu className="w-3.5 h-3.5 text-amber-400" />
          <span>Tất cả</span>
        </button>

        <button 
          onClick={() => onSelectCategory('flash')} 
          className="px-3 py-1 rounded-lg hover:bg-white/10 text-amber-300 font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Bolt className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Flash Deals</span>
        </button>

        <button 
          onClick={() => onSelectCategory('giadung')} 
          className="px-3 py-1 rounded-lg hover:bg-white/10 text-slate-200 transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Utensils className="w-3.5 h-3.5 text-amber-500" />
          <span>Gia Dụng & Bếp</span>
        </button>

        <button 
          onClick={() => onSelectCategory('thoitrang')} 
          className="px-3 py-1 rounded-lg hover:bg-white/10 text-slate-200 transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Footprints className="w-3.5 h-3.5 text-rose-400" />
          <span>Thời Trang</span>
        </button>

        <button 
          onClick={() => onSelectCategory('dientu')} 
          className="px-3 py-1 rounded-lg hover:bg-white/10 text-slate-200 transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Headphones className="w-3.5 h-3.5 text-cyan-400" />
          <span>Điện Tử</span>
        </button>

        <button 
          onClick={() => onSelectCategory('phukien')} 
          className="px-3 py-1 rounded-lg hover:bg-white/10 text-slate-200 transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Briefcase className="w-3.5 h-3.5 text-amber-600" />
          <span>Balo & Phụ Kiện</span>
        </button>

        <div className="ml-auto text-amber-400 font-bold hidden lg:flex items-center gap-2 pl-4 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px]">NextPass Member</span>
        </div>

      </div>

    </header>
  );
};
