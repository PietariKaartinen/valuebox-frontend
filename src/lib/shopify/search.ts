import { shopifyFetch } from './client';
import { SEARCH_PRODUCTS, PREDICTIVE_SEARCH } from './queries/search';
import { parseProduct } from './index';
import type { ShopifyProduct, ParsedProduct, Connection } from './types';

export async function searchProducts(
  query: string,
  first: number = 24
): Promise<{ products: ParsedProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }> {
  const data = await shopifyFetch<{
    products: Connection<ShopifyProduct> & { pageInfo: { hasNextPage: boolean; endCursor: string | null } };
  }>({
    query: SEARCH_PRODUCTS,
    variables: { query, first },
    cache: 'no-store',
  });

  return {
    products: data.products.edges.map((e) => parseProduct(e.node)),
    pageInfo: data.products.pageInfo,
  };
}

export interface PredictiveResult {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null; width: number; height: number } | null;
  price: number;
  compareAtPrice: number | null;
}

export async function predictiveSearch(query: string): Promise<PredictiveResult[]> {
  const data = await shopifyFetch<{
    products: {
      edges: {
        node: {
          id: string;
          handle: string;
          title: string;
          featuredImage: { url: string; altText: string | null; width: number; height: number } | null;
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
          compareAtPriceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        };
      }[];
    };
  }>({
    query: PREDICTIVE_SEARCH,
    variables: { query, first: 6 },
    cache: 'no-store',
  });

  return data.products.edges.map((e) => {
    const price = parseFloat(e.node.priceRange.minVariantPrice.amount);
    const compareAtRaw = parseFloat(e.node.compareAtPriceRange?.minVariantPrice?.amount || '0');
    return {
      id: e.node.id,
      handle: e.node.handle,
      title: e.node.title,
      featuredImage: e.node.featuredImage,
      price,
      compareAtPrice: compareAtRaw > price ? compareAtRaw : null,
    };
  });
}
