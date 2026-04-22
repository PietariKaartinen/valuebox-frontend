'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartProvider';
import { useAuth } from '@/contexts/AuthProvider';
import { NAV_CATEGORIES, MAIN_CATEGORIES, SUBCATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import MobileNav from './MobileNav';
import { Search, User, ShoppingCart, Menu, ChevronDown, Zap, Package, Gem, Settings, LogOut } from 'lucide-react';
import CountryCurrencySelector from './CountryCurrencySelector';

interface PredictiveResult {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null; width: number; height: number } | null;
  price: number;
  compareAtPrice: number | null;
}

export default function Header() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { customer, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [predictions, setPredictions] = useState<PredictiveResult[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowPredictions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setMegaMenuOpen(false);
        setShowPredictions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const fetchPredictions = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setPredictions([]);
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setPredictions(data);
        setShowPredictions(true);
      }
    } catch {
      // Silently fail
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => fetchPredictions(value), 300);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      setShowPredictions(false);
      const params = new URLSearchParams({ q: searchQuery.trim() });
      if (searchCategory) params.set('category', searchCategory);
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await logout();
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top thin bar */}
        <div className="bg-navy text-gray-300 text-xs py-1.5">
          <div className="container-main flex items-center justify-between">
            <CountryCurrencySelector variant="header" />
            <div className="hidden md:flex items-center gap-4 text-gray-400">
              <Link href="/support" className="hover:text-white transition-colors">Help</Link>
              <Link href="/support" className="hover:text-white transition-colors">Track Order</Link>
            </div>
          </div>
        </div>

        {/* Main header row */}
        <div className="bg-navy py-3">
          <div className="container-main flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/images/wordmark.svg"
                alt="ValueBox"
                className="h-8 w-auto"
              />
            </Link>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="flex w-full relative">
                <div className="relative">
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="h-full bg-gray-100 border-r border-gray-300 rounded-l-full px-3 py-2.5 text-sm text-gray-700 appearance-none pr-8 cursor-pointer focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {MAIN_CATEGORIES.map((cat) => (
                      <option key={cat.handle} value={cat.handle}>{cat.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, brands, and categories"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => predictions.length > 0 && setShowPredictions(true)}
                  className="flex-1 px-4 py-2.5 text-sm focus:outline-none border-0"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-dark text-white px-5 rounded-r-full transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Predictive search dropdown */}
                {showPredictions && predictions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                    {predictions.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.handle}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowPredictions(false)}
                      >
                        {item.featuredImage ? (
                          <Image
                            src={item.featuredImage.url}
                            alt={item.featuredImage.altText || item.title}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <Search className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{item.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-accent">
                              {formatPrice(item.price)}
                            </span>
                            {item.compareAtPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(item.compareAtPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full text-center py-3 text-sm text-accent font-medium hover:bg-gray-50 border-t border-gray-100"
                    >
                      View all results for &ldquo;{searchQuery}&rdquo;
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 ml-auto shrink-0">
              {/* Mobile search toggle */}
              <button
                className="md:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Auth area - Desktop */}
              <div className="hidden sm:block relative" ref={userMenuRef}>
                {authLoading ? (
                  <div className="flex items-center gap-2 text-white">
                    <User className="w-5 h-5" />
                    <span className="text-sm">...</span>
                  </div>
                ) : isAuthenticated && customer ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 text-white hover:text-accent transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm whitespace-nowrap">
                        Hi, {customer.firstName || 'there'}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User dropdown */}
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                        <Link
                          href="/account"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4 text-gray-400" />
                          Orders
                        </Link>
                        <Link
                          href="/account/membership"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Gem className="w-4 h-4 text-gray-400" />
                          ValueBox+
                        </Link>
                        <Link
                          href="/account/settings"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 text-gray-400" />
                          Settings
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-gray-400" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="flex items-center gap-2 text-white hover:text-accent transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm whitespace-nowrap">Sign In</span>
                    </Link>
                    <Link
                      href="/signup"
                      className="text-gray-400 hover:text-white text-sm transition-colors hidden lg:block"
                    >
                      Join
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-white hover:text-accent transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingCart className="w-6 h-6" />
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
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm rounded-l-full focus:outline-none"
                  autoFocus
                />
                <button type="submit" className="bg-accent text-white px-4 rounded-r-full" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
              </form>
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
                  aria-label="All Categories"
                >
                  <Menu className="w-4 h-4" />
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
                <Zap className="w-4 h-4" />
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
