'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartProvider';
import CartLineItemComponent from '@/components/cart/CartLineItem';
import OrderSummary from '@/components/cart/OrderSummary';
import { SHIPPING, getShippingProgressMessage } from '@/lib/constants/shipping';

import ProductCarousel from '@/components/product/ProductCarousel';
import type { ParsedProduct } from '@/lib/shopify/types';
import Skeleton from '@/components/ui/Skeleton';

function CartSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-main py-8">
        <Skeleton className="h-20 w-full rounded-xl mb-6" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

type CouponStatus = {
  type: 'success' | 'warning' | 'error';
  message: string;
} | null;

export default function CartPageClient() {
  const { cart, clearCart, isInitializing, applyDiscountCode, removeDiscountCodes, isLoading } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<CouponStatus>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<ParsedProduct[]>([]);

  // Fetch recommended products
  useEffect(() => {
    async function fetchRecommended() {
      try {
        const res = await fetch('/api/recommended');
        if (res.ok) {
          const data = await res.json();
          setRecommendedProducts(data);
        }
      } catch {
        // Silently fail
      }
    }
    fetchRecommended();
  }, []);

  // Show skeleton while cart is loading from cookie
  if (isInitializing) {
    return <CartSkeleton />;
  }

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const shippingProgress = getShippingProgressMessage(subtotal);

  const lines = cart?.lines.edges.map((e) => e.node) || [];
  const appliedCodes = cart?.discountCodes?.filter((dc) => dc.code) || [];

  const handleApplyCode = async () => {
    const trimmed = couponCode.trim();
    if (!trimmed) return;

    setIsApplying(true);
    setCouponStatus(null);

    const result = await applyDiscountCode(trimmed);

    if (result.userErrors && result.userErrors.length > 0) {
      setCouponStatus({
        type: 'error',
        message: result.userErrors.map((e) => e.message).join('. '),
      });
    } else if (result.success && result.applicable) {
      setCouponStatus({
        type: 'success',
        message: 'Code applied! Discount shown at checkout.',
      });
      setCouponCode('');
    } else if (result.success && !result.applicable) {
      setCouponStatus({
        type: 'warning',
        message: 'Code saved — eligibility confirmed at checkout.',
      });
      setCouponCode('');
    } else {
      setCouponStatus({
        type: 'error',
        message: 'Failed to apply code. Please try again.',
      });
    }

    setIsApplying(false);
  };

  const handleRemoveCodes = async () => {
    setIsApplying(true);
    setCouponStatus(null);
    await removeDiscountCodes();
    setIsApplying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyCode();
    }
  };

  if (!cart || lines.length === 0) {
    return (
      <div className="container-main py-16 text-center">
        <svg className="w-20 h-20 text-gray-200 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link href="/shop" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-main py-8">
        {/* Free shipping progress — two-tier bar */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              <span className="text-accent">Free shipping</span> progress
            </h3>
          </div>

          {/* Two-tier progress bar */}
          <div className="relative">
            {/* Bar track */}
            <div className="w-full bg-gray-100 rounded-full h-2 relative">
              {/* Bar fill */}
              <div
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, shippingProgress.progress)}%` }}
              />
            </div>

            {/* Marker labels */}
            <div className="relative mt-1.5">
              {/* Standard marker at 50% */}
              <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 -mt-[18px] ${
                    shippingProgress.standardFree
                      ? 'bg-accent border-accent'
                      : 'bg-white border-gray-300'
                  } flex items-center justify-center`}
                >
                  {shippingProgress.standardFree && (
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 whitespace-nowrap ${shippingProgress.standardFree ? 'text-accent font-semibold' : 'text-gray-400'}`}>
                  ${SHIPPING.standard.freeThreshold} — Free Standard
                </span>
              </div>

              {/* Priority marker at 100% */}
              <div className="absolute right-0 flex flex-col items-end">
                <div
                  className={`w-3 h-3 rounded-full border-2 -mt-[18px] ${
                    shippingProgress.priorityFree
                      ? 'bg-accent border-accent'
                      : 'bg-white border-gray-300'
                  } flex items-center justify-center`}
                >
                  {shippingProgress.priorityFree && (
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 whitespace-nowrap ${shippingProgress.priorityFree ? 'text-accent font-semibold' : 'text-gray-400'}`}>
                  ${SHIPPING.priority.freeThreshold} — Free Priority
                </span>
              </div>
            </div>
          </div>

          {/* Shipping message */}
          <p className="text-xs text-gray-500 mt-5">
            {shippingProgress.priorityFree ? (
              <span className="text-green-600 font-medium">
                {shippingProgress.message}
              </span>
            ) : shippingProgress.standardFree ? (
              <span className="text-green-600 font-medium">
                {shippingProgress.message}
              </span>
            ) : (
              <span>{shippingProgress.message}</span>
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Product</span>
                <span className="w-20 text-right">Price</span>
                <span className="w-28 text-center">Quantity</span>
                <span className="w-20 text-right">Total</span>
                <span className="w-4"></span>
              </div>

              {/* Cart items */}
              <div className="px-6">
                {lines.map((item) => (
                  <CartLineItemComponent key={item.id} item={item} />
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <Link
                  href="/shop"
                  className="text-sm text-accent hover:text-accent-dark font-medium flex items-center gap-1"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Coupon code */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mt-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <input
                  type="text"
                  placeholder="Coupon or promo code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-sm focus:outline-none"
                  aria-label="Coupon or promo code"
                  disabled={isApplying || isLoading}
                />
                <button
                  onClick={handleApplyCode}
                  disabled={isApplying || isLoading || !couponCode.trim()}
                  className="bg-navy text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isApplying ? 'Applying...' : 'Apply'}
                </button>
              </div>

              {/* Applied codes as chips */}
              {appliedCodes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {appliedCodes.map((dc) => (
                    <span
                      key={dc.code}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                        dc.applicable
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {dc.applicable ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                        </svg>
                      )}
                      {dc.code}
                      <button
                        onClick={handleRemoveCodes}
                        disabled={isApplying || isLoading}
                        className="ml-0.5 hover:opacity-70 transition-opacity"
                        aria-label={`Remove discount code ${dc.code}`}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Status message */}
              {couponStatus && (
                <p
                  className={`text-xs mt-2 flex items-center gap-1 ${
                    couponStatus.type === 'success'
                      ? 'text-green-600'
                      : couponStatus.type === 'warning'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {couponStatus.type === 'success' && (
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {couponStatus.type === 'warning' && (
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {couponStatus.type === 'error' && (
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {couponStatus.message}
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary cart={cart} />
          </div>
        </div>

        {/* You May Also Like */}
        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <ProductCarousel
              title="You May Also Like"
              highlightWord="Also Like"
              products={recommendedProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
