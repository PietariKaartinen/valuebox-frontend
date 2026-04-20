'use client';

import { useState, useMemo } from 'react';
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
}

const ITEMS_PER_PAGE = 12;

export default function ShopPageClient({
  products,
  collectionHandle,
  collectionTitle,
}: ShopPageClientProps) {
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
    inStock: null,
  });

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      p.collections.forEach((c) => {
        counts[c.handle] = (counts[c.handle] || 0) + 1;
      });
    });
    return counts;
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        p.collections.some((c) => filters.categories.includes(c.handle))
      );
    }

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

    // Sort
    switch (sortBy) {
      case 'PRICE_ASC':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'PRICE_DESC':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'CREATED_AT':
        // Keep original order (newest from API)
        break;
      case 'DISCOUNT':
        result.sort(
          (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)
        );
        break;
      default:
        // BEST_SELLING - keep original order
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
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          categories: f.categories.filter((c) => c !== handle),
        })),
    });
  });
  if (filters.discountMin) {
    activeFilters.push({
      label: `${filters.discountMin}% off or more`,
      onRemove: () => setFilters((f) => ({ ...f, discountMin: null })),
    });
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      discountMin: null,
      priceMin: 0,
      priceMax: 149,
      inStock: null,
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-navy to-navy-light text-white py-8">
        <div className="container-main text-center">
          <div className="text-sm text-gray-400 mb-2">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span className="text-accent">Shop For Deals</span>
          </div>
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
            onFilterChange={setFilters}
            categoryCounts={categoryCounts}
          />

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
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
