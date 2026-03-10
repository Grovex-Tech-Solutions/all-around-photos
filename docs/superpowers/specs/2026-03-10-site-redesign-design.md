# All Around Photos LLC - Site Redesign Spec

## Overview

Redesign the site from a drone photography/inspection services business to a Cricut-made apparel and custom goods shop with drone photography as a secondary service offering for realtors.

**Primary focus:** Custom apparel and goods (hoodies, t-shirts, coasters, etc.)
**Secondary focus:** Drone photography services for real estate agents

## Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Brand hero + "Ready to Wear" / "Custom Orders" category cards + featured products + drone services link |
| `/shop` | Shop | Product catalog — filterable grid of ready-made items with add-to-cart |
| `/custom` | Custom Orders | Gallery of past custom work + custom order request form |
| `/cart` | Cart | Simple cart review — items, quantities, total, checkout button |
| Stripe hosted | Checkout | Redirect to Stripe Checkout — no checkout page on our site |
| `/checkout/success` | Success | Order confirmation / thank you page |
| `/checkout/cancel` | Cancel | Checkout cancelled — return to cart |
| `/drone` | Drone Services | Aerial photography gallery + service info + quote request form |
| `/about` | About | Brand story, the maker, the process |
| `/contact` | Contact | General contact form |

**Removed pages:** `/services`, `/book`, `/quote`, `/gallery` (functionality absorbed into new pages)

## Visual Design

**Aesthetic:** Dark & bold, streetwear-inspired (Noir Red)

- **Background:** `#0a0a0a` (near-black), `#111` / `#141414` for card surfaces
- **Accent:** `#ff3c3c` (bold red) for CTAs, prices, highlights
- **Text:** `#ffffff` primary, `#888` / `#666` secondary
- **Borders:** `#1a1a1a` / `#222` subtle separators
- **Typography:** Heavy weight (700-900), uppercase with letter-spacing for headings, clean sans-serif body (Inter)
- **Corners:** Small radius (2-4px) — sharp, not soft
- **Font changes:** Remove Playfair Display, use Inter throughout with heavier weights

## Homepage Layout (Category Cards Pattern)

1. **Brand hero** — tagline ("Made Different."), subtitle about custom apparel, "Shop Now" CTA
2. **Two category cards** side by side — "Ready to Wear" (links to /shop) and "Custom Orders" (links to /custom) with preview images
3. **Featured products** — 3-4 product cards from the shop
4. **Drone services banner** — subtle link card at bottom pointing to /drone

## Shop (`/shop`)

**Product data:** Defined in code as a static array (no CMS/database). Each product has: id (slug), name, description, price (number in cents), category, available sizes/colors (arrays), image path (relative to `/public/products/`).

**Stripe mapping:** Products use ad-hoc line items (name + unit_amount) when creating Checkout Sessions — no pre-created Stripe Price IDs needed. This keeps product management entirely in code.

**Product images:** Stored locally in `/public/products/` — owner provides actual photos.

**Layout:**
- Category filter bar: All | Hoodies | T-Shirts | Coasters | Other
- Product grid: 2 cols mobile, 3 cols tablet, 4 cols desktop
- Product card: image on dark background, name, price in red, "Add to Cart" button
- Quick-view modal on card click: size/color selection (if applicable), add-to-cart. Products without variants (e.g., coasters) skip variant selection and show just quantity + add-to-cart.
- No dedicated product detail page — the modal is the only detail view.

## Cart (`/cart`)

- Client-side only — React context + localStorage for persistence
- `CartProvider` wrapping the app at the layout level
- Cart page shows: item list with images, size/color, quantity controls, remove button, subtotal per item, total
- "Checkout" button redirects to Stripe Checkout

## Custom Orders (`/custom`)

**Two sections:**

1. **Gallery** — grid of past custom work photos (logos on hoodies, custom coasters, etc.)
2. **Order request form:**
   - Item type (dropdown: Hoodie, T-Shirt, Coaster, Other)
   - Quantity
   - Description (textarea)
   - Link to design reference (optional — URL to image, Google Drive, etc. — avoids needing file upload infrastructure)
   - Contact info (name, email, phone)
   - Submits via API route (`/api/custom-order`) which sends an email notification to the owner. Uses the same email approach as the existing contact/quote system (configured via environment variables).
   - Owner follows up with Stripe Payment Link after discussing details

## Stripe Integration

**Shop items (ready-to-wear):**
- Cart "Checkout" button calls API route `/api/checkout`
- API route creates a Stripe Checkout Session with line items (name, price, quantity)
- Redirects customer to Stripe's hosted checkout page
- Success/cancel URLs redirect back to `/checkout/success` and `/checkout/cancel`
- No Stripe SDK on the frontend — server-side only via API route
- Pricing is all-inclusive (shipping costs baked into product prices)

**Custom orders:**
- No automated Stripe integration — owner manually sends Stripe Payment Links after discussing order details

**Environment requirements:**
- `STRIPE_SECRET_KEY` env variable on Cloudflare Workers
- Stripe account with test/live keys configured

**Future:** Stripe webhook endpoint for automated order confirmation emails to customers.

## Drone Services (`/drone`)

- Hero section with aerial photo
- Brief service description (offerings for realtors)
- Photo gallery grid of drone work samples
- Quote request form: name, email, property address, description of needs
- Submits via API route (`/api/drone-quote`) — sends email notification to owner, same email infrastructure as other forms

## Navigation

**Sticky dark header:**
- Left: "ALL AROUND" bold logo text (letter-spaced, uppercase)
- Center links: Shop | Custom | Drone | About | Contact
- Right: Cart icon with red item-count badge
- Mobile: hamburger menu, same dark theme

**Footer:** Dark (#0a0a0a), links to all pages, contact info, legal pages (privacy, terms)

## Route Structure

All new pages live under the `(public)` route group, matching the existing pattern. The `(protected)/admin` section is removed — there's no admin panel in the new design (product data is in code, form submissions go to email).

## Checkout Success/Cancel Pages

- `/checkout/success` — static thank-you page. Shows a generic "Your order has been placed!" message with a note that they'll receive a receipt from Stripe via email. No session details retrieved (keeps it simple; Stripe sends the receipt automatically).
- `/checkout/cancel` — simple page with "Your checkout was cancelled" message and a link back to `/cart`.

## Database / Prisma

The existing Prisma schema is oriented around the old photography business (Photo, ClientGallery, Order, InspectionReport, etc.). Since the new design uses:
- Static product data in code (no database)
- Client-side cart (localStorage)
- Stripe for payments (hosted checkout)
- Email for form submissions

**Prisma and the database can be removed entirely.** This simplifies deployment and removes the Postgres dependency. The existing email utility (`src/lib/email.ts`) is kept for form submissions. Old Prisma models, seed scripts, and database utilities are deleted.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Cloudflare Workers (via OpenNext)
- Zod (validation)

**New dependency:** `stripe` npm package (server-side only, for creating Checkout Sessions)

**Removed:** Prisma, `@prisma/client`, all database-related code

## What Gets Removed/Replaced

- All inspection/commercial photography service content
- Event photography content
- Booking calendar component
- Quote request system (replaced by simpler forms on /custom and /drone)
- Service packages and pricing tiers
- Unsplash placeholder images (replaced with owner's actual product/drone photos)
- Playfair Display font
- Light/blue color theme (replaced with dark/red)
