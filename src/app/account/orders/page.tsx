import type { Metadata } from 'next';
import OrdersPageClient from './OrdersPageClient';

export const metadata: Metadata = {
  title: 'My Orders · ValueBox',
  description: 'View your order history and track shipments.',
  robots: { index: false },
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
