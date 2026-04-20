import Link from 'next/link';
import { Home, ShoppingBag, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-main py-20 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-10 h-10 text-gray-300" />
      </div>
      <h1 className="text-7xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" />
          Go Home
        </Link>
        <Link href="/shop" className="btn-secondary inline-flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
