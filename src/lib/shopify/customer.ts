import { shopifyFetch } from './client';
import {
  CUSTOMER_CREATE,
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  GET_CUSTOMER,
  CUSTOMER_UPDATE,
} from './queries/customer';
import type {
  ShopifyCustomer,
  CustomerAccessToken,
  CustomerUserError,
  SignupInput,
} from './customer-types';

// ─── Customer Auth API ─────────────────────────────────────

export async function createCustomer(input: SignupInput): Promise<{
  customer: { id: string; email: string; firstName: string; lastName: string } | null;
  errors: CustomerUserError[];
}> {
  const data = await shopifyFetch<{
    customerCreate: {
      customer: { id: string; email: string; firstName: string; lastName: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>({
    query: CUSTOMER_CREATE,
    variables: {
      input: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        acceptsMarketing: input.acceptsMarketing ?? false,
      },
    },
    cache: 'no-store',
  });

  return {
    customer: data.customerCreate.customer,
    errors: data.customerCreate.customerUserErrors,
  };
}

export async function createCustomerAccessToken(
  email: string,
  password: string
): Promise<{
  token: CustomerAccessToken | null;
  errors: CustomerUserError[];
}> {
  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: CustomerUserError[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: {
      input: { email, password },
    },
    cache: 'no-store',
  });

  return {
    token: data.customerAccessTokenCreate.customerAccessToken,
    errors: data.customerAccessTokenCreate.customerUserErrors,
  };
}

export async function deleteCustomerAccessToken(
  customerAccessToken: string
): Promise<{ deletedAccessToken: string | null; errors: { field: string; message: string }[] }> {
  const data = await shopifyFetch<{
    customerAccessTokenDelete: {
      deletedAccessToken: string | null;
      deletedCustomerAccessTokenId: string | null;
      userErrors: { field: string; message: string }[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_DELETE,
    variables: { customerAccessToken },
    cache: 'no-store',
  });

  return {
    deletedAccessToken: data.customerAccessTokenDelete.deletedAccessToken,
    errors: data.customerAccessTokenDelete.userErrors,
  };
}

export async function getCustomer(
  customerAccessToken: string
): Promise<ShopifyCustomer | null> {
  try {
    const data = await shopifyFetch<{
      customer: ShopifyCustomer | null;
    }>({
      query: GET_CUSTOMER,
      variables: { customerAccessToken },
      cache: 'no-store',
    });

    return data.customer;
  } catch {
    return null;
  }
}

export async function updateCustomer(
  customerAccessToken: string,
  customer: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }
): Promise<{
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    acceptsMarketing: boolean;
  } | null;
  errors: { field: string; message: string }[];
}> {
  const data = await shopifyFetch<{
    customerUpdate: {
      customer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        acceptsMarketing: boolean;
      } | null;
      customerUserErrors: { field: string; message: string }[];
    };
  }>({
    query: CUSTOMER_UPDATE,
    variables: { customerAccessToken, customer },
    cache: 'no-store',
  });

  return {
    customer: data.customerUpdate.customer,
    errors: data.customerUpdate.customerUserErrors,
  };
}
