import Link from 'next/link';
import Image from 'next/image';

const quickCategories = [
  {
    label: 'Electronics',
    href: '/shop/electronics',
    image: '/images/hero/electronics.png',
    gradient: 'from-[#1E3A5F] to-[#2563EB]',
  },
  {
    label: 'Fashion',
    href: '/shop/fashion-accessories',
    image: '/images/hero/fashion.png',
    gradient: 'from-[#BE185D] to-[#EC4899]',
  },
  {
    label: 'Home & Kitchen',
    href: '/shop/home-kitchen',
    image: '/images/hero/home-kitchen.png',
    gradient: 'from-[#065F46] to-[#10B981]',
  },
  {
    label: 'Sports',
    href: '/shop/fitness-wellness',
    image: '/images/hero/sports.png',
    gradient: 'from-[#C2410C] to-[#F97316]',
  },
];

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-navy via-navy-light to-[#0f3460] overflow-hidden">
      <div className="container-main py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Millions of Products{' '}
              <span className="block">Unbeatable Prices.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-2">
              Free Standard Shipping on orders $50+ · Free Priority Shipping on orders $99+
            </p>
            <Link href="/shop" className="text-accent text-sm hover:underline inline-block mb-6">
              Join ValueBox+
            </Link>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link href="#" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
                Join ValueBox+
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trusted by 1000s
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                Free Shipping $50+
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8/5 Rating
              </span>
            </div>
          </div>

          {/* Right - Category cards grid with illustration PNGs */}
          <div className="hidden md:grid grid-cols-2 gap-3">
            {quickCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cat.gradient} p-5 text-white min-h-[140px] group`}
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-bold">{cat.label}</h3>
                  <span className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    Shop Now &rarr;
                  </span>
                </div>
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={160}
                  height={160}
                  className="absolute right-0 bottom-0 h-full w-auto object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
