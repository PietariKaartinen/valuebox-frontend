import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getCategoryCounts } from '@/lib/shopify';
import { ALL_COLLECTION_HANDLES, HANDLE_TO_PARENT, MAIN_CATEGORIES } from '@/lib/constants';
import { getCollectionTitle } from '@/lib/utils';
import ShopPageClient from '@/components/shop/ShopPageClient';

interface Props {
  params: { handle: string };
}

export async function generateStaticParams() {
  return ALL_COLLECTION_HANDLES.map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = getCollectionTitle(params.handle);
  return {
    title: `${title} — Shop For Deals`,
    description: `Browse ${title} at unbeatable prices. Member savings up to 35%.`,
    openGraph: {
      title: `${title} — ValueBox`,
      description: `Browse ${title} at unbeatable prices.`,
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = params;

  // Validate the handle exists
  if (!ALL_COLLECTION_HANDLES.includes(handle)) {
    notFound();
  }

  // Always fetch ALL products so that client-side category filtering works
  // across all categories, not just the one the user navigated from.
  let products: import('@/lib/shopify/types').ParsedProduct[];
  let categoryCounts: Record<string, number> = {};

  try {
    const data = await getProducts({ first: 50 });
    products = data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  try {
    categoryCounts = await getCategoryCounts();
  } catch (error) {
    console.error('Error fetching category counts:', error);
  }

  const collectionTitle = getCollectionTitle(handle);

  // If the handle is a subcategory, resolve to the parent main category
  // so the sidebar pre-selects the correct main category filter.
  const parentHandle = HANDLE_TO_PARENT[handle];
  const isMainCategory = MAIN_CATEGORIES.some((c) => c.handle === handle);
  const effectiveHandle = isMainCategory ? handle : parentHandle || handle;

  return (
    <ShopPageClient
      products={products}
      collectionHandle={effectiveHandle}
      collectionTitle={collectionTitle}
      categoryCounts={categoryCounts}
    />
  );
}
