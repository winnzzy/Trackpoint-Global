"use client";

import { CheckCircle, Circle, Clock } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  note: string | null;
  event_time: string;
}

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p>No tracking events recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sorted.map((event, eventIdx) => {
          const isLatest = eventIdx === 0;
          const isLast = eventIdx === sorted.length - 1;

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    {isLatest ? (
                      <span className="h-8 w-8 rounded-full bg-orange flex items-center justify-center ring-8 ring-white">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </span>
                    ) : (
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                        <Circle className="h-3 w-3 text-gray-500" />
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1">
                    <div>
                      <p className={`text-sm font-semibold ${isLatest ? "text-navy" : "text-gray-700"}`}>
                        {event.status}
                      </p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      {event.note && (
                        <p className="mt-1 text-sm text-gray-600">{event.note}</p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {formatDateTime(event.event_time)}
                    </div>
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