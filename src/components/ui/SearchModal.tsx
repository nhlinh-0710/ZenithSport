'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery(''); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 text-sm outline-none placeholder:text-zinc-400"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-zinc-400 hover:text-zinc-700">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto p-2">
                {results.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors"
                  >
                    <div className="w-14 h-14 bg-zinc-50 rounded-xl overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 truncate">{product.name}</p>
                      <p className="text-xs text-zinc-500">{product.category} · {product.brand}</p>
                    </div>
                    <p className="text-sm font-bold text-zinc-900 shrink-0">{formatPrice(product.price)}</p>
                  </Link>
                ))}
                {products.filter(p =>
                  p.name.toLowerCase().includes(query.toLowerCase())
                ).length > 6 && (
                  <Link
                    href={`/products`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-1 p-3 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    Xem tất cả kết quả
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="p-8 text-center">
                <Search className="w-8 h-8 text-zinc-200 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">Không tìm thấy sản phẩm &ldquo;{query}&rdquo;</p>
              </div>
            )}

            {!query && (
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Gợi ý</p>
                <div className="flex flex-wrap gap-2">
                  {['Giày chạy bộ', 'Áo Dry-Fit', 'Quần short', 'Túi gym', 'Bóng đá'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 text-xs bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors text-zinc-600"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
