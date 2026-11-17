'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CardQuadProps {
  onSelectProduct: (productSlug: string) => void;
  onSelectCategory: (cat: string) => void;
}

export const CardQuad: React.FC<CardQuadProps> = ({
  onSelectProduct,
  onSelectCategory
}) => {
  // Timer đếm ngược cho Flash Deal (Đặc trưng Shopee & Amazon)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-2">
      
      {/* CARD 1: GIA DỤNG & NHÀ CỬA */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
        <div>
          <h2 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center justify-between">
            <span>Thiết Bị Gia Dụng & Bếp</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Chính Hãng</span>
          </h2>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div 
              onClick={() => onSelectProduct('noi-chien-khong-dau-philips-6-5l')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80" 
                  alt="Nồi chiên" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Nồi chiên Philips 6.5L</p>
            </div>

            <div 
              onClick={() => onSelectProduct('robot-hut-bui-roborock-s8')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" 
                  alt="Robot hút bụi" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Robot Roborock S8</p>
            </div>

            <div 
              onClick={() => onSelectProduct('noi-com-dien-tu-cuckoo-1-08l')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=400&q=80" 
                  alt="Nồi cơm Cuckoo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Nồi cơm Cuckoo 1.08L</p>
            </div>

            <div 
              onClick={() => onSelectProduct('may-loc-khong-khi-xiaomi-purifier-4')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80" 
                  alt="Máy lọc không khí" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Lọc khí Xiaomi Purifier</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onSelectCategory('giadung')} 
          className="text-xs text-[#007185] hover:underline font-bold mt-4 block text-left cursor-pointer"
        >
          Xem 10+ sản phẩm Gia Dụng &rarr;
        </button>
      </div>

      {/* CARD 2: THỜI TRANG & PHỤ KIỆN */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
        <div>
          <h2 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center justify-between">
            <span>Thời Trang & Sneaker</span>
            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">Xu hướng</span>
          </h2>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div 
              onClick={() => onSelectProduct('nike-air-jordan-1-low')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" 
                  alt="Nike AJ1" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Nike Jordan 1 Low</p>
            </div>

            <div 
              onClick={() => onSelectProduct('ao-polo-nam-coolmate-pima')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80" 
                  alt="Polo Coolmate" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Áo Polo Coolmate</p>
            </div>

            <div 
              onClick={() => onSelectProduct('quan-jean-ong-suong-levents')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80" 
                  alt="Jean Levents" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Jean ống suông Levents</p>
            </div>

            <div 
              onClick={() => onSelectProduct('ao-khoac-gio-the-north-face-goretex')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80" 
                  alt="Áo The North Face" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Gió The North Face</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onSelectCategory('thoitrang')} 
          className="text-xs text-[#007185] hover:underline font-bold mt-4 block text-left cursor-pointer"
        >
          Xem 10+ sản phẩm Thời Trang &rarr;
        </button>
      </div>

      {/* CARD 3: ĐIỆN TỬ & CÔNG NGHỆ */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
        <div>
          <h2 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center justify-between">
            <span>Điện Tử & Thiết Bị Số</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Công nghệ</span>
          </h2>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div 
              onClick={() => onSelectProduct('tai-nghe-sony-wh-1000xm5')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" 
                  alt="Sony WH-1000XM5" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Sony WH-1000XM5</p>
            </div>

            <div 
              onClick={() => onSelectProduct('ban-phim-co-keychron-k2-pro')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80" 
                  alt="Keychron K2 Pro" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Phím cơ Keychron K2</p>
            </div>

            <div 
              onClick={() => onSelectProduct('chuot-logitech-mx-master-3s')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80" 
                  alt="Logitech MX Master" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Chuột MX Master 3S</p>
            </div>

            <div 
              onClick={() => onSelectProduct('cu-sac-nhanh-anker-gan-65w')}
              className="cursor-pointer group"
            >
              <div className="h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80" 
                  alt="Sạc Anker GaN 65W" 
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <p className="mt-1 text-slate-800 font-semibold group-hover:text-amber-600 truncate text-[11px]">Củ sạc Anker GaN 65W</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onSelectCategory('dientu')} 
          className="text-xs text-[#007185] hover:underline font-bold mt-4 block text-left cursor-pointer"
        >
          Xem 10+ sản phẩm Điện Tử &rarr;
        </button>
      </div>

      {/* CARD 4: FLASH SALE GIẢM SỐC CHÍNH HÃNG */}
      <div className="bg-gradient-to-b from-amber-50 to-white p-4 rounded-2xl shadow-xs border border-amber-200 flex flex-col justify-between hover:shadow-md transition">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-amber-950 text-sm flex items-center gap-1">
              ⚡ FLASH SALE CHÍNH HÃNG
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" />
              <span>
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div 
            onClick={() => onSelectProduct('noi-chien-khong-dau-philips-6-5l')}
            className="cursor-pointer group"
          >
            <div className="h-32 bg-white rounded-xl overflow-hidden border border-amber-200 relative mb-2">
              <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded z-10">
                GIẢM 33%
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80" 
                alt="Flash Sale Nồi chiên" 
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-rose-700 font-black text-base">1.890.000 ₫</span>
                <span className="text-xs text-slate-400 line-through">2.990.000 ₫</span>
              </div>
              <p className="font-semibold text-slate-900 group-hover:text-amber-700 line-clamp-1 text-xs">
                Nồi Chiên Không Dầu Điện Tử Philips 6.5L HD9280/90
              </p>
              
              {/* Progress bar Đã bán */}
              <div className="pt-1.5 space-y-1">
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full w-[82%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Đã bán 82%</span>
                  <span className="text-rose-600 font-bold">Sắp hết hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onSelectCategory('flash')}
          className="mt-3 w-full py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black rounded-xl text-xs shadow-xs cursor-pointer transition active:scale-95"
        >
          Săn Deal Chớp Nhoáng Ngay
        </button>
      </div>

    </div>
  );
};
