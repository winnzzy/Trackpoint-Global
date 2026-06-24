"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function TrackingHeroForm() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      router.push(`/track/${trackingNumber.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Enter tracking number (e.g. TPG-240620-1024)"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 shadow-lg focus:ring-2 focus:ring-orange text-base"
        />
      </div>
      <button
        type="submit"
        className="bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-colors text-base whitespace-nowrap"
      >
        Track Shipment
      </button>
    </form>
  );
}