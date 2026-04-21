'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCookie, setCookie } from '@/lib/utils';
import { REGIONS, DEFAULT_REGION, getRegionById, type Region, type RegionId } from '@/lib/constants/regions';

interface RegionContextType {
  region: Region;
  setRegion: (id: RegionId) => void;
  currency: string;
  currencySymbol: string;
  isOpen: boolean;
  openSelector: () => void;
  closeSelector: () => void;
}

const RegionContext = createContext<RegionContextType>({
  region: DEFAULT_REGION,
  setRegion: () => {},
  currency: DEFAULT_REGION.currency,
  currencySymbol: DEFAULT_REGION.symbol,
  isOpen: false,
  openSelector: () => {},
  closeSelector: () => {},
});

export function CountryCurrencyProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>(DEFAULT_REGION);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Hydrate from cookie
    const savedRegionId = getCookie('valuebox_region');
    if (savedRegionId) {
      const found = getRegionById(savedRegionId);
      setRegionState(found);
    }
  }, []);

  const setRegion = useCallback((id: RegionId) => {
    const found = getRegionById(id);
    setRegionState(found);
    setCookie('valuebox_region', found.id, 365);
    setCookie('valuebox_currency', found.currency, 365);
    setIsOpen(false);
  }, []);

  const openSelector = useCallback(() => setIsOpen(true), []);
  const closeSelector = useCallback(() => setIsOpen(false), []);

  return (
    <RegionContext.Provider
      value={{
        region,
        setRegion,
        currency: region.currency,
        currencySymbol: region.symbol,
        isOpen,
        openSelector,
        closeSelector,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export { REGIONS };
export type { Region, RegionId };

export function useRegion() {
  return useContext(RegionContext);
}

// Backward-compatible alias
export const useCountryCurrency = useRegion;
