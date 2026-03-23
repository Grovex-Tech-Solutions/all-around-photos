'use client';

import { useState } from 'react';
import { Product } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden hover:border-red-600 transition-colors">
        <div className="relative aspect-square bg-slate-700">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-400 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-red-500">
              {formatCurrency(product.price)}
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
            // TODO: Add to cart logic will be handled by context
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
