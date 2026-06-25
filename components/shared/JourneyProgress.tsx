'use client';

import { Shipment } from '@/types';

interface JourneyProgressProps {
  shipment: Shipment;
}

const JOURNEY_STEPS = [
  'Shipment Created',
  'Picked Up',
  'In Transit',
  'At Customs',
  'Cleared Customs',
  'Out for Delivery',
  'Delivered',
] as const;

const SPECIAL_STATUSES: Record<string, { label: string; color: string; icon: string }> = {
  'Delayed': { label: 'Delayed', color: 'text-red-600', icon: '⚠' },
  'On Hold': { label: 'On Hold', color: 'text-orange-600', icon: '⏸' },
  'Returned': { label: 'Returned', color: 'text-gray-600', icon: '↩' },
};

function getStepIcon(step: string): string {
  const icons: Record<string, string> = {
    'Shipment Created': '📋',
    'Picked Up': '📦',
    'In Transit': '✈️',
    'At Customs': '🛃',
    'Cleared Customs': '✅',
    'Out for Delivery': '🚚',
    'Delivered': '🎉',
  };
  return icons[step] || '📍';
}

function getStepIndex(status: string): number {
  // Check exact match first
  const exactIdx = JOURNEY_STEPS.indexOf(status as (typeof JOURNEY_STEPS)[number]);
  if (exactIdx !== -1) return exactIdx;

  // Fuzzy matching for statuses that map to journey steps
  const statusLower = status.toLowerCase();
  if (statusLower.includes('delivered')) return 6;
  if (statusLower.includes('delivery')) return 5;
  if (statusLower.includes('cleared')) return 4;
  if (statusLower.includes('customs')) return 3;
  if (statusLower.includes('transit')) return 2;
  if (statusLower.includes('picked') || statusLower.includes('pickup')) return 1;
  if (statusLower.includes('created') || statusLower.includes('registered')) return 0;

  return -1; // Special status (Delayed, On Hold, Returned)
}

export default function JourneyProgress({ shipment }: JourneyProgressProps) {
  const status = shipment.status;
  const currentStepIndex = getStepIndex(status);
  const isSpecial = SPECIAL_STATUSES[status];
  const isDelivered = status === 'Delivered';

  // For special statuses like Delayed, On Hold, Returned
  // show progress up to where it was plus the special indicator
  let effectiveStepIndex = currentStepIndex;

  // If it's a special status, try to determine how far along the shipment got
  // by looking at the tracking events
  if (currentStepIndex === -1 && shipment.tracking_events) {
    const eventStatuses = shipment.tracking_events.map((e) => e.status);
    let maxIdx = -1;
    for (const es of eventStatuses) {
      const idx = getStepIndex(es);
      if (idx > maxIdx) maxIdx = idx;
    }
    effectiveStepIndex = Math.max(maxIdx, 0);
  }

  return (
    <div className="w-full">
      {/* Special status indicator */}
      {isSpecial && (
        <div className="flex items-center gap-2 mb-5 px-1">
          <span className={`text-lg ${isSpecial.color}`}>{isSpecial.icon}</span>
          <span className={`text-sm font-semibold ${isSpecial.color}`}>
            Shipment is currently <span className="underline decoration-dotted underline-offset-2">{status}</span>
          </span>
        </div>
      )}

      {/* Desktop progress bar */}
      <div className="hidden sm:block">
        <div className="relative flex items-start justify-between">
          {/* Progress rail background */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full z-0" />

          {/* Progress rail filled */}
          <div
            className="absolute top-5 left-0 h-1 rounded-full z-[1] transition-all duration-1000 ease-out"
            style={{
              width: isDelivered
                ? '100%'
                : effectiveStepIndex >= 0
                ? `${(effectiveStepIndex / (JOURNEY_STEPS.length - 1)) * 100}%`
                : '0%',
              background: isDelivered
                ? 'linear-gradient(90deg, #10b981, #22c55e)'
                : 'linear-gradient(90deg, #3b82f6, #6366f1)',
              animation: 'progress-fill 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          />

          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === effectiveStepIndex;
            const isCompleted = idx < effectiveStepIndex;
            const isFuture = idx > effectiveStepIndex;

            return (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center"
                style={{ width: `${100 / JOURNEY_STEPS.length}%` }}
              >
                {/* Step node */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm
                    border-2 transition-all duration-500
                    ${
                      isCompleted
                        ? isDelivered
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200'
                          : 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-200'
                        : isActive
                        ? isDelivered
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-lg shadow-emerald-100 animate-pulse-glow'
                          : 'bg-blue-50 border-blue-400 text-blue-600 shadow-lg shadow-blue-100 animate-pulse-glow'
                        : 'bg-white border-gray-200 text-gray-400'
                    }
                  `}
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs">{getStepIcon(step)}</span>
                  )}
                </div>

                {/* Step label */}
                <span
                  className={`
                    mt-2.5 text-[11px] leading-tight text-center font-medium transition-colors duration-300
                    ${
                      isActive
                        ? isDelivered
                          ? 'text-emerald-700 font-semibold'
                          : 'text-blue-700 font-semibold'
                        : isCompleted
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {step}
                </span>

                {/* Active indicator */}
                {isActive && !isDelivered && (
                  <span className="mt-1 text-[9px] uppercase tracking-widest font-bold text-blue-500 animate-glow">
                    Current
                  </span>
                )}

                {/* Delivered indicator */}
                {isDelivered && step === 'Delivered' && isActive && (
                  <span className="mt-1 text-[9px] uppercase tracking-widest font-bold text-emerald-600 animate-glow">
                    Complete
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile progress - vertical */}
      <div className="sm:hidden">
        <div className="flex flex-col gap-0">
          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === effectiveStepIndex;
            const isCompleted = idx < effectiveStepIndex;
            const isLast = idx === JOURNEY_STEPS.length - 1;

            return (
              <div key={step} className="flex items-start gap-3">
                {/* Vertical line + dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0
                      border-2
                      ${
                        isCompleted
                          ? isDelivered
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-blue-500 border-blue-500 text-white'
                          : isActive
                          ? isDelivered
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-600'
                            : 'bg-blue-50 border-blue-400 text-blue-600'
                          : 'bg-white border-gray-200 text-gray-400'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-[10px]">{getStepIcon(step)}</span>
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={`w-0.5 h-6 ${
                        isCompleted
                          ? isDelivered
                            ? 'bg-emerald-400'
                            : 'bg-blue-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>

                {/* Label */}
                <div className="pt-1 pb-2">
                  <span
                    className={`text-xs font-medium ${
                      isActive
                        ? isDelivered
                          ? 'text-emerald-700 font-semibold'
                          : 'text-blue-700 font-semibold'
                        : isCompleted
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </span>
                  {isActive && !isDelivered && (
                    <span className="ml-2 text-[9px] uppercase tracking-widest font-bold text-blue-500">
                      Current
                    </span>
                  )}
                  {isActive && isDelivered && step === 'Delivered' && (
                    <span className="ml-2 text-[9px] uppercase tracking-widest font-bold text-emerald-600">
                      Complete
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}