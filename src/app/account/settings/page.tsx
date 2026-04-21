import type { Metadata } from 'next';
import SettingsPageClient from './SettingsPageClient';

export const metadata: Metadata = {
  title: 'Account Settings · ValueBox',
  description: 'Update your profile, email, and preferences.',
  robots: { index: false },
};

export default function SettingsPage() {
  return <SettingsPageClient />;
}
