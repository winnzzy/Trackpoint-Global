"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeTrackingNumber, generateTrackingNumber } from "@/lib/utils";
import {
  shipmentFormSchema,
  trackingEventSchema,
  type ShipmentFormValues,
  type TrackingEventFormValues,
} from "@/lib/validators/shipment";

// ============================================================
// PUBLIC TRACKING LOOKUP (server-only, bypasses RLS)
// ============================================================

/**
 * Look up a shipment by tracking number for public visitors.
 * Uses the service-role admin client to bypass RLS.
 * Returns only safe public fields (no emails, phones, admin notes).
 */
export async function getPublicShipmentByTrackingNumber(
  trackingNumber: string
) {
  const normalized = normalizeTrackingNumber(trackingNumber);

  if (!normalized) {
    return { data: null, error: "Please enter a tracking number." };
  }

  const supabase = createAdminClient();

  const { data: shipment, error } = await supabase
    .from("shipments")
    .select(
      `
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
    `
    )
    .eq("tracking_number", normalized)
    .single();

  if (error || !shipment) {
    return { data: null, error: "Shipment not found. Please check your tracking number." };
  }

  // Sort tracking events by event_time ascending (oldest first)
  const events = (shipment.tracking_events || []).sort(
    (a: { event_time: string }, b: { event_time: string }) =>
      new Date(a.event_time).getTime() - new Date(b.event_time).getTime()
  );

  return {
    data: {
      tracking_number: shipment.tracking_number,
      sender_name: shipment.sender_name,
      receiver_name: shipment.receiver_name,
      origin_country: shipment.origin_country,
      origin_city: shipment.origin_city,
      destination_country: shipment.destination_country,
      destination_city: shipment.destination_city,
      shipment_type: shipment.shipment_type,
      package_description: shipment.package_description,
      package_weight: shipment.package_weight,
      status: shipment.status,
      current_location: shipment.current_location,
      shipped_at: shipment.shipped_at,
      estimated_delivery: shipment.estimated_delivery,
      delivered_at: shipment.delivered_at,
      created_at: shipment.created_at,
      tracking_events: events,
    },
    error: null,
  };
}

// ============================================================
// ADMIN READ FUNCTIONS (authenticated, respects RLS)
// ============================================================

/**
 * Get a single shipment by ID with tracking events (admin).
 */
export async function getShipmentById(id: string) {
  const supabase = await createClient();

  const { data: shipment, error } = await supabase
    .from("shipments")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !shipment) {
    return { data: null, error: "Shipment not found." };
  }

  const { data: events } = await supabase
    .from("tracking_events")
    .select("*")
    .eq("shipment_id", id)
    .order("event_time", { ascending: true });

  return {
    data: {
      ...shipment,
      tracking_events: events || [],
    },
    error: null,
  };
}

/**
 * Get all shipments (admin, sorted newest first).
 */
export async function getShipments() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: data || [], error: null };
}

/**
 * Get dashboard stats (admin).
 */
export async function getDashboardStats() {
  const supabase = await createClient();

  const { data: shipments, error } = await supabase
    .from("shipments")
    .select("id, status, created_at, tracking_number, sender_name, receiver_name, origin_city, destination_city");

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  const all = shipments || [];
  return {
    data: {
      total: all.length,
      inTransit: all.filter((s) => s.status === "In Transit").length,
      delivered: all.filter((s) => s.status === "Delivered").length,
      pending: all.filter((s) =>
        ["Pending", "Shipment Created", "Processing"].includes(s.status)
      ).length,
      delayed: all.filter((s) =>
        ["Delayed", "On Hold"].includes(s.status)
      ).length,
      recentShipments: all.slice(0, 5),
    },
    error: null,
  };
}

// ============================================================
// ADMIN WRITE: CREATE SHIPMENT
// ============================================================

/**
 * Create a new shipment (admin server action).
 * Validates, normalizes, generates tracking number, prevents duplicates,
 * and creates the initial tracking event.
 */
export async function createShipment(formData: ShipmentFormValues) {
  const supabase = await createClient();

  // Validate
  const parsed = shipmentFormSchema.safeParse(formData);
  if (!parsed.success) {
    const messages = parsed.error.issues.map((i: { message: string }) => i.message).join(", ");
    return {
      data: null,
      error: messages,
    };
  }

  const values = parsed.data;

  // Normalize tracking number
  let trackingNumber = values.tracking_number
    ? normalizeTrackingNumber(values.tracking_number)
    : generateTrackingNumber();

  // Prevent duplicate tracking numbers
  const { data: existing } = await supabase
    .from("shipments")
    .select("id")
    .eq("tracking_number", trackingNumber)
    .single();

  if (existing) {
    // Generate a new one if the provided one already exists
    trackingNumber = generateTrackingNumber();
  }

  // Normalize empty optional strings to null
  const emptyToNull = (v: string | null | undefined) =>
    v && v.trim() !== "" ? v.trim() : null;

  const status = values.status || "Pending";
  const now = new Date().toISOString();

  const insertPayload = {
    tracking_number: trackingNumber,
    sender_name: values.sender_name.trim(),
    sender_phone: emptyToNull(values.sender_phone),
    sender_email: emptyToNull(values.sender_email),
    receiver_name: values.receiver_name.trim(),
    receiver_phone: emptyToNull(values.receiver_phone),
    receiver_email: emptyToNull(values.receiver_email),
    origin_country: values.origin_country.trim(),
    origin_city: values.origin_city.trim(),
    destination_country: values.destination_country.trim(),
    destination_city: values.destination_city.trim(),
    shipment_type: values.shipment_type,
    package_description: emptyToNull(values.package_description),
    package_weight: emptyToNull(values.package_weight),
    status,
    current_location: emptyToNull(values.current_location) || values.origin_city.trim(),
    shipped_at: values.shipped_at ? new Date(values.shipped_at).toISOString() : null,
    estimated_delivery: values.estimated_delivery
      ? new Date(values.estimated_delivery).toISOString()
      : null,
    delivered_at: status === "Delivered" ? now : null,
    admin_note: emptyToNull(values.admin_note),
  };

  const { data: shipment, error } = await supabase
    .from("shipments")
    .insert(insertPayload)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  // Create initial tracking event consistent with shipment status
  const { error: eventError } = await supabase.from("tracking_events").insert({
    shipment_id: shipment.id,
    status: status,
    location: insertPayload.current_location || values.origin_city.trim(),
    note: "Shipment created",
    event_time: now,
  });

  if (eventError) {
    console.error("Failed to create initial tracking event:", eventError);
    // Don't fail the whole operation — shipment was created successfully
  }

  revalidatePath("/admin");
  revalidatePath("/admin/shipments");

  return { data: shipment, error: null };
}

// ============================================================
// ADMIN WRITE: UPDATE SHIPMENT
// ============================================================

/**
 * Update an existing shipment (admin server action).
 * Validates, normalizes, sets delivered_at when status changes to Delivered.
 */
export async function updateShipment(
  id: string,
  formData: Partial<ShipmentFormValues>
) {
  const supabase = await createClient();

  const emptyToNull = (v: string | null | undefined) =>
    v && v.trim() !== "" ? v.trim() : null;

  const now = new Date().toISOString();

  const updatePayload: Record<string, unknown> = {
    updated_at: now,
  };

  // Only update fields that are provided
  if (formData.sender_name !== undefined) updatePayload.sender_name = formData.sender_name.trim();
  if (formData.sender_phone !== undefined) updatePayload.sender_phone = emptyToNull(formData.sender_phone);
  if (formData.sender_email !== undefined) updatePayload.sender_email = emptyToNull(formData.sender_email);
  if (formData.receiver_name !== undefined) updatePayload.receiver_name = formData.receiver_name.trim();
  if (formData.receiver_phone !== undefined) updatePayload.receiver_phone = emptyToNull(formData.receiver_phone);
  if (formData.receiver_email !== undefined) updatePayload.receiver_email = emptyToNull(formData.receiver_email);
  if (formData.origin_country !== undefined) updatePayload.origin_country = formData.origin_country.trim();
  if (formData.origin_city !== undefined) updatePayload.origin_city = formData.origin_city.trim();
  if (formData.destination_country !== undefined) updatePayload.destination_country = formData.destination_country.trim();
  if (formData.destination_city !== undefined) updatePayload.destination_city = formData.destination_city.trim();
  if (formData.shipment_type !== undefined) updatePayload.shipment_type = formData.shipment_type;
  if (formData.package_description !== undefined) updatePayload.package_description = emptyToNull(formData.package_description);
  if (formData.package_weight !== undefined) updatePayload.package_weight = emptyToNull(formData.package_weight);
  if (formData.current_location !== undefined) updatePayload.current_location = emptyToNull(formData.current_location);
  if (formData.admin_note !== undefined) updatePayload.admin_note = emptyToNull(formData.admin_note);

  // Handle status change
  if (formData.status !== undefined) {
    updatePayload.status = formData.status;
    if (formData.status === "Delivered") {
      updatePayload.delivered_at = now;
    }
  }

  // Handle date fields
  if (formData.shipped_at !== undefined) {
    updatePayload.shipped_at = formData.shipped_at ? new Date(formData.shipped_at).toISOString() : null;
  }
  if (formData.estimated_delivery !== undefined) {
    updatePayload.estimated_delivery = formData.estimated_delivery
      ? new Date(formData.estimated_delivery).toISOString()
      : null;
  }

  const { data, error } = await supabase
    .from("shipments")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${id}`);

  return { data, error: null };
}

// ============================================================
// ADMIN WRITE: ADD TRACKING EVENT
// ============================================================

/**
 * Add a tracking event to a shipment (admin server action).
 * Also updates the parent shipment's status, current_location, and delivered_at.
 */
export async function addTrackingEvent(
  shipmentId: string,
  formData: TrackingEventFormValues
) {
  const supabase = await createClient();

  // Validate
  const parsed = trackingEventSchema.safeParse(formData);
  if (!parsed.success) {
    const messages = parsed.error.issues.map((i: { message: string }) => i.message).join(", ");
    return {
      data: null,
      error: messages,
    };
  }

  const values = parsed.data;
  const eventTime = new Date(values.event_time).toISOString();
  const now = new Date().toISOString();

  // Insert the tracking event
  const { data: event, error: eventError } = await supabase
    .from("tracking_events")
    .insert({
      shipment_id: shipmentId,
      status: values.status,
      location: values.location.trim(),
      note: values.note?.trim() || null,
      event_time: eventTime,
    })
    .select()
    .single();

  if (eventError) {
    return { data: null, error: eventError.message };
  }

  // Update parent shipment: status, current_location, updated_at
  const shipmentUpdate: Record<string, unknown> = {
    status: values.status,
    current_location: values.location.trim(),
    updated_at: now,
  };

  // Set delivered_at when event status is Delivered
  if (values.status === "Delivered") {
    shipmentUpdate.delivered_at = now;
  }

  const { error: shipmentUpdateError } = await supabase
    .from("shipments")
    .update(shipmentUpdate)
    .eq("id", shipmentId);

  if (shipmentUpdateError) {
    console.error("Failed to update shipment after adding event:", shipmentUpdateError);
    // Event was created but shipment sync failed — still return success for the event
  }

  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${shipmentId}`);

  return { data: event, error: null };
}

// ============================================================
// ADMIN WRITE: DELETE SHIPMENT
// ============================================================

/**
 * Delete a shipment and its tracking events (admin server action).
 * Tracking events are cascade-deleted by the DB constraint.
 */
export async function deleteShipment(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("shipments").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/shipments");

  return { error: null };
}