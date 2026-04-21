import { shopifyFetch } from './client';
import { GET_COUPONS, GET_PRODUCT_FOR_COUPON } from './queries/coupons';
import type { Coupon, GeneralCoupon, ProductCoupon } from './coupon-types';

interface MetaobjectField {
  key: string;
  value: string;
}

interface MetaobjectNode {
  id: string;
  handle: string;
  fields: MetaobjectField[];
}

interface CouponsResponse {
  metaobjects: {
    edges: {
      node: MetaobjectNode;
    }[];
  };
}

interface ProductForCouponResponse {
  product: {
    title: string;
    handle: string;
    featuredImage: {
      url: string;
      altText: string | null;
    } | null;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  } | null;
}

function getField(fields: MetaobjectField[], key: string): string {
  return fields.find((f) => f.key === key)?.value || '';
}

function parseCouponFields(node: MetaobjectNode) {
  const { id, fields } = node;

  return {
    id,
    code: getField(fields, 'code'),
    title: getField(fields, 'title'),
    description: getField(fields, 'description'),
    discountValue: getField(fields, 'discount_value'),
    backgroundColor: getField(fields, 'background_color'),
    badgeText: getField(fields, 'badge_text') || undefined,
    couponType: getField(fields, 'coupon_type') as 'general' | 'product',
    productHandle: getField(fields, 'product_handle'),
    expiryDate: getField(fields, 'expiry_date') || undefined,
    minPurchase: getField(fields, 'min_purchase') || undefined,
    collectionHandle: getField(fields, 'collection_handle') || undefined,
    active: getField(fields, 'active') === 'true',
    sortOrder: parseInt(getField(fields, 'sort_order') || '999', 10),
  };
}

export async function getCouponsWithProducts(): Promise<Coupon[]> {
  try {
    const data = await shopifyFetch<CouponsResponse>({
      query: GET_COUPONS,
      cache: 'no-store',
    });

    const rawCoupons = data.metaobjects.edges.map((e) => parseCouponFields(e.node));

    // Filter active only
    const activeCoupons = rawCoupons.filter((c) => c.active);

    // Filter out expired coupons
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const validCoupons = activeCoupons.filter((c) => {
      if (!c.expiryDate) return true;
      const expiry = new Date(c.expiryDate);
      expiry.setHours(23, 59, 59, 999);
      return expiry >= now;
    });

    // Sort by sort_order ascending
    validCoupons.sort((a, b) => a.sortOrder - b.sortOrder);

    // Build typed coupons, fetching product data for product-type coupons
    const coupons: Coupon[] = [];

    for (const raw of validCoupons) {
      if (raw.couponType === 'product' && raw.productHandle) {
        try {
          const productData = await shopifyFetch<ProductForCouponResponse>({
            query: GET_PRODUCT_FOR_COUPON,
            variables: { handle: raw.productHandle },
            cache: 'force-cache',
            tags: [`coupon-product-${raw.productHandle}`],
          });

          if (!productData.product) {
            // Product not found (deleted), skip this coupon
            console.warn(`Coupon "${raw.code}" references missing product "${raw.productHandle}", skipping.`);
            continue;
          }

          const product = productData.product;

          const productCoupon: ProductCoupon = {
            id: raw.id,
            code: raw.code,
            title: raw.title,
            description: raw.description,
            discountValue: raw.discountValue,
            backgroundColor: raw.backgroundColor,
            badgeText: raw.badgeText,
            expiryDate: raw.expiryDate,
            minPurchase: raw.minPurchase,
            collectionHandle: raw.collectionHandle,
            sortOrder: raw.sortOrder,
            couponType: 'product',
            productHandle: product.handle,
            productTitle: product.title,
            productImageUrl: product.featuredImage?.url || '',
            productImageAlt: product.featuredImage?.altText || product.title,
            productPrice: product.priceRange.minVariantPrice.amount,
            productCurrency: product.priceRange.minVariantPrice.currencyCode,
          };

          // Skip product coupons without an image
          if (!productCoupon.productImageUrl) {
            console.warn(`Coupon "${raw.code}" product has no image, skipping.`);
            continue;
          }

          coupons.push(productCoupon);
        } catch (err) {
          console.error(`Failed to fetch product for coupon "${raw.code}":`, err);
          // Skip this coupon if product fetch fails
          continue;
        }
      } else {
        const generalCoupon: GeneralCoupon = {
          id: raw.id,
          code: raw.code,
          title: raw.title,
          description: raw.description,
          discountValue: raw.discountValue,
          backgroundColor: raw.backgroundColor,
          badgeText: raw.badgeText,
          expiryDate: raw.expiryDate,
          minPurchase: raw.minPurchase,
          collectionHandle: raw.collectionHandle,
          sortOrder: raw.sortOrder,
          couponType: 'general',
        };

        coupons.push(generalCoupon);
      }
    }

    return coupons;
  } catch (error) {
    console.error('Failed to fetch coupons:', error);
    return [];
  }
}
