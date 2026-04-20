'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { ParsedProduct } from '@/lib/shopify/types';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  title: string;
  highlightWord?: string;
  products: ParsedProduct[];
  viewAllHref?: string;
}

export default function ProductCarousel({
  title,
  highlightWord,
  products,
  viewAllHref,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-accent">{highlightWord}</span>
        {parts[1] || ''}
      </>
    );
  };

  return (
    <section className="py-8">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {renderTitle()}
          </h2>
          <div className="flex items-center gap-3">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="text-sm text-accent hover:text-accent-dark font-medium hidden sm:block"
              >
                View All →
              </Link>
            )}
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

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[220px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
