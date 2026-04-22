const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    totalInventory
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "member_price" }
      { namespace: "custom", key: "member_discount_percent" }
      { namespace: "custom", key: "badge" }
      { namespace: "custom", key: "is_hero" }
    ]) {
      key
      value
      type
    }
    collections(first: 10) {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`;

export const GET_PRODUCTS = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int = 50, $after: String, $sortKey: ProductSortKeys = BEST_SELLING, $reverse: Boolean = false, $query: String) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
      edges {
        node {
          ...ProductFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  ${PRODUCT_FRAGMENT}
  query GetCollectionByHandle($handle: String!, $first: Int = 50, $after: String, $sortKey: ProductCollectionSortKeys = BEST_SELLING, $reverse: Boolean = false) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...ProductFields
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = `
  query GetCollections($first: Int = 50) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_RECOMMENDATIONS = `
  ${PRODUCT_FRAGMENT}
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductFields
    }
  }
`;

/**
 * Build a dynamic GraphQL query that fetches productsCount for an arbitrary
 * number of collection handles. Each handle gets an aliased field `c{index}`.
 */
export function buildCollectionCountsQuery(handleCount: number): string {
  const vars = Array.from({ length: handleCount }, (_, i) => `$handle${i + 1}: String!`).join('\n    ');
  const fields = Array.from(
    { length: handleCount },
    (_, i) => `c${i + 1}: collection(handle: $handle${i + 1}) { handle productsCount { count } }`
  ).join('\n    ');
  return `
  query GetCollectionProductCounts(
    ${vars}
  ) {
    ${fields}
  }
`;
}

// Legacy static query kept for reference / backwards compat
export const GET_COLLECTION_PRODUCT_COUNTS = buildCollectionCountsQuery(7);
