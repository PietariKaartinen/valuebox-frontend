'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { User, Package, Gem, Settings, LogOut } from 'lucide-react';

const navItems = [
  { href: '/account', label: 'Dashboard', icon: User },
  { href: '/account/orders', label: 'Orders', icon: Package },
  { href: '/account/membership', label: 'Membership', icon: Gem },
  { href: '/account/settings', label: 'Settings', icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container-main py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/account'
                      ? pathname === '/account'
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-sky-50 text-sky-600 border-l-2 border-sky-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-t border-gray-100 border-l-2 border-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </aside>

            {/* Mobile tabs */}
            <div className="lg:hidden">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 flex overflow-x-auto scrollbar-hide">
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/account'
                      ? pathname === '/account'
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-sky-50 text-sky-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg whitespace-nowrap transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
