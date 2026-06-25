'use client';

import { useState } from 'react';
import { type ShipmentException, EXCEPTION_TYPE_LABELS } from '@/types';
import Link from 'next/link';

interface ShipmentAlertsProps {
  exceptions: ShipmentException[];
}

const severityConfig = {
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    titleColor: 'text-red-900',
    textColor: 'text-red-700',
    badge: 'bg-red-100 text-red-700 border-red-200',
    glow: 'shadow-red-100/50',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    textColor: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    glow: 'shadow-amber-100/50',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    glow: 'shadow-blue-100/50',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  },
};

export default function ShipmentAlerts({ exceptions }: ShipmentAlertsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (exceptions.length === 0) return null;

  // Sort: critical first, then warning, then info
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  const sorted = [...exceptions].sort(
    (a, b) => (severityOrder[a.severity as keyof typeof severityOrder] ?? 3) - (severityOrder[b.severity as keyof typeof severityOrder] ?? 3)
  );

  const hasCritical = sorted.some((e) => e.severity === 'critical');

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="mb-8 space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${hasCritical ? 'bg-red-500' : 'bg-amber-500'} animate-pulse`}>
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-900">
          {hasCritical ? 'Important Shipment Alert' : 'Shipment Notice'}
          {exceptions.length > 1 && <span className="text-gray-400 font-normal ml-1">({exceptions.length})</span>}
        </h3>
      </div>

      {/* Alert cards */}
      {sorted.map((exception, index) => {
        const config = severityConfig[exception.severity as keyof typeof severityConfig] || severityConfig.info;
        const isExpanded = expandedId === exception.id;

        return (
          <div
            key={exception.id}
            className={`${config.bg} border ${config.border} rounded-2xl p-5 shadow-sm ${config.glow} transition-all duration-300`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3.5">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0 ${config.iconColor}`}>
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className={`text-sm font-bold ${config.titleColor}`}>{exception.title}</h4>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${config.badge}`}>
                        {exception.severity}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                      {EXCEPTION_TYPE_LABELS[exception.type as keyof typeof EXCEPTION_TYPE_LABELS] || exception.type}
                    </span>
                  </div>
                </div>

                {/* Customer message */}
                {exception.customer_message && (
                  <p className={`text-sm ${config.textColor} mt-2 leading-relaxed`}>
                    {exception.customer_message}
                  </p>
                )}

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
                  {exception.location && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {exception.location}
                    </span>
                  )}
                  {exception.updated_eta && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Updated ETA: {formatDate(exception.updated_eta)}
                    </span>
                  )}
                  {exception.reported_at && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Reported {formatDate(exception.reported_at)}
                    </span>
                  )}
                </div>

                {/* Action button */}
                {exception.action_required && (
                  <div className="mt-4">
                    {exception.action_label ? (
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md ${
                          exception.severity === 'critical'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                      >
                        {exception.action_label}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Contact support for assistance
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}