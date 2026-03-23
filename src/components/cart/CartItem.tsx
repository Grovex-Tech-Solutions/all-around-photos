'use client';

import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatCurrency } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/lib/products';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.product.id, item.size, item.color);
    } else {
      updateQuantity(item.product.id, newQuantity, item.size, item.color);
    }
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="flex gap-4 p-4">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 rounded bg-slate-700">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-white">{item.product.name}</h3>
        
        <div className="mt-2 flex gap-4 text-sm text-slate-400">
          {item.size && <span>Size: {item.size}</span>}
          {item.color && <span>Color: {item.color}</span>}
        </div>

        <p className="mt-2 font-semibold text-red-500">{formatCurrency(item.product.price)}</p>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.product.id, item.size, item.color)}
          className="text-slate-400 transition-colors hover:text-red-500"
          aria-label="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 rounded border border-slate-600 bg-slate-700">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 text-slate-400 hover:text-white"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 text-slate-400 hover:text-white"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <p className="font-bold text-white">{formatCurrency(itemTotal)}</p>
      </div>
    </div>
  );
}
