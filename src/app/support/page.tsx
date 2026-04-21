import type { Metadata } from 'next';
import SupportPageClient from './SupportPageClient';

export const metadata: Metadata = {
  title: 'Help & Support · ValueBox',
  description:
    'Find answers to common questions about orders, shipping, returns, membership, and more. Or contact the ValueBox support team directly.',
};

export default function SupportPage() {
  return <SupportPageClient />;
}
