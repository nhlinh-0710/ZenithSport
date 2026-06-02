'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, RotateCcw, Sparkles, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

const featuredProducts = products.filter(p => p.isNew || p.isSale).slice(0, 4);
const bestSellers = products.slice(0, 8);

const perks = [
  { icon: Truck, title: 'Miễn phí vận chuyển', desc: 'Cho đơn hàng trên 1.000.000₫' },
  { icon: Shield, title: 'Chính hãng 100%', desc: 'Cam kết sản phẩm authentic' },
  { icon: RotateCcw, title: 'Đổi trả 30 ngày', desc: 'Hoàn tiền nhanh chóng' },
  { icon: Sparkles, title: 'Quà tặng độc quyền', desc: 'Khi mua sản phẩm mới nhất' },
];

const testimonials = [
  { name: 'Minh Tuấn', role: 'Vận động viên chạy bộ', text: 'Giày chạy thoải mái nhất tôi từng mang. Đệm Air Max thực sự đẳng cấp.', rating: 5 },
  { name: 'Hoàng Anh', role: 'Huấn luyện viên Gym', text: 'Chất lượng sản phẩm tuyệt vời, giao hàng siêu nhanh. Sẽ mua tiếp!', rating: 5 },
  { name: 'Thanh Thảo', role: 'Yoga Instructor', text: 'Leggings co giãn tốt, chất vải mềm mịn. Rất hài lòng về dịch vụ.', rating: 5 },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] sm:h-[90vh] min-h-[600px] bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&w=2070&q=80"
            alt="Zenith Sport"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-red-500 text-sm font-semibold uppercase tracking-[0.2em] mb-4"
            >
              Bộ sưu tập mới 2026
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Vượt Qua
              <br />
              <span className="text-red-500">Giới Hạn</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-zinc-300 leading-relaxed max-w-md"
            >
              Trang bị đỉnh cao cho mọi cuộc chơi. Công nghệ tiên tiến, thiết kế tối thượng.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 font-semibold rounded-full hover:bg-zinc-100 transition-colors text-sm"
              >
                Mua ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?category=Giày"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm"
              >
                Xem giày mới
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Perks */}
      <section className="py-12 sm:py-16 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-zinc-100 rounded-full flex items-center justify-center">
                  <perk.icon className="w-5 h-5 text-zinc-800" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-900">{perk.title}</h4>
                <p className="text-xs text-zinc-500 mt-1">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Nổi bật</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-2">Sản phẩm mới & giảm giá</h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-zinc-900 hover:text-red-600 transition-colors group">
              Xem tất cả
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[400px] bg-zinc-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2070&q=80"
          alt="Just Do It"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-zinc-900/80 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-right"
          >
            <span className="text-red-500 text-sm font-semibold uppercase tracking-[0.2em]">Zenith Sport</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 leading-tight">
              Chạm tới đỉnh cao
            </h2>
            <p className="text-zinc-300 mt-4 text-sm leading-relaxed">
              Bộ sưu tập giày thể thao công nghệ mới nhất với đệm khí thế hệ mới.
            </p>
            <Link
              href="/products?category=Giày"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm"
            >
              Khám phá ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Bán chạy</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-2">Sản phẩm bán chạy</h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-zinc-900 hover:text-red-600 transition-colors group">
              Xem tất cả
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors">
              Xem tất cả sản phẩm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Danh mục</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-2">Khám phá theo danh mục</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Giày', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', count: '5+ mẫu' },
              { name: 'Áo', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80', count: '3+ mẫu' },
              { name: 'Quần', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80', count: '3+ mẫu' },
              { name: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80', count: '8+ mẫu' },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/products?category=${cat.name}`}
                  className="group relative block aspect-[3/4] rounded-2xl overflow-hidden"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                    <p className="text-zinc-300 text-xs mt-1">{cat.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Khách hàng nói gì</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-2">Đánh giá từ vận động viên</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed italic">
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-semibold text-zinc-900">{testimonials[activeTestimonial].name}</p>
                <p className="text-sm text-zinc-500">{testimonials[activeTestimonial].role}</p>
              </div>
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'bg-zinc-900 w-8' : 'bg-zinc-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 bg-zinc-900">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Đăng ký nhận tin</h2>
            <p className="text-zinc-400 mt-3 text-sm">
              Nhận ưu đãi độc quyền và thông tin sản phẩm mới nhất qua email.
            </p>
            <form onSubmit={e => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-5 py-3.5 bg-zinc-800 text-white rounded-full outline-none focus:ring-2 focus:ring-red-500 text-sm placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
              >
                Đăng ký
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
