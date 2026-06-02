'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/data';


export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 sm:py-32">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-zinc-400" />
        </motion.div>
        <h1 className="text-2xl font-bold text-zinc-900">Giỏ hàng trống</h1>
        <p className="text-zinc-500 text-sm mt-2">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Giỏ hàng</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Giỏ hàng của bạn</h1>
        <p className="text-zinc-500 text-sm mt-2">{totalItems} sản phẩm</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={`${item.product.id}-${item.size}-${item.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 sm:gap-6 p-4 bg-white border border-zinc-100 rounded-2xl"
            >
              <Link href={`/products/${item.product.id}`} className="shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-50 rounded-xl overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="text-sm font-semibold text-zinc-900 truncate hover:text-red-600 transition-colors">{item.product.name}</h3>
                    </Link>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.size} / {item.color}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-zinc-400 hover:text-red-500 transition-colors" />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-3">
                  <div className="flex items-center border border-zinc-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-zinc-900">{formatPrice(item.product.price * item.quantity)}</p>
                    {item.quantity > 1 && <p className="text-[10px] text-zinc-400">{formatPrice(item.product.price)} / sản phẩm</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-zinc-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Tổng đơn hàng</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Tạm tính</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Phí vận chuyển</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              {totalPrice < 1000000 && (
                <div className="flex justify-between text-zinc-500 text-xs">
                  <span>Còn {formatPrice(1000000 - totalPrice)} để được miễn phí vận chuyển</span>
                </div>
              )}
              <div className="pt-3 border-t border-zinc-200">
                <div className="flex justify-between text-zinc-900 font-bold text-base">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full py-4 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              Thanh toán
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link href="/products" className="mt-4 block text-center text-xs text-zinc-500 hover:text-zinc-900 transition-colors underline">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
