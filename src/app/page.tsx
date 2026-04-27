import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getFeaturedProducts } from '@/lib/products';
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Custom apparel and FAA-certified drone services for Western Pennsylvania',
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="border-b border-zinc-900 bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.24),_transparent_40%),linear-gradient(180deg,#111111_0%,#050505_100%)] py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-500">
              Made Different
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black uppercase tracking-[0.08em] text-white md:text-6xl">
              Custom apparel and aerial media built for attention.
            </h1>
            <p className="mb-8 mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl">
              All Around Photos pairs small-batch custom product work with FAA-certified drone imaging for listings, inspections, and marketing teams that need fast, dependable visuals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/shop">
                <Button className="bg-red-600 px-8 py-3 text-lg hover:bg-red-700">
                  Shop Now
                </Button>
              </Link>
              <Link href="/drone">
                <Button variant="outline" className="px-8 py-3 text-lg">
                  Drone Pricing
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-[360px] overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 sm:col-span-2">
              <Image
                src="/drone/DJI_0462.JPG"
                alt="Aerial overview of a property captured by All Around Photos"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">
                  FAA Certified
                </p>
                <p className="mt-3 max-w-md text-2xl font-black uppercase tracking-[0.06em] text-white">
                  Flythroughs, inspection stills, and listing-ready coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="border-b border-zinc-900 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black uppercase tracking-[0.08em] text-white md:text-4xl">
              Choose Your Lane
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Shop ready-made pieces, or start a custom order for apparel and goods built around your own branding, art, or event concept.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/products/Hoodie_Design_Grouped_ONE_PAGE_Preview-1.jpg"
                  alt="Featured hoodie from the ready-to-wear collection"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">Ready To Wear</p>
                <h3 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-white">Current Drops</h3>
                <p className="mt-3 max-w-md text-zinc-300">
                  Hoodies, tees, and coasters already priced and ready to move.
                </p>
                <Link href="/shop" className="mt-6 inline-block">
                  <Button>Browse Shop</Button>
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/products/IMG_20260219_152742485.jpg"
                  alt="Custom coaster set representing bespoke order work"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">Custom Orders</p>
                <h3 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-white">Your Design, Your Run</h3>
                <p className="mt-3 max-w-md text-zinc-300">
                  Send the concept, quantity, and reference link. We&apos;ll map the build and follow up with a quote.
                </p>
                <Link href="/custom" className="mt-6 inline-block">
                  <Button variant="outline">Start A Custom Request</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-b border-zinc-900 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Featured Products</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white md:text-4xl">
                Live In The Shop Right Now
              </h2>
            </div>
            <Link href="/shop" className="hidden md:block">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">{product.category}</p>
                  <h3 className="mt-3 text-xl font-bold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-black text-white">{formatCurrency(product.price / 100)}</span>
                    <Link href="/shop">
                      <Button size="sm">Shop</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drone Services Banner */}
      <section className="border-b border-zinc-900 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[320px]">
              <Image
                src="/drone/DJI_20251222221530_0060_D.JPG"
                alt="Twilight drone work sample"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Drone Services</p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.08em] text-white md:text-4xl">
                Service packages start at $175.
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-300">
                Basic, standard, and premium still packages, cardinal-direction imaging, building coverage, and add-ons including twilight, facades, and rush delivery.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/drone">
                  <Button className="px-8 py-3 text-lg">See Packages</Button>
                </Link>
                <Link href="/drone#quote">
                  <Button variant="outline" className="px-8 py-3 text-lg">Request Quote</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
