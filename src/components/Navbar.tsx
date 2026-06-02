'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { useWishlist } from '@/contexts/wishlist-context';
import SearchModal from './ui/SearchModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { isLoggedIn, user } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">
                ZENITH
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Trang chủ
              </Link>
              <Link href="/products" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Sản phẩm
              </Link>
              <Link href="/products?category=Giày" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Giày
              </Link>
              <Link href="/products?category=Áo" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Áo
              </Link>
              <Link href="/products?category=Phụ kiện" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Phụ kiện
              </Link>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 transition-colors"
              >
                <Search className="w-5 h-5 text-zinc-700" />
              </button>

              <Link href="/wishlist" className="relative hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 transition-colors">
                <Heart className="w-5 h-5 text-zinc-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-zinc-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <Link href="/account" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 transition-colors">
                  <div className="w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold uppercase">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link href="/login" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 transition-colors">
                  <User className="w-5 h-5 text-zinc-700" />
                </Link>
              )}

              <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 transition-colors">
                <ShoppingBag className="w-5 h-5 text-zinc-700" />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 transition-colors"
                aria-label="Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-zinc-600 hover:text-zinc-900 py-2">
                  Trang chủ
                </Link>
                <Link href="/products" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-zinc-600 hover:text-zinc-900 py-2">
                  Sản phẩm
                </Link>
                <Link href="/products?category=Giày" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-zinc-600 hover:text-zinc-900 py-2">
                  Giày
                </Link>
                <Link href="/products?category=Áo" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-zinc-600 hover:text-zinc-900 py-2">
                  Áo
                </Link>
                <Link href="/products?category=Phụ kiện" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-zinc-600 hover:text-zinc-900 py-2">
                  Phụ kiện
                </Link>
                <div className="pt-4 border-t border-zinc-100 space-y-3">
                  {isLoggedIn ? (
                    <>
                      <Link href="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold uppercase">{user?.name?.charAt(0) || 'U'}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{user?.name}</p>
                          <p className="text-xs text-zinc-500">Tài khoản</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => { setIsOpen(false); }}
                        className="block w-full text-center py-2.5 text-sm font-medium bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors"
                      >
                        <Link href="/account">Tài khoản</Link>
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-3">
                      <Link href="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors">
                        Đăng nhập
                      </Link>
                      <Link href="/cart" onClick={() => setIsOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium border border-zinc-300 rounded-full hover:bg-zinc-50 transition-colors">
                        Giỏ hàng {totalItems > 0 && `(${totalItems})`}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
