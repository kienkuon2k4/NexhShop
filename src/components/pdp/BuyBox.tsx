'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  ShoppingCart, 
  Zap, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Product } from '@/types';
import { formatVND } from '@/utils/format';

interface BuyBoxProps {
  product: Product;
  selectedPrice: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const BuyBox: React.FC<BuyBoxProps> = ({
  product,
  selectedPrice,
  onAddToCart,
  onBuyNow
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border border-slate-300 rounded-xl p-4 bg-white shadow-sm space-y-3 sticky top-28 text-xs">
      
      {/* Price tag */}
      <div className="text-2xl font-black text-rose-700">
        {formatVND(selectedPrice)}
      </div>

      {/* Delivery Promise */}
      <div className="text-slate-700 leading-relaxed">
        Giao hàng <span className="font-bold text-slate-900">Hỏa tốc Hôm Nay</span> nếu đặt trong vòng <span className="text-emerald-700 font-bold">1 giờ 45 phút</span>.
      </div>

      <div className="text-[#007185] hover:underline cursor-pointer flex items-center gap-1 font-medium">
        <MapPin className="w-3.5 h-3.5 text-amber-500" />
        <span>Giao đến: Hà Nội 100000</span>
      </div>

      {/* Stock Status */}
      <div className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
        <CheckCircle2 className="w-4 h-4" />
        <span>{product.inStock ? 'Còn hàng tại kho NextShop' : 'Tạm hết hàng'}</span>
      </div>

      {/* Quantity Dropdown */}
      <div className="flex items-center gap-2 pt-1">
        <label htmlFor="pdp-qty" className="text-slate-600 font-medium">Số lượng:</label>
        <select 
          id="pdp-qty" 
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-slate-300 rounded-md p-1 bg-slate-50 outline-none text-xs font-bold"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button 
          onClick={() => onAddToCart(product, quantity)}
          disabled={!product.inStock}
          className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Thêm vào giỏ hàng</span>
        </button>

        <button 
          onClick={() => onBuyNow(product, quantity)}
          disabled={!product.inStock}
          className="w-full py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Zap className="w-4 h-4 fill-white text-white" />
          <span>Mua ngay (1-Click)</span>
        </button>
      </div>

      {/* Seller & Trust Guarantees */}
      <div className="text-slate-500 pt-3 border-t border-slate-100 space-y-1.5">
        <div className="flex justify-between">
          <span>Giao từ</span>
          <span className="text-slate-900 font-semibold">Kho Tổng NextShop</span>
        </div>
        <div className="flex justify-between">
          <span>Bán bởi</span>
          <span className="text-[#007185] hover:underline font-semibold">{product.brand}</span>
        </div>
        <div className="flex justify-between">
          <span>Bảo hành</span>
          <span className="text-slate-900 font-semibold">Chính hãng 2 năm</span>
        </div>
        <div className="flex justify-between">
          <span>Đổi trả</span>
          <span className="text-[#007185] hover:underline">30 ngày miễn phí</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-slate-500 text-[11px]">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Giao dịch an toàn & bảo mật SSL</span>
      </div>
    </div>
  );
};
