import Link from 'next/link';

export const metadata = {
  title: 'About Us | TrackPoint Global',
  description: 'TrackPoint Global is a leading international courier and logistics company specializing in fast, secure, and reliable delivery services across Africa, Europe, the Americas, and the Middle East.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About TrackPoint Global</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connecting businesses and individuals to the world through reliable, fast, and secure courier services.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  TrackPoint Global was founded with a clear mission: to make international shipping from Africa
                  as seamless and reliable as shipping from anywhere else in the world. Headquartered in Lagos, Nigeria,
                  we have built a logistics network that spans over 50 countries across Africa, Europe, the Americas,
                  and the Middle East.
                </p>
                <p>
                  We understand the unique challenges of cross-border shipping from West Africa — from customs
                  complexities to last-mile delivery in remote areas. That is why we have invested in technology,
                  partnerships, and local expertise to remove friction from every step of the shipping process.
                </p>
                <p>
                  Whether you are a business shipping products to international customers, an individual sending
                  a parcel to family abroad, or a company managing a global supply chain — TrackPoint Global
                  provides the infrastructure, transparency, and support you need.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-100">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '50+', label: 'Countries Served' },
                    { value: '10K+', label: 'Deliveries Completed' },
                    { value: '98%', label: 'On-Time Rate' },
                    { value: '24/7', label: 'Tracking & Support' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values shape every shipment we handle and every customer interaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Reliability',
                description: 'We deliver on our promises. Every shipment is tracked, monitored, and handled with precision from pickup to delivery confirmation.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
              },
              {
                title: 'Speed',
                description: 'Time matters. Our express services deliver in 1–3 business days, and our logistics network is optimised for the fastest possible transit times.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
              },
              {
                title: 'Customer First',
                description: 'Our support team is available around the clock. We believe every customer deserves responsive, helpful, and transparent communication.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
              },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {value.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Network</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We operate across major trade routes and logistics hubs, with a growing presence in key markets.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { region: 'West Africa', cities: 'Lagos, Abuja, Accra, Kano, Port Harcourt' },
              { region: 'East Africa', cities: 'Nairobi, Dar es Salaam, Kampala' },
              { region: 'Southern Africa', cities: 'Johannesburg, Cape Town, Lusaka' },
              { region: 'United Kingdom', cities: 'London, Manchester, Birmingham' },
              { region: 'North America', cities: 'New York, Toronto, Houston' },
              { region: 'Middle East', cities: 'Dubai, Abu Dhabi, Doha' },
              { region: 'Europe', cities: 'Dublin, Amsterdam, Frankfurt' },
              { region: 'Asia', cities: 'Singapore, Mumbai (coming soon)' },
            ].map((item) => (
              <div key={item.region} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-1">{item.region}</p>
                <p className="text-xs text-gray-600">{item.cities}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Partner With Us</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you need to ship one parcel or manage hundreds of deliveries a month, we are ready to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl transition"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="text-white border-2 border-white/30 hover:border-white/60 font-semibold px-8 py-3 rounded-xl transition"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}