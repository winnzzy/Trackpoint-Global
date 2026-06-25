import { notFound } from "next/navigation";
import { getShipmentById } from "@/lib/actions/shipments";
import { createClient } from "@/lib/supabase/server";
import ShipmentDetailClient from "./ShipmentDetailClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ShipmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  const { data: shipment, error } = await getShipmentById(id);

  if (error || !shipment) {
    notFound();
  }

  // Fetch tracking events and exceptions server-side
  const supabase = await createClient();
  const [{ data: events }, { data: exceptions }] = await Promise.all([
    supabase
      .from("tracking_events")
      .select("*")
      .eq("shipment_id", id)
      .order("event_time", { ascending: true }),
    supabase
      .from("shipment_exceptions")
      .select("*")
      .eq("shipment_id", id)
      .order("reported_at", { ascending: false }),
  ]);

  return (
    <ShipmentDetailClient
      shipment={shipment}
      trackingEvents={events || []}
      exceptions={exceptions || []}
    />
  );
}
