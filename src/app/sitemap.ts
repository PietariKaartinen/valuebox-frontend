import { MetadataRoute } from 'next';
import { ALL_COLLECTION_HANDLES } from '@/lib/constants';

const BASE_URL = 'https://valuebox.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ];

  const collectionPages = ALL_COLLECTION_HANDLES.map((handle) => ({
    url: `${BASE_URL}/shop/${handle}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...collectionPages];
}
