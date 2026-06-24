import Link from 'next/link';

export const metadata = {
  title: 'Our Services | TrackPoint Global',
  description: 'Explore TrackPoint Global courier and logistics services — international shipping, express delivery, document handling, and business logistics across 50+ countries.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      ),
      title: 'International Courier Delivery',
      description: 'Door-to-door courier services to over 50 countries. Full customs handling, real-time tracking, and delivery confirmation for every shipment.',
      features: ['Door-to-door pickup & delivery', 'Full customs documentation', 'Real-time tracking', 'Delivery confirmation'],
      deliveryTime: '5–10 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      title: 'Express Shipping',
      description: 'When time is critical. Priority handling, expedited routing, and guaranteed delivery windows for urgent shipments.',
      features: ['Priority handling', 'Expedited air freight', '1–3 day delivery', 'Guaranteed time windows'],
      deliveryTime: '1–3 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      ),
      title: 'Domestic Parcel Delivery',
      description: 'Fast and affordable parcel delivery within Nigeria and across West Africa. Flexible pickup scheduling and competitive rates.',
      features: ['Same-city & inter-city delivery', 'Flexible pickup scheduling', 'SMS & email notifications', 'Affordable pricing'],
      deliveryTime: '1–3 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      title: 'Document Delivery',
      description: 'Secure, tracked delivery of legal documents, contracts, certificates, and official paperwork. Tamper-proof packaging available.',
      features: ['Secure sealed packaging', 'Chain of custody tracking', 'Signature on delivery', 'Tamper-proof options'],
      deliveryTime: '1–5 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      ),
      title: 'Business Logistics',
      description: 'Scalable shipping solutions for e-commerce sellers, corporate clients, and supply chain operations. Volume discounts and dedicated account management.',
      features: ['Volume discount pricing', 'Dedicated account manager', 'Bulk shipping tools', 'API integration ready'],
      deliveryTime: 'Custom SLA',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      title: 'Customs & Cross-Border Support',
      description: 'Expert handling of customs clearance, import/export documentation, and regulatory compliance for international shipments.',
      features: ['Customs documentation prep', 'Duty & tax guidance', 'Regulatory compliance', 'Broker partnerships'],
      deliveryTime: 'Varies by route',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive courier and logistics solutions designed for individuals and businesses 
            shipping from Africa to the rest of the world.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {service.icon}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.deliveryTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We ship to major destinations across Africa, Europe, the Americas, Asia, and the Middle East.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { region: 'West Africa', countries: 'Nigeria, Ghana, Senegal, Côte d\'Ivoire' },
              { region: 'East Africa', countries: 'Kenya, Tanzania, Uganda, Ethiopia' },
              { region: 'Southern Africa', countries: 'South Africa, Zimbabwe, Zambia' },
              { region: 'Europe', countries: 'UK, Ireland, Germany, France' },
              { region: 'North America', countries: 'USA, Canada' },
              { region: 'Middle East', countries: 'UAE, Qatar, Saudi Arabia' },
              { region: 'Asia', countries: 'China, India, Singapore' },
              { region: 'South America', countries: 'Brazil, Argentina, Colombia' },
              { region: 'Oceania', countries: 'Australia, New Zealand' },
              { region: 'Caribbean', countries: 'Jamaica, Trinidad, Barbados' },
            ].map((item) => (
              <div key={item.region} className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">{item.region}</p>
                <p className="text-xs text-gray-500">{item.countries}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Shipping Solution?</h2>
          <p className="text-blue-100 mb-8">
            Contact our team to discuss volume discounts, dedicated logistics support, or custom delivery requirements.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition shadow-lg inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}