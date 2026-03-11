'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { products, Product } from '@/lib/products';

export default function PublicGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products by category if selected
  const displayedProducts: Product[] = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const categories = [
    { value: 'apparel', label: 'Apparel' },
    { value: 'custom', label: 'Custom Work' },
    { value: 'drone', label: 'Drone Photography' },
  ];

  return (
    <div className="w-full">
      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-accent text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-pressed={selectedCategory === null}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat.value
                ? 'bg-accent text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-pressed={selectedCategory === cat.value}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
