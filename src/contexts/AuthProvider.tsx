'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { ShopifyCustomer, SignupInput } from '@/lib/shopify/customer-types';

interface AuthState {
  customer: ShopifyCustomer | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isMember: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (input: SignupInput) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
  updateCustomer: (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthState>({
  customer: null,
  accessToken: null,
  isAuthenticated: false,
  isMember: false,
  isLoading: true,
  login: async () => ({}),
  signup: async () => ({}),
  logout: async () => {},
  refreshCustomer: async () => {},
  updateCustomer: async () => ({}),
});

export function useAuth() {
  return useContext(AuthContext);
}

async function authFetch(body: Record<string, unknown>) {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

function checkIsMember(customer: ShopifyCustomer | null): boolean {
  if (!customer?.tags) return false;
  return customer.tags.includes('valuebox-plus');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!customer;
  const isMember = checkIsMember(customer);

  // Hydrate auth state on mount
  useEffect(() => {
    authFetch({ action: 'me' })
      .then((data) => {
        if (data.customer) {
          setCustomer(data.customer);
          setAccessToken(data.accessToken || null);
        }
      })
      .catch(() => {
        // Not authenticated, that's fine
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await authFetch({ action: 'login', email, password });
      setCustomer(data.customer);
      setAccessToken(data.accessToken || null);
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Invalid email or password' };
    }
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    try {
      const data = await authFetch({
        action: 'signup',
        ...input,
      });
      setCustomer(data.customer);
      setAccessToken(data.accessToken || null);
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to create account' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authFetch({ action: 'logout' });
    } catch {
      // Ignore errors on logout
    }
    setCustomer(null);
    setAccessToken(null);
  }, []);

  const refreshCustomer = useCallback(async () => {
    try {
      const data = await authFetch({ action: 'me' });
      if (data.customer) {
        setCustomer(data.customer);
        setAccessToken(data.accessToken || null);
      } else {
        setCustomer(null);
        setAccessToken(null);
      }
    } catch {
      setCustomer(null);
      setAccessToken(null);
    }
  }, []);

  const updateCustomer = useCallback(
    async (customerData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      acceptsMarketing?: boolean;
    }) => {
      try {
        const data = await authFetch({ action: 'update', customerData });
        if (data.customer) {
          setCustomer(data.customer);
        }
        return {};
      } catch (err) {
        return { error: err instanceof Error ? err.message : 'Failed to update profile' };
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        customer,
        accessToken,
        isAuthenticated,
        isMember,
        isLoading,
        login,
        signup,
        logout,
        refreshCustomer,
        updateCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
