import TrackingHeroForm from '@/components/public/TrackingHeroForm';

export const metadata = {
  title: 'Track Your Shipment | TrackPoint Global',
  description: 'Enter your tracking number to get real-time updates on your shipment status, location, and estimated delivery date.',
};

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Real-Time Tracking
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Track Your Shipment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your TrackPoint Global tracking number to get instant updates on your package status, current location, and estimated delivery.
          </p>
        </div>

        {/* Tracking Form */}
        <TrackingHeroForm />

        {/* Help Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Where to find your tracking number
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Check the <strong>shipping confirmation email</strong> you received when your shipment was registered.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Look at the <strong>shipping label or receipt</strong> — the tracking number starts with <code className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">TPG-</code>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Contact the sender if you cannot locate your tracking number — they will have it on their shipping receipt.</span>
              </li>
            </ul>
          </div>

          {/* Support CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-3">
              Having trouble tracking your shipment?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Contact our support team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}