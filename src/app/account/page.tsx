import type { Metadata } from 'next';
import AccountDashboardClient from './AccountDashboardClient';

export const metadata: Metadata = {
  title: 'My Account · ValueBox',
  description: 'Manage your ValueBox account, orders, and membership.',
  robots: { index: false },
};

export default function AccountPage() {
  return <AccountDashboardClient />;
}
