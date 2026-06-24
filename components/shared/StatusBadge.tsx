'use client';

import { STATUS_COLORS } from '@/types';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export default function StatusBadge({ status, size = 'md', showDot = true, className = '' }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${colors.bg} ${colors.text} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span className={`w-2 h-2 rounded-full ${colors.dot} shrink-0`} />
      )}
      {status}
    </span>
  );
}