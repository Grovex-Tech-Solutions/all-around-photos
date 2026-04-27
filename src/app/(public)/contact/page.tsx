import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us | All Around Photos LLC',
  description: 'Get in touch with All Around Photos LLC for inquiries about custom apparel and drone services.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-[0.15em] text-center text-white mb-12">
            Get In Touch
          </h1>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Contact Info</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-red-600 mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-300">
                    <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition">
                      {CONTACT_INFO.phone}
                    </a>
                  </p>
                </div>

                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-red-600 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-300">
                    <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition">
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                </div>

                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-red-600 mb-1">
                    Service Area
                  </h3>
                  <p className="text-gray-300">
                    {CONTACT_INFO.address}
                  </p>
                </div>

                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-red-600 mb-1">
                    Best For
                  </h3>
                  <p className="text-gray-300">
                    Custom orders, listing-ready drone coverage, building documentation, and fast follow-up questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
