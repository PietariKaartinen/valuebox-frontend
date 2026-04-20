'use client';

import Link from 'next/link';
import { AlertTriangle, Home, ShoppingBag, RefreshCw } from 'lucide-react';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void _error;
  return (
    <div className="container-main py-20 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Something went wrong</h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        We encountered an unexpected error. Please try again or browse our shop.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <Link href="/" className="btn-secondary inline-flex items-center gap-2">
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
