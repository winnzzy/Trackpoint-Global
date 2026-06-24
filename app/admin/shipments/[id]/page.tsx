"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatDate, formatDateTime } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import TrackingTimeline from "@/components/shared/TrackingTimeline";
import { SHIPMENT_STATUSES, SHIPMENT_TYPES, COUNTRIES, Shipment, TrackingEvent } from "@/types";
import {
  ArrowLeft,
  Save,
  Plus,
  MapPin,
  Clock,
  Package,
  Users,
  Route,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingEvent, setAddingEvent] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Shipment>>({});
  const [newEvent, setNewEvent] = useState({
    status: "In Transit",
    location: "",
    note: "",
    event_time: new Date().toISOString().slice(0, 16),
  });

  const fetchShipment = useCallback(async () => {
    const { data: shipmentData } = await supabase
      .from("shipments")
      .select("*")
      .eq("id", params.id)
      .single();

    if (!shipmentData) {
      setLoading(false);
      return;
    }

    setShipment(shipmentData);
    setEditForm(shipmentData);

    const { data: eventsData } = await supabase
      .from("tracking_events")
      .select("*")
      .eq("shipment_id", params.id)
      .order("event_time", { ascending: false });

    if (eventsData) setEvents(eventsData);
    setLoading(false);
  }, [params.id, supabase]);

  useEffect(() => {
    fetchShipment();
  }, [fetchShipment]);

  const handleSave = async () => {
    if (!shipment) return;
    setSaving(true);

    const { error } = await supabase
      .from("shipments")
      .update({
        ...editForm,
        updated_at: new Date().toISOString(),
      })
      .eq("id", shipment.id);

    if (error) {
      toast.error("Failed to update shipment");
    } else {
      toast.success("Shipment updated");
      setEditMode(false);
      fetchShipment();
    }
    setSaving(false);
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipment) return;
    setAddingEvent(true);

    const { error: eventError } = await supabase.from("tracking_events").insert({
      shipment_id: shipment.id,
      status: newEvent.status,
      location: newEvent.location,
      note: newEvent.note || null,
      event_time: new Date(newEvent.event_time).toISOString(),
    });

    if (eventError) {
      toast.error("Failed to add tracking event");
      setAddingEvent(false);
      return;
    }

    // Update shipment status and location
    await supabase
      .from("shipments")
      .update({
        status: newEvent.status,
        current_location: newEvent.location,
        updated_at: new Date().toISOString(),
        ...(newEvent.status === "Delivered"
          ? { delivered_at: new Date().toISOString() }
          : {}),
      })
      .eq("id", shipment.id);

    toast.success("Tracking event added");
    setNewEvent({
      status: "In Transit",
      location: "",
      note: "",
      event_time: new Date().toISOString().slice(0, 16),
    });
    fetchShipment();
    setAddingEvent(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange focus:border-transparent text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-100 rounded w-48 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-gray-50 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center py-20">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-navy mb-2">Shipment Not Found</h2>
        <p className="text-gray-500 mb-4">The shipment you're looking for doesn't exist.</p>
        <Link href="/admin/shipments" className="text-orange hover:underline">
          ← Back to Shipments
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/shipments"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-navy font-mono">
                {shipment.tracking_number}
              </h1>
              <StatusBadge status={shipment.status} />
            </div>
            <p className="text-gray-500 text-sm">
              Created {formatDate(shipment.created_at)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {editMode ? (
            <>
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditForm(shipment);
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-orange hover:bg-orange-dark disabled:opacity-60 transition-colors inline-flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-navy hover:bg-navy/90 transition-colors"
            >
              Edit Shipment
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sender & Receiver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-orange" />
                <h3 className="font-semibold text-navy text-sm">Sender</h3>
              </div>
              {editMode ? (
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input name="sender_name" value={editForm.sender_name || ""} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input name="sender_phone" value={editForm.sender_phone || ""} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input name="sender_email" value={editForm.sender_email || ""} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-navy">{shipment.sender_name}</p>
                  {shipment.sender_phone && <p className="text-gray-500">{shipment.sender_phone}</p>}
                  {shipment.sender_email && <p className="text-gray-500">{shipment.sender_email}</p>}
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-orange" />
                <h3 className="font-semibold text-navy text-sm">Receiver</h3>
              </div>
              {editMode ? (
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input name="receiver_name" value={editForm.receiver_name || ""} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input name="receiver_phone" value={editForm.receiver_phone || ""} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input name="receiver_email" value={editForm.receiver_email || ""} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-navy">{shipment.receiver_name}</p>
                  {shipment.receiver_phone && <p className="text-gray-500">{shipment.receiver_phone}</p>}
                  {shipment.receiver_email && <p className="text-gray-500">{shipment.receiver_email}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Route & Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Route className="h-4 w-4 text-orange" />
              <h3 className="font-semibold text-navy text-sm">Route & Details</h3>
            </div>
            {editMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Origin Country</label>
                  <select name="origin_country" value={editForm.origin_country || ""} onChange={handleChange} className={inputClass}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Origin City</label>
                  <input name="origin_city" value={editForm.origin_city || ""} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Destination Country</label>
                  <select name="destination_country" value={editForm.destination_country || ""} onChange={handleChange} className={inputClass}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Destination City</label>
                  <input name="destination_city" value={editForm.destination_city || ""} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Status</label>
                  <select name="status" value={editForm.status || ""} onChange={handleChange} className={inputClass}>
                    {SHIPMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Current Location</label>
                  <input name="current_location" value={editForm.current_location || ""} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Shipment Type</label>
                  <select name="shipment_type" value={editForm.shipment_type || ""} onChange={handleChange} className={inputClass}>
                    {SHIPMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Weight (kg)</label>
                  <input name="package_weight" value={editForm.package_weight || ""} onChange={handleChange} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Package Description</label>
                  <textarea name="package_description" value={editForm.package_description || ""} onChange={handleChange} className={`${inputClass} min-h-[60px]`} />
                </div>
                <div>
                  <label className={labelClass}>Shipped Date</label>
                  <input name="shipped_at" type="datetime-local" value={editForm.shipped_at?.slice(0, 16) || ""} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Estimated Delivery</label>
                  <input name="estimated_delivery" type="datetime-local" value={editForm.estimated_delivery?.slice(0, 16) || ""} onChange={handleChange} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Admin Note</label>
                  <textarea name="admin_note" value={editForm.admin_note || ""} onChange={handleChange} className={`${inputClass} min-h-[60px]`} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">From</p>
                  <p className="font-medium text-navy">{shipment.origin_city}, {shipment.origin_country}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">To</p>
                  <p className="font-medium text-navy">{shipment.destination_city}, {shipment.destination_country}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Type</p>
                  <p className="font-medium text-navy">{shipment.shipment_type}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Current Location</p>
                  <p className="font-medium text-navy">{shipment.current_location || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Shipped</p>
                  <p className="font-medium text-navy">{shipment.shipped_at ? formatDate(shipment.shipped_at) : "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Est. Delivery</p>
                  <p className="font-medium text-navy">{shipment.estimated_delivery ? formatDate(shipment.estimated_delivery) : "—"}</p>
                </div>
                {shipment.package_weight && (
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Weight</p>
                    <p className="font-medium text-navy">{shipment.package_weight} kg</p>
                  </div>
                )}
                {shipment.package_description && (
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs mb-0.5">Description</p>
                    <p className="font-medium text-navy">{shipment.package_description}</p>
                  </div>
                )}
                {shipment.admin_note && (
                  <div className="col-span-2 md:col-span-3">
                    <p className="text-gray-500 text-xs mb-0.5">Admin Note</p>
                    <p className="text-navy text-xs bg-yellow-50 px-3 py-2 rounded-lg">{shipment.admin_note}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-orange" />
              <h3 className="font-semibold text-navy text-sm">Tracking Timeline ({events.length} events)</h3>
            </div>
            {events.length > 0 ? (
              <TrackingTimeline events={events} />
            ) : (
              <p className="text-gray-500 text-sm py-4">No tracking events yet.</p>
            )}
          </div>
        </div>

        {/* Right column - Add Event */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="h-4 w-4 text-orange" />
              <h3 className="font-semibold text-navy text-sm">Add Tracking Event</h3>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className={labelClass}>Status *</label>
                <select
                  value={newEvent.status}
                  onChange={(e) => setNewEvent((p) => ({ ...p, status: e.target.value }))}
                  className={inputClass}
                  required
                >
                  {SHIPMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Location *</label>
                <input
                  value={newEvent.location}
                  onChange={(e) => setNewEvent((p) => ({ ...p, location: e.target.value }))}
                  className={inputClass}
                  required
                  placeholder="e.g. London Heathrow Hub"
                />
              </div>
              <div>
                <label className={labelClass}>Note</label>
                <textarea
                  value={newEvent.note}
                  onChange={(e) => setNewEvent((p) => ({ ...p, note: e.target.value }))}
                  className={`${inputClass} min-h-[60px]`}
                  placeholder="Additional details..."
                />
              </div>
              <div>
                <label className={labelClass}>Event Time</label>
                <input
                  type="datetime-local"
                  value={newEvent.event_time}
                  onChange={(e) => setNewEvent((p) => ({ ...p, event_time: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={addingEvent}
                className="w-full bg-orange hover:bg-orange-dark disabled:opacity-60 text-white py-2.5 rounded-xl font-medium text-sm transition-colors inline-flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {addingEvent ? "Adding..." : "Add Event"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}