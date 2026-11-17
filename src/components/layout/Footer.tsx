'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Lock, 
  ArrowUp, 
  Bolt, 
  CheckCircle2 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto bg-[#1a222e] text-slate-300 text-xs">
      
      {/* TẦNG 1: 4 CAM KẾT VÀNG (TRUST BAR) */}
      <div className="border-b border-slate-800 bg-[#222b3a] py-6 px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Giao Hàng Hỏa Tốc 2H</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Nhận hàng trong 120 phút qua gói NextPass.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Hàng Chính Hãng</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Bồi thường 200% nếu phát hiện hàng giả.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Đổi Mới Tận Nhà 30 Ngày</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Lỗi NSX là đổi mới ngay, nhân viên qua tận nơi.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Thanh Toán An Toàn & 0%</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Mã hóa chuẩn SSL 256-bit, trả góp linh hoạt.</p>
            </div>
          </div>
        </div>
      </div>

      {/* TẦNG 2: BACK TO TOP NÚT BẤM HIỆN ĐẠI */}
      <button 
        onClick={scrollToTop} 
        className="w-full bg-[#273142] hover:bg-slate-700 text-center py-2.5 font-bold text-slate-200 transition border-b border-slate-700/60 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <ArrowUp className="w-4 h-4 text-amber-400" />
        <span>Quay lại đầu trang NextShop</span>
      </button>

      {/* TẦNG 3: NỘI DUNG LIÊN KẾT 4 CỘT & ĐĂNG KÝ BẢN TIN FLASH DEAL */}
      <div className="max-w-[1440px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Cột 1: Về NextShop & Newsletter */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-sm">
              <Bolt className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="text-xl font-black text-white">next<span className="text-amber-400">shop</span></span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Đại siêu thị mua sắm trực tuyến đa ngành hàng: Gia dụng thông minh, Thời trang xu hướng và Thiết bị điện tử chính hãng. Giao hàng hỏa tốc trong 2 giờ.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
            <span className="font-bold text-white text-xs block">Đăng ký nhận mã giảm giá đến 100K:</span>
            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 p-1 focus-within:border-amber-400">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Nhập email của bạn..." 
                className="bg-transparent px-3 py-1.5 text-xs text-white outline-none flex-1 placeholder:text-slate-500" 
              />
              <button type="submit" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs transition">
                Đăng Ký
              </button>
            </div>
            {subscribed && (
              <p className="text-emerald-400 text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Đã đăng ký thành công! Mã giảm giá đã gửi tới hộp thư của bạn.
              </p>
            )}
          </form>
        </div>

        {/* Cột 2: Hỗ Trợ Khách Hàng */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-bold text-white text-sm mb-3 border-l-2 border-amber-400 pl-2.5">Hỗ Trợ Khách Hàng</h4>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Trung tâm trợ giúp 24/7</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Hướng dẫn đặt hàng & thanh toán</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Chính sách giao hàng NextPass</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Quy trình đổi trả & bảo hành</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Tra cứu hành trình đơn hàng</a></p>
          <div className="pt-2 text-slate-400">
            <div>Hotline CSKH: <strong className="text-amber-400">1900 8888</strong> (8h - 21h)</div>
          </div>
        </div>

        {/* Cột 3: Hợp Tác Bán Hàng */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-bold text-white text-sm mb-3 border-l-2 border-amber-400 pl-2.5">Hợp Tác Bán Hàng</h4>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Kênh Người Bán (Seller)</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Kho vận NextFBA</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Tiếp thị liên kết (Affiliate)</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Quy chế hoạt động sàn</a></p>
          <p><a href="#" className="text-slate-400 hover:text-white transition">Cơ hội nghề nghiệp</a></p>
        </div>

        {/* Cột 4: Phương Thức Thanh Toán & Chứng Nhận */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <h4 className="font-bold text-white text-sm mb-3 border-l-2 border-amber-400 pl-2.5">Phương Thức Thanh Toán</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">VISA</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">MasterCard</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">MoMo</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">VNPay</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">COD</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs mb-2">Chứng Nhận An Toàn & Uy Tín</h4>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã Thông Báo Bộ Công Thương</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[11px] flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>SSL 256-bit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TẦNG 4: BẢN QUYỀN */}
      <div className="bg-[#121820] py-5 border-t border-slate-800/80 text-center text-slate-400 text-[11px] space-y-1">
        <div>&copy; 2026 NextShop E-Commerce Platform. Đã đăng ký bản quyền.</div>
        <div className="text-slate-400">Địa chỉ: Tòa nhà NextShop Tower, Khu Công Nghệ Cao, Hà Nội | Hotline: 1900 8888 | Email: hotro@nextshop.vn</div>
      </div>
    </footer>
  );
};
