'use client';

import { TrackingEvent } from '@/types';
import { STATUS_COLORS } from '@/types';

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm">No tracking events recorded yet.</p>
      </div>
    );
  }

  // Sort events by time (most recent first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  );

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
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

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedEvents.map((event, idx) => {
          const isLatest = idx === 0;
          const isLast = idx === sortedEvents.length - 1;
          const colors = STATUS_COLORS[event.status] || {
            bg: 'bg-gray-100',
            text: 'text-gray-700',
            dot: 'bg-gray-400',
          };

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute left-5 top-10 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full shrink-0">
                    {isLatest ? (
                      <div className={`h-10 w-10 rounded-full ${colors.bg} border-2 border-white shadow-sm flex items-center justify-center`}>
                        <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Event content */}
                  <div className={`flex-1 min-w-0 ${isLatest ? '' : 'opacity-80'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            isLatest ? 'text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {event.status}
                        </span>
                        {isLatest && (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            Latest
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
                        <span>{formatTime(event.event_time)}</span>
                        <span className="text-gray-300">•</span>
                        <span>{formatHour(event.event_time)}</span>
                      </div>
                    </div>
                    {event.location && (
                      <p className="mt-1 text-sm text-gray-600 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                    )}
                    {event.description && (
                      <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}