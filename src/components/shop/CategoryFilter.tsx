'use client';

import { ProductCategory } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

const CATEGORY_LABELS: Record<string, string> = {
  hoodies: 'Hoodies',
  tshirts: 'T-Shirts',
  coasters: 'Coasters',
  other: 'Other',
};

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories: (ProductCategory | 'all')[] = ['all', 'hoodies', 'tshirts', 'coasters', 'other'];

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`transition-all ${
            selectedCategory === category
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'border border-slate-600 bg-slate-800 text-slate-300 hover:border-red-600 hover:text-white'
          }`}
          variant={selectedCategory === category ? 'default' : 'outline'}
        >
          {category === 'all' ? 'All Products' : CATEGORY_LABELS[category]}
        </Button>
      ))}
    </div>
  );
}
