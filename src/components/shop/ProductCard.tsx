'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/lib/cart';
import ProductModal from './ProductModal';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = (selectedSize: string, selectedColor: string, quantity: number = 1) => {
    addItem({
      id: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
      name: product.name,
      price: product.price,
      image: product.image,
      version: product.version,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-accent">
              {formatCurrency(product.price / 100)}
            </span>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleQuickAdd}
        />
      )}
    </>
  );
}
