export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney;
  maxVariantPrice: ShopifyMoney;
}

export interface ShopifyMetafield {
  key: string;
  value: string;
  type: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  totalInventory: number;
  featuredImage: ShopifyImage | null;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  priceRange: ShopifyPriceRange;
  compareAtPriceRange: ShopifyPriceRange;
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
  metafields: (ShopifyMetafield | null)[];
  collections?: {
    edges: {
      node: {
        handle: string;
        title: string;
      };
    }[];
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

// Cart types
export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
      vendor: string;
      metafields: (ShopifyMetafield | null)[];
    };
    price: ShopifyMoney;
    compareAtPrice: ShopifyMoney | null;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    image: ShopifyImage | null;
  };
  cost: {
    totalAmount: ShopifyMoney;
    compareAtAmountPerQuantity: ShopifyMoney | null;
    amountPerQuantity: ShopifyMoney;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  discountCodes?: {
    code: string;
    applicable: boolean;
  }[];
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney | null;
  };
  lines: {
    edges: {
      node: CartLineItem;
    }[];
  };
}

// Parsed product helpers
export interface ParsedProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  totalInventory: number;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  price: number;
  compareAtPrice: number | null;
  currencyCode: string;
  variants: ShopifyVariant[];
  memberPrice: number | null;
  memberDiscountPercent: number | null;
  badge: string | null;
  isHero: boolean;
  discountPercent: number | null;
  collections: { handle: string; title: string }[];
}

export interface Connection<T> {
  edges: {
    node: T;
  }[];
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}
