import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { normalizeTrackingNumber } from '@/lib/utils';

/**
 * Public tracking API route.
 * Uses the service-role admin client to bypass RLS so anonymous visitors
 * (no session cookie) can look up shipments by tracking number.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  const { trackingNumber } = await params;
  const normalized = normalizeTrackingNumber(decodeURIComponent(trackingNumber));

  if (!normalized) {
    return NextResponse.json({ error: 'Tracking number is required' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: shipment, error } = await supabase
    .from('shipments')
    .select(`
      tracking_number,
      sender_name,
      receiver_name,
      origin_country,
      origin_city,
      destination_country,
      destination_city,
      shipment_type,
      package_description,
      package_weight,
      status,
      current_location,
      shipped_at,
      estimated_delivery,
      delivered_at,
      created_at,
      tracking_events (
        id,
        status,
        location,
        note,
        event_time
      )
    `)
    .eq('tracking_number', normalized)
    .single();

  if (error || !shipment) {
    return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
  }

  // Sort tracking events by event_time ascending (oldest first for timeline display)
  if (shipment.tracking_events) {
    shipment.tracking_events.sort(
      (a: { event_time: string }, b: { event_time: string }) =>
        new Date(a.event_time).getTime() - new Date(b.event_time).getTime()
    );
  }

  return NextResponse.json({ shipment });
}
