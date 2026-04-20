'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CartLineItem as CartLineItemType } from '@/lib/shopify/types';
import { useCart } from '@/contexts/CartProvider';
import { formatPrice } from '@/lib/utils';

interface CartLineItemProps {
  item: CartLineItemType;
}

export default function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();

  const price = parseFloat(item.cost.amountPerQuantity.amount);
  const compareAtPrice = item.cost.compareAtAmountPerQuantity
    ? parseFloat(item.cost.compareAtAmountPerQuantity.amount)
    : null;
  const lineTotal = parseFloat(item.cost.totalAmount.amount);
  const savings = compareAtPrice ? (compareAtPrice - price) * item.quantity : 0;
  const discountPercent = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  const image = item.merchandise.image || item.merchandise.product.featuredImage;
  const variantOptions = item.merchandise.selectedOptions
    .filter((o) => o.name !== 'Title')
    .map((o) => `${o.name}: ${o.value}`)
    .join(', ');

  return (
    <>
      {/* Desktop layout — horizontal row */}
      <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center py-4 border-b border-gray-100 last:border-0">
        {/* Product */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/products/${item.merchandise.product.handle}`}
            className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0"
          >
            {image ? (
              <Image
                src={image.url}
                alt={image.altText || item.merchandise.product.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </Link>
          <div className="min-w-0">
            <Link
              href={`/products/${item.merchandise.product.handle}`}
              className="text-sm font-medium text-gray-900 hover:text-accent transition-colors line-clamp-2"
            >
              {item.merchandise.product.title}
            </Link>
            {variantOptions && (
              <p className="text-xs text-gray-400 mt-0.5">{variantOptions}</p>
            )}
            {discountPercent && (
              <span className="inline-block mt-1 bg-sale text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0 w-20">
          {compareAtPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(compareAtPrice)}
            </p>
          )}
          <p className="text-sm font-bold text-gray-900">{formatPrice(price)}</p>
          {savings > 0 && (
            <p className="text-xs text-green-600 font-medium">
              Save {formatPrice(savings)}
            </p>
          )}
        </div>

        {/* Quantity controls */}
        <div className="flex items-center border border-gray-200 rounded-lg shrink-0">
          <button
            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-2 py-1 text-sm font-medium border-x border-gray-200 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Line total */}
        <div className="text-right shrink-0 w-20">
          <p className="text-sm font-bold text-gray-900">{formatPrice(lineTotal)}</p>
        </div>

        {/* Remove */}
        <button
          onClick={() => removeFromCart(item.id)}
          disabled={isLoading}
          className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-500 disabled:opacity-50 shrink-0"
          aria-label="Remove item"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile layout — stacked card */}
      <div className="sm:hidden py-4 border-b border-gray-100 last:border-0">
        <div className="flex gap-3">
          <Link
            href={`/products/${item.merchandise.product.handle}`}
            className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0"
          >
            {image ? (
              <Image
                src={image.url}
                alt={image.altText || item.merchandise.product.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <Link
                href={`/products/${item.merchandise.product.handle}`}
                className="text-sm font-medium text-gray-900 hover:text-accent transition-colors line-clamp-2 pr-2"
              >
                {item.merchandise.product.title}
              </Link>
              <button
                onClick={() => removeFromCart(item.id)}
                disabled={isLoading}
                className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-500 disabled:opacity-50 shrink-0 -mt-1 -mr-1"
                aria-label="Remove item"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {variantOptions && (
              <p className="text-xs text-gray-400 mt-0.5">{variantOptions}</p>
            )}
            {discountPercent && (
              <span className="inline-block mt-1 bg-sale text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Price + Quantity row */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-sm font-bold text-gray-900">{formatPrice(price)}</p>
            {compareAtPrice && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(compareAtPrice)}</p>
            )}
            {savings > 0 && (
              <p className="text-xs text-green-600 font-medium">Save {formatPrice(savings)}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                disabled={isLoading}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-2 py-1 text-sm font-medium border-x border-gray-200 min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={isLoading}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900 min-w-[60px] text-right">
              {formatPrice(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
