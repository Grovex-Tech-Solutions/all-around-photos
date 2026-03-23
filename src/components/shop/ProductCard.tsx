'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800 transition-colors hover:border-red-600">
        <div className="relative aspect-square bg-slate-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-400">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-red-500">
              {formatCurrency(product.price / 100)}
            </span>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full bg-red-600 hover:bg-red-700"
            aria-label={`View ${product.name}`}
          >
            View &amp; Buy
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={(size, color, quantity) => {
            addItem(product, quantity, size, color);
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
