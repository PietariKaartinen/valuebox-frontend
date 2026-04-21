import type { Metadata } from 'next';
import SignupPageClient from './SignupPageClient';

export const metadata: Metadata = {
  title: 'Create Account · ValueBox',
  description:
    'Join ValueBox for free. Track orders, save favorites, and unlock ValueBox+ member pricing.',
};

export default function SignupPage() {
  return <SignupPageClient />;
}
