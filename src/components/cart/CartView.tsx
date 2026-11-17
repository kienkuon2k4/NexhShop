'use client';

import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Bookmark, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Truck, 
  Utensils, 
  Footprints, 
  Headphones, 
  Briefcase,
  MapPin,
  Plus,
  Home as HomeIcon,
  Building2,
  Check,
  CreditCard,
  QrCode,
  Banknote,
  Clock,
  Package,
  Tag,
  Sparkles,
  X
} from 'lucide-react';
import { CartItem, BuyerOrder, ShopVoucher } from '@/types';
import { formatVND } from '@/utils/format';
import { useAuth } from '@/context/AuthContext';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onBackToShopping: () => void;
  onClearCart?: () => void;
  onViewBuyerDashboard?: (tab?: 'orders' | 'addresses' | 'profile') => void;
  availableVouchers?: ShopVoucher[];
}

const DEFAULT_VOUCHERS: ShopVoucher[] = [
  {
    id: 'vch-1',
    code: 'GIADUNG50K',
    title: 'Giảm 50.000₫ cho đơn từ 500k',
    discountType: 'FIXED',
    discountValue: 50000,
    minOrderValue: 500000,
    usageLimit: 100,
    usedCount: 34,
    startDate: '01/11/2026',
    endDate: '30/11/2026',
    status: 'ACTIVE'
  },
  {
    id: 'vch-2',
    code: 'NEXTSHOP10',
    title: 'Giảm 10% tối đa 100.000₫ cho đơn từ 300k',
    discountType: 'PERCENT',
    discountValue: 10,
    minOrderValue: 300000,
    maxDiscountAmount: 100000,
    usageLimit: 200,
    usedCount: 88,
    startDate: '10/11/2026',
    endDate: '30/11/2026',
    status: 'ACTIVE'
  },
  {
    id: 'vch-3',
    code: 'FREESHIP',
    title: 'Miễn phí vận chuyển toàn quốc',
    discountType: 'FIXED',
    discountValue: 30000,
    minOrderValue: 200000,
    usageLimit: 500,
    usedCount: 312,
    startDate: '01/11/2026',
    endDate: '31/12/2026',
    status: 'ACTIVE'
  }
];

export const CartView: React.FC<CartViewProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onBackToShopping,
  onClearCart,
  onViewBuyerDashboard,
  availableVouchers
}) => {
  const { 
    currentUser, 
    addresses, 
    addShippingAddress, 
    createBuyerOrder 
  } = useAuth();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Quản lý địa chỉ giao hàng
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // Form thêm địa chỉ mới trong khi checkout
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('Hà Nội');
  const [newDistrict, setNewDistrict] = useState('');
  const [newWard, setNewWard] = useState('');
  const [newAddressLine, setNewAddressLine] = useState('');
  const [newLabel, setNewLabel] = useState<'NHÀ RIÊNG' | 'CƠ QUAN' | 'KHÁC'>('NHÀ RIÊNG');
  const [saveToBook, setSaveToBook] = useState(true);
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [addressError, setAddressError] = useState('');

  // Phương thức thanh toán & Vận chuyển
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'VIETQR' | 'CARD'>('COD');
  const [shippingMethod, setShippingMethod] = useState<'EXPRESS_2H' | 'STANDARD'>('EXPRESS_2H');
  const [deliveryNote, setDeliveryNote] = useState('');

  // Quản lý Voucher khuyến mãi
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<ShopVoucher | null>(null);
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  // Đơn hàng vừa tạo thành công
  const [placedOrder, setPlacedOrder] = useState<BuyerOrder | null>(null);

  // Danh sách voucher hợp lệ
  const allVouchers = availableVouchers && availableVouchers.length > 0 ? availableVouchers : DEFAULT_VOUCHERS;

  // Tự động chọn địa chỉ mặc định khi load danh sách
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Tính toán giảm giá từ Voucher
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'FIXED') {
      discountAmount = appliedVoucher.discountValue;
    } else if (appliedVoucher.discountType === 'PERCENT') {
      const calculated = Math.round((subtotal * appliedVoucher.discountValue) / 100);
      discountAmount = appliedVoucher.maxDiscountAmount 
        ? Math.min(calculated, appliedVoucher.maxDiscountAmount) 
        : calculated;
    }
    discountAmount = Math.min(discountAmount, subtotal);
  }

  const payableAmount = Math.max(0, subtotal - discountAmount);
  const taxFee = 0; // Đã bỏ phần thuế VAT theo yêu cầu
  const shippingFee = 0; // NextPass Miễn phí hỏa tốc 2h
  const finalTotal = payableAmount + shippingFee;

  const currentSelectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  const handleApplyVoucher = (codeParam?: string) => {
    const code = (codeParam || voucherCodeInput).trim().toUpperCase();
    setVoucherError('');
    setVoucherSuccess('');

    if (!code) {
      setVoucherError('Vui lòng nhập mã voucher');
      return;
    }

    const matched = allVouchers.find(v => v.code.toUpperCase() === code && v.status === 'ACTIVE');
    if (!matched) {
      setVoucherError(`Mã "${code}" không hợp lệ hoặc đã hết hạn.`);
      return;
    }

    if (subtotal < matched.minOrderValue) {
      setVoucherError(`Đơn hàng cần tối thiểu ${formatVND(matched.minOrderValue)} để áp dụng mã này.`);
      return;
    }

    setAppliedVoucher(matched);
    setVoucherCodeInput(matched.code);
    setVoucherSuccess(`Đã áp dụng mã ${matched.code} thành công!`);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCodeInput('');
    setVoucherError('');
    setVoucherSuccess('');
  };

  const getProductIcon = (icon: string) => {
    switch (icon) {
      case 'kitchen':
        return <Utensils className="w-8 h-8 text-amber-700" />;
      case 'shoe':
        return <Footprints className="w-8 h-8 text-rose-600" />;
      case 'headphones':
        return <Headphones className="w-8 h-8 text-slate-800" />;
      case 'briefcase':
        return <Briefcase className="w-8 h-8 text-amber-700" />;
      default:
        return <Utensils className="w-8 h-8 text-slate-700" />;
    }
  };

  // Mở form nhập địa chỉ mới
  const handleOpenAddNewAddress = () => {
    setNewName(currentUser?.name || '');
    setNewPhone(currentUser?.phone || '');
    setNewCity('Hà Nội');
    setNewDistrict('');
    setNewWard('');
    setNewAddressLine('');
    setNewLabel('NHÀ RIÊNG');
    setSaveToBook(true);
    setSetAsDefault(addresses.length === 0);
    setAddressError('');
    setIsAddingNewAddress(true);
  };

  // Lưu địa chỉ mới và tự động chọn nó
  const handleSaveAndUseNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setAddressError('Vui lòng nhập họ và tên người nhận');
      return;
    }
    if (!newPhone.trim() || newPhone.trim().length < 9) {
      setAddressError('Vui lòng nhập số điện thoại hợp lệ (tối thiểu 9 số)');
      return;
    }
    if (!newCity.trim() || !newDistrict.trim() || !newWard.trim()) {
      setAddressError('Vui lòng điền Tỉnh/Thành phố, Quận/Huyện, Phường/Xã');
      return;
    }
    if (!newAddressLine.trim()) {
      setAddressError('Vui lòng nhập số nhà, tên đường chi tiết');
      return;
    }

    if (saveToBook) {
      const added = addShippingAddress({
        receiverName: newName.trim(),
        phone: newPhone.trim(),
        city: newCity.trim(),
        district: newDistrict.trim(),
        ward: newWard.trim(),
        addressLine: newAddressLine.trim(),
        label: newLabel,
        isDefault: setAsDefault
      });
      setSelectedAddressId(added.id);
    }
    setIsAddingNewAddress(false);
  };

  // Tiến hành chốt đơn đặt hàng
  const handleConfirmOrder = () => {
    if (!currentSelectedAddress) {
      alert('Vui lòng chọn hoặc thêm địa chỉ nhận hàng trước khi thanh toán!');
      return;
    }

    const order = createBuyerOrder({
      items: [...items],
      totalPrice: subtotal,
      shippingFee: 0,
      taxFee: taxFee,
      voucherCode: appliedVoucher ? appliedVoucher.code : undefined,
      voucherDiscount: discountAmount > 0 ? discountAmount : undefined,
      finalPrice: finalTotal,
      paymentMethod: paymentMethod,
      shippingAddress: currentSelectedAddress
    });

    setPlacedOrder(order);
    if (onClearCart) {
      onClearCart();
    }
    setCheckoutStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Box Voucher khuyến mãi dùng chung cho cả giỏ hàng & thanh toán
  const renderVoucherSection = () => (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-amber-500" />
          <span>Voucher Khuyến Mãi Của Shop</span>
        </span>
        {appliedVoucher ? (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            Đã áp dụng
          </span>
        ) : (
          <span className="text-[10px] text-slate-400">
            {allVouchers.filter(v => v.status === 'ACTIVE').length} mã khả dụng
          </span>
        )}
      </div>

      {!appliedVoucher ? (
        <div className="space-y-2">
          <div className="flex gap-1.5">
            <input 
              type="text" 
              placeholder="Nhập mã voucher (VD: GIADUNG50K)"
              value={voucherCodeInput}
              onChange={(e) => {
                setVoucherCodeInput(e.target.value.toUpperCase());
                if (voucherError) setVoucherError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyVoucher();
                }
              }}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs uppercase font-bold tracking-wider outline-none focus:border-amber-400 placeholder:normal-case placeholder:font-normal"
            />
            <button
              type="button"
              onClick={() => handleApplyVoucher()}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer active:scale-95 shrink-0"
            >
              Áp dụng
            </button>
          </div>

          {voucherError && (
            <div className="text-rose-600 font-semibold text-[11px]">
              ⚠️ {voucherError}
            </div>
          )}

          {/* Gợi ý các mã có sẵn */}
          <div className="pt-1 space-y-1.5">
            <span className="text-[10px] text-slate-400 font-medium block">Bấm để áp dụng nhanh mã ưu đãi:</span>
            <div className="flex flex-wrap gap-1.5">
              {allVouchers.filter(v => v.status === 'ACTIVE').map(v => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleApplyVoucher(v.code)}
                  className="px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg text-amber-900 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition active:scale-95 text-left"
                  title={v.title}
                >
                  <Sparkles className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                  <span>{v.code}</span>
                  <span className="text-slate-500 font-semibold">
                    ({v.discountType === 'FIXED' ? `-${v.discountValue / 1000}k` : `-${v.discountValue}%`})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0">
              %
            </div>
            <div>
              <div className="font-extrabold text-emerald-950 text-xs flex items-center gap-1">
                <span>{appliedVoucher.code}</span>
                <span className="text-[10px] text-emerald-700 font-semibold">- Giảm {formatVND(discountAmount)}</span>
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-1">
                {appliedVoucher.title}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemoveVoucher}
            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
            title="Gỡ mã giảm giá"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  // =========================================================================
  // BƯỚC 3: ĐẶT HÀNG THÀNH CÔNG (SUCCESS SCREEN)
  // =========================================================================
  if (checkoutStep === 'success' && placedOrder) {
    return (
      <div className="max-w-2xl mx-auto my-6 space-y-6 animate-in fade-in zoom-in duration-200">
        
        {/* Banner thành công */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          
          <div>
            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 uppercase tracking-wider">
              Đặt Hàng Thành Công
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Cảm ơn bạn đã mua sắm tại NextShop!</h2>
            <p className="text-xs text-slate-600 mt-1">
              Mã đơn hàng của bạn: <strong className="text-slate-950 font-black text-sm">{placedOrder.orderNumber}</strong>
            </p>
          </div>

          {/* Chi tiết địa chỉ nhận hàng đã chọn */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Địa chỉ giao hàng</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950">
                {placedOrder.shippingAddress.label === 'NHÀ RIÊNG' ? '🏠 Nhà riêng' : (placedOrder.shippingAddress.label === 'CƠ QUAN' ? '🏢 Cơ quan' : '📍 Khác')}
              </span>
            </div>

            <div className="font-bold text-slate-900 text-sm">
              {placedOrder.shippingAddress.receiverName} &bull; <span className="text-slate-600">{placedOrder.shippingAddress.phone}</span>
            </div>

            <div className="text-slate-600 leading-relaxed">
              <strong>{placedOrder.shippingAddress.addressLine}</strong>, {placedOrder.shippingAddress.ward}, {placedOrder.shippingAddress.district}, {placedOrder.shippingAddress.city}
            </div>

            <div className="pt-1 text-emerald-700 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Thời gian giao dự kiến: <strong>Giao hỏa tốc NextPass trong 2 giờ</strong></span>
            </div>
          </div>

          {/* Tóm tắt thanh toán */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-left text-xs flex justify-between items-center">
            <div>
              <div className="text-slate-500">Hình thức thanh toán</div>
              <div className="font-bold text-slate-900">
                {placedOrder.paymentMethod === 'COD' && 'Thanh toán tiền mặt khi nhận hàng (COD)'}
                {placedOrder.paymentMethod === 'VIETQR' && 'Quét mã VietQR Napas 24/7 (Đã xác nhận)'}
                {placedOrder.paymentMethod === 'CARD' && 'Thẻ thanh toán ATM/Visa'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-500">Tổng thanh toán</div>
              <div className="font-black text-rose-700 text-lg">{formatVND(placedOrder.finalPrice)}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onViewBuyerDashboard && (
              <button 
                onClick={() => onViewBuyerDashboard('orders')}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#273142] hover:bg-[#1f2735] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition active:scale-95"
              >
                <Package className="w-4 h-4 text-amber-400" />
                <span>Xem đơn trong Bảng Điều Khiển Người Mua</span>
              </button>
            )}

            <button 
              onClick={() => {
                setCheckoutStep('cart');
                onBackToShopping();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer active:scale-95"
            >
              Tiếp tục mua sắm
            </button>
          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // GIỎ HÀNG RỖNG
  // =========================================================================
  if (items.length === 0 && checkoutStep === 'cart') {
    return (
      <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto text-center space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-slate-500">Khám phá hàng ngàn deal hot chính hãng đa ngành hàng ngay hôm nay!</p>
        <button 
          onClick={onBackToShopping}
          className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer shadow-sm active:scale-95"
        >
          Duyệt sản phẩm ngay
        </button>
      </div>
    );
  }

  // =========================================================================
  // BƯỚC 2: MÀN HÌNH THANH TOÁN (CHECKOUT WITH ADDRESS PICKER & MULTI-ADDRESS)
  // =========================================================================
  if (checkoutStep === 'checkout') {
    return (
      <div className="space-y-6">
        
        {/* Nút quay lại & Tiêu đề bước */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCheckoutStep('cart')}
            className="flex items-center gap-1.5 text-xs text-[#007185] hover:underline font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại giỏ hàng</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-emerald-700 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 stroke-[3]" /> Giỏ hàng
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-950 font-extrabold bg-amber-100 px-2.5 py-1 rounded-full text-amber-950 border border-amber-300">
              2. Thanh toán & Nhận hàng
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-400">3. Hoàn tất</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CỘT TRÁI: ĐỊA CHỈ NHẬN HÀNG + VẬN CHUYỂN + THANH TOÁN (8 CỘT) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* 1. MỤC ĐỊA CHỈ NHẬN HÀNG (LƯU NHIỀU ĐỊA CHỈ: NHÀ RIÊNG, CƠ QUAN...) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-700 flex items-center justify-center font-black text-xs">
                    1
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <span>Địa Chỉ Nhận Hàng</span>
                    </h2>
                    <p className="text-[11px] text-slate-500">Chọn từ sổ địa chỉ đã lưu hoặc thêm địa chỉ mới cho lần giao này.</p>
                  </div>
                </div>

                {!isAddingNewAddress && (
                  <button
                    onClick={handleOpenAddNewAddress}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>+ Thêm địa chỉ mới</span>
                  </button>
                )}
              </div>

              {/* Form thêm địa chỉ mới */}
              {isAddingNewAddress ? (
                <form onSubmit={handleSaveAndUseNewAddress} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-amber-600" />
                      <span>Nhập thông tin địa chỉ giao hàng mới</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>

                  {addressError && (
                    <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 font-bold text-xs">
                      {addressError}
                    </div>
                  )}

                  {/* Phân loại loại địa chỉ */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Loại địa chỉ</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewLabel('NHÀ RIÊNG')}
                        className={`py-1.5 px-3 rounded-lg border text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                          newLabel === 'NHÀ RIÊNG' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <HomeIcon className="w-3.5 h-3.5" />
                        <span>Nhà riêng</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewLabel('CƠ QUAN')}
                        className={`py-1.5 px-3 rounded-lg border text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                          newLabel === 'CƠ QUAN' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Cơ quan</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewLabel('KHÁC')}
                        className={`py-1.5 px-3 rounded-lg border text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                          newLabel === 'KHÁC' ? 'border-slate-800 bg-slate-200 text-slate-900' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Khác</span>
                      </button>
                    </div>
                  </div>

                  {/* Họ tên & SĐT */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Họ tên người nhận *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn Mua"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-amber-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Số điện thoại nhận hàng *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0988 123 456"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-amber-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Tỉnh / Quận / Phường */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tỉnh / Thành phố *</label>
                      <select
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-amber-400 font-medium"
                      >
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Quận / Huyện *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Cầu Giấy"
                        value={newDistrict}
                        onChange={(e) => setNewDistrict(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-amber-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phường / Xã *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Quan Hoa"
                        value={newWard}
                        onChange={(e) => setNewWard(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-amber-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Địa chỉ chi tiết */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Địa chỉ chi tiết (Số nhà, tòa nhà, ngõ/phố) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Số 18, Ngõ 86 Cầu Giấy..."
                      value={newAddressLine}
                      onChange={(e) => setNewAddressLine(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-amber-400 font-medium"
                    />
                  </div>

                  {/* Tùy chọn lưu */}
                  <div className="space-y-1.5 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={saveToBook}
                        onChange={(e) => setSaveToBook(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">Lưu địa chỉ này vào sổ địa chỉ để sử dụng cho lần sau</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={setAsDefault}
                        onChange={(e) => setSetAsDefault(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">Đặt làm địa chỉ nhận hàng mặc định</span>
                    </label>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="px-3.5 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-lg font-bold cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg cursor-pointer shadow-xs"
                    >
                      Lưu & Chọn địa chỉ này
                    </button>
                  </div>
                </form>
              ) : (
                /* Danh sách các địa chỉ đã lưu của người mua */
                <div className="space-y-2.5">
                  {addresses.length === 0 ? (
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center space-y-2">
                      <p className="text-slate-500">Bạn chưa có địa chỉ nhận hàng nào được lưu.</p>
                      <button
                        type="button"
                        onClick={handleOpenAddNewAddress}
                        className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
                      >
                        + Thêm địa chỉ nhận hàng đầu tiên
                      </button>
                    </div>
                  ) : (
                    addresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-3.5 rounded-xl border text-xs cursor-pointer transition flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-400/20 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="pt-0.5">
                              <input
                                type="radio"
                                name="shipping_address"
                                checked={isSelected}
                                onChange={() => setSelectedAddressId(addr.id)}
                                className="w-4 h-4 text-amber-500 accent-amber-500 cursor-pointer"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-950 text-sm">{addr.receiverName}</span>
                                <span className="text-slate-400">&bull;</span>
                                <span className="font-bold text-slate-700">{addr.phone}</span>
                                
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase flex items-center gap-0.5 ${
                                  addr.label === 'NHÀ RIÊNG' ? 'bg-blue-100 text-blue-800' :
                                  addr.label === 'CƠ QUAN' ? 'bg-purple-100 text-purple-800' :
                                  'bg-slate-100 text-slate-800'
                                }`}>
                                  {addr.label === 'NHÀ RIÊNG' && <HomeIcon className="w-2.5 h-2.5" />}
                                  {addr.label === 'CƠ QUAN' && <Building2 className="w-2.5 h-2.5" />}
                                  <span>{addr.label}</span>
                                </span>

                                {addr.isDefault && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950">
                                    Mặc định
                                  </span>
                                )}
                              </div>

                              <div className="text-slate-600 leading-snug">
                                <strong className="text-slate-800">{addr.addressLine}</strong>, {addr.ward}, {addr.district}, {addr.city}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="shrink-0 text-amber-700 font-extrabold text-[11px] flex items-center gap-1 bg-amber-100/80 px-2 py-1 rounded-lg">
                              <Check className="w-3.5 h-3.5 stroke-[3]" /> Đang chọn
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* 2. MỤC PHƯƠNG THỨC VẬN CHUYỂN */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                  2
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">Phương Thức Giao Hàng</h2>
                  <p className="text-[11px] text-slate-500">Độc quyền giao nhanh nội thành 2h toàn quốc</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div 
                  onClick={() => setShippingMethod('EXPRESS_2H')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    shippingMethod === 'EXPRESS_2H'
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_method"
                      checked={shippingMethod === 'EXPRESS_2H'}
                      onChange={() => setShippingMethod('EXPRESS_2H')}
                      className="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer"
                    />
                    <div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>NextPass Hỏa Tốc (Giao trong 2 giờ)</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                          Khuyên dùng
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        Shipper riêng giao tận nơi, đóng gói chống sốc nhiệt đới.
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-700 font-black text-sm">Miễn phí 0₫</span>
                    <span className="block text-[10px] text-slate-400 line-through">45.000₫</span>
                  </div>
                </div>
              </div>

              {/* Ghi chú giao hàng */}
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Ghi chú thêm cho shipper (Ví dụ: Gọi trước khi giao 10p, gửi phòng bảo vệ...)"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* 3. MỤC PHƯƠNG THỨC THANH TOÁN */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
                  3
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">Phương Thức Thanh Toán</h2>
                  <p className="text-[11px] text-slate-500">Bảo mật giao dịch tuyệt đối, hỗ trợ hoàn tiền trong 24h</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {/* COD */}
                <div 
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'COD'
                      ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="w-4 h-4 text-amber-500 accent-amber-500 cursor-pointer"
                    />
                    <Banknote className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="font-extrabold text-slate-900">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-slate-500 text-[11px]">Được đồng kiểm, kiểm tra hàng thoải mái trước khi thanh toán.</div>
                    </div>
                  </div>
                </div>

                {/* VietQR Napas 24/7 */}
                <div 
                  onClick={() => setPaymentMethod('VIETQR')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'VIETQR'
                      ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'VIETQR'}
                      onChange={() => setPaymentMethod('VIETQR')}
                      className="w-4 h-4 text-amber-500 accent-amber-500 cursor-pointer"
                    />
                    <QrCode className="w-5 h-5 text-sky-600" />
                    <div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span>Quét mã VietQR Napas 24/7 (Khuyên Dùng)</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-sky-100 text-sky-800">
                          Tức thì 0đ phí
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px]">Mở app ngân hàng bất kỳ (Vietcombank, MB, Techcombank...) quét mã.</div>
                    </div>
                  </div>
                </div>

                {/* Thẻ ATM / Visa / Mastercard */}
                <div 
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'CARD'
                      ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                      className="w-4 h-4 text-amber-500 accent-amber-500 cursor-pointer"
                    />
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-extrabold text-slate-900">Thẻ ATM Nội địa / Thẻ quốc tế Visa, Mastercard</div>
                      <div className="text-slate-500 text-[11px]">Cổng thanh toán mã hóa 256-bit chuẩn PCI DSS.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG & NÚT ĐẶT HÀNG (4 CỘT) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Box tóm tắt địa chỉ đã chọn */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-black text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Giao tới địa chỉ này</span>
                </span>
                {currentSelectedAddress && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {currentSelectedAddress.label === 'NHÀ RIÊNG' ? '🏠 Nhà riêng' : (currentSelectedAddress.label === 'CƠ QUAN' ? '🏢 Cơ quan' : '📍 Khác')}
                  </span>
                )}
              </div>

              {currentSelectedAddress ? (
                <div>
                  <div className="font-bold text-slate-900">
                    {currentSelectedAddress.receiverName} &bull; {currentSelectedAddress.phone}
                  </div>
                  <div className="text-slate-600 text-[11px] mt-0.5 leading-snug">
                    {currentSelectedAddress.addressLine}, {currentSelectedAddress.ward}, {currentSelectedAddress.district}, {currentSelectedAddress.city}
                  </div>
                </div>
              ) : (
                <div className="text-rose-600 font-bold">Chưa chọn địa chỉ giao hàng!</div>
              )}
            </div>

            {/* Box Voucher Khuyến Mãi */}
            {renderVoucherSection()}

            {/* Box danh sách sản phẩm tóm tắt */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-3">
              <div className="font-black text-slate-900 border-b border-slate-100 pb-2">
                Sản phẩm trong đơn ({items.reduce((s, i) => s + i.quantity, 0)})
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {item.product.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                        ) : (
                          getProductIcon(item.product.icon)
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-800 truncate text-[11px]">{item.product.title}</div>
                        <div className="text-slate-400 text-[10px]">SL: x{item.quantity}</div>
                      </div>
                    </div>
                    <span className="font-bold text-rose-700 shrink-0 text-xs">
                      {formatVND(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chi tiết tính tiền */}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Tiền hàng:</span>
                  <span className="font-semibold text-slate-800">{formatVND(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Voucher ({appliedVoucher?.code}):</span>
                    <span>-{formatVND(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Phí ship NextPass 2h:</span>
                  <span className="text-emerald-700 font-bold">Miễn phí 0₫</span>
                </div>
                <div className="flex justify-between text-base font-black text-rose-700 border-t border-slate-200 pt-2">
                  <span>Tổng thanh toán:</span>
                  <span>{formatVND(finalTotal)}</span>
                </div>
              </div>

              {/* Nút bấm ĐẶT HÀNG */}
              <button 
                onClick={handleConfirmOrder}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-md transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                <span>XÁC NHẬN ĐẶT HÀNG ({formatVND(finalTotal)})</span>
              </button>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-slate-400 text-[10px]">
                <Lock className="w-3 h-3 text-amber-500" />
                <span>Giao dịch bảo mật SSL 256-bit chuẩn Quốc tế</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // BƯỚC 1: GIỎ HÀNG (SHOPPING CART VIEW)
  // =========================================================================
  return (
    <div className="space-y-6">
      <button 
        onClick={onBackToShopping}
        className="flex items-center gap-1.5 text-xs text-[#007185] hover:underline font-semibold cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Tiếp tục mua sắm</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cột trái: Danh sách sản phẩm trong giỏ (8 Cột) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
            <h1 className="text-2xl font-bold text-slate-900">Giỏ hàng mua sắm</h1>
            <span className="text-xs text-slate-400 font-medium">Đơn giá</span>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.product.id}
                className="flex flex-col sm:flex-row gap-4 border-b border-slate-100 pb-4 text-xs"
              >
                <div className="w-20 h-20 bg-slate-50 border rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
                  {item.product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                  ) : (
                    getProductIcon(item.product.icon)
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-sm text-slate-900 leading-snug">
                      {item.product.title}
                    </h2>
                    <span className="font-bold text-base text-rose-700 ml-4 shrink-0">
                      {formatVND(item.product.price)}
                    </span>
                  </div>

                  <div className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Còn hàng &bull; Đủ điều kiện nhận NextPass giao 2h</span>
                  </div>

                  <div className="text-slate-500 text-[11px]">
                    Bán bởi: <strong className="text-slate-700">{item.product.brand}</strong>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2 text-[#007185] font-medium">
                    <div className="flex items-center gap-1 bg-slate-100 border border-slate-300 rounded px-2 py-0.5 text-slate-800">
                      <span>SL:</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="font-bold px-1 hover:text-amber-600"
                      >
                        -
                      </button>
                      <span className="font-bold px-1">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="font-bold px-1 hover:text-amber-600"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.product.id)}
                      className="hover:underline flex items-center gap-1 text-slate-500 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Xóa
                    </button>

                    <button className="hover:underline flex items-center gap-1 cursor-pointer">
                      <Bookmark className="w-3.5 h-3.5" /> Lưu mua sau
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right text-sm pt-2">
            Tạm tính ({items.reduce((c, i) => c + i.quantity, 0)} sản phẩm):{' '}
            <span className="text-xl font-black text-rose-700">{formatVND(subtotal)}</span>
          </div>
        </div>

        {/* Cột phải: Box đặt hàng (4 Cột) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Box Voucher Khuyến Mãi */}
          {renderVoucherSection()}

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            
            {/* Quick Address Preview Badge */}
            {currentSelectedAddress && (
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-slate-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Giao tới: {currentSelectedAddress.receiverName}</span>
                  </span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                    {currentSelectedAddress.label === 'NHÀ RIÊNG' ? 'Nhà riêng' : 'Cơ quan'}
                  </span>
                </div>
                <div className="text-slate-600 text-[11px] truncate">
                  {currentSelectedAddress.addressLine}, {currentSelectedAddress.district}
                </div>
              </div>
            )}

            <button 
              onClick={() => {
                setCheckoutStep('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-md transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Tiến hành Đặt Hàng ({formatVND(finalTotal)})</span>
            </button>
            
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <div className="font-bold text-sm text-slate-900">Chi tiết thanh toán</div>
              <div className="flex justify-between text-slate-600">
                <span>Tiền hàng:</span>
                <span className="font-semibold text-slate-800">{formatVND(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Voucher ({appliedVoucher?.code}):</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Vận chuyển hỏa tốc 2h:</span>
                <span className="text-emerald-700 font-bold">Miễn phí 0₫</span>
              </div>
              <div className="flex justify-between text-base font-black text-rose-700 border-t pt-2">
                <span>Tổng thanh toán:</span>
                <span>{formatVND(finalTotal)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-slate-500 text-[11px]">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Giao dịch bảo mật SSL 256-bit</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
