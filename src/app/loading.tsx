import Skeleton from '@/components/ui/Skeleton';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-navy via-navy-light to-[#0f3460]">
        <div className="container-main py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 bg-white/10" />
              <Skeleton className="h-12 w-1/2 bg-white/10" />
              <Skeleton className="h-5 w-2/3 bg-white/10" />
              <div className="flex gap-3 mt-6">
                <Skeleton className="h-12 w-32 rounded-lg bg-white/10" />
                <Skeleton className="h-12 w-36 rounded-lg bg-white/10" />
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product carousel skeleton */}
      <div className="container-main py-10">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[220px] shrink-0">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* Second carousel skeleton */}
      <div className="container-main py-10">
        <Skeleton className="h-8 w-56 mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[220px] shrink-0">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
