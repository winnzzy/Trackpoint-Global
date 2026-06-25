'use client';

import { STATUS_COLORS } from '@/types';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDot?: boolean;
  className?: string;
  glow?: boolean;
}

const STATUS_GLOW_MAP: Record<string, string> = {
  'Shipment Created': 'glow-blue',
  'Picked Up': 'glow-blue',
  'In Transit': 'glow-indigo',
  'At Customs': 'glow-amber',
  'Cleared Customs': 'glow-emerald',
  'Out for Delivery': 'glow-purple',
  'Delivered': 'glow-emerald',
  'Delayed': 'glow-red',
  'On Hold': 'glow-amber',
  'Returned': 'glow-red',
};

export default function StatusBadge({ status, size = 'md', showDot = true, className = '', glow = false }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
    xl: 'text-lg px-5 py-2',
  };

  const glowClass = glow ? STATUS_GLOW_MAP[status] || '' : '';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full shadow-sm ${colors.bg} ${colors.text} ${sizeClasses[size]} ${glowClass} ${className}`}
    >
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${colors.dot} shrink-0 ${glow ? 'animate-dot-pulse' : ''}`} />
      )}
      {status}
    </span>
  );
}