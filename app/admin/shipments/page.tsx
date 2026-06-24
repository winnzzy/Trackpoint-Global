"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import { SHIPMENT_STATUSES } from "@/types";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  receiver_name: string;
  origin_city: string;
  origin_country: string;
  destination_city: string;
  destination_country: string;
  status: string;
  current_location: string | null;
  shipped_at: string | null;
  created_at: string;
}

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filtered, setFiltered] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchShipments();
  }, []);

  useEffect(() => {
    let result = [...shipments];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.tracking_number.toLowerCase().includes(q) ||
          s.sender_name.toLowerCase().includes(q) ||
          s.receiver_name.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((s) => s.status === statusFilter);
    }
    setFiltered(result);
  }, [shipments, search, statusFilter]);

  const fetchShipments = async () => {
    const { data } = await supabase
      .from("shipments")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setShipments(data);
      setFiltered(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("shipments").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete shipment");
    } else {
      toast.success("Shipment deleted");
      setShipments((prev) => prev.filter((s) => s.id !== id));
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Shipments</h1>
          <p className="text-gray-500 text-sm">Manage all shipments</p>
        </div>
        <Link
          href="/admin/shipments/new"
          className="bg-orange hover:bg-orange-dark text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Shipment
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by tracking #, sender, or receiver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange focus:border-transparent text-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange focus:border-transparent text-sm bg-white appearance-none min-w-[180px]"
          >
            <option value="all">All Statuses</option>
            {SHIPMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing {filtered.length} of {shipments.length} shipments
      </p>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Tracking #</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Sender</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Receiver</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden md:table-cell">Origin</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden md:table-cell">Destination</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden lg:table-cell">Location</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={9} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    {search || statusFilter !== "all"
                      ? "No shipments match your search."
                      : "No shipments yet."}
                  </td>
                </tr>
              ) : (
                filtered.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-mono text-xs text-navy font-medium whitespace-nowrap">
                      {shipment.tracking_number}
                    </td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{shipment.sender_name}</td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{shipment.receiver_name}</td>
                    <td className="px-6 py-3 text-gray-500 text-xs hidden md:table-cell whitespace-nowrap">
                      {shipment.origin_city}, {shipment.origin_country}
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-xs hidden md:table-cell whitespace-nowrap">
                      {shipment.destination_city}, {shipment.destination_country}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={shipment.status} className="text-xs" />
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-xs hidden lg:table-cell">
                      {shipment.current_location || "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-xs hidden lg:table-cell whitespace-nowrap">
                      {formatDate(shipment.shipped_at || shipment.created_at)}
                    </td>
                    <td className="px-6 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/shipments/${shipment.id}`}
                          className="text-gray-400 hover:text-orange transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/shipments/${shipment.id}`}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(shipment.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-navy">Delete Shipment</h3>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}