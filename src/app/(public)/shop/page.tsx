import { Metadata } from 'next';
import PublicGallery from '@/components/shop/PublicGallery';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our Cricut apparel and custom work collection.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop</h1>
          <p className="text-xl text-gray-600">
            Discover our premium Cricut apparel and custom work showcase.
          </p>
        </div>

        <PublicGallery />
      </div>
    </div>
  );
}
