import Link from 'next/link';

const steps = [
  {
    number: '1',
    title: 'Browse & Shop',
    description:
      'Shop our full product and shopping catalog to find a variety of items at the best prices.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'See Member Prices',
    description:
      'Upgrade to see the whole picture member pricing with special pricing, discounts, and more.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Unlock with Premium',
    description:
      "Join to get full savings, early access to deals, monthly giveaways, streaming, and more.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 bg-white">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            How It <span className="text-accent">Works</span>
          </h2>
          <Link href="/premium" className="text-sm text-accent hover:text-accent-dark font-medium">
            Your Membership →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-gray-50 rounded-xl p-6 text-center"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step.number}
              </div>

              <div className="text-accent mb-4 flex justify-center mt-2">
                {step.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-3">
            Try free · Cancel anytime
          </p>
          <Link href="/premium" className="btn-primary inline-block">
            View Membership →
          </Link>
        </div>
      </div>
    </section>
  );
}
