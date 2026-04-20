'use client';

import { useState, useRef, useEffect } from 'react';
import { useCountryCurrency, SUPPORTED_COUNTRIES, type Country } from '@/contexts/CountryCurrencyProvider';

interface CountryCurrencySelectorProps {
  variant?: 'header' | 'footer';
}

export default function CountryCurrencySelector({ variant = 'header' }: CountryCurrencySelectorProps) {
  const { country, setCountry, isOpen, openSelector, closeSelector } = useCountryCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeSelector();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when opened
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeSelector]);

  const filteredCountries = SUPPORTED_COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (selected: Country) => {
    setCountry(selected);
    setSearchQuery('');
  };

  if (variant === 'footer') {
    return (
      <span className="text-gray-400 text-sm flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
        <span className="text-lg">{country.flag}</span>
        {country.name} · {country.currency}
        <button
          onClick={openSelector}
          className="text-sky-600 hover:underline text-xs ml-1"
        >
          Change
        </button>
        {isOpen && (
          <SelectorDropdown
            dropdownRef={dropdownRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchInputRef={searchInputRef}
            filteredCountries={filteredCountries}
            handleSelect={handleSelect}
            country={country}
            closeSelector={closeSelector}
          />
        )}
      </span>
    );
  }

  // Header variant
  return (
    <div className="relative">
      <button
        onClick={isOpen ? closeSelector : openSelector}
        className="flex items-center gap-1 hover:text-white transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
        <span>Deliver to <strong className="text-white">{country.name}</strong> - {country.currency}</span>
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <SelectorDropdown
          dropdownRef={dropdownRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchInputRef={searchInputRef}
          filteredCountries={filteredCountries}
          handleSelect={handleSelect}
          country={country}
          closeSelector={closeSelector}
        />
      )}
    </div>
  );
}

function SelectorDropdown({
  dropdownRef,
  searchQuery,
  setSearchQuery,
  searchInputRef,
  filteredCountries,
  handleSelect,
  country,
  closeSelector,
}: {
  dropdownRef: React.RefObject<HTMLDivElement>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  filteredCountries: Country[];
  handleSelect: (c: Country) => void;
  country: Country;
  closeSelector: () => void;
}) {
  return (
    <div
      ref={dropdownRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSelector();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Select your location</h3>
          <button
            onClick={closeSelector}
            className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search country or currency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-gray-900"
          />
        </div>

        {/* Country list */}
        <div className="max-h-64 overflow-y-auto">
          {filteredCountries.map((c) => (
            <button
              key={c.code}
              onClick={() => handleSelect(c)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                c.code === country.code ? 'bg-accent/5 border-l-2 border-accent' : ''
              }`}
            >
              <span className="text-xl">{c.flag}</span>
              <span className="flex-1 text-sm text-gray-900">{c.name}</span>
              <span className="text-xs text-gray-500 font-medium">{c.currency}</span>
              {c.code === country.code && (
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Note */}
        <div className="p-3 bg-gray-50 border-t border-gray-100">
          <p className="text-[11px] text-gray-500 text-center">
            Prices shown in store currency. Local currency at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
