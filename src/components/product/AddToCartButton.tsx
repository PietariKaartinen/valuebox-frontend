'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartProvider';

interface AddToCartButtonProps {
  variantId: string;
  quantity?: number;
  variant?: 'link' | 'button' | 'full';
  className?: string;
  disabled?: boolean;
}

export default function AddToCartButton({
  variantId,
  quantity = 1,
  variant = 'link',
  className = '',
  disabled = false,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || disabled) return;

    setIsAdding(true);
    try {
      await addToCart(variantId, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (variant === 'link') {
    return (
      <button
        onClick={handleClick}
        disabled={isAdding || disabled}
        className={`text-accent hover:text-accent-dark text-sm font-medium transition-colors disabled:opacity-50 ${className}`}
      >
        {isAdding ? 'Adding...' : added ? '✓ Added' : 'Add to cart +'}
      </button>
    );
  }

  if (variant === 'full') {
    return (
      <button
        onClick={handleClick}
        disabled={isAdding || disabled}
        className={`btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 ${className}`}
      >
        {isAdding ? (
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : added ? (
          '✓ Added to Cart'
        ) : (
          'Add to Cart'
        )}
      </button>
    );
  }

  // button variant
  return (
    <button
      onClick={handleClick}
      disabled={isAdding || disabled}
      className={`btn-primary text-sm py-2 px-4 disabled:opacity-50 ${className}`}
    >
      {isAdding ? 'Adding...' : added ? '✓ Added' : 'Add to Cart'}
    </button>
  );
}
