-- ============================================================
-- TrackPoint Global — Demo Seed Data (International)
-- ============================================================

-- Company settings (default row)
INSERT INTO company_settings (
  company_name, tagline, support_email, support_phone, office_address,
  business_hours, logo_url, brand_color, company_description,
  default_origin_country, default_origin_city,
  default_support_response, default_tracking_help
) VALUES (
  'TrackPoint Global',
  'Fast, Reliable, Global Courier Services',
  'support@trackpointglobal.com',
  '+1 (307) 555-0198',
  '30 N Gould St, Sheridan, WY 82801, United States',
  'Mon – Fri: 8:00 AM – 6:00 PM (MST) | Sat: 9:00 AM – 2:00 PM',
  NULL,
  '#E8600A',
  'TrackPoint Global is a leading international courier and logistics company specializing in fast, secure, and reliable delivery services across the Americas, Europe, Asia-Pacific, and the Middle East.',
  'United States',
  'Sheridan',
  'Our team typically responds within 2-4 business hours during office hours.',
  'Enter your tracking number exactly as shown on your shipping receipt. If you have trouble tracking your shipment, please contact our support team.'
);

-- ============================================================
-- Shipment 1: Sheridan → London (In Transit)
-- ============================================================
INSERT INTO shipments (
  id, tracking_number, status,
  sender_name, sender_email, sender_phone,
  receiver_name, receiver_email, receiver_phone,
  origin_city, origin_country, destination_city, destination_country,
  shipment_type, package_description, package_weight,
  current_location, shipped_at, estimated_delivery
) VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'TPG-2026-00147',
  'In Transit',
  'Michael Carter', 'michael.carter@gmail.com', '+1 307 555 0123',
  'James Richardson', 'james.richardson@outlook.com', '+44 7700 900123',
  'Sheridan', 'United States', 'London', 'United Kingdom',
  'Express', 'Electronics — Wireless headphones and accessories', '2.4 kg',
  'Heathrow Airport, London',
  '2026-06-20T09:30:00Z', '2026-06-26T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Shipment Created', 'Sheridan, WY, United States', 'Shipment registered and label created at Sheridan sorting facility.', '2026-06-20T09:30:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Picked Up', 'Sheridan, WY, United States', 'Package collected from sender at 30 N Gould St, Sheridan.', '2026-06-20T14:15:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Departed Origin', 'Denver Int''l Airport, CO', 'Shipment departed Denver via air freight. Flight BA-0294.', '2026-06-21T03:45:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'In Transit', 'New York JFK Airport', 'Shipment in transit at JFK hub. Awaiting connecting flight to London.', '2026-06-22T11:20:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Arrived at Destination', 'Heathrow Airport, London', 'Shipment arrived at London Heathrow. Processing through customs.', '2026-06-23T08:10:00Z');

-- ============================================================
-- Shipment 2: New York → Dubai (At Customs)
-- ============================================================
INSERT INTO shipments (
  id, tracking_number, status,
  sender_name, sender_email, sender_phone,
  receiver_name, receiver_email, receiver_phone,
  origin_city, origin_country, destination_city, destination_country,
  shipment_type, package_description, package_weight,
  current_location, shipped_at, estimated_delivery
) VALUES (
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'TPG-2026-00152',
  'At Customs',
  'Sarah Mitchell', 'sarah.mitchell@yahoo.com', '+1 212 555 0456',
  'Mohammed Al-Rashid', 'm.alrashid@gmail.com', '+971 50 123 4567',
  'New York', 'United States', 'Dubai', 'United Arab Emirates',
  'International', 'Fashion items — Designer clothing and accessories', '5.1 kg',
  'Dubai, UAE',
  '2026-06-18T11:00:00Z', '2026-06-25T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Shipment Created', 'New York, United States', 'Shipment registered at New York distribution centre.', '2026-06-18T11:00:00Z'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Picked Up', 'New York, United States', 'Package collected from sender at Manhattan, New York.', '2026-06-18T16:45:00Z'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Departed Origin', 'JFK Int''l Airport, New York', 'Shipment departed New York. Air cargo via Emirates SkyCargo EK-7812.', '2026-06-19T06:30:00Z'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'At Customs', 'Dubai, UAE', 'Shipment held at Dubai Customs for inspection and clearance. Documents under review.', '2026-06-22T14:00:00Z');

-- ============================================================
-- Shipment 3: Chicago → Toronto (Delivered)
-- ============================================================
INSERT INTO shipments (
  id, tracking_number, status,
  sender_name, sender_email, sender_phone,
  receiver_name, receiver_email, receiver_phone,
  origin_city, origin_country, destination_city, destination_country,
  shipment_type, package_description, package_weight,
  current_location, shipped_at, estimated_delivery, delivered_at
) VALUES (
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'TPG-2026-00098',
  'Delivered',
  'Jennifer Adams', 'jennifer.adams@gmail.com', '+1 312 555 0198',
  'David Chen', 'david.chen@hotmail.com', '+1 416 555 0198',
  'Chicago', 'United States', 'Toronto', 'Canada',
  'Standard', 'Documents — Legal papers and certificates', '0.8 kg',
  'Toronto, Canada',
  '2026-06-10T08:00:00Z', '2026-06-17T18:00:00Z', '2026-06-16T14:22:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Shipment Created', 'Chicago, United States', 'Shipment registered at Chicago branch.', '2026-06-10T08:00:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Picked Up', 'Chicago, United States', 'Package collected from sender at Downtown Chicago.', '2026-06-10T13:30:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Departed Origin', 'Chicago O''Hare Int''l Airport', 'Shipment forwarded to Toronto via ground freight.', '2026-06-11T05:00:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'In Transit', 'Detroit, MI', 'Shipment arrived at Detroit crossing point. Processing for Canada entry.', '2026-06-11T18:45:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'At Customs', 'Toronto Pearson Int''l Airport, Canada', 'Shipment arrived at Toronto Pearson. Processing through Canada Border Services.', '2026-06-14T06:30:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Cleared Customs', 'Toronto, Canada', 'Customs clearance completed. Shipment released for local delivery.', '2026-06-15T10:15:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Out for Delivery', 'Toronto, Canada', 'Shipment out for delivery with local courier partner.', '2026-06-16T08:30:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Delivered', 'Toronto, Canada', 'Delivered to David Chen at 42 Bay Street, Toronto, ON. Signed by: D. Chen.', '2026-06-16T14:22:00Z');

-- ============================================================
-- Shipment 4: Los Angeles → Sydney (Out for Delivery)
-- ============================================================
INSERT INTO shipments (
  id, tracking_number, status,
  sender_name, sender_email, sender_phone,
  receiver_name, receiver_email, receiver_phone,
  origin_city, origin_country, destination_city, destination_country,
  shipment_type, package_description, package_weight,
  current_location, shipped_at, estimated_delivery
) VALUES (
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80',
  'TPG-2026-00163',
  'Out for Delivery',
  'Emily Roberts', 'emily.roberts@gmail.com', '+1 310 555 0347',
  'Liam Thompson', 'liam.thompson@email.com.au', '+61 2 9000 1234',
  'Los Angeles', 'United States', 'Sydney', 'Australia',
  'Express', 'Handcrafted leather goods — Bags and wallets', '3.2 kg',
  'Sydney, Australia',
  '2026-06-15T10:00:00Z', '2026-06-24T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Shipment Created', 'Los Angeles, United States', 'Shipment registered at LA logistics centre.', '2026-06-15T10:00:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Picked Up', 'Los Angeles, United States', 'Package collected from sender at Santa Monica, LA.', '2026-06-15T15:20:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Departed Origin', 'LAX Int''l Airport, Los Angeles', 'Shipment departed LA for Sydney via air freight. Flight QF-0012.', '2026-06-16T07:00:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'In Transit', 'Honolulu, Hawaii', 'Technical stopover in Honolulu. Connecting to Sydney flight.', '2026-06-16T20:30:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'At Customs', 'Sydney Airport, Australia', 'Shipment arrived at Sydney. Processing through Australian Border Force.', '2026-06-19T09:00:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Cleared Customs', 'Sydney, Australia', 'Customs clearance completed. Released for final mile delivery.', '2026-06-21T14:30:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Out for Delivery', 'Sydney, Australia', 'Shipment out for delivery in Sydney CBD. Local courier partner.', '2026-06-23T07:45:00Z');

-- ============================================================
-- Shipment 5: Miami → Accra, Ghana (Delayed)
-- ============================================================
INSERT INTO shipments (
  id, tracking_number, status,
  sender_name, sender_email, sender_phone,
  receiver_name, receiver_email, receiver_phone,
  origin_city, origin_country, destination_city, destination_country,
  shipment_type, package_description, package_weight,
  current_location, shipped_at, estimated_delivery
) VALUES (
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091',
  'TPG-2026-00139',
  'Delayed',
  'Carlos Mendez', 'carlos.mendez@mail.com', '+1 305 555 0789',
  'Kwame Asante', 'kwame.asante@mail.com', '+233 24 123 4567',
  'Miami', 'United States', 'Accra', 'Ghana',
  'Standard', 'Artisan crafts and handmade jewellery', '1.7 kg',
  'Nairobi, Kenya',
  '2026-06-12T07:30:00Z', '2026-06-19T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Shipment Created', 'Miami, United States', 'Shipment registered at Miami branch office.', '2026-06-12T07:30:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Picked Up', 'Miami, United States', 'Package collected from sender at Brickell, Miami.', '2026-06-12T12:00:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Departed Origin', 'Miami Int''l Airport', 'Shipment departed Miami via air cargo. Flight KQ-0567.', '2026-06-13T04:15:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'In Transit', 'Nairobi, Kenya', 'Shipment at Nairobi hub. Connecting flight delayed due to weather conditions.', '2026-06-14T10:00:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Delayed', 'Nairobi, Kenya', 'Shipment delayed at Nairobi hub. Severe weather caused flight cancellations. Expected to resume transit within 48 hours.', '2026-06-15T16:30:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'In Transit', 'Nairobi, Kenya', 'Shipment resumed transit. Departed Nairobi for Accra. Flight KQ-0210.', '2026-06-17T21:00:00Z');

-- ============================================================
-- Shipment 6: Dallas → Singapore (Shipment Created — new)
-- ============================================================
INSERT INTO shipments (
  id, tracking_number, status,
  sender_name, sender_email, sender_phone,
  receiver_name, receiver_email, receiver_phone,
  origin_city, origin_country, destination_city, destination_country,
  shipment_type, package_description, package_weight,
  current_location, shipped_at, estimated_delivery
) VALUES (
  'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f809102',
  'TPG-2026-00171',
  'Shipment Created',
  'Rachel Kim', 'rachel.kim@outlook.com', '+1 214 555 0654',
  'Wei Lin Tan', 'wei.tan@proton.me', '+65 9123 4567',
  'Dallas', 'United States', 'Singapore', 'Singapore',
  'International', 'Pharmaceutical samples — temperature controlled', '1.2 kg',
  'Dallas, TX, United States',
  '2026-06-24T08:00:00Z', '2026-07-01T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f809102', 'Shipment Created', 'Dallas, United States', 'Shipment registered and label generated. Awaiting pickup from sender.', '2026-06-24T08:00:00Z');

-- ============================================================
-- Shipment 7: Seattle → Tokyo (In Transit)
-- ============================================================
INSERT INTO shipments (
  id, tracking_number, status,
  sender_name, sender_email, sender_phone,
  receiver_name, receiver_email, receiver_phone,
  origin_city, origin_country, destination_city, destination_country,
  shipment_type, package_description, package_weight,
  current_location, shipped_at, estimated_delivery
) VALUES (
  '07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c',
  'TPG-2026-00158',
  'In Transit',
  'Daniel Brooks', 'daniel.brooks@gmail.com', '+1 206 555 0321',
  'Yuki Tanaka', 'y.tanaka@webmail.jp', '+81 90 1234 5678',
  'Seattle', 'United States', 'Tokyo', 'Japan',
  'Standard', 'Computer accessories and peripherals', '4.0 kg',
  'Tokyo, Japan',
  '2026-06-19T12:00:00Z', '2026-06-27T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'Shipment Created', 'Seattle, United States', 'Shipment registered at Seattle logistics hub.', '2026-06-19T12:00:00Z'),
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'Picked Up', 'Seattle, United States', 'Package collected from sender at Capitol Hill, Seattle.', '2026-06-19T17:30:00Z'),
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'Departed Origin', 'Seattle-Tacoma Int''l Airport', 'Shipment departed Seattle for Tokyo Narita. Flight JL-0069.', '2026-06-20T23:00:00Z'),
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'In Transit', 'Tokyo Narita Airport, Japan', 'Shipment arrived at Narita Int''l Airport. Awaiting customs clearance.', '2026-06-22T06:15:00Z');

-- ============================================================
-- Shipment Exceptions
-- ============================================================

-- Shipment 2 (NY → Dubai): Customs hold (critical)
INSERT INTO shipment_exceptions (
  shipment_id, type, title, customer_message,
  severity, location, updated_eta,
  action_required, action_label,
  reported_at
) VALUES (
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'customs_hold',
  'Customs Clearance Delayed',
  'Your shipment is currently being held at Dubai Customs for additional inspection. This may result in a delivery delay of 3–5 business days. Our team is working with customs authorities to expedite clearance.',
  'critical',
  'Dubai, UAE',
  '2026-06-28T18:00:00Z',
  true,
  'Contact Support for Assistance',
  '2026-06-22T16:00:00Z'
);

-- Shipment 5 (Miami → Accra): Weather disruption (warning, resolved)
INSERT INTO shipment_exceptions (
  shipment_id, type, title, customer_message,
  severity, status, location, updated_eta,
  action_required,
  reported_at, resolved_at
) VALUES (
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091',
  'weather_disruption',
  'Transit Delayed by Weather',
  'Your shipment experienced a weather-related delay while transiting through Nairobi. It has since resumed transit and is now en route to Accra. We expect to deliver within the updated timeframe.',
  'warning',
  'resolved',
  'Nairobi, Kenya',
  '2026-06-22T18:00:00Z',
  false,
  '2026-06-15T18:00:00Z',
  '2026-06-17T21:00:00Z'
);

-- Shipment 7 (Seattle → Tokyo): Customs processing notice (info)
INSERT INTO shipment_exceptions (
  shipment_id, type, title, customer_message,
  severity, location,
  action_required,
  reported_at
) VALUES (
  '07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c',
  'customs_hold',
  'Processing at Japanese Customs',
  'Your shipment has arrived in Tokyo and is currently being processed through Japanese Customs. This is a standard procedure for electronics shipments and typically takes 1–2 business days.',
  'info',
  'Tokyo Narita Airport, Japan',
  false,
  '2026-06-22T08:00:00Z'
);
