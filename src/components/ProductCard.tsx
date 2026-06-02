'use client';

import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useToast } from '@/contexts/toast-context';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]);
    showToast(`${product.name} đã thêm vào giỏ hàng`, 'success');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      wishlisted ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích',
      'success'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/5] bg-zinc-50 rounded-2xl overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {(product.isNew || product.isSale) && (
            <div className="absolute top-3 left-3 flex gap-2">
              {product.isNew && (
                <span className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                  Mới
                </span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
          )}

          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? 'text-red-500 fill-red-500' : 'text-zinc-600'
              }`}
            />
          </button>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </div>
      </Link>

      <div className="px-1">
        <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1">{product.category}</p>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-sm font-semibold text-zinc-900 truncate group-hover:text-red-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-zinc-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-200 fill-zinc-200'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] text-zinc-400">({product.reviewCount})</span>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="shrink-0 w-9 h-9 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
            aria-label="Thêm vào giỏ"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
