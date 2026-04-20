'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCookie, setCookie } from '@/lib/utils';

export interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
}

export const SUPPORTED_COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
  { code: 'FR', name: 'France', currency: 'EUR', flag: '🇫🇷' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', currency: 'NOK', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', currency: 'DKK', flag: '🇩🇰' },
  { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', flag: '🇸🇬' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD', flag: '🇳🇿' },
  { code: 'IE', name: 'Ireland', currency: 'EUR', flag: '🇮🇪' },
  { code: 'FI', name: 'Finland', currency: 'EUR', flag: '🇫🇮' },
  { code: 'BE', name: 'Belgium', currency: 'EUR', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', currency: 'EUR', flag: '🇦🇹' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', flag: '🇨🇭' },
  { code: 'ES', name: 'Spain', currency: 'EUR', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', currency: 'EUR', flag: '🇮🇹' },
];

interface CountryCurrencyContextType {
  country: Country;
  setCountry: (country: Country) => void;
  isOpen: boolean;
  openSelector: () => void;
  closeSelector: () => void;
}

const CountryCurrencyContext = createContext<CountryCurrencyContextType>({
  country: SUPPORTED_COUNTRIES[0],
  setCountry: () => {},
  isOpen: false,
  openSelector: () => {},
  closeSelector: () => {},
});

export function CountryCurrencyProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<Country>(SUPPORTED_COUNTRIES[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Hydrate from cookie
    const savedCountryCode = getCookie('valuebox_country');
    if (savedCountryCode) {
      const found = SUPPORTED_COUNTRIES.find((c) => c.code === savedCountryCode);
      if (found) {
        setCountryState(found);
      }
    }
  }, []);

  const setCountry = useCallback((newCountry: Country) => {
    setCountryState(newCountry);
    setCookie('valuebox_country', newCountry.code, 365);
    setCookie('valuebox_currency', newCountry.currency, 365);
    setIsOpen(false);
  }, []);

  const openSelector = useCallback(() => setIsOpen(true), []);
  const closeSelector = useCallback(() => setIsOpen(false), []);

  return (
    <CountryCurrencyContext.Provider value={{ country, setCountry, isOpen, openSelector, closeSelector }}>
      {children}
    </CountryCurrencyContext.Provider>
  );
}

export function useCountryCurrency() {
  return useContext(CountryCurrencyContext);
}
