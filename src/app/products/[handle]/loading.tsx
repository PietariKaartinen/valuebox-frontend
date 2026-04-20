import Skeleton from '@/components/ui/Skeleton';

export default function ProductDetailLoading() {
  return (
    <section className="py-8">
      <div className="container-main">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery skeleton */}
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="flex gap-3 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <div className="flex gap-3">
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 flex-1 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
