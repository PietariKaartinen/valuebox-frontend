'use client';

import { useState, useRef, useEffect } from 'react';
import { useRegion, REGIONS } from '@/contexts/CountryCurrencyProvider';
import type { Region } from '@/lib/constants/regions';

interface RegionSelectorProps {
  variant?: 'header' | 'footer';
}

export default function CountryCurrencySelector({ variant = 'header' }: RegionSelectorProps) {
  const { region, setRegion, currency } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const [currencyNote, setCurrencyNote] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSelect = (selected: Region) => {
    setRegion(selected.id);
    setIsOpen(false);

    // Show currency note for non-USD regions
    if (selected.currency !== 'USD') {
      setCurrencyNote(
        `Prices displayed in USD. Final price in ${selected.currency} will be shown at checkout.`
      );
      // Auto-dismiss after 5 seconds
      setTimeout(() => setCurrencyNote(null), 5000);
    } else {
      setCurrencyNote(null);
    }
  };

  const dropdownContent = (
    <div className="absolute z-50 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[220px]">
      {REGIONS.map((r) => (
        <button
          key={r.id}
          onClick={() => handleSelect(r)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
            r.id === region.id ? 'bg-accent/5' : ''
          }`}
        >
          <span className="text-lg">{r.flag}</span>
          <span className="flex-1 text-sm text-gray-900">{r.label}</span>
          <span className="text-xs text-gray-500 font-medium">{r.currency}</span>
          {r.id === region.id && (
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );

  if (variant === 'footer') {
    return (
      <div className="relative" ref={dropdownRef}>
        <span className="text-gray-400 text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="text-lg">{region.flag}</span>
          {region.label} · {currency}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sky-600 hover:underline text-xs ml-1"
          >
            Change
          </button>
        </span>
        {isOpen && dropdownContent}

        {/* Currency note toast */}
        {currencyNote && (
          <div className="absolute bottom-full left-0 mb-2 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 max-w-[280px] shadow-lg">
            {currencyNote}
          </div>
        )}
      </div>
    );
  }

  // Header variant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-white transition-colors"
      >
        <span className="text-base">{region.flag}</span>
        <span>Deliver to <strong className="text-white">{region.label}</strong> · {currency}</span>
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && dropdownContent}

      {/* Currency note toast */}
      {currencyNote && (
        <div className="absolute top-full left-0 mt-1 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 max-w-[280px] shadow-lg z-50">
          {currencyNote}
        </div>
      )}
    </div>
  );
}
