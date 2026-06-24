"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Shield, Bell, Database } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string; id?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase.auth]);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your admin account and preferences</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-orange" />
          <h2 className="font-semibold text-navy">Account Information</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-sm text-navy font-medium">
                {loading ? "Loading..." : user?.email || "Not available"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
              <p className="text-sm text-gray-600 font-mono">
                {loading ? "Loading..." : user?.id?.slice(0, 8) + "..." || "—"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-orange" />
          <h2 className="font-semibold text-navy">Security</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Password management is handled through Supabase Auth. Contact your system administrator to reset your password.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            <strong>Two-Factor Authentication:</strong> For enhanced security, enable 2FA in your Supabase dashboard under Authentication → Settings.
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-orange" />
          <h2 className="font-semibold text-navy">Notifications</h2>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-orange rounded border-gray-300 focus:ring-orange" />
            <span className="text-sm text-gray-700">Email notifications for new shipments</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-orange rounded border-gray-300 focus:ring-orange" />
            <span className="text-sm text-gray-700">Email notifications for delivery status changes</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-orange rounded border-gray-300 focus:ring-orange" />
            <span className="text-sm text-gray-700">Daily shipment summary reports</span>
          </label>
        </div>
        <button
          onClick={() => toast.success("Notification preferences saved")}
          className="mt-4 px-4 py-2 rounded-xl text-sm font-medium text-white bg-orange hover:bg-orange-dark transition-colors"
        >
          Save Preferences
        </button>
      </div>

      {/* Database */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="h-5 w-5 text-orange" />
          <h2 className="font-semibold text-navy">Database</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Database management is handled through the Supabase dashboard. Use it to manage tables, run SQL queries, and configure row-level security policies.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">
            <strong>Tables:</strong> shipments, tracking_events
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Auth:</strong> Supabase Auth (email/password)
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Storage:</strong> Supabase Storage (available for future use)
          </p>
        </div>
      </div>
    </div>
  );
}