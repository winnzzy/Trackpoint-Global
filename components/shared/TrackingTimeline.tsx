'use client';

import { TrackingEvent } from '@/types';
import { STATUS_COLORS } from '@/types';
import { useEffect, useRef, useState } from 'react';

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

function TimelineEventIcon({ status, isLatest }: { status: string; isLatest: boolean }) {
  const colors = STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
  };

  const iconMap: Record<string, React.ReactNode> = {
    'Shipment Created': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    'Picked Up': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    'In Transit': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    'At Customs': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    'Cleared Customs': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Out for Delivery': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    'Delivered': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    'Delayed': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'On Hold': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Returned': (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
  };

  const icon = iconMap[status] || (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <div
      className={`
        relative z-10 flex h-11 w-11 items-center justify-center rounded-full shrink-0
        transition-all duration-300
        ${isLatest ? `${colors.bg} ${colors.text} border-2 border-white shadow-lg ring-2 ${colors.dot.replace('bg-', 'ring-')}/30` : 'bg-gray-50 text-gray-400 border border-gray-200'}
      `}
    >
      {icon}
      {isLatest && (
        <span className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full ${colors.dot} animate-dot-pulse`} />
      )}
    </div>
  );
}

function TimelineCard({ event, index, isLatest, isLast, total }: {
  event: TrackingEvent;
  index: number;
  isLatest: boolean;
  isLast: boolean;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatHour = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const then = new Date(dateStr);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return '';
  };

  return (
    <div
      ref={ref}
      className="timeline-event relative pb-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms`,
      }}
    >
      {/* Connector line */}
      {!isLast && (
        <span
          className={`absolute left-[21px] top-12 -ml-px w-0.5 ${
            isLatest ? 'bg-gradient-to-b from-blue-300 to-gray-200' : 'bg-gray-200'
          }`}
          style={{ height: 'calc(100% - 24px)' }}
          aria-hidden="true"
        />
      )}

      <div className="relative flex items-start gap-4 group">
        {/* Timeline icon node */}
        <TimelineEventIcon status={event.status} isLatest={isLatest} />

        {/* Event card */}
        <div
          className={`
            flex-1 min-w-0 rounded-xl p-4 transition-all duration-200
            ${isLatest
              ? 'bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-200/60 shadow-sm'
              : 'bg-white border border-gray-100 group-hover:border-gray-200 group-hover:shadow-sm'
            }
          `}
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-sm font-semibold ${
                  isLatest ? 'text-gray-900' : 'text-gray-700'
                }`}
              >
                {event.status}
              </span>
              {isLatest && (
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-md">
                  Latest
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 sm:ml-auto shrink-0">
              {isLatest && timeAgo(event.event_time) && (
                <>
                  <span className="text-blue-500 font-medium">{timeAgo(event.event_time)}</span>
                  <span className="text-gray-300">·</span>
                </>
              )}
              <span>{formatTime(event.event_time)}</span>
              <span className="text-gray-300">·</span>
              <span className="font-medium text-gray-500">{formatHour(event.event_time)}</span>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <p className={`mt-2 text-sm flex items-center gap-1.5 ${isLatest ? 'text-blue-700' : 'text-gray-600'}`}>
              <svg className={`w-3.5 h-3.5 shrink-0 ${isLatest ? 'text-blue-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </p>
          )}

          {/* Description / Note */}
          {(event.description || event.note) && (
            <p className={`mt-2 text-sm ${isLatest ? 'text-blue-600/80' : 'text-gray-500'}`}>
              {event.description || event.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No tracking events recorded yet</p>
        <p className="text-xs text-gray-400 mt-1">Events will appear here as your shipment progresses</p>
      </div>
    );
  }

  // Sort events: most recent first
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  );

  return (
    <div className="flow-root">
      <ul className="space-y-0">
        {sortedEvents.map((event, idx) => {
          const isLatest = idx === 0;
          const isLast = idx === sortedEvents.length - 1;

          return (
            <li key={event.id}>
              <TimelineCard
                event={event}
                index={idx}
                isLatest={isLatest}
                isLast={isLast}
                total={sortedEvents.length}
              />
            </li>
          );
        })}
      </ul>

      {/* Bottom decorative element */}
      <div className="flex items-center gap-3 mt-2 pl-[5px]">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <span className="text-xs text-gray-400 italic">Shipment registered in system</span>
      </div>
    </div>
  );
}