"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import TrackingTimeline from "@/components/shared/TrackingTimeline";
import {
  SHIPMENT_STATUSES,
  SHIPMENT_TYPES,
  COUNTRIES,
  TrackingEvent,
  type ShipmentException,
  EXCEPTION_TYPES,
  EXCEPTION_TYPE_LABELS,
  EXCEPTION_SEVERITIES,
  EXCEPTION_SEVERITY_LABELS,
} from "@/types";
import {
  updateShipment,
  addTrackingEvent,
  createException,
  updateException,
  resolveException,
  deleteException,
} from "@/lib/actions/shipments";
import {
  ArrowLeft,
  Save,
  Plus,
  Clock,
  Package,
  Users,
  Route,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface ShipmentData {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_phone: string | null;
  sender_email: string | null;
  receiver_name: string;
  receiver_phone: string | null;
  receiver_email: string | null;
  origin_country: string;
  origin_city: string;
  destination_country: string;
  destination_city: string;
  shipment_type: string;
  package_description: string | null;
  package_weight: string | null;
  status: string;
  current_location: string | null;
  shipped_at: string | null;
  estimated_delivery: string | null;
  delivered_at: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

interface ShipmentDetailClientProps {
  shipment: ShipmentData;
  trackingEvents: TrackingEvent[];
  exceptions?: ShipmentException[];
}

export default function ShipmentDetailClient({
  shipment: initialShipment,
  trackingEvents,
  exceptions: initialExceptions = [],
}: ShipmentDetailClientProps) {
  const router = useRouter();
  const [shipment, setShipment] = useState(initialShipment);
  const [saving, setSaving] = useState(false);
  const [addingEvent, setAddingEvent] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ShipmentData>>(initialShipment);
  const [newEvent, setNewEvent] = useState({
    status: "In Transit",
    location: "",
    note: "",
    event_time: new Date().toISOString().slice(0, 16),
  });

  // Exception state
  const [exceptions, setExceptions] = useState<ShipmentException[]>(initialExceptions);
  const [showExceptionForm, setShowExceptionForm] = useState(false);
  const [creatingException, setCreatingException] = useState(false);
  const [editingExceptionId, setEditingExceptionId] = useState<string | null>(null);
  const [updatingException, setUpdatingException] = useState(false);
  const [exceptionForm, setExceptionForm] = useState({
    type: "delay" as string,
    severity: "warning" as string,
    title: "",
    customer_message: "",
    location: "",
    action_required: false,
    action_label: "",
    updated_eta: "",
    internal_note: "",
  });

  const handleSave = async () => {
    setSaving(true);

    const { data, error } = await updateShipment(shipment.id, {
      sender_name: editForm.sender_name || shipment.sender_name,
      sender_phone: editForm.sender_phone || null,
      sender_email: editForm.sender_email || null,
      receiver_name: editForm.receiver_name || shipment.receiver_name,
      receiver_phone: editForm.receiver_phone || null,
      receiver_email: editForm.receiver_email || null,
      origin_country: editForm.origin_country || shipment.origin_country,
      origin_city: editForm.origin_city || shipment.origin_city,
      destination_country: editForm.destination_country || shipment.destination_country,
      destination_city: editForm.destination_city || shipment.destination_city,
      shipment_type: (editForm.shipment_type || shipment.shipment_type) as "Standard" | "Express" | "International" | "Same Day" | "Economy",
      package_description: editForm.package_description || null,
      package_weight: editForm.package_weight || null,
      status: (editForm.status || shipment.status) as any,
      current_location: editForm.current_location || null,
      shipped_at: editForm.shipped_at || null,
      estimated_delivery: editForm.estimated_delivery || null,
      admin_note: editForm.admin_note || null,
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success("Shipment updated");
      setEditMode(false);
      if (data) {
        setShipment(data as ShipmentData);
        setEditForm(data as ShipmentData);
      }
      router.refresh();
    }
    setSaving(false);
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingEvent(true);

    const { error } = await addTrackingEvent(shipment.id, {
      status: newEvent.status as any,
      location: newEvent.location,
      note: newEvent.note || null,
      event_time: newEvent.event_time,
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success("Tracking event added");
      setNewEvent({
        status: "In Transit",
        location: "",
        note: "",
        event_time: new Date().toISOString().slice(0, 16),
      });
      router.refresh();
    }
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

  const handleCreateException = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingException(true);
    const { data, error } = await createException(shipment.id, {
      type: exceptionForm.type as any,
      severity: exceptionForm.severity as any,
      title: exceptionForm.title,
      customer_message: exceptionForm.customer_message || null,
      location: exceptionForm.location || null,
      action_required: exceptionForm.action_required,
      action_label: exceptionForm.action_required ? exceptionForm.action_label || null : null,
      updated_eta: exceptionForm.updated_eta || null,
      internal_note: exceptionForm.internal_note || null,
    });
    if (error) {
      toast.error(error);
    } else {
      toast.success("Exception created");
      if (data) setExceptions((prev) => [data as ShipmentException, ...prev]);
      setShowExceptionForm(false);
      setExceptionForm({ type: "delay", severity: "warning", title: "", customer_message: "", location: "", action_required: false, action_label: "", updated_eta: "", internal_note: "" });
      router.refresh();
    }
    setCreatingException(false);
  };

  const handleResolveException = async (exceptionId: string) => {
    const { error } = await resolveException(exceptionId);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Exception resolved");
      setExceptions((prev) => prev.map((ex) => ex.id === exceptionId ? { ...ex, status: "resolved", resolved_at: new Date().toISOString() } : ex));
      router.refresh();
    }
  };

  const handleStartEditException = (ex: ShipmentException) => {
    setEditingExceptionId(ex.id);
    setExceptionForm({
      type: ex.type || "delay",
      severity: ex.severity || "warning",
      title: ex.title || "",
      customer_message: ex.customer_message || "",
      location: ex.location || "",
      action_required: ex.action_required || false,
      action_label: ex.action_label || "",
      updated_eta: ex.updated_eta ? ex.updated_eta.slice(0, 16) : "",
      internal_note: ex.internal_note || "",
    });
  };

  const handleCancelEditException = () => {
    setEditingExceptionId(null);
    setExceptionForm({ type: "delay", severity: "warning", title: "", customer_message: "", location: "", action_required: false, action_label: "", updated_eta: "", internal_note: "" });
  };

  const handleUpdateException = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExceptionId) return;
    setUpdatingException(true);
    const { data, error } = await updateException(editingExceptionId, {
      type: exceptionForm.type as any,
      severity: exceptionForm.severity as any,
      title: exceptionForm.title,
      customer_message: exceptionForm.customer_message || null,
      location: exceptionForm.location || null,
      action_required: exceptionForm.action_required,
      action_label: exceptionForm.action_required ? exceptionForm.action_label || null : null,
      updated_eta: exceptionForm.updated_eta || null,
      internal_note: exceptionForm.internal_note || null,
    });
    if (error) {
      toast.error(error);
    } else {
      toast.success("Exception updated");
      if (data) setExceptions((prev) => prev.map((ex) => ex.id === editingExceptionId ? { ...ex, ...(data as ShipmentException) } : ex));
      setEditingExceptionId(null);
      setExceptionForm({ type: "delay", severity: "warning", title: "", customer_message: "", location: "", action_required: false, action_label: "", updated_eta: "", internal_note: "" });
      router.refresh();
    }
    setUpdatingException(false);
  };

  const handleDeleteException = async (exceptionId: string) => {
    if (!confirm("Delete this exception?")) return;
    const { error } = await deleteException(exceptionId, shipment.id);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Exception deleted");
      setExceptions((prev) => prev.filter((ex) => ex.id !== exceptionId));
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "critical") return <ShieldAlert className="h-4 w-4 text-red-500" />;
    if (severity === "warning") return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  const getSeverityBadge = (severity: string) => {
    if (severity === "critical") return "bg-red-100 text-red-700 border-red-200";
    if (severity === "warning") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const activeExceptions = exceptions.filter((ex) => ex.status === "active");
  const resolvedExceptions = exceptions.filter((ex) => ex.status === "resolved");

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

          {/* Exceptions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange" />
                <h3 className="font-semibold text-navy text-sm">
                  Exceptions
                  {activeExceptions.length > 0 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {activeExceptions.length} active
                    </span>
                  )}
                </h3>
              </div>
              <button
                onClick={() => setShowExceptionForm(!showExceptionForm)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-orange border border-orange/30 hover:bg-orange/5 transition-colors"
              >
                {showExceptionForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                {showExceptionForm ? "Cancel" : "Add Exception"}
              </button>
            </div>

            {/* Create Exception Form */}
            {showExceptionForm && (
              <form onSubmit={handleCreateException} className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Type *</label>
                    <select value={exceptionForm.type} onChange={(e) => setExceptionForm((p) => ({ ...p, type: e.target.value }))} className={inputClass}>
                      {EXCEPTION_TYPES.map((t) => <option key={t} value={t}>{EXCEPTION_TYPE_LABELS[t]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Severity *</label>
                    <select value={exceptionForm.severity} onChange={(e) => setExceptionForm((p) => ({ ...p, severity: e.target.value }))} className={inputClass}>
                      {EXCEPTION_SEVERITIES.map((s) => <option key={s} value={s}>{EXCEPTION_SEVERITY_LABELS[s]}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Title *</label>
                  <input value={exceptionForm.title} onChange={(e) => setExceptionForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} required placeholder="Short label shown to customer" />
                </div>
                <div>
                  <label className={labelClass}>Customer Message</label>
                  <textarea value={exceptionForm.customer_message} onChange={(e) => setExceptionForm((p) => ({ ...p, customer_message: e.target.value }))} className={`${inputClass} min-h-[60px]`} placeholder="Shown publicly on tracking page" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Location</label>
                    <input value={exceptionForm.location} onChange={(e) => setExceptionForm((p) => ({ ...p, location: e.target.value }))} className={inputClass} placeholder="e.g. Frankfurt Customs" />
                  </div>
                  <div>
                    <label className={labelClass}>Updated ETA</label>
                    <input type="datetime-local" value={exceptionForm.updated_eta} onChange={(e) => setExceptionForm((p) => ({ ...p, updated_eta: e.target.value }))} className={inputClass} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="action_required" checked={exceptionForm.action_required} onChange={(e) => setExceptionForm((p) => ({ ...p, action_required: e.target.checked }))} className="rounded border-gray-300 text-orange focus:ring-orange" />
                  <label htmlFor="action_required" className="text-sm text-gray-700">Customer action required</label>
                </div>
                {exceptionForm.action_required && (
                  <div>
                    <label className={labelClass}>Action Button Label</label>
                    <input value={exceptionForm.action_label} onChange={(e) => setExceptionForm((p) => ({ ...p, action_label: e.target.value }))} className={inputClass} placeholder="e.g. Upload Documents" />
                  </div>
                )}
                <div>
                  <label className={labelClass}>Internal Note (admin only)</label>
                  <textarea value={exceptionForm.internal_note} onChange={(e) => setExceptionForm((p) => ({ ...p, internal_note: e.target.value }))} className={`${inputClass} min-h-[50px]`} placeholder="Never shown to customer" />
                </div>
                <button type="submit" disabled={creatingException} className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {creatingException ? "Creating..." : "Create Exception"}
                </button>
              </form>
            )}

            {/* Active Exceptions */}
            {activeExceptions.length > 0 && (
              <div className="space-y-3 mb-4">
                {activeExceptions.map((ex) => (
                  <div key={ex.id} className="border border-red-200 bg-red-50/50 rounded-xl p-4">
                    {editingExceptionId === ex.id ? (
                      /* Inline Edit Form */
                      <form onSubmit={handleUpdateException} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={labelClass}>Type *</label>
                            <select value={exceptionForm.type} onChange={(e) => setExceptionForm((p) => ({ ...p, type: e.target.value }))} className={inputClass}>
                              {EXCEPTION_TYPES.map((t) => <option key={t} value={t}>{EXCEPTION_TYPE_LABELS[t]}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Severity *</label>
                            <select value={exceptionForm.severity} onChange={(e) => setExceptionForm((p) => ({ ...p, severity: e.target.value }))} className={inputClass}>
                              {EXCEPTION_SEVERITIES.map((s) => <option key={s} value={s}>{EXCEPTION_SEVERITY_LABELS[s]}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Title *</label>
                          <input value={exceptionForm.title} onChange={(e) => setExceptionForm((p) => ({ ...p, title: e.target.value }))} className={inputClass} required />
                        </div>
                        <div>
                          <label className={labelClass}>Customer Message</label>
                          <textarea value={exceptionForm.customer_message} onChange={(e) => setExceptionForm((p) => ({ ...p, customer_message: e.target.value }))} className={`${inputClass} min-h-[60px]`} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={labelClass}>Location</label>
                            <input value={exceptionForm.location} onChange={(e) => setExceptionForm((p) => ({ ...p, location: e.target.value }))} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Updated ETA</label>
                            <input type="datetime-local" value={exceptionForm.updated_eta} onChange={(e) => setExceptionForm((p) => ({ ...p, updated_eta: e.target.value }))} className={inputClass} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="edit_action_required" checked={exceptionForm.action_required} onChange={(e) => setExceptionForm((p) => ({ ...p, action_required: e.target.checked }))} className="rounded border-gray-300 text-orange focus:ring-orange" />
                          <label htmlFor="edit_action_required" className="text-sm text-gray-700">Customer action required</label>
                        </div>
                        {exceptionForm.action_required && (
                          <div>
                            <label className={labelClass}>Action Button Label</label>
                            <input value={exceptionForm.action_label} onChange={(e) => setExceptionForm((p) => ({ ...p, action_label: e.target.value }))} className={inputClass} />
                          </div>
                        )}
                        <div>
                          <label className={labelClass}>Internal Note (admin only)</label>
                          <textarea value={exceptionForm.internal_note} onChange={(e) => setExceptionForm((p) => ({ ...p, internal_note: e.target.value }))} className={`${inputClass} min-h-[50px]`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="submit" disabled={updatingException} className="bg-orange hover:bg-orange-dark disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                            {updatingException ? "Saving..." : "Save Changes"}
                          </button>
                          <button type="button" onClick={handleCancelEditException} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200">
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Display Mode */
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                          {getSeverityIcon(ex.severity)}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-sm text-navy">{ex.title}</p>
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${getSeverityBadge(ex.severity)}`}>
                                {ex.severity}
                              </span>
                              <span className="text-[10px] font-medium text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                                {EXCEPTION_TYPE_LABELS[ex.type as keyof typeof EXCEPTION_TYPE_LABELS] || ex.type}
                              </span>
                            </div>
                            {ex.customer_message && <p className="text-xs text-gray-600 mt-1">{ex.customer_message}</p>}
                            <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                              {ex.location && <span>📍 {ex.location}</span>}
                              {ex.updated_eta && <span>⏱ New ETA: {formatDate(ex.updated_eta)}</span>}
                              {ex.action_required && <span className="text-red-600 font-medium">⚠ Action required{ex.action_label ? `: ${ex.action_label}` : ""}</span>}
                            </div>
                            {ex.internal_note && (
                              <p className="mt-2 text-[11px] text-gray-500 bg-yellow-50 border border-yellow-200 rounded px-2 py-1.5">
                                <span className="font-semibold">Internal:</span> {ex.internal_note}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => handleStartEditException(ex)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors" title="Edit">
                            <Save className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleResolveException(ex.id)} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors" title="Resolve">
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDeleteException(ex.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Resolved Exceptions */}
            {resolvedExceptions.length > 0 && (
              <details className="group">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                  {resolvedExceptions.length} resolved exception{resolvedExceptions.length > 1 ? "s" : ""}
                </summary>
                <div className="mt-2 space-y-2">
                  {resolvedExceptions.map((ex) => (
                    <div key={ex.id} className="border border-gray-200 bg-gray-50 rounded-xl p-3 opacity-60">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                          <p className="text-xs font-medium text-gray-600 line-through">{ex.title}</p>
                          <span className="text-[10px] text-gray-400">Resolved {ex.resolved_at ? formatDate(ex.resolved_at) : ""}</span>
                        </div>
                        <button onClick={() => handleDeleteException(ex.id)} className="p-1 rounded text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {exceptions.length === 0 && !showExceptionForm && (
              <p className="text-gray-400 text-sm py-3 text-center">No exceptions recorded.</p>
            )}
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-orange" />
              <h3 className="font-semibold text-navy text-sm">Tracking Timeline ({trackingEvents.length} events)</h3>
            </div>
            {trackingEvents.length > 0 ? (
              <TrackingTimeline events={trackingEvents} />
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