'use client';

import type { ShopifyCart } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
  cart: ShopifyCart;
}

export default function OrderSummary({ cart }: OrderSummaryProps) {
  const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
  const total = parseFloat(cart.cost.totalAmount.amount);
  const tax = cart.cost.totalTaxAmount
    ? parseFloat(cart.cost.totalTaxAmount.amount)
    : 0;

  // Calculate total compare-at price for discount
  let totalCompareAt = 0;
  cart.lines.edges.forEach(({ node }) => {
    if (node.cost.compareAtAmountPerQuantity) {
      totalCompareAt +=
        parseFloat(node.cost.compareAtAmountPerQuantity.amount) * node.quantity;
    } else {
      totalCompareAt += parseFloat(node.cost.amountPerQuantity.amount) * node.quantity;
    }
  });

  const discount = totalCompareAt - subtotal;
  const discountPercent = totalCompareAt > 0
    ? Math.round((discount / totalCompareAt) * 100)
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-32">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal ({cart.totalQuantity} items)</span>
          <span className="font-medium">{formatPrice(totalCompareAt > subtotal ? totalCompareAt : subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-accent">
            <span>Discount</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="text-accent font-medium">Calculated at checkout</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between pt-3 border-t border-gray-100">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-lg">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Savings callout */}
      {discount > 0 && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-sm text-green-700 font-medium">
            🎉 You&apos;re saving {formatPrice(discount)}
          </p>
          <p className="text-xs text-green-600 mt-0.5">
            That&apos;s {discountPercent}% off your order
          </p>
        </div>
      )}

      {/* Checkout button */}
      <a
        href={cart.checkoutUrl}
        className="mt-4 w-full bg-navy hover:bg-navy-light text-white font-semibold py-3.5 rounded-lg transition-colors text-center block"
      >
        Proceed to Checkout — {formatPrice(total)}
      </a>
      <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure payment
      </p>

      {/* Trust icons */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <svg className="w-6 h-6 text-gray-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] text-gray-500 font-medium">SSL Secure</span>
          </div>
          <div>
            <svg className="w-6 h-6 text-gray-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-[10px] text-gray-500 font-medium">30-Day Returns</span>
          </div>
          <div>
            <svg className="w-6 h-6 text-gray-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-[10px] text-gray-500 font-medium">4.9 / 5 Stars</span>
          </div>
        </div>
      </div>

      {/* Payment icons */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-10 h-6 bg-red-600 rounded text-white text-[8px] font-bold flex items-center justify-center">MC</div>
        <div className="w-10 h-6 bg-blue-700 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div>
        <div className="w-10 h-6 bg-black rounded text-white text-[8px] font-bold flex items-center justify-center">APay</div>
        <div className="w-10 h-6 bg-white border border-gray-300 rounded text-gray-700 text-[8px] font-bold flex items-center justify-center">GPay</div>
        <div className="w-10 h-6 bg-blue-500 rounded text-white text-[8px] font-bold flex items-center justify-center">PP</div>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-3">
        Free returns within 30 days ·{' '}
        <span className="underline cursor-pointer">Privacy Policy</span>
      </p>
    </div>
  );
}
