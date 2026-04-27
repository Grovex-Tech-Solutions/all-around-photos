import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | All Around Photos LLC',
  description: 'Learn about All Around Photos LLC and our passion for custom apparel and drone services.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-[0.15em] text-center text-white mb-12">
            About Us
          </h1>
          
          <div className="space-y-12">
            {/* Our Story */}
            <section className="border-l-4 border-red-600 pl-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                All Around Photos LLC is built around two lanes that work well together: direct-to-client custom product work and dependable aerial media coverage. The same mindset drives both sides of the business, clear communication, clean execution, and deliverables that are ready to use.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                On the product side, that means custom apparel and goods with a tight, collaborative order process. On the drone side, it means FAA-certified imaging for listings, inspections, building coverage, and marketing content.
              </p>
            </section>

            {/* Our Mission */}
            <section className="border-l-4 border-red-600 pl-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Build work that feels intentional, lands on time, and gives clients a finished product they can use immediately, whether that&apos;s a custom run of apparel or aerial visuals for a property and inspection workflow.
              </p>
            </section>

            {/* What We Do */}
            <section className="border-l-4 border-red-600 pl-8">
              <h2 className="text-3xl font-bold text-white mb-6">What We Do</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="bg-slate-900 border border-gray-700 p-6 rounded-sm">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Custom Apparel</h3>
                  <p className="text-gray-300">
                    Hoodies, tees, coasters, and other custom goods produced in small batches with a direct quote-first process.
                  </p>
                </div>
                <div className="bg-slate-900 border border-gray-700 p-6 rounded-sm">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Custom Goods</h3>
                  <p className="text-gray-300">
                    Personalized pieces for gifts, events, merch tables, and branded runs that need a cleaner look than off-the-shelf templates.
                  </p>
                </div>
                <div className="bg-slate-900 border border-gray-700 p-6 rounded-sm">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Drone Photography</h3>
                  <p className="text-gray-300">
                    Real estate, inspection, and site-documentation coverage with still packages, directional imaging, and add-on services.
                  </p>
                </div>
                <div className="bg-slate-900 border border-gray-700 p-6 rounded-sm">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Quality First</h3>
                  <p className="text-gray-300">
                    Every order is handled with clear scoping, realistic turnaround expectations, and deliverables that match the brief.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="border-l-4 border-red-600 pl-8">
              <h2 className="text-3xl font-bold text-white mb-6">Why Choose Us</h2>
              <ul className="space-y-3">
                {[
                  'Quote-first workflow with direct communication from intake to delivery',
                  'FAA Part 107 certified and insured drone operations',
                  'Clear service packages for still coverage plus inspection add-ons',
                  'Flexible custom-order intake for one-off ideas and small-batch runs',
                  'Fast, usable deliverables without overcomplicating the process',
                  'Focused on practical results, not generic template work',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-red-600 font-bold text-xl mt-1">✓</span>
                    <span className="text-lg text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
