"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { deleteShipment } from "@/lib/actions/shipments";
import StatusBadge from "@/components/shared/StatusBadge";
import { Search, Plus, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

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
  shipment_type: string;
  created_at: string;
}

interface ShipmentsListClientProps {
  initialShipments: Shipment[];
  error: string | null;
}

const PAGE_SIZE = 15;

export default function ShipmentsListClient({
  initialShipments,
  error,
}: ShipmentsListClientProps) {
  const router = useRouter();
  const [shipments, setShipments] = useState(initialShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter shipments
  const filtered = shipments.filter((s) => {
    const matchesSearch =
      search === "" ||
      s.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
      s.sender_name.toLowerCase().includes(search.toLowerCase()) ||
      s.receiver_name.toLowerCase().includes(search.toLowerCase()) ||
      s.destination_city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedShipments = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shipment? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    const { error: deleteError } = await deleteShipment(id);
    setDeletingId(null);

    if (deleteError) {
      alert(`Failed to delete: ${deleteError}`);
    } else {
      setShipments((prev) => prev.filter((s) => s.id !== id));
      router.refresh();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatuses = () => {
    const statuses = new Set(shipments.map((s) => s.status));
    return ["all", ...Array.from(statuses)];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">All Shipments</h1>
          <p className="text-gray-500 text-sm">{filtered.length} shipments found</p>
        </div>
        <Link
          href="/admin/shipments/new"
          className="bg-orange hover:bg-orange-dark text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Create Shipment
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tracking #, sender, receiver..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-orange/20 focus:border-orange"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {getStatuses().map((status) => (
            <button
              key={status}
              onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === status
                  ? "bg-orange text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {status === "all" ? "All" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Tracking #</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden md:table-cell">Sender</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden md:table-cell">Receiver</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Route</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden lg:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden lg:table-cell">Created</th>
                <th className="text-right px-4 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedShipments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    {shipments.length === 0
                      ? "No shipments yet. Create your first one!"
                      : "No shipments match your filters."}
                  </td>
                </tr>
              ) : (
                paginatedShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-navy font-medium">
                      {shipment.tracking_number}
                    </td>
                    <td className="px-4 py-3 text-gray-700 hidden md:table-cell text-xs">{shipment.sender_name}</td>
                    <td className="px-4 py-3 text-gray-700 hidden md:table-cell text-xs">{shipment.receiver_name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {shipment.origin_city} → {shipment.destination_city}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={shipment.status} className="text-xs" />
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{shipment.shipment_type}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{formatDate(shipment.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/shipments/${shipment.id}`}
                          className="text-orange hover:text-orange-dark font-medium text-xs"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(shipment.id)}
                          disabled={deletingId === shipment.id}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50"
                          title="Delete shipment"
                        >
                          {deletingId === shipment.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    currentPage === page
                      ? "bg-orange text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}