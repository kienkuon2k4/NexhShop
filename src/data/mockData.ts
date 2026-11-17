import { Product } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  // =========================================================================
  // PHÂN LOẠI 1: GIA DỤNG & ĐỜI SỐNG (10 SẢN PHẨM CHÍNH HÃNG)
  // =========================================================================
  {
    id: 'shopee-philips-hd9280',
    title: '[Chính Hãng] Nồi Chiên Không Dầu Điện Tử Philips 6.5L HD9280/90 - Công Nghệ Rapid Air Giảm 90% Dầu Mỡ, Màn Hình Cảm Ứng 8 Chế Độ Nấu',
    slug: 'noi-chien-khong-dau-philips-6-5l',
    brand: 'Philips Official Store',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 1890000,
    originalPrice: 2990000,
    rating: 4.9,
    reviewsCount: 14820,
    soldCountMonth: '5.2k+ đã bán',
    isBestSeller: true,
    isNextChoice: true,
    isSponsored: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 185,
    deliveryTime: 'Giao hỏa tốc 2 giờ NextPass Chính Hãng',
    bulletPoints: [
      'Công nghệ Rapid Air độc quyền tạo luồng khí xoáy hình sao giúp thức ăn chín giòn rụm bên ngoài, mọng nước bên trong mà không cần thêm dầu ăn.',
      'Dung tích lớn 6.5 Lít (XL) nướng vừa nguyên con gà 1.5kg hoặc 1.2kg khoai tây chiên cho cả gia đình 4-6 người.',
      'Bảng điều khiển cảm ứng trực quan với 8 chương trình nấu cài đặt sẵn: gà, bò, cá, bánh, rau củ, giữ ấm.',
      'Giỏ chiên QuickClean chống dính cao cấp tháo rời, an toàn khi vệ sinh bằng máy rửa bát.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Philips (Hà Lan)' },
      { label: 'Model', value: 'HD9280/90' },
      { label: 'Dung tích lòng nồi', value: '6.5 Lít' },
      { label: 'Công suất', value: '2000W' },
      { label: 'Chất liệu lòng nồi', value: 'Hợp kim nhôm phủ men chống dính cao cấp' },
      { label: 'Bảo hành chính hãng', value: '24 tháng toàn quốc' },
      { label: 'Xuất xứ', value: 'Trung Quốc theo tiêu chuẩn chất lượng Philips Châu Âu' }
    ],
    fullDescription: `🔥 ĐẶC ĐIỂM NỔI BẬT CỦA NỒI CHIÊN KHÔNG DẦU PHILIPS HD9280/90:
- Giảm đến 90% lượng chất béo nạp vào cơ thể nhờ công nghệ khí nóng đối lưu Rapid Air.
- Kết nối thông minh với ứng dụng NutriU cung cấp hàng ngàn công thức nấu ăn ngon của đầu bếp chuyên nghiệp mỗi ngày.
- Chức năng giữ ấm tiện lợi trong vòng 30 phút sau khi nấu chín.

🛡️ CHÍNH SÁCH BÁN HÀNG TỪ CHÍNH HÃNG:
- Cam kết 100% hàng chính hãng, có tem phụ và phiếu bảo hành chính thức.
- 1 đổi 1 trong vòng 15 ngày nếu phát sinh lỗi từ nhà sản xuất.
- Đóng gói 3 lớp chống sốc chuyên dụng bảo đảm an toàn khi vận chuyển toàn quốc.`,
    variants: {
      name: 'Phân loại',
      options: [
        { label: 'Bản Tiêu Chuẩn 6.5L', price: 1890000 },
        { label: 'Bản Kèm Khay Nướng Pizza & Xiên Que', price: 2150000 }
      ]
    }
  },
  {
    id: 'shopee-cuckoo-cr0675f',
    title: '[Chính Hãng] Nồi Cơm Điện Tử Cuckoo 1.08L CR-0675F - Nắp Phụ Tháo Rời, Lòng Nồi Tráng Men Daikin Nhật Bản, 9 Chế Độ Nấu',
    slug: 'noi-com-dien-tu-cuckoo-1-08l',
    brand: 'Cuckoo Official',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 1190000,
    originalPrice: 1750000,
    rating: 4.8,
    reviewsCount: 8920,
    soldCountMonth: '3.1k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    deliveryTime: 'Giao hàng 2 giờ',
    bulletPoints: [
      'Lòng nồi hợp kim dày 2mm phủ men chống dính Daikin siêu bền chống trầy xước.',
      'Dung tích 1.08 Lít phù hợp chuẩn cho gia đình 2 - 4 người ăn.',
      'Công nghệ nấu 3D nhiệt đa chiều giữ ấm cơm thơm dẻo suốt 24 giờ liên tục.',
      'Nắp phụ bên trong làm bằng thép không gỉ tháo rời chỉ với 1 nút nhấn dễ chùi rửa.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Cuckoo (Hàn Quốc)' },
      { label: 'Model', value: 'CR-0675F' },
      { label: 'Dung tích', value: '1.08 Lít' },
      { label: 'Công suất', value: '580W' },
      { label: 'Bảo hành', value: '24 tháng' }
    ]
  },
  {
    id: 'shopee-roborock-s8',
    title: '[Chính Hãng] Robot Hút Bụi Lau Nhà Roborock S8 Pro Ultra - Lực Hút 6000Pa, Trạm Sạc All-In-One Tự Giặt Sấy Giẻ Khí Nóng',
    slug: 'robot-hut-bui-roborock-s8',
    brand: 'Roborock Flagship Store',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 18990000,
    originalPrice: 24500000,
    rating: 4.9,
    reviewsCount: 3450,
    soldCountMonth: '1.5k+ đã bán',
    isBestSeller: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'robot',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    deliveryTime: 'Giao ngày mai',
    bulletPoints: [
      'Lực hút HyperForce 6000Pa quét sạch mọi hạt bụi mịn và lông thú cưng.',
      'Trạm sạc đa năng RockDock Ultra tự giặt giẻ, sấy khí nóng 45 độ C chống mùi ẩm mốc, tự hút bụi và bơm nước.',
      'Hệ thống lau rung kép VibraRise 2.0 chà sàn 3000 lần/phút kết hợp nâng giẻ tự động khi leo thảm.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Roborock' },
      { label: 'Model', value: 'S8 Pro Ultra' },
      { label: 'Lực hút', value: '6000 Pa' },
      { label: 'Bảo hành', value: '24 tháng chính hãng' }
    ]
  },
  {
    id: 'shopee-kalite-kl565',
    title: '[Chính Hãng] Máy Ép Chậm Kalite KL-565 - Công Suất 240W, Trục Ép Xoắn Lớn Ép Kiệt Bã 98%, Tặng Kèm Lưới Làm Kem Trái Cây',
    slug: 'may-ep-cham-kalite-kl-565',
    brand: 'Kalite Official',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 1590000,
    originalPrice: 2300000,
    rating: 4.8,
    reviewsCount: 5410,
    soldCountMonth: '2.4k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Ống tiếp nguyên liệu cực lớn 7.5cm ép nguyên quả táo, ổi không cần cắt nhỏ.',
      'Vòng quay chậm 60 vòng/phút hạn chế sinh nhiệt, giữ nguyên 100% enzyme và vitamin tự nhiên.',
      'Tặng kèm lưới lọc chuyên dụng để làm kem tuyết trái cây tươi mát cho bé.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Kalite' },
      { label: 'Công suất', value: '240W' },
      { label: 'Tốc độ quay', value: '60 RPM' },
      { label: 'Bảo hành', value: '12 tháng' }
    ]
  },
  {
    id: 'shopee-tefal-so-chef',
    title: '[Chính Hãng] Chảo Chiên Chống Dính Tefal So Chef 28cm G1350695 - Điểm Báo Nhiệt Thermo-Signal, Dùng Mọi Loại Bếp Kể Cả Bếp Từ',
    slug: 'chao-chong-dinh-tefal-so-chef-28cm',
    brand: 'Tefal Official Store',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 590000,
    originalPrice: 890000,
    rating: 4.9,
    reviewsCount: 12100,
    soldCountMonth: '4.8k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Công nghệ báo nhiệt Thermo-Signal đổi màu đỏ sẫm báo thời điểm chảo đạt nhiệt độ vàng để chiên rán.',
      'Lớp phủ Titanium bền chắc chống dính vượt trội gấp 2 lần, không chứa PFOA chì độc hại.',
      'Đáy từ phẳng bắt từ siêu nhạy, tản nhiệt đều chống cong vênh đáy chảo.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Tefal (Pháp)' },
      { label: 'Đường kính', value: '28 cm' },
      { label: 'Bếp tương thích', value: 'Bếp từ, bếp gas, hồng ngoại' }
    ]
  },
  {
    id: 'shopee-locklock-feather',
    title: '[Chính Hãng] Bình Giữ Nhiệt Lock&Lock Feather Light 450ml LHC4131 - Thép Không Gỉ Inox 304 Siêu Nhẹ, Giữ Nóng/Lạnh 24H',
    slug: 'binh-giu-nhiet-locklock-feather-light',
    brand: 'Lock&Lock Official',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 360000,
    originalPrice: 590000,
    rating: 4.9,
    reviewsCount: 22400,
    soldCountMonth: '8.5k+ đã bán',
    isBestSeller: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Trọng lượng siêu nhẹ chỉ 230g với lớp chân không mỏng chỉ 2mm độc quyền.',
      'Cấu tạo 4 lớp cách nhiệt giữ nóng trên 65 độ C sau 6 tiếng, giữ lạnh đá tan chậm suốt 24 tiếng.',
      'Nắp bật có khóa gài chống tràn nước an toàn tuyệt đối khi bỏ balo túi xách.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Lock&Lock (Hàn Quốc)' },
      { label: 'Dung tích', value: '450 ml' },
      { label: 'Chất liệu', value: 'Inox 304 tiêu chuẩn y tế' }
    ]
  },
  {
    id: 'shopee-philips-bhd350',
    title: '[Chính Hãng] Máy Sấy Tóc Ion Hóa Philips BHD350/10 2100W - Đầu Sấy Chăm Sóc Nhiệt ThermoProtect, 6 Chế Độ Sấy Khô',
    slug: 'may-say-toc-philips-bhd350',
    brand: 'Philips Official Store',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 650000,
    originalPrice: 990000,
    rating: 4.8,
    reviewsCount: 7850,
    soldCountMonth: '3.6k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Công suất 2100W tạo luồng khí cực mạnh giúp tóc khô nhanh trong 3 phút.',
      'Phát 20 triệu ion âm mỗi lần sấy giúp tóc bóng mượt, không bị xơ rối hay tích điện.',
      'Đầu sấy ThermoProtect trộn lẫn luồng khí ấm và mát giúp bảo vệ sợi tóc không bị quá nhiệt.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Philips' },
      { label: 'Công suất', value: '2100W' },
      { label: 'Bảo hành', value: '24 tháng' }
    ]
  },
  {
    id: 'shopee-bear-drg',
    title: '[Chính Hãng] Nồi Lẩu Nướng Điện Đa Năng 2 Ngăn Bear DKL-C15G1 3.5L - 2 Núm Chỉnh Nhiệt Độc Lập, Chống Dính Cao Cấp',
    slug: 'noi-lau-nuong-2-ngan-bear',
    brand: 'Bear Official Store',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 890000,
    originalPrice: 1350000,
    rating: 4.8,
    reviewsCount: 9120,
    soldCountMonth: '4.2k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Tích hợp 2 trong 1: Một bên lẩu sôi sùng sục, một bên khay nướng thịt xiên BBQ tiện lợi.',
      'Hai công tắc điều chỉnh nhiệt riêng biệt cho từng ngăn, kiểm soát nhiệt độ linh hoạt.',
      'Lớp chống dính đá maifan cao cấp không khói, dễ dàng lau sạch sau bữa tiệc gia đình.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Bear' },
      { label: 'Dung tích', value: '3.5 Lít' },
      { label: 'Tổng công suất', value: '1600W (800W + 800W)' },
      { label: 'Bảo hành', value: '18 tháng' }
    ]
  },
  {
    id: 'shopee-sunhouse-shd5112',
    title: '[Chính Hãng] Máy Xay Sinh Tố Đa Năng Sunhouse SHD5112 - 2 Cối Thủy Tinh Chịu Lực, Lưỡi Dao Inox Răng Cưa Xay Đá Nhuyễn',
    slug: 'may-xay-sinh-to-sunhouse-shd5112',
    brand: 'Sunhouse Flagship',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 450000,
    originalPrice: 680000,
    rating: 4.7,
    reviewsCount: 15300,
    soldCountMonth: '6.7k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Trang bị 2 cối thủy tinh kháng vỡ cao cấp an toàn tuyệt đối cho sức khỏe.',
      'Công suất 350W kết hợp lưỡi dao thép răng cưa sắc bén xay sinh tố, cháo trẻ em và hạt khô mịn màng.',
      'Rơ-le tự ngắt khi máy quá tải nhiệt đảm bảo an toàn phòng chống cháy nổ.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Sunhouse' },
      { label: 'Công suất', value: '350W' },
      { label: 'Dung tích cối lớn', value: '1.25 Lít' },
      { label: 'Bảo hành', value: '12 tháng' }
    ]
  },
  {
    id: 'shopee-xiaomi-purifier4',
    title: '[Chính Hãng] Máy Lọc Không Khí Xiaomi Smart Air Purifier 4 - Lọc Bụi Mịn PM2.5, Khử Mùi Kháng Khuẩn 99.97%, Màn Hình OLED',
    slug: 'may-loc-khong-khi-xiaomi-purifier-4',
    brand: 'Xiaomi Official',
    category: 'giadung',
    categoryName: 'Gia Dụng & Bếp',
    price: 2990000,
    originalPrice: 3890000,
    rating: 4.9,
    reviewsCount: 6840,
    soldCountMonth: '2.9k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao hỏa tốc 2h',
    bulletPoints: [
      'Lõi lọc 3 trong 1 tích hợp than hoạt tính lọc sạch bụi mịn PM2.5, phấn hoa, lông thú và khói thuốc.',
      'Cung cấp 400m3 khí sạch mỗi giờ (CADR), làm sạch không khí phòng 48m2 chỉ trong 10 phút.',
      'Điều khiển thông minh qua app Mi Home, ra lệnh giọng nói qua Google Assistant / Alexa.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Xiaomi' },
      { label: 'Diện tích sử dụng', value: '28 - 48 m2' },
      { label: 'Độ ồn', value: 'Chỉ 32.1 dB ở chế độ ban đêm' },
      { label: 'Bảo hành', value: '12 tháng' }
    ]
  },

  // =========================================================================
  // PHÂN LOẠI 2: THỜI TRANG & SNEAKER (10 SẢN PHẨM CHÍNH HÃNG)
  // =========================================================================
  {
    id: 'shopee-coolmate-polo',
    title: '[Chính Hãng] Áo Polo Nam Coolmate Pima Cotton Sợi Dài Cao Cấp - Thấm Hút Mồ Hôi, Kháng Khuẩn Chống Nhăn Form Regular Fit',
    slug: 'ao-polo-nam-coolmate-pima',
    brand: 'Coolmate Official',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 299000,
    originalPrice: 450000,
    rating: 4.9,
    reviewsCount: 38200,
    soldCountMonth: '12.4k+ đã bán',
    isBestSeller: true,
    isNextChoice: true,
    isSponsored: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    deliveryTime: 'Giao 2h nội thành',
    bulletPoints: [
      'Chất liệu 95% Cotton Pima sợi dài thượng hạng mềm mịn gấp 2 lần cotton thông thường, 5% Spandex co giãn 4 chiều.',
      'Công nghệ hoàn thiện vải dệt tổ ong thoáng khí không bết dính mồ hôi khi vận động.',
      'Cổ áo dệt bo gân đứng form, cúc áo dập chìm tinh tế chuẩn phong cách lịch lãm quý ông.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Coolmate (Việt Nam)' },
      { label: 'Chất liệu', value: 'Cotton Pima 95% + 5% Spandex' },
      { label: 'Form dáng', value: 'Regular Fit thoải mái' },
      { label: 'Đổi trả', value: 'Đổi trả miễn phí 60 ngày vì bất kỳ lý do gì' }
    ],
    variants: {
      name: 'Kích cỡ & Màu sắc',
      options: [
        { label: 'Size M - Xanh Navy', price: 299000 },
        { label: 'Size L - Đen Classic', price: 299000 },
        { label: 'Size XL - Trắng Tinh Khôi', price: 299000 }
      ]
    }
  },
  {
    id: 'shopee-levents-jean',
    title: '[Chính Hãng] Quần Jean Ống Suông Unisex Levents Wide Leg Denim - Vải Bò Dày Dặn 13.5oz, Wash Màu Vintage Đường Phố',
    slug: 'quan-jean-ong-suong-levents',
    brand: 'Levents Official',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 690000,
    originalPrice: 950000,
    rating: 4.8,
    reviewsCount: 11400,
    soldCountMonth: '4.8k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Form quần ống suông rộng rãi che khuyết điểm chân, hack dáng tôn chiều cao cực đỉnh.',
      'Chất vải Denim cotton 100% dày dặn giữ form đứng dáng, không xù lông phai màu khi giặt máy.',
      'Chi tiết tag da kim loại Levents đính sau cạp quần cao cấp khẳng định thương hiệu.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Levents' },
      { label: 'Chất liệu', value: 'Denim 100% Cotton 13.5oz' },
      { label: 'Kiểu dáng', value: 'Ống suông Baggy Wide-leg' }
    ]
  },
  {
    id: 'shopee-nike-aj1',
    title: '[Chính Hãng] Giày Thể Thao Sneaker Nike Air Jordan 1 Low - Phối Màu Black Toe Classic, Da Thật Êm Ái Đế Đệm Khí Air',
    slug: 'nike-air-jordan-1-low',
    brand: 'Nike Official Store',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 3490000,
    originalPrice: 3990000,
    rating: 4.9,
    reviewsCount: 9840,
    soldCountMonth: '3.2k+ đã bán',
    isBestSeller: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Huyền thoại sneaker phối màu Black Toe đỏ đen trắng không bao giờ lỗi mốt.',
      'Bộ đệm Air-Sole tích hợp gót chân mang lại cảm giác êm ái linh hoạt trong từng bước đi.',
      'Đế ngoài bằng cao su đặc chống trượt với rãnh uốn sâu giúp bám đường tối đa.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Nike (Mỹ)' },
      { label: 'Chất liệu thân', value: 'Da thật cao cấp phối da tổng hợp' },
      { label: 'Công nghệ', value: 'Đệm khí Nike Air' }
    ],
    variants: {
      name: 'Size Giày Chuẩn EU',
      options: [
        { label: 'Size 40 (25cm)', price: 3490000 },
        { label: 'Size 41 (26cm)', price: 3490000 },
        { label: 'Size 42 (26.5cm)', price: 3490000 }
      ]
    }
  },
  {
    id: 'shopee-adidas-ultraboost',
    title: '[Chính Hãng] Giày Chạy Bộ Chuyên Nghiệp Adidas Ultraboost Light - Đệm Hạt Boost Siêu Nhẹ Hoàn Trả Năng Lượng Đỉnh Cao',
    slug: 'giay-chay-bo-adidas-ultraboost-light',
    brand: 'Adidas Flagship Store',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 3690000,
    originalPrice: 4500000,
    rating: 4.9,
    reviewsCount: 6200,
    soldCountMonth: '2.1k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Công nghệ Light BOOST nhẹ hơn 30% so với chất liệu Boost nguyên bản, êm ái nâng niu bàn chân.',
      'Thân giày vải dệt Primeknit+ ôm sát vừa vặn như một đôi tất, thoáng khí tuyệt đối.',
      'Đế ngoài cao su Continental Better Rubber bám dính chắc chắn trên cả đường khô ráo lẫn trời mưa trơn trượt.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Adidas' },
      { label: 'Dòng sản phẩm', value: 'Running Performance' },
      { label: 'Trọng lượng', value: 'Chỉ 299g (Size 42)' }
    ]
  },
  {
    id: 'shopee-northface-jacket',
    title: '[Chính Hãng] Áo Khoác Gió Thể Thao The North Face 2 Lớp Chống Nước GORE-TEX - Khóa Kéo Chống Thấm YKK, Mũ Trùm Tháo Rời',
    slug: 'ao-khoac-gio-the-north-face-goretex',
    brand: 'The North Face Store',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 1190000,
    originalPrice: 1750000,
    rating: 4.8,
    reviewsCount: 8400,
    soldCountMonth: '3.5k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Màng chống nước GORE-TEX trượt nước như lá sen, cản gió tuyệt đối thích hợp phượt và đi mưa.',
      'Lớp lót lưới bên trong thoáng khí giúp không bí bách mồ hôi khi leo núi hoặc đi bộ đường dài.',
      'Khóa kéo YKK chống thấm nước kết hợp đường may ép sim nhiệt chống rò rỉ nước mưa.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'The North Face' },
      { label: 'Chất liệu', value: 'Polyester tráng màng GORE-TEX' },
      { label: 'Chống nước', value: '10.000 mmH2O' }
    ]
  },
  {
    id: 'shopee-teelab-tshirt',
    title: '[Chính Hãng] Áo Thun Tay Lỡ Unisex Teelab Basic Tee 100% Cotton 250GSM - Dày Dặn Đứng Form, Thấm Hút Mồ Hôi Cực Tốt',
    slug: 'ao-thun-tay-lo-teelab-cotton',
    brand: 'Teelab Official Store',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 199000,
    originalPrice: 320000,
    rating: 4.9,
    reviewsCount: 65000,
    soldCountMonth: '25k+ đã bán',
    isBestSeller: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Chất vải 100% Cotton định lượng 250GSM dày dặn không lộ cơ thể, co giãn 2 chiều thoải mái.',
      'Form dáng Oversize tay lỡ chuẩn xu hướng Streetwear Hàn Quốc nam nữ đều mặc đẹp.',
      'Cổ áo dệt bo gân dày 2.5cm không bai nhão xệ cổ dù giặt máy nhiều lần.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Teelab' },
      { label: 'Chất liệu', value: 'Cotton 100% 250GSM' },
      { label: 'Xuất xứ', value: 'Made in Vietnam' }
    ]
  },
  {
    id: 'shopee-torano-suit',
    title: '[Chính Hãng] Bộ Quần Áo Thể Thao Nỉ Nam Torano Thu Đông - Chất Nỉ Da Cá Dày Dặn Giữ Nhiệt, Form Thể Thao Năng Động',
    slug: 'bo-the-thao-ni-nam-torano',
    brand: 'Torano Menswear',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 690000,
    originalPrice: 1050000,
    rating: 4.8,
    reviewsCount: 7100,
    soldCountMonth: '3.1k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Chất nỉ da cá cotton chải kỹ không xù lông, giữ ấm cơ thể trong thời tiết se lạnh.',
      'Áo khoác kéo khóa tiện lợi kết hợp quần bo gấu jogger gọn gàng tôn dáng khỏe khoắn.',
      'Túi áo và túi quần có khóa kéo chống rơi điện thoại, chìa khóa khi tập gym chạy bộ.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Torano' },
      { label: 'Chất liệu', value: 'Nỉ da cá cotton cao cấp' }
    ]
  },
  {
    id: 'shopee-gumac-dress',
    title: '[Chính Hãng] Váy Đầm Nữ Dáng Xòe Công Sở GUMAC Cổ V Tôn Dáng - Chất Liệu Voan Hàn Lót Lụa Mềm Mát Duyên Dáng',
    slug: 'vay-dam-xoe-cong-so-gumac',
    brand: 'GUMAC Official Store',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 550000,
    originalPrice: 890000,
    rating: 4.9,
    reviewsCount: 9400,
    soldCountMonth: '4.5k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Thiết kế cổ chữ V nhẹ nhàng khoe xương quai xanh quyến rũ, eo thắt nơ tôn dáng con kiến.',
      'Tùng váy xếp ly xòe nhẹ nhàng che khuyết điểm bụng dưới và bắp chân hiệu quả.',
      'Chất vải Voan Hàn cao cấp mềm mại rũ tự nhiên, có lớp lót lụa habutai kín đáo bên trong.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'GUMAC' },
      { label: 'Màu sắc', value: 'Hồng pastel, Be thanh lịch, Đen huyền bí' }
    ]
  },
  {
    id: 'shopee-vans-slipon',
    title: '[Chính Hãng] Giày Lười Thể Thao Vans Classic Slip-On Checkerboard - Họa Tiết Caro Đen Trắng Biểu Tượng Streetwear',
    slug: 'giay-vans-classic-slip-on',
    brand: 'Vans Official Store',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 1550000,
    originalPrice: 1850000,
    rating: 4.8,
    reviewsCount: 12500,
    soldCountMonth: '5.2k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Thiết kế không dây xỏ chân tiện lợi nhanh chóng, phù hợp phối mọi phong cách trang phục.',
      'Chất liệu vải Canvas cao cấp dày dặn bền bỉ, dễ dàng vệ sinh sạch sẽ.',
      'Đế cao su lưu hóa bánh quế (Waffle) đặc trưng độ bám cao chống trơn trượt hiệu quả.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Vans (Mỹ)' },
      { label: 'Mẫu mã', value: 'Classic Slip-On Caro' }
    ]
  },
  {
    id: 'shopee-juno-heels',
    title: '[Chính Hãng] Giày Cao Gót Nữ Juno 5cm Quai Mảnh Mũi Nhọn - Gót Vuông Trụ Chắc Chắn Lót Mút Êm Chân Cả Ngày',
    slug: 'giay-cao-got-juno-5cm',
    brand: 'Juno Official Store',
    category: 'thoitrang',
    categoryName: 'Thời Trang & Sneaker',
    price: 490000,
    originalPrice: 790000,
    rating: 4.8,
    reviewsCount: 8700,
    soldCountMonth: '3.8k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'shoe',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Độ cao 5cm lý tưởng cho chị em công sở đi lại cả ngày không lo mỏi gối đau chân.',
      'Mũi nhọn thanh thoát kéo dài đôi chân thon gọn, gót vuông chắc chắn từng bước đi.',
      'Lót đế đệm mút cao su non kháng khuẩn êm ái chống phồng rộp gót chân.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Juno' },
      { label: 'Chiều cao gót', value: '5 cm' }
    ]
  },

  // =========================================================================
  // PHÂN LOẠI 3: ĐIỆN TỬ & THIẾT BỊ SỐ (10 SẢN PHẨM CHÍNH HÃNG)
  // =========================================================================
  {
    id: 'shopee-sony-wh1000xm5',
    title: '[Chính Hãng] Tai Nghe Chống Ồn Cao Cấp Sony WH-1000XM5 Hi-Res Audio - 8 Micro Triệt Tiêu Tiếng Ồn, Pin 30H Sạc Nhanh 3 Phút',
    slug: 'tai-nghe-sony-wh-1000xm5',
    brand: 'Sony Official Store',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 6990000,
    originalPrice: 8490000,
    rating: 4.9,
    reviewsCount: 5120,
    soldCountMonth: '1.9k+ đã bán',
    isBestSeller: true,
    isNextChoice: true,
    isSponsored: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    deliveryTime: 'Giao hỏa tốc 2 giờ',
    bulletPoints: [
      'Bộ xử lý tích hợp V1 kết hợp chip chống ồn chuyên dụng HD QN1 triệt tiêu âm thanh ồn ào xung quanh hoàn hảo.',
      'Driver 30mm màng loa sợi carbon tái tạo âm thanh vòm Hi-Res Audio chân thực, bass sâu chắc nịch.',
      'Thời lượng pin khủng 30 giờ liên tục, công nghệ sạc siêu tốc 3 phút nghe được 3 giờ.',
      'Đệm tai da mềm Fit Leather nhẹ êm ôm khít vành tai mà không gây áp lực đau đầu.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Sony (Nhật Bản)' },
      { label: 'Thời lượng pin', value: '30 giờ (Bật chống ồn) / 40 giờ (Tắt chống ồn)' },
      { label: 'Trọng lượng', value: '250g' },
      { label: 'Bảo hành', value: '12 tháng chính hãng Sony Việt Nam' }
    ]
  },
  {
    id: 'shopee-anker-gan65w',
    title: '[Chính Hãng] Củ Sạc Nhanh Anker GaNPrime 65W A2668 - 3 Cổng Sạc (2 Type-C + 1 USB-A), Sạc Cùng Lúc Laptop & iPhone Siêu Mát',
    slug: 'cu-sac-nhanh-anker-gan-65w',
    brand: 'Anker Official Flagship',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 890000,
    originalPrice: 1350000,
    rating: 4.9,
    reviewsCount: 18400,
    soldCountMonth: '7.8k+ đã bán',
    isBestSeller: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Công nghệ bán dẫn GaNPrime thế hệ mới thu nhỏ kích thước củ sạc đến 53% so với củ sạc MacBook thông thường.',
      'Công nghệ phân bổ điện năng thông minh PowerIQ 4.0 tự động điều chỉnh công suất tối ưu cho thiết bị.',
      'Cảm biến nhiệt độ ActiveShield 2.0 theo dõi nhiệt độ hơn 3 triệu lần mỗi ngày chống quá nhiệt bảo vệ máy.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Anker (Mỹ)' },
      { label: 'Tổng công suất', value: '65W Max' },
      { label: 'Cổng giao tiếp', value: '2 x USB-C PD, 1 x USB-A QC' },
      { label: 'Bảo hành', value: '18 tháng lỗi 1 đổi 1' }
    ]
  },
  {
    id: 'shopee-keychron-k2pro',
    title: '[Chính Hãng] Bàn Phím Cơ Không Dây Keychron K2 Pro QMK/VIA - Hot-swap Switch Thay Thế Nhanh, LED RGB, Kết Nối 3 Thiết Bị',
    slug: 'ban-phim-co-keychron-k2-pro',
    brand: 'Keychron Vietnam',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 2190000,
    originalPrice: 2690000,
    rating: 4.9,
    reviewsCount: 4200,
    soldCountMonth: '1.6k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Hỗ trợ phần mềm QMK/VIA tùy biến gán phím, macro và hiệu ứng ánh sáng tự do không giới hạn.',
      'Mạch Hot-swap 5-pin cho phép tháo lắp thay đổi mọi loại switch cơ học mà không cần hàn mạch.',
      'Tương thích mượt mà cả macOS và Windows với hàng phím chức năng đa phương tiện chuyên dụng.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Keychron' },
      { label: 'Layout', value: '75% (84 phím)' },
      { label: 'Switch', value: 'Keychron K Pro Red / Brown / Blue' }
    ]
  },
  {
    id: 'shopee-logitech-mxmaster3s',
    title: '[Chính Hãng] Chuột Không Dây Công Thái Học Logitech MX Master 3S - Cảm Biến 8K DPI Lướt Mọi Mặt Kính, Con Lăn Điện Từ MagSpeed',
    slug: 'chuot-logitech-mx-master-3s',
    brand: 'Logitech Official Store',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 2290000,
    originalPrice: 2790000,
    rating: 4.9,
    reviewsCount: 8900,
    soldCountMonth: '3.4k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Nút bấm tĩnh âm Quiet Clicks giảm 90% tiếng ồn nhấp chuột nhưng vẫn giữ cảm giác bấm nảy chính xác.',
      'Con lăn thép điện từ MagSpeed cuộn 1000 dòng trong 1 giây siêu mượt mà không một tiếng động.',
      'Cảm biến quang học 8000 DPI theo dõi chính xác trên hầu hết mọi bề mặt bao gồm cả mặt bàn kính bóng.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Logitech (Thụy Sĩ)' },
      { label: 'Kết nối', value: 'Bluetooth & Đầu thu Logi Bolt USB' }
    ]
  },
  {
    id: 'shopee-apple-watch-s9',
    title: '[Chính Hãng] Đồng Hồ Thông Minh Apple Watch Series 9 GPS 41mm - Chip S9 Siêu Mạnh Mẽ, Thao Tác Chạm Hai Lần Double Tap',
    slug: 'apple-watch-series-9',
    brand: 'Apple Authorized Store',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 8990000,
    originalPrice: 10490000,
    rating: 4.9,
    reviewsCount: 3100,
    soldCountMonth: '1.2k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Tính năng chạm hai ngón tay (Double Tap) kỳ diệu trả lời cuộc gọi, tắt chuông báo thức chỉ bằng 1 tay.',
      'Màn hình Retina Always-On độ sáng lên đến 2000 nits hiển thị rõ nét ngay dưới trời nắng gắt.',
      'Cảm biến sức khỏe tiên tiến đo điện tâm đồ ECG, nồng độ oxy trong máu SpO2 và theo dõi chu kỳ giấc ngủ.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Apple (Mỹ)' },
      { label: 'Kích thước', value: '41 mm Nhôm' },
      { label: 'Bảo hành', value: '12 tháng chính hãng Apple Care' }
    ]
  },
  {
    id: 'shopee-marshall-minor3',
    title: '[Chính Hãng] Tai Nghe Bluetooth True Wireless Marshall Minor III - Âm Thanh Rock Signature Đậm Chất, Pin 25 Giờ Sạc Không Dây',
    slug: 'tai-nghe-marshall-minor-3',
    brand: 'Marshall Official Store',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 2650000,
    originalPrice: 3390000,
    rating: 4.8,
    reviewsCount: 4600,
    soldCountMonth: '1.8k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Chất âm Marshall Signature Sound bùng nổ, âm trầm uy lực kết hợp âm trung rõ nét từng tiếng guitar.',
      'Thiết kế dạng tai gài Earbud không bí bách khoang tai khi đeo nghe nhạc suốt cả ngày.',
      'Hộp sạc bọc da vân cổ điển tích hợp công nghệ sạc không dây chuẩn Qi thời thượng.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Marshall (Anh Quốc)' },
      { label: 'Thời lượng pin', value: '5 giờ tai nghe + 20 giờ hộp sạc' }
    ]
  },
  {
    id: 'shopee-baseus-blade100w',
    title: '[Chính Hãng] Pin Sạc Dự Phòng Siêu Mỏng Baseus Blade 100W 20000mAh - 4 Cổng Sạc Độc Lập Sạc Nhanh Laptop MacBook & Điện Thoại',
    slug: 'pin-sac-du-phong-baseus-blade-100w',
    brand: 'Baseus Official',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 1150000,
    originalPrice: 1590000,
    rating: 4.8,
    reviewsCount: 6800,
    soldCountMonth: '2.5k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1609592424364-585474c33f27?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Độ dày siêu mỏng chỉ 18mm dạng phẳng kẹp vừa vặn vào túi đựng laptop không bị cộm.',
      'Công suất cực đại 100W sạc đầy 50% pin cho MacBook Pro 14 inch chỉ trong vòng 30 phút.',
      'Màn hình LED hiển thị trực quan thông số phần trăm pin, công suất sạc W và thời gian sạc còn lại.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Baseus' },
      { label: 'Dung lượng pin', value: '20000 mAh' },
      { label: 'Công suất', value: '100W Power Delivery' }
    ]
  },
  {
    id: 'shopee-jbl-flip6',
    title: '[Chính Hãng] Loa Bluetooth Di Động JBL Flip 6 - Kháng Nước Bụi IP67 Siêu Bền, Hệ Thống Loa 2 Đường Tiếng Âm Trầm Sâu Lắng',
    slug: 'loa-bluetooth-jbl-flip-6',
    brand: 'JBL Official Store',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 2190000,
    originalPrice: 2790000,
    rating: 4.9,
    reviewsCount: 7800,
    soldCountMonth: '3.1k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Hệ thống củ loa 2 chiều bao gồm loa trầm dạng đường đua và loa tweeter riêng biệt cho âm cao trong trẻo.',
      'Chuẩn kháng nước và bụi bẩn IP67 đồng hành cùng bạn ra bãi biển, hồ bơi hay mọi chuyến dã ngoại.',
      'Thời lượng pin lên đến 12 giờ phát nhạc liên tục chỉ sau 1 lần sạc đầy.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'JBL (Mỹ)' },
      { label: 'Công suất', value: '30W RMS' },
      { label: 'Chống nước', value: 'IP67' }
    ]
  },
  {
    id: 'shopee-ugreen-stand',
    title: '[Chính Hãng] Giá Đỡ Điện Thoại & Máy Tính Bảng Hợp Kim Nhôm Ugreen Xoay 360 Độ - Khớp Nối Kép Chắc Chắn Chống Rung Lắc',
    slug: 'gia-do-dien-thoai-ugreen-360',
    brand: 'Ugreen Official',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 280000,
    originalPrice: 420000,
    rating: 4.9,
    reviewsCount: 24500,
    soldCountMonth: '9.8k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Chất liệu hợp kim nhôm nguyên khối đầm chắc, đế có lót silicone bám dính mặt bàn không trầy xước.',
      'Khớp xoay trục 360 độ phát ra tiếng click giòn tai, điều chỉnh mọi góc nhìn livestream hay xem phim.',
      'Tương thích hoàn hảo với mọi dòng điện thoại thông minh và máy tính bảng iPad lên đến 12.9 inch.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Ugreen' },
      { label: 'Chất liệu', value: 'Hợp kim nhôm + Silicone' }
    ]
  },
  {
    id: 'shopee-boya-byv20',
    title: '[Chính Hãng] Micro Thu Âm Không Dây Cài Áo Boya BY-V20 Chân Type-C - Lọc Tạp Âm Chủ Động Bằng Nút Bấm, Thu Âm Bán Hàng 50m',
    slug: 'micro-thu-am-boya-by-v20',
    brand: 'Boya Official Store',
    category: 'dientu',
    categoryName: 'Điện Tử & Thiết Bị Số',
    price: 590000,
    originalPrice: 850000,
    rating: 4.8,
    reviewsCount: 5300,
    soldCountMonth: '2.2k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'headphones',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Bộ đôi 2 micro phát và 1 đầu thu cắm trực tiếp điện thoại livestream bán hàng hoặc phỏng vấn 2 người.',
      'Nút bấm lọc ồn Noise Cancelling triệt tiêu hoàn toàn tiếng còi xe, tiếng gió đường phố.',
      'Khoảng cách truyền tín hiệu không dây ổn định lên đến 50 mét không độ trễ.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Boya' },
      { label: 'Cổng cắm', value: 'Type-C tương thích Android và iPhone 15/16' }
    ]
  },

  // =========================================================================
  // PHÂN LOẠI 4: BALO, TÚI XÁCH & PHỤ KIỆN TIỆN ÍCH (10 SẢN PHẨM CHÍNH HÃNG)
  // =========================================================================
  {
    id: 'shopee-markryden-bp',
    title: '[Chính Hãng] Balo Laptop Doanh Nhân Mark Ryden Chống Trộm MR9031 - Vải Oxford Chống Rạch Chống Nước, Khóa Số TSA, Ngăn Laptop 17.3"',
    slug: 'balo-laptop-mark-ryden-chong-trom',
    brand: 'Mark Ryden Official',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 950000,
    originalPrice: 1390000,
    rating: 4.9,
    reviewsCount: 16800,
    soldCountMonth: '6.4k+ đã bán',
    isBestSeller: true,
    isNextChoice: true,
    isSponsored: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    deliveryTime: 'Giao 2h nội thành',
    bulletPoints: [
      'Khóa mã số an ninh hải quan TSA kết hợp khóa kéo ẩn phía lưng chống trộm móc túi nơi đông người.',
      'Tích hợp cổng sạc USB kép bên hông balo giúp bạn vừa đi bộ vừa cắm sạc điện thoại cực tiện lợi.',
      'Ngăn đựng laptop chuyên dụng chống sốc hạt bóng khí tổ ong chứa vừa laptop từ 15.6 đến 17.3 inch.',
      'Chất vải Oxford mật độ cao phủ màng chống thấm nước trượt nước mưa hoàn hảo.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Mark Ryden (Anh Quốc)' },
      { label: 'Kích thước', value: '45 x 30 x 18 cm' },
      { label: 'Trọng lượng', value: '1.1 kg' },
      { label: 'Bảo hành', value: '12 tháng khóa kéo và đường may' }
    ]
  },
  {
    id: 'shopee-tomtoc-sling',
    title: '[Chính Hãng] Túi Đeo Chéo Nam Tomtoc Urban Cordura Ballistic - Chống Thấm Nước Cực Đỉnh, Khóa Từ YKK Bền Bỉ, Ngăn Chứa iPad 11"',
    slug: 'tui-deo-cheo-tomtoc-urban',
    brand: 'Tomtoc Official Store',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 790000,
    originalPrice: 1150000,
    rating: 4.9,
    reviewsCount: 7800,
    soldCountMonth: '3.1k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Chất vải Cordura Ballistic quân sự siêu bền chống mài mòn và kháng nước vượt trội.',
      'Khóa gài dây đeo nam châm Duraflex thông minh tháo mở nhanh chỉ với 1 tay.',
      'Thiết kế đa ngăn khoa học chứa trọn vẹn iPad 11 inch, ví tiền, chìa khóa và pin dự phòng.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Tomtoc (Mỹ)' },
      { label: 'Chất liệu', value: 'Cordura Nylon 840D' }
    ]
  },
  {
    id: 'shopee-mia-luggage',
    title: '[Chính Hãng] Vali Du Lịch Kéo Size 20 Inch Khung Nhôm Khóa Sập TSA - Nhựa PC/ABS Đàn Hồi Chống Vỡ, Bánh Xe Đôi Xoay 360 Độ',
    slug: 'vali-du-lich-khung-nhom-20inch',
    brand: 'MIA Luggage Official',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 1290000,
    originalPrice: 1890000,
    rating: 4.8,
    reviewsCount: 11200,
    soldCountMonth: '4.2k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Khung viền nhôm cứng cáp cùng khóa sập đôi bảo mật cao cấp loại bỏ hoàn toàn nguy cơ bị rạch khóa.',
      'Vỏ nhựa PC + ABS 3 lớp đàn hồi siêu bền, chịu được lực ép va đập mạnh từ máy bay.',
      'Hệ thống 8 bánh xe bọc cao su non xoay 360 độ lướt đi êm ru không gây tiếng ồn trên nền gạch.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'MIA VN' },
      { label: 'Kích cỡ', value: 'Size 20 inch (Xách tay khoang máy bay)' },
      { label: 'Bảo hành', value: '5 năm phụ kiện bánh xe, cần kéo' }
    ]
  },
  {
    id: 'shopee-leonardo-wallet',
    title: '[Chính Hãng] Ví Da Bò Nam Mini Dáng Đứng Leonardo Da Thật 100% - Ngăn Chứa Thẻ Thông Minh Chống Đánh Cắp RFID, Tặng Hộp Quà',
    slug: 'vi-da-nam-leonardo-mini',
    brand: 'Leonardo Vietnam',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 450000,
    originalPrice: 690000,
    rating: 4.9,
    reviewsCount: 14200,
    soldCountMonth: '5.8k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Da bò Nappa nhập khẩu nguyên miếng mềm mại, càng dùng lâu da càng bóng đẹp tự nhiên.',
      'Thiết kế nhỏ gọn tối giản vừa vặn túi quần không gây cộm khó chịu khi ngồi xe.',
      'Tích hợp màng kim loại chặn sóng vô tuyến RFID bảo vệ an toàn thẻ tín dụng không tiếp xúc.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Leonardo' },
      { label: 'Chất liệu', value: 'Da bò thật 100%' }
    ]
  },
  {
    id: 'shopee-xiaomi-sunglasses',
    title: '[Chính Hãng] Kính Mát Phân Cực Thời Trang Xiaomi Polarized Sunglasses - Tròng Kính Chống Tia UV400, Khung Titan Siêu Nhẹ 19g',
    slug: 'kinh-mat-phan-cuc-xiaomi',
    brand: 'Xiaomi Official',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 350000,
    originalPrice: 520000,
    rating: 4.8,
    reviewsCount: 8900,
    soldCountMonth: '3.6k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Tròng kính phân cực TAC lọc sạch ánh sáng chói lóa từ mặt đường và kính xe khi lái xe ban ngày.',
      'Khả năng chống tia cực tím UV400 đạt 100% bảo vệ đôi mắt khỏi thoái hóa võng mạc.',
      'Gọng kính không ốc vít làm bằng thép không gỉ đàn hồi cao không gây cấn đau vành tai.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Xiaomi' },
      { label: 'Trọng lượng', value: 'Chỉ 19g' }
    ]
  },
  {
    id: 'shopee-lacoste-belt',
    title: '[Chính Hãng] Thắt Lưng Nam Da Bò Khóa Tự Động Cao Cấp - Mặt Khóa Hợp Kim Chống Rỉ Sang Trọng Chuẩn Phong Cách Công Sở',
    slug: 'that-lung-nam-da-bo-khoa-tu-dong',
    brand: 'Aristino Official',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 420000,
    originalPrice: 620000,
    rating: 4.9,
    reviewsCount: 15600,
    soldCountMonth: '6.1k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Dây lưng da bò 2 lớp liền khối dập vân sang trọng, không lo bong tróc nứt gãy theo thời gian.',
      'Đầu khóa kim loại tự động bánh răng ăn khớp chắc chắn, điều chỉnh vừa vặn từng milimet eo.',
      'Kèm hộp quà sang trọng thích hợp làm quà tặng sinh nhật bạn trai, người thân đồng nghiệp.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Aristino' },
      { label: 'Chiều dài dây', value: '120 cm (Cắt ngắn tùy ý)' }
    ]
  },
  {
    id: 'shopee-cashmere-scarf',
    title: '[Chính Hãng] Khăn Choàng Cổ Len Cashmere Họa Tiết Kẻ Caro - Mềm Mịn Giữ Ấm Cổ Mùa Đông, Phong Cách Hàn Quốc Nam Nữ Unisex',
    slug: 'khan-choang-co-len-cashmere',
    brand: 'YODY Official Store',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 290000,
    originalPrice: 450000,
    rating: 4.8,
    reviewsCount: 9200,
    soldCountMonth: '4.5k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Chất liệu Cashmere dệt kim mềm mịn không xơ cứng châm chích ngứa cổ khi quàng.',
      'Kích thước lớn 200 x 70cm vừa làm khăn quàng cổ ấm áp vừa làm chăn ủ nhẹ văn phòng điều hòa.',
      'Họa tiết kẻ caro phối màu trang nhã dễ phối hợp cùng áo khoác dạ, áo phao mùa đông.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'YODY' },
      { label: 'Kích thước', value: '200 x 70 cm' }
    ]
  },
  {
    id: 'shopee-auto-umbrella',
    title: '[Chính Hãng] Ô Dù Che Mưa Nắng Tự Động 2 Chiều Cán Gỗ Chống Lật - Vải Nano Trượt Nước Chống Tia UV, Khung 10 Nan Thép Đen Chắc Chắn',
    slug: 'o-che-mua-nang-tu-dong-2-chieu',
    brand: 'Lock&Lock Official',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 240000,
    originalPrice: 360000,
    rating: 4.8,
    reviewsCount: 18700,
    soldCountMonth: '7.9k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1517865288-978fcb780652?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Nút bấm tự động mở và tự động thu ô tiện lợi chỉ với 1 tay khi ra vào xe ô tô trời mưa.',
      'Khung 10 nan thép gia cường chống lật ngược gãy nan khi gặp gió lốc mạnh.',
      'Vải dù tráng lớp keo vinyl đen cản 99% tia UV hạ nhiệt độ cơ thể 3-5 độ C dưới trời nắng.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Lock&Lock' },
      { label: 'Đường kính che', value: '105 cm (Che vừa 2 người)' }
    ]
  },
  {
    id: 'shopee-thermo-sports',
    title: '[Chính Hãng] Bình Nước Thể Thao Giữ Nhiệt Inox 316 1000ml Có Ống Hút & Dây Đeo - Giữ Đá Lạnh Suốt 36H, Chống Tràn Tuyệt Đối',
    slug: 'binh-nuoc-the-thao-inox-316-1000ml',
    brand: 'Tyeso Official Flagship',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 330000,
    originalPrice: 520000,
    rating: 4.9,
    reviewsCount: 28900,
    soldCountMonth: '11.5k+ đã bán',
    isBestSeller: true,
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Lòng bình đúc inox 316 y tế cao cấp chống ăn mòn axit từ nước ép hoa quả, an toàn tuyệt đối.',
      'Dung tích lớn 1000ml đáp ứng đủ lượng nước giải khát khi tập gym, đạp xe thể thao dã ngoại.',
      'Nắp bình 2 chế độ uống: vừa có ống hút silicon mềm tiện lợi vừa có miệng rót nước rộng rãi.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Tyeso' },
      { label: 'Dung tích', value: '1000 ml' },
      { label: 'Chất liệu ruột', value: 'Inox 316 cao cấp' }
    ]
  },
  {
    id: 'shopee-chubbie-canvas',
    title: '[Chính Hãng] Túi Tote Vải Canvas Dày Dặn Dáng Đứng Có Khóa Kéo Nhiều Ngăn - Đựng Vừa Sách Vở A4 Và Laptop 14 Inch Đi Học Đi Làm',
    slug: 'tui-tote-canvas-nhieu-ngan',
    brand: 'Chubbie Studio',
    category: 'phukien',
    categoryName: 'Balo, Túi Xách & Phụ Kiện',
    price: 190000,
    originalPrice: 320000,
    rating: 4.8,
    reviewsCount: 31200,
    soldCountMonth: '13.8k+ đã bán',
    shopeeMall: true,
    sourcePlatform: 'Shopee',
    icon: 'briefcase',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    deliveryTime: 'Giao 2h',
    bulletPoints: [
      'Chất vải Canvas bố dày dặn 16oz chịu tải nặng trên 10kg không bục chỉ rách đáy.',
      'Miệng túi có khóa kéo răng đồng bảo vệ đồ đạc không bị rơi rớt khi di chuyển xe máy.',
      'Ngăn phụ bên trong có khóa kéo riêng biệt để chìa khóa, son phấn, tiền lẻ tiện lợi.'
    ],
    specifications: [
      { label: 'Thương hiệu', value: 'Chubbie Studio' },
      { label: 'Kích thước', value: '38 x 35 x 10 cm' }
    ]
  }
];

export const FREQUENTLY_BOUGHT_TOGETHER = [
  {
    product: MOCK_PRODUCTS[0], // Philips Airfryer
    complementary: [
      {
        id: 'comp-01',
        title: 'Bộ Khay Nướng Silicon Chống Dính Tái Sử Dụng Cho Nồi Chiên Không Dầu',
        price: 250000,
        originalPrice: 380000,
        image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'comp-02',
        title: 'Bình Xịt Dầu Ăn Thủy Tinh Cao Cấp Phun Sương Tiết Kiệm 200ml',
        price: 120000,
        originalPrice: 180000,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80'
      }
    ],
    comboPrice: 2150000,
    savings: 420000
  }
];
