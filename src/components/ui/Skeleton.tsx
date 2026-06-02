export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-zinc-200 rounded-2xl mb-4" />
      <div className="px-1 space-y-2">
        <div className="h-3 bg-zinc-200 rounded w-1/3" />
        <div className="h-4 bg-zinc-200 rounded w-2/3" />
        <div className="h-4 bg-zinc-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
      <div className="aspect-square bg-zinc-200 rounded-2xl" />
      <div className="space-y-6">
        <div className="h-4 bg-zinc-200 rounded w-1/4" />
        <div className="h-8 bg-zinc-200 rounded w-3/4" />
        <div className="h-6 bg-zinc-200 rounded w-1/3" />
        <div className="h-20 bg-zinc-200 rounded" />
        <div className="h-10 bg-zinc-200 rounded w-full" />
        <div className="h-10 bg-zinc-200 rounded w-full" />
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-2xl">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-200 rounded-xl shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-zinc-200 rounded w-1/2" />
            <div className="h-3 bg-zinc-200 rounded w-1/4" />
            <div className="h-8 bg-zinc-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
