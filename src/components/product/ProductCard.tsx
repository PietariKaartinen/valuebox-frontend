'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ParsedProduct } from '@/lib/shopify/types';
import PriceDisplay from './PriceDisplay';
import AddToCartButton from './AddToCartButton';
import BadgeDisplay from './BadgeDisplay';

interface ProductCardProps {
  product: ParsedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstVariantId = product.variants[0]?.id;
  const isLowStock = product.totalInventory > 0 && product.totalInventory <= 10;

  return (
    <div className="group relative bg-white rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
      <Link href={`/products/${product.handle}`} className="block">
        {/* Image container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {/* Badges row */}
          <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
            {/* Badge from metafield */}
            {product.badge && (
              <BadgeDisplay badge={product.badge} />
            )}

            {/* Low stock indicator */}
            {isLowStock && (
              <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                {product.totalInventory} IN STOCK
              </span>
            )}

            {/* Discount badge */}
            {product.discountPercent && (
              <span className="bg-sale text-white text-[10px] font-bold px-2 py-1 rounded-full">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] mb-1">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3.5 h-3.5 ${star <= 4 ? 'text-amber-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-gray-400">(987)</span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              memberPrice={product.memberPrice}
              currencyCode={product.currencyCode}
              size="sm"
            />
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-3 pb-3">
        {firstVariantId && (
          <AddToCartButton variantId={firstVariantId} variant="link" />
        )}
      </div>
    </div>
  );
}
