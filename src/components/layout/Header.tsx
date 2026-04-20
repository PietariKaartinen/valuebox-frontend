'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/contexts/CartProvider';
import { NAV_CATEGORIES, MAIN_CATEGORIES, SUBCATEGORIES } from '@/lib/constants';
import MobileNav from './MobileNav';

export default function Header() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top thin bar */}
        <div className="bg-navy text-gray-300 text-xs py-1.5">
          <div className="container-main flex items-center justify-between">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Deliver to <strong className="text-white">United States</strong> - USD</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Help</Link>
              <Link href="#" className="hover:text-white transition-colors">Track Order</Link>
            </div>
          </div>
        </div>

        {/* Main header row */}
        <div className="bg-navy py-3">
          <div className="container-main flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h14V7l-7-5zm0 2.236L15 8v8H5V8l5-3.764z" />
                </svg>
              </div>
              <span className="text-white text-xl font-bold">ValueBox</span>
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="flex w-full">
                <div className="relative">
                  <select className="h-full bg-gray-100 border-r border-gray-300 rounded-l-full px-3 py-2.5 text-sm text-gray-700 appearance-none pr-8 cursor-pointer focus:outline-none">
                    <option>All Categories</option>
                    {MAIN_CATEGORIES.map((cat) => (
                      <option key={cat.handle} value={cat.handle}>{cat.title}</option>
                    ))}
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products, brands, and categories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm focus:outline-none border-0"
                />
                <button className="bg-accent hover:bg-accent-dark text-white px-5 rounded-r-full transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 ml-auto shrink-0">
              {/* Mobile search toggle */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Sign in */}
              <Link href="#" className="hidden sm:flex items-center gap-2 text-white hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm whitespace-nowrap">Sign in / Account</span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative text-white hover:text-accent transition-colors p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden px-4 pb-3 pt-2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm rounded-l-full focus:outline-none"
                />
                <button className="bg-accent text-white px-4 rounded-r-full">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation bar - Desktop */}
        <nav className="bg-navy-light border-t border-white/10 hidden md:block">
          <div className="container-main">
            <div className="flex items-center gap-1 text-sm">
              {/* All Categories mega menu */}
              <div className="relative" ref={megaMenuRef}>
                <button
                  className="flex items-center gap-2 text-white hover:text-accent px-3 py-2.5 transition-colors font-medium"
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  All Categories
                </button>

                {megaMenuOpen && (
                  <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-[700px] z-50">
                    <div className="grid grid-cols-3 gap-6">
                      {MAIN_CATEGORIES.map((cat) => (
                        <div key={cat.handle}>
                          <Link
                            href={`/shop/${cat.handle}`}
                            className="font-semibold text-gray-900 hover:text-accent transition-colors text-sm"
                            onClick={() => setMegaMenuOpen(false)}
                          >
                            {cat.title}
                          </Link>
                          <ul className="mt-2 space-y-1.5">
                            {(SUBCATEGORIES[cat.handle] || []).map((sub) => (
                              <li key={sub.handle}>
                                <Link
                                  href={`/shop/${sub.handle}`}
                                  className="text-gray-500 hover:text-accent text-xs transition-colors"
                                  onClick={() => setMegaMenuOpen(false)}
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category links */}
              {NAV_CATEGORIES.map((cat) => (
                <Link
                  key={cat.handle}
                  href={`/shop/${cat.handle}`}
                  className="text-gray-300 hover:text-white px-3 py-2.5 transition-colors whitespace-nowrap"
                >
                  {cat.title}
                </Link>
              ))}

              {/* Today's Deals */}
              <Link
                href="/shop/todays-deals"
                className="text-orange-400 hover:text-orange-300 px-3 py-2.5 transition-colors font-medium flex items-center gap-1 ml-auto"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                </svg>
                Today&apos;s Deals
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
