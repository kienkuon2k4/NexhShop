'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  User as UserIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Building2, 
  Home as HomeIcon, 
  Clock, 
  Truck, 
  ArrowLeft, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  Search,
  ExternalLink,
  RotateCcw,
  Eye,
  X,
  Settings,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ShippingAddress, BuyerOrder } from '@/types';
import { formatVND } from '@/utils/format';

interface BuyerDashboardProps {
  initialTab?: 'orders' | 'addresses' | 'profile' | 'settings';
  onBackToShopping: () => void;
  onReOrder?: (order: BuyerOrder) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  initialTab = 'orders',
  onBackToShopping,
  onReOrder
}) => {
  const { 
    currentUser, 
    addresses, 
    addShippingAddress, 
    updateShippingAddress, 
    deleteShippingAddress, 
    setDefaultAddress,
    buyerOrders,
    updateUserProfile
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>(
    initialTab === 'orders' ? 'orders' : 'settings'
  );
  const [settingsSubTab, setSettingsSubTab] = useState<'addresses' | 'profile'>(
    initialTab === 'profile' ? 'profile' : 'addresses'
  );
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'ALL' | 'PENDING' | 'SHIPPED' | 'DELIVERED'>('ALL');

  // Quản lý Chỉnh sửa thông tin hồ sơ cá nhân
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '0988 123 456');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || '');
  const [profileNotice, setProfileNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Đồng bộ khi currentUser thay đổi
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfilePhone(currentUser.phone || '0988 123 456');
      setProfileEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileNotice(null);

    if (!profileName.trim()) {
      setProfileNotice({ type: 'error', text: 'Họ và tên không được để trống!' });
      return;
    }

    if (!profilePhone.trim()) {
      setProfileNotice({ type: 'error', text: 'Số điện thoại không được để trống!' });
      return;
    }

    const cleanPhone = profilePhone.replace(/\s/g, '');
    if (cleanPhone.length < 9) {
      setProfileNotice({ type: 'error', text: 'Số điện thoại không hợp lệ (tối thiểu 9-10 chữ số)!' });
      return;
    }

    updateUserProfile({
      name: profileName.trim(),
      phone: profilePhone.trim(),
      email: profileEmail.trim()
    });

    setProfileNotice({ type: 'success', text: 'Đã lưu thay đổi thông tin cá nhân thành công!' });
    setTimeout(() => {
      setProfileNotice(null);
    }, 4000);
  };

  const handleResetProfile = () => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfilePhone(currentUser.phone || '0988 123 456');
      setProfileEmail(currentUser.email || '');
    }
    setProfileNotice(null);
  };

  // State cho Modal Xem chi tiết đơn hàng
  const [selectedBuyerOrderDetail, setSelectedBuyerOrderDetail] = useState<BuyerOrder | null>(null);

  // State cho Modal Thêm / Chỉnh sửa địa chỉ
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);
  
  // Form state
  const [formReceiverName, setFormReceiverName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCity, setFormCity] = useState('Hà Nội');
  const [formDistrict, setFormDistrict] = useState('Quận Cầu Giấy');
  const [formWard, setFormWard] = useState('Phường Quan Hoa');
  const [formAddressLine, setFormAddressLine] = useState('');
  const [formLabel, setFormLabel] = useState<'NHÀ RIÊNG' | 'CƠ QUAN' | 'KHÁC'>('NHÀ RIÊNG');
  const [formIsDefault, setFormIsDefault] = useState(false);
  const [formError, setFormError] = useState('');

  // Mở modal thêm mới
  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setFormReceiverName(currentUser?.name || 'Nguyễn Văn Mua');
    setFormPhone(currentUser?.phone || '0988 123 456');
    setFormCity('Hà Nội');
    setFormDistrict('');
    setFormWard('');
    setFormAddressLine('');
    setFormLabel('NHÀ RIÊNG');
    setFormIsDefault(addresses.length === 0);
    setFormError('');
    setIsAddressModalOpen(true);
  };

  // Mở modal chỉnh sửa
  const handleOpenEditAddress = (addr: ShippingAddress) => {
    setEditingAddress(addr);
    setFormReceiverName(addr.receiverName);
    setFormPhone(addr.phone);
    setFormCity(addr.city);
    setFormDistrict(addr.district);
    setFormWard(addr.ward);
    setFormAddressLine(addr.addressLine);
    setFormLabel(addr.label);
    setFormIsDefault(addr.isDefault);
    setFormError('');
    setIsAddressModalOpen(true);
  };

  // Lưu địa chỉ
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formReceiverName.trim()) {
      setFormError('Vui lòng nhập họ và tên người nhận hàng');
      return;
    }
    if (!formPhone.trim() || formPhone.trim().length < 9) {
      setFormError('Vui lòng nhập số điện thoại hợp lệ (tối thiểu 9 số)');
      return;
    }
    if (!formCity.trim() || !formDistrict.trim() || !formWard.trim()) {
      setFormError('Vui lòng điền đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã');
      return;
    }
    if (!formAddressLine.trim()) {
      setFormError('Vui lòng nhập số nhà, tên đường chi tiết');
      return;
    }

    if (editingAddress) {
      updateShippingAddress({
        ...editingAddress,
        receiverName: formReceiverName.trim(),
        phone: formPhone.trim(),
        city: formCity.trim(),
        district: formDistrict.trim(),
        ward: formWard.trim(),
        addressLine: formAddressLine.trim(),
        label: formLabel,
        isDefault: formIsDefault
      });
    } else {
      addShippingAddress({
        receiverName: formReceiverName.trim(),
        phone: formPhone.trim(),
        city: formCity.trim(),
        district: formDistrict.trim(),
        ward: formWard.trim(),
        addressLine: formAddressLine.trim(),
        label: formLabel,
        isDefault: formIsDefault
      });
    }

    setIsAddressModalOpen(false);
  };

  // Xóa địa chỉ với xác nhận
  const handleDeleteAddress = (id: string, label: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa địa chỉ "${label}" này khỏi sổ địa chỉ không?`)) {
      deleteShippingAddress(id);
    }
  };

  // Lọc danh sách đơn hàng
  const filteredOrders = buyerOrders.filter(order => {
    const matchesFilter = orderStatusFilter === 'ALL' || order.status === orderStatusFilter;
    const matchesSearch = !orderSearchQuery.trim() || 
      order.orderNumber.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.items.some(i => i.product.title.toLowerCase().includes(orderSearchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. TOP HEADER BANNER: PROFILE & QUICK METRICS */}
      <div className="bg-[#273142] text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'M'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser?.name || 'Khách Hàng'}</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
                  NextPass VIP
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-0.5">{currentUser?.email || 'customer@nextshop.vn'} &bull; SĐT: {currentUser?.phone || '0988 123 456'}</p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[11px] font-medium flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span><strong>{buyerOrders.length}</strong> Đơn hàng</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[11px] font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>{addresses.length}</strong> Địa chỉ đã lưu</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[11px] font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-sky-400" />
                  <span>NextPass Hỏa Tốc 2H Miễn Phí</span>
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={onBackToShopping}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer self-stretch md:self-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tiếp tục mua sắm deal hot</span>
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION TABS: ĐƠN MUA & CÀI ĐẶT TÀI KHOẢN (ĐỊA CHỈ TRONG CÀI ĐẶT) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-1.5 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
            activeTab === 'orders'
              ? 'bg-[#273142] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4 text-amber-400" />
          <span>Đơn Mua Của Tôi ({buyerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
            activeTab === 'settings'
              ? 'bg-[#273142] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4 text-amber-400" />
          <span>Cài Đặt Tài Khoản</span>
        </button>
      </div>

      {/* 3. TAB 1: ĐƠN MUA CỦA TÔI (ORDER HISTORY) */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Thanh tìm kiếm & lọc trạng thái đơn */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setOrderStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  orderStatusFilter === 'ALL' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tất cả ({buyerOrders.length})
              </button>
              <button
                onClick={() => setOrderStatusFilter('PENDING')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  orderStatusFilter === 'PENDING' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Đang xử lý / Đóng gói ({buyerOrders.filter(o => o.status === 'PENDING' || o.status === 'PACKING').length})
              </button>
              <button
                onClick={() => setOrderStatusFilter('DELIVERED')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  orderStatusFilter === 'DELIVERED' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Đã nhận hàng ({buyerOrders.filter(o => o.status === 'DELIVERED').length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Tìm mã đơn hoặc sản phẩm..."
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:border-amber-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Danh sách đơn hàng */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="font-bold text-slate-800 text-base">Không tìm thấy đơn hàng nào</div>
              <p className="text-slate-500 text-xs">Hãy khám phá các sản phẩm giảm giá cực sâu và đặt đơn hàng đầu tiên của bạn!</p>
              <button 
                onClick={onBackToShopping}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Khám phá sản phẩm ngay</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
                  {/* Order Card Header */}
                  <div className="bg-slate-50 px-4 sm:px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-900 text-sm">{order.orderNumber}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.createdAt}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'SHIPPED' ? 'bg-sky-100 text-sky-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {order.status === 'DELIVERED' && '✓ Giao hàng thành công'}
                        {order.status === 'SHIPPED' && '🚚 Đang giao hàng hỏa tốc 2h'}
                        {order.status === 'PENDING' && '⏳ Chờ shop xác nhận & đóng gói'}
                        {order.status === 'PACKING' && '📦 Shop đang đóng hàng'}
                      </span>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-4 sm:p-5 space-y-4">
                    
                    {/* Shipping Address Summary Bar */}
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>Địa chỉ nhận hàng: <strong>{order.shippingAddress.receiverName}</strong> ({order.shippingAddress.phone})</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                              {order.shippingAddress.label === 'NHÀ RIÊNG' ? '🏠 Nhà riêng' : (order.shippingAddress.label === 'CƠ QUAN' ? '🏢 Cơ quan' : '📍 Khác')}
                            </span>
                          </div>
                          <div className="text-slate-600 text-[11px] mt-0.5">
                            {order.shippingAddress.addressLine}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" /> {order.deliveryEstimate}
                        </span>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="divide-y divide-slate-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                          <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                            {item.product.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-6 h-6 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 truncate">{item.product.title}</h4>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Phân loại: <span className="font-medium text-slate-700">{item.selectedVariant || 'Tiêu chuẩn'}</span> &bull; Số lượng: <strong className="text-slate-900">x{item.quantity}</strong>
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Thương hiệu: <strong className="text-slate-600">{item.product.brand}</strong>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-black text-rose-700 text-sm">
                              {formatVND(item.product.price * item.quantity)}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {formatVND(item.product.price)} / món
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer & Total */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="text-slate-500 text-[11px]">
                        Hình thức thanh toán: <strong className="text-slate-800">{order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : (order.paymentMethod === 'VIETQR' ? 'Chuyển khoản QR Napas 24/7' : 'Thẻ ATM / Thẻ tín dụng')}</strong>
                      </div>

                      <div className="flex items-center gap-2.5 self-end sm:self-auto">
                        <div className="text-right">
                          <span className="text-slate-500 text-[11px]">Tổng thành tiền: </span>
                          <span className="font-black text-base text-rose-700">{formatVND(order.finalPrice)}</span>
                        </div>

                        <button 
                          onClick={() => setSelectedBuyerOrderDetail(order)}
                          className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Chi tiết</span>
                        </button>

                        {onReOrder && (
                          <button 
                            onClick={() => onReOrder(order)}
                            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Mua lại</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* 4. TAB 2: CÀI ĐẶT TÀI KHOẢN (BAO GỒM SỔ ĐỊA CHỈ & THÔNG TIN CÁ NHÂN) */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          
          {/* Sub-tabs điều hướng trong Cài đặt tài khoản */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-1.5 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSettingsSubTab('addresses')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                settingsSubTab === 'addresses'
                  ? 'bg-[#273142] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Sổ Địa Chỉ Nhận Hàng ({addresses.length})</span>
            </button>

            <button
              onClick={() => setSettingsSubTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                settingsSubTab === 'profile'
                  ? 'bg-[#273142] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <UserIcon className="w-4 h-4 text-sky-400" />
              <span>Hồ Sơ & Bảo Mật</span>
            </button>
          </div>

          {/* Subtab 1: Sổ Địa Chỉ Nhận Hàng */}
          {settingsSubTab === 'addresses' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span>Sổ Địa Chỉ Giao Hàng Của Bạn</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Lưu nhiều địa chỉ (Nhà riêng, Cơ quan, Nhà bố mẹ...) để đặt hàng siêu tốc 1-click mà không cần gõ lại.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddAddress}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Thêm địa chỉ mới</span>
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id} 
                    className={`bg-white p-5 rounded-2xl border transition shadow-sm relative flex flex-col justify-between ${
                      addr.isDefault 
                        ? 'border-amber-400 ring-2 ring-amber-400/20 bg-gradient-to-br from-white to-amber-50/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-2.5">
                      {/* Top Bar: Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 ${
                            addr.label === 'NHÀ RIÊNG' ? 'bg-blue-100 text-blue-800' :
                            addr.label === 'CƠ QUAN' ? 'bg-purple-100 text-purple-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {addr.label === 'NHÀ RIÊNG' && <HomeIcon className="w-3 h-3" />}
                            {addr.label === 'CƠ QUAN' && <Building2 className="w-3 h-3" />}
                            <span>{addr.label}</span>
                          </span>

                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-amber-400 text-slate-950 flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[3]" /> Mặc định
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditAddress(addr)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition cursor-pointer"
                            title="Chỉnh sửa địa chỉ"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr.id, addr.receiverName)}
                            className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                            title="Xóa địa chỉ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Receiver Info */}
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <span>{addr.receiverName}</span>
                          <span className="text-slate-300">|</span>
                          <span className="font-bold text-slate-600 text-xs flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{addr.phone}</span>
                          </span>
                        </div>

                        <div className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                          <strong>{addr.addressLine}</strong><br/>
                          {addr.ward}, {addr.district}, {addr.city}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-amber-600 hover:text-amber-700 font-bold hover:underline cursor-pointer"
                        >
                          Thiết lập làm địa chỉ mặc định
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Địa chỉ nhận hàng ưu tiên
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400 font-medium">
                        Hỗ trợ giao 2h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtab 2: Hồ Sơ Cá Nhân & Bảo Mật */}
          {settingsSubTab === 'profile' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-black text-slate-900">Hồ Sơ Khách Hàng</h2>
                  <p className="text-slate-500 text-[11px] mt-0.5">Chỉnh sửa họ tên, số điện thoại và thông tin liên hệ của tài khoản.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Đã xác thực
                </span>
              </div>

              {/* Thông báo kết quả lưu */}
              {profileNotice && (
                <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 animate-in fade-in duration-200 ${
                  profileNotice.type === 'success'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                    : 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                }`}>
                  {profileNotice.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{profileNotice.text}</span>
                </div>
              )}

              {/* Thẻ Avatar & Tóm Tắt Người Dùng */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shadow-sm shrink-0">
                  {profileName.trim() ? profileName.trim().charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-extrabold text-sm text-slate-900 truncate">
                    {profileName || 'Chưa đặt tên'}
                  </div>
                  <div className="text-slate-500 text-[11px] truncate flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profileEmail}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      NextPass VIP
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ID: #{currentUser?.id || 'NX-USER-01'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Chỉnh Sửa Thông Tin Cá Nhân */}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* 1. Họ và tên */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">Họ và tên người dùng *</label>
                    {profileName && (
                      <button
                        type="button"
                        onClick={() => setProfileName('')}
                        className="text-[10px] text-slate-400 hover:text-rose-600 cursor-pointer flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3 h-3" /> Xóa tên
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input 
                      type="text" 
                      required
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Nhập họ và tên..."
                      className="w-full pl-10 pr-9 py-2 border border-slate-300 rounded-xl bg-white text-slate-900 font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                    />
                    {profileName && (
                      <button
                        type="button"
                        onClick={() => setProfileName('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Xóa trắng"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Số điện thoại */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">Số điện thoại liên hệ *</label>
                    {profilePhone && (
                      <button
                        type="button"
                        onClick={() => setProfilePhone('')}
                        className="text-[10px] text-slate-400 hover:text-rose-600 cursor-pointer flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3 h-3" /> Xóa số
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input 
                      type="tel" 
                      required
                      value={profilePhone} 
                      onChange={(e) => setProfilePhone(e.target.value)}
                      placeholder="Nhập số điện thoại (10 số)..."
                      className="w-full pl-10 pr-9 py-2 border border-slate-300 rounded-xl bg-white text-slate-900 font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                    />
                    {profilePhone && (
                      <button
                        type="button"
                        onClick={() => setProfilePhone('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Xóa trắng"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Dùng để Shipper gọi điện khi giao hàng hỏa tốc 2 giờ.</span>
                </div>

                {/* 3. Email */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-700 font-bold">Địa chỉ Email đăng nhập *</label>
                    {profileEmail && (
                      <button
                        type="button"
                        onClick={() => setProfileEmail('')}
                        className="text-[10px] text-slate-400 hover:text-rose-600 cursor-pointer flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3 h-3" /> Xóa email
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input 
                      type="email" 
                      required
                      value={profileEmail} 
                      onChange={(e) => setProfileEmail(e.target.value)}
                      placeholder="Nhập địa chỉ email..."
                      className="w-full pl-10 pr-9 py-2 border border-slate-300 rounded-xl bg-white text-slate-900 font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                    />
                    {profileEmail && (
                      <button
                        type="button"
                        onClick={() => setProfileEmail('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Xóa trắng"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 4. Cấp độ tài khoản */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Cấp độ tài khoản</label>
                  <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-amber-950 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>NextPass Member VIP</span>
                      </div>
                      <div className="text-amber-800 text-[11px] mt-0.5">
                        Hưởng ưu đãi Miễn phí vận chuyển hỏa tốc 2 giờ toàn sàn & đổi trả 30 ngày tận nhà.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Lưu & Đặt Lại */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-md transition cursor-pointer active:scale-95 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Lưu Thay Đổi Thông Tin</span>
                  </button>

                  <button 
                    type="button"
                    onClick={handleResetProfile}
                    className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Khôi Phục Ban Đầu</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}

      {/* 6. MODAL THÊM / SỬA ĐỊA CHỈ NHẬN HÀNG */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden text-xs animate-in fade-in zoom-in duration-150">
            
            <div className="bg-[#273142] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <h3 className="font-black text-sm">
                  {editingAddress ? 'Chỉnh Sửa Địa Chỉ Nhận Hàng' : 'Thêm Địa Chỉ Nhận Hàng Mới'}
                </h3>
              </div>
              <button 
                onClick={() => setIsAddressModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="p-5 space-y-4">
              
              {formError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-bold text-xs">
                  {formError}
                </div>
              )}

              {/* Nhãn loại địa chỉ */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Loại địa chỉ</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormLabel('NHÀ RIÊNG')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      formLabel === 'NHÀ RIÊNG'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <HomeIcon className="w-3.5 h-3.5" />
                    <span>Nhà riêng</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormLabel('CƠ QUAN')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      formLabel === 'CƠ QUAN'
                        ? 'border-purple-500 bg-purple-50 text-purple-700 ring-2 ring-purple-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Cơ quan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormLabel('KHÁC')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      formLabel === 'KHÁC'
                        ? 'border-slate-800 bg-slate-100 text-slate-900 ring-2 ring-slate-800/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
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
                  <label className="block font-bold text-slate-700 mb-1">
                    Họ và tên người nhận <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn Mua"
                    value={formReceiverName}
                    onChange={(e) => setFormReceiverName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Số điện thoại nhận hàng <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0988 123 456"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              </div>

              {/* Tỉnh / Thành phố */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tỉnh / Thành phố <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-xl outline-none focus:border-amber-400 font-medium bg-white"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Quận / Huyện <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Cầu Giấy"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-xl outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Phường / Xã <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Quan Hoa"
                    value={formWard}
                    onChange={(e) => setFormWard(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-xl outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              </div>

              {/* Số nhà, tên đường cụ thể */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Địa chỉ chi tiết (Số nhà, tòa nhà, ngõ/đường) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Số 18, Ngõ 86 Cầu Giấy, Tòa nhà Landmark..."
                  value={formAddressLine}
                  onChange={(e) => setFormAddressLine(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:border-amber-400 font-medium"
                />
              </div>

              {/* Checkbox Đặt làm mặc định */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formIsDefault}
                    onChange={(e) => setFormIsDefault(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800">Đặt làm địa chỉ nhận hàng mặc định</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition cursor-pointer shadow-sm active:scale-95"
                >
                  {editingAddress ? 'Lưu thay đổi' : 'Lưu địa chỉ'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT ĐƠN HÀNG DÀNH CHO NGƯỜI MUA */}
      {selectedBuyerOrderDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden text-xs flex flex-col max-h-[90vh]">
            
            {/* Header modal */}
            <div className="bg-[#273142] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm text-white">Chi Tiết Đơn Hàng #{selectedBuyerOrderDetail.orderNumber}</h3>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      selectedBuyerOrderDetail.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                      selectedBuyerOrderDetail.status === 'SHIPPED' ? 'bg-sky-100 text-sky-800' :
                      'bg-amber-100 text-amber-900'
                    }`}>
                      {selectedBuyerOrderDetail.status === 'DELIVERED' && '✓ Đã nhận hàng'}
                      {selectedBuyerOrderDetail.status === 'SHIPPED' && '🚚 Đang giao 2h'}
                      {selectedBuyerOrderDetail.status === 'PENDING' && '⏳ Chờ đóng hàng'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">Đặt lúc: {selectedBuyerOrderDetail.createdAt}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedBuyerOrderDetail(null)}
                className="w-8 h-8 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* Địa chỉ nhận hàng */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Địa chỉ giao hàng</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-950">
                    {selectedBuyerOrderDetail.shippingAddress.label === 'NHÀ RIÊNG' ? '🏠 Nhà riêng' : (selectedBuyerOrderDetail.shippingAddress.label === 'CƠ QUAN' ? '🏢 Cơ quan' : '📍 Khác')}
                  </span>
                </div>
                <div className="font-extrabold text-slate-900 text-xs">
                  {selectedBuyerOrderDetail.shippingAddress.receiverName} &bull; {selectedBuyerOrderDetail.shippingAddress.phone}
                </div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  {selectedBuyerOrderDetail.shippingAddress.addressLine}, {selectedBuyerOrderDetail.shippingAddress.ward}, {selectedBuyerOrderDetail.shippingAddress.district}, {selectedBuyerOrderDetail.shippingAddress.city}
                </div>
                <div className="text-emerald-700 font-semibold text-[11px] pt-1 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>{selectedBuyerOrderDetail.deliveryEstimate}</span>
                </div>
              </div>

              {/* Danh sách món hàng */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3">
                <div className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Sản phẩm đã đặt ({selectedBuyerOrderDetail.items.reduce((s, i) => s + i.quantity, 0)})
                </div>
                <div className="divide-y divide-slate-100">
                  {selectedBuyerOrderDetail.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {item.product.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs truncate max-w-[260px]">{item.product.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Phân loại: <span className="font-medium text-slate-700">{item.selectedVariant || 'Tiêu chuẩn'}</span> &bull; SL: <strong className="text-slate-900">x{item.quantity}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-rose-700 text-xs">{formatVND(item.product.price * item.quantity)}</div>
                        <div className="text-[10px] text-slate-400">{formatVND(item.product.price)} / món</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chi tiết thanh toán */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Tiền hàng:</span>
                  <span className="font-semibold text-slate-800">{formatVND(selectedBuyerOrderDetail.totalPrice)}</span>
                </div>
                {selectedBuyerOrderDetail.voucherDiscount && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Voucher ({selectedBuyerOrderDetail.voucherCode}):</span>
                    <span>-{formatVND(selectedBuyerOrderDetail.voucherDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Vận chuyển hỏa tốc 2h:</span>
                  <span className="text-emerald-700 font-bold">Miễn phí 0₫</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Phương thức:</span>
                  <span className="font-semibold text-slate-800">{selectedBuyerOrderDetail.paymentMethod === 'COD' ? 'Thanh toán khi nhận (COD)' : 'Chuyển khoản VietQR'}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-rose-700 border-t border-slate-200 pt-2">
                  <span>Tổng thanh toán:</span>
                  <span>{formatVND(selectedBuyerOrderDetail.finalPrice)}</span>
                </div>
              </div>

            </div>

            {/* Footer modal */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-end gap-2">
              <button 
                onClick={() => setSelectedBuyerOrderDetail(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
