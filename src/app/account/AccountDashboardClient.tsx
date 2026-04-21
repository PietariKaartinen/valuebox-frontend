'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';
import AccountLayout from '@/components/account/AccountLayout';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, ShoppingBag, Gem, User } from 'lucide-react';

function StatusBadge({ status, type }: { status: string; type: 'financial' | 'fulfillment' }) {
  const colors: Record<string, string> = {
    PAID: 'bg-green-100 text-green-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    REFUNDED: 'bg-red-100 text-red-700',
    FULFILLED: 'bg-green-100 text-green-700',
    UNFULFILLED: 'bg-gray-100 text-gray-600',
    PARTIALLY_FULFILLED: 'bg-yellow-100 text-yellow-700',
  };

  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const colorClass = colors[status] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colorClass}`}>
      {type === 'financial' ? label : label}
    </span>
  );
}

export default function AccountDashboardClient() {
  const { customer, isMember } = useAuth();

  if (!customer) return null;

  const orders = customer.orders.edges.map((e) => e.node);
  const recentOrders = orders.slice(0, 3);

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hi, {customer.firstName || 'there'}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome to your ValueBox account dashboard.
          </p>
        </div>

        {/* Membership status card */}
        {isMember ? (
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Gem className="w-5 h-5" />
                  <span className="font-bold text-lg">ValueBox+ Member</span>
                  <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-sky-100 text-sm">
                  You&apos;re saving with exclusive member pricing on every order.
                </p>
              </div>
              <Link
                href="/account/membership"
                className="text-white hover:text-sky-100 text-sm font-medium flex items-center gap-1"
              >
                Manage membership <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Upgrade to ValueBox+</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Save up to 20% on every order with member pricing.
                </p>
              </div>
              <Link
                href="/premium"
                className="bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all text-sm whitespace-nowrap"
              >
                Try Free for 30 Days
              </Link>
            </div>
          </div>
        )}

        {/* Recent orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            {orders.length > 0 && (
              <Link
                href="/account/orders"
                className="text-sky-500 hover:text-sky-600 text-sm font-medium flex items-center gap-1"
              >
                View all orders <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.processedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={order.financialStatus} type="financial" />
                    <StatusBadge status={order.fulfillmentStatus} type="fulfillment" />
                    <span className="text-sm font-semibold text-gray-900 ml-2">
                      {formatPrice(parseFloat(order.totalPrice.amount), order.totalPrice.currencyCode)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-3">You haven&apos;t placed any orders yet.</p>
              <Link
                href="/shop"
                className="text-sky-500 hover:text-sky-600 text-sm font-medium inline-flex items-center gap-1"
              >
                Start Shopping <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/shop"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-sky-200 transition-colors group"
          >
            <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-sky-500 mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-900">Browse deals</p>
            <p className="text-xs text-gray-400 mt-0.5">Find great products</p>
          </Link>
          <Link
            href="/premium"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-sky-200 transition-colors group"
          >
            <Gem className="w-5 h-5 text-gray-400 group-hover:text-sky-500 mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-900">Membership benefits</p>
            <p className="text-xs text-gray-400 mt-0.5">See what&apos;s included</p>
          </Link>
          <Link
            href="/account/settings"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-sky-200 transition-colors group"
          >
            <User className="w-5 h-5 text-gray-400 group-hover:text-sky-500 mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-900">Update profile</p>
            <p className="text-xs text-gray-400 mt-0.5">Manage your info</p>
          </Link>
        </div>
      </div>
    </AccountLayout>
  );
}
