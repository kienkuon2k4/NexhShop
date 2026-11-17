'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  PlusCircle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowLeft, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Edit3, 
  X, 
  Check,
  Upload,
  Image as ImageIcon,
  Star,
  Plus,
  Eye,
  Printer,
  MapPin,
  Phone,
  Truck,
  CreditCard,
  Megaphone,
  Zap,
  Sparkles,
  Tag,
  Flame,
  Percent,
  BarChart3,
  Copy,
  ShieldCheck,
  Calendar,
  MousePointerClick,
  ArrowUpRight,
  Activity,
  Download,
  Info,
  ChevronRight
} from 'lucide-react';
import { Product, SellerOrder, ShopVoucher, PromotionCampaign } from '@/types';
import { formatVND } from '@/utils/format';

interface DailyPerformanceStat {
  date: string;
  dayName: string;
  views: number;
  clicks: number;
  orders: number;
  revenue: number;
  cost: number;
}

const CAMPAIGN_ANALYTICS_DATA_30DAYS: DailyPerformanceStat[] = [
  { date: '17/10', dayName: 'Thứ 6', views: 820, clicks: 52, orders: 1, revenue: 1890000, cost: 18700 },
  { date: '18/10', dayName: 'Thứ 7', views: 1100, clicks: 76, orders: 2, revenue: 3780000, cost: 27400 },
  { date: '19/10', dayName: 'Chủ nhật', views: 1050, clicks: 71, orders: 2, revenue: 3780000, cost: 25600 },
  { date: '20/10', dayName: 'Thứ 2', views: 920, clicks: 61, orders: 1, revenue: 1890000, cost: 22000 },
  { date: '21/10', dayName: 'Thứ 3', views: 890, clicks: 58, orders: 1, revenue: 1890000, cost: 20900 },
  { date: '22/10', dayName: 'Thứ 4', views: 950, clicks: 64, orders: 2, revenue: 3780000, cost: 23000 },
  { date: '23/10', dayName: 'Thứ 5', views: 910, clicks: 59, orders: 1, revenue: 1890000, cost: 21200 },
  { date: '24/10', dayName: 'Thứ 6', views: 1150, clicks: 80, orders: 2, revenue: 3780000, cost: 28800 },
  { date: '25/10', dayName: 'Thứ 7', views: 1320, clicks: 95, orders: 3, revenue: 5670000, cost: 34200 },
  { date: '26/10', dayName: 'Chủ nhật', views: 1280, clicks: 90, orders: 2, revenue: 3780000, cost: 32400 },
  { date: '27/10', dayName: 'Thứ 2', views: 960, clicks: 66, orders: 2, revenue: 3780000, cost: 23800 },
  { date: '28/10', dayName: 'Thứ 3', views: 990, clicks: 69, orders: 1, revenue: 1890000, cost: 24800 },
  { date: '29/10', dayName: 'Thứ 4', views: 1040, clicks: 73, orders: 2, revenue: 3780000, cost: 26300 },
  { date: '30/10', dayName: 'Thứ 5', views: 980, clicks: 67, orders: 1, revenue: 1890000, cost: 24100 },
  { date: '31/10', dayName: 'Thứ 6', views: 1180, clicks: 84, orders: 2, revenue: 3780000, cost: 30200 },
  { date: '01/11', dayName: 'Thứ 7', views: 1360, clicks: 99, orders: 3, revenue: 5670000, cost: 35600 },
  { date: '02/11', dayName: 'Chủ nhật', views: 1290, clicks: 92, orders: 2, revenue: 3780000, cost: 33100 },
  { date: '03/11', dayName: 'Thứ 2', views: 1010, clicks: 70, orders: 2, revenue: 3780000, cost: 25200 },
  { date: '04/11', dayName: 'Thứ 3', views: 1060, clicks: 75, orders: 2, revenue: 3780000, cost: 27000 },
  { date: '05/11', dayName: 'Thứ 4', views: 1120, clicks: 81, orders: 2, revenue: 3780000, cost: 29200 },
  { date: '06/11', dayName: 'Thứ 5', views: 1030, clicks: 71, orders: 1, revenue: 1890000, cost: 25600 },
  { date: '07/11', dayName: 'Thứ 6', views: 1250, clicks: 89, orders: 2, revenue: 3780000, cost: 32000 },
  { date: '08/11', dayName: 'Thứ 7', views: 1420, clicks: 104, orders: 3, revenue: 5670000, cost: 37400 },
  // 7 ngày gần nhất (Khớp số liệu tổng: 9240 views, 680 clicks, 18 đơn, 34.020.000₫ GMV, 245.000₫ cost)
  { date: '09/11', dayName: 'Chủ nhật', views: 1120, clicks: 82, orders: 2, revenue: 3780000, cost: 29500 },
  { date: '10/11', dayName: 'Thứ 2', views: 1250, clicks: 94, orders: 3, revenue: 5670000, cost: 33800 },
  { date: '11/11', dayName: 'Thứ 3', views: 1480, clicks: 112, orders: 3, revenue: 5670000, cost: 40300 },
  { date: '12/11', dayName: 'Thứ 4', views: 1190, clicks: 88, orders: 2, revenue: 3780000, cost: 31700 },
  { date: '13/11', dayName: 'Thứ 5', views: 1340, clicks: 98, orders: 3, revenue: 5670000, cost: 35300 },
  { date: '14/11', dayName: 'Thứ 6', views: 1620, clicks: 124, orders: 4, revenue: 7560000, cost: 44600 },
  { date: '15/11', dayName: 'Hôm nay', views: 1240, clicks: 82, orders: 1, revenue: 1890000, cost: 29800 }
];

interface SellerDashboardProps {
  shopName: string;
  products: Product[];
  onAddNewProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onBackToMarketplace: () => void;
  onOpenLoginModal?: () => void;
  onToggleSponsoredProduct?: (productId: string, isSponsored: boolean, budget?: number) => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  shopName,
  products,
  onAddNewProduct,
  onUpdateProduct,
  onDeleteProduct,
  onBackToMarketplace,
  onOpenLoginModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add' | 'orders' | 'marketing'>('overview');
  const [marketingSubTab, setMarketingSubTab] = useState<'boost' | 'flashsale' | 'vouchers'>('boost');

  // Marketing: Đẩy Top tìm kiếm (Sponsored Ads)
  const [boostCampaigns, setBoostCampaigns] = useState<PromotionCampaign[]>([
    {
      id: 'boost-1',
      productId: products[0]?.id || 'shopee-philips-hd9280',
      productTitle: products[0]?.title || 'Nồi Chiên Không Dầu Điện Tử Philips 6.5L',
      productImage: products[0]?.image || 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80',
      type: 'BOOST_TOP',
      budgetDaily: 50000,
      spentAmount: 245000,
      impressionsCount: 9240,
      clicksCount: 680,
      ordersCount: 18,
      revenue: 34020000,
      status: 'ACTIVE',
      startDate: '01/11/2026'
    }
  ]);
  const [isCreateBoostModalOpen, setIsCreateBoostModalOpen] = useState(false);
  const [boostProductId, setBoostProductId] = useState(products[0]?.id || '');
  const [boostBudget, setBoostBudget] = useState('50000');

  // State xem chi tiết hiệu quả chiến dịch (Biểu đồ lưu lượng & lượng đơn)
  const [selectedCampaignDetail, setSelectedCampaignDetail] = useState<PromotionCampaign | null>(null);
  const [chartTimeframe, setChartTimeframe] = useState<'7days' | '14days' | '30days'>('7days');
  const [chartMetric, setChartMetric] = useState<'both' | 'traffic' | 'orders'>('both');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);

  // Dữ liệu biểu đồ theo khung thời gian đã chọn
  const currentChartData = React.useMemo(() => {
    if (chartTimeframe === '7days') return CAMPAIGN_ANALYTICS_DATA_30DAYS.slice(-7);
    if (chartTimeframe === '14days') return CAMPAIGN_ANALYTICS_DATA_30DAYS.slice(-14);
    return CAMPAIGN_ANALYTICS_DATA_30DAYS;
  }, [chartTimeframe]);

  // Tổng hợp chỉ số hiệu quả chiến dịch
  const campaignTotals = React.useMemo(() => {
    const totalViews = currentChartData.reduce((acc, curr) => acc + curr.views, 0);
    const totalClicks = currentChartData.reduce((acc, curr) => acc + curr.clicks, 0);
    const totalOrders = currentChartData.reduce((acc, curr) => acc + curr.orders, 0);
    const totalRevenue = currentChartData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalCost = currentChartData.reduce((acc, curr) => acc + curr.cost, 0);
    const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : '0';
    const cvr = totalClicks > 0 ? ((totalOrders / totalClicks) * 100).toFixed(2) : '0';
    const roas = totalCost > 0 ? (totalRevenue / totalCost).toFixed(1) : '0';
    const avgCpc = totalClicks > 0 ? Math.round(totalCost / totalClicks) : 0;
    return { totalViews, totalClicks, totalOrders, totalRevenue, totalCost, ctr, cvr, roas, avgCpc };
  }, [currentChartData]);

  // Marketing: Flash Sale
  const [flashSaleRegistrations, setFlashSaleRegistrations] = useState([
    {
      id: 'fs-reg-1',
      productId: products[0]?.id || 'shopee-philips-hd9280',
      productTitle: products[0]?.title || 'Nồi Chiên Không Dầu Điện Tử Philips 6.5L',
      productImage: products[0]?.image || 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80',
      slotName: '⚡ Flash Sale Giờ Vàng 12:00 - 14:00 (Hôm nay)',
      originalPrice: 1890000,
      flashPrice: 1590000,
      discountPercent: 16,
      quantityCommitted: 20,
      soldCount: 14,
      status: 'APPROVED' as 'APPROVED' | 'PENDING'
    }
  ]);
  const [isRegisterFsModalOpen, setIsRegisterFsModalOpen] = useState(false);
  const [fsProductId, setFsProductId] = useState(products[0]?.id || '');
  const [fsSlot, setFsSlot] = useState('⚡ Flash Sale Giờ Vàng 12:00 - 14:00 (Hôm nay)');
  const [fsPrice, setFsPrice] = useState('');
  const [fsQuantity, setFsQuantity] = useState('10');

  // Marketing: Vouchers
  const [sellerVouchers, setSellerVouchers] = useState<ShopVoucher[]>([
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
      id: 'vch-4',
      code: 'GIADUNG20K',
      title: 'Giảm 20.000₫ đơn từ 200k',
      discountType: 'FIXED',
      discountValue: 20000,
      minOrderValue: 200000,
      usageLimit: 300,
      usedCount: 142,
      startDate: '05/11/2026',
      endDate: '25/11/2026',
      status: 'ACTIVE'
    }
  ]);
  const [isCreateVoucherModalOpen, setIsCreateVoucherModalOpen] = useState(false);
  const [vchCode, setVchCode] = useState('');
  const [vchTitle, setVchTitle] = useState('');
  const [vchType, setVchType] = useState<'FIXED' | 'PERCENT'>('FIXED');
  const [vchValue, setVchValue] = useState('50000');
  const [vchMinOrder, setVchMinOrder] = useState('300000');
  const [vchLimit, setVchLimit] = useState('100');

  // Chỉnh sửa sản phẩm state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<'giadung' | 'thoitrang' | 'dientu' | 'phukien'>('giadung');
  const [editPrice, setEditPrice] = useState('');
  const [editOriginalPrice, setEditOriginalPrice] = useState('');
  const [editStock, setEditStock] = useState('50');
  const [editBullets, setEditBullets] = useState('');
  const [editShopeeMall, setEditShopeeMall] = useState(true);
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editNewImageUrl, setEditNewImageUrl] = useState('');

  // Form đăng sản phẩm mới
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'giadung' | 'thoitrang' | 'dientu' | 'phukien'>('giadung');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('50');
  const [newProdBullets, setNewProdBullets] = useState('Chính hãng bảo hành 24 tháng\nTiết kiệm năng lượng chuẩn 5 sao');
  const [newProdImages, setNewProdImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
  ]);
  const [newProdImageUrl, setNewProdImageUrl] = useState('');

  // State modal xem chi tiết đơn hàng
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<SellerOrder | null>(null);

  // Mẫu đơn hàng của shop kèm đầy đủ thông tin chi tiết
  const [orders, setOrders] = useState<SellerOrder[]>([
    {
      id: 'ord-101',
      orderNumber: 'NX-ORD-9021',
      customerName: 'Hoàng Văn Tuấn',
      customerPhone: '0988 567 890',
      customerAddress: 'Số 18, Ngõ 86 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội',
      addressLabel: 'NHÀ RIÊNG',
      customerNote: 'Giao trong giờ hành chính, gọi điện trước khi giao 10 phút để nhận hàng.',
      productTitle: 'Nồi Chiên Không Dầu Điện Tử Philips 6.5L HD9280/90 [Chính Hãng]',
      productImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
      variant: 'Bản Tiêu Chuẩn 6.5L',
      quantity: 1,
      unitPrice: 1890000,
      totalPrice: 1890000,
      shippingFee: 0,
      taxFee: 0,
      finalPrice: 1890000,
      status: 'PENDING',
      orderDate: 'Hôm nay, 10:20',
      paymentMethod: 'COD',
      paymentStatus: 'UNPAID',
      shippingCarrier: 'NextPass Hỏa Tốc (2 giờ)',
      trackingCode: 'NP-VN-902188',
      items: [
        {
          title: 'Nồi Chiên Không Dầu Điện Tử Philips 6.5L HD9280/90 [Chính Hãng]',
          image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
          quantity: 1,
          price: 1890000,
          variant: 'Bản Tiêu Chuẩn 6.5L'
        }
      ]
    },
    {
      id: 'ord-102',
      orderNumber: 'NX-ORD-9018',
      customerName: 'Nguyễn Thị Mai',
      customerPhone: '0912 345 999',
      customerAddress: 'Tầng 12, Tòa Nhà Keangnam Landmark 72, Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
      addressLabel: 'CƠ QUAN',
      customerNote: 'Gửi lễ tân sảnh B tầng 1 nếu không nghe máy.',
      productTitle: 'Nồi Chiên Không Dầu Điện Tử Philips 6.5L HD9280/90 [Chính Hãng]',
      productImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
      variant: 'Bản Tiêu Chuẩn 6.5L',
      quantity: 2,
      unitPrice: 1890000,
      totalPrice: 3780000,
      shippingFee: 0,
      taxFee: 0,
      finalPrice: 3780000,
      status: 'PACKING',
      orderDate: 'Hôm nay, 08:45',
      paymentMethod: 'VIETQR',
      paymentStatus: 'PAID',
      shippingCarrier: 'NextPass Hỏa Tốc (2 giờ)',
      trackingCode: 'NP-VN-901842',
      items: [
        {
          title: 'Nồi Chiên Không Dầu Điện Tử Philips 6.5L HD9280/90 [Chính Hãng]',
          image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
          quantity: 2,
          price: 1890000,
          variant: 'Bản Tiêu Chuẩn 6.5L'
        }
      ]
    },
    {
      id: 'ord-103',
      orderNumber: 'NX-ORD-8994',
      customerName: 'Lê Quốc Bảo',
      customerPhone: '0977 888 234',
      customerAddress: 'Số 45, Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      addressLabel: 'NHÀ RIÊNG',
      customerNote: 'Hàng dễ vỡ, xin đóng gói cẩn thận giúp shop.',
      productTitle: 'Củ Sạc Nhanh Anker GaN 65W 3 Cổng Type-C [Chính Hãng]',
      productImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
      variant: 'Màu Đen Nhám',
      quantity: 1,
      unitPrice: 890000,
      totalPrice: 890000,
      shippingFee: 0,
      taxFee: 0,
      finalPrice: 890000,
      status: 'SHIPPED',
      orderDate: 'Hôm qua, 16:30',
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      shippingCarrier: 'NextPass Express Hỏa Tốc',
      trackingCode: 'NP-VN-899455',
      items: [
        {
          title: 'Củ Sạc Nhanh Anker GaN 65W 3 Cổng Type-C [Chính Hãng]',
          image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
          quantity: 1,
          price: 890000,
          variant: 'Màu Đen Nhám'
        }
      ]
    }
  ]);

  // Các hàm xử lý hình ảnh (Thêm từ file, thêm từ link, xóa ảnh, đổi ảnh bìa)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          if (isEdit) {
            setEditImages(prev => [...prev, dataUrl]);
          } else {
            setNewProdImages(prev => [...prev, dataUrl]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleAddImageUrl = (url: string, isEdit: boolean) => {
    if (!url.trim()) return;
    if (isEdit) {
      setEditImages(prev => [...prev, url.trim()]);
      setEditNewImageUrl('');
    } else {
      setNewProdImages(prev => [...prev, url.trim()]);
      setNewProdImageUrl('');
    }
  };

  const handleRemoveImage = (indexToRemove: number, isEdit: boolean) => {
    if (isEdit) {
      setEditImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    } else {
      setNewProdImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  const handleSetPrimaryImage = (indexToPrimary: number, isEdit: boolean) => {
    if (isEdit) {
      setEditImages(prev => {
        const target = prev[indexToPrimary];
        const rest = prev.filter((_, idx) => idx !== indexToPrimary);
        return [target, ...rest];
      });
    } else {
      setNewProdImages(prev => {
        const target = prev[indexToPrimary];
        const rest = prev.filter((_, idx) => idx !== indexToPrimary);
        return [target, ...rest];
      });
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle || !newProdPrice) return;

    const categoryNames: Record<string, string> = {
      giadung: 'Gia Dụng & Bếp',
      thoitrang: 'Thời Trang & Sneaker',
      dientu: 'Điện Tử & Phụ Kiện',
      phukien: 'Balo & Phụ Kiện'
    };

    const iconsMap: Record<string, string> = {
      giadung: 'kitchen',
      thoitrang: 'shoe',
      dientu: 'headphones',
      phukien: 'briefcase'
    };

    const primaryImg = newProdImages.length > 0 
      ? newProdImages[0] 
      : 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80';

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: newProdTitle.trim(),
      slug: newProdTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      brand: shopName,
      category: newProdCategory,
      categoryName: categoryNames[newProdCategory],
      price: parseFloat(newProdPrice),
      originalPrice: parseFloat(newProdPrice) * 1.25,
      rating: 5.0,
      reviewsCount: 1,
      soldCountMonth: 'Mới ra mắt',
      isBestSeller: false,
      isNextChoice: false,
      icon: iconsMap[newProdCategory],
      image: primaryImg,
      gallery: newProdImages.length > 0 ? newProdImages : [primaryImg],
      shopeeMall: true,
      inStock: true,
      stockQuantity: parseInt(newProdStock, 10) || 50,
      deliveryTime: 'Giao hỏa tốc 2 giờ',
      bulletPoints: newProdBullets.split('\n').filter(b => b.trim() !== '')
    };

    onAddNewProduct(newProd);
    alert(`Đã đăng thành công sản phẩm "${newProdTitle}" lên sàn NextShop!`);
    setNewProdTitle('');
    setNewProdPrice('');
    setNewProdImages(['https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80']);
    setActiveTab('products');
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProductId(p.id);
    setEditTitle(p.title);
    setEditCategory((p.category as any) || 'giadung');
    setEditPrice(p.price.toString());
    setEditOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setEditStock(p.stockQuantity ? p.stockQuantity.toString() : '50');
    setEditBullets(p.bulletPoints ? p.bulletPoints.join('\n') : '');
    setEditShopeeMall(p.shopeeMall ?? true);
    
    // Nạp ảnh hiện tại vào editImages
    const currentImgs = p.gallery && p.gallery.length > 0 
      ? [...p.gallery] 
      : (p.image ? [p.image] : []);
    setEditImages(currentImgs);
    setEditNewImageUrl('');

    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId || !editTitle.trim() || !editPrice) return;

    const existing = products.find(p => p.id === editingProductId);
    if (!existing) return;

    const categoryNames: Record<string, string> = {
      giadung: 'Gia Dụng & Bếp',
      thoitrang: 'Thời Trang & Sneaker',
      dientu: 'Điện Tử & Phụ Kiện',
      phukien: 'Balo & Phụ Kiện'
    };

    const primaryImg = editImages.length > 0 
      ? editImages[0] 
      : (existing.image || 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80');

    const updated: Product = {
      ...existing,
      title: editTitle.trim(),
      category: editCategory,
      categoryName: categoryNames[editCategory] || existing.categoryName,
      price: parseFloat(editPrice),
      originalPrice: editOriginalPrice ? parseFloat(editOriginalPrice) : undefined,
      stockQuantity: parseInt(editStock, 10) || 50,
      shopeeMall: editShopeeMall,
      bulletPoints: editBullets.split('\n').filter(b => b.trim() !== ''),
      image: primaryImg,
      gallery: editImages.length > 0 ? editImages : [primaryImg]
    };

    onUpdateProduct(updated);
    setIsEditModalOpen(false);
    setEditingProductId(null);
    alert(`Đã lưu thay đổi thông tin sản phẩm thành công!`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: SellerOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Handlers cho chức năng Marketing & Quảng Bá
  const handleToggleBoostStatus = (campaignId: string) => {
    setBoostCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const nextStatus = c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        const targetProd = products.find(p => p.id === c.productId);
        if (targetProd) {
          onUpdateProduct({
            ...targetProd,
            isSponsored: nextStatus === 'ACTIVE'
          });
        }
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleConfirmCreateBoost = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === boostProductId);
    if (!prod) return;

    const budgetNum = parseInt(boostBudget, 10) || 50000;
    const existingIndex = boostCampaigns.findIndex(c => c.productId === prod.id);

    if (existingIndex >= 0) {
      setBoostCampaigns(prev => prev.map((c, i) => i === existingIndex ? {
        ...c,
        budgetDaily: budgetNum,
        status: 'ACTIVE'
      } : c));
    } else {
      const newCamp: PromotionCampaign = {
        id: `boost-${Date.now()}`,
        productId: prod.id,
        productTitle: prod.title,
        productImage: prod.image,
        type: 'BOOST_TOP',
        budgetDaily: budgetNum,
        spentAmount: 0,
        impressionsCount: 0,
        clicksCount: 0,
        ordersCount: 0,
        revenue: 0,
        status: 'ACTIVE',
        startDate: new Date().toLocaleDateString('vi-VN')
      };
      setBoostCampaigns(prev => [newCamp, ...prev]);
    }

    onUpdateProduct({
      ...prod,
      isSponsored: true,
      boostBudgetDaily: budgetNum
    });

    setIsCreateBoostModalOpen(false);
    alert(`Đã kích hoạt Đẩy Top thành công cho sản phẩm "${prod.title.slice(0, 30)}..."! Sản phẩm đã được gắn huy hiệu [Tài Trợ] và ưu tiên vị trí cao nhất trên sàn.`);
  };

  const handleConfirmRegisterFlashSale = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === fsProductId);
    if (!prod) return;

    const salePriceNum = parseFloat(fsPrice) || Math.round(prod.price * 0.85);
    const qtyNum = parseInt(fsQuantity, 10) || 10;
    const discountPct = Math.round(((prod.price - salePriceNum) / prod.price) * 100);

    const newReg = {
      id: `fs-reg-${Date.now()}`,
      productId: prod.id,
      productTitle: prod.title,
      productImage: prod.image || '',
      slotName: fsSlot,
      originalPrice: prod.price,
      flashPrice: salePriceNum,
      discountPercent: discountPct,
      quantityCommitted: qtyNum,
      soldCount: 0,
      status: 'APPROVED' as 'APPROVED' | 'PENDING'
    };

    setFlashSaleRegistrations(prev => [newReg, ...prev]);
    setIsRegisterFsModalOpen(false);
    setFsPrice('');
    alert(`Đăng ký Flash Sale thành công cho "${prod.title.slice(0, 30)}..."! Khung giờ: ${fsSlot}.`);
  };

  const handleConfirmCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vchCode.trim() || !vchTitle.trim()) {
      alert('Vui lòng điền mã voucher và tên chương trình!');
      return;
    }

    const newVoucher: ShopVoucher = {
      id: `vch-${Date.now()}`,
      code: vchCode.trim().toUpperCase(),
      title: vchTitle.trim(),
      discountType: vchType,
      discountValue: parseFloat(vchValue) || 20000,
      minOrderValue: parseFloat(vchMinOrder) || 200000,
      usageLimit: parseInt(vchLimit, 10) || 100,
      usedCount: 0,
      startDate: new Date().toLocaleDateString('vi-VN'),
      endDate: '31/12/2026',
      status: 'ACTIVE'
    };

    setSellerVouchers(prev => [newVoucher, ...prev]);
    setIsCreateVoucherModalOpen(false);
    setVchCode('');
    setVchTitle('');
    alert(`Tạo mã Voucher "${newVoucher.code}" thành công! Khách hàng có thể nhập mã này tại bước thanh toán.`);
  };

  const handleToggleVoucherStatus = (voucherId: string) => {
    setSellerVouchers(prev => prev.map(v => v.id === voucherId ? {
      ...v,
      status: v.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE'
    } : v));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 text-xs">
      
      {/* Top Seller Bar */}
      <header className="bg-[#1f2735] text-white px-5 py-3 flex items-center justify-between border-b border-slate-700 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToMarketplace}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang mua hàng</span>
          </button>

          <div className="h-5 w-px bg-slate-700 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white">{shopName}</span>
              <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                NextSeller Đối Tác
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden md:inline">Đánh giá gian hàng: <strong className="text-amber-400 font-bold">4.9/5.0 ★</strong></span>
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-amber-400 font-bold border border-slate-600">
            S
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1400px] w-full mx-auto px-4 py-6 flex-1 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Doanh số tháng này</span>
              <div className="text-2xl font-black text-slate-900 mt-1">48.950.000 ₫</div>
              <span className="text-emerald-600 text-[11px] font-bold mt-1 block">↑ +18.4% so với tháng trước</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Đơn hàng cần xử lý</span>
              <div className="text-2xl font-black text-rose-600 mt-1">
                {orders.filter(o => o.status === 'PENDING').length} Đơn
              </div>
              <span className="text-slate-400 text-[11px] mt-1 block">Giao hỏa tốc NextPass 2h</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Sản phẩm đang bán</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{products.length} SKU</div>
              <span className="text-emerald-600 text-[11px] font-bold mt-1 block">Kho hàng hoạt động ổn định</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Tỷ lệ hủy đơn hàng</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">0.2%</div>
              <span className="text-slate-400 text-[11px] mt-1 block">Đạt chuẩn Shop Xuất Sắc</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-6 pt-4 gap-6 shadow-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Tổng Quan Hiệu Quả</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'products'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Danh Sách Sản Phẩm ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'add'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Đăng Sản Phẩm Mới</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quản Lý Đơn Hàng ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('marketing')}
            className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'marketing'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-500" />
            <span>Quảng Bá & Khuyến Mãi</span>
            <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full shadow-xs">
              Mới
            </span>
          </button>
        </div>

        {/* TAB 1: TỔNG QUAN HIỆU SUẤT GIAN HÀNG */}
        {activeTab === 'overview' && (
          <div className="bg-white p-6 rounded-b-2xl border-x border-b border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-base text-slate-900">Chiến dịch Flash Deals của sàn</h2>
                <p className="text-slate-500 text-[11px]">Sản phẩm được đẩy lên khối 4 ô Deal chớp nhoáng trang chủ khi có ưu đãi từ 15%</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                Đang tham gia 3 sản phẩm
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-700">Tốc độ chuẩn bị đơn (SLA NextPass):</span>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-2.5 rounded-full w-[94%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Trung bình: 18 phút/đơn</span>
                  <span className="font-bold text-emerald-600">Đạt 94% chuẩn hỏa tốc 2h</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-700">Tỷ lệ giữ chân khách hàng (Khách mua lại):</span>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-amber-500 h-2.5 rounded-full w-[68%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Đánh giá 5 sao: 98%</span>
                  <span className="font-bold text-amber-600">Top 5% gian hàng uy tín</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DANH SÁCH SẢN PHẨM (PRODUCTS LISTING) */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-b-2xl border-x border-b border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-base text-slate-900">Danh Mục Sản Phẩm Đang Bán</h2>
                <p className="text-slate-500 text-[11px]">Quản lý kho hàng, cập nhật giá bán, hình ảnh và kiểm tra đánh giá khách hàng</p>
              </div>

              <button
                onClick={() => setActiveTab('add')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Thêm sản phẩm mới</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                    <th className="py-3 px-3">SẢN PHẨM</th>
                    <th className="py-3 px-3">NGÀNH HÀNG</th>
                    <th className="py-3 px-3">GIÁ BÁN</th>
                    <th className="py-3 px-3">ĐÁNH GIÁ</th>
                    <th className="py-3 px-3">TRẠNG THÁI</th>
                    <th className="py-3 px-3 text-right">TÁC VỤ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 max-w-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={p.image || 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80'} 
                              alt={p.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate" title={p.title}>{p.title}</div>
                            <div className="text-[10px] text-slate-400">SKU: {p.id} &bull; {p.gallery ? p.gallery.length : 1} ảnh</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{p.categoryName}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{formatVND(p.price)}</td>
                      <td className="py-3 px-3 text-amber-500 font-bold">★ {p.rating} ({p.reviewsCount})</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                          Đang bán
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => handleOpenEdit(p)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition cursor-pointer flex items-center gap-1 font-bold text-[11px] shadow-2xs"
                            title="Chỉnh sửa thông tin & hình ảnh sản phẩm"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                            <span>Sửa</span>
                          </button>

                          <button 
                            onClick={() => {
                              if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${p.title}" không?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition cursor-pointer shadow-2xs"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ĐĂNG SẢN PHẨM MỚI (ADD PRODUCT) */}
        {activeTab === 'add' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-bold text-base text-slate-900">Đăng sản phẩm mới lên sàn NextShop</h2>
              <p className="text-slate-500 text-[11px] mt-0.5">Sản phẩm sau khi đăng sẽ xuất hiện ngay trên trang chủ và bộ tìm kiếm của khách hàng</p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên sản phẩm đầy đủ *</label>
                <input 
                  type="text" 
                  required
                  value={newProdTitle}
                  onChange={(e) => setNewProdTitle(e.target.value)}
                  placeholder="VD: Máy Xay Sinh Tố Cầm Tay Đa Năng 500W..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none font-medium bg-slate-50 focus:bg-white transition"
                />
              </div>

              {/* QUẢN LÝ HÌNH ẢNH KHI THÊM MỚI */}
              <div className="space-y-2 border border-slate-200 p-3.5 rounded-2xl bg-slate-50/70">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    <span>Hình ảnh sản phẩm ({newProdImages.length} ảnh) *</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Ảnh đầu tiên là ảnh bìa chính
                  </span>
                </div>

                {/* Preview Thumbnail Grid */}
                {newProdImages.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
                    {newProdImages.map((imgUrl, idx) => (
                      <div 
                        key={idx} 
                        className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white aspect-square flex items-center justify-center shadow-2xs"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={imgUrl} 
                          alt={`Ảnh ${idx + 1}`} 
                          className="w-full h-full object-cover"
                        />

                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-black text-[8px] px-1.5 py-0.5 rounded shadow-xs">
                            Ảnh bìa
                          </span>
                        )}

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1.5 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx, false)}
                              className="p-1 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-[9px] cursor-pointer"
                              title="Đặt làm ảnh bìa chính"
                            >
                              <Star className="w-3 h-3 fill-slate-950" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, false)}
                            className="p-1 rounded-lg bg-rose-600 text-white hover:bg-rose-500 font-bold text-[9px] cursor-pointer"
                            title="Xóa bớt ảnh này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 bg-white">
                    Chưa có ảnh nào. Vui lòng tải ảnh lên từ máy tính hoặc dán link ảnh.
                  </div>
                )}

                {/* Input Controls Thêm ảnh */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <label className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition shrink-0 shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tải ảnh từ máy tính</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      onChange={(e) => handleImageFileUpload(e, false)}
                      className="hidden" 
                    />
                  </label>

                  <div className="flex-1 flex gap-1.5">
                    <input 
                      type="url" 
                      value={newProdImageUrl}
                      onChange={(e) => setNewProdImageUrl(e.target.value)}
                      placeholder="Hoặc dán URL link ảnh vào đây..."
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none text-xs font-medium bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddImageUrl(newProdImageUrl, false)}
                      disabled={!newProdImageUrl.trim()}
                      className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs cursor-pointer transition shrink-0"
                    >
                      + Thêm
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ngành hàng *</label>
                  <select 
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium bg-white"
                  >
                    <option value="giadung">🍳 Gia Dụng & Bếp</option>
                    <option value="thoitrang">👗 Thời Trang & Sneaker</option>
                    <option value="dientu">📱 Điện Tử & Phụ Kiện</option>
                    <option value="phukien">🎒 Balo & Du Lịch</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Giá bán (VNĐ) *</label>
                  <input 
                    type="number" 
                    step="1000"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="VD: 450000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Số lượng tồn kho ban đầu</label>
                <input 
                  type="number" 
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Đặc điểm nổi bật (Mỗi dòng 1 gạch đầu dòng)</label>
                <textarea 
                  rows={4}
                  value={newProdBullets}
                  onChange={(e) => setNewProdBullets(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium text-slate-800 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold transition cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md transition cursor-pointer"
                >
                  Đăng Sản Phẩm Lên Sàn
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: QUẢN LÝ ĐƠN HÀNG (ORDERS) */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-b-2xl border-x border-b border-slate-200 shadow-xs space-y-4">
            <h2 className="font-bold text-base text-slate-900">Đơn hàng cần xử lý</h2>

            <div className="space-y-3">
              {orders.map(o => (
                <div key={o.id} className="p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-300 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold">{o.orderNumber}</strong>
                      <span className="text-slate-400 text-[11px]">&bull; {o.orderDate}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        o.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                        o.status === 'PACKING' ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {o.status === 'PENDING' && 'Chờ đóng gói'}
                        {o.status === 'PACKING' && 'Đang chuẩn bị hàng'}
                        {o.status === 'SHIPPED' && 'Đã bàn giao NextPass'}
                      </span>
                    </div>

                    <p className="text-slate-700 font-semibold text-xs">
                      {o.productTitle} <span className="text-slate-400 font-normal">x{o.quantity}</span>
                    </p>

                    <div className="text-[11px] text-slate-500">
                      Khách hàng: <strong className="text-slate-700">{o.customerName}</strong> &bull; Tổng tiền: <strong className="text-rose-700 font-bold">{formatVND(o.totalPrice)}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedOrderDetail(o)}
                      className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Xem Chi Tiết</span>
                    </button>

                    {o.status === 'PENDING' && (
                      <button 
                        onClick={() => handleUpdateOrderStatus(o.id, 'PACKING')}
                        className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition cursor-pointer"
                      >
                        Xác Nhận & Đóng Gói
                      </button>
                    )}

                    {o.status === 'PACKING' && (
                      <button 
                        onClick={() => handleUpdateOrderStatus(o.id, 'SHIPPED')}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition cursor-pointer"
                      >
                        Bàn Giao Shipper 2H
                      </button>
                    )}

                    {o.status === 'SHIPPED' && (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đang giao hỏa tốc
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: QUẢNG BÁ & KHUYẾN MÃI (MARKETING HUB) */}
        {activeTab === 'marketing' && (
          <div className="bg-white p-6 rounded-b-2xl border-x border-b border-slate-200 shadow-xs space-y-6">
            
            {/* Header Marketing Hub */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 rounded-2xl border border-amber-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-400 text-slate-950 font-black">
                    <Megaphone className="w-4 h-4" />
                  </span>
                  <h2 className="text-base font-black text-slate-900">
                    Trung Tâm Quảng Bá & Marketing NextSeller
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-xs">
                    Phiên bản 2.0
                  </span>
                </div>
                <p className="text-slate-600 text-xs">
                  Chủ động thu hút khách hàng, kích hoạt huy hiệu <strong>[Tài Trợ]</strong>, bùng nổ đơn hàng với Đẩy Top tìm kiếm, Flash Sale sàn và Voucher khuyến mãi.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {marketingSubTab === 'boost' && (
                  <button
                    onClick={() => {
                      setBoostProductId(products[0]?.id || '');
                      setIsCreateBoostModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>+ Tạo Chiến Dịch Đẩy Top</span>
                  </button>
                )}

                {marketingSubTab === 'flashsale' && (
                  <button
                    onClick={() => {
                      setFsProductId(products[0]?.id || '');
                      setIsRegisterFsModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <Flame className="w-4 h-4" />
                    <span>+ Đăng Ký Sản Phẩm Vào Flash Sale</span>
                  </button>
                )}

                {marketingSubTab === 'vouchers' && (
                  <button
                    onClick={() => {
                      setVchCode('');
                      setVchTitle('');
                      setIsCreateVoucherModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <Tag className="w-4 h-4" />
                    <span>+ Tạo Mã Giảm Giá Mới</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4 Cards Hiệu Quả Marketing */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="text-slate-500 font-medium block">Lượt hiển thị tài trợ</span>
                <div className="text-xl font-black text-slate-900 mt-1">18.450</div>
                <span className="text-emerald-600 text-[10px] font-bold mt-0.5 block">↑ +24.5% so với tuần trước</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="text-slate-500 font-medium block">Lượt click sản phẩm</span>
                <div className="text-xl font-black text-slate-900 mt-1">1.280</div>
                <span className="text-slate-500 text-[10px] font-semibold mt-0.5 block">CTR trung bình: <strong>6.94%</strong></span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="text-slate-500 font-medium block">Doanh thu từ Marketing</span>
                <div className="text-xl font-black text-rose-700 mt-1">18.900.000 ₫</div>
                <span className="text-emerald-600 text-[10px] font-bold mt-0.5 block">Tỷ suất ROI: 29.1x</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <span className="text-slate-500 font-medium block">Chi phí Ads đã tiêu</span>
                <div className="text-xl font-black text-amber-600 mt-1">650.000 ₫</div>
                <span className="text-slate-400 text-[10px] mt-0.5 block">Ngân sách tối ưu thông minh</span>
              </div>
            </div>

            {/* Sub-tab Pills */}
            <div className="flex border-b border-slate-200 gap-2 pb-2 overflow-x-auto custom-scroll">
              <button
                onClick={() => setMarketingSubTab('boost')}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  marketingSubTab === 'boost'
                    ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>1. Đẩy Top Tìm Kiếm (Sponsored Ads)</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/60 text-slate-900 font-black">
                  {boostCampaigns.filter(c => c.status === 'ACTIVE').length} đang chạy
                </span>
              </button>

              <button
                onClick={() => setMarketingSubTab('flashsale')}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  marketingSubTab === 'flashsale'
                    ? 'bg-rose-600 text-white shadow-sm font-black'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>2. Đăng Ký Flash Sale Cùng Sàn</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white font-black">
                  {flashSaleRegistrations.length}
                </span>
              </button>

              <button
                onClick={() => setMarketingSubTab('vouchers')}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  marketingSubTab === 'vouchers'
                    ? 'bg-emerald-600 text-white shadow-sm font-black'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>3. Quản Lý Voucher Của Shop</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white font-black">
                  {sellerVouchers.length}
                </span>
              </button>
            </div>

            {/* SUBTAB 1 CONTENT: ĐẨY TOP TÌM KIẾM */}
            {marketingSubTab === 'boost' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-extrabold text-amber-950 text-xs">Lợi thế khi Đẩy Top Tìm Kiếm:</span>
                    <p className="text-amber-900/80 text-[11px] leading-relaxed">
                      Sản phẩm được kích hoạt sẽ xuất hiện với huy hiệu <strong>[Tài Trợ]</strong> sang trọng, luôn được thuật toán ưu tiên đẩy lên top trang chủ, danh mục và kết quả tìm kiếm. Khách hàng dễ tiếp cận và tỷ lệ chuyển đổi tăng 300%.
                    </p>
                  </div>
                </div>

                {/* Gợi ý theo dõi chiến dịch */}
                <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl flex items-center justify-between text-xs text-amber-950 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-4 h-4 text-amber-600" />
                    </div>
                    <span>
                      Nhấn vào nút <strong>&quot;Xem Chi Tiết&quot;</strong> hoặc bấm trực tiếp vào tên sản phẩm để theo dõi <strong>biểu đồ tương quan giữa lưu lượng truy cập (Clicks) và lượng đơn hàng chốt</strong> theo thời gian thực.
                    </span>
                  </div>
                  {boostCampaigns.length > 0 && (
                    <button
                      onClick={() => setSelectedCampaignDetail(boostCampaigns[0])}
                      className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition cursor-pointer shadow-xs shrink-0"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Xem Phân Tích Mẫu</span>
                    </button>
                  )}
                </div>

                {/* Danh sách chiến dịch Đẩy Top */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3.5">Sản Phẩm Đẩy Top</th>
                        <th className="p-3.5 text-center">Trạng Thái</th>
                        <th className="p-3.5 text-right">Ngân Sách / Ngày</th>
                        <th className="p-3.5 text-right">Lượt Xem (Views)</th>
                        <th className="p-3.5 text-right">Lượt Click</th>
                        <th className="p-3.5 text-right">Chi Phí Đã Tiêu</th>
                        <th className="p-3.5 text-center">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {boostCampaigns.map((camp) => (
                        <tr key={camp.id} className="hover:bg-amber-50/40 transition group">
                          <td className="p-3.5">
                            <div 
                              onClick={() => setSelectedCampaignDetail(camp)}
                              className="flex items-center gap-3 cursor-pointer group-hover:translate-x-0.5 transition"
                              title="Bấm để xem biểu đồ lưu lượng và hiệu quả chiến dịch"
                            >
                              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative group-hover:border-amber-400 transition">
                                {camp.productImage && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={camp.productImage} alt={camp.productTitle} className="w-full h-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                  <BarChart3 className="w-4 h-4 text-white drop-shadow" />
                                </div>
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 truncate max-w-xs group-hover:text-amber-800 transition">
                                  {camp.productTitle}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-slate-400">Bắt đầu: {camp.startDate}</span>
                                  <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5 group-hover:underline">
                                    <BarChart3 className="w-3 h-3" /> Xem biểu đồ hiệu quả
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                              camp.status === 'ACTIVE'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${camp.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                              {camp.status === 'ACTIVE' ? 'Đang Đẩy Top' : 'Tạm Dừng'}
                            </span>
                          </td>
                          <td className="p-3.5 text-right font-bold text-slate-900">
                            {formatVND(camp.budgetDaily || 50000)}/ngày
                          </td>
                          <td className="p-3.5 text-right font-semibold text-slate-700">
                            {camp.impressionsCount.toLocaleString('vi-VN')}
                          </td>
                          <td className="p-3.5 text-right font-bold text-amber-700">
                            {camp.clicksCount.toLocaleString('vi-VN')}
                          </td>
                          <td className="p-3.5 text-right font-black text-rose-700">
                            {formatVND(camp.spentAmount)}
                          </td>
                          <td className="p-3.5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setSelectedCampaignDetail(camp)}
                                className="px-3 py-1.5 rounded-xl font-bold text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition cursor-pointer flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95"
                                title="Xem biểu đồ lưu lượng truy cập và lượng đơn theo thời gian"
                              >
                                <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                                <span>Xem Chi Tiết</span>
                              </button>
                              <button
                                onClick={() => handleToggleBoostStatus(camp.id)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                                  camp.status === 'ACTIVE'
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs'
                                }`}
                              >
                                {camp.status === 'ACTIVE' ? 'Tạm Dừng' : 'Bật Lại'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUBTAB 2 CONTENT: FLASH SALE CÙNG SÀN */}
            {marketingSubTab === 'flashsale' && (
              <div className="space-y-5">
                {/* Banner Flash Sale Sắp Diễn Ra */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-rose-900 text-xs flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-rose-600" />
                        <span>⚡ Flash Sale Giờ Vàng 12:00 - 14:00 (Hôm nay)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
                        Đang mở đăng ký
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Ưu đãi từ 15% trở lên. Vị trí: Khối 4 ô Flash Deals trang chủ + hiển thị banner toàn sàn.
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Lượng truy cập dự kiến: <strong>50.000+</strong></span>
                      <button
                        onClick={() => {
                          setFsSlot('⚡ Flash Sale Giờ Vàng 12:00 - 14:00 (Hôm nay)');
                          setIsRegisterFsModalOpen(true);
                        }}
                        className="text-rose-700 hover:text-rose-900 font-extrabold underline cursor-pointer"
                      >
                        Đăng ký ngay &rarr;
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-indigo-950 text-xs flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-indigo-600" />
                        <span>🌙 Đêm Hội Mua Sắm 20:00 - 23:59 (Tối nay)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white">
                        Sắp diễn ra
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Ưu đãi từ 20% trở lên. Vị trí: Top 1 thanh trượt trang chủ + đẩy thông báo app NextShop.
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Lượng truy cập dự kiến: <strong>80.000+</strong></span>
                      <button
                        onClick={() => {
                          setFsSlot('🌙 Đêm Hội Mua Sắm 20:00 - 23:59 (Tối nay)');
                          setIsRegisterFsModalOpen(true);
                        }}
                        className="text-indigo-700 hover:text-indigo-900 font-extrabold underline cursor-pointer"
                      >
                        Đăng ký ngay &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bảng sản phẩm tham gia Flash Sale */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-900 flex justify-between items-center">
                    <span>Sản phẩm của Shop đã đăng ký tham gia Flash Sale</span>
                    <span className="text-slate-500 text-[11px] font-normal">
                      Tổng {flashSaleRegistrations.length} sản phẩm
                    </span>
                  </div>
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Sản Phẩm</th>
                        <th className="p-3.5">Khung Giờ Flash Sale</th>
                        <th className="p-3.5 text-right">Giá Gốc</th>
                        <th className="p-3.5 text-right">Giá Flash Sale</th>
                        <th className="p-3.5 text-center">SL Cam Kết</th>
                        <th className="p-3.5 text-center">Đã Bán</th>
                        <th className="p-3.5 text-center">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {flashSaleRegistrations.map((fs) => (
                        <tr key={fs.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                {fs.productImage && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={fs.productImage} alt={fs.productTitle} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <span className="font-bold text-slate-900 truncate max-w-xs">{fs.productTitle}</span>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-700 font-semibold">{fs.slotName}</td>
                          <td className="p-3.5 text-right text-slate-400 line-through">{formatVND(fs.originalPrice)}</td>
                          <td className="p-3.5 text-right font-black text-rose-700">
                            {formatVND(fs.flashPrice)}{' '}
                            <span className="text-amber-500 text-[10px]">(-{fs.discountPercent}%)</span>
                          </td>
                          <td className="p-3.5 text-center font-bold text-slate-800">{fs.quantityCommitted} sp</td>
                          <td className="p-3.5 text-center font-bold text-emerald-700">{fs.soldCount} sp</td>
                          <td className="p-3.5 text-center">
                            <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                              ✓ Đã Duyệt Tham Gia
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUBTAB 3 CONTENT: VOUCHER CỦA SHOP */}
            {marketingSubTab === 'vouchers' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                  <Tag className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-extrabold text-emerald-950 text-xs">Voucher Của Shop:</span>
                    <p className="text-emerald-900/80 text-[11px] leading-relaxed">
                      Mã giảm giá do chính Shop của bạn tài trợ. Khách hàng có thể nhập mã này trực tiếp tại giỏ hàng và màn hình thanh toán để được giảm trừ tiền hàng ngay lập tức!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sellerVouchers.map((v) => (
                    <div key={v.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 relative hover:border-amber-400 transition">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs tracking-wider flex items-center gap-1 shadow-xs">
                          <Tag className="w-3.5 h-3.5" />
                          <span>{v.code}</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          v.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {v.status === 'ACTIVE' ? 'Đang mở' : 'Tạm dừng'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{v.title}</h4>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          Đơn tối thiểu: <strong>{formatVND(v.minOrderValue)}</strong>
                        </div>
                      </div>

                      {/* Progress bar sử dụng */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                          <span>Đã dùng: {v.usedCount}/{v.usageLimit}</span>
                          <span>{Math.round((v.usedCount / v.usageLimit) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${Math.min(100, Math.round((v.usedCount / v.usageLimit) * 100))}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Hạn: {v.endDate}</span>
                        <button
                          onClick={() => handleToggleVoucherStatus(v.id)}
                          className="font-bold text-amber-600 hover:text-amber-800 cursor-pointer"
                        >
                          {v.status === 'ACTIVE' ? 'Tạm Dừng' : 'Mở Lại'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* MODAL XEM CHI TIẾT ĐƠN HÀNG (ORDER DETAIL MODAL) */}
      {selectedOrderDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 text-xs overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-[#273142] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-white">Chi Tiết Đơn Hàng #{selectedOrderDetail.orderNumber}</h3>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      selectedOrderDetail.status === 'PENDING' ? 'bg-amber-100 text-amber-900' :
                      selectedOrderDetail.status === 'PACKING' ? 'bg-blue-100 text-blue-900' :
                      'bg-emerald-100 text-emerald-900'
                    }`}>
                      {selectedOrderDetail.status === 'PENDING' && '⏳ Chờ đóng gói'}
                      {selectedOrderDetail.status === 'PACKING' && '📦 Đang chuẩn bị hàng'}
                      {selectedOrderDetail.status === 'SHIPPED' && '🚚 Đã bàn giao NextPass'}
                      {selectedOrderDetail.status === 'DELIVERED' && '✓ Đã giao thành công'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5 flex items-center gap-2">
                    <span>Thời gian đặt: <strong>{selectedOrderDetail.orderDate}</strong></span>
                    <span>&bull;</span>
                    <span>Mã vận đơn: <strong>{selectedOrderDetail.trackingCode || 'NP-VN-' + selectedOrderDetail.orderNumber.replace(/[^0-9]/g, '')}</strong></span>
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedOrderDetail(null)}
                className="w-8 h-8 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* 1. Trạng Thái Vận Chuyển / Timeline */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 mb-3">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Tiến trình xử lý đơn hàng</span>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedOrderDetail.shippingCarrier || 'NextPass Express 2H (Shipper Hỏa Tốc)'}
                  </span>
                </div>

                {/* Stepper 3 bước */}
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2.5 rounded-xl border bg-emerald-50 border-emerald-300 text-emerald-900 font-bold">
                    <div className="text-xs mb-0.5">1. Đã Nhận Đơn</div>
                    <div className="text-[10px] text-emerald-700 font-normal">Khách đã đặt đơn thành công</div>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${selectedOrderDetail.status === 'PACKING' || selectedOrderDetail.status === 'SHIPPED' ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' : 'bg-white border-slate-200 text-slate-400'}`}>
                    <div className="text-xs mb-0.5">2. Đóng Gói</div>
                    <div className="text-[10px] text-slate-500 font-normal">Kiểm tra & in phiếu giao hàng</div>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${selectedOrderDetail.status === 'SHIPPED' ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-white border-slate-200 text-slate-400'}`}>
                    <div className="text-xs mb-0.5">3. Bàn Giao Shipper</div>
                    <div className="text-[10px] text-slate-500 font-normal">Giao hỏa tốc 2 giờ</div>
                  </div>
                </div>
              </div>

              {/* 2. Thông Tin Khách Hàng & Địa Chỉ Nhận Hàng */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Thông tin khách hàng & Địa chỉ nhận hàng</span>
                  </span>
                  <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full uppercase">
                    {selectedOrderDetail.addressLabel === 'CƠ QUAN' ? '🏢 Cơ quan / Văn phòng' : '🏠 Nhà riêng'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-slate-500 text-[11px]">Họ và tên người nhận</div>
                    <div className="font-extrabold text-slate-900 text-sm mt-0.5">{selectedOrderDetail.customerName}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[11px]">Số điện thoại liên hệ</div>
                    <div className="font-bold text-slate-800 text-xs mt-0.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedOrderDetail.customerPhone || '0988 123 456'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 text-[11px]">Địa chỉ giao hàng chi tiết</div>
                  <div className="font-medium text-slate-800 text-xs mt-0.5 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {selectedOrderDetail.customerAddress || 'Số 18, Ngõ 86 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội'}
                  </div>
                </div>

                {selectedOrderDetail.customerNote && (
                  <div>
                    <div className="text-slate-500 text-[11px]">Ghi chú của người mua</div>
                    <div className="text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 font-medium text-xs mt-0.5">
                      "{selectedOrderDetail.customerNote}"
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Danh Sách Sản Phẩm Trong Đơn */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span>Sản phẩm trong đơn hàng ({selectedOrderDetail.quantity})</span>
                  <span className="text-[11px] text-slate-500">Đơn vị: chiếc</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {(selectedOrderDetail.items || [{
                    title: selectedOrderDetail.productTitle,
                    image: selectedOrderDetail.productImage || 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
                    quantity: selectedOrderDetail.quantity,
                    price: selectedOrderDetail.totalPrice / selectedOrderDetail.quantity,
                    variant: selectedOrderDetail.variant || 'Bản Tiêu Chuẩn 6.5L'
                  }]).map((item, idx) => (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{item.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Phân loại: <span className="font-semibold text-slate-700">{item.variant || 'Tiêu chuẩn'}</span> &bull; Số lượng: <strong className="text-slate-900">x{item.quantity}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-rose-700 text-xs">{formatVND(item.price * item.quantity)}</div>
                        <div className="text-[10px] text-slate-400">{formatVND(item.price)} / món</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Chi Tiết Thanh Toán */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Tiền hàng (Tạm tính):</span>
                  <span className="font-bold text-slate-800">{formatVND(selectedOrderDetail.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Phí vận chuyển (NextPass 2h):</span>
                  <span className="text-emerald-700 font-bold">Miễn phí 0₫</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Hình thức thanh toán:</span>
                  <span className="font-bold text-slate-800">
                    {selectedOrderDetail.paymentMethod === 'VIETQR' ? 'Quét mã VietQR Napas 24/7' : 
                     selectedOrderDetail.paymentMethod === 'CARD' ? 'Thẻ ATM / Thẻ quốc tế' : 'Thanh toán tiền mặt khi nhận hàng (COD)'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Trạng thái thanh toán:</span>
                  <span className={`font-bold ${selectedOrderDetail.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {selectedOrderDetail.paymentStatus === 'PAID' ? '✓ Đã thanh toán (Napas 24/7)' : 'Chưa thanh toán (Thu tiền COD khi giao)'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 pt-2 text-sm font-black text-rose-700">
                  <span>Tổng tiền thu từ khách:</span>
                  <span className="text-base">{formatVND(selectedOrderDetail.finalPrice || selectedOrderDetail.totalPrice)}</span>
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap items-center justify-between gap-2.5">
              <button 
                type="button"
                onClick={() => {
                  alert(`Đang in phiếu xuất kho & nhãn vận chuyển đơn hàng #${selectedOrderDetail.orderNumber} ra máy in tem nhiệt...`);
                }}
                className="px-3.5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In Phiếu Đóng Gói / Tem Vận Đơn</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedOrderDetail.status === 'PENDING' && (
                  <button 
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrderDetail.id, 'PACKING');
                      setSelectedOrderDetail(prev => prev ? { ...prev, status: 'PACKING' } : null);
                    }}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition cursor-pointer shadow-sm"
                  >
                    Xác Nhận & Đóng Gói
                  </button>
                )}

                {selectedOrderDetail.status === 'PACKING' && (
                  <button 
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrderDetail.id, 'SHIPPED');
                      setSelectedOrderDetail(prev => prev ? { ...prev, status: 'SHIPPED' } : null);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition cursor-pointer shadow-sm"
                  >
                    Bàn Giao Shipper 2H
                  </button>
                )}

                <button 
                  type="button"
                  onClick={() => setSelectedOrderDetail(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition cursor-pointer"
                >
                  Đóng lại
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Header modal */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-800 flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Chỉnh Sửa Thông Tin Sản Phẩm</h3>
                  <span className="text-[10px] text-slate-400">Mã SKU: {editingProductId}</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form sửa */}
            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên sản phẩm *</label>
                <input 
                  type="text" 
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none font-medium text-slate-900 bg-slate-50 focus:bg-white transition"
                />
              </div>

              {/* QUẢN LÝ HÌNH ẢNH KHI CHỈNH SỬA */}
              <div className="space-y-2 border border-slate-200 p-3.5 rounded-2xl bg-slate-50/70">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    <span>Hình ảnh sản phẩm ({editImages.length} ảnh) *</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Ảnh đầu tiên là ảnh bìa chính
                  </span>
                </div>

                {/* Preview Thumbnail Grid */}
                {editImages.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 pt-1">
                    {editImages.map((imgUrl, idx) => (
                      <div 
                        key={idx} 
                        className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white aspect-square flex items-center justify-center shadow-2xs"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={imgUrl} 
                          alt={`Ảnh ${idx + 1}`} 
                          className="w-full h-full object-cover"
                        />

                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-black text-[8px] px-1.5 py-0.5 rounded shadow-xs">
                            Ảnh bìa
                          </span>
                        )}

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1.5 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx, true)}
                              className="p-1 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-[9px] cursor-pointer"
                              title="Đặt làm ảnh bìa chính"
                            >
                              <Star className="w-3 h-3 fill-slate-950" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, true)}
                            className="p-1 rounded-lg bg-rose-600 text-white hover:bg-rose-500 font-bold text-[9px] cursor-pointer"
                            title="Xóa bớt ảnh này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 bg-white">
                    Chưa có ảnh nào. Vui lòng tải ảnh lên từ máy tính hoặc dán link ảnh.
                  </div>
                )}

                {/* Input Controls Thêm ảnh */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <label className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition shrink-0 shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tải ảnh từ máy tính</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      onChange={(e) => handleImageFileUpload(e, true)}
                      className="hidden" 
                    />
                  </label>

                  <div className="flex-1 flex gap-1.5">
                    <input 
                      type="url" 
                      value={editNewImageUrl}
                      onChange={(e) => setEditNewImageUrl(e.target.value)}
                      placeholder="Hoặc dán URL link ảnh vào đây..."
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none text-xs font-medium bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddImageUrl(editNewImageUrl, true)}
                      disabled={!editNewImageUrl.trim()}
                      className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs cursor-pointer transition shrink-0"
                    >
                      + Thêm
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ngành hàng *</label>
                  <select 
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium bg-white"
                  >
                    <option value="giadung">🍳 Gia Dụng & Bếp</option>
                    <option value="thoitrang">👗 Thời Trang & Sneaker</option>
                    <option value="dientu">📱 Điện Tử & Phụ Kiện</option>
                    <option value="phukien">🎒 Balo & Phụ Kiện</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số lượng tồn kho</label>
                  <input 
                    type="number" 
                    value={editStock}
                    onChange={(e) => setEditStock(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Giá bán hiện tại (VNĐ) *</label>
                  <input 
                    type="number" 
                    step="1000"
                    required
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-bold text-rose-700 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Giá gốc niêm yết (VNĐ)</label>
                  <input 
                    type="number" 
                    step="1000"
                    value={editOriginalPrice}
                    onChange={(e) => setEditOriginalPrice(e.target.value)}
                    placeholder="Bỏ trống nếu không giảm giá"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium text-slate-500 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Đặc điểm nổi bật (Mỗi dòng 1 gạch đầu dòng)</label>
                <textarea 
                  rows={4}
                  value={editBullets}
                  onChange={(e) => setEditBullets(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium text-slate-800 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox"
                  id="edit-mall"
                  checked={editShopeeMall}
                  onChange={(e) => setEditShopeeMall(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-slate-300 cursor-pointer"
                />
                <label htmlFor="edit-mall" className="text-slate-700 font-bold cursor-pointer">
                  Huy hiệu "Chính Hãng" (Cam kết hàng chuẩn 100%)
                </label>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold transition cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Lưu Thay Đổi</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 1. MODAL TẠO CHIẾN DỊCH ĐẨY TOP TÌM KIẾM */}
      {isCreateBoostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 text-xs overflow-hidden flex flex-col">
            <div className="bg-[#1f2735] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <Zap className="w-4 h-4 fill-slate-950" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Tạo Chiến Dịch Đẩy Top Tìm Kiếm</h3>
                  <span className="text-[10px] text-slate-400">Gắn huy hiệu [Tài Trợ] & ưu tiên vị trí hàng đầu</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateBoostModalOpen(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmCreateBoost} className="p-5 space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Chọn sản phẩm cần Đẩy Top *</label>
                <select
                  value={boostProductId}
                  onChange={(e) => setBoostProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-400 outline-none font-medium bg-white text-xs"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({formatVND(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Ngân sách chạy mỗi ngày</label>
                <div className="grid grid-cols-3 gap-2">
                  {['30000', '50000', '100000'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setBoostBudget(amt)}
                      className={`py-2 px-3 rounded-xl border font-bold text-xs transition cursor-pointer ${
                        boostBudget === amt
                          ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-400/30'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {formatVND(parseInt(amt, 10))}/ngày
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Quyền lợi đặc quyền Đẩy Top:
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-amber-800">
                  <li>Xuất hiện với huy hiệu <strong>[Tài Trợ]</strong> trên trang chủ và danh mục.</li>
                  <li>Thuật toán xếp hạng ưu tiên tại 3 vị trí kết quả tìm kiếm đầu tiên.</li>
                  <li>Chỉ tính phí khi khách hàng thực tế click vào xem sản phẩm.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateBoostModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Kích Hoạt Đẩy Top Ngay</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL ĐĂNG KÝ FLASH SALE SÀN */}
      {isRegisterFsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 text-xs overflow-hidden flex flex-col">
            <div className="bg-[#1f2735] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Đăng Ký Tham Gia Flash Sale Sàn</h3>
                  <span className="text-[10px] text-slate-400">Tiếp cận 50.000+ lượt khách hàng trong khung giờ vàng</span>
                </div>
              </div>
              <button 
                onClick={() => setIsRegisterFsModalOpen(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRegisterFlashSale} className="p-5 space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Khung giờ Flash Sale tham gia *</label>
                <select
                  value={fsSlot}
                  onChange={(e) => setFsSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-400 outline-none font-medium bg-white text-xs"
                >
                  <option value="⚡ Flash Sale Giờ Vàng 12:00 - 14:00 (Hôm nay)">
                    ⚡ Flash Sale Giờ Vàng 12:00 - 14:00 (Hôm nay) - Giảm ≥ 15%
                  </option>
                  <option value="🌙 Đêm Hội Mua Sắm 20:00 - 23:59 (Tối nay)">
                    🌙 Đêm Hội Mua Sắm 20:00 - 23:59 (Tối nay) - Giảm ≥ 20%
                  </option>
                  <option value="🚀 Siêu Tiệc Cuối Tuần Thứ 7 & CN">
                    🚀 Siêu Tiệc Cuối Tuần Thứ 7 & CN - Giảm ≥ 25%
                  </option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Chọn sản phẩm tham gia *</label>
                <select
                  value={fsProductId}
                  onChange={(e) => {
                    setFsProductId(e.target.value);
                    const p = products.find(prod => prod.id === e.target.value);
                    if (p) {
                      setFsPrice(Math.round(p.price * 0.85).toString());
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-400 outline-none font-medium bg-white text-xs"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (Giá hiện tại: {formatVND(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Giá Flash Sale (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    placeholder="VD: 1590000"
                    value={fsPrice}
                    onChange={(e) => setFsPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-rose-400 outline-none font-bold text-rose-700 text-xs"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Yêu cầu giảm tối thiểu 15% so với giá bán</span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Số lượng cam kết bán *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={fsQuantity}
                    onChange={(e) => setFsQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-rose-400 outline-none font-bold text-slate-800 text-xs"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Kho hàng sẽ tự động khóa số lượng này</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsRegisterFsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Gửi Đăng Ký Tham Gia</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL TẠO VOUCHER SHOP */}
      {isCreateVoucherModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 text-xs overflow-hidden flex flex-col">
            <div className="bg-[#1f2735] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Tạo Mã Giảm Giá Của Shop (Voucher)</h3>
                  <span className="text-[10px] text-slate-400">Khách hàng áp dụng trực tiếp tại bước giỏ hàng & thanh toán</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateVoucherModalOpen(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmCreateVoucher} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mã Voucher (Code) *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: GIADUNG100K"
                    value={vchCode}
                    onChange={(e) => setVchCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none font-black text-amber-700 uppercase tracking-wider text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Loại giảm giá *</label>
                  <select
                    value={vchType}
                    onChange={(e) => setVchType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none font-bold text-slate-800 text-xs bg-white"
                  >
                    <option value="FIXED">Số tiền cố định (VNĐ)</option>
                    <option value="PERCENT">Theo phần trăm (%)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên chương trình ưu đãi *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Giảm 50k tri ân khách hàng thân thiết"
                  value={vchTitle}
                  onChange={(e) => setVchTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none font-medium text-slate-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {vchType === 'FIXED' ? 'Mức giảm (VNĐ)' : 'Mức giảm (%)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={vchValue}
                    onChange={(e) => setVchValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none font-bold text-rose-700 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Đơn tối thiểu (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    value={vchMinOrder}
                    onChange={(e) => setVchMinOrder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none font-bold text-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lượt dùng tối đa *</label>
                  <input
                    type="number"
                    required
                    value={vchLimit}
                    onChange={(e) => setVchLimit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none font-bold text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateVoucherModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Phát Hành Voucher Ngay</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CHI TIẾT HIỆU QUẢ CHIẾN DỊCH & BIỂU ĐỒ LƯU LƯỢNG / ĐƠN HÀNG       */}
      {/* ========================================================================= */}
      {selectedCampaignDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                  {selectedCampaignDetail.productImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={selectedCampaignDetail.productImage} 
                      alt={selectedCampaignDetail.productTitle} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <BarChart3 className="w-6 h-6 text-amber-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-white text-base tracking-tight truncate max-w-md">
                      Báo Cáo Hiệu Quả: {selectedCampaignDetail.productTitle}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      selectedCampaignDetail.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-700 text-slate-300 border border-slate-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCampaignDetail.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
                      {selectedCampaignDetail.status === 'ACTIVE' ? 'Đang Đẩy Top' : 'Tạm Dừng'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Khởi chạy: {selectedCampaignDetail.startDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Zap className="w-3.5 h-3.5" />
                      Ngân sách: {formatVND(selectedCampaignDetail.budgetDaily || 50000)}/ngày
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">
                      ID: #{selectedCampaignDetail.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                <button
                  onClick={() => {
                    handleToggleBoostStatus(selectedCampaignDetail.id);
                    setSelectedCampaignDetail(prev => prev ? {
                      ...prev,
                      status: prev.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE'
                    } : null);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    selectedCampaignDetail.status === 'ACTIVE'
                      ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{selectedCampaignDetail.status === 'ACTIVE' ? 'Tạm Dừng' : 'Kích Hoạt Lại'}</span>
                </button>
                <button
                  onClick={() => setSelectedCampaignDetail(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  title="Đóng cửa sổ"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto bg-slate-50/50">
              {/* 4 Top KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* 1. Traffic (Clicks) */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Lưu Lượng Truy Cập</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center">
                      <MousePointerClick className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      {campaignTotals.totalClicks.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-xs font-bold text-slate-500">clicks</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">CTR trung bình:</span>
                    <span className="font-extrabold text-amber-600">{campaignTotals.ctr}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Từ {campaignTotals.totalViews.toLocaleString('vi-VN')} lượt hiển thị
                  </div>
                </div>

                {/* 2. Orders */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Lượng Đơn Hàng</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-600">
                      {campaignTotals.totalOrders}
                    </span>
                    <span className="text-xs font-bold text-slate-500">đơn chốt</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Tỷ lệ CVR:</span>
                    <span className="font-extrabold text-emerald-600">{campaignTotals.cvr}%</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Đơn hoàn tất xuất sắc
                  </div>
                </div>

                {/* 3. Revenue */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Doanh Thu (GMV)</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">
                      {formatVND(campaignTotals.totalRevenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">TB mỗi đơn:</span>
                    <span className="font-extrabold text-slate-700">
                      {formatVND(campaignTotals.totalOrders > 0 ? Math.round(campaignTotals.totalRevenue / campaignTotals.totalOrders) : 0)}
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-600 font-medium">
                    Doanh số bán từ khách Ads
                  </div>
                </div>

                {/* 4. ROAS & Cost */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Tỷ Suất ROAS</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-purple-700">
                      {campaignTotals.roas}x
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Chi phí tiêu:</span>
                    <span className="font-extrabold text-rose-600">{formatVND(campaignTotals.totalCost)}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    CPC: {formatVND(campaignTotals.avgCpc)}/click
                  </div>
                </div>
              </div>

              {/* SECTION: INTERACTIVE CHART */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
                {/* Chart Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-500" />
                      Biểu Đồ Lưu Lượng Truy Cập & Lượng Đơn Theo Thời Gian
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tương quan giữa lượt Click sản phẩm (Traffic) và Đơn hàng phát sinh
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Metric Switcher */}
                    <div className="p-0.5 bg-slate-100 rounded-xl flex items-center text-xs font-bold text-slate-600">
                      <button
                        type="button"
                        onClick={() => setChartMetric('both')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          chartMetric === 'both' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                        }`}
                      >
                        Tất cả
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartMetric('traffic')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                          chartMetric === 'traffic' ? 'bg-white text-amber-700 shadow-2xs' : 'hover:text-slate-900'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Traffic
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartMetric('orders')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                          chartMetric === 'orders' ? 'bg-white text-emerald-700 shadow-2xs' : 'hover:text-slate-900'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Đơn hàng
                      </button>
                    </div>

                    {/* Timeframe Switcher */}
                    <div className="p-0.5 bg-slate-100 rounded-xl flex items-center text-xs font-bold text-slate-600">
                      <button
                        type="button"
                        onClick={() => setChartTimeframe('7days')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          chartTimeframe === '7days' ? 'bg-slate-900 text-white shadow-2xs' : 'hover:text-slate-900'
                        }`}
                      >
                        7 ngày
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartTimeframe('14days')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          chartTimeframe === '14days' ? 'bg-slate-900 text-white shadow-2xs' : 'hover:text-slate-900'
                        }`}
                      >
                        14 ngày
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartTimeframe('30days')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          chartTimeframe === '30days' ? 'bg-slate-900 text-white shadow-2xs' : 'hover:text-slate-900'
                        }`}
                      >
                        30 ngày
                      </button>
                    </div>
                  </div>
                </div>

                {/* Legends & Current Hover Tooltip Bar */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-4 flex-wrap">
                    {(chartMetric === 'both' || chartMetric === 'traffic') && (
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3 rounded-md bg-gradient-to-t from-amber-500 to-amber-400 inline-block shadow-2xs"></span>
                        <span className="text-slate-600 font-medium">Lưu lượng Click (Cột - Trục trái)</span>
                      </div>
                    )}
                    {(chartMetric === 'both' || chartMetric === 'orders') && (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-emerald-500 inline-block relative">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white"></span>
                        </span>
                        <span className="text-slate-600 font-medium">Lượng Đơn Hàng (Đường - Trục phải)</span>
                      </div>
                    )}
                  </div>

                  {hoveredDataPoint !== null && currentChartData[hoveredDataPoint] && (
                    <div className="hidden sm:flex items-center gap-3 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-xs">
                      <span className="font-bold text-slate-800">
                        {currentChartData[hoveredDataPoint].dayName}, {currentChartData[hoveredDataPoint].date}:
                      </span>
                      <span className="font-bold text-amber-700">
                        {currentChartData[hoveredDataPoint].clicks} clicks
                      </span>
                      <span>•</span>
                      <span className="font-bold text-emerald-700">
                        {currentChartData[hoveredDataPoint].orders} đơn
                      </span>
                      <span>•</span>
                      <span className="font-bold text-blue-700">
                        {formatVND(currentChartData[hoveredDataPoint].revenue)}
                      </span>
                    </div>
                  )}
                </div>

                {/* SVG Combo Chart */}
                <div className="relative w-full h-64 select-none bg-slate-50/50 rounded-2xl p-2 border border-slate-100">
                  {/* Dynamic Floating Tooltip */}
                  {hoveredDataPoint !== null && currentChartData[hoveredDataPoint] && (
                    <div 
                      className="absolute z-20 top-2 pointer-events-none transition-all duration-75 bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1 backdrop-blur-xs border border-slate-700 min-w-[200px]"
                      style={{
                        left: `${Math.min(
                          Math.max(
                            8,
                            ((hoveredDataPoint + 0.5) / currentChartData.length) * 100 - 15
                          ),
                          68
                        )}%`
                      }}
                    >
                      <div className="font-bold text-amber-400 border-b border-slate-700 pb-1 flex items-center justify-between">
                        <span>{currentChartData[hoveredDataPoint].dayName}, {currentChartData[hoveredDataPoint].date}</span>
                        <span className="text-[10px] text-slate-400">Chi tiết ngày</span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-slate-300">Lưu lượng Click:</span>
                        <span className="font-bold text-amber-400">{currentChartData[hoveredDataPoint].clicks} clicks</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Lượt hiển thị (Views):</span>
                        <span>{currentChartData[hoveredDataPoint].views.toLocaleString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Đơn hàng chốt:</span>
                        <span className="font-bold text-emerald-400">{currentChartData[hoveredDataPoint].orders} đơn</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Doanh thu ngày:</span>
                        <span className="font-bold text-blue-400">{formatVND(currentChartData[hoveredDataPoint].revenue)}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-1">
                        <span>Chi phí tiêu:</span>
                        <span>{formatVND(currentChartData[hoveredDataPoint].cost)}</span>
                      </div>
                    </div>
                  )}

                  <svg viewBox="0 0 760 250" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.75" />
                      </linearGradient>
                      <linearGradient id="barHoverGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                        <stop offset="100%" stopColor="#b45309" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Chart Background Grid Lines & Y Axis Labels */}
                    {(() => {
                      const maxClicksVal = Math.ceil((Math.max(...currentChartData.map(d => d.clicks), 10) * 1.2) / 10) * 10;
                      const maxOrdersVal = Math.max(...currentChartData.map(d => d.orders), 3) + 1;
                      const paddingLeft = 50;
                      const paddingRight = 50;
                      const paddingTop = 25;
                      const chartH = 180;
                      const chartW = 760 - paddingLeft - paddingRight;

                      const gridLevels = [0, 0.25, 0.5, 0.75, 1];

                      return (
                        <g>
                          {gridLevels.map((lvl, idx) => {
                            const y = paddingTop + chartH * (1 - lvl);
                            const clickVal = Math.round(maxClicksVal * lvl);
                            const orderVal = Math.round(maxOrdersVal * lvl);
                            return (
                              <g key={idx}>
                                <line 
                                  x1={paddingLeft} 
                                  y1={y} 
                                  x2={paddingLeft + chartW} 
                                  y2={y} 
                                  stroke="#e2e8f0" 
                                  strokeWidth="1" 
                                  strokeDasharray={idx === 0 ? 'none' : '4,4'} 
                                />
                                {/* Left Y label (Clicks) */}
                                {(chartMetric === 'both' || chartMetric === 'traffic') && (
                                  <text 
                                    x={paddingLeft - 8} 
                                    y={y + 4} 
                                    textAnchor="end" 
                                    fontSize="10" 
                                    fill="#94a3b8" 
                                    fontWeight="bold"
                                  >
                                    {clickVal}
                                  </text>
                                )}
                                {/* Right Y label (Orders) */}
                                {(chartMetric === 'both' || chartMetric === 'orders') && (
                                  <text 
                                    x={paddingLeft + chartW + 8} 
                                    y={y + 4} 
                                    textAnchor="start" 
                                    fontSize="10" 
                                    fill="#10b981" 
                                    fontWeight="bold"
                                  >
                                    {orderVal}
                                  </text>
                                )}
                              </g>
                            );
                          })}
                        </g>
                      );
                    })()}

                    {/* Chart Bars & Lines */}
                    {(() => {
                      const maxClicksVal = Math.ceil((Math.max(...currentChartData.map(d => d.clicks), 10) * 1.2) / 10) * 10;
                      const maxOrdersVal = Math.max(...currentChartData.map(d => d.orders), 3) + 1;
                      const paddingLeft = 50;
                      const paddingRight = 50;
                      const paddingTop = 25;
                      const chartH = 180;
                      const chartW = 760 - paddingLeft - paddingRight;
                      const count = currentChartData.length;
                      const step = chartW / count;
                      const barW = chartTimeframe === '7days' ? Math.min(36, step * 0.45) : chartTimeframe === '14days' ? Math.min(22, step * 0.5) : Math.min(12, step * 0.55);

                      // Points for Orders line
                      const linePoints = currentChartData.map((d, i) => {
                        const cx = paddingLeft + i * step + step / 2;
                        const cy = paddingTop + chartH - (d.orders / maxOrdersVal) * chartH;
                        return { cx, cy, orders: d.orders };
                      });

                      const polylineStr = linePoints.map(p => `${p.cx},${p.cy}`).join(' ');
                      const areaStr = `M ${linePoints[0]?.cx || paddingLeft},${paddingTop + chartH} ` +
                        linePoints.map(p => `L ${p.cx},${p.cy}`).join(' ') +
                        ` L ${linePoints[linePoints.length - 1]?.cx || (paddingLeft + chartW)},${paddingTop + chartH} Z`;

                      return (
                        <g>
                          {/* 1. Amber Clicks Bars */}
                          {(chartMetric === 'both' || chartMetric === 'traffic') &&
                            currentChartData.map((d, i) => {
                              const x = paddingLeft + i * step + (step - barW) / 2;
                              const h = Math.max(3, (d.clicks / maxClicksVal) * chartH);
                              const y = paddingTop + chartH - h;
                              const isHovered = hoveredDataPoint === i;

                              return (
                                <g key={`bar-${i}`}>
                                  <rect
                                    x={x}
                                    y={y}
                                    width={barW}
                                    height={h}
                                    rx={4}
                                    ry={4}
                                    fill={isHovered ? 'url(#barHoverGradient)' : 'url(#barGradient)'}
                                    stroke={isHovered ? '#b45309' : 'transparent'}
                                    strokeWidth={isHovered ? 2 : 0}
                                    className="transition-all duration-150"
                                  />
                                  {/* Top Bar Label for 7 days view */}
                                  {chartTimeframe === '7days' && (
                                    <text
                                      x={x + barW / 2}
                                      y={y - 6}
                                      textAnchor="middle"
                                      fontSize="10"
                                      fontWeight="bold"
                                      fill={isHovered ? '#b45309' : '#78350f'}
                                    >
                                      {d.clicks}
                                    </text>
                                  )}
                                </g>
                              );
                            })}

                          {/* 2. Emerald Orders Area & Line */}
                          {(chartMetric === 'both' || chartMetric === 'orders') && (
                            <g>
                              {/* Shaded Area */}
                              <path d={areaStr} fill="url(#areaGradient)" />
                              {/* Polyline */}
                              <polyline
                                points={polylineStr}
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {/* Dots */}
                              {linePoints.map((p, i) => {
                                const isHovered = hoveredDataPoint === i;
                                return (
                                  <g key={`dot-${i}`}>
                                    {isHovered && (
                                      <circle
                                        cx={p.cx}
                                        cy={p.cy}
                                        r="9"
                                        fill="#10b981"
                                        opacity="0.25"
                                      />
                                    )}
                                    <circle
                                      cx={p.cx}
                                      cy={p.cy}
                                      r={isHovered ? '6' : '4'}
                                      fill="#ffffff"
                                      stroke="#10b981"
                                      strokeWidth={isHovered ? '3' : '2.5'}
                                      className="transition-all duration-150"
                                    />
                                    {chartTimeframe === '7days' && (
                                      <text
                                        x={p.cx}
                                        y={p.cy - 10}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fontWeight="black"
                                        fill="#047857"
                                      >
                                        {p.orders}đ
                                      </text>
                                    )}
                                  </g>
                                );
                              })}
                            </g>
                          )}

                          {/* 3. X-Axis Dates Labels */}
                          {currentChartData.map((d, i) => {
                            const cx = paddingLeft + i * step + step / 2;
                            // In 30-day mode, show label every 4 days to avoid clutter
                            const shouldShow = chartTimeframe === '7days' || (chartTimeframe === '14days' && i % 2 === 0) || (chartTimeframe === '30days' && i % 4 === 0) || i === count - 1;
                            if (!shouldShow) return null;

                            return (
                              <g key={`xlabel-${i}`}>
                                <text
                                  x={cx}
                                  y={paddingTop + chartH + 16}
                                  textAnchor="middle"
                                  fontSize="9.5"
                                  fontWeight={hoveredDataPoint === i ? 'bold' : '600'}
                                  fill={hoveredDataPoint === i ? '#0f172a' : '#64748b'}
                                >
                                  {d.date}
                                </text>
                                {chartTimeframe === '7days' && (
                                  <text
                                    x={cx}
                                    y={paddingTop + chartH + 28}
                                    textAnchor="middle"
                                    fontSize="8.5"
                                    fill={hoveredDataPoint === i ? '#f59e0b' : '#94a3b8'}
                                    fontWeight="medium"
                                  >
                                    {d.dayName}
                                  </text>
                                )}
                              </g>
                            );
                          })}

                          {/* 4. Hover Guidance Line and Column Hitboxes */}
                          {hoveredDataPoint !== null && (
                            <line
                              x1={paddingLeft + hoveredDataPoint * step + step / 2}
                              y1={paddingTop}
                              x2={paddingLeft + hoveredDataPoint * step + step / 2}
                              y2={paddingTop + chartH}
                              stroke="#cbd5e1"
                              strokeWidth="1.5"
                              strokeDasharray="3,3"
                            />
                          )}

                          {/* Hitboxes */}
                          {currentChartData.map((_, i) => (
                            <rect
                              key={`hit-${i}`}
                              x={paddingLeft + i * step}
                              y={paddingTop}
                              width={step}
                              height={chartH + 30}
                              fill="transparent"
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredDataPoint(i)}
                              onMouseLeave={() => setHoveredDataPoint(null)}
                            />
                          ))}
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* AI NextSeller Campaign Assessment */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-200/60 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span>Đánh Giá Hiệu Suất Từ Trợ Lý AI NextSeller</span>
                      <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Đạt chuẩn xuất sắc
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Chiến dịch đang mang lại hiệu suất hoàn vốn <strong>ROAS {campaignTotals.roas}x</strong> cực kỳ ấn tượng. Các ngày cuối tuần (Thứ Sáu & Thứ Bảy) ghi nhận lượng truy cập và chốt đơn tăng vọt. Khuyến nghị: <strong>Duy trì ngân sách tối thiểu {formatVND(selectedCampaignDetail.budgetDaily || 50000)}/ngày</strong> hoặc cân nhắc nâng lên 100.000₫ vào các ngày cuối tuần để nhân đôi lượng đơn hàng.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION: DAILY PERFORMANCE BREAKDOWN TABLE */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      Bảng Thống Kê Chi Tiết Từng Ngày ({chartTimeframe === '7days' ? '7 ngày qua' : chartTimeframe === '14days' ? '14 ngày qua' : '30 ngày qua'})
                    </h4>
                    <p className="text-xs text-slate-500">
                      Chi tiết từng chỉ số lượt hiển thị, click, đơn chốt, doanh thu và chi phí quảng cáo
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto max-h-60 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider sticky top-0 bg-slate-50">
                        <tr>
                          <th className="p-3">Thời Gian</th>
                          <th className="p-3 text-right">Lượt Xem</th>
                          <th className="p-3 text-right">Clicks (Traffic)</th>
                          <th className="p-3 text-right">CTR (%)</th>
                          <th className="p-3 text-right">Đơn Hàng</th>
                          <th className="p-3 text-right">CVR (%)</th>
                          <th className="p-3 text-right">Chi Phí</th>
                          <th className="p-3 text-right">Doanh Thu</th>
                          <th className="p-3 text-right">ROAS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {currentChartData.map((d, idx) => {
                          const dayCtr = ((d.clicks / d.views) * 100).toFixed(2);
                          const dayCvr = d.clicks > 0 ? ((d.orders / d.clicks) * 100).toFixed(2) : '0';
                          const dayRoas = d.cost > 0 ? (d.revenue / d.cost).toFixed(1) : '0';
                          const isHovered = hoveredDataPoint === idx;

                          return (
                            <tr 
                              key={idx}
                              onMouseEnter={() => setHoveredDataPoint(idx)}
                              onMouseLeave={() => setHoveredDataPoint(null)}
                              className={`transition cursor-pointer ${
                                isHovered ? 'bg-amber-50/70 font-semibold' : 'hover:bg-slate-50/80'
                              }`}
                            >
                              <td className="p-3">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-900">{d.date}</span>
                                  <span className="text-[10px] text-slate-400">({d.dayName})</span>
                                </div>
                              </td>
                              <td className="p-3 text-right text-slate-600">
                                {d.views.toLocaleString('vi-VN')}
                              </td>
                              <td className="p-3 text-right font-bold text-amber-700">
                                {d.clicks}
                              </td>
                              <td className="p-3 text-right text-slate-700">
                                {dayCtr}%
                              </td>
                              <td className="p-3 text-right font-black text-emerald-600">
                                {d.orders} đơn
                              </td>
                              <td className="p-3 text-right text-slate-700">
                                {dayCvr}%
                              </td>
                              <td className="p-3 text-right text-rose-600">
                                {formatVND(d.cost)}
                              </td>
                              <td className="p-3 text-right font-bold text-blue-700">
                                {formatVND(d.revenue)}
                              </td>
                              <td className="p-3 text-right font-black text-purple-700">
                                {dayRoas}x
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-slate-100/80 border-t-2 border-slate-300 font-bold text-slate-900 text-xs">
                        <tr>
                          <td className="p-3">TỔNG CỘNG</td>
                          <td className="p-3 text-right">{campaignTotals.totalViews.toLocaleString('vi-VN')}</td>
                          <td className="p-3 text-right text-amber-700 font-black">{campaignTotals.totalClicks.toLocaleString('vi-VN')}</td>
                          <td className="p-3 text-right">{campaignTotals.ctr}%</td>
                          <td className="p-3 text-right text-emerald-600 font-black">{campaignTotals.totalOrders} đơn</td>
                          <td className="p-3 text-right">{campaignTotals.cvr}%</td>
                          <td className="p-3 text-right text-rose-600">{formatVND(campaignTotals.totalCost)}</td>
                          <td className="p-3 text-right text-blue-700 font-black">{formatVND(campaignTotals.totalRevenue)}</td>
                          <td className="p-3 text-right text-purple-700 font-black">{campaignTotals.roas}x</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="text-xs text-slate-500 hidden sm:block">
                Dữ liệu được cập nhật theo thời gian thực mỗi 15 phút.
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleBoostStatus(selectedCampaignDetail.id);
                    setSelectedCampaignDetail(prev => prev ? {
                      ...prev,
                      status: prev.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE'
                    } : null);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer ${
                    selectedCampaignDetail.status === 'ACTIVE'
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {selectedCampaignDetail.status === 'ACTIVE' ? 'Tạm Dừng Chiến Dịch' : 'Kích Hoạt Lại Ngay'}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCampaignDetail(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
