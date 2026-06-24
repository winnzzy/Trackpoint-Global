'use client';

import { useState, useTransition } from 'react';
import { updateCompanySettings } from '@/lib/actions/settings';
import { CompanySettings } from '@/types';

interface SettingsFormProps {
  initialSettings: CompanySettings | null;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const defaults: Record<string, string> = {
    company_name: 'TrackPoint Global',
    tagline: 'Fast, Reliable, Global Courier Services',
    support_email: 'support@trackpointglobal.com',
    support_phone: '+234 800 555 0199',
    office_address: '123 Logistics Avenue, Victoria Island, Lagos, Nigeria',
    business_hours: 'Mon – Fri: 8:00 AM – 6:00 PM (WAT) | Sat: 9:00 AM – 2:00 PM',
    logo_url: '',
    brand_color: '#2563eb',
    company_description: '',
    default_origin_country: 'Nigeria',
    default_origin_city: 'Lagos',
    default_support_response: '',
    default_tracking_help: '',
  };

  const getVal = (key: string) =>
    initialSettings?.[key as keyof CompanySettings]?.toString() || defaults[key] || '';

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateCompanySettings(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save settings.' });
      }
    });
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your company profile, contact details, and operational defaults.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg p-4 text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}

      <form action={handleSubmit} className="space-y-8">
        {/* Company Profile Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Company Profile
            </h2>
            <p className="text-sm text-gray-500 mt-1">Basic company information shown on your public pages.</p>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  defaultValue={getVal('company_name')}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  defaultValue={getVal('tagline')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company_description" className="block text-sm font-medium text-gray-700 mb-1.5">
                Company Description
              </label>
              <textarea
                id="company_description"
                name="company_description"
                rows={3}
                defaultValue={getVal('company_description')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-y"
              />
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">Contact information displayed on your public contact page.</p>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="support_email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Support Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="support_email"
                  name="support_email"
                  defaultValue={getVal('support_email')}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="support_phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Support Phone
                </label>
                <input
                  type="text"
                  id="support_phone"
                  name="support_phone"
                  defaultValue={getVal('support_phone')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="office_address" className="block text-sm font-medium text-gray-700 mb-1.5">
                Office Address
              </label>
              <input
                type="text"
                id="office_address"
                name="office_address"
                defaultValue={getVal('office_address')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="business_hours" className="block text-sm font-medium text-gray-700 mb-1.5">
                Business Hours
              </label>
              <input
                type="text"
                id="business_hours"
                name="business_hours"
                defaultValue={getVal('business_hours')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Branding Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Branding
            </h2>
            <p className="text-sm text-gray-500 mt-1">Visual identity settings for your courier brand.</p>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Logo URL
                </label>
                <input
                  type="url"
                  id="logo_url"
                  name="logo_url"
                  defaultValue={getVal('logo_url')}
                  placeholder="https://example.com/logo.png"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
                <p className="mt-1 text-xs text-gray-400">Enter a URL to your company logo image.</p>
              </div>
              <div>
                <label htmlFor="brand_color" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Brand Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="brand_color_picker"
                    defaultValue={getVal('brand_color') || '#2563eb'}
                    className="h-10 w-14 rounded border border-gray-300 cursor-pointer"
                    onChange={(e) => {
                      const input = document.getElementById('brand_color') as HTMLInputElement;
                      if (input) input.value = e.target.value;
                    }}
                  />
                  <input
                    type="text"
                    id="brand_color"
                    name="brand_color"
                    defaultValue={getVal('brand_color') || '#2563eb'}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operations / Defaults Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Operations & Defaults
            </h2>
            <p className="text-sm text-gray-500 mt-1">Default values used when creating new shipments.</p>
          </div>
          <div className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="default_origin_country" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Default Origin Country
                </label>
                <input
                  type="text"
                  id="default_origin_country"
                  name="default_origin_country"
                  defaultValue={getVal('default_origin_country')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="default_origin_city" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Default Origin City
                </label>
                <input
                  type="text"
                  id="default_origin_city"
                  name="default_origin_city"
                  defaultValue={getVal('default_origin_city')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="default_support_response" className="block text-sm font-medium text-gray-700 mb-1.5">
                Default Support Response Note
              </label>
              <textarea
                id="default_support_response"
                name="default_support_response"
                rows={2}
                defaultValue={getVal('default_support_response')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-y"
              />
              <p className="mt-1 text-xs text-gray-400">Shown as a note on the contact page.</p>
            </div>
            <div>
              <label htmlFor="default_tracking_help" className="block text-sm font-medium text-gray-700 mb-1.5">
                Default Tracking Help Message
              </label>
              <textarea
                id="default_tracking_help"
                name="default_tracking_help"
                rows={2}
                defaultValue={getVal('default_tracking_help')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-y"
              />
              <p className="mt-1 text-xs text-gray-400">Helper text shown on the public tracking page.</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2 pb-4">
          <p className="text-xs text-gray-400">
            Settings are applied to your public pages immediately after saving.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}