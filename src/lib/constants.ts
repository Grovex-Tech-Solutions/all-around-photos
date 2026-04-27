// Application constants

export const SITE_CONFIG = {
  name: 'All Around Photos LLC',
  description: 'Custom apparel, branded goods, and FAA-certified drone imaging for listings and inspections',
  url: 'https://allaroundphotos.com',
  ogImage: '/og-image.svg',
} as const;

export const CONTACT_INFO = {
  phone: '725-219-3747',
  email: 'j.brattina@allaroundphotosllc.net',
  address: 'Serving Western Pennsylvania and surrounding areas',
} as const;

export const PRODUCT_CATEGORIES = {
  HOODIES: 'hoodies',
  TSHIRTS: 'tshirts',
  COASTERS: 'coasters',
  OTHER: 'other',
} as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
