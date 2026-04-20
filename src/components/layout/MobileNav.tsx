'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MAIN_CATEGORIES, SUBCATEGORIES, SPECIAL_COLLECTIONS } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="bg-navy p-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">Menu</span>
          <button onClick={onClose} className="text-white p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sign in */}
        <div className="p-4 border-b border-gray-100">
          <Link href="#" className="flex items-center gap-3 text-gray-700" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">Sign in / Account</span>
          </Link>
        </div>

        {/* Categories */}
        <div className="py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Categories
          </div>
          {MAIN_CATEGORIES.map((cat) => (
            <div key={cat.handle}>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setExpandedCategory(expandedCategory === cat.handle ? null : cat.handle)
                }
              >
                <span className="font-medium">{cat.title}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    expandedCategory === cat.handle ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedCategory === cat.handle && (
                <div className="bg-gray-50 py-1">
                  <Link
                    href={`/shop/${cat.handle}`}
                    className="block px-8 py-2 text-sm text-accent font-medium"
                    onClick={onClose}
                  >
                    View All {cat.title}
                  </Link>
                  {(SUBCATEGORIES[cat.handle] || []).map((sub) => (
                    <Link
                      key={sub.handle}
                      href={`/shop/${sub.handle}`}
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-accent transition-colors"
                      onClick={onClose}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Special collections */}
        <div className="border-t border-gray-100 py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Special
          </div>
          {SPECIAL_COLLECTIONS.map((col) => (
            <Link
              key={col.handle}
              href={`/shop/${col.handle}`}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              onClick={onClose}
            >
              {col.title}
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="border-t border-gray-100 py-2">
          <Link href="/shop" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium" onClick={onClose}>
            Shop All
          </Link>
          <Link href="/cart" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium" onClick={onClose}>
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
