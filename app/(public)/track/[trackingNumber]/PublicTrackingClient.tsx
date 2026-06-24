'use client';

import { useState, useEffect } from 'react';
import { Shipment } from '@/types';
import StatusBadge from '@/components/shared/StatusBadge';
import TrackingTimeline from '@/components/shared/TrackingTimeline';
import Link from 'next/link';

interface PublicTrackingClientProps {
  trackingNumber: string;
}

export default function PublicTrackingClient({ trackingNumber }: PublicTrackingClientProps) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipment = async () => {
      setLoading(true);
      setNotFound(false);
      setError('');

      try {
        const res = await fetch(`/api/track/${encodeURIComponent(trackingNumber)}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) {
          throw new Error('Failed to fetch tracking information');
        }
        const data = await res.json();
        if (!data.shipment) {
          setNotFound(true);
        } else {
          setShipment(data.shipment);
        }
      } catch (err) {
        setError('Unable to load tracking information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [trackingNumber]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
              <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Looking up your shipment…</h2>
            <p className="text-gray-500">Searching for tracking number <span className="font-mono text-gray-700">{trackingNumber}</span></p>
          </div>

          {/* Skeleton loader */}
          <div className="mt-12 space-y-6 animate-pulse">
            <div className="h-32 bg-gray-100 rounded-2xl" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-xl" />
              ))}
            </div>
            <div className="h-64 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/track"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Try again
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
            <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Shipment Not Found</h2>
          <p className="text-gray-600 mb-2">
            We couldn't find a shipment with tracking number
          </p>
          <p className="font-mono text-lg text-gray-800 bg-gray-100 inline-block px-4 py-2 rounded-lg mb-6">
            {trackingNumber}
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Please verify:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  Check that you entered the full tracking number correctly
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  Tracking numbers start with <code className="bg-gray-200 text-gray-700 px-1 rounded text-xs font-mono">TPG-</code>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  It may take a few hours for new shipments to appear in the system
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try another number
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-6 py-3 transition"
              >
                Contact support
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!shipment) return null;

  // Format dates
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const events = shipment.tracking_events || [];
  const latestEvent = events.length > 0
    ? [...events].sort((a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime())[0]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/track"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Track another shipment
        </Link>

        {/* Status Hero */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Tracking Number</p>
                <p className="text-white text-xl sm:text-2xl font-bold font-mono tracking-wide">
                  {shipment.tracking_number}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={shipment.status} size="lg" />
              </div>
            </div>
          </div>
          {latestEvent && (
            <div className="px-6 sm:px-8 py-4 bg-blue-50/50 border-t border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                <span className="text-gray-500">Latest update:</span>
                <span className="font-medium text-gray-900">{latestEvent.status}</span>
                {latestEvent.location && (
                  <span className="text-gray-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {latestEvent.location}
                  </span>
                )}
                <span className="text-gray-400 text-xs sm:ml-auto">
                  {formatDate(latestEvent.event_time)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Shipment Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Route Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Route</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">From</p>
                  <p className="text-sm font-semibold text-gray-900">{shipment.origin_city}</p>
                  {shipment.origin_country && (
                    <p className="text-xs text-gray-500">{shipment.origin_country}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">To</p>
                  <p className="text-sm font-semibold text-gray-900">{shipment.destination_city}</p>
                  {shipment.destination_country && (
                    <p className="text-xs text-gray-500">{shipment.destination_country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sender Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Sender</h3>
              <p className="text-sm font-semibold text-gray-900">{shipment.sender_name}</p>
            </div>

            {/* Receiver Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Receiver</h3>
              <p className="text-sm font-semibold text-gray-900">{shipment.receiver_name}</p>
            </div>

            {/* Package Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Package Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900">{shipment.shipment_type}</span>
                </div>
                {shipment.package_description && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Contents</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%]">{shipment.package_description}</span>
                  </div>
                )}
                {shipment.package_weight && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-medium text-gray-900">{shipment.package_weight}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dates Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Dates</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipped</span>
                  <span className="font-medium text-gray-900">{formatDate(shipment.shipped_at)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Est. Delivery</span>
                  <span className="font-medium text-gray-900">{formatDate(shipment.estimated_delivery)}</span>
                </div>
                {shipment.delivered_at && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivered</span>
                    <span className="font-medium text-emerald-600">{formatDate(shipment.delivered_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tracking History
                <span className="text-sm font-normal text-gray-400 ml-auto">
                  {events.length} {events.length === 1 ? 'event' : 'events'}
                </span>
              </h3>
              <TrackingTimeline events={events} />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Questions about this shipment?{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}