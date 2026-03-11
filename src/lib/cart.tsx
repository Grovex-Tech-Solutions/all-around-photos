'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product, CartItem } from '@/lib/products';

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = 'all-around-cart';

function getCartItemKey(productId: string, size?: string, color?: string): string {
  return `${productId}-${size ?? 'none'}-${color ?? 'none'}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = useCallback((product: Product, quantity = 1, size?: string, color?: string) => {
    setItems((prev) => {
      const key = getCartItemKey(product.id, size, color);
      const existing = prev.find(
        (item) => getCartItemKey(item.product.id, item.size, item.color) === key
      );
      if (existing) {
        return prev.map((item) =>
          getCartItemKey(item.product.id, item.size, item.color) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size, color }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size?: string, color?: string) => {
    const key = getCartItemKey(productId, size, color);
    setItems((prev) =>
      prev.filter((item) => getCartItemKey(item.product.id, item.size, item.color) !== key)
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string, color?: string) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      const key = getCartItemKey(productId, size, color);
      setItems((prev) =>
        prev.map((item) =>
          getCartItemKey(item.product.id, item.size, item.color) === key
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
