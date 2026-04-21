'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import AccountLayout from '@/components/account/AccountLayout';
import { Loader2, Check } from 'lucide-react';

export default function SettingsPageClient() {
  const { customer, updateCustomer } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [marketingSaving, setMarketingSaving] = useState(false);

  // Populate form from customer data
  useEffect(() => {
    if (customer) {
      setFirstName(customer.firstName || '');
      setLastName(customer.lastName || '');
      setEmail(customer.email || '');
      setPhone(customer.phone || '');
      setAcceptsMarketing(customer.acceptsMarketing || false);
    }
  }, [customer]);

  if (!customer) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    const result = await updateCustomer({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
    });

    if (result.error) {
      setSaveError(result.error);
    } else {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setIsSaving(false);
  };

  const handleMarketingToggle = async () => {
    setMarketingSaving(true);
    const newValue = !acceptsMarketing;
    setAcceptsMarketing(newValue);
    await updateCustomer({ acceptsMarketing: newValue });
    setMarketingSaving(false);
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

        {/* Profile section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Profile Information</h2>

          {saveError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700">{saveError}</p>
            </div>
          )}

          {saveSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">Changes saved successfully.</p>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-sky-500 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-sky-500 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-sky-500 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-sky-500 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-sm disabled:opacity-60 flex items-center gap-2 text-sm"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>

        {/* Password section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-2">Password</h2>
          <p className="text-sm text-gray-500">
            To change your password, use the forgot password link on the{' '}
            <a href="/login" className="text-sky-500 hover:underline">
              sign-in page
            </a>
            .
          </p>
          {/* The Storefront API doesn't support direct password changes. */}
        </div>

        {/* Marketing preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Email Preferences</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={acceptsMarketing}
                onChange={handleMarketingToggle}
                disabled={marketingSaving}
                className="sr-only"
              />
              <div
                className={`w-10 h-6 rounded-full transition-colors ${
                  acceptsMarketing ? 'bg-sky-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    acceptsMarketing ? 'translate-x-[18px]' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
            <span className="text-sm text-gray-700">
              Receive deals and updates via email
            </span>
            {marketingSaving && <Loader2 className="w-3 h-3 animate-spin text-gray-400" />}
          </label>
        </div>
      </div>
    </AccountLayout>
  );
}
