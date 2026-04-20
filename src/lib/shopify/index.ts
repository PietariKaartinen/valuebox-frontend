import { shopifyFetch } from './client';
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTION_BY_HANDLE,
  GET_COLLECTIONS,
  GET_PRODUCT_RECOMMENDATIONS,
} from './queries/products';
import {
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  GET_CART,
} from './queries/cart';
import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ParsedProduct,
  Connection,
} from './types';

// ─── Product Helpers ────────────────────────────────────────

export function parseProduct(product: ShopifyProduct): ParsedProduct {
  const metafields = product.metafields || [];

  const memberPriceMf = metafields.find((m) => m?.key === 'member_price');
  const memberDiscountMf = metafields.find((m) => m?.key === 'member_discount_percent');
  const badgeMf = metafields.find((m) => m?.key === 'badge');
  const isHeroMf = metafields.find((m) => m?.key === 'is_hero');

  let memberPrice: number | null = null;
  if (memberPriceMf?.value) {
    try {
      const parsed = JSON.parse(memberPriceMf.value);
      memberPrice = parseFloat(parsed.amount);
    } catch {
      memberPrice = parseFloat(memberPriceMf.value);
    }
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtRaw = parseFloat(product.compareAtPriceRange?.minVariantPrice?.amount || '0');
  const compareAtPrice = compareAtRaw > price ? compareAtRaw : null;

  const discountPercent = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    vendor: product.vendor,
    productType: product.productType,
    tags: product.tags,
    availableForSale: product.availableForSale,
    totalInventory: product.totalInventory,
    featuredImage: product.featuredImage,
    images: product.images.edges.map((e) => e.node),
    price,
    compareAtPrice,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    variants: product.variants.edges.map((e) => e.node),
    memberPrice,
    memberDiscountPercent: memberDiscountMf?.value
      ? parseInt(memberDiscountMf.value, 10)
      : null,
    badge: badgeMf?.value || null,
    isHero: isHeroMf?.value === 'true',
    discountPercent,
    collections: product.collections?.edges.map((e) => e.node) || [],
  };
}

// ─── Product API ────────────────────────────────────────────

export async function getProducts(options?: {
  first?: number;
  after?: string;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
}): Promise<{ products: ParsedProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }> {
  const data = await shopifyFetch<{
    products: Connection<ShopifyProduct> & { pageInfo: { hasNextPage: boolean; endCursor: string | null } };
  }>({
    query: GET_PRODUCTS,
    variables: {
      first: options?.first || 50,
      after: options?.after || null,
      sortKey: options?.sortKey || 'BEST_SELLING',
      reverse: options?.reverse || false,
      query: options?.query || null,
    },
    cache: 'no-store',
  });

  return {
    products: data.products.edges.map((e) => parseProduct(e.node)),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProductByHandle(handle: string): Promise<ParsedProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: [`product-${handle}`],
  });

  return data.product ? parseProduct(data.product) : null;
}

export async function getCollectionByHandle(
  handle: string,
  options?: {
    first?: number;
    after?: string;
    sortKey?: string;
    reverse?: boolean;
  }
): Promise<{
  collection: Omit<ShopifyCollection, 'products'> | null;
  products: ParsedProduct[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
} | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: {
      handle,
      first: options?.first || 50,
      after: options?.after || null,
      sortKey: options?.sortKey || 'BEST_SELLING',
      reverse: options?.reverse || false,
    },
    cache: 'no-store',
  });

  if (!data.collection) return null;

  const { products: productsConnection, ...collectionData } = data.collection;

  return {
    collection: collectionData,
    products: productsConnection.edges.map((e) => parseProduct(e.node)),
    pageInfo: productsConnection.pageInfo,
  };
}

export async function getCollections() {
  const data = await shopifyFetch<{
    collections: Connection<{
      id: string;
      handle: string;
      title: string;
      description: string;
      image: { url: string; altText: string | null; width: number; height: number } | null;
    }>;
  }>({
    query: GET_COLLECTIONS,
    tags: ['collections'],
  });

  return data.collections.edges.map((e) => e.node);
}

export async function getProductRecommendations(productId: string): Promise<ParsedProduct[]> {
  const data = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>({
    query: GET_PRODUCT_RECOMMENDATIONS,
    variables: { productId },
    cache: 'no-store',
  });

  return (data.productRecommendations || []).map(parseProduct);
}

// ─── Cart API ───────────────────────────────────────────────

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] };
  }>({
    query: CREATE_CART,
    variables: { input: {} },
    cache: 'no-store',
  });

  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: { field: string; message: string }[] };
  }>({
    query: ADD_TO_CART,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return data.cartLinesAdd.cart;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] };
  }>({
    query: UPDATE_CART,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: { field: string; message: string }[] };
  }>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART,
    variables: { cartId },
    cache: 'no-store',
  });

  return data.cart;
}
