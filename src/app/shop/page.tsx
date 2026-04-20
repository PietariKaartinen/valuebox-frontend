import { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import ShopPageClient from '@/components/shop/ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop For Deals',
  description:
    'Browse all products at unbeatable prices. Member savings up to 35%, 30-day returns, and tracked delivery.',
};

export default async function ShopPage() {
  let products: import('@/lib/shopify/types').ParsedProduct[];
  try {
    const data = await getProducts({ first: 50 });
    products = data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return <ShopPageClient products={products} />;
}
