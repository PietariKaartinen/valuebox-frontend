'use client';

import { useRef } from 'react';
import Link from 'next/link';

const brandCards = [
  {
    name: 'Member Deals Spotlight',
    subtitle: 'Your guide to member savings',
    bg: 'bg-gradient-to-br from-gray-800 to-gray-900',
    tag: 'SAVE',
    href: '/shop/fashion-accessories',
  },
  {
    name: 'Get up to 15% OFF',
    subtitle: 'On fashion accessories',
    bg: 'bg-gradient-to-br from-green-500 to-green-600',
    tag: 'UNIQUE',
    href: '/shop/fashion-accessories',
  },
  {
    name: 'Up to 10% OFF',
    subtitle: 'On selected brands',
    bg: 'bg-gradient-to-br from-pink-400 to-pink-500',
    tag: 'SALE',
    href: '/shop/fashion-accessories',
  },
];

export default function FashionBrands() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-8 bg-white">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Top <span className="text-accent">Fashion Brands</span>
          </h2>
          <div className="flex items-center gap-3">
            <Link href="/shop/fashion-accessories" className="text-sm text-accent hover:text-accent-dark font-medium hidden sm:block">
              View All →
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

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
        >
          {brandCards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className={`flex-shrink-0 w-[280px] sm:w-[320px] ${card.bg} rounded-xl p-6 text-white relative overflow-hidden group hover:shadow-lg transition-shadow`}
            >
              <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3">
                {card.tag}
              </span>
              <h3 className="font-bold text-lg mb-1">{card.name}</h3>
              <p className="text-white/70 text-sm">{card.subtitle}</p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-tl-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
