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
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management: save trigger, focus close, trap tab, restore on close
  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement;

    const closeButton = modalRef.current?.querySelector('[aria-label="Close product details"]') as HTMLButtonElement;
    if (closeButton) {
      closeButton.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes modal
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab/Shift+Tab focus trap
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
      // Restore focus to trigger element
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close product details"
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <p className="text-gray-600 text-lg mb-4">{product.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-gray-600 text-sm">Price</p>
                  <p className="text-4xl font-bold text-accent">
                    {formatCurrency(product.price / 100)}
                  </p>
                </div>

                {/* Size selection */}
                <div className="mb-4">
                  <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Size <span className="text-red-500">*</span>
                  </label>
                  <Select
                    id="size-select"
                    value={selectedSize}
                    onChange={(e) => {
                      setSelectedSize(e.target.value);
                      setError('');
                    }}
                    aria-describedby={error ? 'error-msg' : undefined}
                  >
                    <option value="">Choose a size</option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Color selection */}
                <div className="mb-4">
                  <label htmlFor="color-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Color <span className="text-red-500">*</span>
                  </label>
                  <Select
                    id="color-select"
                    value={selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      setError('');
                    }}
                    aria-describedby={error ? 'error-msg' : undefined}
                  >
                    <option value="">Choose a color</option>
                    {product.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Quantity selection */}
                <div className="mb-6">
                  <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1));
                      setError('');
                    }}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div
                    id="error-msg"
                    role="alert"
                    aria-live="polite"
                    className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
                  >
                    {error}
                  </div>
                )}

                {/* Add to cart button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full mt-auto"
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
