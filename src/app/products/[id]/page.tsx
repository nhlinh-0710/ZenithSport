'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Minus, Plus, ShoppingBag, Heart, Share2, Check, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getProductById, formatPrice, products, getReviewsByProductId } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useToast } from '@/contexts/toast-context';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  if (!product) notFound();

  const productReviews = getReviewsByProductId(product.id);
  const wishlisted = isWishlisted(product.id);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    for (let i = 0; i < quantity; i++) {
      addItem(product, size, color);
    }
    setAddedToCart(true);
    showToast(`${product.name} đã thêm vào giỏ hàng`, 'success');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      wishlisted ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích',
      'success'
    );
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const cls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`${cls} ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-200 fill-zinc-200'}`}
      />
    ));
  };

  return (
    <div className="pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link href="/products" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Quay lại sản phẩm
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative aspect-square bg-zinc-50 rounded-2xl overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {(product.isNew || product.isSale) && (
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full">Mới</span>
                  )}
                  {product.isSale && product.originalPrice && (
                    <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              )}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleToggleWishlist}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'text-red-500 fill-red-500' : 'text-zinc-700'}`} />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <Share2 className="w-4 h-4 text-zinc-700" />
                </button>
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-zinc-300 transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">{product.brand}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-xs text-zinc-500">{product.rating} ({product.reviewCount} đánh giá)</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-bold text-zinc-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="mt-6 text-sm text-zinc-600 leading-relaxed">{product.description}</p>

            {/* Color */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-3">
                Màu sắc: <span className="text-zinc-500 font-normal capitalize">{selectedColor || product.colors[0]}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative px-4 py-2.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                      (selectedColor || product.colors[0]) === color
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 hover:border-zinc-400 text-zinc-700'
                    }`}
                  >
                    {color}
                    {(selectedColor || product.colors[0]) === color && <Check className="w-3 h-3 inline ml-1 -mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  Kích thước: <span className="text-zinc-500 font-normal">{selectedSize || product.sizes[0]}</span>
                </h3>
                <button className="text-xs text-zinc-500 underline hover:text-zinc-900">Hướng dẫn chọn size</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-3 text-xs font-medium rounded-lg border transition-all duration-200 ${
                      (selectedSize || product.sizes[0]) === size
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 hover:border-zinc-400 text-zinc-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-3">Số lượng</h3>
              <div className="flex items-center border border-zinc-200 rounded-full w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full text-sm font-semibold transition-all duration-300 ${
                  addedToCart ? 'bg-green-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                {addedToCart ? <><Check className="w-5 h-5" /> Đã thêm vào giỏ</> : <><ShoppingBag className="w-5 h-5" /> Thêm vào giỏ hàng</>}
              </button>
              <button className="px-8 py-4 border border-zinc-200 rounded-full text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors">
                Mua ngay
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-zinc-100 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free Ship', desc: 'Đơn trên 1 triệu' },
                { icon: RotateCcw, label: 'Đổi trả', desc: '30 ngày' },
                { icon: Shield, label: 'Bảo hành', desc: '12 tháng' },
              ].map(f => (
                <div key={f.label} className="text-center p-3 bg-zinc-50 rounded-xl">
                  <f.icon className="w-4 h-4 mx-auto mb-1 text-zinc-700" />
                  <p className="text-xs font-semibold text-zinc-900">{f.label}</p>
                  <p className="text-[10px] text-zinc-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs: Details + Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="flex gap-6 border-b border-zinc-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'details' ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Chi tiết sản phẩm
            {activeTab === 'details' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'reviews' ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Đánh giá ({productReviews.length})
            {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />}
          </button>
        </div>

        <div className="py-8">
          {activeTab === 'details' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <ul className="space-y-3">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
              {productReviews.length === 0 ? (
                <p className="text-sm text-zinc-500">Chưa có đánh giá nào.</p>
              ) : (
                productReviews.map(review => (
                  <div key={review.id} className="p-4 bg-zinc-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-zinc-300 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-zinc-600 uppercase">{review.userName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{review.userName}</p>
                          <p className="text-[10px] text-zinc-500">{review.size} / {review.color}</p>
                        </div>
                      </div>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-sm text-zinc-600">{review.comment}</p>
                    <p className="text-[10px] text-zinc-400 mt-2">{new Date(review.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Sản phẩm liên quan</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
