import { NextRequest, NextResponse } from 'next/server';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const apiVersion = '2026-04';
const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({
        query: CUSTOMER_CREATE_MUTATION,
        variables: {
          input: {
            email,
            acceptsMarketing: true,
          },
        },
      }),
    });

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    const { customerCreate } = json.data;

    if (customerCreate.customerUserErrors?.length > 0) {
      const errors = customerCreate.customerUserErrors;
      const isTaken = errors.some(
        (e: { code: string }) => e.code === 'TAKEN' || e.code === 'CUSTOMER_DISABLED'
      );

      if (isTaken) {
        return NextResponse.json(
          { success: true, alreadySubscribed: true },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: errors[0]?.message || 'Invalid email address.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
