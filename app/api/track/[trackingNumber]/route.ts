import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  const { trackingNumber } = await params;
  const decoded = decodeURIComponent(trackingNumber).trim();

  if (!decoded) {
    return NextResponse.json({ error: 'Tracking number is required' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: shipment, error } = await supabase
    .from('shipments')
    .select('*, tracking_events(*)')
    .eq('tracking_number', decoded)
    .single();

  if (error || !shipment) {
    return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
  }

  // Sort tracking events by event_time descending (most recent first)
  if (shipment.tracking_events) {
    shipment.tracking_events.sort(
      (a: { event_time: string }, b: { event_time: string }) =>
        new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
    );
  }

  return NextResponse.json({ shipment });
}