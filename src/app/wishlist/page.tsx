'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/contexts/wishlist-context';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Yêu thích</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Sản phẩm yêu thích</h1>
        <p className="text-zinc-500 text-sm mt-2">{items.length} sản phẩm</p>
      </motion.div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-zinc-400" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">Chưa có sản phẩm yêu thích</h2>
          <p className="text-zinc-500 text-sm mt-2">Hãy thêm sản phẩm vào danh sách yêu thích.</p>
          <Link href="/products" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Khám phá ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
