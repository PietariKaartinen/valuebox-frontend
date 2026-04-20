import Skeleton from '@/components/ui/Skeleton';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

export default function ShopLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-navy-light">
        <div className="container-main py-8 text-center">
          <Skeleton className="h-4 w-40 mx-auto mb-4 bg-white/10" />
          <Skeleton className="h-10 w-64 mx-auto mb-4 bg-white/10" />
          <Skeleton className="h-4 w-80 mx-auto bg-white/10" />
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex gap-8">
          {/* Filter sidebar skeleton */}
          <div className="hidden lg:block w-64 shrink-0 space-y-6">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
            <Skeleton className="h-8 w-32" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>

          {/* Product grid skeleton */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-40" />
            </div>
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
