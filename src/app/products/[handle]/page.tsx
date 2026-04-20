import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByHandle, getCollectionByHandle } from '@/lib/shopify';
import ProductDetailClient from './ProductDetailClient';
import ProductCarousel from '@/components/product/ProductCarousel';
import Link from 'next/link';

interface Props {
  params: { handle: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.featuredImage
        ? [{ url: product.featuredImage.url, width: 800, height: 800 }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  // Get recommended products from the same collection
  let recommendedProducts: import('@/lib/shopify/types').ParsedProduct[] = [];
  try {
    const firstCollection = product.collections[0];
    if (firstCollection) {
      const collectionData = await getCollectionByHandle(firstCollection.handle, {
        first: 12,
      });
      recommendedProducts =
        collectionData?.products.filter((p) => p.id !== product.id) || [];
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }

  // Build breadcrumb
  const firstCollection = product.collections[0];
  const breadcrumbs = [
    { label: firstCollection?.title || 'Shop', href: firstCollection ? `/shop/${firstCollection.handle}` : '/shop' },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-main py-3">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <Link href={crumb.href} className="text-accent hover:text-accent-dark">
                  {crumb.label}
                </Link>
                <span className="text-gray-300">›</span>
              </span>
            ))}
            {product.vendor && (
              <>
                <span className="text-accent">{product.vendor}</span>
                <span className="text-gray-300">›</span>
              </>
            )}
            <span className="text-gray-500 truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <ProductDetailClient product={product} />

      {/* Recommended For You */}
      {recommendedProducts.length > 0 && (
        <ProductCarousel
          title="Recommended For You"
          highlightWord="For You"
          products={recommendedProducts}
        />
      )}

      {/* ValueBox+ CTA Banner */}
      <section className="py-8">
        <div className="container-main">
          <div className="relative bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <span className="inline-block bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-3">
                BEST DEALS
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">ValueBox+</h3>
              <p className="text-gray-300 mb-4">
                Unlock automatic savings, exclusive giveaways, streaming, and VIP support
              </p>
              <Link
                href="#"
                className="text-accent hover:text-white font-medium text-sm flex items-center gap-1 transition-colors"
              >
                View Membership
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}
