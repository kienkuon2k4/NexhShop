'use client';

import React from 'react';
import { 
  ShieldAlert, 
  Store, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  UserCheck,
  Building2,
  FileText
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AccessDeniedViewProps {
  type: 'admin_forbidden' | 'seller_pending' | 'seller_required';
  onBackToMarketplace: () => void;
  onOpenLogin: () => void;
  onOpenRegisterSeller: () => void;
}

export const AccessDeniedView: React.FC<AccessDeniedViewProps> = ({
  type,
  onBackToMarketplace,
  onOpenLogin,
  onOpenRegisterSeller
}) => {
  const { currentUser, pendingShops } = useAuth();

  // Tìm đơn đăng ký gần nhất của user hiện tại
  const myPendingShop = pendingShops.find(s => s.userEmail === currentUser?.email);

  if (type === 'admin_forbidden') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-rose-200 overflow-hidden text-center p-8 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-extrabold text-[11px] uppercase tracking-wider">
              Lỗi 403: Không đủ thẩm quyền
            </span>
            <h2 className="text-2xl font-black text-slate-900">Từ Chối Quyền Truy Cập Quản Trị</h2>
            <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
              Cổng Quản Trị Hệ Thống (<strong>NextShop Admin Console</strong>) là khu vực nội bộ được bảo vệ nghiêm ngặt, chỉ dành riêng cho tài khoản Quản Trị Viên sàn.
            </p>
          </div>

          {/* Current Session status */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
            <div className="text-slate-500 font-medium">Tài khoản đang đăng nhập hiện tại:</div>
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>{currentUser?.name || 'Khách vãng lai'} ({currentUser?.email || 'Chưa đăng nhập'})</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                Vai trò: {currentUser?.role || 'GUEST'}
              </span>
            </div>
            <div className="text-[11px] text-rose-600 font-semibold pt-1 border-t border-slate-200">
              ✕ Quyền của bạn không đủ để truy cập tính năng Quản trị sàn.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Đăng Nhập Tài Khoản Quản Trị Viên</span>
            </button>
            <button
              onClick={onBackToMarketplace}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Sàn Mua Sắm</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Trường hợp 2: Người mua đã nộp đơn và đang CHỜ PHÊ DUYỆT
  if (type === 'seller_pending' && myPendingShop) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-amber-200 overflow-hidden text-center p-8 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Clock className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[11px] uppercase tracking-wider">
              Trạng thái hồ sơ: Chờ Phê Duyệt
            </span>
            <h2 className="text-2xl font-black text-slate-900">Hồ Sơ Mở Gian Hàng Đang Được Xét Duyệt</h2>
            <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
              Hệ thống đã ghi nhận hồ sơ đăng ký của bạn. Ban Quản Trị NextShop đang tiến hành thẩm định thông tin mã số thuế và kho lấy hàng.
            </p>
          </div>

          {/* Stepper quy trình */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-left text-xs space-y-3">
            <div className="font-bold text-amber-950 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Thông tin hồ sơ gian hàng đã gửi:</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-slate-500">Tên shop:</span> <strong>{myPendingShop.shopName}</strong></div>
              <div><span className="text-slate-500">Ngành hàng:</span> <strong>{myPendingShop.category}</strong></div>
              <div><span className="text-slate-500">Hotline:</span> <strong>{myPendingShop.phone}</strong></div>
              <div><span className="text-slate-500">MST / CCCD:</span> <strong>{myPendingShop.taxOrId}</strong></div>
              <div className="col-span-2"><span className="text-slate-500">Kho lấy hàng:</span> <strong>{myPendingShop.address}</strong></div>
            </div>

            <button
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Đăng Nhập Tài Khoản Quản Trị</span>
            </button>
            <button
              onClick={onBackToMarketplace}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về Sàn Mua Sắm</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Trường hợp 3: Người mua CHƯA ĐĂNG KÝ GIAN HÀNG
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden text-center p-8 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
          <Store className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-extrabold text-[11px] uppercase tracking-wider">
            Dành cho Người Mua muốn Bán Hàng
          </span>
          <h2 className="text-2xl font-black text-slate-900">Bạn Chưa Có Gian Hàng Trên NextShop</h2>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
            Để truy cập <strong>Kênh Người Bán (Seller Central)</strong> và đăng bán sản phẩm, bạn cần gửi hồ sơ đăng ký mở gian hàng để Ban Quản Trị phê duyệt.
          </p>
        </div>

        {/* Quyền lợi người bán */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Miễn phí mở shop
            </span>
            <p className="text-slate-500 text-[10px]">Không thu phí duy trì gian hàng ban đầu</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
              <Building2 className="w-3.5 h-3.5 text-blue-600" /> Kho NextPass 2H
            </span>
            <p className="text-slate-500 text-[10px]">Giao hàng hỏa tốc trong nội thành</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tiếp cận 2M+ khách
            </span>
            <p className="text-slate-500 text-[10px]">Tối ưu hiển thị Buy Box thuật toán cao</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={onOpenRegisterSeller}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Store className="w-4 h-4" />
            <span>Đăng Ký Mở Gian Hàng Ngay</span>
          </button>
          
          <button
            onClick={onOpenLogin}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Đăng Nhập Bằng Tài Khoản Khác</span>
          </button>
        </div>
      </div>
    </div>
  );
};
