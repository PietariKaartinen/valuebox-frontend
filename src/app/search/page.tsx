import { Metadata } from 'next';
import { searchProducts } from '@/lib/shopify/search';
import SearchPageClient from './SearchPageClient';

interface SearchPageProps {
  searchParams: { q?: string; category?: string };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = searchParams.q || '';
  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: query
      ? `Find the best deals on "${query}" at ValueBox. Member pricing, free shipping, and exclusive discounts.`
      : 'Search millions of products at unbeatable prices on ValueBox.',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const category = searchParams.category || '';
  let products: Awaited<ReturnType<typeof searchProducts>>['products'] = [];
  let error = false;

  if (query.trim().length > 0) {
    try {
      const result = await searchProducts(query.trim());
      // If a category filter is specified, filter results to that category
      if (category) {
        products = result.products.filter((p) =>
          p.collections.some((c) => c.handle === category)
        );
      } else {
        products = result.products;
      }
    } catch (e) {
      console.error('Search error:', e);
      error = true;
    }
  }

  return <SearchPageClient query={query} products={products} error={error} category={category} />;
}
