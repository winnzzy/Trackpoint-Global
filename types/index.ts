export type ShipmentStatus =
  | "Pending"
  | "Shipment Created"
  | "Received"
  | "Processing"
  | "In Transit"
  | "At Sorting Facility"
  | "At Customs"
  | "Cleared"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed"
  | "On Hold"
  | "Returned";

export type ShipmentType = "Express" | "Standard" | "Cargo" | "Document";

export interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_phone: string | null;
  sender_email: string | null;
  receiver_name: string;
  receiver_phone: string | null;
  receiver_email: string | null;
  origin_country: string;
  origin_city: string;
  destination_country: string;
  destination_city: string;
  shipment_type: ShipmentType;
  package_description: string | null;
  package_weight: string | null;
  status: ShipmentStatus;
  current_location: string | null;
  shipped_at: string | null;
  estimated_delivery: string | null;
  delivered_at: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface TrackingEvent {
  id: string;
  shipment_id: string;
  status: ShipmentStatus;
  location: string;
  note: string | null;
  event_time: string;
  created_at: string;
}

export interface ShipmentWithEvents extends Shipment {
  tracking_events: TrackingEvent[];
}

export const SHIPMENT_STATUSES: ShipmentStatus[] = [
  "Pending",
  "Shipment Created",
  "Received",
  "Processing",
  "In Transit",
  "At Sorting Facility",
  "At Customs",
  "Cleared",
  "Out for Delivery",
  "Delivered",
  "Delayed",
  "On Hold",
  "Returned",
];

export const SHIPMENT_TYPES: ShipmentType[] = [
  "Express",
  "Standard",
  "Cargo",
  "Document",
];

export const STATUS_COLORS: Record<ShipmentStatus, string> = {
  Pending: "bg-gray-100 text-gray-700",
  "Shipment Created": "bg-blue-100 text-blue-700",
  Received: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  "In Transit": "bg-indigo-100 text-indigo-700",
  "At Sorting Facility": "bg-purple-100 text-purple-700",
  "At Customs": "bg-orange-100 text-orange-700",
  Cleared: "bg-teal-100 text-teal-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Delayed: "bg-red-100 text-red-700",
  "On Hold": "bg-amber-100 text-amber-700",
  Returned: "bg-red-100 text-red-700",
};

export const DASHBOARD_STATUSES = [
  "Pending",
  "In Transit",
  "Delivered",
  "Delayed",
  "On Hold",
] as const;

export const COUNTRIES = [
  "Nigeria",
  "United Kingdom",
  "United States",
  "Canada",
  "United Arab Emirates",
  "Germany",
  "France",
  "Ghana",
  "South Africa",
  "Kenya",
  "Netherlands",
  "Belgium",
  "China",
  "Japan",
  "Australia",
  "Brazil",
  "India",
  "Turkey",
  "Italy",
  "Spain",
] as const;
