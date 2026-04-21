export type CouponBase = {
  id: string;
  code: string;
  title: string;
  description: string;
  discountValue: string;
  backgroundColor: string;
  badgeText?: string;
  expiryDate?: string;
  minPurchase?: string;
  collectionHandle?: string;
  sortOrder: number;
};

export type GeneralCoupon = CouponBase & {
  couponType: 'general';
};

export type ProductCoupon = CouponBase & {
  couponType: 'product';
  productHandle: string;
  productTitle: string;
  productImageUrl: string;
  productImageAlt: string;
  productPrice: string;
  productCurrency: string;
};

export type Coupon = GeneralCoupon | ProductCoupon;
