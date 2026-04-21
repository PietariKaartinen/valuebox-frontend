import { NextRequest, NextResponse } from 'next/server';
import {
  createCustomer,
  createCustomerAccessToken,
  deleteCustomerAccessToken,
  getCustomer,
  updateCustomer,
} from '@/lib/shopify/customer';

export const runtime = 'nodejs';

const COOKIE_NAME = 'valuebox_customer_token';

function setTokenCookie(response: NextResponse, token: string, expiresAt: string) {
  const expires = new Date(expiresAt);
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  });
  return response;
}

function clearTokenCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'signup': {
        const { firstName, lastName, email, password, acceptsMarketing } = body;

        // Create the customer
        const createResult = await createCustomer({
          firstName,
          lastName,
          email,
          password,
          acceptsMarketing,
        });

        if (createResult.errors.length > 0) {
          return NextResponse.json(
            { error: createResult.errors[0].message, errors: createResult.errors },
            { status: 400 }
          );
        }

        // Auto-login after signup
        const tokenResult = await createCustomerAccessToken(email, password);

        if (!tokenResult.token) {
          return NextResponse.json(
            { error: 'Account created but login failed. Please sign in manually.', errors: tokenResult.errors },
            { status: 400 }
          );
        }

        // Fetch customer data
        const customer = await getCustomer(tokenResult.token.accessToken);

        const response = NextResponse.json({
          customer,
          accessToken: tokenResult.token.accessToken,
        });

        return setTokenCookie(response, tokenResult.token.accessToken, tokenResult.token.expiresAt);
      }

      case 'login': {
        const { email, password } = body;

        const tokenResult = await createCustomerAccessToken(email, password);

        if (!tokenResult.token) {
          const errorMessage =
            tokenResult.errors.length > 0
              ? tokenResult.errors[0].message
              : 'Invalid email or password';
          return NextResponse.json({ error: errorMessage, errors: tokenResult.errors }, { status: 401 });
        }

        const customer = await getCustomer(tokenResult.token.accessToken);

        const response = NextResponse.json({
          customer,
          accessToken: tokenResult.token.accessToken,
        });

        return setTokenCookie(response, tokenResult.token.accessToken, tokenResult.token.expiresAt);
      }

      case 'logout': {
        const token = request.cookies.get(COOKIE_NAME)?.value;

        if (token) {
          try {
            await deleteCustomerAccessToken(token);
          } catch {
            // Token may already be expired, that's fine
          }
        }

        const response = NextResponse.json({ success: true });
        return clearTokenCookie(response);
      }

      case 'me': {
        const token = request.cookies.get(COOKIE_NAME)?.value;

        if (!token) {
          return NextResponse.json({ customer: null });
        }

        const customer = await getCustomer(token);

        if (!customer) {
          // Token is invalid/expired, clear cookie
          const response = NextResponse.json({ customer: null });
          return clearTokenCookie(response);
        }

        return NextResponse.json({ customer, accessToken: token });
      }

      case 'update': {
        const token = request.cookies.get(COOKIE_NAME)?.value;

        if (!token) {
          return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { customerData } = body;
        const result = await updateCustomer(token, customerData);

        if (result.errors.length > 0) {
          return NextResponse.json(
            { error: result.errors[0].message, errors: result.errors },
            { status: 400 }
          );
        }

        // Re-fetch full customer data
        const updatedCustomer = await getCustomer(token);

        return NextResponse.json({ customer: updatedCustomer });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
