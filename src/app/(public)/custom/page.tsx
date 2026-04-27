import Image from 'next/image';
import { CustomOrderForm } from '@/components/forms/CustomOrderForm';

export const metadata = {
  title: 'Custom Orders | All Around Photos',
  description: 'Browse custom apparel and goods work, then submit a request for your own order.',
};

const customWorkSamples = [
  {
    title: 'Statement Hoodie Build',
    description: 'Heavyweight hoodie application with multi-layer design placement.',
    image: '/products/Hoodie_Design_Grouped_ONE_PAGE_Preview-1.jpg',
  },
  {
    title: 'Graphic Tee Run',
    description: 'Small-batch tee production for custom concepts and event merch.',
    image: '/products/IMG_20260219_151247049.jpg',
  },
  {
    title: 'Gift-Ready Coasters',
    description: 'Custom coaster sets for gifts, branding, and personal projects.',
    image: '/products/IMG_20260219_151652388.jpg',
  },
  {
    title: 'Premium Cut Detail',
    description: 'Close-up finish work on layered hoodie designs and contrast garments.',
    image: '/products/IMG_20260219_152415910.jpg',
  },
];

export default function CustomPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="border-b border-zinc-900 bg-zinc-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
            Custom Work
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[0.08em]">
            Build Your Next Drop
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-zinc-300">
            From one-off statement pieces to branded small-batch runs, we turn your concept into wearable product with a direct, collaborative order process.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Past Work</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white">Recent Custom Builds</h2>
          </div>
          <p className="max-w-xl text-sm text-zinc-400">
            Current examples use available shop imagery until a dedicated custom gallery is added. The request flow is ready now.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {customWorkSamples.map((sample) => (
            <article key={sample.title} className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
              <div className="relative aspect-[4/5]">
                <Image
                  src={sample.image}
                  alt={sample.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{sample.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{sample.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">How It Works</p>
            <ol className="mt-6 space-y-4 text-sm text-zinc-300">
              <li>Send the item type, quantity, timing, and any inspiration link you already have.</li>
              <li>We review the scope and follow up with pricing, production timing, and any clarifying questions.</li>
              <li>Once approved, we lock in the order and move into production.</li>
            </ol>
          </div>

          <div className="rounded-sm border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold uppercase tracking-[0.08em]">Request a Custom Project</h2>
              <p className="text-zinc-400">
                Share the item type, order size, and reference link if you have one. We&apos;ll review the request and follow up with pricing, production timing, and next steps.
              </p>
            </div>
            <CustomOrderForm />
          </div>
        </div>
      </section>
    </main>
  );
}
