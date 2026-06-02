import { Product, Review, Order } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'AIR MAX PULSE',
    category: 'Giày',
    price: 3500000,
    originalPrice: 4200000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+MAX+PULSE.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+MAX+PULSE.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5e6d4c-3b2a-4c1d-9e7f-6a5b4c3d2e1f/AIR+MAX+PULSE.png',
    ],
    description: 'Giày chạy bộ với đệm Air Max siêu nhẹ, êm ái. Công nghệ đệm khí Nike Air giúp giảm chấn tối đa, phù hợp cho mọi hoạt động thể thao.',
    details: ['Đệm Air Max thế hệ mới', 'Đế ngoài cao su chống trượt', 'Thân lưới thoáng khí', 'Công nghệ đệm khí Nike Air'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['Đen', 'Trắng', 'Đỏ'],
    isNew: true,
    rating: 4.8,
    reviewCount: 156,
    brand: 'Nike',
  },
  {
    id: '2',
    name: 'ALPHAFLY 3',
    category: 'Giày',
    price: 8900000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/45fa5e7b-0bd0-42d8-91c4-0015cbf6cb77/ALPHAFLY+3.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/45fa5e7b-0bd0-42d8-91c4-0015cbf6cb77/ALPHAFLY+3.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3a2b1c0d-5e4f-6a7b-8c9d-0e1f2a3b4c5d/ALPHAFLY+3.png',
    ],
    description: 'Giày chạy marathon đỉnh cao với carbon plate và ZoomX foam. Tối ưu cho vận động viên chuyên nghiệp.',
    details: ['Carbon plate siêu nhẹ', 'ZoomX foam đàn hồi cao', 'Thiết kế khí động học', 'Trọng lượng siêu nhẹ 185g'],
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Đen', 'Trắng', 'Xanh'],
    isNew: true,
    rating: 4.9,
    reviewCount: 89,
    brand: 'Nike',
  },
  {
    id: '3',
    name: 'LEBRON XXII',
    category: 'Giày',
    price: 5200000,
    originalPrice: 6000000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5c5e0c9b-f7c8-41e6-88bc-b5534c0d1a3c/LEBRON+XXII.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5c5e0c9b-f7c8-41e6-88bc-b5534c0d1a3c/LEBRON+XXII.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/LEBRON+XXII.png',
    ],
    description: 'Giày bóng rổ cao cấp với đệm khí Zoom Air kép. Hỗ trợ tối đa cổ chân và bám sân xuất sắc.',
    details: ['Zoom Air kép', 'Đế xoáy chống trượt', 'Cổ cao bảo vệ mắt cá', 'Công nghệ Flyknit'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Đen', 'Đỏ', 'Trắng'],
    isSale: true,
    rating: 4.7,
    reviewCount: 234,
    brand: 'Nike',
  },
  {
    id: '4',
    name: 'ÁO THUN DRY-FIT',
    category: 'Áo',
    price: 650000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98fedc2f-dadc-4cfb-8f88-7f5df16ff9c4/M+NK+DF+ACADEMY+23+TOP.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/98fedc2f-dadc-4cfb-8f88-7f5df16ff9c4/M+NK+DF+ACADEMY+23+TOP.png',
    ],
    description: 'Áo thun thể thao chất liệu Dry-Fit thấm hút mồ hôi nhanh. Thiết kế ôm vừa vặn, thoáng khí.',
    details: ['Công nghệ Dri-FIT', 'Chất liệu nhẹ thoáng khí', 'Đường may phẳng', 'Không bai dão'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Trắng', 'Xám', 'Đỏ'],
    rating: 4.6,
    reviewCount: 412,
    brand: 'Nike',
  },
  {
    id: '5',
    name: 'QUẦN SHORTS DRI-FIT',
    category: 'Quần',
    price: 550000,
    originalPrice: 700000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bbd6b53a-84d4-433c-9e48-a5744267d2cf/M+NK+DF+ACADEMY+23+SHORT.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bbd6b53a-84d4-433c-9e48-a5744267d2cf/M+NK+DF+ACADEMY+23+SHORT.png',
    ],
    description: 'Quần short thể thao co giãn 4 chiều, nhẹ và thoáng mát. Túi zip an toàn khi vận động.',
    details: ['Co giãn 4 chiều', 'Túi zip an toàn', 'Dây rút điều chỉnh', 'Không thấm nước'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Đen', 'Xám', 'Trắng'],
    isSale: true,
    rating: 4.5,
    reviewCount: 189,
    brand: 'Nike',
  },
  {
    id: '6',
    name: 'ÁO KHOÁT WINDRUNNER',
    category: 'Áo',
    price: 2100000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3a4bc71-28ac-4818-9d48-a17b38c13a69/W+NK+TF+GX+UV+JKT.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3a4bc71-28ac-4818-9d48-a17b38c13a69/W+NK+TF+GX+UV+JKT.png',
    ],
    description: 'Áo khoác chống gió siêu nhẹ, gọn gàng. Chất liệu chống nước, phù hợp cho chạy bộ ngoài trời.',
    details: ['Chống gió chống nước', 'Gập gọn bỏ túi', 'Khóa kéo YKK', 'Mũ trùm điều chỉnh'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Trắng', 'Xanh đậm'],
    isNew: true,
    rating: 4.7,
    reviewCount: 94,
    brand: 'Nike',
  },
  {
    id: '7',
    name: 'BÓNG ĐÁ FLIGHT',
    category: 'Phụ kiện',
    price: 890000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22b9b7c9-4da7-4b7f-8c4a-8c1e9a2b3d4e/FLIGHT+BALL.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22b9b7c9-4da7-4b7f-8c4a-8c1e9a2b3d4e/FLIGHT+BALL.png',
    ],
    description: 'Bóng đá cao cấp, chuẩn FIFA. Công nghệ bề mặt Aerowtrack giúp ổn định đường bay.',
    details: ['Chuẩn FIFA Quality Pro', 'Bề mặt Aerowtrack', 'Bọc cao su nhựa tổng hợp', 'Van khí cao su butyl'],
    sizes: ['5'],
    colors: ['Trắng', 'Trắng-Đen'],
    rating: 4.8,
    reviewCount: 67,
    brand: 'Nike',
  },
  {
    id: '8',
    name: 'TÚI GYM ZENITH 40L',
    category: 'Phụ kiện',
    price: 1500000,
    originalPrice: 1800000,
    image: 'https://i.pinimg.com/736x/e6/72/3c/e6723c000c058ee897b69b8c4f58be6f.jpg',
    images: [
      'https://i.pinimg.com/736x/e6/72/3c/e6723c000c058ee897b69b8c4f58be6f.jpg',
    ],
    description: 'Túi thể thao đa năng 40L. Nhiều ngăn chứa, chống nước, quai đeo chắc chắn.',
    details: ['Chất liệu chống nước', 'Ngăn giày riêng biệt', 'Quai đeo vai êm', 'Khoá kéo chống nước'],
    sizes: ['40L'],
    colors: ['Đen', 'Xám'],
    isSale: true,
    rating: 4.4,
    reviewCount: 128,
    brand: 'Zenith',
  },
  {
    id: '9',
    name: 'VỢT TENNIS PRO 27"',
    category: 'Phụ kiện',
    price: 3200000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d/VS+TOUR+26.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d/VS+TOUR+26.png',
    ],
    description: 'Vợt tennis chuyên nghiệp, khung carbon siêu nhẹ. Cân bằng hoàn hảo cho cú đánh mạnh.',
    details: ['Khung carbon siêu nhẹ 280g', 'Mặt vợt 645cm²', 'Cân bằng 320mm', 'Dây đan chuyên nghiệp'],
    sizes: ['27"'],
    colors: ['Đen', 'Trắng-Đỏ'],
    isNew: true,
    rating: 4.6,
    reviewCount: 45,
    brand: 'Wilson',
  },
  {
    id: '10',
    name: 'LEGGINGS YOGA PRO',
    category: 'Quần',
    price: 780000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/W+NK+ONE+LEG+FLX+HR+7-8.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/W+NK+ONE+LEG+FLX+HR+7-8.png',
    ],
    description: 'Quần legging yoga co giãn 4 chiều, eo cao ôm gọn. Chất liệu mềm mại, không phai màu.',
    details: ['Eo cao không kẹt', 'Co giãn 4 chiều', 'Công nghệ chống mùi', 'Đường may phẳng'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Đen', 'Xám', 'Xanh'],
    rating: 4.7,
    reviewCount: 267,
    brand: 'Nike',
  },
  {
    id: '11',
    name: 'ADIDAS ULTRABOOST 25',
    category: 'Giày',
    price: 4800000,
    originalPrice: 5500000,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7c8d5e9f0a1b4c3d8e7f6a5b4c3d2e1f/ULTRABOOST_25.png',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7c8d5e9f0a1b4c3d8e7f6a5b4c3d2e1f/ULTRABOOST_25.png',
    ],
    description: 'Giày chạy bộ Ultraboost thế hệ mới với đệm Boost cực êm. Thoải mái cho mọi bước chạy.',
    details: ['Đệm Boost nguyên khối', 'Đế ngoài Continental™', 'Thân Primeknit', 'Công nghệ Torsion'],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: ['Đen', 'Trắng', 'Xám'],
    isSale: true,
    rating: 4.8,
    reviewCount: 345,
    brand: 'Adidas',
  },
  {
    id: '12',
    name: 'ADIDAS TRACK TOP',
    category: 'Áo',
    price: 1800000,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d/TRACK+TOP.png',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d/TRACK+TOP.png',
    ],
    description: 'Áo khoái thể thao adidas với thiết kế kinh điển. Chất liệu nhẹ, thoải mái cho tập luyện.',
    details: ['Chất liệu vải dệt kim', 'Túi khóa kéo', 'Cổ đứng', 'Sọc adidas đặc trưng'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Trắng', 'Xanh'],
    rating: 4.5,
    reviewCount: 178,
    brand: 'Adidas',
  },
  {
    id: '13',
    name: 'TAI NGHE THỂ THAO',
    category: 'Phụ kiện',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    ],
    description: 'Tai nghe thể thao không dây chống nước IPX7. Âm thanh sống động, đeo thoải mái khi tập.',
    details: ['Chống nước IPX7', 'Pin 12 giờ', 'Bluetooth 5.3', 'Điều khiển cảm ứng'],
    sizes: ['Một cỡ'],
    colors: ['Đen', 'Trắng', 'Đỏ'],
    isNew: true,
    rating: 4.3,
    reviewCount: 92,
    brand: 'Beats',
  },
  {
    id: '14',
    name: 'BÌNH NƯỚC NHIỆT',
    category: 'Phụ kiện',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    ],
    description: 'Bình nước giữ nhiệt 750ml. Giữ lạnh 24h, giữ nóng 12h. Chất liệu thép không gỉ.',
    details: ['Thép không gỉ 304', 'Giữ lạnh 24h - Giữ nóng 12h', 'Dung tích 750ml', 'Nắp chống tràn'],
    sizes: ['750ml'],
    colors: ['Đen', 'Trắng', 'Bạc'],
    rating: 4.6,
    reviewCount: 201,
    brand: 'Zenith',
  },
  {
    id: '15',
    name: 'DÂY NHẢY TỐC ĐỘ',
    category: 'Phụ kiện',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1591115765373-52077643f9e0?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1591115765373-52077643f9e0?auto=format&fit=crop&w=600&q=80',
    ],
    description: 'Dây nhảy thể thao chuyên nghiệp có thể điều chỉnh độ dài. Tay cầm chống trượt.',
    details: ['Điều chỉnh độ dài', 'Tay cầm chống trượt', 'Vòng bi thép', 'Dây thép bọc PVC'],
    sizes: ['3m'],
    colors: ['Đen', 'Đỏ', 'Xanh'],
    rating: 4.4,
    reviewCount: 56,
    brand: 'Zenith',
  },
  {
    id: '16',
    name: 'GĂNG TAY GYM',
    category: 'Phụ kiện',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=600&q=80',
    ],
    description: 'Găng tay tập gym chống trượt, bảo vệ lòng bàn tay. Đệm gel giảm áp lực.',
    details: ['Đệm gel bảo vệ', 'Chống trượt silicon', 'Thoáng khí', 'Cổ tay điều chỉnh'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Đen', 'Đỏ', 'Xám'],
    rating: 4.3,
    reviewCount: 312,
    brand: 'Zenith',
  },
];

export const reviews: Record<string, Review[]> = {
  '1': [
    { id: 'r1', userName: 'Minh Tuấn', rating: 5, date: '2026-05-15', comment: 'Giày siêu êm, chạy 10km không mỏi chân. Đệm Air Max thực sự tuyệt vời!', size: '42', color: 'Đen' },
    { id: 'r2', userName: 'Hoàng Nam', rating: 5, date: '2026-05-10', comment: 'Mua cho em trai, cháu rất thích. Chất lượng tốt.', size: '41', color: 'Trắng' },
    { id: 'r3', userName: 'Thanh Hà', rating: 4, date: '2026-04-28', comment: 'Giày đẹp, đi thoải mái. Giao hàng nhanh.', size: '39', color: 'Đỏ' },
  ],
  '2': [
    { id: 'r4', userName: 'Văn Đức', rating: 5, date: '2026-05-20', comment: 'Đẳng cấp marathon. Nhẹ đến khó tin!', size: '42', color: 'Đen' },
    { id: 'r5', userName: 'Quốc Anh', rating: 5, date: '2026-05-05', comment: 'Carbon plate thật sự tạo khác biệt. Khuyên nên mua.', size: '43', color: 'Xanh' },
  ],
  '3': [
    { id: 'r6', userName: 'Đức Mạnh', rating: 5, date: '2026-05-18', comment: 'Chơi bóng rổ đỉnh cao. Bám sân tốt, êm chân.', size: '44', color: 'Đen' },
  ],
  '4': [
    { id: 'r7', userName: 'Phương Linh', rating: 5, date: '2026-05-22', comment: 'Chất vải mát, thấm hút tốt. Mặc gym rất thoải mái.', size: 'M', color: 'Đen' },
    { id: 'r8', userName: 'Minh Anh', rating: 4, date: '2026-05-12', comment: 'Áo đẹp, đúng size. Sẽ mua thêm màu khác.', size: 'L', color: 'Trắng' },
    { id: 'r9', userName: 'Huy Hoàng', rating: 4, date: '2026-04-30', comment: 'Ổn so với giá tiền. Mặc tập luyện hàng ngày.', size: 'XL', color: 'Xám' },
  ],
  '10': [
    { id: 'r10', userName: 'Thảo Nhi', rating: 5, date: '2026-05-19', comment: 'Leggings siêu êm, co giãn tốt. Tập yoga thoải mái.', size: 'M', color: 'Đen' },
    { id: 'r11', userName: 'Khánh Huyền', rating: 5, date: '2026-05-08', comment: 'Chất vải mềm, lên form đẹp. Rất hài lòng!', size: 'S', color: 'Xanh' },
  ],
  '11': [
    { id: 'r12', userName: 'Trung Kiên', rating: 5, date: '2026-05-25', comment: 'Ultraboost đỉnh thật sự. Đi bộ cả ngày không mỏi.', size: '42', color: 'Đen' },
  ],
};

export const categories = ['Tất cả', 'Giày', 'Áo', 'Quần', 'Phụ kiện'];

export const brands = ['Tất cả', 'Nike', 'Adidas', 'Wilson', 'Beats', 'Zenith'];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'Tất cả') return products;
  return products.filter(p => p.category === category);
};

export const getProductsByBrand = (brand: string): Product[] => {
  if (brand === 'Tất cả') return products;
  return products.filter(p => p.brand === brand);
};

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews[productId] || [];
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN') + '₫';
};

export const generateOrderId = (): string => {
  return 'ZS' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
};

export const getInitialOrders = (userId: string): Order[] => {
  return [
    {
      id: 'ZSXK4M2P8A',
      userId,
      items: [
        { product: products[0], quantity: 1, size: '42', color: 'Đen' },
        { product: products[3], quantity: 2, size: 'M', color: 'Trắng' },
      ],
      total: products[0].price + products[3].price * 2,
      status: 'delivered',
      address: {
        fullName: 'Nguyễn Văn A',
        phone: '0912345678',
        street: '123 Nguyễn Huệ',
        ward: 'Phường Bến Nghé',
        district: 'Quận 1',
        city: 'TP. Hồ Chí Minh',
      },
      paymentMethod: 'COD',
      createdAt: '2026-05-10T08:30:00Z',
    },
    {
      id: 'ZSB7FL9R2C',
      userId,
      items: [
        { product: products[10], quantity: 1, size: '42', color: 'Đen' },
      ],
      total: products[10].price,
      status: 'shipping',
      address: {
        fullName: 'Nguyễn Văn A',
        phone: '0912345678',
        street: '123 Nguyễn Huệ',
        ward: 'Phường Bến Nghé',
        district: 'Quận 1',
        city: 'TP. Hồ Chí Minh',
      },
      paymentMethod: 'VNPay',
      createdAt: '2026-05-22T14:15:00Z',
    },
  ];
};
