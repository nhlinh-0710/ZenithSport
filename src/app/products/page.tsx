'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { products, categories, brands } from '@/lib/data';
import { SortOption } from '@/lib/types';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Tất cả';
  const initialBrand = searchParams.get('brand') || 'Tất cả';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeBrand, setActiveBrand] = useState(initialBrand);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'Tất cả') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (activeBrand !== 'Tất cả') {
      result = result.filter(p => p.brand === activeBrand);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return result;
  }, [activeCategory, activeBrand, sortBy, priceRange]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
    { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
    { value: 'name-asc', label: 'Tên: A-Z' },
  ];

  return (
    <div>
      <section className="pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Sản phẩm</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Tất cả sản phẩm</h1>
            <p className="text-zinc-500 text-sm mt-2">{filteredProducts.length} sản phẩm</p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                    activeCategory === cat ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
                >
                  {sortOptions.find(o => o.value === sortBy)?.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showSort && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-zinc-100 z-20 overflow-hidden">
                      {sortOptions.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                          className={`block w-full text-left px-4 py-3 text-xs font-medium transition-colors ${
                            sortBy === opt.value ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Lọc
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${activeBrand}-${sortBy}-${priceRange[0]}-${priceRange[1]}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-zinc-400">Không có sản phẩm phù hợp.</p>
                  <button
                    onClick={() => { setActiveCategory('Tất cả'); setActiveBrand('Tất cả'); setPriceRange([0, 10000000]); }}
                    className="mt-4 text-sm text-zinc-600 underline hover:text-zinc-900"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white p-6 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-zinc-900">Bộ lọc</h3>
                <button onClick={() => setShowFilters(false)} className="text-sm text-zinc-500 hover:text-zinc-900">Đóng</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Thương hiệu</h4>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setActiveBrand(brand)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                          activeBrand === brand ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Khoảng giá</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={0}
                      max={10000000}
                      step={100000}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-zinc-900"
                    />
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>0₫</span>
                      <span>Đến {priceRange[1].toLocaleString('vi-VN')}₫</span>
                      <span>10.000.000₫</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Sắp xếp</h4>
                  <div className="flex flex-col gap-1">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          sortBy === opt.value ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
