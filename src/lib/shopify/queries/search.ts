const PRODUCT_FRAGMENT = `
  fragment SearchProductFields on Product {
    id
    handle
    title
    description
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

export const SEARCH_PRODUCTS = `
  ${PRODUCT_FRAGMENT}
  query SearchProducts($query: String!, $first: Int = 24) {
    products(first: $first, query: $query) {
      edges {
        node {
          ...SearchProductFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const PREDICTIVE_SEARCH = `
  query PredictiveSearch($query: String!, $first: Int = 6) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
