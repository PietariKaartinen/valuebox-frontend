'use client';

import { useState } from 'react';
import Link from 'next/link';
import Testimonials from '@/components/home/Testimonials';
import { ChevronDown, Check, X } from 'lucide-react';

const benefits = [
  {
    emoji: '💰',
    title: 'Member Pricing',
    description:
      'Save up to 35% on eligible items. Automatic discounts on thousands of products.',
  },
  {
    emoji: '🎁',
    title: 'Member Giveaways',
    description:
      'Enter monthly draws for exclusive prizes. US residents 18+ only.',
  },
  {
    emoji: '📺',
    title: 'Streaming & Media Library',
    description:
      'Thousands of shows, movies, eBooks, audiobooks, music tracks, and games. Stream on any device, anytime. All included with your membership at no extra cost.',
    mediaPills: true,
  },
  {
    emoji: '🎧',
    title: 'VIP Support',
    description: 'Priority help from our team when you need it.',
  },
];

const comparisonFeatures = [
  { feature: 'Browse & Shop', guest: true, member: true },
  { feature: 'Member Pricing (up to 35% off)', guest: false, member: true },
  { feature: 'Monthly Giveaways', guest: false, member: true },
  { feature: 'Streaming & Media (Shows, Movies, eBooks, Audiobooks, Music, Games)', guest: false, member: true },
  { feature: 'VIP Support', guest: false, member: true },
  { feature: 'Free Standard Shipping ($50+)', guest: true, member: true },
];

const steps = [
  {
    step: '1',
    title: 'Sign Up',
    description: 'Start your free 30-day trial.',
  },
  {
    step: '2',
    title: 'Shop & Save',
    description: 'Member prices apply automatically at checkout.',
  },
  {
    step: '3',
    title: 'Enjoy Perks',
    description: 'Giveaways, streaming & media, and priority support.',
  },
];

const faqs = [
  {
    question: 'What is ValueBox+ membership?',
    answer:
      'ValueBox+ is our premium membership program that gives you access to exclusive member pricing (up to 35% off), monthly giveaways, streaming content, and VIP customer support. It\'s designed to help you save more on every order.',
  },
  {
    question: 'How does member pricing work?',
    answer:
      'Member pricing is automatically applied to eligible products when you\'re signed in as a ValueBox+ member. You\'ll see the discounted price displayed on product pages and in your cart. Savings vary by product.',
  },
  {
    question: 'What items are excluded from member savings?',
    answer:
      'Most products on ValueBox are eligible for member pricing. Some exclusions may apply to certain brands, clearance items, or limited-time promotions. Eligible products will clearly show the member price.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! New members get a free 30-day trial. You can cancel anytime during the trial period without being charged. After the trial, your chosen plan (monthly or annual) will begin.',
  },
  {
    question: 'How do I cancel?',
    answer:
      'You can cancel your membership at any time from your account settings or by contacting our support team. If you cancel during your free trial, you won\'t be charged.',
  },
  {
    question: 'Are giveaways available outside the US?',
    answer:
      'Currently, giveaways are only available to US residents aged 18 and older. We\'re working on expanding eligibility to more regions in the future.',
  },
  {
    question: 'What streaming content is included with ValueBox+?',
    answer:
      'Your ValueBox+ membership includes access to a growing library of shows, movies, eBooks, audiobooks, music, and games. Content is accessible on any device via your browser. The library is updated regularly with new titles. Availability may vary by region \u2014 see our content library for what\u2019s available in your area.',
  },
  {
    question: 'Do I need to pay extra for streaming?',
    answer:
      'No. Streaming and media access is included with your ValueBox+ membership at no additional cost. Whether you\u2019re on the monthly ($9.99/mo) or annual ($79.99/yr) plan, you get full access to the entire media library.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PremiumPageClient() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-[#0f3460] py-16 md:py-24">
        <div className="container-main text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h14V7l-7-5zm0 2.236L15 8v8H5V8l5-3.764z" />
              </svg>
            </div>
            ValueBox+
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Save More with ValueBox+
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Unlock member pricing, exclusive giveaways, streaming access, and VIP support.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-lg text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Everything included with ValueBox+
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{benefit.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500">{benefit.description}</p>
                {'mediaPills' in benefit && benefit.mediaPills && (
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                    {[
                      { icon: '🎬', label: 'Shows' },
                      { icon: '🍿', label: 'Movies' },
                      { icon: '📚', label: 'eBooks' },
                      { icon: '🎧', label: 'Audiobooks' },
                      { icon: '🎵', label: 'Music' },
                      { icon: '🎮', label: 'Games' },
                    ].map((m) => (
                      <span key={m.label} className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        <span>{m.icon}</span> {m.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            Savings vary by product. Giveaways US-only, 18+. Streaming availability varies. Content library is updated regularly.
          </p>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-16 bg-gray-50" id="pricing">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Choose your plan
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Start with a free 30-day trial. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
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

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Monthly */}
            <div
              className={`bg-white rounded-xl border-2 p-8 transition-colors ${
                billingPeriod === 'monthly' ? 'border-sky-500 shadow-lg' : 'border-gray-200'
              }`}
            >
              <h3 className="font-bold text-gray-900 text-lg mb-1">Monthly</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-gray-900">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Cancel anytime</p>
              <Link
                href="/signup"
                className="block text-center bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all"
              >
                Start 30-Day Free Trial
              </Link>
            </div>

            {/* Annual */}
            <div
              className={`bg-white rounded-xl border-2 p-8 transition-colors relative ${
                billingPeriod === 'annual' ? 'border-sky-500 shadow-lg' : 'border-gray-200'
              }`}
            >
              <span className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Best Value
              </span>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Annual</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-900">$79.99</span>
                <span className="text-gray-500">/year</span>
              </div>
              <p className="text-sm text-green-600 font-medium mb-5">Save $39.89</p>
              <Link
                href="/signup"
                className="block text-center bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all"
              >
                Start 30-Day Free Trial
              </Link>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Free 30-day trial. Cancel anytime. No commitment.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Guest vs ValueBox+
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-navy text-white text-sm font-semibold">
                <div className="px-6 py-3">Feature</div>
                <div className="px-6 py-3 text-center">Guest</div>
                <div className="px-6 py-3 text-center">ValueBox+</div>
              </div>
              {/* Table rows */}
              {comparisonFeatures.map((row, idx) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 text-sm ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div className="px-6 py-3 text-gray-700">{row.feature}</div>
                  <div className="px-6 py-3 text-center">
                    {row.guest ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </div>
                  <div className="px-6 py-3 text-center">
                    {row.member ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 px-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-navy via-navy-light to-[#0f3460]">
        <div className="container-main text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to start saving?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of smart shoppers.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-lg text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
