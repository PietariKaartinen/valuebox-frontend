'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Loader2, Mail, Clock, Gem } from 'lucide-react';

/* ─────────────────────────── FAQ DATA ─────────────────────────── */

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQCategory {
  label: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    label: 'Orders & Shipping',
    items: [
      {
        question: 'How long does delivery take?',
        answer: (
          <>
            <p className="mb-2">We offer two shipping options to the US, EU, and UK:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>
                <strong>Standard Shipping ($0.99):</strong> Typically 7–14 business days depending on your location. Free on orders over $50.
              </li>
              <li>
                <strong>Priority Shipping ($3.99):</strong> Typically 3–7 business days. Free on orders over $99.
              </li>
            </ul>
            <p>
              Once your order ships, you&apos;ll receive a confirmation email with your tracking number. Please allow 1–2 business days for tracking to update after dispatch.
            </p>
          </>
        ),
      },
      {
        question: 'How do I track my order?',
        answer: (
          <p>
            You&apos;ll receive a shipping confirmation email with a tracking link as soon as your order leaves our warehouse. You can also view your order status by signing in to your account and visiting{' '}
            <Link href="/account/orders" className="text-accent hover:underline">
              My Orders
            </Link>
            . If you checked out as a guest, use the tracking link in your shipping confirmation email.
          </p>
        ),
      },
      {
        question: 'Can I change or cancel my order after placing it?',
        answer: (
          <p>
            We begin processing orders quickly, so changes and cancellations are only possible within 1 hour of placing your order. Contact us at{' '}
            <a href="mailto:support@valuebox.io" className="text-accent hover:underline">
              support@valuebox.io
            </a>{' '}
            as soon as possible with your order number and we&apos;ll do our best to help. Once an order has been dispatched, it cannot be cancelled or modified.
          </p>
        ),
      },
      {
        question: "My order says delivered but I haven't received it. What do I do?",
        answer: (
          <p>
            First, check with neighbours or in any secure locations around your property. If it&apos;s still missing, wait 24 hours — occasionally carriers mark packages as delivered slightly early. If it still hasn&apos;t arrived after 24 hours, contact us at{' '}
            <a href="mailto:support@valuebox.io" className="text-accent hover:underline">
              support@valuebox.io
            </a>{' '}
            with your order number and we&apos;ll investigate with the carrier and arrange a resolution.
          </p>
        ),
      },
      {
        question: 'Do you ship to my country?',
        answer: (
          <p>
            We currently ship to the United States, European Union member states, and the United Kingdom. If your country isn&apos;t listed at checkout, we don&apos;t currently serve that region but are working on expanding. Sign up for our newsletter to be notified when we launch in new countries.
          </p>
        ),
      },
      {
        question: 'Why has my order been split into multiple shipments?',
        answer: (
          <p>
            Some orders containing items from different suppliers are shipped separately. You&apos;ll receive a separate tracking number for each shipment. Your full order total is charged once — there are no additional shipping fees for split shipments.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Returns & Refunds',
    items: [
      {
        question: 'What is your return policy?',
        answer: (
          <p>
            We offer a 30-day return policy from the date you receive your order. Items must be unused, in their original condition, and in original packaging. Some items are non-returnable for hygiene reasons (e.g. personal care items where packaging has been opened). See our full returns policy at{' '}
            <Link href="/legal/returns" className="text-accent hover:underline">
              valuebox.io/legal/returns
            </Link>
            .
          </p>
        ),
      },
      {
        question: 'How do I start a return?',
        answer: (
          <p>
            Email{' '}
            <a href="mailto:support@valuebox.io" className="text-accent hover:underline">
              support@valuebox.io
            </a>{' '}
            with your order number and the reason for your return. We&apos;ll send you a return authorisation and instructions within 24 hours. Do not send items back without a return authorisation — we may not be able to process refunds for unauthorised returns.
          </p>
        ),
      },
      {
        question: 'How long do refunds take?',
        answer: (
          <p>
            Once we receive and inspect your returned item, we&apos;ll process your refund within 3–5 business days. The refund will be returned to your original payment method. Depending on your bank, it may take a further 3–10 business days to appear on your statement.
          </p>
        ),
      },
      {
        question: 'My item arrived damaged or faulty. What do I do?',
        answer: (
          <p>
            We&apos;re sorry to hear that. Email us at{' '}
            <a href="mailto:support@valuebox.io" className="text-accent hover:underline">
              support@valuebox.io
            </a>{' '}
            within 7 days of receiving your order with photos of the damage and your order number. We&apos;ll arrange a replacement or full refund promptly — you won&apos;t need to return the item in most cases.
          </p>
        ),
      },
      {
        question: 'Can I exchange an item instead of getting a refund?',
        answer: (
          <p>
            We don&apos;t currently offer direct exchanges. If you&apos;d like a different item, return the original for a refund and place a new order. This ensures you get the fastest resolution.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Membership (ValueBox+)',
    items: [
      {
        question: 'What is ValueBox+?',
        answer: (
          <p>
            ValueBox+ is our optional membership programme that gives you access to member pricing on eligible products (saving up to 20%), exclusive monthly giveaways, streaming access, and priority customer support. Shopping without a membership is always free — ValueBox+ is an add-on for those who want to save more.
          </p>
        ),
      },
      {
        question: 'How does member pricing work?',
        answer: (
          <p>
            When you&apos;re signed in as a ValueBox+ member, eligible products display your member price alongside the regular price. Member savings are calculated individually per product and shown on each product page and at checkout. Savings vary by product — some items are not eligible for member pricing (e.g. gift cards and certain brand-restricted products).
          </p>
        ),
      },
      {
        question: 'How much does ValueBox+ cost?',
        answer: (
          <>
            <p className="mb-2">ValueBox+ is available on two plans:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>
                <strong>Monthly:</strong> $9.99/month, billed monthly, cancel anytime
              </li>
              <li>
                <strong>Annual:</strong> $79.99/year (saving $39.89 compared to monthly), billed annually
              </li>
            </ul>
            <p>
              Both plans start with a 30-day free trial. Visit{' '}
              <Link href="/premium" className="text-accent hover:underline">
                valuebox.io/premium
              </Link>{' '}
              to sign up.
            </p>
          </>
        ),
      },
      {
        question: 'Is there a free trial?',
        answer: (
          <p>
            Yes — all new ValueBox+ subscriptions include a 30-day free trial. You can cancel at any time during the trial with no charge.
          </p>
        ),
      },
      {
        question: 'How do I cancel my membership?',
        answer: (
          <p>
            You can manage and cancel your membership from{' '}
            <Link href="/account/membership" className="text-accent hover:underline">
              My Account &rarr; Membership
            </Link>{' '}
            at any time. Cancellation takes effect at the end of your current billing period — you&apos;ll continue to have access to member benefits until then. We don&apos;t charge cancellation fees.
          </p>
        ),
      },
      {
        question: 'What items are excluded from member pricing?',
        answer: (
          <p>
            Member pricing is not available on gift cards or products with manufacturer price restrictions (MAP). These exclusions are noted on individual product pages.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Payments & Pricing',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: (
          <p>
            We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and PayPal. All payments are processed securely through Shopify Payments, powered by Stripe. We never store your full card details.
          </p>
        ),
      },
      {
        question: 'Is it safe to pay on ValueBox?',
        answer: (
          <p>
            Yes. All transactions are SSL-encrypted and processed via Shopify Payments (PCI DSS compliant). You&apos;ll see the padlock icon in your browser and our checkout URL will begin with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">https://</code>. For extra peace of mind, use Apple Pay or Google Pay for tokenised payments that don&apos;t share your card number with us.
          </p>
        ),
      },
      {
        question: 'Why was my payment declined?',
        answer: (
          <p>
            Payments can be declined for several reasons: incorrect card details, insufficient funds, your bank blocking the transaction, or a billing address mismatch. Try the following: double-check your card details, ensure your billing address matches your card records, or contact your bank to authorise the transaction. If the issue persists, try a different payment method or contact us at{' '}
            <a href="mailto:support@valuebox.io" className="text-accent hover:underline">
              support@valuebox.io
            </a>
            .
          </p>
        ),
      },
      {
        question: 'Can I use a discount code and member pricing together?',
        answer: (
          <p>
            Discount codes and member pricing cannot typically be combined on the same order. Discount codes will be applied at checkout, and member pricing is applied automatically for eligible items. If you have both available, use whichever gives you the greater saving.
          </p>
        ),
      },
      {
        question: 'The price changed between adding to cart and checking out. Why?',
        answer: (
          <p>
            Prices on ValueBox can change due to promotions ending, stock fluctuations, or exchange rate changes if you&apos;re shopping in a non-USD currency. The final price charged is always the price shown at checkout confirmation before you click &ldquo;Place Order.&rdquo;
          </p>
        ),
      },
      {
        question: 'Do you charge VAT or sales tax?',
        answer: (
          <p>
            Sales tax (US) and VAT (EU/UK) may be added at checkout depending on your shipping destination and local tax regulations. The tax amount will be displayed before you confirm your order. Prices shown on product pages may or may not include tax depending on your region.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Account & Security',
    items: [
      {
        question: 'How do I create an account?',
        answer: (
          <p>
            Click &ldquo;Sign In&rdquo; in the top right of any page, then select &ldquo;Create Account.&rdquo; You&apos;ll need your name, email address, and a password (minimum 8 characters). Account creation is free and gives you access to order history, saved addresses, and the ability to sign up for ValueBox+.
          </p>
        ),
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer: (
          <p>
            On the{' '}
            <Link href="/login" className="text-accent hover:underline">
              sign-in page
            </Link>
            , click &ldquo;Forgot password?&rdquo; and enter your email address. We&apos;ll send you a password reset link within a few minutes. Check your spam folder if you don&apos;t see it. The reset link expires after 24 hours — request a new one if needed.
          </p>
        ),
      },
      {
        question: 'How do I update my email address or personal details?',
        answer: (
          <p>
            Sign in and go to{' '}
            <Link href="/account/settings" className="text-accent hover:underline">
              Account Settings
            </Link>
            . You can update your name, email, and phone number there. Changes take effect immediately.
          </p>
        ),
      },
      {
        question: 'How is my personal data used?',
        answer: (
          <p>
            We collect only the data necessary to process your orders and provide our service. We never sell your personal data to third parties. For full details, see our{' '}
            <Link href="/legal/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
            . You can request deletion of your account and data by contacting{' '}
            <a href="mailto:support@valuebox.io" className="text-accent hover:underline">
              support@valuebox.io
            </a>
            .
          </p>
        ),
      },
      {
        question: 'I think my account has been compromised. What should I do?',
        answer: (
          <p>
            Change your password immediately via{' '}
            <Link href="/account/settings" className="text-accent hover:underline">
              Account Settings
            </Link>{' '}
            or use the &ldquo;Forgot password?&rdquo; link on the sign-in page. Then contact us at{' '}
            <a href="mailto:support@valuebox.io" className="text-accent hover:underline">
              support@valuebox.io
            </a>{' '}
            so we can review any suspicious activity on your account. We recommend using a unique, strong password for your ValueBox account.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Giveaways',
    items: [
      {
        question: 'How do member giveaways work?',
        answer: (
          <p>
            ValueBox+ members are automatically entered into monthly prize draws. There&apos;s nothing to &ldquo;do&rdquo; to enter — as long as your membership is active and you&apos;re eligible, you&apos;re in. Winners are selected at random and notified by email.
          </p>
        ),
      },
      {
        question: 'Who is eligible for giveaways?',
        answer: (
          <p>
            Giveaways are open to ValueBox+ members who are residents of the United States and 18 years of age or older. No purchase is necessary to be eligible. See our{' '}
            <Link href="/legal/giveaway-rules" className="text-accent hover:underline">
              Giveaway Rules
            </Link>{' '}
            for full eligibility details.
          </p>
        ),
      },
      {
        question: 'Are giveaways available outside the US?',
        answer: (
          <p>
            Currently, giveaways are only open to US residents due to legal and logistical requirements. We hope to expand giveaway eligibility to the EU and UK in the future.
          </p>
        ),
      },
      {
        question: 'What prizes are up for grabs?',
        answer: (
          <p>
            Prizes change every month and are announced to members via email and in the membership area of your account. Past prizes have included gift cards, tech products, and cash prizes. The monthly prize pool is $10,000+.
          </p>
        ),
      },
      {
        question: 'What happens if I win?',
        answer: (
          <p>
            Winners are notified by the email address on their ValueBox account. You&apos;ll have 14 days to claim your prize by responding to the notification email. Unclaimed prizes are forfeited and a new winner may be selected.
          </p>
        ),
      },
      {
        question: 'Is there a limit to how many times I can win?',
        answer: (
          <p>
            Each member can win a maximum of once per rolling 12-month period to ensure fair distribution among the membership. If you&apos;ve already won in the past 12 months, you&apos;ll be automatically excluded from that month&apos;s draw.
          </p>
        ),
      },
    ],
  },
];

/* ─────────────────────── SUBJECT OPTIONS ─────────────────────── */

const subjectOptions = [
  'Order Issue',
  'Shipping & Delivery',
  'Return or Refund',
  'Payment Problem',
  'Membership / ValueBox+',
  'Account & Login',
  'Giveaway Enquiry',
  'Other',
];

/* ─────────────────── ACCORDION ITEM COMPONENT ─────────────────── */

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4">
          <div className="text-sm text-gray-600 leading-relaxed">{answer}</div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── MAIN SUPPORT PAGE ─────────────────── */

export default function SupportPageClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    orderNumber: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setOpenAccordion(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject) errors.subject = 'Please select a subject.';
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    } else if (formData.message.trim().length < 20) {
      errors.message = 'Message must be at least 20 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('loading');
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          category: formData.subject,
          orderNumber: formData.orderNumber.trim() || undefined,
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) throw new Error('Failed');

      setSubmittedName(formData.name.trim());
      setSubmittedEmail(formData.email.trim());
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', orderNumber: '', message: '' });
    setFormErrors({});
    setFormStatus('idle');
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* ──────── Section 1: Page Header ──────── */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-main py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Help &amp; Support
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our team.
          </p>
        </div>
      </section>

      {/* ──────── Section 2: FAQ Tabs ──────── */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          {/* Tab bar */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex border-b border-gray-200 min-w-max">
              {faqCategories.map((cat, index) => (
                <button
                  key={cat.label}
                  onClick={() => handleTabChange(index)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === index
                      ? 'border-accent text-accent'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 px-6">
            {faqCategories[activeTab].items.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openAccordion === index}
                onToggle={() =>
                  setOpenAccordion(openAccordion === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ──────── Section 3: Contact Us ──────── */}
      <section className="pb-16 md:pb-24">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left column — Contact info */}
            <div className="flex flex-col justify-start">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Still need help?
              </h2>
              <p className="text-gray-500 mb-8">
                Our support team responds within 24 hours.
              </p>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email us</p>
                    <a
                      href="mailto:support@valuebox.io"
                      className="text-accent hover:underline text-sm"
                    >
                      support@valuebox.io
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Response time</p>
                    <p className="text-sm text-gray-500">
                      Mon–Fri, 9am–6pm GMT. We aim to respond within 24 hours.
                    </p>
                  </div>
                </div>

                {/* ValueBox+ note */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                    <Gem className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Priority support</p>
                    <p className="text-sm text-gray-500">
                      ValueBox+ members receive priority support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Contact form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              {formStatus === 'success' ? (
                /* ── Success card ── */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Thanks, {submittedName}. We&apos;ve received your request and sent a confirmation to {submittedEmail}. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-accent hover:underline text-sm font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Send us a message</h3>

                  {formStatus === 'error' && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                      Something went wrong. Please try again or email us directly at{' '}
                      <a
                        href="mailto:support@valuebox.io"
                        className="underline font-medium"
                      >
                        support@valuebox.io
                      </a>
                      .
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="support-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="support-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors ${
                          formErrors.name ? 'border-red-400' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="support-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="support-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors ${
                          formErrors.email ? 'border-red-400' : 'border-gray-300'
                        }`}
                        placeholder="you@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Subject dropdown */}
                    <div>
                      <label
                        htmlFor="support-subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="support-subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors appearance-none bg-white ${
                          formErrors.subject ? 'border-red-400' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a subject...</option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {formErrors.subject && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>
                      )}
                    </div>

                    {/* Order Number (optional) */}
                    <div>
                      <label
                        htmlFor="support-order"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Order Number{' '}
                        <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="support-order"
                        type="text"
                        value={formData.orderNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, orderNumber: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                        placeholder="#12345 — if applicable"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="support-message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="support-message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none ${
                          formErrors.message ? 'border-red-400' : 'border-gray-300'
                        }`}
                        placeholder="Describe your issue in as much detail as possible..."
                      />
                      {formErrors.message && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold py-3 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
