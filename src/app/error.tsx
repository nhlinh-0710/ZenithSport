'use client';

export default function Error({
  _error,
  reset,
}: {
  _error: Error & { digest?: string };
  reset: () => void;
}) {
  void _error;

  return (
    <div className="flex flex-col items-center justify-center py-24 sm:py-32">
      <h1 className="text-2xl font-bold text-zinc-900">Có lỗi xảy ra</h1>
      <p className="text-zinc-500 text-sm mt-2">Vui lòng thử lại sau.</p>
      <button
        onClick={reset}
        className="mt-6 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors"
      >
        Thử lại
      </button>
    </div>
  );
}
