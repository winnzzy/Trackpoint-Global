'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How do I track my shipment?',
    answer: 'Visit our tracking page and enter the tracking number provided in your shipping confirmation email. Your tracking number starts with TPG- followed by the year and a unique number (e.g., TPG-2026-00147). You\'ll see real-time updates including current location, status, and estimated delivery date.',
  },
  {
    question: 'How long does international shipping take?',
    answer: 'International shipping times vary by destination and service level. Express shipments typically take 1–3 business days, while standard international delivery takes 5–10 business days. Customs clearance at the destination country may add additional time. We provide estimated delivery dates when you book your shipment.',
  },
  {
    question: 'How long does domestic delivery take?',
    answer: 'Domestic deliveries within Nigeria typically take 1–3 business days depending on the origin and destination cities. Same-city deliveries can often be completed within 24 hours. Express domestic options are available for time-sensitive shipments.',
  },
  {
    question: 'What happens if my package is delayed?',
    answer: 'If your shipment experiences a delay, our tracking system will update with the current status and reason. Common delays include weather disruptions, customs inspections, or transit hub congestion. If your shipment is delayed beyond the estimated delivery date, please contact our support team and we will investigate immediately.',
  },
  {
    question: 'Can I send both documents and parcels?',
    answer: 'Yes, we handle a wide range of shipments including documents, parcels, packages, and commercial goods. For documents, we offer secure sealed packaging with chain-of-custody tracking. For parcels, we provide various size and weight options. All shipments include real-time tracking regardless of type.',
  },
  {
    question: 'Do you handle customs clearance for international shipments?',
    answer: 'Yes, our customs and cross-border support team handles all documentation and clearance processes for international shipments. We prepare customs declarations, advise on duties and taxes, and work with our broker partners to ensure smooth clearance. Some items may be subject to import restrictions depending on the destination country.',
  },
  {
    question: 'How do I contact support about my shipment?',
    answer: 'You can reach our support team by email at support@trackpointglobal.com, by phone at +234 800 555 0199, or through the contact form on our Contact page. Our team is available Monday–Friday 8 AM–6 PM and Saturday 9 AM–2 PM (WAT). For urgent queries, we recommend calling directly.',
  },
  {
    question: 'What items can I ship internationally?',
    answer: 'We ship a wide variety of items including electronics, clothing, documents, artisan goods, and commercial products. However, certain items are restricted or prohibited for international shipping, including hazardous materials, perishable goods (without special handling), and items restricted by the destination country. Contact us if you\'re unsure about a specific item.',
  },
  {
    question: 'Is my package insured during shipping?',
    answer: 'All shipments include basic coverage. For high-value items, we recommend purchasing additional shipping insurance at the time of booking. Insurance coverage includes loss, damage, and theft during transit. Our support team can provide details on coverage limits and pricing for your specific shipment.',
  },
  {
    question: 'Can I change the delivery address after shipping?',
    answer: 'Address changes may be possible depending on the shipment\'s current status and location. If the package has not yet been dispatched from the origin, we can update the address directly. For packages already in transit, we will do our best to accommodate the change, though additional fees may apply. Contact support as soon as possible to request a change.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Find answers to common questions about our shipping, tracking, and delivery services.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition"
                >
                  <span className="text-sm font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Our support team is happy to help with any questions about shipping, tracking, or our services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition"
            >
              Contact Support
            </Link>
            <Link
              href="/track"
              className="text-gray-600 hover:text-gray-900 font-medium px-8 py-3 transition"
            >
              Track a Shipment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}