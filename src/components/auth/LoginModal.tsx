'use client';

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  User as UserIcon,
  ShieldAlert,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useAuth, INITIAL_USERS } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRoleNotice?: {
    requiredRole: UserRole;
    message: string;
  };
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  targetRoleNotice
}) => {
  const { login } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailInput.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    if (!passwordInput || passwordInput.length < 4) {
      setErrorMsg('Mật khẩu tối thiểu 4 ký tự.');
      return;
    }

    const email = emailInput.trim().toLowerCase();

    // Kiểm tra mật khẩu tài khoản
    const expectedPassword = INITIAL_USERS[email]?.password || '123456';
    if (!isRegisterMode && passwordInput !== expectedPassword) {
      setErrorMsg('Mật khẩu không chính xác! Vui lòng kiểm tra lại.');
      return;
    }

    // 1. Trường hợp Đăng ký tài khoản người mua mới
    if (isRegisterMode) {
      const name = nameInput.trim() || email.split('@')[0];
      login(email, 'CUSTOMER', passwordInput);
      setSuccessNotice(`Đăng ký thành công tài khoản "${name}"! Quyền tài khoản: Người Mua Hàng.`);
      setTimeout(() => {
        setSuccessNotice(null);
        onClose();
      }, 1000);
      return;
    }

    // 2. Trường hợp Đăng nhập: Phân quyền tự động theo thông tin tài khoản
    let roleAssigned: UserRole = 'CUSTOMER';
    if (INITIAL_USERS[email]) {
      roleAssigned = INITIAL_USERS[email].role;
      login(email, undefined, passwordInput);
    } else {
      // Tài khoản người dùng tự do đăng nhập
      login(email, 'CUSTOMER', passwordInput);
    }

    const roleLabels: Record<UserRole, string> = {
      ADMIN: '🛡️ Quản Trị Viên Toàn Sàn (Super Admin)',
      SELLER: '🏪 Chủ Gian Hàng (Seller Central)',
      CUSTOMER: '👤 Khách Mua Hàng (Customer)'
    };

    setSuccessNotice(`Đăng nhập thành công! Phân quyền tài khoản: ${roleLabels[roleAssigned]}`);
    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-xs">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#273142] to-[#19202c] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                {isRegisterMode ? 'Đăng Ký Tài Khoản Mới' : 'Đăng Nhập Hệ Thống'}
              </h3>
              <p className="text-slate-300 text-[11px]">
                {isRegisterMode 
                  ? 'Tạo tài khoản mua sắm và bán hàng trên NextShop' 
                  : 'Phân quyền tự động theo thông tin tài khoản của bạn'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Thông báo nếu đang bị chặn quyền truy cập */}
        {targetRoleNotice && (
          <div className="bg-amber-50 border-b border-amber-200 p-3.5 flex items-start gap-2.5 text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="font-bold block text-amber-950">
                Khu vực yêu cầu quyền: {targetRoleNotice.requiredRole === 'ADMIN' ? 'Quản Trị Viên (ADMIN)' : 'Người Bán (SELLER)'}
              </strong>
              {targetRoleNotice.message}
            </div>
          </div>
        )}

        {/* Thông báo thành công */}
        {successNotice && (
          <div className="p-3.5 bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Form Đăng Nhập / Đăng Ký Chính Thức */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[11px] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isRegisterMode && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Họ và tên của bạn *</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text" 
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none font-medium text-slate-900 bg-slate-50 focus:bg-white transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Địa chỉ Email đăng nhập *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setErrorMsg(''); }}
                placeholder="Nhập email của bạn..." 
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none font-medium text-slate-900 bg-slate-50 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Mật khẩu *</label>
              {!isRegisterMode && (
                <button 
                  type="button" 
                  onClick={() => alert('Vui lòng liên hệ Quản Trị Viên qua Hotline 1900 8888 để được cấp lại mật khẩu.')}
                  className="text-[11px] text-amber-600 hover:underline font-semibold cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              )}
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setErrorMsg(''); }}
                placeholder={isRegisterMode ? "Nhập mật khẩu mới..." : "Nhập mật khẩu của bạn..."} 
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none font-medium text-slate-900 bg-slate-50 focus:bg-white transition"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isRegisterMode && (
            <div className="flex items-center gap-2 pt-0.5">
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded border-slate-300 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-slate-600 text-[11px] font-medium cursor-pointer">
                Ghi nhớ phiên đăng nhập trên thiết bị này
              </label>
            </div>
          )}

          {/* Nút Đăng Nhập / Đăng Ký */}
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 text-xs"
          >
            <span>{isRegisterMode ? 'Tạo Tài Khoản Mới' : 'Đăng Nhập'}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Chuyển đổi giữa Đăng Nhập và Đăng Ký */}
          <div className="pt-2 text-center text-slate-500 text-[11px]">
            {isRegisterMode ? (
              <span>
                Đã có tài khoản?{' '}
                <button 
                  type="button" 
                  onClick={() => { setIsRegisterMode(false); setErrorMsg(''); }}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Đăng nhập ngay
                </button>
              </span>
            ) : (
              <span>
                Chưa có tài khoản trên NextShop?{' '}
                <button 
                  type="button" 
                  onClick={() => { setIsRegisterMode(true); setErrorMsg(''); }}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Đăng ký tài khoản
                </button>
              </span>
            )}
          </div>

        </form>

        {/* Footer Modal */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Bảo mật phiên đăng nhập 256-bit SSL
          </span>
          <button 
            type="button" 
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
          >
            Đóng lại
          </button>
        </div>

      </div>
    </div>
  );
};
