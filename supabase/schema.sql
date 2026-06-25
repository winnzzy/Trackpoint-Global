-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Shipment Created',
  
  -- Sender info
  sender_name TEXT NOT NULL,
  sender_email TEXT,
  sender_phone TEXT,
  
  -- Receiver info
  receiver_name TEXT NOT NULL,
  receiver_email TEXT,
  receiver_phone TEXT,
  
  -- Shipping details
  origin_city TEXT NOT NULL,
  origin_country TEXT,
  destination_city TEXT NOT NULL,
  destination_country TEXT,
  shipment_type TEXT NOT NULL DEFAULT 'Standard',
  package_description TEXT,
  package_weight TEXT,
  
  -- Dates
  shipped_at TIMESTAMPTZ,
  estimated_delivery TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  
  -- Current location
  current_location TEXT,
  
  -- Metadata
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracking events table
CREATE TABLE IF NOT EXISTS tracking_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  location TEXT,
  note TEXT,
  event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company settings table (single-row config)
CREATE TABLE IF NOT EXISTS company_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'TrackPoint Global',
  tagline TEXT DEFAULT 'Fast, Reliable, Global Courier Services',
  support_email TEXT DEFAULT 'support@trackpointglobal.com',
  support_phone TEXT DEFAULT '+1 (307) 555-0198',
  office_address TEXT DEFAULT '30 N Gould St, Sheridan, WY 82801, United States',
  business_hours TEXT DEFAULT 'Mon – Fri: 8:00 AM – 6:00 PM (MST) | Sat: 9:00 AM – 2:00 PM',
  logo_url TEXT,
  brand_color TEXT DEFAULT '#E8600A',
  company_description TEXT DEFAULT 'TrackPoint Global is a leading international courier and logistics company specializing in fast, secure, and reliable delivery services across the Americas, Europe, Asia-Pacific, and the Middle East.',
  default_origin_country TEXT DEFAULT 'United States',
  default_origin_city TEXT DEFAULT 'Sheridan',
  default_support_response TEXT DEFAULT 'Our team typically responds within 2-4 business hours during office hours.',
  default_tracking_help TEXT DEFAULT 'Enter your tracking number exactly as shown on your shipping receipt. If you have trouble tracking your shipment, please contact our support team.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id ON tracking_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_event_time ON tracking_events(event_time);

-- Row Level Security
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;

-- Admin-only policies for shipments (using auth.uid() for authenticated users)
CREATE POLICY "Admin can manage shipments" ON shipments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage tracking events" ON tracking_events
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage settings" ON company_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for company_settings (so public pages can read company info)
CREATE POLICY "Public can read company settings" ON company_settings
  FOR SELECT USING (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_shipments_updated_at
  BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_settings_updated_at
  BEFORE UPDATE ON company_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();