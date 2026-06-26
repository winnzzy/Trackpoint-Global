import { notFound } from "next/navigation";
import { getShipmentById } from "@/lib/actions/shipments";
import { createClient } from "@/lib/supabase/server";
import ShipmentDetailClient from "./ShipmentDetailClient";
import type { TrackingEvent, ShipmentException } from "@/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ShipmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Fetch shipment + tracking events via the admin server action
  const { data: shipment, error } = await getShipmentById(id);

  if (error || !shipment) {
    notFound();
  }

  // 2. Extract tracking events already fetched inside getShipmentById
  const trackingEvents: TrackingEvent[] =
    (shipment as Record<string, unknown>).tracking_events as TrackingEvent[] ||
    [];

  // 3. Fetch exceptions separately — wrapped in try-catch so a missing
  //    table or RLS issue never prevents the shipment from rendering.
  let exceptions: ShipmentException[] = [];
  try {
    const supabase = await createClient();
    const { data, error: exceptionError } = await supabase
      .from("shipment_exceptions")
      .select("*")
      .eq("shipment_id", id)
      .order("reported_at", { ascending: false });

    if (!exceptionError && data) {
      exceptions = data as ShipmentException[];
    }
  } catch {
    // shipment_exceptions table may not exist yet or query failed —
    // this is non-fatal; the page still renders without exception data.
  }

  return (
    <ShipmentDetailClient
      shipment={shipment}
      trackingEvents={trackingEvents}
      exceptions={exceptions}
    />
  );
}
