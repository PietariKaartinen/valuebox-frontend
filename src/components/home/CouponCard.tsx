'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Coupon } from '@/lib/shopify/coupon-types';
import { formatPrice } from '@/lib/utils';

function isExpiringSoon(expiryDate: string): boolean {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 3;
}

function formatExpiryDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mt-auto">
      <span className="font-mono text-sm font-bold text-gray-800 flex-1 tracking-wide">
        {code}
      </span>
      <button
        onClick={copyCode}
        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors shrink-0"
        style={{
          color: copied ? '#16a34a' : '#6b7280',
        }}
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}

function Badge({ text, bgColor }: { text: string; bgColor: string }) {
  return (
    <span
      className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white uppercase tracking-wider shrink-0"
      style={{ backgroundColor: bgColor }}
    >
      {text}
    </span>
  );
}

function ExpiryText({ expiryDate }: { expiryDate: string }) {
  const expiringSoon = isExpiringSoon(expiryDate);
  return (
    <span
      className={`text-[11px] whitespace-nowrap ${
        expiringSoon ? 'text-red-600 font-semibold' : 'text-gray-400'
      }`}
    >
      {expiringSoon ? '⏰ ' : ''}Exp. {formatExpiryDate(expiryDate)}
    </span>
  );
}

/** Top row shared by both card types: badge on the left, expiry/shop-link on the right */
function TopRow({
  bgColor,
  badgeText,
  expiryDate,
  shopLink,
}: {
  bgColor: string;
  badgeText?: string;
  expiryDate?: string;
  shopLink?: { href: string };
}) {
  const hasRight = !!expiryDate || !!shopLink;
  const hasLeft = !!badgeText;

  if (!hasLeft && !hasRight) return null;

  return (
    <div className="flex items-center justify-between gap-2 mb-2 min-h-[20px]">
      <div className="flex items-center gap-1.5">
        {badgeText && <Badge text={badgeText} bgColor={bgColor} />}
      </div>
      <div className="flex items-center gap-2">
        {expiryDate && <ExpiryText expiryDate={expiryDate} />}
        {shopLink && (
          <Link
            href={shopLink.href}
            className="text-[11px] font-semibold hover:underline transition-colors whitespace-nowrap"
            style={{ color: bgColor }}
          >
            Shop →
          </Link>
        )}
      </div>
    </div>
  );
}

function GeneralCouponCard({ coupon }: { coupon: Coupon & { couponType: 'general' } }) {
  const bgColor = coupon.backgroundColor || '#0EA5E9';

  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[330px] bg-white rounded-xl rounded-l-none border-2 border-dashed border-gray-300 shadow-sm flex overflow-hidden"
      style={{ minHeight: '200px' }}
    >
      {/* Perforated left edge */}
      <div
        className="w-3 shrink-0"
        style={{
          borderRight: `3px dashed ${bgColor}`,
          background: `radial-gradient(circle at 0 50%, transparent 5px, ${bgColor}10 5px) 0 0 / 6px 16px repeat-y`,
        }}
      />

      {/* Card content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Top row: badge + expiry */}
        <TopRow
          bgColor={bgColor}
          badgeText={coupon.badgeText}
          expiryDate={coupon.expiryDate}
        />

        {/* Discount value - big and bold */}
        <p
          className="text-2xl font-extrabold leading-tight mb-1"
          style={{ color: bgColor }}
        >
          {coupon.discountValue}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
          {coupon.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-1 leading-relaxed">
          {coupon.description}
        </p>

        {/* Min purchase */}
        {coupon.minPurchase && (
          <p className="text-[11px] text-gray-400 mb-2">
            {coupon.minPurchase}
          </p>
        )}

        {/* Spacer to push code box to bottom */}
        <div className="flex-1" />

        {/* Code box — always at the bottom */}
        <CopyButton code={coupon.code} />
      </div>
    </div>
  );
}

function ProductCouponCard({ coupon }: { coupon: Coupon & { couponType: 'product' } }) {
  const bgColor = coupon.backgroundColor || '#0EA5E9';

  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[330px] bg-white rounded-xl rounded-l-none border-2 border-dashed border-gray-300 shadow-sm flex overflow-hidden"
      style={{ minHeight: '200px' }}
    >
      {/* Perforated left edge */}
      <div
        className="w-3 shrink-0"
        style={{
          borderRight: `3px dashed ${bgColor}`,
          background: `radial-gradient(circle at 0 50%, transparent 5px, ${bgColor}10 5px) 0 0 / 6px 16px repeat-y`,
        }}
      />

      {/* Card content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Top row: badge + expiry + shop link */}
        <TopRow
          bgColor={bgColor}
          badgeText={coupon.badgeText}
          expiryDate={coupon.expiryDate}
          shopLink={{ href: `/products/${coupon.productHandle}` }}
        />

        {/* Product section: image + discount info side by side */}
        <div className="flex gap-3 mb-2">
          {/* Product image */}
          <div className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src={coupon.productImageUrl}
              alt={coupon.productImageAlt}
              width={90}
              height={90}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Discount + title */}
          <div className="flex-1 min-w-0">
            {/* Discount value - big and bold */}
            <p
              className="text-xl font-extrabold leading-tight mb-0.5"
              style={{ color: bgColor }}
            >
              {coupon.discountValue}
            </p>

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-900 mb-0.5 line-clamp-2">
              {coupon.title}
            </h3>

            {/* Product price */}
            <p className="text-xs text-gray-500">
              Was {formatPrice(parseFloat(coupon.productPrice), coupon.productCurrency)}
            </p>
          </div>
        </div>

        {/* Min purchase */}
        {coupon.minPurchase && (
          <p className="text-[11px] text-gray-400 mb-1">
            {coupon.minPurchase}
          </p>
        )}

        {/* Spacer to push code box to bottom */}
        <div className="flex-1" />

        {/* Code box — always at the bottom */}
        <CopyButton code={coupon.code} />
      </div>
    </div>
  );
}

export default function CouponCard({ coupon }: { coupon: Coupon }) {
  if (coupon.couponType === 'product') {
    return <ProductCouponCard coupon={coupon} />;
  }
  return <GeneralCouponCard coupon={coupon} />;
}
