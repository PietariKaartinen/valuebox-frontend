import Skeleton from '@/components/ui/Skeleton';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-main py-8">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-24 mt-2" />
        </div>
      </div>
      <div className="container-main py-8">
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}
