-- Seed data for TrackPoint Global
-- Run this after schema.sql to populate demo data

-- Shipment 1: In Transit
INSERT INTO shipments (
  tracking_number, sender_name, sender_phone, sender_email,
  receiver_name, receiver_phone, receiver_email,
  origin_country, origin_city, destination_country, destination_city,
  shipment_type, package_description, package_weight,
  status, current_location, shipped_at, estimated_delivery
) VALUES (
  'TPG-240620-1024', 'Adebayo Holdings Ltd', '+234 802 345 6789', 'adebayo@holdings.ng',
  'James Robertson', '+44 7911 123456', 'james.robertson@outlook.com',
  'Nigeria', 'Lagos', 'United Kingdom', 'London',
  'Express', 'Electronic components and accessories', '12.5 kg',
  'In Transit', 'Paris, France', '2024-06-20T09:00:00Z', '2024-06-25T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Shipment Created', 'Lagos, Nigeria', 'Shipment record created and pickup scheduled', '2024-06-20T09:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240620-1024';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Received', 'Lagos, Nigeria', 'Package received at Lagos sorting facility', '2024-06-20T14:30:00Z'
FROM shipments WHERE tracking_number = 'TPG-240620-1024';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'Lagos, Nigeria', 'Package departed Lagos sorting hub', '2024-06-21T06:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240620-1024';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'Paris, France', 'Package arrived at Paris international hub', '2024-06-22T11:45:00Z'
FROM shipments WHERE tracking_number = 'TPG-240620-1024';

-- Shipment 2: At Customs
INSERT INTO shipments (
  tracking_number, sender_name, sender_phone, sender_email,
  receiver_name, receiver_phone, receiver_email,
  origin_country, origin_city, destination_country, destination_city,
  shipment_type, package_description, package_weight,
  status, current_location, shipped_at, estimated_delivery
) VALUES (
  'TPG-240618-3387', 'Kwame Asante', '+233 24 123 4567', 'kwame.asante@gmail.com',
  'Fatima Al-Rashid', '+971 50 987 6543', 'fatima.rashid@yahoo.com',
  'Ghana', 'Accra', 'UAE', 'Dubai',
  'Cargo', 'Handmade crafts and textiles', '45.0 kg',
  'At Customs', 'Dubai International Hub', '2024-06-18T07:00:00Z', '2024-06-26T12:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Shipment Created', 'Accra, Ghana', 'Cargo shipment registered for Dubai', '2024-06-18T07:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240618-3387';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Processing', 'Accra, Ghana', 'Cargo inspected and sealed for transit', '2024-06-18T15:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240618-3387';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'Cairo, Egypt', 'Cargo routed via Cairo', '2024-06-20T08:30:00Z'
FROM shipments WHERE tracking_number = 'TPG-240618-3387';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'At Customs', 'Dubai, UAE', 'Shipment arrived at Dubai customs for clearance', '2024-06-23T06:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240618-3387';

-- Shipment 3: Delivered
INSERT INTO shipments (
  tracking_number, sender_name, sender_phone, sender_email,
  receiver_name, receiver_phone, receiver_email,
  origin_country, origin_city, destination_country, destination_city,
  shipment_type, package_description, package_weight,
  status, current_location, shipped_at, estimated_delivery, delivered_at
) VALUES (
  'TPG-240615-7742', 'Nneka Okafor', '+234 803 456 7890', 'nneka.okafor@live.com',
  'Michael Chen', '+1 416 555 0123', 'mchen@techcorp.com',
  'Nigeria', 'Abuja', 'Canada', 'Toronto',
  'Document', 'Legal documents and certificates', '0.8 kg',
  'Delivered', 'Toronto, Canada', '2024-06-15T10:00:00Z', '2024-06-20T16:00:00Z', '2024-06-19T14:30:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Shipment Created', 'Abuja, Nigeria', 'Document shipment registered', '2024-06-15T10:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240615-7742';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'Lagos, Nigeria', 'Documents dispatched from Lagos hub', '2024-06-16T08:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240615-7742';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'London, UK', 'Documents passed through London hub', '2024-06-17T12:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240615-7742';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'At Customs', 'Toronto, Canada', 'Documents arrived at Canadian customs', '2024-06-18T09:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240615-7742';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Cleared', 'Toronto, Canada', 'Customs cleared for delivery', '2024-06-18T16:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240615-7742';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Out for Delivery', 'Toronto, Canada', 'Out for final delivery', '2024-06-19T09:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240615-7742';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Delivered', 'Toronto, Canada', 'Documents delivered to recipient. Signed by M. Chen.', '2024-06-19T14:30:00Z'
FROM shipments WHERE tracking_number = 'TPG-240615-7742';

-- Shipment 4: Delayed
INSERT INTO shipments (
  tracking_number, sender_name, sender_phone, sender_email,
  receiver_name, receiver_phone, receiver_email,
  origin_country, origin_city, destination_country, destination_city,
  shipment_type, package_description, package_weight,
  status, current_location, shipped_at, estimated_delivery
) VALUES (
  'TPG-240619-5501', 'Global Trade Partners', '+1 212 555 0199', 'shipping@globaltrade.com',
  'Emeka Obi', '+234 805 678 9012', 'emeka.obi@obiholdings.ng',
  'United States', 'New York', 'Nigeria', 'Port Harcourt',
  'Standard', 'Computer hardware and peripherals', '28.3 kg',
  'Delayed', 'Lagos, Nigeria', '2024-06-19T14:00:00Z', '2024-06-27T18:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Shipment Created', 'New York, USA', 'Shipment registered from New York', '2024-06-19T14:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240619-5501';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'New York, USA', 'Departed JFK International Airport', '2024-06-20T22:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240619-5501';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'Lagos, Nigeria', 'Arrived at Lagos sorting hub', '2024-06-22T15:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240619-5501';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Delayed', 'Lagos, Nigeria', 'Shipment delayed due to customs documentation review. Expected to resume transit within 48 hours.', '2024-06-23T10:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240619-5501';

-- Shipment 5: Out for Delivery
INSERT INTO shipments (
  tracking_number, sender_name, sender_phone, sender_email,
  receiver_name, receiver_phone, receiver_email,
  origin_country, origin_city, destination_country, destination_city,
  shipment_type, package_description, package_weight,
  status, current_location, shipped_at, estimated_delivery
) VALUES (
  'TPG-240621-8890', 'Sarah Mitchell', '+44 7911 987654', 'sarah.m@outlook.com',
  'Amina Bello', '+234 806 111 2233', 'amina.bello@gmail.com',
  'United Kingdom', 'Manchester', 'Nigeria', 'Lagos',
  'Express', 'Fashion items and accessories', '5.2 kg',
  'Out for Delivery', 'Lagos, Nigeria', '2024-06-21T11:00:00Z', '2024-06-25T16:00:00Z'
);

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Shipment Created', 'Manchester, UK', 'Express shipment registered', '2024-06-21T11:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240621-8890';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Received', 'Manchester, UK', 'Package collected from sender', '2024-06-21T14:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240621-8890';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'In Transit', 'London, UK', 'Departed London Heathrow hub', '2024-06-22T03:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240621-8890';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'At Sorting Facility', 'Lagos, Nigeria', 'Package at Lagos central sorting', '2024-06-23T08:00:00Z'
FROM shipments WHERE tracking_number = 'TPG-240621-8890';

INSERT INTO tracking_events (shipment_id, status, location, note, event_time)
SELECT id, 'Out for Delivery', 'Lagos, Nigeria', 'Package out for delivery with local courier', '2024-06-24T07:30:00Z'
FROM shipments WHERE tracking_number = 'TPG-240621-8890';