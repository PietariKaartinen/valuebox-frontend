'use client';

import Link from 'next/link';
import CountryCurrencySelector from './CountryCurrencySelector';
import NewsletterSignup from './NewsletterSignup';
import PaymentIcons from '../ui/PaymentIcons';

export default function Footer({ showNewsletter = true }: { showNewsletter?: boolean }) {

  return (
    <footer>
      {/* Trust badges */}
      <div className="border-t border-gray-200 py-4">
        <div className="container-main flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            Member savings up to 35%
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            30-day returns
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            Tracked delivery
          </div>
        </div>
      </div>

      {/* Newsletter */}
      {showNewsletter && (
        <div className="bg-navy-light">
          <div className="container-main py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h3 className="text-lg font-bold">Get the best deals first.</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Weekly drops, member-only offers,<br className="hidden md:block" /> and under $25 finds.
                </p>
              </div>
              <NewsletterSignup variant="footer" />
            </div>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container-main py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Shop */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2.5">
                <li><Link href="/shop/todays-deals" className="text-sm text-gray-500 hover:text-accent transition-colors">Best Sellers</Link></li>
                <li><Link href="/shop" className="text-sm text-gray-500 hover:text-accent transition-colors">New Arrivals</Link></li>
                <li><Link href="/shop/under-25" className="text-sm text-gray-500 hover:text-accent transition-colors">Under $25</Link></li>
                <li><Link href="/shop/best-gifts" className="text-sm text-gray-500 hover:text-accent transition-colors">Gift Cards</Link></li>
              </ul>
            </div>

            {/* Membership */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Membership</h4>
              <ul className="space-y-2.5">
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">How It Works</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Perks</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Manage Membership</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2.5">
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Order Tracking</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Shipping &amp; Delivery</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Returns &amp; Refunds</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">About</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Partnerships</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Press</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Giveaway Rules (US)</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white border-t border-gray-200">
        <div className="container-main py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo + location */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <img
                  src="/images/wordmark-dark.svg"
                  alt="ValueBox"
                  className="h-7 w-auto"
                />
              </Link>
              <CountryCurrencySelector variant="footer" />
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {/* TikTok */}
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V12.8a8.28 8.28 0 005.58 2.17V11.5a4.85 4.85 0 01-3.77-1.58V6.69h3.77z" />
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              {/* LinkedIn */}
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>

            </div>
          </div>

          {/* Payment + legal */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Payment icons */}
                <PaymentIcons />
                <span className="text-gray-400 text-xs">Payments secured by Stripe.</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <Link href="#" className="hover:text-gray-600 transition-colors">Cookie Settings</Link>
                <Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-gray-600 transition-colors">Terms of Conditions</Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-center">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Giveaways open to legal US residents 18+. Streaming availability varies by region.<br />
              Member discounts are up to 35%. Excludes gift cards and certain MAP-restricted items.
            </p>
            <p className="text-xs text-gray-400 mt-2">© ValueBox Ltd. 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
