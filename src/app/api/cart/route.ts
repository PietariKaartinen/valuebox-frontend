import { NextRequest, NextResponse } from 'next/server';
import {
  createCart,
  addToCart,
  updateCart,
  removeFromCart,
  getCart,
  updateDiscountCodes,
} from '@/lib/shopify';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, cartId, lines, lineIds, discountCodes } = body;

    let cart;

    switch (action) {
      case 'create':
        cart = await createCart();
        break;
      case 'get':
        cart = await getCart(cartId);
        break;
      case 'add':
        cart = await addToCart(cartId, lines);
        break;
      case 'update':
        cart = await updateCart(cartId, lines);
        break;
      case 'remove':
        cart = await removeFromCart(cartId, lineIds);
        break;
      case 'updateDiscountCodes': {
        const result = await updateDiscountCodes(cartId, discountCodes || []);
        return NextResponse.json({
          cart: result.cart,
          userErrors: result.userErrors,
        });
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
