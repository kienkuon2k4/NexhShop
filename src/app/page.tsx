'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CardQuad } from '@/components/home/CardQuad';
import { ProductSlider } from '@/components/home/ProductSlider';
import { ProductGrid } from '@/components/home/ProductGrid';
import { ProductDetailView } from '@/components/pdp/ProductDetailView';
import { CartView } from '@/components/cart/CartView';
import { SellerDashboard } from '@/components/seller/SellerDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { BuyerDashboard } from '@/components/buyer/BuyerDashboard';
import { BecomeSellerModal } from '@/components/auth/BecomeSellerModal';
import { LoginModal } from '@/components/auth/LoginModal';
import { AccessDeniedView } from '@/components/auth/AccessDeniedView';
import { SupportPopup } from '@/components/support/SupportPopup';
import { useAuth } from '@/context/AuthContext';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Product, CartItem, UserRole } from '@/types';
import { ShieldAlert, Store, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  const { currentUser, pendingShops } = useAuth();

  // Điều hướng màn hình
  const [currentView, setCurrentView] = useState<'home' | 'pdp' | 'cart' | 'seller' | 'admin' | 'buyer'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [buyerTab, setBuyerTab] = useState<'orders' | 'addresses' | 'profile' | 'settings'>('orders');

  // Quản lý Modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBecomeSellerModalOpen, setIsBecomeSellerModalOpen] = useState(false);
  const [roleNotice, setRoleNotice] = useState<{ requiredRole: UserRole; message: string } | undefined>(undefined);

  // Dữ liệu sản phẩm có thể thêm/xóa động từ Seller Central
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(MOCK_PRODUCTS[0]);

  // Giỏ hàng
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1, selectedVariant: 'Bản Tiêu Chuẩn 6.5L' },
    { product: MOCK_PRODUCTS[12], quantity: 1, selectedVariant: 'Size 41 (26cm)' }
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Kiểm tra xem người dùng hiện tại có hồ sơ mở shop đang chờ duyệt không
  const myPendingShop = pendingShops.find(
    s => s.userEmail === currentUser?.email && s.status === 'PENDING'
  );
  const pendingRequestsCount = pendingShops.filter(s => s.status === 'PENDING').length;

  // Thêm/Sửa/Xóa sản phẩm của Người Bán
  const handleAddNewProductBySeller = (newProduct: Product) => {
    setProductsList(prev => [newProduct, ...prev]);
  };

  const handleUpdateProductBySeller = (updatedProduct: Product) => {
    setProductsList(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProductBySeller = (productId: string) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
  };

  // Xử lý giỏ hàng
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    alert(`Đã thêm "${product.title.slice(0, 30)}..." vào giỏ hàng!`);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setCurrentView('cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Điều hướng xem sản phẩm
  const handleSelectProductBySlug = (slug: string) => {
    const found = productsList.find(p => p.slug === slug);
    if (found) {
      setSelectedProduct(found);
      setCurrentView('pdp');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryFilter = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'flash') {
      handleSelectProductBySlug('noi-chien-khong-dau-philips-6-5l');
      return;
    }
    setCurrentView('home');
  };

  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    const found = productsList.find(p => 
      p.title.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.categoryName.toLowerCase().includes(q)
    );
    if (found) {
      setSelectedProduct(found);
      setCurrentView('pdp');
    } else {
      setSelectedProduct(productsList[0]);
      setCurrentView('pdp');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Điều hướng có kiểm soát từ Header & Menu
  const handleNavigate = (view: 'home' | 'seller' | 'admin' | 'seller-register' | 'login' | 'buyer', tab?: 'orders' | 'addresses' | 'profile' | 'settings') => {
    if (view === 'seller-register') {
      setIsBecomeSellerModalOpen(true);
      return;
    }
    if (view === 'login') {
      setRoleNotice(undefined);
      setIsLoginModalOpen(true);
      return;
    }
    if (view === 'buyer') {
      if (tab) setBuyerTab(tab);
      setCurrentView('buyer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentView(view);
  };

  // Danh sách sản phẩm hiển thị theo Category
  const filteredProducts = selectedCategory === 'all' 
    ? productsList 
    : productsList.filter(p => p.category === selectedCategory);

  // =========================================================================
  // BẢO VỆ ROUTE: GIAO DIỆN QUẢN TRỊ VIÊN (ADMIN CONSOLE)
  // Chỉ duy nhất tài khoản có role === 'ADMIN' mới được vào!
  // =========================================================================
  if (currentView === 'admin') {
    if (currentUser?.role === 'ADMIN') {
      return (
        <AdminDashboard 
          onBackToMarketplace={() => setCurrentView('home')} 
          onOpenLoginModal={() => {
            setRoleNotice(undefined);
            setIsLoginModalOpen(true);
          }}
        />
      );
    }

    // Nếu không phải ADMIN -> Hiển thị màn hình 403 Forbidden chuẩn
    return (
      <div className="min-h-screen flex flex-col bg-[#f1f5f9]">
        <Header 
          cartCount={totalCartCount}
          cartTotal={totalCartAmount}
          onOpenCart={() => setCurrentView('cart')}
          onSelectCategory={handleCategoryFilter}
          onSearch={handleSearch}
          onGoHome={() => setCurrentView('home')}
          onNavigate={handleNavigate}
        />
        <div className="flex-1">
          <AccessDeniedView 
            type="admin_forbidden"
            onBackToMarketplace={() => setCurrentView('home')}
            onOpenLogin={() => {
              setRoleNotice({
                requiredRole: 'ADMIN',
                message: 'Vui lòng đăng nhập với tài khoản có quyền Quản Trị Viên để mở Cổng Quản Trị Sàn.'
              });
              setIsLoginModalOpen(true);
            }}
            onOpenRegisterSeller={() => setIsBecomeSellerModalOpen(true)}
          />
        </div>
        <Footer />
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
          targetRoleNotice={roleNotice}
        />
        <SupportPopup 
          onOpenSellerRegister={() => setIsBecomeSellerModalOpen(true)}
        />
      </div>
    );
  }

  // =========================================================================
  // BẢO VỆ ROUTE: KÊNH NGƯỜI BÁN (SELLER CENTRAL)
  // Chỉ tài khoản có role === 'SELLER' (đã có shop được duyệt) mới được vào!
  // =========================================================================
  if (currentView === 'seller') {
    if (currentUser?.role === 'SELLER') {
      return (
        <>
          <SellerDashboard 
            shopName={currentUser.shopInfo?.shopName || 'Gia Dụng Thông Minh Việt'}
            products={productsList.filter(p => p.brand === (currentUser.shopInfo?.shopName || 'Gia Dụng Thông Minh Việt') || p.category === 'giadung')}
            onAddNewProduct={handleAddNewProductBySeller}
            onUpdateProduct={handleUpdateProductBySeller}
            onDeleteProduct={handleDeleteProductBySeller}
            onBackToMarketplace={() => setCurrentView('home')}
            onOpenLoginModal={() => {
              setRoleNotice(undefined);
              setIsLoginModalOpen(true);
            }}
          />
          <SupportPopup />
        </>
      );
    }

    // Nếu người dùng có đơn đăng ký đang chờ duyệt
    const accessType = myPendingShop ? 'seller_pending' : 'seller_required';

    return (
      <div className="min-h-screen flex flex-col bg-[#f1f5f9]">
        <Header 
          cartCount={totalCartCount}
          cartTotal={totalCartAmount}
          onOpenCart={() => setCurrentView('cart')}
          onSelectCategory={handleCategoryFilter}
          onSearch={handleSearch}
          onGoHome={() => setCurrentView('home')}
          onNavigate={handleNavigate}
        />
        <div className="flex-1">
          <AccessDeniedView 
            type={accessType}
            onBackToMarketplace={() => setCurrentView('home')}
            onOpenLogin={() => {
              setRoleNotice({
                requiredRole: 'ADMIN',
                message: 'Vui lòng đăng nhập với tài khoản Quản Trị Viên để thẩm định và phê duyệt hồ sơ này.'
              });
              setIsLoginModalOpen(true);
            }}
            onOpenRegisterSeller={() => setIsBecomeSellerModalOpen(true)}
          />
        </div>
        <Footer />
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
          targetRoleNotice={roleNotice}
        />
        <BecomeSellerModal 
          isOpen={isBecomeSellerModalOpen}
          onClose={() => setIsBecomeSellerModalOpen(false)}
        />
        <SupportPopup 
          onOpenSellerRegister={() => setIsBecomeSellerModalOpen(true)}
        />
      </div>
    );
  }

  // =========================================================================
  // GIAO DIỆN KHÁCH HÀNG (CUSTOMER MARKETPLACE)
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9]">
      
      {/* 1. HEADER CHUẨN NEXTSHOP KÈM PHÂN QUYỀN VAI TRÒ */}
      <Header 
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setCurrentView('cart')}
        onSelectCategory={handleCategoryFilter}
        onSearch={handleSearch}
        onGoHome={() => {
          setCurrentView('home');
          setSelectedCategory('all');
        }}
        onNavigate={handleNavigate}
      />

      {/* 2. THANH THÔNG BÁO TRẠNG THÁI HỆ THỐNG / HỒ SƠ PHÂN QUYỀN */}
      {currentUser?.role === 'ADMIN' && pendingRequestsCount > 0 && (
        <div className="bg-rose-50 border-b border-rose-200 px-3 sm:px-4 py-2 text-xs">
          <div className="max-w-[1500px] w-full mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-rose-800 font-bold">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>[Quản Trị Sàn] Có <strong>{pendingRequestsCount} hồ sơ mở gian hàng mới</strong> đang chờ bạn thẩm định và phê duyệt.</span>
            </span>
            <button
              onClick={() => setCurrentView('admin')}
              className="text-rose-700 hover:text-rose-900 font-extrabold underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Vào duyệt ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {currentUser?.role === 'CUSTOMER' && myPendingShop && (
        <div className="bg-amber-50 border-b border-amber-200 px-3 sm:px-4 py-2 text-xs">
          <div className="max-w-[1500px] w-full mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-amber-900 font-bold">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Hồ sơ mở shop <strong>"{myPendingShop.shopName}"</strong> của bạn đang chờ Ban Quản Trị duyệt.</span>
            </span>
            <button
              onClick={() => setCurrentView('seller')}
              className="text-amber-800 hover:text-amber-950 font-extrabold underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Xem tiến trình</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. BODY CONTENT (CHUYỂN ĐỔI THEO VIEW) */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
        
        {/* VIEW: TRANG CHỦ */}
        {currentView === 'home' && (
          <div className="space-y-6">
            <HeroBanner 
              onExploreDeals={() => handleSelectProductBySlug('noi-chien-khong-dau-philips-6-5l')}
              onSelectCategory={handleCategoryFilter}
            />

            <CardQuad 
              onSelectProduct={handleSelectProductBySlug}
              onSelectCategory={handleCategoryFilter}
            />

            <ProductSlider 
              products={filteredProducts}
              onSelectProduct={handleSelectProductBySlug}
              onAddToCart={handleAddToCart}
            />

            <ProductGrid 
              products={filteredProducts}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryFilter}
              onSelectProduct={handleSelectProductBySlug}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {/* VIEW: CHI TIẾT SẢN PHẨM (PDP & BUY BOX) */}
        {currentView === 'pdp' && (
          <ProductDetailView 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {/* VIEW: GIỎ HÀNG & CHECKOUT */}
        {currentView === 'cart' && (
          <CartView 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onBackToShopping={() => setCurrentView('home')}
            onClearCart={() => setCartItems([])}
            onViewBuyerDashboard={(tab) => {
              if (tab) setBuyerTab(tab);
              setCurrentView('buyer');
            }}
          />
        )}

        {/* VIEW: BẢNG ĐIỀU KHIỂN & ĐƠN HÀNG NGƯỜI MUA (BUYER DASHBOARD) */}
        {currentView === 'buyer' && (
          <BuyerDashboard 
            initialTab={buyerTab}
            onBackToShopping={() => setCurrentView('home')}
            onReOrder={(order) => {
              order.items.forEach(item => {
                handleAddToCart(item.product, item.quantity);
              });
              setCurrentView('cart');
            }}
          />
        )}

      </div>

      {/* 4. FOOTER ĐA TẦNG ĐẲNG CẤP */}
      <Footer />

      {/* MODAL ĐĂNG NHẬP / PHÂN QUYỀN (RBAC AUTH) */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        targetRoleNotice={roleNotice}
      />

      {/* MODAL ĐĂNG KÝ TRỞ THÀNH NGƯỜI BÁN (CUSTOMER -> PENDING SELLER) */}
      <BecomeSellerModal 
        isOpen={isBecomeSellerModalOpen}
        onClose={() => setIsBecomeSellerModalOpen(false)}
        onSubmitted={() => {
          // Sau khi nộp đơn, có thể chuyển hướng xem trạng thái
          setCurrentView('seller');
        }}
      />

      {/* POPUP HỖ TRỢ TRỰC TUYẾN 24/7 (NEXTCARE LIVE CHAT) */}
      <SupportPopup 
        onOpenSellerRegister={() => setIsBecomeSellerModalOpen(true)}
      />

    </div>
  );
}
