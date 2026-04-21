export const REGIONS = [
  {
    id: "us",
    label: "United States",
    flag: "🇺🇸",
    currency: "USD",
    symbol: "$",
  },
  {
    id: "eu",
    label: "European Union",
    flag: "🇪🇺",
    currency: "EUR",
    symbol: "€",
  },
  {
    id: "uk",
    label: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
  },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];
export type Region = (typeof REGIONS)[number];

export const DEFAULT_REGION: Region = REGIONS[0]; // United States

export function getRegionById(id: string): Region {
  return REGIONS.find((r) => r.id === id) || DEFAULT_REGION;
}
