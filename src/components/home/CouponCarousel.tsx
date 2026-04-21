'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { Coupon } from '@/lib/shopify/coupon-types';
import CouponCard from './CouponCard';

interface CouponCarouselProps {
  coupons: Coupon[];
}

export default function CouponCarousel({ coupons }: CouponCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Don't render if no coupons
  if (!coupons || coupons.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-8 bg-white">
      <div className="container-main">
        {/* Header — matches existing ProductCarousel style */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Exclusive <span className="text-accent">Deals & Coupons</span>
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Copy a code and apply at checkout
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="text-sm text-accent hover:text-accent-dark font-medium hidden sm:block"
            >
              See all →
            </Link>
            <div className="flex gap-1">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel — same scroll pattern as ProductCarousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              style={{ scrollSnapAlign: 'start' }}
            >
              <CouponCard coupon={coupon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
