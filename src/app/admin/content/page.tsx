"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, CheckCircle2 } from "lucide-react";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"settings" | "homepage" | "about">("settings");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [siteSettings, setSiteSettings] = useState({
    company_name: "KORALS DESIGN PVT LTD",
    company_legal_name: "Korals Design Private Limited",
    address: "201, Laximi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030",
    phone: "+020 - 24324648",
    mobile: "+91 9822864648",
    email: "projects@koralsdesign.com",
    career_email: "projects@koralsdesign.com",
    location_city: "Parvati, Pune, Maharashtra, India",
    google_maps_url: "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9",
  });

  const [homepageContent, setHomepageContent] = useState({
    eyebrow: "QUALITY YOU CAN TRUST",
    hero_title: "Innovating Industrial & Architectural Spaces.",
    hero_subtitle: "End-to-End Solutions — Design, Approvals and Execution.",
    hero_primary_cta_text: "Explore Projects",
    hero_primary_cta_link: "/projects",
    hero_secondary_cta_text: "Our Services",
    hero_secondary_cta_link: "/services",
  });

  const [aboutContent, setAboutContent] = useState({
    company_overview: "Korals Design Private Limited is an architectural services provider located in Pune, Maharashtra, India.",
    history_timeline: "Beginning in 2005 with Pensioners Land Surveyors Associates, expanding in 2013 into Korals Engineering Solutions Private Limited with experience across SEZs, industrial, institutional, and corporate projects, and establishing Korals Design Private Limited in 2020.",
    capabilities: "Architectural planning and design, civil engineering project management, government procedures, technical liaison with government departments, land surveying, and 3D spatial visualization.",
    culture_statement: "Professional growth, employee voice, team development, positive workplace environment, high productivity, and active employee engagement.",
  });

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.siteSettings) setSiteSettings((prev) => ({ ...prev, ...data.siteSettings }));
        if (data.homepage) setHomepageContent((prev) => ({ ...prev, ...data.homepage }));
        if (data.about) setAboutContent((prev) => ({ ...prev, ...data.about }));
      });
  }, []);

  const handleSave = async (section: "siteSettings" | "homepage" | "about") => {
    let payloadData = {};
    if (section === "siteSettings") payloadData = siteSettings;
    else if (section === "homepage") payloadData = homepageContent;
    else if (section === "about") payloadData = aboutContent;

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, data: payloadData }),
    });

    if (res.ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert("Failed to save site content.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              06 / SITE CONTENT
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              WEBSITE CONTENT CMS
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Centralized single-source-of-truth management for company information, homepage copy, and practice history
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full animate-fade-in uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CONTENT SAVED SUCCESSFULLY!</span>
            </div>
          )}
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E8E5] pb-4 font-mono">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            COMPANY CONTACT &amp; BRANDING
          </button>
          <button
            onClick={() => setActiveTab("homepage")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === "homepage"
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            HOMEPAGE COPY
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === "about"
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            ABOUT &amp; HISTORY CONTENT
          </button>
        </div>

        {/* Tab 1: Company Settings */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4">
              <h2 className="text-xl font-bold text-[#171717] uppercase">COMPANY CONTACT DETAILS &amp; LOCATION</h2>
              <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                Updates saved here synchronize across the global header, footer, contact page, and admin metadata.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  COMPANY DISPLAY NAME *
                </label>
                <input
                  type="text"
                  value={siteSettings.company_name}
                  onChange={(e) => setSiteSettings({ ...siteSettings, company_name: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  COMPANY LEGAL NAME *
                </label>
                <input
                  type="text"
                  value={siteSettings.company_legal_name}
                  onChange={(e) => setSiteSettings({ ...siteSettings, company_legal_name: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                OFFICE REGISTERED ADDRESS (PUNE) *
              </label>
              <input
                type="text"
                value={siteSettings.address}
                onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  OFFICE LANDLINE *
                </label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  MOBILE CONTACT *
                </label>
                <input
                  type="text"
                  value={siteSettings.mobile}
                  onChange={(e) => setSiteSettings({ ...siteSettings, mobile: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  OFFICIAL EMAIL *
                </label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  CAREER EMAIL *
                </label>
                <input
                  type="email"
                  value={siteSettings.career_email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, career_email: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                EXACT GOOGLE MAPS URL *
              </label>
              <input
                type="text"
                value={siteSettings.google_maps_url}
                onChange={(e) => setSiteSettings({ ...siteSettings, google_maps_url: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 font-mono text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E8E5] flex justify-end">
              <button
                onClick={() => handleSave("siteSettings")}
                className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>SAVE COMPANY DETAILS</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Homepage Copy */}
        {activeTab === "homepage" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4">
              <h2 className="text-xl font-bold text-[#171717] uppercase">HOMEPAGE COPY &amp; POSITIONING</h2>
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                HERO EYEBROW PILL
              </label>
              <input
                type="text"
                value={homepageContent.eyebrow}
                onChange={(e) => setHomepageContent({ ...homepageContent, eyebrow: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                HERO MAIN TITLE
              </label>
              <input
                type="text"
                value={homepageContent.hero_title}
                onChange={(e) => setHomepageContent({ ...homepageContent, hero_title: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                HERO SUBTITLE
              </label>
              <textarea
                rows={3}
                value={homepageContent.hero_subtitle}
                onChange={(e) => setHomepageContent({ ...homepageContent, hero_subtitle: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E8E5] flex justify-end">
              <button
                onClick={() => handleSave("homepage")}
                className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>SAVE HOMEPAGE COPY</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: About Content */}
        {activeTab === "about" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4">
              <h2 className="text-xl font-bold text-[#171717] uppercase">ABOUT COMPANY &amp; HISTORY CONTENT</h2>
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                COMPANY OVERVIEW
              </label>
              <textarea
                rows={3}
                value={aboutContent.company_overview}
                onChange={(e) => setAboutContent({ ...aboutContent, company_overview: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                PRACTICE HISTORY TIMELINE (2005 -&gt; 2013 -&gt; 2020)
              </label>
              <textarea
                rows={4}
                value={aboutContent.history_timeline}
                onChange={(e) => setAboutContent({ ...aboutContent, history_timeline: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                PEOPLE &amp; CULTURE STATEMENT
              </label>
              <textarea
                rows={3}
                value={aboutContent.culture_statement}
                onChange={(e) => setAboutContent({ ...aboutContent, culture_statement: e.target.value })}
                className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E8E5] flex justify-end">
              <button
                onClick={() => handleSave("about")}
                className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>SAVE ABOUT CONTENT</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
