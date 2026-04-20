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
    collections(first: 5) {
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

export const GET_COLLECTION_PRODUCT_COUNTS = `
  query GetCollectionProductCounts(
    $handle1: String!
    $handle2: String!
    $handle3: String!
    $handle4: String!
    $handle5: String!
    $handle6: String!
    $handle7: String!
  ) {
    c1: collection(handle: $handle1) { handle productsCount { count } }
    c2: collection(handle: $handle2) { handle productsCount { count } }
    c3: collection(handle: $handle3) { handle productsCount { count } }
    c4: collection(handle: $handle4) { handle productsCount { count } }
    c5: collection(handle: $handle5) { handle productsCount { count } }
    c6: collection(handle: $handle6) { handle productsCount { count } }
    c7: collection(handle: $handle7) { handle productsCount { count } }
  }
`;
