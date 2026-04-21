export const GET_COUPONS = `
  query GetCoupons {
    metaobjects(type: "coupon", first: 20, sortKey: "updated_at") {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_FOR_COUPON = `
  query GetProductForCoupon($handle: String!) {
    product(handle: $handle) {
      title
      handle
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;
