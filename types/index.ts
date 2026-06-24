export interface Shipment {
  id: string;
  tracking_number: string;
  status: string;
  sender_name: string;
  sender_email?: string;
  sender_phone?: string;
  receiver_name: string;
  receiver_email?: string;
  receiver_phone?: string;
  origin_city: string;
  origin_country?: string;
  destination_city: string;
  destination_country?: string;
  shipment_type: string;
  package_description?: string;
  package_weight?: string;
  shipped_at?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  current_location?: string;
  admin_note?: string;
  created_at: string;
  updated_at: string;
  tracking_events?: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  shipment_id?: string;
  status: string;
  location?: string;
  note?: string | null;
  description?: string | null;
  event_time: string;
  created_at: string;
}

export interface CompanySettings {
  id: string;
  company_name: string;
  tagline: string;
  support_email: string;
  support_phone: string;
  office_address: string;
  business_hours: string;
  logo_url: string | null;
  brand_color: string;
  company_description: string;
  default_origin_country: string;
  default_origin_city: string;
  default_support_response: string;
  default_tracking_help: string;
  created_at: string;
  updated_at: string;
}

export type ShipmentStatus =
  | 'Shipment Created'
  | 'Picked Up'
  | 'In Transit'
  | 'At Customs'
  | 'Cleared Customs'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Delayed'
  | 'On Hold'
  | 'Returned';

export const SHIPMENT_STATUSES: ShipmentStatus[] = [
  'Shipment Created',
  'Picked Up',
  'In Transit',
  'At Customs',
  'Cleared Customs',
  'Out for Delivery',
  'Delivered',
  'Delayed',
  'On Hold',
  'Returned',
];

export const SHIPMENT_TYPES = ['Standard', 'Express', 'International', 'Same Day', 'Economy'] as const;

export const COUNTRIES = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'United Kingdom',
  'United States',
  'Canada',
  'United Arab Emirates',
  'Germany',
  'France',
  'Netherlands',
  'Turkey',
  'China',
  'India',
  'Brazil',
  'Australia',
  'Japan',
  'Saudi Arabia',
  'Egypt',
  'Ethiopia',
] as const;

export const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Shipment Created': { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' },
  'Picked Up': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  'In Transit': { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  'At Customs': { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Cleared Customs': { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
  'Out for Delivery': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Delivered': { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Delayed': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  'On Hold': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Returned': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
};