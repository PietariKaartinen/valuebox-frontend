import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartProvider';
import { CountryCurrencyProvider } from '@/contexts/CountryCurrencyProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'ValueBox — Millions of Products, Unbeatable Prices',
    template: '%s | ValueBox',
  },
  description:
    'Shop millions of products at unbeatable prices. Join ValueBox+ for exclusive member pricing, giveaways, and premium benefits.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://valuebox.com'),
  openGraph: {
    type: 'website',
    siteName: 'ValueBox',
    title: 'ValueBox — Millions of Products, Unbeatable Prices',
    description:
      'Shop millions of products at unbeatable prices. Join ValueBox+ for exclusive member pricing, giveaways, and premium benefits.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <CountryCurrencyProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </CountryCurrencyProvider>
      </body>
    </html>
  );
}
