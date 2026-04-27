'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CartIcon } from '@/components/cart/CartIcon';

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Custom', href: '/custom' },
  { name: 'Drone', href: '/drone' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-black uppercase tracking-[0.15em] text-white transition-colors hover:text-accent"
          >
            All Around <span className="text-red-500">Photos</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart icon and mobile menu button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <CartIcon />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded p-2 text-text-secondary transition-colors hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex h-6 w-6 flex-col items-center justify-center">
                <span
                  className={cn(
                    'block h-0.5 w-5 bg-current transition-all duration-300',
                    isMenuOpen ? 'translate-y-1 rotate-45' : '-translate-y-1'
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-5 bg-current transition-all duration-300',
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-5 bg-current transition-all duration-300',
                    isMenuOpen ? '-translate-y-1 -rotate-45' : 'translate-y-1'
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="space-y-1 border-t border-border py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-white"
            >
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}