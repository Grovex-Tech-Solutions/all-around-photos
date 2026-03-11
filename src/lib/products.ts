import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number().int().positive(), // in cents
  image: z.string(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  version: z.number().int(),
  category: z.enum(['apparel', 'custom', 'drone']),
  featured: z.boolean().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const products: Product[] = [
  {
    id: 'cricut-apparel-1',
    name: 'Classic Cricut T-Shirt',
    slug: 'cricut-apparel',
    description: 'Premium cotton t-shirt with custom Cricut design. Perfect for showcasing your projects.',
    price: 1999, // $19.99
    image: '/products/cricut-tshirt.jpg',
    colors: ['Navy', 'Black', 'White', 'Heather Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    version: 1,
    category: 'apparel',
    featured: true,
  },
  {
    id: 'cricut-hoodie-1',
    name: 'Cricut Premium Hoodie',
    slug: 'cricut-hoodie',
    description: 'Comfortable hoodie perfect for creative professionals and Cricut enthusiasts.',
    price: 3999, // $39.99
    image: '/products/cricut-hoodie.jpg',
    colors: ['Navy', 'Black', 'Charcoal', 'Forest Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    version: 1,
    category: 'apparel',
    featured: true,
  },
  {
    id: 'cricut-cap-1',
    name: 'Cricut Snapback Cap',
    slug: 'cricut-cap',
    description: 'Classic snapback cap with embroidered Cricut logo.',
    price: 1499, // $14.99
    image: '/products/cricut-cap.jpg',
    colors: ['Navy', 'Black', 'White'],
    sizes: ['One Size'],
    version: 1,
    category: 'apparel',
  },
  {
    id: 'custom-print-1',
    name: 'Custom Design Print',
    slug: 'custom-design-print',
    description: 'Personalized print service for your custom Cricut designs.',
    price: 2999, // $29.99
    image: '/products/custom-print.jpg',
    colors: ['Color', 'Black & White'],
    sizes: ['8x10', '11x14', '16x20'],
    version: 1,
    category: 'custom',
  },
  {
    id: 'drone-photo-1',
    name: 'Drone Photography Package',
    slug: 'drone-photo-package',
    description: 'Professional aerial photography package with 50+ edited photos.',
    price: 39999, // $399.99
    image: '/products/drone-photo.jpg',
    colors: ['Standard'],
    sizes: ['Up to 1 hour'],
    version: 1,
    category: 'drone',
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function validateProduct(product: unknown): product is Product {
  try {
    productSchema.parse(product);
    return true;
  } catch {
    return false;
  }
}
