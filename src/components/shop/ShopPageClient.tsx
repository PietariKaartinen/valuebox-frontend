'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ParsedProduct } from '@/lib/shopify/types';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar, { type FilterState } from './FilterSidebar';
import SortDropdown from './SortDropdown';
import Pagination from './Pagination';
import { MAIN_CATEGORIES } from '@/lib/constants';
import { getCollectionTitle } from '@/lib/utils';

interface ShopPageClientProps {
  products: ParsedProduct[];
  collectionHandle?: string;
  collectionTitle?: string;
  categoryCounts?: Record<string, number>;
}

const ITEMS_PER_PAGE = 12;

export default function ShopPageClient({
  products,
  collectionHandle,
  collectionTitle,
  categoryCounts: serverCategoryCounts,
}: ShopPageClientProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('BEST_SELLING');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: collectionHandle
      ? MAIN_CATEGORIES.some((c) => c.handle === collectionHandle)
        ? [collectionHandle]
        : []
      : [],
    discountMin: null,
    priceMin: 0,
    priceMax: 149,
    rating: null,
    inStock: false,
  });

  // Use server-provided category counts (global counts, not filtered)
  const categoryCounts = serverCategoryCounts || {};

  // Handle category change via URL navigation
  const handleFilterChange = (newFilters: FilterState) => {
    // Check if categories changed
    if (newFilters.categories !== filters.categories &&
        JSON.stringify(newFilters.categories) !== JSON.stringify(filters.categories)) {
      const newCategories = newFilters.categories;

      if (newCategories.length === 0) {
        // No category selected — go to /shop (all products)
        router.push('/shop');
        return;
      } else if (newCategories.length === 1) {
        // Single category — navigate to that category page
        router.push(`/shop/${newCategories[0]}`);
        return;
      }
      // Multiple categories — navigate to the last selected one
      const lastCategory = newCategories[newCategories.length - 1];
      router.push(`/shop/${lastCategory}`);
      return;
    }

    // For non-category filter changes, update state normally
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Filter products (client-side for non-category filters)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Discount filter
    if (filters.discountMin) {
      result = result.filter(
        (p) => (p.memberDiscountPercent || p.discountPercent || 0) >= filters.discountMin!
      );
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    // Availability filter
    if (filters.inStock) {
      result = result.filter((p) => p.availableForSale);
    }

    // Sort
    switch (sortBy) {
      case 'PRICE_ASC':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'PRICE_DESC':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'CREATED_AT':
        break;
      case 'DISCOUNT':
        result.sort(
          (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const paginatedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

  // Active filter chips
  const activeFilters: { label: string; onRemove: () => void }[] = [];
  filters.categories.forEach((handle) => {
    const cat = MAIN_CATEGORIES.find((c) => c.handle === handle);
    activeFilters.push({
      label: cat?.title || getCollectionTitle(handle),
      onRemove: () => {
        // Navigate to /shop when removing category
        router.push('/shop');
      },
    });
  });
  if (filters.discountMin) {
    activeFilters.push({
      label: `${filters.discountMin}% off or more`,
      onRemove: () => setFilters((f) => ({ ...f, discountMin: null })),
    });
  }
  if (filters.inStock) {
    activeFilters.push({
      label: 'In stock only',
      onRemove: () => setFilters((f) => ({ ...f, inStock: false })),
    });
  }

  const clearAllFilters = () => {
    // Navigate to /shop to clear category filter
    if (collectionHandle) {
      router.push('/shop');
    } else {
      setFilters({
        categories: [],
        discountMin: null,
        priceMin: 0,
        priceMax: 149,
        rating: null,
        inStock: false,
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-navy to-navy-light text-white py-8">
        <div className="container-main text-center">
          <nav className="text-sm text-gray-400 mb-2 flex items-center justify-center gap-2">
            <Link href="/" className="text-sky-600 hover:underline">Home</Link>
            <span>›</span>
            {collectionHandle ? (
              <>
                <Link href="/shop" className="text-sky-600 hover:underline">Shop</Link>
                <span>›</span>
                <span className="text-gray-200">{collectionTitle || 'Shop For Deals'}</span>
              </>
            ) : (
              <span className="text-gray-200">Shop For Deals</span>
            )}
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {collectionTitle || 'Shop For Deals'}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              Member savings up to 35%
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              30-day returns
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Tracked delivery
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-8">
        {/* Top bar: filters count + sort */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters ({activeFilters.length})
            </button>
            <span className="hidden lg:inline text-sm font-semibold text-gray-900">
              Filters ({activeFilters.length})
            </span>
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={clearAllFilters}
              className="text-sm text-accent hover:text-accent-dark font-medium"
            >
              Clear all ×
            </button>
            {activeFilters.map((filter, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {filter.label}
                <button
                  onClick={filter.onRemove}
                  className="text-gray-400 hover:text-gray-600 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Main layout: sidebar + grid */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            categoryCounts={categoryCounts}
          />

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              categoryCounts={categoryCounts}
              isOpen={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
            />
          )}

          {/* Product grid */}
          <div className="flex-1">
            <ProductGrid products={paginatedProducts} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              resultsPerPage={ITEMS_PER_PAGE}
              onPageChange={(page) => {
                setCurrentPage(page);
                setShowAll(false);
              }}
              onShowAll={() => setShowAll(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
