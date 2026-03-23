'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import CartItemComponent from '@/components/shop/CartItemComponent';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    setCheckoutError(null);
    setIsLoading(true);

    try {
      // Step 1: Fetch CSRF token
      const csrfRes = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include',
      });

      if (!csrfRes.ok) {
        throw new Error('Failed to initialize checkout');
      }

      const { csrfToken } = await csrfRes.json();

      // Step 2: POST cart to checkout endpoint
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            version: item.version,
          })),
        }),
      });

      const data = await checkoutRes.json();

      // Step 3: Handle responses
      if (checkoutRes.status === 429) {
        setCheckoutError('Too many checkout attempts. Please try again in 5 minutes.');
        return;
      }

      if (!checkoutRes.ok) {
        setCheckoutError(data.error || 'Checkout failed. Please try again.');
        return;
      }

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        setCheckoutError('No checkout URL received. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError('Unable to connect to checkout service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Start shopping and add items to your cart to proceed with checkout.
          </p>
          <Link href="/shop">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                onClick={() => {
                  clearCart();
                }}
                variant="secondary"
                className="w-full text-gray-700"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice / 100)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice / 100)}</span>
                </div>
              </div>

              {/* Error message */}
              {checkoutError && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
                >
                  {checkoutError}
                </div>
              )}

              {/* Checkout buttons */}
              <Button
                onClick={handleCheckout}
                disabled={isLoading || items.length === 0}
                className="w-full mb-3"
                aria-label="Proceed to checkout"
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>

              <Link href="/shop">
                <Button variant="secondary" className="w-full text-gray-700">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
