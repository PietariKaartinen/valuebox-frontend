import { NextRequest, NextResponse } from 'next/server';
import { predictiveSearch } from '@/lib/shopify/search';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q');
  if (!query || query.trim().length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = await predictiveSearch(query.trim());
    return NextResponse.json(results);
  } catch (error) {
    console.error('Predictive search error:', error);
    return NextResponse.json([]);
  }
}
