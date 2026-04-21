'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { ShopifyCart } from '@/lib/shopify/types';
import { getCookie, setCookie } from '@/lib/utils';

interface DiscountCodeResult {
  success: boolean;
  applicable?: boolean;
  userErrors?: { field: string; message: string }[];
}

interface CartContextType {
  cart: ShopifyCart | null;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  isInitializing: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  clearCart: () => void;
  applyDiscountCode: (code: string) => Promise<DiscountCodeResult>;
  removeDiscountCodes: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  cartCount: 0,
  cartTotal: 0,
  isLoading: false,
  isInitializing: true,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: () => {},
  applyDiscountCode: async () => ({ success: false }),
  removeDiscountCodes: async () => {},
});

export function useCart() {
  return useContext(CartContext);
}

async function cartFetch(action: string, body: Record<string, unknown>): Promise<ShopifyCart> {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...body }),
  });
  if (!res.ok) throw new Error('Cart API error');
  return res.json();
}

async function cartFetchWithErrors(
  action: string,
  body: Record<string, unknown>
): Promise<{ cart: ShopifyCart; userErrors?: { field: string; message: string }[] }> {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...body }),
  });
  if (!res.ok) throw new Error('Cart API error');
  return res.json();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const cartCount = cart?.totalQuantity || 0;
  const cartTotal = cart ? parseFloat(cart.cost.totalAmount.amount) : 0;

  // Load cart on mount
  useEffect(() => {
    const cartId = getCookie('valuebox_cart_id');
    if (cartId) {
      cartFetch('get', { cartId })
        .then((data) => {
          if (data) setCart(data);
        })
        .catch(() => {
          // Cart might be expired, clear cookie
          setCookie('valuebox_cart_id', '', -1);
        })
        .finally(() => {
          setIsInitializing(false);
        });
    } else {
      setIsInitializing(false);
    }
  }, []);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart?.id) return cart.id;
    const newCart = await cartFetch('create', {});
    setCart(newCart);
    setCookie('valuebox_cart_id', newCart.id, 30);
    return newCart.id;
  }, [cart?.id]);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsLoading(true);
      try {
        const cartId = await ensureCart();
        const updatedCart = await cartFetch('add', {
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        });
        setCart(updatedCart);
        setCookie('valuebox_cart_id', updatedCart.id, 30);
      } finally {
        setIsLoading(false);
      }
    },
    [ensureCart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const updatedCart = await cartFetch('update', {
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        });
        setCart(updatedCart);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const updatedCart = await cartFetch('remove', {
          cartId: cart.id,
          lineIds: [lineId],
        });
        setCart(updatedCart);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const clearCart = useCallback(() => {
    setCart(null);
    setCookie('valuebox_cart_id', '', -1);
  }, []);

  const applyDiscountCode = useCallback(
    async (code: string): Promise<DiscountCodeResult> => {
      if (!cart?.id) return { success: false };
      setIsLoading(true);
      try {
        // Merge with existing codes
        const existingCodes = (cart.discountCodes || []).map((dc) => dc.code);
        const allCodes = Array.from(new Set([...existingCodes, code]));

        const result = await cartFetchWithErrors('updateDiscountCodes', {
          cartId: cart.id,
          discountCodes: allCodes,
        });

        if (result.userErrors && result.userErrors.length > 0) {
          return { success: false, userErrors: result.userErrors };
        }

        setCart(result.cart);

        // Check if the code is applicable
        const appliedCode = result.cart.discountCodes?.find(
          (dc) => dc.code.toUpperCase() === code.toUpperCase()
        );

        return {
          success: true,
          applicable: appliedCode?.applicable ?? false,
        };
      } catch {
        return { success: false, userErrors: [{ field: '', message: 'Failed to apply discount code. Please try again.' }] };
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id, cart?.discountCodes]
  );

  const removeDiscountCodes = useCallback(async () => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      const result = await cartFetchWithErrors('updateDiscountCodes', {
        cartId: cart.id,
        discountCodes: [],
      });
      setCart(result.cart);
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        isLoading,
        isInitializing,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyDiscountCode,
        removeDiscountCodes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
