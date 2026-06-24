import Link from "next/link";
import { Package, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold text-navy mb-3">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/track"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Track Shipment
          </Link>
        </div>
      </div>
    </div>
  );
}