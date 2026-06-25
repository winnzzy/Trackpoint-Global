import Link from 'next/link';

export const metadata = {
  title: 'Our Services | TrackPoint Global',
  description: 'Explore TrackPoint Global courier and logistics services — international shipping, express delivery, freight, e-commerce fulfillment, and customs compliance across 100+ countries.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      ),
      title: 'International Courier Delivery',
      description: 'Door-to-door courier services to over 100 countries. Full customs handling, real-time tracking, and delivery confirmation for every shipment.',
      features: ['Door-to-door pickup & delivery', 'Full customs documentation', 'Real-time tracking', 'Delivery confirmation'],
      deliveryTime: '5–10 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      title: 'Express Shipping',
      description: 'When time is critical. Priority handling, expedited routing, and guaranteed delivery windows for urgent international shipments.',
      features: ['Priority handling', 'Expedited air freight', '1–3 day delivery', 'Guaranteed time windows'],
      deliveryTime: '1–3 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      ),
      title: 'Freight & Cargo',
      description: 'Sea, air, and land freight solutions for bulk shipments and heavy cargo. Flexible container options and competitive rates for businesses of all sizes.',
      features: ['Air, sea & land freight', 'Full & partial container loads', 'Cargo insurance options', 'Port-to-port & door-to-door'],
      deliveryTime: '7–30 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      ),
      title: 'E-commerce Fulfillment',
      description: 'End-to-end order fulfillment for online sellers. Warehousing, pick-and-pack, shipping, and returns management integrated with your store.',
      features: ['Warehouse & inventory management', 'Pick, pack & ship', 'Returns processing', 'Shopify / WooCommerce integration'],
      deliveryTime: '1–7 business days',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      ),
      title: 'Business Logistics',
      description: 'Scalable shipping solutions for corporate clients and supply chain operations. Volume discounts, dedicated account management, and API integration.',
      features: ['Volume discount pricing', 'Dedicated account manager', 'Bulk shipping tools', 'API integration ready'],
      deliveryTime: 'Custom SLA',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      title: 'Customs & Compliance',
      description: 'Expert handling of customs clearance, import/export documentation, and regulatory compliance for cross-border shipments worldwide.',
      features: ['Customs documentation prep', 'Duty & tax guidance', 'Regulatory compliance', 'Broker partnerships'],
      deliveryTime: 'Varies by route',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive courier and logistics solutions designed for individuals and businesses
            shipping across borders and around the world.
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
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg hover:border-orange/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition-colors">
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
                          <svg className="w-4 h-4 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-orange bg-orange/5 px-3 py-1 rounded-full">
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
              We ship to major destinations across every continent, with expanding coverage in emerging markets.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { region: 'North America', countries: 'USA, Canada, Mexico' },
              { region: 'Europe', countries: 'UK, Germany, France, Netherlands, Spain' },
              { region: 'Middle East', countries: 'UAE, Qatar, Saudi Arabia, Turkey' },
              { region: 'Asia Pacific', countries: 'China, India, Singapore, Japan, Australia' },
              { region: 'Africa', countries: 'Nigeria, South Africa, Kenya, Ghana, Egypt' },
              { region: 'Latin America', countries: 'Brazil, Argentina, Colombia, Chile' },
              { region: 'Eastern Europe', countries: 'Poland, Czech Republic, Romania' },
              { region: 'Scandinavia', countries: 'Sweden, Norway, Denmark, Finland' },
              { region: 'Southeast Asia', countries: 'Thailand, Vietnam, Malaysia, Indonesia' },
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
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Shipping Solution?</h2>
          <p className="text-gray-300 mb-8">
            Contact our team to discuss volume discounts, dedicated logistics support, or custom delivery requirements.
          </p>
          <Link
            href="/contact"
            className="bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}