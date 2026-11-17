'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ShopRegistrationRequest, ShippingAddress, BuyerOrder, CartItem } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, role?: UserRole, password?: string) => boolean;
  logout: () => void;
  pendingShops: Array<ShopRegistrationRequest & { id: string; userEmail: string; status: 'PENDING' | 'APPROVED' | 'REJECTED'; createdAt: string }>;
  submitShopRegistration: (data: ShopRegistrationRequest) => void;
  approveShop: (shopId: string) => void;
  rejectShop: (shopId: string) => void;
  // Quản lý Sổ địa chỉ Người Mua
  addresses: ShippingAddress[];
  addShippingAddress: (addr: Omit<ShippingAddress, 'id'>) => ShippingAddress;
  updateShippingAddress: (addr: ShippingAddress) => void;
  deleteShippingAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  // Quản lý Đơn mua hàng của Người Mua
  buyerOrders: BuyerOrder[];
  updateUserProfile: (data: { name?: string; phone?: string; email?: string }) => void;
  createBuyerOrder: (orderData: {
    items: CartItem[];
    totalPrice: number;
    shippingFee: number;
    taxFee?: number;
    voucherCode?: string;
    voucherDiscount?: number;
    finalPrice: number;
    paymentMethod: 'COD' | 'VIETQR' | 'CARD';
    shippingAddress: ShippingAddress;
  }) => BuyerOrder;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Danh sách địa chỉ giao hàng mẫu ban đầu
export const DEFAULT_SHIPPING_ADDRESSES: ShippingAddress[] = [
  {
    id: 'addr-01',
    receiverName: 'Nguyễn Văn Mua',
    phone: '0988 123 456',
    addressLine: 'Số 18, Ngõ 86 Cầu Giấy',
    ward: 'Phường Quan Hoa',
    district: 'Quận Cầu Giấy',
    city: 'Hà Nội',
    label: 'NHÀ RIÊNG',
    isDefault: true
  },
  {
    id: 'addr-02',
    receiverName: 'Nguyễn Văn Mua (Văn Phòng Tech)',
    phone: '0912 345 678',
    addressLine: 'Tầng 5, Tòa Nhà Keangnam Landmark 72, Đường Phạm Hùng',
    ward: 'Phường Mễ Trì',
    district: 'Quận Nam Từ Liêm',
    city: 'Hà Nội',
    label: 'CƠ QUAN',
    isDefault: false
  }
];

// Danh sách tài khoản mặc định của hệ thống (Mật khẩu chuẩn: 123456)
export const INITIAL_USERS: Record<string, User> = {
  'admin@nextshop.vn': {
    id: 'usr-admin-01',
    name: 'Quản Trị Viên Tối Cao',
    email: 'admin@nextshop.vn',
    password: '123456',
    role: 'ADMIN',
    phone: '0901 888 999'
  },
  'seller@nextshop.vn': {
    id: 'usr-seller-01',
    name: 'Shop Gia Dụng Việt',
    email: 'seller@nextshop.vn',
    password: '123456',
    role: 'SELLER',
    phone: '0912 888 777',
    shopInfo: {
      shopName: 'Gia Dụng Thông Minh Việt',
      category: 'Gia Dụng & Bếp',
      isApproved: true,
      rating: 4.9,
      joinedDate: '10/11/2026'
    }
  },
  'customer@nextshop.vn': {
    id: 'usr-cust-01',
    name: 'Nguyễn Văn Mua',
    email: 'customer@nextshop.vn',
    password: '123456',
    role: 'CUSTOMER',
    phone: '0988 123 456',
    savedAddresses: DEFAULT_SHIPPING_ADDRESSES
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Quản lý Sổ địa chỉ người mua
  const [addresses, setAddresses] = useState<ShippingAddress[]>(DEFAULT_SHIPPING_ADDRESSES);

  // Quản lý Lịch sử đơn hàng của người mua
  const [buyerOrders, setBuyerOrders] = useState<BuyerOrder[]>([
    {
      id: 'ord-init-01',
      orderNumber: 'NX-2026-7842',
      items: [
        {
          product: {
            id: 'prod-01',
            title: 'Nồi Chiên Không Dầu Điện Tử Philips 6.5L HD9280/90 [Chính Hãng]',
            slug: 'noi-chien-khong-dau-philips-6-5l',
            brand: 'Philips',
            category: 'giadung',
            categoryName: 'Gia Dụng & Bếp',
            price: 1890000,
            originalPrice: 2850000,
            rating: 4.9,
            reviewsCount: 1420,
            icon: 'kitchen',
            image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
            inStock: true,
            deliveryTime: 'Giao hỏa tốc 2 giờ',
            bulletPoints: ['Dung tích cực lớn 6.5L', 'Công nghệ Rapid Air giảm 90% dầu mỡ']
          },
          quantity: 1,
          selectedVariant: 'Bản Tiêu Chuẩn 6.5L'
        }
      ],
      totalPrice: 1890000,
      shippingFee: 0,
      taxFee: 0,
      finalPrice: 1890000,
      paymentMethod: 'COD',
      shippingAddress: DEFAULT_SHIPPING_ADDRESSES[0],
      status: 'DELIVERED',
      createdAt: '12/11/2026 09:30',
      deliveryEstimate: 'Đã giao thành công lúc 11:25 ngày 12/11/2026'
    }
  ]);
  
  // Danh sách hồ sơ xin mở shop đang chờ duyệt
  const [pendingShops, setPendingShops] = useState<Array<ShopRegistrationRequest & { id: string; userEmail: string; status: 'PENDING' | 'APPROVED' | 'REJECTED'; createdAt: string }>>([
    {
      id: 'req-01',
      userEmail: 'customer@nextshop.vn',
      shopName: 'Thời Trang NextStreet Hub',
      category: 'thoitrang',
      phone: '0988 777 666',
      taxOrId: '0109988776',
      address: 'Số 25, Phố Huế, Hoàn Kiếm, Hà Nội',
      status: 'PENDING',
      createdAt: 'Hôm nay, 11:30'
    }
  ]);

  // Load session & dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('nextshop_auth_email');
      if (savedEmail && INITIAL_USERS[savedEmail]) {
        setCurrentUser(INITIAL_USERS[savedEmail]);
      } else {
        // Mặc định đăng nhập tài khoản Người mua thông thường
        setCurrentUser(INITIAL_USERS['customer@nextshop.vn']);
      }

      // Load địa chỉ đã lưu
      const savedAddresses = localStorage.getItem('nextshop_user_addresses');
      if (savedAddresses) {
        const parsed = JSON.parse(savedAddresses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed);
        }
      }

      // Load đơn hàng đã lưu
      const savedOrders = localStorage.getItem('nextshop_buyer_orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBuyerOrders(parsed);
        }
      }
    } catch {
      // Bỏ qua lỗi parsing localStorage
    }
  }, []);

  // Lưu addresses mỗi khi thay đổi
  const saveAddressesToStorage = (newList: ShippingAddress[]) => {
    setAddresses(newList);
    try {
      localStorage.setItem('nextshop_user_addresses', JSON.stringify(newList));
    } catch {
      // Ignored
    }
  };

  // Thêm địa chỉ mới
  const addShippingAddress = (newAddr: Omit<ShippingAddress, 'id'>): ShippingAddress => {
    const id = `addr-${Date.now()}`;
    const fullItem: ShippingAddress = { ...newAddr, id };

    let updatedList: ShippingAddress[];
    if (fullItem.isDefault || addresses.length === 0) {
      fullItem.isDefault = true;
      updatedList = [fullItem, ...addresses.map(a => ({ ...a, isDefault: false }))];
    } else {
      updatedList = [...addresses, fullItem];
    }

    saveAddressesToStorage(updatedList);
    return fullItem;
  };

  // Cập nhật địa chỉ
  const updateShippingAddress = (updatedAddr: ShippingAddress) => {
    let updatedList = addresses.map(a => a.id === updatedAddr.id ? updatedAddr : a);
    if (updatedAddr.isDefault) {
      updatedList = updatedList.map(a => a.id === updatedAddr.id ? a : { ...a, isDefault: false });
    }
    saveAddressesToStorage(updatedList);
  };

  // Xóa địa chỉ
  const deleteShippingAddress = (id: string) => {
    const filtered = addresses.filter(a => a.id !== id);
    // Nếu xóa mất địa chỉ mặc định, gán địa chỉ đầu tiên còn lại làm mặc định
    if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    saveAddressesToStorage(filtered);
  };

  // Đặt làm địa chỉ mặc định
  const setDefaultAddress = (id: string) => {
    const updated = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    saveAddressesToStorage(updated);
  };

  // Tạo đơn hàng mới cho Người mua
  const createBuyerOrder = (orderData: {
    items: CartItem[];
    totalPrice: number;
    shippingFee: number;
    taxFee?: number;
    voucherCode?: string;
    voucherDiscount?: number;
    finalPrice: number;
    paymentMethod: 'COD' | 'VIETQR' | 'CARD';
    shippingAddress: ShippingAddress;
  }): BuyerOrder => {
    const newOrder: BuyerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `NX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PENDING',
      createdAt: 'Vừa xong',
      deliveryEstimate: 'NextPass Hỏa Tốc: Dự kiến giao trong 2 giờ'
    };

    const updatedOrders = [newOrder, ...buyerOrders];
    setBuyerOrders(updatedOrders);
    try {
      localStorage.setItem('nextshop_buyer_orders', JSON.stringify(updatedOrders));
    } catch {
      // Ignored
    }

    return newOrder;
  };

  const login = (email: string, role?: UserRole, password?: string): boolean => {
    let user = INITIAL_USERS[email];
    if (!user) {
      // Tạo user mới nếu email chưa có
      user = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        password: password || '123456',
        role: role || 'CUSTOMER',
        phone: '0988 123 456'
      };
      INITIAL_USERS[email] = user;
    }
    setCurrentUser(user);
    try {
      localStorage.setItem('nextshop_auth_email', email);
    } catch {
      // Ignored
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('nextshop_auth_email');
    } catch {
      // Ignored
    }
  };

  const submitShopRegistration = (data: ShopRegistrationRequest) => {
    const newReq = {
      ...data,
      id: `req-${Date.now()}`,
      userEmail: currentUser?.email || 'customer@nextshop.vn',
      status: 'PENDING' as const,
      createdAt: 'Vừa xong'
    };
    setPendingShops(prev => [newReq, ...prev]);
  };

  const approveShop = (shopId: string) => {
    setPendingShops(prev => prev.map(s => {
      if (s.id === shopId) {
        // Nâng cấp quyền tài khoản người dùng đó thành SELLER
        const targetEmail = s.userEmail;
        if (INITIAL_USERS[targetEmail]) {
          INITIAL_USERS[targetEmail].role = 'SELLER';
          INITIAL_USERS[targetEmail].shopInfo = {
            shopName: s.shopName,
            category: s.category,
            isApproved: true,
            rating: 5.0,
            joinedDate: 'Vừa kích hoạt'
          };
          // Nếu user đang đăng nhập chính là người này, cập nhật role ngay
          if (currentUser?.email === targetEmail) {
            setCurrentUser({ ...INITIAL_USERS[targetEmail] });
          }
        }
        return { ...s, status: 'APPROVED' as const };
      }
      return s;
    }));
  };

  const rejectShop = (shopId: string) => {
    setPendingShops(prev => prev.map(s => s.id === shopId ? { ...s, status: 'REJECTED' as const } : s));
  };

  // Cập nhật thông tin hồ sơ cá nhân
  const updateUserProfile = (data: { name?: string; phone?: string; email?: string }) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        name: data.name !== undefined ? data.name : prev.name,
        phone: data.phone !== undefined ? data.phone : prev.phone,
        email: data.email !== undefined ? data.email : prev.email
      };
      if (INITIAL_USERS[prev.email]) {
        INITIAL_USERS[prev.email] = { ...INITIAL_USERS[prev.email], ...updated };
      }
      try {
        localStorage.setItem(`nextshop_user_${prev.id}`, JSON.stringify(updated));
      } catch {
        // Ignored
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      pendingShops,
      submitShopRegistration,
      approveShop,
      rejectShop,
      addresses,
      addShippingAddress,
      updateShippingAddress,
      deleteShippingAddress,
      setDefaultAddress,
      buyerOrders,
      updateUserProfile,
      createBuyerOrder
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
