'use client';

import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthProvider';
import { Lock, Check } from 'lucide-react';

interface PriceDisplayProps {
  price: number;
  compareAtPrice: number | null;
  memberPrice?: number | null;
  currencyCode?: string;
  size?: 'sm' | 'md' | 'lg';
  showMemberPrice?: boolean;
}

export default function PriceDisplay({
  price,
  compareAtPrice,
  memberPrice,
  currencyCode = 'USD',
  size = 'md',
  showMemberPrice = true,
}: PriceDisplayProps) {
  const { isMember } = useAuth();

  const sizeClasses = {
    sm: { price: 'text-sm font-bold', compare: 'text-xs', member: 'text-xs' },
    md: { price: 'text-base font-bold', compare: 'text-sm', member: 'text-xs' },
    lg: { price: 'text-2xl font-bold', compare: 'text-lg', member: 'text-sm' },
  };

  const classes = sizeClasses[size];

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className={`${classes.price} text-gray-900`}>
          {formatPrice(price, currencyCode)}
        </span>
        {compareAtPrice && (
          <span className={`${classes.compare} text-gray-400 line-through`}>
            {formatPrice(compareAtPrice, currencyCode)}
          </span>
        )}
      </div>
      {showMemberPrice && memberPrice && (
        <div className={`${classes.member} mt-0.5 flex items-center gap-1`}>
          {isMember ? (
            <>
              <Check className="w-3 h-3 text-green-600" />
              <span className="text-green-600 font-medium">
                Your price: {formatPrice(memberPrice, currencyCode)}
              </span>
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 text-amber-600" />
              <span className="text-amber-600">
                Members: {formatPrice(memberPrice, currencyCode)}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
