import { MetadataRoute } from 'next';
import { ALL_COLLECTION_HANDLES } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://valuebox.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const collectionPages: MetadataRoute.Sitemap = ALL_COLLECTION_HANDLES.map((handle) => ({
    url: `${BASE_URL}/shop/${handle}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const { products } = await getProducts({ first: 250 });
    productPages = products.map((p) => ({
      url: `${BASE_URL}/products/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error('Sitemap: failed to fetch products', e);
  }

  return [...staticPages, ...collectionPages, ...productPages];
}
