import {
  Globe,
  PackageCheck,
  FileText,
  Zap,
  Building2,
  Shield,
  Truck,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "International Courier Delivery",
    description:
      "Send packages to over 200 countries and territories worldwide with full door-to-door tracking, customs clearance support, and insurance coverage. Our international courier service handles everything from small parcels to large commercial shipments.",
    features: [
      "Door-to-door delivery worldwide",
      "Full customs clearance support",
      "Real-time tracking at every stage",
      "Insurance coverage included",
      "Delivery within 3–7 business days",
    ],
  },
  {
    icon: PackageCheck,
    title: "Domestic Parcel Shipping",
    description:
      "Fast and affordable domestic shipping within Nigeria and partner countries. Whether you are shipping across the city or across the country, our domestic service offers reliable delivery with flexible options to suit your timeline and budget.",
    features: [
      "Same-day and next-day delivery options",
      "Nationwide coverage across Nigeria",
      "Affordable pricing for all package sizes",
      "SMS and email delivery notifications",
      "Signature confirmation on delivery",
    ],
  },
  {
    icon: FileText,
    title: "Document Delivery",
    description:
      "Secure and certified delivery of important documents including legal papers, contracts, certificates, and business correspondence. We understand the importance of sensitive documents and treat them with the utmost care and confidentiality.",
    features: [
      "Certified and secure handling",
      "Signature confirmation required",
      "Tamper-evident packaging available",
      "Priority routing for urgent documents",
      "Proof of delivery documentation",
    ],
  },
  {
    icon: Zap,
    title: "Express Shipping",
    description:
      "When time is critical, our express shipping service guarantees priority handling and the fastest possible transit times. Perfect for urgent business shipments, time-sensitive documents, and high-priority packages that cannot wait.",
    features: [
      "Guaranteed 1–3 business day delivery",
      "Priority handling at every checkpoint",
      "Dedicated express routing",
      "Real-time GPS tracking",
      "Money-back delivery guarantee",
    ],
  },
  {
    icon: Building2,
    title: "Business Logistics Support",
    description:
      "Comprehensive end-to-end logistics solutions designed for businesses of all sizes. From bulk shipping rates and API integration to dedicated account management and custom reporting, we provide the infrastructure your business needs to ship at scale.",
    features: [
      "Volume-based bulk shipping rates",
      "API integration for e-commerce platforms",
      "Dedicated account manager",
      "Custom shipping labels and branding",
      "Monthly invoicing and reporting",
    ],
  },
  {
    icon: Shield,
    title: "Cargo & Freight",
    description:
      "Professional cargo solutions for heavy, oversized, and bulk shipments. We offer both sea and air freight options for large consignments, with full logistics coordination, warehousing support, and customs brokerage services.",
    features: [
      "Sea and air freight options",
      "Warehouse and storage facilities",
      "Full container and less-than-container loads",
      "Customs brokerage services",
      "Cargo insurance available",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive courier and logistics solutions tailored to meet the shipping needs of individuals and businesses worldwide.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center`}
            >
              <div className="flex-shrink-0">
                <div className="bg-orange/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                  <service.icon className="h-10 w-10 text-orange" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-navy mb-3">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-14">Why Businesses Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Reliable Network",
                desc: "Our global logistics network ensures your shipments move efficiently through every checkpoint with minimal delays.",
              },
              {
                icon: Clock,
                title: "On-Time Guarantee",
                desc: "We maintain a 99.2% on-time delivery rate through optimized routing and proactive shipment monitoring.",
              },
              {
                icon: Shield,
                title: "Full Insurance",
                desc: "Every shipment is covered. Our comprehensive insurance options give you peace of mind for valuable cargo.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="bg-navy/5 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-navy" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8">
            Contact us today for a shipping quote or track an existing shipment to see our service in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/track"
              className="bg-white text-orange hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Track Shipment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}