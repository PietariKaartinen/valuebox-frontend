import Skeleton from '@/components/ui/Skeleton';

export default function CartLoading() {
  return (
    <div className="container-main py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {/* Free shipping bar */}
          <Skeleton className="h-20 w-full rounded-lg" />

          {/* Cart header */}
          <div className="flex items-center justify-between py-3 border-b">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Cart items */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b">
              <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>

        {/* Order summary skeleton */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <Skeleton className="h-6 w-36" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
