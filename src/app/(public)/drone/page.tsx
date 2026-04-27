'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { DroneQuoteForm } from '@/components/forms/DroneQuoteForm';
import DroneGallery from '@/components/drone/DroneGallery';

const dronePackages = [
  {
    name: 'Basic',
    price: '$175',
    details: '10-15 photos',
  },
  {
    name: 'Standard',
    price: '$250',
    details: '15-20 photos + building coverage',
  },
  {
    name: 'Premium',
    price: '$350',
    details: '20-30 photos + building coverage + priority turnaround',
  },
];

const addOns = [
  'Cardinal direction imaging: $140 at 200 ft, $160 at 400 ft, $260 bundle',
  'Full building package: $420',
  'Orthomosaic: $320-$400',
  '3D model: $300',
  'Facades or gutters: $70 each',
  'Twilight or rush delivery: $75',
  'Travel fees: free within 25 miles, $25 for 25-50 miles, $45 for 50+ miles',
];

// Note: Metadata export will cause hydration issues with 'use client' directive
// Consider moving this to a layout or separate metadata configuration
// export const metadata: Metadata = {
//   title: 'Drone Services | All Around Photos',
//   description: 'Aerial photography and videography for real estate, events, and commercial use.',
// };

export default function DronePage() {
  const formRef = useRef<HTMLDivElement>(null);

  const handleNavigateToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative isolate overflow-hidden border-b border-zinc-900 bg-zinc-950 py-20 text-white">
        <div className="absolute inset-0">
          <Image
            src="/drone/DJI_0462.JPG"
            alt="Drone capture of a property"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/55" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
            Drone Services
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase tracking-[0.08em] md:text-5xl">
            Aerial content for listings, inspections, and site documentation.
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-zinc-300">
            FAA-certified capture for agents, owners, and operators who need sharp coverage, fast turnarounds, and dependable visual documentation.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#quote" className="inline-flex">
              <button className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700">
                Request Quote
              </button>
            </a>
            <a
              href="/drone/drone-pricing-sheet.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex"
            >
              <button className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-900">
                Open Pricing Sheet
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Service Packages</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {dronePackages.map((pkg) => (
                <article key={pkg.name} className="rounded-sm border border-zinc-800 bg-black p-5">
                  <h2 className="text-lg font-black uppercase tracking-[0.06em] text-white">{pkg.name}</h2>
                  <p className="mt-3 text-3xl font-black text-red-500">{pkg.price}</p>
                  <p className="mt-3 text-sm text-zinc-400">{pkg.details}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Add-Ons And Coverage</p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              {addOns.map((item) => (
                <li key={item} className="border-l-2 border-red-500 pl-4">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-zinc-500">
              Standard processing time is 3-5 business days from flight date. FAA restricted areas may require authorization fees.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Flythrough Preview</p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.08em] text-white">
                Walk the property before the showing starts.
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-400">
                The flythrough footage below uses the newly provided media asset and gives prospects a stronger sense of approach, scale, and site context.
              </p>
            </div>
            <div className="border-l border-zinc-800 bg-black p-4 lg:p-6">
              <video
                controls
                preload="metadata"
                className="aspect-video w-full rounded-sm border border-zinc-800 bg-black"
                poster="/drone/DJI_20251222221530_0060_D.JPG"
              >
                <source src="/drone/all-around-flythrough.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <DroneGallery onNavigateToForm={handleNavigateToForm} />

      {/* Drone Quote Form */}
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8" ref={formRef} id="quote">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-[0.08em]">Request a Drone Quote</h2>
          <p className="text-zinc-400">
            Tell us what needs to be captured and what the turnaround looks like. We&apos;ll reply with availability, coverage recommendations, and final pricing.
          </p>
        </div>
        <DroneQuoteForm />
      </section>
    </main>
  );
}
