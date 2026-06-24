"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-12 w-12 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-navy mb-3">Something Went Wrong</h1>
        <p className="text-gray-600 mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
          <Link
            href="/"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}