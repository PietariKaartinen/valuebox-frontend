'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ParsedProduct } from '@/lib/shopify/types';
import ProductGallery from '@/components/product/ProductGallery';
import BadgeDisplay from '@/components/product/BadgeDisplay';
import AddToCartButton from '@/components/product/AddToCartButton';
import { useCart } from '@/contexts/CartProvider';
import { formatPrice } from '@/lib/utils';
import { SHIPPING, isFreeShipping } from '@/lib/constants/shipping';
import PaymentIcons from '@/components/ui/PaymentIcons';

interface ProductDetailClientProps {
  product: ParsedProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isBuying, setIsBuying] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];
  const variantPrice = parseFloat(selectedVariant?.price.amount || '0');
  const variantCompareAt = selectedVariant?.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : null;
  const savings = variantCompareAt ? variantCompareAt - variantPrice : null;

  // Shipping eligibility based on product price
  const standardFree = isFreeShipping(variantPrice, 'standard');
  const priorityFree = isFreeShipping(variantPrice, 'priority');

  // Group options by name
  const optionGroups: Record<string, string[]> = {};
  product.variants.forEach((v) => {
    v.selectedOptions.forEach((opt) => {
      if (!optionGroups[opt.name]) optionGroups[opt.name] = [];
      if (!optionGroups[opt.name].includes(opt.value)) {
        optionGroups[opt.name].push(opt.value);
      }
    });
  });

  const handleBuyNow = async () => {
    if (!selectedVariant || isBuying) return;
    setIsBuying(true);
    try {
      await addToCart(selectedVariant.id, quantity);
      router.push('/cart');
    } catch (error) {
      console.error('Buy now failed:', error);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <section className="py-8">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Gallery */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Right: Details */}
          <div>
            {/* Badge */}
            <BadgeDisplay badge={product.badge} className="mb-3" />

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {product.title}
            </h1>
            {product.vendor && (
              <p className="text-gray-400 text-sm mb-4">{product.vendor}</p>
            )}

            {/* Price block */}
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-accent">
                  {formatPrice(variantPrice, product.currencyCode)}
                </span>
                {variantCompareAt && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(variantCompareAt, product.currencyCode)}
                  </span>
                )}
              </div>
              {savings && savings > 0 && (
                <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  SAVE {formatPrice(savings, product.currencyCode)}
                </span>
              )}
            </div>

            {/* Member price */}
            {product.memberPrice && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-amber-800">
                  ValueBox+ Members:{' '}
                  <span className="font-bold">
                    {formatPrice(product.memberPrice, product.currencyCode)}
                  </span>
                  {product.memberDiscountPercent && (
                    <span className="ml-2 text-amber-600">
                      · Save {product.memberDiscountPercent}%
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Shipping info */}
            <div className="mb-6 space-y-1">
              <p className="text-sm text-gray-500">
                🚚 {SHIPPING.standard.label}:{' '}
                {standardFree ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  <span>${SHIPPING.standard.price.toFixed(2)} (Free on orders ${SHIPPING.standard.freeThreshold}+)</span>
                )}
              </p>
              <p className="text-sm text-gray-500">
                ⚡ {SHIPPING.priority.label}:{' '}
                {priorityFree ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  <span>${SHIPPING.priority.price.toFixed(2)} (Free on orders ${SHIPPING.priority.freeThreshold}+)</span>
                )}
              </p>
            </div>

            {/* Variant selectors */}
            {Object.entries(optionGroups).map(([optionName, values]) => (
              <div key={optionName} className="mb-4">
                <select
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  onChange={(e) => {
                    const idx = product.variants.findIndex((v) =>
                      v.selectedOptions.some(
                        (o) => o.name === optionName && o.value === e.target.value
                      )
                    );
                    if (idx >= 0) setSelectedVariantIndex(idx);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select {optionName.toLowerCase()}
                  </option>
                  {values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-gray-600">Qty:</span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-medium border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-6">
              {selectedVariant && (
                <AddToCartButton
                  variantId={selectedVariant.id}
                  quantity={quantity}
                  variant="full"
                  className="flex-1"
                />
              )}
              <button
                onClick={handleBuyNow}
                disabled={!selectedVariant || isBuying}
                className="flex-1 btn-secondary disabled:opacity-50"
              >
                {isBuying ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            {/* Trust row */}
            <div className="text-center py-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Secure Checkout | Easy Returns | 24/7 Support
              </p>
              <p className="text-sm text-gray-500 mb-3">
                4.8/5 from 3,000+ customers
              </p>
              <div className="flex items-center justify-center">
                <PaymentIcons />
              </div>
            </div>

            {/* Description */}
            {product.descriptionHtml && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Product Description</h3>
                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
