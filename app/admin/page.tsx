"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
} from "lucide-react";

interface Stats {
  total: number;
  inTransit: number;
  delivered: number;
  pending: number;
  delayed: number;
}

interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  receiver_name: string;
  origin_city: string;
  destination_city: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, inTransit: 0, delivered: 0, pending: 0, delayed: 0 });
  const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: shipments } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (shipments) {
        setStats({
          total: shipments.length,
          inTransit: shipments.filter((s: Shipment) => s.status === "In Transit").length,
          delivered: shipments.filter((s: Shipment) => s.status === "Delivered").length,
          pending: shipments.filter((s: Shipment) => ["Pending", "Shipment Created", "Processing"].includes(s.status)).length,
          delayed: shipments.filter((s: Shipment) => ["Delayed", "On Hold"].includes(s.status)).length,
        });
        setRecentShipments(shipments.slice(0, 5));
      }
      setLoading(false);
    };
    fetchData();
  }, [supabase]);

  const statCards = [
    { label: "Total Shipments", value: stats.total, icon: Package, color: "bg-blue-500", bg: "bg-blue-50" },
    { label: "In Transit", value: stats.inTransit, icon: Truck, color: "bg-orange", bg: "bg-orange-50" },
    { label: "Delivered", value: stats.delivered, icon: CheckCircle, color: "bg-green-500", bg: "bg-green-50" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "bg-yellow-500", bg: "bg-yellow-50" },
    { label: "Delayed / On Hold", value: stats.delayed, icon: AlertTriangle, color: "bg-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of your shipments and operations</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/shipments/new"
            className="bg-orange hover:bg-orange-dark text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create Shipment
          </Link>
          <Link
            href="/admin/shipments"
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors inline-flex items-center gap-2 border border-gray-200"
          >
            <Eye className="h-4 w-4" /> View All
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className={`${card.bg} rounded-xl p-5 border border-gray-100`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`${card.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">
              {loading ? "—" : card.value}
            </div>
            <div className="text-sm text-gray-600 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-navy">Recent Shipments</h2>
          <Link href="/admin/shipments" className="text-sm text-orange hover:text-orange-dark font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Tracking #</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Sender</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Receiver</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden md:table-cell">Route</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : recentShipments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No shipments yet.{" "}
                    <Link href="/admin/shipments/new" className="text-orange hover:underline">
                      Create one
                    </Link>
                  </td>
                </tr>
              ) : (
                recentShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-mono text-xs text-navy font-medium">
                      {shipment.tracking_number}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{shipment.sender_name}</td>
                    <td className="px-6 py-3 text-gray-700">{shipment.receiver_name}</td>
                    <td className="px-6 py-3 text-gray-500 text-xs hidden md:table-cell">
                      {shipment.origin_city} → {shipment.destination_city}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={shipment.status} className="text-xs" />
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-xs hidden lg:table-cell">
                      {formatDate(shipment.created_at)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Link
                        href={`/admin/shipments/${shipment.id}`}
                        className="text-orange hover:text-orange-dark font-medium text-xs"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}