'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (size: string, color: string, quantity: number) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const availableSizes = product.sizes ?? [];
  const availableColors = product.colors ?? [];

  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement;

    const closeButton = modalRef.current?.querySelector(
      '[aria-label="Close product details"]'
    ) as HTMLButtonElement;
    if (closeButton) {
      closeButton.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = Array.from(
          modalRef.current?.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) || []
        ) as HTMLElement[];

        if (focusable.length === 0) return;

        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);

        if (e.shiftKey && currentIndex === 0) {
          e.preventDefault();
          focusable[focusable.length - 1]?.focus();
        } else if (!e.shiftKey && currentIndex === focusable.length - 1) {
          e.preventDefault();
          focusable[0]?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current?.focus) {
        triggerRef.current.focus();
      }
    };
  }, [onClose]);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    onAddToCart(selectedSize, selectedColor, quantity);
  }, [selectedSize, selectedColor, quantity, onAddToCart]);

  const sizeOptions = availableSizes.map((size) => ({ value: size, label: size }));
  const colorOptions = availableColors.map((color) => ({ value: color, label: color }));

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
          <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close product details"
              className="text-2xl font-bold leading-none text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <p className="mb-4 text-lg text-gray-600">{product.description}</p>

                <div className="mb-6">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-4xl font-bold text-accent">
                    {formatCurrency(product.price / 100)}
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="size-select" className="mb-2 block text-sm font-medium text-gray-700">
                    Size <span className="text-red-500">*</span>
                  </label>
                  <Select
                    id="size-select"
                    value={selectedSize}
                    options={sizeOptions}
                    placeholder="Choose a size"
                    onChange={(value) => {
                      setSelectedSize(value);
                      setError('');
                    }}
                    aria-describedby={error ? 'error-msg' : undefined}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="color-select" className="mb-2 block text-sm font-medium text-gray-700">
                    Color <span className="text-red-500">*</span>
                  </label>
                  <Select
                    id="color-select"
                    value={selectedColor}
                    options={colorOptions}
                    placeholder="Choose a color"
                    onChange={(value) => {
                      setSelectedColor(value);
                      setError('');
                    }}
                    aria-describedby={error ? 'error-msg' : undefined}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="quantity-input" className="mb-2 block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1));
                      setError('');
                    }}
                    className="w-20 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                  />
                </div>

                {error && (
                  <div
                    id="error-msg"
                    role="alert"
                    aria-live="polite"
                    className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  className="mt-auto w-full"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
