import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-main py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/shop" className="btn-secondary">
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
