import { NextResponse } from 'next/server';
import { getCollectionByHandle } from '@/lib/shopify';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const data = await getCollectionByHandle('todays-deals', { first: 12 });
    return NextResponse.json(data?.products || []);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json([]);
  }
}
