'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative text-slate-300 transition-colors hover:text-white"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
