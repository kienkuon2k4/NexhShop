'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  BadgeCheck, 
  ShoppingCart, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product } from '@/types';
import { formatVND } from '@/utils/format';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectProduct: (productSlug: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart
}) => {
  const ITEMS_PER_PAGE = 10; // 10 sản phẩm = đúng 2 hàng trên màn hình Desktop (grid 5 cột)
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm' },
    { id: 'giadung', label: '🍳 Gia Dụng & Bếp' },
    { id: 'thoitrang', label: '👗 Thời Trang & Sneaker' },
    { id: 'dientu', label: '📱 Điện Tử & Thiết Bị Số' },
    { id: 'phukien', label: '🎒 Balo & Phụ Kiện' }
  ];

  // Reset về trang 1 khi đổi danh mục
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, products.length]);

  // Ưu tiên sản phẩm được tài trợ (Sponsored Ads) hiển thị lên hàng đầu
  const sortedProducts = [...products].sort((a, b) => {
    if (a.isSponsored && !b.isSponsored) return -1;
    if (!a.isSponsored && b.isSponsored) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length);
  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={containerRef} className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 sm:space-y-5 text-xs scroll-mt-24">
      
      {/* Category Pills Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 sm:pb-4">
        <div>
          <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
            <span>Danh mục sản phẩm chính hãng</span>
          </h2>
          <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5">
            Đầy đủ hình ảnh thực tế chất lượng cao, thông số kỹ thuật chi tiết và bảo hành chính hãng
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full custom-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid 5 Columns on Large Screens (2 hàng x 5 cột = 10 sản phẩm cực kỳ gọn gàng) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 min-h-[400px]">
        {visibleProducts.map((item) => (
          <div 
            key={item.id}
            className="border border-slate-200/80 rounded-2xl p-2 sm:p-2.5 hover:shadow-xl transition-all duration-200 flex flex-col justify-between bg-white group hover:border-amber-400/80"
          >
            <div 
              onClick={() => onSelectProduct(item.slug)}
              className="cursor-pointer"
            >
              {/* Product Image Container */}
              <div className="h-32 sm:h-40 bg-slate-50 rounded-xl overflow-hidden mb-2 border border-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80'} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {item.shopeeMall && (
                  <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                    <BadgeCheck className="w-2.5 h-2.5" />
                    Chính Hãng
                  </span>
                )}

                {item.originalPrice && (
                  <span className="absolute top-1.5 right-1.5 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                    -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                  </span>
                )}

                {item.isSponsored && (
                  <span className="absolute bottom-1.5 left-1.5 bg-amber-400/95 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 border border-amber-300">
                    <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
                    Tài Trợ
                  </span>
                )}
              </div>

              {/* Brand label */}
              <span className="text-[10px] text-slate-400 font-medium block truncate">
                {item.brand}
              </span>

              {/* Title */}
              <h3 className="font-semibold text-slate-900 line-clamp-2 mt-1 h-9 leading-snug" title={item.title}>
                {item.title}
              </h3>
              
              {/* Rating & Sold count */}
              <div className="flex items-center text-amber-500 text-[11px] my-1.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1 shrink-0" />
                <span className="font-bold text-slate-800 mr-1">{item.rating}</span>
                <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                <span className="text-slate-300 mx-1">|</span>
                <span className="text-slate-500 font-medium text-[10px] truncate">{item.soldCountMonth}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-rose-700 font-black text-sm">{formatVND(item.price)}</span>
                {item.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through">{formatVND(item.originalPrice)}</span>
                )}
              </div>
              
              <div className="text-[10px] text-emerald-600 font-semibold truncate mt-1">
                {item.deliveryTime}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2.5 mt-1 border-t border-slate-100 flex items-center gap-1.5">
              <button 
                onClick={() => onAddToCart(item)}
                className="flex-1 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold text-[11px] transition shadow-xs cursor-pointer flex items-center justify-center gap-1 active:scale-95"
              >
                <ShoppingCart className="w-3 h-3" />
                <span>Thêm Giỏ</span>
              </button>
              <button
                onClick={() => onSelectProduct(item.slug)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition"
                title="Xem chi tiết"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* THANH ĐIỀU HƯỚNG PHÂN TRANG (PAGINATION BAR) */}
      {totalPages > 1 && (
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Thông tin số lượng đang xem */}
          <div className="text-slate-500 text-[11px] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Đang xem sản phẩm <strong className="text-slate-800">{startIndex + 1}</strong> – <strong className="text-slate-800">{endIndex}</strong> (Trang {currentPage} / {totalPages})
            </span>
          </div>

          {/* Các nút bấm chuyển trang */}
          <div className="flex items-center gap-1.5">
            {/* Nút lùi trang */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition font-bold flex items-center gap-1 text-slate-700 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang trước</span>
            </button>

            {/* Danh sách các số trang */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-xl font-black text-xs transition cursor-pointer flex items-center justify-center shadow-2xs ${
                  currentPage === pageNum
                    ? 'bg-amber-400 text-slate-950 shadow-xs scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Nút tiến trang */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition font-bold flex items-center gap-1 text-slate-700 cursor-pointer shadow-2xs"
            >
              <span className="hidden sm:inline">Trang sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
