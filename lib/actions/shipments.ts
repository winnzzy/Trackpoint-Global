"use server";

import { createClient } from "@/lib/supabase/server";
import { generateTrackingNumber } from "@/lib/utils";
import { shipmentFormSchema, trackingEventSchema } from "@/lib/validators/shipment";
import { revalidatePath } from "next/cache";
import type { ShipmentFormValues, TrackingEventFormValues } from "@/lib/validators/shipment";

export async function createShipment(data: ShipmentFormValues) {
  const supabase = await createClient();

  const parsed = shipmentFormSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const trackingNumber = data.tracking_number?.trim() || generateTrackingNumber();

  // Check uniqueness
  const { data: existing } = await supabase
    .from("shipments")
    .select("id")
    .eq("tracking_number", trackingNumber)
    .single();

  if (existing) {
    return { error: "A shipment with this tracking number already exists" };
  }

  const { data: shipment, error } = await supabase
    .from("shipments")
    .insert({
      tracking_number: trackingNumber,
      sender_name: data.sender_name,
      sender_phone: data.sender_phone || null,
      sender_email: data.sender_email || null,
      receiver_name: data.receiver_name,
      receiver_phone: data.receiver_phone || null,
      receiver_email: data.receiver_email || null,
      origin_country: data.origin_country,
      origin_city: data.origin_city,
      destination_country: data.destination_country,
      destination_city: data.destination_city,
      shipment_type: data.shipment_type,
      package_description: data.package_description || null,
      package_weight: data.package_weight || null,
      status: data.status,
      current_location: data.current_location || `${data.origin_city}, ${data.origin_country}`,
      shipped_at: data.shipped_at || new Date().toISOString(),
      estimated_delivery: data.estimated_delivery || null,
      admin_note: data.admin_note || null,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Create initial tracking event
  await supabase.from("tracking_events").insert({
    shipment_id: shipment.id,
    status: data.status,
    location: data.current_location || `${data.origin_city}, ${data.origin_country}`,
    note: "Shipment record created",
    event_time: data.shipped_at || new Date().toISOString(),
  });

  revalidatePath("/admin/shipments");
  revalidatePath("/admin");

  return { success: true, shipment };
}

export async function updateShipment(id: string, data: ShipmentFormValues) {
  const supabase = await createClient();

  const parsed = shipmentFormSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase
    .from("shipments")
    .update({
      sender_name: data.sender_name,
      sender_phone: data.sender_phone || null,
      sender_email: data.sender_email || null,
      receiver_name: data.receiver_name,
      receiver_phone: data.receiver_phone || null,
      receiver_email: data.receiver_email || null,
      origin_country: data.origin_country,
      origin_city: data.origin_city,
      destination_country: data.destination_country,
      destination_city: data.destination_city,
      shipment_type: data.shipment_type,
      package_description: data.package_description || null,
      package_weight: data.package_weight || null,
      status: data.status,
      current_location: data.current_location || null,
      shipped_at: data.shipped_at || null,
      estimated_delivery: data.estimated_delivery || null,
      admin_note: data.admin_note || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${id}`);
  revalidatePath("/admin");

  return { success: true };
}

export async function deleteShipment(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("shipments").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/shipments");
  revalidatePath("/admin");

  return { success: true };
}

export async function addTrackingEvent(
  shipmentId: string,
  data: TrackingEventFormValues
) {
  const supabase = await createClient();

  const parsed = trackingEventSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error: eventError } = await supabase.from("tracking_events").insert({
    shipment_id: shipmentId,
    status: data.status,
    location: data.location,
    note: data.note || null,
    event_time: data.event_time,
  });

  if (eventError) {
    return { error: eventError.message };
  }

  // Update shipment's current_location and status
  const updateData: Record<string, unknown> = {
    current_location: data.location,
    status: data.status,
    updated_at: new Date().toISOString(),
  };

  // If delivered, set delivered_at
  if (data.status === "Delivered") {
    updateData.delivered_at = data.event_time;
  }

  const { error: updateError } = await supabase
    .from("shipments")
    .update(updateData)
    .eq("id", shipmentId);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${shipmentId}`);
  revalidatePath("/admin");

  return { success: true };
}

export async function getShipments() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getShipmentById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shipments")
    .select("*, tracking_events(*)")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getShipmentByTrackingNumber(trackingNumber: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shipments")
    .select("*, tracking_events(*)")
    .eq("tracking_number", trackingNumber)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getDashboardStats() {
  const supabase = await createClient();

  const { count: total } = await supabase
    .from("shipments")
    .select("*", { count: "exact", head: true });

  const { count: inTransit } = await supabase
    .from("shipments")
    .select("*", { count: "exact", head: true })
    .eq("status", "In Transit");

  const { count: delivered } = await supabase
    .from("shipments")
    .select("*", { count: "exact", head: true })
    .eq("status", "Delivered");

  const { count: pending } = await supabase
    .from("shipments")
    .select("*", { count: "exact", head: true })
    .in("status", ["Pending", "Shipment Created"]);

  const { count: delayed } = await supabase
    .from("shipments")
    .select("*", { count: "exact", head: true })
    .in("status", ["Delayed", "On Hold"]);

  return {
    total: total || 0,
    inTransit: inTransit || 0,
    delivered: delivered || 0,
    pending: pending || 0,
    delayed: delayed || 0,
  };
}