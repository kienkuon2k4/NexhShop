'use client';

import React, { useState } from 'react';
import { X, Store, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ShopRegistrationRequest } from '@/types';

interface BecomeSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

export const BecomeSellerModal: React.FC<BecomeSellerModalProps> = ({
  isOpen,
  onClose,
  onSubmitted
}) => {
  const { currentUser, submitShopRegistration } = useAuth();

  const [formData, setFormData] = useState<ShopRegistrationRequest>({
    shopName: 'Gia Dụng & Bếp Xanh Việt',
    category: 'giadung',
    phone: '0988 555 777',
    taxOrId: '0108998877',
    address: 'Số 45, Đường Lê Văn Lương, Cầu Giấy, Hà Nội',
  });

  const [isSuccessStep, setIsSuccessStep] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitShopRegistration(formData);
    setIsSuccessStep(true);
    if (onSubmitted) {
      onSubmitted();
    }
  };

  const handleFinish = () => {
    setIsSuccessStep(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-xs">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#273142] to-[#1f2735] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Đăng Ký Trở Thành Người Bán (Shop)</h3>
              <p className="text-slate-300 text-[11px]">Nộp hồ sơ mở gian hàng kinh doanh trên NextShop</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccessStep ? (
          /* MÀN HÌNH NỘP HỒ SƠ THÀNH CÔNG -> ĐANG CHỜ DUYỆT */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-black text-slate-900">Nộp Hồ Sơ Thành Công!</h4>
              <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                Hồ sơ mở gian hàng <strong>"{formData.shopName}"</strong> của bạn đã được chuyển đến hàng đợi kiểm duyệt của Ban Quản Trị Sàn.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-[11px] text-amber-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Quy trình bảo mật & kiểm định:</span>
              </div>
              <p>
                1. Hệ thống NextShop kiểm tra mã số thuế/CCCD và địa chỉ kho hàng.<br />
                2. Quản Trị Viên (Admin) phê duyệt hồ sơ trong Cổng Quản Trị Sàn.<br />
                3. Khi được duyệt, tài khoản của bạn sẽ tự động nâng cấp thành <strong>Người Bán (SELLER)</strong> và kích hoạt Kênh Người Bán.
              </p>
              <div className="pt-2 border-t border-amber-200 font-semibold text-amber-950">
                👉 <strong>Mẹo kiểm thử:</strong> Bạn có thể đăng nhập bằng tài khoản Quản Trị Viên (<strong>admin@nextshop.vn</strong>) để phê duyệt hồ sơ này ngay lập tức!
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              Đã hiểu, quay về Sàn
            </button>
          </div>
        ) : (
          /* FORM NHẬP THÔNG TIN MỞ GIAN HÀNG */
          <>
            {/* Benefits bar */}
            <div className="bg-amber-50/80 border-b border-amber-100 p-3 flex items-center justify-around text-amber-900 text-[11px] font-semibold">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Miễn phí mở shop</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Hỗ trợ kho NextPass</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tiếp cận 2M+ khách</span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tài khoản nộp đơn:</label>
                <div className="p-2.5 rounded-xl bg-slate-100 font-medium text-slate-700 text-xs">
                  {currentUser ? `${currentUser.name} (${currentUser.email})` : 'customer@nextshop.vn'}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên gian hàng / Shop Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  placeholder="VD: Gia Dụng & Bếp Xanh Việt, Fashion Sneaker Hub..." 
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ngành hàng chính *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium text-slate-900 bg-white"
                  >
                    <option value="giadung">🍳 Gia Dụng & Bếp</option>
                    <option value="thoitrang">👗 Thời Trang & Sneaker</option>
                    <option value="dientu">📱 Điện Tử & Công Nghệ</option>
                    <option value="phukien">🎒 Balo & Phụ Kiện</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại liên hệ *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0988xxxxxx" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mã số thuế / CCCD chủ gian hàng *</label>
                <input 
                  type="text" 
                  required
                  value={formData.taxOrId}
                  onChange={(e) => setFormData({ ...formData, taxOrId: e.target.value })}
                  placeholder="Nhập MST doanh nghiệp hoặc CCCD..." 
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Địa chỉ kho hàng lấy hàng (Pickup Address) *</label>
                <input 
                  type="text" 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Địa chỉ bưu cục hoặc kho giao dịch..." 
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Gửi Hồ Sơ Xét Duyệt Mở Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  Bằng việc gửi hồ sơ, bạn đồng ý với Tiêu chuẩn kinh doanh & Quy chế vận hành NextShop
                </p>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
