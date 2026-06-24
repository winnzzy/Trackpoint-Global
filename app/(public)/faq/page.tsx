import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Tracking",
    questions: [
      {
        q: "How do I track my shipment?",
        a: "Visit our tracking page and enter your tracking number in the search box. You will see the current status, location, and full timeline of your shipment. You can also find direct tracking links in your shipment confirmation email.",
      },
      {
        q: "My tracking number is not working. What should I do?",
        a: "Tracking numbers may take up to 24 hours to become active after a shipment is registered. If your tracking number still does not work after this period, please double-check the number for typos and contact our support team for assistance.",
      },
      {
        q: "How often is tracking information updated?",
        a: "Tracking information is updated at every major checkpoint including pickup, sorting facility arrival, customs clearance, transit hubs, and delivery. Updates typically appear within 1–4 hours of each event.",
      },
    ],
  },
  {
    category: "Shipping",
    questions: [
      {
        q: "What items can I ship with TrackPoint Global?",
        a: "You can ship documents, parcels, electronics, clothing, personal items, and commercial goods. However, we do not ship hazardous materials, weapons, perishable goods without proper packaging, or items prohibited by the destination country's customs regulations.",
      },
      {
        q: "How long does international shipping take?",
        a: "International shipping times vary by destination and service level. Express shipping typically takes 1–3 business days, while standard international delivery takes 5–10 business days. Cargo and freight shipments may take 2–4 weeks depending on the route.",
      },
      {
        q: "Do you offer door-to-door pickup?",
        a: "Yes, we offer doorstep pickup services in major cities across Nigeria and select partner countries. You can schedule a pickup through our website or by contacting our support team directly.",
      },
      {
        q: "How is shipping cost calculated?",
        a: "Shipping costs are calculated based on the package weight, dimensions, destination country, and the selected service level (express, standard, or cargo). Contact us for a detailed quote for your specific shipment.",
      },
    ],
  },
  {
    category: "Customs & Duties",
    questions: [
      {
        q: "Do I need to pay customs duties?",
        a: "Customs duties and import taxes are determined by the destination country's regulations and are the responsibility of the receiver. We provide customs documentation support and can advise on estimated duties for specific destinations.",
      },
      {
        q: "Can you handle customs clearance for me?",
        a: "Yes, our team handles customs documentation and clearance as part of our international shipping service. We prepare all necessary paperwork and coordinate with customs authorities to ensure smooth clearance.",
      },
    ],
  },
  {
    category: "Business & Account",
    questions: [
      {
        q: "Do you offer bulk or business shipping rates?",
        a: "Yes, we offer competitive volume-based rates for businesses with regular shipping needs. Contact our business team to discuss your requirements and get a customized pricing plan.",
      },
      {
        q: "Can I integrate TrackPoint Global with my e-commerce platform?",
        a: "Yes, we offer API integration for e-commerce platforms and online stores. Our technical team can assist with setup and provide documentation for seamless integration with your existing systems.",
      },
      {
        q: "Do you provide shipping insurance?",
        a: "Yes, all shipments include basic coverage. For high-value items, we offer additional insurance options at competitive rates. We recommend declaring the full value of your shipment and opting for comprehensive coverage.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our shipping, tracking, and delivery services.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-bold text-navy mb-6 pb-2 border-b border-gray-200">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq) => (
                  <details
                    key={faq.q}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm group"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-navy hover:text-orange transition-colors list-none">
                      <span className="text-sm pr-4">{faq.q}</span>
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-navy mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our support team is available to help you with any questions or concerns about your shipments.
          </p>
          <Link
            href="/contact"
            className="bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
}