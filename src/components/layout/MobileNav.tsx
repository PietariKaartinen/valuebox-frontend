'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MAIN_CATEGORIES, SUBCATEGORIES, SPECIAL_COLLECTIONS } from '@/lib/constants';
import { X, ChevronDown, ChevronRight, User, ShoppingCart, ShoppingBag, Zap } from 'lucide-react';

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
      <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="bg-navy p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">ValueBox</span>
          </Link>
          <button onClick={onClose} className="text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sign in */}
        <Link href="#" className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 min-h-[44px]" onClick={onClose}>
          <User className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Sign in / Account</span>
        </Link>

        {/* Categories */}
        <div className="py-2">
          <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Categories
          </p>
          {MAIN_CATEGORIES.map((cat) => (
            <div key={cat.handle}>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px]"
                onClick={() =>
                  setExpandedCategory(expandedCategory === cat.handle ? null : cat.handle)
                }
              >
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.title}
                </span>
                {expandedCategory === cat.handle ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedCategory === cat.handle && (
                <div className="bg-gray-50 py-1">
                  <Link
                    href={`/shop/${cat.handle}`}
                    className="block px-8 py-2.5 text-sm text-accent font-medium min-h-[44px] flex items-center"
                    onClick={onClose}
                  >
                    View All {cat.title}
                  </Link>
                  {(SUBCATEGORIES[cat.handle] || []).map((sub) => (
                    <Link
                      key={sub.handle}
                      href={`/shop/${sub.handle}`}
                      className="block px-8 py-2.5 text-sm text-gray-500 hover:text-accent transition-colors min-h-[44px] flex items-center"
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
          <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Collections
          </p>
          {SPECIAL_COLLECTIONS.map((col) => (
            <Link
              key={col.handle}
              href={`/shop/${col.handle}`}
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 min-h-[44px]"
              onClick={onClose}
            >
              <Zap className="w-4 h-4 text-orange-400" />
              {col.title}
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="border-t border-gray-100 py-2">
          <Link href="/shop" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 min-h-[44px]" onClick={onClose}>
            <ShoppingBag className="w-5 h-5 text-gray-400" />
            Shop All Products
          </Link>
          <Link href="/cart" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 min-h-[44px]" onClick={onClose}>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
