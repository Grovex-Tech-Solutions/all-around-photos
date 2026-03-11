'use client';

import Image from 'next/image';
import { CartItem } from '@/lib/cart';
import { formatCurrency } from '@/lib/utils';

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">
          {item.size && item.color ? `${item.size} / ${item.color}` : ''}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="px-2 py-1 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              −
            </button>
            <span className="px-3 font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">
              {formatCurrency((item.price * item.quantity) / 100)}
            </p>
            <p className="text-xs text-gray-500">
              {formatCurrency(item.price / 100)} each
            </p>
          </div>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
        className="self-start text-gray-400 hover:text-red-600 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
