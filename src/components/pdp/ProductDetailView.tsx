'use client';

import React, { useState } from 'react';
import { 
  Star, 
  ZoomIn, 
  Plus, 
  CheckCircle, 
  ThumbsUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { Product } from '@/types';
import { BuyBox } from './BuyBox';
import { FREQUENTLY_BOUGHT_TOGETHER } from '@/data/mockData';
import { formatVND } from '@/utils/format';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  onBackToHome: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onBackToHome
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Gallery hình ảnh sản phẩm chuẩn Shopee
  const imageList = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image || 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'];

  const [activeImage, setActiveImage] = useState<string>(imageList[0]);

  // Cập nhật khi product thay đổi
  React.useEffect(() => {
    setActiveImage(
      product.gallery && product.gallery.length > 0 
        ? product.gallery[0] 
        : (product.image || 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80')
    );
    setSelectedVariantIndex(0);
  }, [product]);

  const selectedPrice = product.variants?.options[selectedVariantIndex]?.price || product.price;

  const comboData = FREQUENTLY_BOUGHT_TOGETHER[0];

  return (
    <div className="space-y-6 text-xs">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-slate-500 flex items-center gap-1.5 flex-wrap">
        <button onClick={onBackToHome} className="hover:text-amber-600 font-medium cursor-pointer">
          Trang chủ NextShop
        </button>
        <span>&rsaquo;</span>
        <span className="hover:text-amber-600 cursor-pointer">{product.categoryName}</span>
        <span>&rsaquo;</span>
        <span className="text-slate-800 font-semibold truncate max-w-sm">{product.title}</span>
      </nav>

      {/* Main PDP Container: 3 Cột (Media | Specifications | The Buy Box) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CỘT 1: Media Gallery (Ảnh chính + Thumbnails góc nhìn như Shopee) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          
          {/* Main Large Image Container */}
          <div className="w-full h-80 md:h-[430px] bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden group">
            {product.originalPrice && (
              <span className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm z-10">
                Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}

            {product.shopeeMall && (
              <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow-sm z-10 flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5" />
                Chính Hãng
              </span>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={activeImage} 
              alt={product.title} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
            />

            <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
              <ZoomIn className="w-3 h-3" /> Rê chuột để xem chi tiết
            </span>
          </div>

          {/* Thumbnails Gallery */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {imageList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition cursor-pointer bg-slate-100 ${
                  activeImage === img ? 'border-amber-500 ring-2 ring-amber-400/30' : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Cam kết của Sàn */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Chính hãng</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Đổi trả 15 ngày</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Giao hỏa tốc 2H</span>
            </div>
          </div>
        </div>

        {/* CỘT 2: Thông tin chi tiết & Bullet points & Bảng thông số (4 cột) */}
        <div className="lg:col-span-4 space-y-3.5">
          <div className="flex items-center gap-2">
            {product.shopeeMall && (
              <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide">
                Chính Hãng
              </span>
            )}
            <span className="text-[#007185] hover:underline font-bold cursor-pointer">
              Thương hiệu: {product.brand}
            </span>
          </div>
          
          <h1 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
            {product.title}
          </h1>

          {/* Ratings & Badges */}
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span className="font-extrabold text-slate-900 mr-1 text-sm">{product.rating}</span>
              <span className="text-[#007185] hover:underline ml-1 font-semibold">
                ({product.reviewsCount} đánh giá)
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-bold">{product.soldCountMonth || '1k+ đã bán'}</span>
          </div>

          {/* Pricing Block */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-baseline gap-2.5">
              {product.originalPrice && (
                <span className="text-xl text-rose-700 font-black">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
              <span className="text-2xl font-black text-rose-700">
                {formatVND(selectedPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatVND(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Biến thể (Variants - Color/Size/Capacity) */}
          {product.variants && (
            <div className="space-y-2 pt-1">
              <div className="text-slate-700">
                {product.variants.name}: <strong className="text-slate-900">
                  {product.variants.options[selectedVariantIndex]?.label}
                </strong>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.options.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition ${
                      selectedVariantIndex === idx
                        ? 'border-2 border-amber-500 bg-amber-50/60 text-slate-950 shadow-xs'
                        : 'border border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                    }`}
                  >
                    {opt.label} - {formatVND(opt.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bullet Points Đặc điểm nổi bật */}
          <div className="border-t border-slate-200 pt-3 space-y-2">
            <h3 className="font-extrabold text-slate-900">Đặc điểm nổi bật của sản phẩm:</h3>
            <ul className="text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed">
              {product.bulletPoints.map((pt, index) => (
                <li key={index}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CỘT 3: THE BUY BOX (3 cột) */}
        <div className="lg:col-span-3">
          <BuyBox 
            product={product} 
            selectedPrice={selectedPrice}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        </div>
      </div>

      {/* THÔNG SỐ KỸ THUẬT & MÔ TẢ CHI TIẾT CHUẨN SHOPEE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cột trái: Bảng thông số chi tiết & Bài viết mô tả */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. BẢNG THÔNG SỐ KỸ THUẬT SẢN PHẨM (CHUẨN SHOPEE SPECIFICATIONS) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <FileText className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-sm text-slate-900">Chi Tiết Sản Phẩm (Specifications)</h2>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex">
                <span className="w-44 text-slate-400 font-medium shrink-0">Danh Mục Sàn</span>
                <span className="text-slate-800 font-semibold">{product.categoryName}</span>
              </div>
              <div className="py-2.5 flex">
                <span className="w-44 text-slate-400 font-medium shrink-0">Thương Hiệu</span>
                <span className="text-amber-700 font-bold">{product.brand}</span>
              </div>
              <div className="py-2.5 flex">
                <span className="w-44 text-slate-400 font-medium shrink-0">Tình Trạng Kho</span>
                <span className="text-emerald-700 font-bold">Còn {product.stockQuantity || 150} sản phẩm sẵn sàng giao</span>
              </div>
              <div className="py-2.5 flex">
                <span className="w-44 text-slate-400 font-medium shrink-0">Gửi Hàng Từ</span>
                <span className="text-slate-800">Kho Trung Tâm NextPass (Hà Nội & TP. Hồ Chí Minh)</span>
              </div>

              {/* Thông số động nếu có */}
              {product.specifications?.map((spec, i) => (
                <div key={i} className="py-2.5 flex">
                  <span className="w-44 text-slate-400 font-medium shrink-0">{spec.label}</span>
                  <span className="text-slate-800 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. BÀI VIẾT MÔ TẢ CHI TIẾT SẢN PHẨM CHUẨN SHOPEE MALL */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-3">
              Mô Tả Sản Phẩm Chi Tiết
            </h2>

            <div className="prose prose-slate text-xs leading-relaxed text-slate-700 whitespace-pre-line">
              {product.fullDescription ? (
                product.fullDescription
              ) : (
                `🔥 THÔNG TIN CHI TIẾT SẢN PHẨM:
- Sản phẩm ${product.title} được phân phối chính hãng 100% từ đối tác ủy quyền của ${product.brand}.
- Cam kết chất lượng đạt chuẩn quốc tế, đầy đủ hóa đơn chứng từ kiểm định chất lượng an toàn.
- Đóng gói cẩn thận 3 lớp bóng khí chống sốc chuyên dụng trước khi bàn giao cho đơn vị vận chuyển.

🛡️ CHÍNH SÁCH BẢO HÀNH & HẬU MÃI TỪ NEXTSHOP CHÍNH HÃNG:
✓ Đổi mới 1:1 trong 15 ngày đầu tiên nếu phát sinh bất kỳ lỗi kỹ thuật nào từ nhà sản xuất.
✓ Bảo hành chính hãng toàn quốc theo đúng tiêu chuẩn của hãng.
✓ Hoàn tiền 200% nếu phát hiện hàng giả, hàng nhái kém chất lượng.

📦 QUY CÁCH ĐÓNG GÓI:
- 1 x Thân sản phẩm chính hãng ${product.brand}.
- 1 x Bộ phụ kiện tiêu chuẩn đi kèm.
- 1 x Sách hướng dẫn sử dụng tiếng Việt / Tiếng Anh.
- 1 x Phiếu bảo hành kèm tem xác thực điện tử.`
              )}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-3">
              Đánh Giá & Nhận Xét Từ Người Mua Đã Trải Nghiệm
            </h3>
            
            <div className="flex items-center gap-6 p-4 rounded-xl bg-amber-50/50 border border-amber-200">
              <div>
                <div className="text-3xl font-black text-amber-600">{product.rating} <span className="text-base font-normal">trên 5</span></div>
                <div className="flex items-center text-amber-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-600 border-l border-amber-200 pl-6">
                <div>Tổng cộng <strong>{product.reviewsCount}</strong> lượt đánh giá có hình ảnh/video</div>
                <div className="text-emerald-700 font-bold mt-1">98% khách hàng khuyến nghị nên mua sản phẩm này</div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center font-bold text-[10px]">T</div>
                    <span className="font-bold text-slate-900">Trần Minh Quân</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                      Đã mua hàng chính hãng
                    </span>
                  </div>
                  <span className="text-slate-400 text-[10px]">Hôm qua, 14:20</span>
                </div>
                <div className="text-amber-500 font-bold">★★★★★</div>
                <p className="text-slate-700">
                  Giao hàng siêu tốc đúng 1 tiếng 45 phút là shipper đã gọi. Hàng bọc cẩn thận 3 lớp bóng khí. Dùng rất ưng ý, chuẩn chính hãng 100%!
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Cột phải: Frequently bought together combo & Top Deals */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Frequently Bought Together (Upsell Combo) */}
          {comboData && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900">
                Thường được mua cùng nhau (Combo tiết kiệm)
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={comboData.complementary[0].image} alt="combo" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 truncate">{comboData.complementary[0].title}</div>
                    <div className="text-rose-700 font-bold mt-0.5">{formatVND(comboData.complementary[0].price)}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={comboData.complementary[1].image} alt="combo" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 truncate">{comboData.complementary[1].title}</div>
                    <div className="text-rose-700 font-bold mt-0.5">{formatVND(comboData.complementary[1].price)}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tiết kiệm {formatVND(comboData.savings)}:</span>
                    <strong className="text-rose-700 text-base">{formatVND(comboData.comboPrice)}</strong>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black cursor-pointer shadow-xs transition"
                  >
                    Mua cả combo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gian hàng chính hãng Badge */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900">{product.brand}</div>
                <div className="text-[10px] text-emerald-600 font-bold">✓ Gian hàng phân phối chính hãng 100%</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block">Đánh Giá</span>
                <strong className="text-slate-800 text-xs">4.9 / 5.0</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Sản Phẩm</span>
                <strong className="text-slate-800 text-xs">180+</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Phản Hồi Chat</span>
                <strong className="text-slate-800 text-xs">99% (Trong 5p)</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
