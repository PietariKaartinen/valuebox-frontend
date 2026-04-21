'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthProvider';
import AccountLayout from '@/components/account/AccountLayout';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ArrowRight } from 'lucide-react';

function StatusBadge({ status, type }: { status: string; type: 'financial' | 'fulfillment' }) {
  const colors: Record<string, string> = {
    PAID: 'bg-green-100 text-green-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    REFUNDED: 'bg-red-100 text-red-700',
    AUTHORIZED: 'bg-blue-100 text-blue-700',
    FULFILLED: 'bg-green-100 text-green-700',
    UNFULFILLED: 'bg-gray-100 text-gray-600',
    PARTIALLY_FULFILLED: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
  };

  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const colorClass = colors[status] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colorClass}`}>
      {type === 'financial' ? label : label}
    </span>
  );
}

export default function OrdersPageClient() {
  const { customer } = useAuth();

  if (!customer) return null;

  const orders = customer.orders.edges.map((e) => e.node);

  return (
    <AccountLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const lineItems = order.lineItems.edges.map((e) => e.node);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Order header */}
                  <div className="px-6 py-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">
                          Order #{order.orderNumber}
                        </span>
                        <StatusBadge status={order.financialStatus} type="financial" />
                        <StatusBadge status={order.fulfillmentStatus} type="fulfillment" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.processedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(
                          parseFloat(order.totalPrice.amount),
                          order.totalPrice.currencyCode
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Line items */}
                  <div className="px-6 py-4">
                    <div className="space-y-3">
                      {lineItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            {item.variant?.image ? (
                              <Image
                                src={item.variant.image.url}
                                alt={item.variant.image.altText || item.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <ShoppingBag className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          {item.variant?.price && (
                            <span className="text-sm font-medium text-gray-700">
                              {formatPrice(parseFloat(item.variant.price.amount))}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500 text-sm mb-6">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/shop"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
