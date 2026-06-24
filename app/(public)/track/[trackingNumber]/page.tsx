import { getShipmentByTrackingNumber } from "@/lib/actions/shipments";
import { formatDate, formatDateTime } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import TrackingTimeline from "@/components/shared/TrackingTimeline";
import {
  Package,
  MapPin,
  User,
  Calendar,
  Truck,
  ArrowLeft,
  Weight,
  FileText,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default async function TrackingResultPage({
  params,
}: {
  params: Promise<{ trackingNumber: string }>;
}) {
  const { trackingNumber } = await params;
  const shipment = await getShipmentByTrackingNumber(trackingNumber);

  if (!shipment) {
    return (
      <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-3">Shipment Not Found</h1>
          <p className="text-gray-600 mb-6">
            We could not find a shipment with tracking number{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">
              {trackingNumber}
            </code>
            . Please verify the tracking number and try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/track"
              className="bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Try Another Number
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const events = (shipment.tracking_events || []).sort(
    (a: { event_time: string }, b: { event_time: string }) =>
      new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/track"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Tracking
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy">
                Shipment Tracking
              </h1>
              <p className="text-gray-500 font-mono text-sm mt-1">
                {shipment.tracking_number}
              </p>
            </div>
            <StatusBadge status={shipment.status} className="text-sm px-4 py-1.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-navy text-lg mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-orange" /> Shipment Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem
                  icon={<User className="h-4 w-4" />}
                  label="Sender"
                  value={shipment.sender_name}
                />
                <DetailItem
                  icon={<User className="h-4 w-4" />}
                  label="Receiver"
                  value={shipment.receiver_name}
                />
                <DetailItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Origin"
                  value={`${shipment.origin_city}, ${shipment.origin_country}`}
                />
                <DetailItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Destination"
                  value={`${shipment.destination_city}, ${shipment.destination_country}`}
                />
                <DetailItem
                  icon={<Truck className="h-4 w-4" />}
                  label="Shipment Type"
                  value={shipment.shipment_type}
                />
                <DetailItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Current Location"
                  value={shipment.current_location || "—"}
                />
                <DetailItem
                  icon={<Calendar className="h-4 w-4" />}
                  label="Shipped Date"
                  value={formatDate(shipment.shipped_at)}
                />
                <DetailItem
                  icon={<Calendar className="h-4 w-4" />}
                  label="Est. Delivery"
                  value={formatDate(shipment.estimated_delivery)}
                />
                {shipment.package_weight && (
                  <DetailItem
                    icon={<Weight className="h-4 w-4" />}
                    label="Weight"
                    value={shipment.package_weight}
                  />
                )}
                {shipment.package_description && (
                  <DetailItem
                    icon={<FileText className="h-4 w-4" />}
                    label="Package"
                    value={shipment.package_description}
                  />
                )}
                {shipment.delivered_at && (
                  <DetailItem
                    icon={<Calendar className="h-4 w-4" />}
                    label="Delivered Date"
                    value={formatDateTime(shipment.delivered_at)}
                    highlight
                  />
                )}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-navy text-lg mb-6 flex items-center gap-2">
                <Truck className="h-5 w-5 text-orange" /> Tracking Timeline
              </h2>
              <TrackingTimeline events={events} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-navy text-white rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Current Status</h3>
              <div className="text-2xl font-bold text-orange mb-2">
                {shipment.status}
              </div>
              <p className="text-gray-300 text-sm">
                Last updated: {events.length > 0 ? formatDateTime(events[0].event_time) : "—"}
              </p>
            </div>

            {/* Route Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-navy mb-4">Route</h3>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-orange" />
                  <div className="w-0.5 h-12 bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-navy" />
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="font-medium text-navy text-sm">
                      {shipment.origin_city}, {shipment.origin_country}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="font-medium text-navy text-sm">
                      {shipment.destination_city}, {shipment.destination_country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-orange/5 rounded-2xl border border-orange/20 p-6">
              <h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-orange" /> Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have questions about your shipment, our support team is here to help.
              </p>
              <Link
                href="/contact"
                className="text-sm font-medium text-orange hover:text-orange-dark transition-colors"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-sm font-medium ${highlight ? "text-green-600" : "text-navy"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}