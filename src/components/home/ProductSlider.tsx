'use client';

import React, { useRef } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Utensils, 
  Footprints, 
  Headphones, 
  Briefcase,
  BadgeCheck,
  Sparkles
} from 'lucide-react';
import { Product } from '@/types';
import { formatVND } from '@/utils/format';

interface ProductSliderProps {
  products: Product[];
  onSelectProduct: (productSlug: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getProductIcon = (icon: string) => {
    switch (icon) {
      case 'kitchen':
        return <Utensils className="w-12 h-12 text-amber-700" />;
      case 'shoe':
        return <Footprints className="w-12 h-12 text-rose-600" />;
      case 'headphones':
        return <Headphones className="w-12 h-12 text-slate-800" />;
      case 'briefcase':
        return <Briefcase className="w-12 h-12 text-amber-700" />;
      default:
        return <Utensils className="w-12 h-12 text-slate-700" />;
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      
      {/* Slider Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-black text-slate-900">
            Sản Phẩm Nổi Bật Chính Hãng Được Yêu Thích
          </h2>
          <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5">
            100% hình ảnh thực tế, thông số kỹ thuật và cam kết chính hãng 100%
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button 
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Slider Items Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 custom-scroll text-xs"
      >
        {products.map((item) => (
          <div 
            key={item.id}
            className="min-w-[210px] max-w-[210px] border border-slate-200/80 p-3 rounded-2xl hover:shadow-lg transition-all duration-200 flex flex-col justify-between bg-white group"
          >
            <div 
              onClick={() => onSelectProduct(item.slug)}
              className="cursor-pointer"
            >
              {/* Product Image */}
              <div className="h-36 bg-slate-50 rounded-xl overflow-hidden mb-2.5 border border-slate-100 relative flex items-center justify-center">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  getProductIcon(item.icon)
                )}

                {item.shopeeMall && (
                  <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                    <BadgeCheck className="w-2.5 h-2.5" />
                    Chính Hãng
                  </span>
                )}

                {item.originalPrice && (
                  <span className="absolute top-1.5 right-1.5 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                    -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                  </span>
                )}

                {item.isSponsored && (
                  <span className="absolute bottom-1.5 left-1.5 bg-amber-400 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 border border-amber-300">
                    <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
                    Tài Trợ
                  </span>
                )}
              </div>

              {/* Brand */}
              <div className="text-[10px] text-slate-400 font-bold uppercase truncate">
                {item.brand}
              </div>

              {/* Title */}
              <div className="font-semibold text-slate-900 line-clamp-2 mt-1 h-9 leading-snug" title={item.title}>
                {item.title}
              </div>
              
              {/* Rating & Sold count */}
              <div className="flex items-center text-amber-500 text-[11px] my-1.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                <span className="font-bold text-slate-800 mr-1">{item.rating}</span>
                <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                <span className="text-slate-300 mx-1">|</span>
                <span className="text-slate-500 font-medium text-[10px]">{item.soldCountMonth}</span>
              </div>

              {/* Price Block */}
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

            {/* Action button */}
            <button 
              onClick={() => onAddToCart(item)}
              className="mt-3 w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold text-xs transition shadow-xs cursor-pointer active:scale-95"
            >
              Thêm Vào Giỏ
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
