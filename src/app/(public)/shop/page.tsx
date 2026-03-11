import { Metadata } from 'next';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop our collection of premium streetwear and custom apparel',
};

export default function ShopPage() {
  return <ShopClient />;
}
