import type { Metadata } from 'next';
import MembershipPageClient from './MembershipPageClient';

export const metadata: Metadata = {
  title: 'ValueBox+ Membership · ValueBox',
  description: 'Manage your ValueBox+ membership benefits and subscription.',
  robots: { index: false },
};

export default function MembershipPage() {
  return <MembershipPageClient />;
}
