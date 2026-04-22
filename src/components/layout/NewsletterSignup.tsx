'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NewsletterSignupProps {
  variant?: 'footer' | 'inline';
}

export default function NewsletterSignup({ variant = 'footer' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      if (data.alreadySubscribed) {
        setStatus('already');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-400">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">You&apos;re subscribed! Check your inbox for exclusive deals.</span>
      </div>
    );
  }

  if (status === 'already') {
    return (
      <div className="flex items-center gap-2 text-green-400">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">You&apos;re already on our list! Stay tuned for great deals.</span>
      </div>
    );
  }

  return (
    <div className={variant === 'footer' ? 'flex-1 max-w-md w-full' : 'w-full max-w-md'}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          className="flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-gray-900"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">{errorMessage}</p>
      )}
      <div className="flex items-center gap-2 mt-2">
        <input type="checkbox" id="member-checkbox" className="rounded" />
        <label htmlFor="member-checkbox" className="text-gray-400 text-xs">
          I&apos;m a ValueBox+ member
        </label>
      </div>
      <p className="text-gray-500 text-xs mt-1">
        Unsubscribe anytime. By subscribing, you agree to our{' '}
        <Link href="/support" className="underline hover:text-gray-300">Privacy Policy</Link>.
      </p>
    </div>
  );
}
