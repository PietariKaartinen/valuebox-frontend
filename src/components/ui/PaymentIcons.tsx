const paymentMethods = [
  { src: '/images/payment/visa.svg', alt: 'Visa' },
  { src: '/images/payment/mastercard.svg', alt: 'Mastercard' },
  { src: '/images/payment/applepay.svg', alt: 'Apple Pay' },
  { src: '/images/payment/googlepay.svg', alt: 'Google Pay' },
  { src: '/images/payment/paypal.svg', alt: 'PayPal' },
];

export default function PaymentIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {paymentMethods.map((pm) => (
        <img
          key={pm.alt}
          src={pm.src}
          alt={pm.alt}
          className="h-8 w-auto"
        />
      ))}
    </div>
  );
}
