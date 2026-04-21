// ─── Customer Types ─────────────────────────────────────────

export interface ShopifyCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  acceptsMarketing: boolean;
  defaultAddress: {
    address1: string;
    city: string;
    country: string;
    zip: string;
  } | null;
  orders: {
    edges: {
      node: ShopifyCustomerOrder;
    }[];
  };
  tags: string[];
}

export interface ShopifyCustomerOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
        variant: {
          image: {
            url: string;
            altText: string | null;
          } | null;
          price: {
            amount: string;
          };
        } | null;
      };
    }[];
  };
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerUserError {
  field: string[];
  message: string;
  code?: string;
}

export interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptsMarketing?: boolean;
}
