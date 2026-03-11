import { Metadata } from 'next';
import CartPage from '@/components/shop/CartPage';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your shopping cart and proceed to checkout.',
};

export default function Cart() {
  return <CartPage />;
}
