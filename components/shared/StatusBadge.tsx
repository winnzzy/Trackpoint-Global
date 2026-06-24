import { cn } from "@/lib/utils";

const statusConfig: Record<string, { color: string; bg: string }> = {
  Pending: { color: "text-gray-700", bg: "bg-gray-100" },
  "Shipment Created": { color: "text-blue-700", bg: "bg-blue-100" },
  Received: { color: "text-blue-700", bg: "bg-blue-100" },
  Processing: { color: "text-indigo-700", bg: "bg-indigo-100" },
  "In Transit": { color: "text-amber-700", bg: "bg-amber-100" },
  "At Sorting Facility": { color: "text-purple-700", bg: "bg-purple-100" },
  "At Customs": { color: "text-orange-dark", bg: "bg-orange/10" },
  Cleared: { color: "text-teal-700", bg: "bg-teal-100" },
  "Out for Delivery": { color: "text-cyan-700", bg: "bg-cyan-100" },
  Delivered: { color: "text-green-700", bg: "bg-green-100" },
  Delayed: { color: "text-red-700", bg: "bg-red-100" },
  "On Hold": { color: "text-red-700", bg: "bg-red-100" },
  Returned: { color: "text-gray-700", bg: "bg-gray-200" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { color: "text-gray-700", bg: "bg-gray-100" };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.bg,
        config.color,
        className
      )}
    >
      {status}
    </span>
  );
}