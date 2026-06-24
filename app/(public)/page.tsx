import Link from 'next/link';
import TrackingHeroForm from '@/components/public/TrackingHeroForm';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ship Globally.<br />
              <span className="text-blue-200">Track Everything.</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Fast, secure, and reliable courier services connecting Africa to the world. 
              Real-time tracking for every shipment, from pickup to delivery.
            </p>
            <div className="max-w-xl mx-auto">
              <TrackingHeroForm />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-blue-200">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Real-time tracking
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                50+ countries
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Express & standard delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '50+', label: 'Countries Served' },
              { value: '24/7', label: 'Tracking Updates' },
              { value: '10K+', label: 'Deliveries Completed' },
              { value: '98%', label: 'On-Time Delivery' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Delivery Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From express parcels to international freight — we have the right solution for your shipping needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                ),
                title: 'International Courier',
                description: 'Door-to-door delivery across 50+ countries with full tracking and customs support.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: 'Express Shipping',
                description: 'Time-sensitive shipments delivered in 1–3 business days with priority handling.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                ),
                title: 'Business Logistics',
                description: 'Scalable shipping solutions for e-commerce, corporate, and supply chain operations.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ),
                title: 'Document Delivery',
                description: 'Secure handling of legal documents, contracts, certificates, and official paperwork.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                ),
                title: 'Parcel Delivery',
                description: 'Domestic and regional parcel delivery with flexible pickup scheduling.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Customs & Cross-Border',
                description: 'Expert customs clearance and documentation for smooth international shipments.',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Shipping with TrackPoint Global is simple. Three steps from pickup to delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Book Your Shipment',
                description: 'Register your package details, select your service level, and schedule a pickup — online or through our support team.',
              },
              {
                step: '02',
                title: 'We Handle Everything',
                description: 'Your package is collected, processed through our logistics network, and cleared through customs if shipping internationally.',
              },
              {
                step: '03',
                title: 'Track & Receive',
                description: 'Monitor your shipment in real time with our tracking system. Get notified at every milestone until delivery is confirmed.',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="text-6xl font-black text-blue-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8">
                    <svg className="w-8 h-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose TrackPoint Global</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine global reach with local expertise to deliver unmatched courier services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Fast Delivery',
                description: 'Express options for 1–3 day delivery. Standard shipping within 5–10 business days worldwide.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: 'Secure Handling',
                description: 'Every package is handled with care. Full insurance options and secure chain of custody.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Global Coverage',
                description: 'Operating across 50+ countries in Africa, Europe, the Americas, Asia, and the Middle East.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
                title: '24/7 Support',
                description: 'Dedicated customer support team available around the clock to assist with your shipments.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations / Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Connecting Africa to the World
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Headquartered in Lagos, Nigeria, TrackPoint Global operates a growing logistics network 
                spanning major cities and trade routes across multiple continents.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Nigeria', 'Ghana', 'South Africa', 'Kenya',
                  'United Kingdom', 'United States', 'Canada', 'UAE',
                ].map((country) => (
                  <div key={country} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {country}
                  </div>
                ))}
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 mt-8 text-blue-600 hover:text-blue-700 font-semibold"
              >
                View all destinations
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-100">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { region: 'West Africa', cities: 'Lagos, Accra, Abuja, Kano' },
                    { region: 'East Africa', cities: 'Nairobi, Dar es Salaam' },
                    { region: 'Southern Africa', cities: 'Johannesburg, Cape Town' },
                    { region: 'Europe', cities: 'London, Manchester, Dublin' },
                    { region: 'North America', cities: 'New York, Toronto, Houston' },
                    { region: 'Middle East', cities: 'Dubai, Abu Dhabi, Doha' },
                  ].map((item) => (
                    <div key={item.region}>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{item.region}</p>
                      <p className="text-xs text-gray-600">{item.cities}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Trusted by businesses and individuals across continents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'TrackPoint Global shipped 200+ units from Lagos to London in under a week. The real-time tracking gave our team complete visibility throughout.',
                name: 'Adaeze Okonkwo',
                role: 'Operations Manager, AfriTech Solutions',
                initials: 'AO',
              },
              {
                quote: 'I sent important legal documents to Toronto and they arrived three days early. The tracking updates were accurate at every checkpoint.',
                name: 'David Adebayo',
                role: 'Legal Consultant',
                initials: 'DA',
              },
              {
                quote: 'As an e-commerce seller, reliable international shipping is critical. TrackPoint Global has been consistently dependable for all my Dubai and UK orders.',
                name: 'Fatima Yusuf',
                role: 'Founder, Hausa Crafts Online',
                initials: 'FY',
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Ship?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Whether it's a single parcel or a full container — we'll get it there safely and on time. 
            Get started today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition shadow-lg"
            >
              Get a Shipping Quote
            </Link>
            <Link
              href="/track"
              className="text-white border-2 border-white/30 hover:border-white/60 font-semibold px-8 py-4 rounded-xl transition"
            >
              Track a Shipment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}