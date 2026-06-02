import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold text-white">ZENITH</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Đồng hành cùng mọi vận động viên. Sản phẩm chính hãng, chất lượng cao nhất.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Sản phẩm</h4>
            <div className="space-y-3">
              <Link href="/products?category=Giày" className="block text-sm hover:text-white transition-colors">Giày</Link>
              <Link href="/products?category=Áo" className="block text-sm hover:text-white transition-colors">Áo</Link>
              <Link href="/products?category=Quần" className="block text-sm hover:text-white transition-colors">Quần</Link>
              <Link href="/products?category=Phụ kiện" className="block text-sm hover:text-white transition-colors">Phụ kiện</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Hỗ trợ</h4>
            <div className="space-y-3">
              <Link href="/contact" className="block text-sm hover:text-white transition-colors">Liên hệ</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Chính sách đổi trả</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">Hướng dẫn mua hàng</Link>
              <Link href="#" className="block text-sm hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Kết nối</h4>
            <div className="space-y-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">TikTok</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 Zenith Sport. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
