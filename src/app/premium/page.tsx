import type { Metadata } from 'next';
import PremiumPageClient from './PremiumPageClient';

export const metadata: Metadata = {
  title: 'ValueBox+ · Save More Every Order',
  description:
    'Join ValueBox+ for member pricing up to 20% off, monthly giveaways, streaming access, and VIP support. Try free for 30 days.',
};

export default function PremiumPage() {
  return <PremiumPageClient />;
}
