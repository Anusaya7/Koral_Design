"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Settings, Save, CheckCircle2, MapPin, Phone } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: "KORALS DESIGN PVT LTD",
    company_legal_name: "Korals Design Private Limited",
    address: "201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030",
    phone: "+020 - 24324648",
    mobile: "+91 9822864648",
    email: "projects@koralsdesign.com",
    career_email: "projects@koralsdesign.com",
    location_city: "Parvati, Pune, Maharashtra, India",
    google_maps_url: "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9?g_st=ac",
    hours: "Monday – Saturday: 9:30 AM – 6:30 PM IST",
    cin: "U74210PN2020PTC196803",
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      if (data && data.siteSettings) {
        setSettings((prev) => ({ ...prev, ...data.siteSettings }));
      }
    } catch (err) {
      console.error("Error loading settings:", err);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "siteSettings",
          data: settings,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save site settings");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving settings";
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              11 / PRACTICE CONFIGURATION
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              PRACTICE IDENTITY &amp; CONTACT SETTINGS
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Official company registration, registered headquarters address, telephone numbers, and Google Maps pin
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "SAVING..." : "SAVE SITE SETTINGS"}</span>
          </button>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl animate-fade-in uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>PRACTICE SETTINGS UPDATED AND SYNCHRONIZED ACROSS SITE!</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Group 1: Corporate Legal Identity */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#171717]" />
              <h2 className="text-lg font-bold text-[#171717] uppercase">
                CORPORATE LEGAL IDENTITY
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  COMPANY DISPLAY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={settings.company_name || ""}
                  onChange={(e) => updateSetting("company_name", e.target.value)}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  LEGAL REGISTERED ENTITY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={settings.company_legal_name || ""}
                  onChange={(e) => updateSetting("company_legal_name", e.target.value)}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  CORPORATE IDENTITY NUMBER (CIN)
                </label>
                <input
                  type="text"
                  value={settings.cin || ""}
                  onChange={(e) => updateSetting("cin", e.target.value)}
                  placeholder="U74210PN2020PTC196803"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  PRIMARY JURISDICTION CITY *
                </label>
                <input
                  type="text"
                  required
                  value={settings.location_city || ""}
                  onChange={(e) => updateSetting("location_city", e.target.value)}
                  placeholder="Parvati, Pune, Maharashtra, India"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </div>

          {/* Group 2: Headquarters Address & Location */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#171717]" />
              <h2 className="text-lg font-bold text-[#171717] uppercase">
                HEADQUARTERS ADDRESS &amp; MAPS
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  REGISTERED OFFICE POSTAL ADDRESS *
                </label>
                <textarea
                  rows={2}
                  required
                  value={settings.address || ""}
                  onChange={(e) => updateSetting("address", e.target.value)}
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  GOOGLE MAPS VERIFIED LINK *
                </label>
                <input
                  type="url"
                  required
                  value={settings.google_maps_url || ""}
                  onChange={(e) => updateSetting("google_maps_url", e.target.value)}
                  placeholder="https://maps.app.goo.gl/..."
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </div>

          {/* Group 3: Telecommunications & Inboxes */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#171717]" />
              <h2 className="text-lg font-bold text-[#171717] uppercase">
                TELECOMMUNICATIONS &amp; INBOXES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  PUNE LANDLINE PHONE *
                </label>
                <input
                  type="text"
                  required
                  value={settings.phone || ""}
                  onChange={(e) => updateSetting("phone", e.target.value)}
                  placeholder="+020 - 24324648"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  DIRECT MOBILE NUMBER *
                </label>
                <input
                  type="text"
                  required
                  value={settings.mobile || ""}
                  onChange={(e) => updateSetting("mobile", e.target.value)}
                  placeholder="+91 9822864648"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  OFFICIAL ENQUIRY EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={settings.email || ""}
                  onChange={(e) => updateSetting("email", e.target.value)}
                  placeholder="projects@koralsdesign.com"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  TALENT &amp; CAREERS EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={settings.career_email || ""}
                  onChange={(e) => updateSetting("career_email", e.target.value)}
                  placeholder="projects@koralsdesign.com"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  PRACTICE OPERATIONAL HOURS *
                </label>
                <input
                  type="text"
                  value={settings.hours || ""}
                  onChange={(e) => updateSetting("hours", e.target.value)}
                  placeholder="Monday – Saturday: 9:30 AM – 6:30 PM IST"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#E8E8E5] flex items-center justify-between shadow-xs">
            <span className="text-xs font-mono text-[#6B6B6B]">
              Changes update immediately across Header, Footer, and Contact sections.
            </span>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-8 py-3 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "SAVING..." : "SAVE PRACTICE CONFIGURATION"}</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
