'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';
import AccountLayout from '@/components/account/AccountLayout';
import { Gem, DollarSign, Gift, Tv, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Member Pricing',
    description: 'Save up to 20% on eligible items',
  },
  {
    icon: Gift,
    title: 'Member Giveaways',
    description: 'Enter to win exclusive prizes monthly',
  },
  {
    icon: Tv,
    title: 'Streaming Access',
    description: 'Movies, TV, and more included',
  },
  {
    icon: Headphones,
    title: 'VIP Support',
    description: 'Priority customer service',
  },
];

export default function MembershipPageClient() {
  const { isMember } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  return (
    <AccountLayout>
      <div className="space-y-6">
        {isMember ? (
          <>
            {/* Active member view */}
            <h1 className="text-2xl font-bold text-gray-900">Your ValueBox+ Membership</h1>

            <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Gem className="w-6 h-6" />
                <span className="text-xl font-bold">Active Member</span>
                <span className="bg-green-400/20 text-green-100 text-xs font-bold px-2.5 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sky-100 text-sm">Member since: January 2026</p>
              <p className="text-sky-100 text-sm">Current plan: Annual</p>
              <p className="text-sky-200 text-xs mt-3">
                Your membership is managed through your subscription provider. Contact support for changes.
              </p>
            </div>

            {/* Benefits summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                      <benefit.icon className="w-4 h-4 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{benefit.title}</p>
                      <p className="text-xs text-gray-500">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Non-member view */}
            <h1 className="text-2xl font-bold text-gray-900">ValueBox+ Membership</h1>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{benefit.title}</p>
                      <p className="text-sm text-gray-500">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing toggle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span
                  className={`text-sm font-medium ${
                    billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  Monthly
                </span>
                <button
                  onClick={() =>
                    setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    billingPeriod === 'annual' ? 'bg-sky-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      billingPeriod === 'annual' ? 'translate-x-[26px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${
                    billingPeriod === 'annual' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  Annual
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Monthly */}
                <div
                  className={`rounded-xl border-2 p-6 transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'border-sky-500 bg-sky-50/50'
                      : 'border-gray-200'
                  }`}
                >
                  <h3 className="font-bold text-gray-900 mb-1">Monthly</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold text-gray-900">$9.99</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Cancel anytime</p>
                  <Link
                    href="/premium"
                    className="block text-center bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-2.5 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all text-sm"
                  >
                    Start 30-Day Free Trial
                  </Link>
                </div>

                {/* Annual */}
                <div
                  className={`rounded-xl border-2 p-6 transition-colors relative ${
                    billingPeriod === 'annual'
                      ? 'border-sky-500 bg-sky-50/50'
                      : 'border-gray-200'
                  }`}
                >
                  <span className="absolute -top-3 right-4 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    Best Value
                  </span>
                  <h3 className="font-bold text-gray-900 mb-1">Annual</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-gray-900">$79.99</span>
                    <span className="text-gray-500 text-sm">/year</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium mb-3">Save $39.89 vs monthly</p>
                  <Link
                    href="/premium"
                    className="block text-center bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-2.5 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all text-sm"
                  >
                    Start 30-Day Free Trial
                  </Link>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                Subscription billing will be available soon. For early access, contact support.
              </p>
            </div>
          </>
        )}
      </div>
    </AccountLayout>
  );
}
