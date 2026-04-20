'use client';

import Link from 'next/link';
import { Search, ShoppingBag, ArrowLeft } from 'lucide-react';
import type { ParsedProduct } from '@/lib/shopify/types';
import ProductGrid from '@/components/product/ProductGrid';

interface SearchPageClientProps {
  query: string;
  products: ParsedProduct[];
  error: boolean;
}

export default function SearchPageClient({ query, products, error }: SearchPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-main py-8">
          <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
            <Link href="/" className="text-sky-600 hover:underline">Home</Link>
            <span className="text-gray-300">›</span>
            <Link href="/shop" className="text-sky-600 hover:underline">Search</Link>
            {query && (
              <>
                <span className="text-gray-300">›</span>
                <span className="text-gray-500">&ldquo;{query}&rdquo;</span>
              </>
            )}
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {query ? (
              <>Search results for &ldquo;{query}&rdquo;</>
            ) : (
              'Search Products'
            )}
          </h1>
          {query && !error && (
            <p className="text-gray-500 mt-2">
              {products.length} {products.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
      </div>

      <div className="container-main py-8">
        {error ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Search Error</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Something went wrong while searching. Please try again.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Browse All Products
            </Link>
          </div>
        ) : !query ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">What are you looking for?</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Use the search bar above to find products, brands, and categories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-sm text-gray-500">Popular:</span>
              {['Electronics', 'Home & Kitchen', 'Beauty', 'Travel'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="text-sm bg-white border border-gray-200 rounded-full px-4 py-1.5 hover:border-accent hover:text-accent transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try a different search term or browse our categories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Browse All Products
              </Link>
              <Link href="/" className="btn-secondary inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <span className="text-sm text-gray-500">Try searching for:</span>
              {['Blanket', 'Makeup', 'Travel Bag', 'Coffee Mug'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="text-sm bg-white border border-gray-200 rounded-full px-4 py-1.5 hover:border-accent hover:text-accent transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
