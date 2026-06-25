'use client';

import { useState, useEffect } from 'react';
import { Shipment } from '@/types';
import StatusBadge from '@/components/shared/StatusBadge';
import TrackingTimeline from '@/components/shared/TrackingTimeline';
import JourneyProgress from '@/components/shared/JourneyProgress';
import AnimatedSection from '@/components/shared/AnimatedSection';
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

  // ─── Loading State ───
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          {/* Back skeleton */}
          <div className="h-5 w-40 shimmer-bg rounded-md mb-8" />

          {/* Hero skeleton */}
          <div className="rounded-2xl overflow-hidden mb-8">
            <div className="h-48 shimmer-bg" />
          </div>

          {/* Journey skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <div className="h-5 w-48 shimmer-bg rounded mb-6" />
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 shimmer-bg rounded-full" />
                  <div className="h-3 w-12 shimmer-bg rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 shimmer-bg rounded-xl" />
            ))}
          </div>

          {/* Timeline skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
            <div className="h-6 w-40 shimmer-bg rounded" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 shimmer-bg rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 shimmer-bg rounded" />
                  <div className="h-3 w-48 shimmer-bg rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Tracking text */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-500">
                Looking up <span className="font-mono text-gray-700 font-medium">{trackingNumber}</span>…
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Error State ───
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 border border-red-100 mb-6">
              <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">{error}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try again
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium px-6 py-3 transition-colors"
              >
                Contact support
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Not Found State ───
  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-50 border border-amber-100 mb-6">
              <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipment Not Found</h2>
            <p className="text-gray-500 mb-3">We couldn't find a shipment with tracking number</p>
            <div className="inline-block font-mono text-lg text-gray-800 bg-gray-100 px-4 py-2 rounded-lg mb-8 border border-gray-200">
              {trackingNumber}
            </div>

            {/* Verification tips */}
            <div className="bg-white rounded-2xl p-6 text-left max-w-md mx-auto border border-gray-100 shadow-sm mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Please verify
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                  Check that you entered the full tracking number correctly
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                  Tracking numbers start with <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">TPG-</code>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                  It may take a few hours for new shipments to appear
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Try another number
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium px-6 py-3 transition-colors"
              >
                Contact support
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!shipment) return null;

  // ─── Helpers ───
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatRelative = (dateStr?: string) => {
    if (!dateStr) return '';
    const now = new Date();
    const then = new Date(dateStr);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return '';
  };

  const events = shipment.tracking_events || [];
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  );
  const latestEvent = sortedEvents.length > 0 ? sortedEvents[0] : null;

  const isDelivered = shipment.status === 'Delivered';
  const isDelayed = shipment.status === 'Delayed' || shipment.status === 'On Hold';
  const isReturned = shipment.status === 'Returned';

  // Get hero gradient based on status
  const heroGradient = isDelivered
    ? 'from-emerald-600 via-emerald-500 to-teal-500'
    : isDelayed
    ? 'from-amber-600 via-orange-500 to-red-500'
    : isReturned
    ? 'from-gray-600 via-gray-500 to-gray-400'
    : 'from-blue-600 via-indigo-500 to-violet-500';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24">

        {/* ── Back Link ── */}
        <AnimatedSection animation="fade-in" delay={0}>
          <Link
            href="/track"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Track another shipment
          </Link>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════
           SECTION A — Status Hero
           ═══════════════════════════════════════════ */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl shadow-blue-900/10">
            {/* Hero background with gradient */}
            <div className={`bg-gradient-to-br ${heroGradient} relative`}>
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-[0.08]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />

              {/* Content */}
              <div className="relative px-6 sm:px-8 py-8 sm:py-10">
                <div className="flex flex-col gap-6">
                  {/* Top row: tracking number + status */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5">Tracking Number</p>
                      <p className="text-white text-2xl sm:text-3xl font-bold font-mono tracking-wider">
                        {shipment.tracking_number}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 sm:mt-1">
                      <StatusBadge status={shipment.status} size="lg" glow className="!bg-white/15 !text-white !border-white/20 backdrop-blur-sm !shadow-none" />
                    </div>
                  </div>

                  {/* Route info row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-4 border-t border-white/15">
                    {/* Origin */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/50 text-[10px] uppercase tracking-wider">Origin</p>
                        <p className="text-white text-sm font-semibold">{shipment.origin_city}{shipment.origin_country ? `, ${shipment.origin_country}` : ''}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex items-center gap-2 flex-1 min-w-[80px]">
                      <div className="flex-1 h-px bg-white/20 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 animate-glow" />
                      </div>
                      <svg className="w-4 h-4 text-white/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/50 text-[10px] uppercase tracking-wider">Destination</p>
                        <p className="text-white text-sm font-semibold">{shipment.destination_city}{shipment.destination_country ? `, ${shipment.destination_country}` : ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: meta info chips */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                    {shipment.current_location && (
                      <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/90">
                        <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="font-medium">Current:</span> {shipment.current_location}
                      </div>
                    )}
                    {shipment.estimated_delivery && (
                      <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/90">
                        <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">ETA:</span> {formatDate(shipment.estimated_delivery)}
                      </div>
                    )}
                    {latestEvent && (
                      <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/90">
                        <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Updated:</span> {formatRelative(latestEvent.event_time) || formatDate(latestEvent.event_time)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Latest event strip below hero */}
            {latestEvent && (
              <div className="bg-white px-6 sm:px-8 py-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-dot-pulse" />
                    <span className="text-gray-400 text-xs">Latest update</span>
                  </div>
                  <span className="font-semibold text-gray-900">{latestEvent.status}</span>
                  {latestEvent.location && (
                    <span className="text-gray-500 flex items-center gap-1 text-xs">
                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {latestEvent.location}
                    </span>
                  )}
                  {latestEvent.description && (
                    <span className="text-gray-400 text-xs sm:ml-auto truncate max-w-[200px]">{latestEvent.description}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════
           SECTION B — Journey Progress
           ═══════════════════════════════════════════ */}
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Shipment Journey
            </h3>
            <JourneyProgress shipment={shipment} />
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════
           SECTION C — Summary Info Grid
           ═══════════════════════════════════════════ */}
        <AnimatedSection animation="fade-up" delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Shipment Type */}
            <div className="tracking-card bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Service</p>
              </div>
              <p className="text-sm font-bold text-gray-900">{shipment.shipment_type}</p>
              {shipment.package_weight && (
                <p className="text-xs text-gray-400 mt-1">{shipment.package_weight}</p>
              )}
            </div>

            {/* Sender */}
            <div className="tracking-card bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Sender</p>
              </div>
              <p className="text-sm font-bold text-gray-900 truncate">{shipment.sender_name}</p>
            </div>

            {/* Receiver */}
            <div className="tracking-card bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Receiver</p>
              </div>
              <p className="text-sm font-bold text-gray-900 truncate">{shipment.receiver_name}</p>
            </div>

            {/* ETA / Delivery Date */}
            <div className="tracking-card bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDelivered ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  <svg className={`w-4 h-4 ${isDelivered ? 'text-emerald-500' : 'text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{isDelivered ? 'Delivered' : 'ETA'}</p>
              </div>
              <p className="text-sm font-bold text-gray-900">
                {isDelivered ? formatDate(shipment.delivered_at) : formatDate(shipment.estimated_delivery)}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════
           SECTION D — Additional Details + Timeline
           ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Additional details */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="fade-up" delay={350}>
              <div className="space-y-4">
                {/* Package details */}
                {(shipment.package_description || shipment.package_weight) && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 tracking-card">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Package Details
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Type</span>
                        <span className="font-semibold text-gray-900">{shipment.shipment_type}</span>
                      </div>
                      {shipment.package_description && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Contents</span>
                          <span className="font-medium text-gray-900 text-right max-w-[55%]">{shipment.package_description}</span>
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
                )}

                {/* Dates */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 tracking-card">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Dates
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipped</span>
                      <span className="font-medium text-gray-900">{formatDate(shipment.shipped_at)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Est. Delivery</span>
                      <span className="font-medium text-gray-900">{formatDate(shipment.estimated_delivery)}</span>
                    </div>
                    {shipment.delivered_at && (
                      <div className="flex justify-between text-sm pt-2.5 border-t border-gray-100">
                        <span className="text-emerald-600 font-medium flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Delivered
                        </span>
                        <span className="font-bold text-emerald-600">{formatDate(shipment.delivered_at)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sender & Receiver detail */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 tracking-card">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Parties
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">From</p>
                      <p className="text-sm font-semibold text-gray-900">{shipment.sender_name}</p>
                      <p className="text-xs text-gray-500">{shipment.origin_city}{shipment.origin_country ? `, ${shipment.origin_country}` : ''}</p>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">To</p>
                      <p className="text-sm font-semibold text-gray-900">{shipment.receiver_name}</p>
                      <p className="text-xs text-gray-500">{shipment.destination_city}{shipment.destination_country ? `, ${shipment.destination_country}` : ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h3 className="text-base font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tracking History
                  <span className="text-xs font-normal text-gray-400 ml-auto bg-gray-50 px-2.5 py-1 rounded-full">
                    {events.length} {events.length === 1 ? 'event' : 'events'}
                  </span>
                </h3>
                <TrackingTimeline events={events} />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
           SECTION E — Support CTA
           ═══════════════════════════════════════════ */}
        <AnimatedSection animation="fade-up" delay={500}>
          <div className="mt-12">
            {/* Delayed/issue CTA */}
            {(isDelayed || isReturned) && (
              <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-6 mb-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 mb-3">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-amber-900 mb-1">Need help with this shipment?</h4>
                <p className="text-xs text-amber-700 mb-4">Our support team can provide more details about the current status.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Contact Support
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Standard footer */}
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Questions about this shipment?{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}