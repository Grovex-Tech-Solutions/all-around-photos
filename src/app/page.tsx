import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Premium custom apparel and aerial drone services',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="border-b border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl font-black text-white">
            All Around Photos
          </h1>
          <p className="mb-8 text-xl text-slate-300">
            Premium custom apparel & drone services
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/shop">
              <Button className="bg-red-600 px-8 py-3 text-lg hover:bg-red-700">
                Shop Now
              </Button>
            </Link>
            <Link href="/custom">
              <Button className="border border-slate-600 px-8 py-3 text-lg text-slate-300 hover:text-white">
                Custom Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-slate-700 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Explore Our Services
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Ready to Wear */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white">Ready to Wear</h3>
              <p className="mb-6 text-slate-300">
                Shop our collection of premium custom apparel with Cricut designs.
              </p>
              <Link href="/shop">
                <Button className="bg-red-600 hover:bg-red-700">
                  Browse Shop
                </Button>
              </Link>
            </div>

            {/* Custom Orders */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white">Custom Orders</h3>
              <p className="mb-6 text-slate-300">
                Request a custom order tailored to your exact specifications.
              </p>
              <Link href="/custom">
                <Button className="bg-red-600 hover:bg-red-700">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Drone Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Drone Photography Services
            </h2>
            <p className="mb-8 text-slate-300">
              Professional aerial photography and videography for real estate, development, and commercial properties.
            </p>
            <Link href="/drone">
              <Button className="bg-red-600 px-8 py-3 text-lg hover:bg-red-700">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
