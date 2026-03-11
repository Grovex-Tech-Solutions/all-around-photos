'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(
    () => [
      { id: 'all', name: 'All Products' },
      ...Array.from(
        new Set(products.map((p) => p.category))
      ).map((cat) => ({ id: cat, name: cat })),
    ],
    []
  );

  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'all'
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Shop</h1>
          <p className="text-slate-300 text-lg mb-8">
            Explore our collection of premium streetwear and custom apparel
          </p>

          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 text-lg">No products found</p>
            </div>
          )}
        </div>

        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Looking for custom orders?
          </h2>
          <p className="text-slate-300 mb-6">
            Create your own unique design with our custom order service
          </p>
          <Button asChild>
            <Link href="/custom">Start Custom Order</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
