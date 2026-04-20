'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartProvider';
import CartLineItemComponent from '@/components/cart/CartLineItem';
import OrderSummary from '@/components/cart/OrderSummary';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import ProductCarousel from '@/components/product/ProductCarousel';
import type { ParsedProduct } from '@/lib/shopify/types';

export default function CartPageClient() {
  const { cart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
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

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const lines = cart?.lines.edges.map((e) => e.node) || [];

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
        {/* Free shipping progress */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              <span className="text-accent">Free shipping</span> progress
            </h3>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {amountToFreeShipping > 0 ? (
              <>
                Add <strong className="text-accent">{formatPrice(amountToFreeShipping)}</strong> more
                to unlock free standard shipping — Free shipping on all orders above{' '}
                {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </>
            ) : (
              <span className="text-green-600 font-medium">
                You&apos;ve unlocked free shipping!
              </span>
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
            <div className="bg-white rounded-xl border border-gray-100 p-4 mt-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <input
                type="text"
                placeholder="Coupon or promo code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 text-sm focus:outline-none"
              />
              <button className="bg-navy text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-navy-light transition-colors">
                Apply
              </button>
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
