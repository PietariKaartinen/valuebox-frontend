import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    label: 'Electronics',
    image: '/images/categories/electronics.png',
    href: '/shop/electronics',
  },
  {
    label: 'Bags & Accessories',
    image: '/images/categories/bags-accessories.png',
    href: '/shop/bags-travel',
  },
  {
    label: 'Skincare',
    image: '/images/categories/skincare.png',
    href: '/shop/skincare-tools',
  },
  {
    label: 'Cleaning',
    image: '/images/categories/cleaning.png',
    href: '/shop/cleaning',
  },
  {
    label: 'Home Organisation',
    image: '/images/categories/home-organisation.png',
    href: '/shop/home-organization',
  },
  {
    label: 'Kitchen Essentials',
    image: '/images/categories/kitchen-essentials.png',
    href: '/shop/kitchen-essentials',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-10 bg-white">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Shop From <span className="text-accent">Top Categories</span>
          </h2>
          <Link href="/shop" className="text-sm text-accent hover:text-accent-dark font-medium">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="aspect-square w-full max-w-[140px] overflow-hidden rounded-full">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  width={280}
                  height={280}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-800 text-center leading-tight group-hover:text-accent transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
