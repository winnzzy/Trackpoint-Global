"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package, ArrowRight } from "lucide-react";

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      router.push(`/track/${trackingNumber.trim()}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center w-full">
        <div className="bg-orange/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="h-10 w-10 text-orange" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Track Your Shipment
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Enter your tracking number to see the latest shipment updates and delivery status.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. TPG-240620-1024"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-gray-900 focus:ring-0 text-base bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-xl font-semibold transition-colors text-base whitespace-nowrap flex items-center justify-center gap-2"
            >
              Track <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>
        <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200 text-sm text-gray-500">
          <p className="font-medium text-gray-700 mb-1">Demo tracking numbers:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["TPG-240620-1024", "TPG-240618-3387", "TPG-240615-7742", "TPG-240619-5501", "TPG-240621-8890"].map((tn) => (
              <button
                key={tn}
                onClick={() => router.push(`/track/${tn}`)}
                className="bg-gray-100 hover:bg-orange/10 text-gray-700 hover:text-orange px-3 py-1.5 rounded-lg font-mono text-xs transition-colors"
              >
                {tn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}