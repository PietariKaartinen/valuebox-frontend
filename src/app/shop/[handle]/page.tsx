import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollectionByHandle, getCategoryCounts } from '@/lib/shopify';
import { ALL_COLLECTION_HANDLES } from '@/lib/constants';
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

  let data;
  let categoryCounts: Record<string, number> = {};

  try {
    data = await getCollectionByHandle(handle, { first: 50 });
  } catch (error) {
    console.error('Error fetching collection:', error);
    data = null;
  }

  if (!data) {
    notFound();
  }

  try {
    categoryCounts = await getCategoryCounts();
  } catch (error) {
    console.error('Error fetching category counts:', error);
  }

  return (
    <ShopPageClient
      products={data.products}
      collectionHandle={handle}
      collectionTitle={data.collection?.title || getCollectionTitle(handle)}
      categoryCounts={categoryCounts}
    />
  );
}
