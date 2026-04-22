import { MAIN_CATEGORIES, SPECIAL_COLLECTIONS, SUBCATEGORIES } from './constants';

export function formatPrice(amount: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Build a comprehensive handle → title lookup at module load time
const HANDLE_TITLE_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const cat of MAIN_CATEGORIES) {
    map[cat.handle] = cat.title;
    for (const sub of SUBCATEGORIES[cat.handle] || []) {
      map[sub.handle] = sub.title;
    }
  }
  for (const col of SPECIAL_COLLECTIONS) {
    map[col.handle] = col.title;
  }
  return map;
})();

export function getCollectionTitle(handle: string): string {
  if (HANDLE_TITLE_MAP[handle]) return HANDLE_TITLE_MAP[handle];
  // Fallback for unknown handles — keep existing behavior
  return handle
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
  return null;
}

export function setCookie(name: string, value: string, days: number = 30): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}
