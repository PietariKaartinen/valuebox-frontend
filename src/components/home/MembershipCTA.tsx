import Link from 'next/link';

export function MembershipSection() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Member Pricing',
      description: 'Save up to 35% on eligible products across all categories.',
      highlight: 'UP TO 35% OFF',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Member Giveaways',
      description: 'Monthly contests & real-time giveaways, coupons, gift cards.',
      highlight: 'UNLIMITED ENTRIES',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Streaming Access',
      description: 'Movies, shows, books, & more included with your membership.',
      highlight: 'UNLIMITED ACCESS',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'VIP Support',
      description: 'Priority help from our team when you need it.',
      highlight: '24/7 PRIORITY',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-navy via-navy-light to-[#0f3460]">
      <div className="container-main">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h14V7l-7-5zm0 2.236L15 8v8H5V8l5-3.764z" />
              </svg>
            </div>
            ValueBox+
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Shop With <span className="text-accent">ValueBox+</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of members who save every day with exclusive member pricing, giveaways, and premium benefits.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-accent/30 transition-colors"
            >
              <div className="text-accent mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{benefit.description}</p>
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">
                {benefit.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GiveawayBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="container-main">
        <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-block bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-3">
              MEMBER EXCLUSIVE
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Win big with member-only prizes and rewards
            </h3>
            <p className="text-gray-400 text-sm max-w-lg">
              Enter to win exclusive prizes including electronics, gift cards, travel vouchers, and more. Members get unlimited entries.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/premium" className="btn-primary text-sm py-2">
                Contest &amp; Giveaways
              </Link>
              <Link href="/premium" className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                See What&apos;s Included →
              </Link>
            </div>
          </div>
          <div className="text-center shrink-0">
            <div className="text-4xl md:text-5xl font-bold text-accent">$10,000+</div>
            <p className="text-gray-400 text-sm mt-1">in monthly prizes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TryFreeBar() {
  return (
    <section className="py-6 bg-gray-50">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <h3 className="text-lg font-bold text-gray-900">
            Try it free. Cancel anytime.
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No pre-delivery
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
          </div>
          <Link href="/premium" className="bg-navy text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-navy-light transition-colors text-sm">
            Learn about ValueBox+ →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BottomMembershipCTA() {
  return (
    <section className="py-8 bg-white">
      <div className="container-main">
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Shop With <span className="text-accent">ValueBox+</span>
              </h3>
              <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-500">
                <span>Member Pricing</span>
                <span>Member Giveaways</span>
                <span>Streaming Access</span>
                <span>VIP Support</span>
              </div>
            </div>
            <Link href="/premium" className="text-accent hover:text-accent-dark font-medium text-sm whitespace-nowrap">
              Your Membership →
            </Link>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Secure Checkout | Easy Returns | 24/7 Support
            </p>
            <p className="text-sm text-gray-400 mt-1">
              4.8/5 from 3,200+ customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
