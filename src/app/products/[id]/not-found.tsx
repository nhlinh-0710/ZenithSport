import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 sm:py-32">
      <div className="relative">
        <h1 className="text-[150px] sm:text-[200px] font-bold text-zinc-100 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-full opacity-10" />
        </div>
      </div>
      <div className="text-center -mt-6">
        <h2 className="text-2xl font-bold text-zinc-900">Sản phẩm không tìm thấy</h2>
        <p className="text-zinc-500 text-sm mt-2">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
        <Link
          href="/products"
          className="mt-8 inline-flex px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors"
        >
          Quay lại sản phẩm
        </Link>
      </div>
    </div>
  );
}
