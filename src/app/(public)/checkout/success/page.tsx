import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been successfully placed.',
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        {/* Success icon */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>

        <p className="text-xl text-gray-600 mb-2">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <p className="text-gray-600 mb-8">
          You will receive an email confirmation shortly with your order details and tracking information.
        </p>

        <div className="space-y-4">
          <Link href="/shop">
            <Button className="w-full">Continue Shopping</Button>
          </Link>

          <Link href="/">
            <Button variant="secondary" className="w-full text-gray-700">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
