import type { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Sign In · ValueBox',
  description:
    'Sign in to your ValueBox account to track orders and access member pricing.',
};

export default function LoginPage() {
  return <LoginPageClient />;
}
