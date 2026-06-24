-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number TEXT UNIQUE NOT NULL,
  sender_name TEXT NOT NULL,
  sender_phone TEXT,
  sender_email TEXT,
  receiver_name TEXT NOT NULL,
  receiver_phone TEXT,
  receiver_email TEXT,
  origin_country TEXT NOT NULL,
  origin_city TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  shipment_type TEXT NOT NULL CHECK (shipment_type IN ('Express', 'Standard', 'Cargo', 'Document')),
  package_description TEXT,
  package_weight TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  current_location TEXT,
  shipped_at TIMESTAMPTZ,
  estimated_delivery TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tracking_events table
CREATE TABLE IF NOT EXISTS tracking_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  note TEXT,
  event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id ON tracking_events(shipment_id);

-- Enable Row Level Security
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to shipments (for tracking page)
CREATE POLICY "Allow public read access to shipments"
  ON shipments FOR SELECT
  USING (true);

-- Policy: Allow public read access to tracking events
CREATE POLICY "Allow public read access to tracking events"
  ON tracking_events FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert shipments
CREATE POLICY "Authenticated users can insert shipments"
  ON shipments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users can update shipments
CREATE POLICY "Authenticated users can update shipments"
  ON shipments FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users can delete shipments
CREATE POLICY "Authenticated users can delete shipments"
  ON shipments FOR DELETE
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users can insert tracking events
CREATE POLICY "Authenticated users can insert tracking events"
  ON tracking_events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users can update tracking events
CREATE POLICY "Authenticated users can update tracking events"
  ON tracking_events FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users can delete tracking events
CREATE POLICY "Authenticated users can delete tracking events"
  ON tracking_events FOR DELETE
  USING (auth.role() = 'authenticated');