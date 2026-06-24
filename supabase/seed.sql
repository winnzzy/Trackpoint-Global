-- ============================================================
-- TrackPoint Global — Demo Seed Data
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
  '+234 800 555 0199',
  '123 Logistics Avenue, Victoria Island, Lagos, Nigeria',
  'Mon – Fri: 8:00 AM – 6:00 PM (WAT) | Sat: 9:00 AM – 2:00 PM',
  NULL,
  '#2563eb',
  'TrackPoint Global is a leading international courier and logistics company specializing in fast, secure, and reliable delivery services across Africa, Europe, the Americas, and the Middle East.',
  'Nigeria',
  'Lagos',
  'Our team typically responds within 2-4 business hours during office hours.',
  'Enter your tracking number exactly as shown on your shipping receipt. If you have trouble tracking your shipment, please contact our support team.'
);

-- ============================================================
-- Shipment 1: Lagos → London (In Transit)
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
  'Adebayo Ogundimu', 'adebayo.ogundimu@gmail.com', '+234 812 345 6789',
  'James Richardson', 'james.richardson@outlook.com', '+44 7700 900123',
  'Lagos', 'Nigeria', 'London', 'United Kingdom',
  'Express', 'Electronics — Wireless headphones and accessories', '2.4 kg',
  'Heathrow Airport, London',
  '2026-06-20T09:30:00Z', '2026-06-26T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Shipment Created', 'Lagos, Nigeria', 'Shipment registered and label created at Lagos sorting facility.', '2026-06-20T09:30:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Picked Up', 'Lagos, Nigeria', 'Package collected from sender at 15 Admiralty Way, Lekki Phase 1.', '2026-06-20T14:15:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Departed Origin', 'Murtala Muhammed Int''l Airport, Lagos', 'Shipment departed Lagos via air freight. Flight BA-0294.', '2026-06-21T03:45:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'In Transit', 'Istanbul, Turkey', 'Shipment in transit at Istanbul hub. Awaiting connecting flight to London.', '2026-06-22T11:20:00Z'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Arrived at Destination', 'Heathrow Airport, London', 'Shipment arrived at London Heathrow. Processing through customs.', '2026-06-23T08:10:00Z');

-- ============================================================
-- Shipment 2: Abuja → Dubai (At Customs)
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
  'Chidinma Eze', 'chidinma.eze@yahoo.com', '+234 803 987 6543',
  'Mohammed Al-Rashid', 'm.alrashid@gmail.com', '+971 50 123 4567',
  'Abuja', 'Nigeria', 'Dubai', 'United Arab Emirates',
  'International', 'Fashion items — Traditional clothing and accessories', '5.1 kg',
  'Dubai, UAE',
  '2026-06-18T11:00:00Z', '2026-06-25T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Shipment Created', 'Abuja, Nigeria', 'Shipment registered at Abuja distribution centre.', '2026-06-18T11:00:00Z'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Picked Up', 'Abuja, Nigeria', 'Package collected from sender at Wuse 2, Abuja.', '2026-06-18T16:45:00Z'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Departed Origin', 'Nnamdi Azikiwe Int''l Airport, Abuja', 'Shipment departed Abuja. Air cargo via Emirates SkyCargo EK-7812.', '2026-06-19T06:30:00Z'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'At Customs', 'Dubai, UAE', 'Shipment held at Dubai Customs for inspection and clearance. Documents under review.', '2026-06-22T14:00:00Z');

-- ============================================================
-- Shipment 3: Port Harcourt → Toronto (Delivered)
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
  'Ngozi Okafor', 'ngozi.okafor@gmail.com', '+234 805 222 3344',
  'David Chen', 'david.chen@hotmail.com', '+1 416 555 0198',
  'Port Harcourt', 'Nigeria', 'Toronto', 'Canada',
  'Standard', 'Documents — Legal papers and certificates', '0.8 kg',
  'Toronto, Canada',
  '2026-06-10T08:00:00Z', '2026-06-17T18:00:00Z', '2026-06-16T14:22:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Shipment Created', 'Port Harcourt, Nigeria', 'Shipment registered at Port Harcourt branch.', '2026-06-10T08:00:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Picked Up', 'Port Harcourt, Nigeria', 'Package collected from sender at GRA Phase 2, Port Harcourt.', '2026-06-10T13:30:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Departed Origin', 'Port Harcourt, Nigeria', 'Shipment forwarded to Lagos international hub.', '2026-06-11T05:00:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'In Transit', 'Lagos, Nigeria', 'Shipment arrived at Lagos cargo hub. Processing for international dispatch.', '2026-06-11T18:45:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Departed Origin', 'Murtala Muhammed Int''l Airport, Lagos', 'Shipment departed Lagos for Toronto via air freight. Flight AC-1523.', '2026-06-12T22:10:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'At Customs', 'Toronto Pearson Int''l Airport, Canada', 'Shipment arrived at Toronto Pearson. Processing through Canada Border Services.', '2026-06-14T06:30:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Cleared Customs', 'Toronto, Canada', 'Customs clearance completed. Shipment released for local delivery.', '2026-06-15T10:15:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Out for Delivery', 'Toronto, Canada', 'Shipment out for delivery with local courier partner.', '2026-06-16T08:30:00Z'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'Delivered', 'Toronto, Canada', 'Delivered to David Chen at 42 Bay Street, Toronto, ON. Signed by: D. Chen.', '2026-06-16T14:22:00Z');

-- ============================================================
-- Shipment 4: Kano → New York (Out for Delivery)
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
  'Fatima Ibrahim', 'fatima.ibrahim@gmail.com', '+234 806 111 2233',
  'Michael Johnson', 'mjohnson@company.com', '+1 212 555 0347',
  'Kano', 'Nigeria', 'New York', 'United States',
  'Express', 'Handcrafted leather goods — Bags and wallets', '3.2 kg',
  'New York, US',
  '2026-06-15T10:00:00Z', '2026-06-24T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Shipment Created', 'Kano, Nigeria', 'Shipment registered at Kano logistics centre.', '2026-06-15T10:00:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Picked Up', 'Kano, Nigeria', 'Package collected from sender at Sabo Market area, Kano.', '2026-06-15T15:20:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Departed Origin', 'Mallam Aminu Kano Int''l Airport', 'Shipment forwarded to Lagos for international dispatch.', '2026-06-16T07:00:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'In Transit', 'Lagos, Nigeria', 'Arrived at Lagos international cargo hub.', '2026-06-16T20:30:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Departed Origin', 'Murtala Muhammed Int''l Airport, Lagos', 'Shipment departed Lagos for New York JFK. Flight DL-0489.', '2026-06-17T23:45:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'At Customs', 'JFK Airport, New York', 'Shipment arrived at JFK. Processing through US Customs and Border Protection.', '2026-06-19T09:00:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Cleared Customs', 'New York, US', 'Customs clearance completed. Released for final mile delivery.', '2026-06-21T14:30:00Z'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80', 'Out for Delivery', 'New York, US', 'Shipment out for delivery in Manhattan. FedEx local courier.', '2026-06-23T07:45:00Z');

-- ============================================================
-- Shipment 5: Accra → Manchester (Delayed)
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
  'Kwame Asante', 'kwame.asante@mail.com', '+233 24 123 4567',
  'Sarah Williams', 'sarah.williams@gmail.com', '+44 7700 900456',
  'Accra', 'Ghana', 'Manchester', 'United Kingdom',
  'Standard', 'Artisan crafts and handmade jewellery', '1.7 kg',
  'Nairobi, Kenya',
  '2026-06-12T07:30:00Z', '2026-06-19T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Shipment Created', 'Accra, Ghana', 'Shipment registered at Accra branch office.', '2026-06-12T07:30:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Picked Up', 'Accra, Ghana', 'Package collected from sender at Osu, Accra.', '2026-06-12T12:00:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Departed Origin', 'Kotoka Int''l Airport, Accra', 'Shipment departed Accra via air cargo. Flight KQ-0567.', '2026-06-13T04:15:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'In Transit', 'Nairobi, Kenya', 'Shipment at Nairobi hub. Connecting flight delayed due to weather conditions.', '2026-06-14T10:00:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'Delayed', 'Nairobi, Kenya', 'Shipment delayed at Nairobi hub. Severe weather caused flight cancellations. Expected to resume transit within 48 hours.', '2026-06-15T16:30:00Z'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091', 'In Transit', 'Nairobi, Kenya', 'Shipment resumed transit. Departed Nairobi for London Heathrow. Flight BA-0654.', '2026-06-17T21:00:00Z');

-- ============================================================
-- Shipment 6: Lagos → Dubai (Shipment Created — new)
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
  'Oluwaseun Bakare', 'oluwaseun.bakare@outlook.com', '+234 908 765 4321',
  'Aisha Khalid', 'aisha.khalid@proton.me', '+971 55 987 6543',
  'Lagos', 'Nigeria', 'Dubai', 'United Arab Emirates',
  'International', 'Pharmaceutical samples — temperature controlled', '1.2 kg',
  'Lagos, Nigeria',
  '2026-06-24T08:00:00Z', '2026-07-01T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f809102', 'Shipment Created', 'Lagos, Nigeria', 'Shipment registered and label generated. Awaiting pickup from sender.', '2026-06-24T08:00:00Z');

-- ============================================================
-- Shipment 7: Lagos → Johannesburg (In Transit)
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
  'Emeka Nwankwo', 'emeka.nwankwo@gmail.com', '+234 810 333 4455',
  'Thandi Mokoena', 'thandi.mokoena@webmail.co.za', '+27 82 456 7890',
  'Lagos', 'Nigeria', 'Johannesburg', 'South Africa',
  'Standard', 'Computer accessories and peripherals', '4.0 kg',
  'Johannesburg, South Africa',
  '2026-06-19T12:00:00Z', '2026-06-27T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time) VALUES
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'Shipment Created', 'Lagos, Nigeria', 'Shipment registered at Ikeja logistics hub.', '2026-06-19T12:00:00Z'),
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'Picked Up', 'Lagos, Nigeria', 'Package collected from sender at Surulere, Lagos.', '2026-06-19T17:30:00Z'),
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'Departed Origin', 'Murtala Muhammed Int''l Airport, Lagos', 'Shipment departed Lagos for Johannesburg. Flight SA-0127.', '2026-06-20T23:00:00Z'),
  ('07a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'In Transit', 'Johannesburg, South Africa', 'Shipment arrived at OR Tambo Int''l Airport. Awaiting customs clearance.', '2026-06-22T06:15:00Z');