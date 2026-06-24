"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createShipment } from "@/lib/actions/shipments";
import { SHIPMENT_STATUSES, SHIPMENT_TYPES, COUNTRIES } from "@/types";
import { generateTrackingNumber } from "@/lib/utils";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tracking_number: generateTrackingNumber(),
    sender_name: "",
    sender_phone: "",
    sender_email: "",
    receiver_name: "",
    receiver_phone: "",
    receiver_email: "",
    origin_country: "Nigeria",
    origin_city: "",
    destination_country: "United Kingdom",
    destination_city: "",
    shipment_type: "Standard",
    package_description: "",
    package_weight: "",
    status: "Shipment Created",
    current_location: "",
    shipped_at: new Date().toISOString().slice(0, 16),
    estimated_delivery: "",
    admin_note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await createShipment({
      tracking_number: form.tracking_number,
      sender_name: form.sender_name,
      sender_phone: form.sender_phone || null,
      sender_email: form.sender_email || null,
      receiver_name: form.receiver_name,
      receiver_phone: form.receiver_phone || null,
      receiver_email: form.receiver_email || null,
      origin_country: form.origin_country,
      origin_city: form.origin_city,
      destination_country: form.destination_country,
      destination_city: form.destination_city,
      shipment_type: form.shipment_type as "Standard" | "Express" | "International" | "Same Day" | "Economy",
      package_description: form.package_description || null,
      package_weight: form.package_weight || null,
      status: form.status as "Pending" | "Processing" | "Shipment Created" | "Picked Up" | "In Transit" | "Customs Clearance" | "Out for Delivery" | "Delivered" | "On Hold" | "Delayed" | "Returned",
      current_location: form.current_location || null,
      shipped_at: form.shipped_at || null,
      estimated_delivery: form.estimated_delivery || null,
      admin_note: form.admin_note || null,
    });

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Shipment created successfully!");
    router.push(`/admin/shipments/${data!.id}`);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange focus:border-transparent text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/shipments"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy">Create Shipment</h1>
          <p className="text-gray-500 text-sm">Register a new shipment in the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tracking Number */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Tracking Number</h2>
          <div className="flex gap-2">
            <input
              name="tracking_number"
              value={form.tracking_number}
              onChange={handleChange}
              className={`${inputClass} font-mono flex-1`}
              required
            />
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  tracking_number: generateTrackingNumber(),
                }))
              }
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              title="Generate new"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sender Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Sender Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Sender Name *</label>
              <input name="sender_name" value={form.sender_name} onChange={handleChange} className={inputClass} required placeholder="Full name" />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="sender_phone" value={form.sender_phone} onChange={handleChange} className={inputClass} placeholder="+234 xxx xxx xxxx" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Email</label>
              <input name="sender_email" type="email" value={form.sender_email} onChange={handleChange} className={inputClass} placeholder="sender@email.com" />
            </div>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Receiver Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Receiver Name *</label>
              <input name="receiver_name" value={form.receiver_name} onChange={handleChange} className={inputClass} required placeholder="Full name" />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="receiver_phone" value={form.receiver_phone} onChange={handleChange} className={inputClass} placeholder="+44 xxx xxx xxxx" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Email</label>
              <input name="receiver_email" type="email" value={form.receiver_email} onChange={handleChange} className={inputClass} placeholder="receiver@email.com" />
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Route</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Origin Country *</label>
              <select name="origin_country" value={form.origin_country} onChange={handleChange} className={inputClass} required>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Origin City *</label>
              <input name="origin_city" value={form.origin_city} onChange={handleChange} className={inputClass} required placeholder="e.g. Lagos" />
            </div>
            <div>
              <label className={labelClass}>Destination Country *</label>
              <select name="destination_country" value={form.destination_country} onChange={handleChange} className={inputClass} required>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Destination City *</label>
              <input name="destination_city" value={form.destination_city} onChange={handleChange} className={inputClass} required placeholder="e.g. London" />
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Shipment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Shipment Type *</label>
              <select name="shipment_type" value={form.shipment_type} onChange={handleChange} className={inputClass} required>
                {SHIPMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Weight (kg)</label>
              <input name="package_weight" value={form.package_weight} onChange={handleChange} className={inputClass} placeholder="e.g. 2.5" />
            </div>
            <div>
              <label className={labelClass}>Status *</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass} required>
                {SHIPMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Current Location</label>
              <input name="current_location" value={form.current_location} onChange={handleChange} className={inputClass} placeholder="e.g. Lagos Sorting Hub" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Package Description</label>
              <textarea name="package_description" value={form.package_description} onChange={handleChange} className={`${inputClass} min-h-[80px]`} placeholder="Describe the contents of the package" />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Shipped Date</label>
              <input name="shipped_at" type="datetime-local" value={form.shipped_at} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Estimated Delivery</label>
              <input name="estimated_delivery" type="datetime-local" value={form.estimated_delivery} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Admin Note */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Admin Note</h2>
          <textarea
            name="admin_note"
            value={form.admin_note}
            onChange={handleChange}
            className={`${inputClass} min-h-[80px]`}
            placeholder="Internal note (not visible to customers)"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pb-8">
          <Link
            href="/admin/shipments"
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-orange hover:bg-orange-dark disabled:opacity-60 transition-colors"
          >
            {loading ? "Creating..." : "Create Shipment"}
          </button>
        </div>
      </form>
    </div>
  );
}