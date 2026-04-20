'use client';

import { useState } from 'react';
import { MAIN_CATEGORIES } from '@/lib/constants';

interface FilterState {
  categories: string[];
  discountMin: number | null;
  priceMin: number;
  priceMax: number;
  inStock: boolean | null;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categoryCounts?: Record<string, number>;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  categoryCounts = {},
  isOpen = true,
  onClose,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    discount: true,
    price: true,
    rating: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (handle: string) => {
    const newCategories = filters.categories.includes(handle)
      ? filters.categories.filter((c) => c !== handle)
      : [...filters.categories, handle];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const setDiscount = (min: number | null) => {
    onFilterChange({ ...filters, discountMin: min });
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
          onClick={() => toggleSection('category')}
        >
          Category ({filters.categories.length})
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {MAIN_CATEGORIES.map((cat) => (
              <label key={cat.handle} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.handle)}
                  onChange={() => toggleCategory(cat.handle)}
                  className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {cat.title}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  ({categoryCounts[cat.handle] || 0})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Discount % */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
          onClick={() => toggleSection('discount')}
        >
          Discount %
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.discount ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.discount && (
          <div className="space-y-2">
            {[
              { label: '10% off or more', value: 10 },
              { label: '25% off or more', value: 25 },
              { label: '50% off or more', value: 50 },
              { label: '75% off or more', value: 75 },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="discount"
                  checked={filters.discountMin === option.value}
                  onChange={() => setDiscount(option.value)}
                  className="w-4 h-4 border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
          onClick={() => toggleSection('price')}
        >
          Price
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.price && (
          <div>
            <label className="flex items-center gap-2 mb-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
              <span className="text-sm text-gray-600">Free shipping</span>
            </label>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) =>
                    onFilterChange({ ...filters, priceMin: Number(e.target.value) })
                  }
                  className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  min={0}
                />
              </div>
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) =>
                    onFilterChange({ ...filters, priceMax: Number(e.target.value) })
                  }
                  className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  min={0}
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={149}
              value={filters.priceMax}
              onChange={(e) =>
                onFilterChange({ ...filters, priceMax: Number(e.target.value) })
              }
              className="w-full accent-accent"
            />
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
          onClick={() => toggleSection('rating')}
        >
          Rating
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Brand */}
      <div>
        <button className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3">
          Brand (2)
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Availability */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
          onClick={() => toggleSection('availability')}
        >
          Availability
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.availability ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Mobile drawer
  if (!isOpen && onClose) return null;

  return (
    <>
      {/* Mobile overlay */}
      {onClose && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Filters</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 shrink-0 sticky top-32 self-start">
        {sidebarContent}
      </div>
    </>
  );
}

export type { FilterState };
