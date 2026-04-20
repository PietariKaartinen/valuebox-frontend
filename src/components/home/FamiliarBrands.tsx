import Link from 'next/link';

const brands = [
  { name: 'Nike', logo: 'NIKE' },
  { name: 'Crocs', logo: 'CROCS' },
  { name: "Levi's", logo: "LEVI'S" },
  { name: 'New Balance', logo: 'NB' },
  { name: 'Lululemon', logo: 'LULU' },
  { name: 'Adidas', logo: 'ADIDAS' },
];

export default function FamiliarBrands() {
  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Familiar <span className="text-accent">Brands</span>
          </h2>
          <Link href="/shop" className="text-sm text-accent hover:text-accent-dark font-medium">
            View All →
          </Link>
        </div>

        <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide py-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex-shrink-0 text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors cursor-pointer tracking-wider"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
