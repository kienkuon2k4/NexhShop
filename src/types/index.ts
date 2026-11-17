export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface ShippingAddress {
  id: string;
  receiverName: string;
  phone: string;
  addressLine: string; // Số nhà, tên đường, ngõ, tòa nhà
  ward: string;        // Phường / Xã
  district: string;    // Quận / Huyện
  city: string;        // Tỉnh / Thành phố
  label: 'NHÀ RIÊNG' | 'CƠ QUAN' | 'KHÁC';
  isDefault: boolean;
}

export interface BuyerOrder {
  id: string;
  orderNumber: string;
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
  taxFee?: number;
  voucherDiscount?: number;
  voucherCode?: string;
  finalPrice: number;
  paymentMethod: 'COD' | 'VIETQR' | 'CARD';
  shippingAddress: ShippingAddress;
  status: 'PENDING' | 'PACKING' | 'SHIPPED' | 'DELIVERED';
  createdAt: string;
  deliveryEstimate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  savedAddresses?: ShippingAddress[];
  shopInfo?: {
    shopName: string;
    category: string;
    isApproved: boolean;
    rating: number;
    joinedDate: string;
  };
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: 'giadung' | 'thoitrang' | 'dientu' | 'phukien';
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  soldCountMonth?: string;
  isBestSeller?: boolean;
  isNextChoice?: boolean;
  icon: string;
  image?: string;
  gallery?: string[];
  shopeeMall?: boolean;
  inStock: boolean;
  stockQuantity?: number;
  deliveryTime: string;
  bulletPoints: string[];
  specifications?: { label: string; value: string }[];
  fullDescription?: string;
  sourcePlatform?: 'Shopee' | 'NextShop';
  sellerId?: string;
  variants?: {
    name: string;
    options: { label: string; price: number }[];
  };
  isSponsored?: boolean;
  boostBudgetDaily?: number;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  flashSaleSlot?: string;
}

export interface ShopVoucher {
  id: string;
  code: string;
  title: string;
  discountType: 'FIXED' | 'PERCENT';
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PAUSED';
}

export interface PromotionCampaign {
  id: string;
  productId: string;
  productTitle: string;
  productImage?: string;
  type: 'BOOST_TOP' | 'FLASH_SALE';
  budgetDaily?: number;
  spentAmount: number;
  impressionsCount: number;
  clicksCount: number;
  ordersCount: number;
  revenue: number;
  status: 'ACTIVE' | 'PAUSED' | 'SCHEDULED' | 'PENDING';
  startDate: string;
  flashSaleSlot?: string;
  flashSalePrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface SellerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  addressLabel?: 'NHÀ RIÊNG' | 'CƠ QUAN' | 'KHÁC';
  customerNote?: string;
  productTitle: string;
  productImage?: string;
  variant?: string;
  quantity: number;
  unitPrice?: number;
  totalPrice: number;
  shippingFee?: number;
  taxFee?: number;
  finalPrice?: number;
  status: 'PENDING' | 'PACKING' | 'SHIPPED' | 'DELIVERED';
  orderDate: string;
  paymentMethod?: 'COD' | 'VIETQR' | 'CARD';
  paymentStatus?: 'PAID' | 'UNPAID';
  shippingCarrier?: string;
  trackingCode?: string;
  items?: Array<{
    title: string;
    image?: string;
    quantity: number;
    price: number;
    variant?: string;
  }>;
}

export interface ShopRegistrationRequest {
  shopName: string;
  category: string;
  phone: string;
  taxOrId: string;
  address: string;
}
