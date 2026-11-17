'use client';

import React from 'react';
import { ShieldCheck, Utensils, Footprints, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onExploreDeals: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreDeals,
  onSelectCategory
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white p-4 sm:p-6 md:p-10 flex flex-col md:flex-row items-center justify-between border border-slate-700/50">
      
      {/* Cột trái: Văn bản & CTA */}
      <div className="max-w-xl space-y-3 z-10 w-full">
        <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 text-xs rounded uppercase tracking-wider inline-block">
          Đại Siêu Thị Mua Sắm NextShop
        </span>
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Vạn Món Đủ Đầy Cho Mọi Nhu Cầu.
        </h1>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
          Khám phá thiết bị gia dụng bếp thông minh, thời trang phong cách và đồ điện tử công nghệ chính hãng với ưu đãi trả góp 0% và giao hàng hỏa tốc trong 2 giờ.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button 
            onClick={onExploreDeals} 
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 sm:px-6 py-2.5 rounded-xl text-xs shadow transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Xem Tất Cả Deal Hot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs text-amber-300 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Đổi mới 30 ngày tận nhà</span>
          </span>
        </div>
      </div>

      {/* Cột phải: 2 Widget Xem Nhanh Ngành Hàng */}
      <div className="mt-5 md:mt-0 flex gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto justify-center md:justify-end">
        <div 
          onClick={() => onSelectCategory('giadung')}
          className="flex-1 sm:flex-none w-auto sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/15 transition group"
        >
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-amber-400/20 flex items-center justify-center mb-1 group-hover:scale-110 transition">
            <Utensils className="w-5 sm:w-6 h-5 sm:h-6 text-amber-400" />
          </div>
          <span className="text-xs font-bold text-white">Gia Dụng Bếp</span>
          <span className="text-[10px] sm:text-[11px] text-amber-300 font-semibold">Giảm đến 40%</span>
        </div>

        <div 
          onClick={() => onSelectCategory('thoitrang')}
          className="flex-1 sm:flex-none w-auto sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/15 transition group"
        >
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-rose-400/20 flex items-center justify-center mb-1 group-hover:scale-110 transition">
            <Footprints className="w-5 sm:w-6 h-5 sm:h-6 text-rose-400" />
          </div>
          <span className="text-xs font-bold text-white">Sneaker & Style</span>
          <span className="text-[10px] sm:text-[11px] text-amber-300 font-semibold">Xu hướng mới</span>
        </div>
      </div>
    </div>
  );
};
