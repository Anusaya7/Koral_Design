"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, CheckCircle2, Eye, Layout, Compass, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<"hero" | "practice" | "location" | "cta">("hero");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [homepageContent, setHomepageContent] = useState<Record<string, string>>({
    hero_tagline: "QUALITY YOU CAN TRUST",
    hero_heading_line1: "Architecture.",
    hero_heading_line2: "Engineered.",
    hero_subheading: "Industrial campuses, commercial structures, land development, and statutory authority approvals across Pune and Maharashtra.",
    hero_button_text: "EXPLORE PROJECTS",
    hero_visible: "true",

    practice_tagline: "01 / PRACTICE STATEMENT",
    practice_heading: "WHERE ARCHITECTURAL VISION MEETS STATUTORY & STRUCTURAL REALITY.",
    practice_paragraph_1: "Korals Design Private Limited is an integrated architecture, civil engineering, land surveying, and project management consultancy headquartered in Pune, Maharashtra. We design built environments that seamlessly bridge design excellence with industrial operational efficiency.",
    practice_paragraph_2: "From precision land survey demarcation and contour modeling to complex MIDC industrial master plans and PMC site supervision, our multi-disciplinary practice delivers total lifecycle authority across Maharashtra's built landscape.",

    location_tagline: "05 / PRACTICE HEADQUARTERS",
    location_heading: "GROUNDED IN PUNE.",
    location_subheading: "Registered office in Parvati, Pune — servicing key MIDC corridors and urban municipal corporations across Western India.",

    home_cta_heading_1: "START YOUR",
    home_cta_heading_2: "NEXT PROJECT.",
    home_cta_subheading: "Consult our architectural and engineering teams on land viability, statutory sanctions, master planning, or structural execution.",
    home_cta_button_text: "START A PROJECT",
  });

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.homepage) {
          setHomepageContent((prev) => ({
            ...prev,
            ...data.homepage,
          }));
        }
      })
      .catch((err) => console.error("Error loading homepage content:", err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "homepage",
          data: homepageContent,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save homepage CMS content");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving content";
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, val: string) => {
    setHomepageContent((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              02 / HOMEPAGE CMS
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              HOMEPAGE CONTENT MANAGEMENT
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Direct live control over Hero banner, Practice Statement, Location showcase, and Call to Action
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E8E5] bg-white text-xs font-mono text-[#171717] hover:bg-[#F7F7F5]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PREVIEW HOMEPAGE</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "SAVING..." : "SAVE ALL CHANGES"}</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl animate-fade-in uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>HOMEPAGE CONTENT SAVED AND PUBLISHED LIVE! RELOAD THE HOMEPAGE TO VERIFY.</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E8E5] pb-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab("hero")}
            className={`px-5 py-2.5 rounded-full font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "hero"
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>01 / HERO SECTION</span>
          </button>

          <button
            onClick={() => setActiveTab("practice")}
            className={`px-5 py-2.5 rounded-full font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "practice"
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>02 / PRACTICE STATEMENT</span>
          </button>

          <button
            onClick={() => setActiveTab("location")}
            className={`px-5 py-2.5 rounded-full font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "location"
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>03 / HEADQUARTERS LOCATION</span>
          </button>

          <button
            onClick={() => setActiveTab("cta")}
            className={`px-5 py-2.5 rounded-full font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "cta"
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>04 / FOOTER PROJECT CTA</span>
          </button>
        </div>

        {/* Tab 1: Hero Section */}
        {activeTab === "hero" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#171717] uppercase">HERO SECTION SETTINGS</h2>
                <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                  Controls the primary full-screen architectural headline on the home page.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#171717] font-semibold">Section Visibility:</span>
                <button
                  type="button"
                  onClick={() => updateField("hero_visible", homepageContent.hero_visible === "false" ? "true" : "false")}
                  className={`px-4 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase transition-all ${
                    homepageContent.hero_visible !== "false"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-rose-100 text-rose-900 border border-rose-300"
                  }`}
                >
                  {homepageContent.hero_visible !== "false" ? "ACTIVE / VISIBLE" : "HIDDEN"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  EYEBROW BADGE / TAGLINE *
                </label>
                <input
                  type="text"
                  value={homepageContent.hero_tagline || ""}
                  onChange={(e) => updateField("hero_tagline", e.target.value)}
                  placeholder="QUALITY YOU CAN TRUST"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    HEADING LINE 1 *
                  </label>
                  <input
                    type="text"
                    value={homepageContent.hero_heading_line1 || ""}
                    onChange={(e) => updateField("hero_heading_line1", e.target.value)}
                    placeholder="Architecture."
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    HEADING LINE 2 (ITALIC SERIF) *
                  </label>
                  <input
                    type="text"
                    value={homepageContent.hero_heading_line2 || ""}
                    onChange={(e) => updateField("hero_heading_line2", e.target.value)}
                    placeholder="Engineered."
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  SUBHEADING / PRACTICE SCOPE STATEMENT *
                </label>
                <textarea
                  rows={3}
                  value={homepageContent.hero_subheading || ""}
                  onChange={(e) => updateField("hero_subheading", e.target.value)}
                  placeholder="Industrial campuses, commercial structures, land development, and statutory authority approvals across Pune and Maharashtra."
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  CTA BUTTON TEXT *
                </label>
                <input
                  type="text"
                  value={homepageContent.hero_button_text || ""}
                  onChange={(e) => updateField("hero_button_text", e.target.value)}
                  placeholder="EXPLORE PROJECTS"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Practice Statement */}
        {activeTab === "practice" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4">
              <h2 className="text-xl font-bold text-[#171717] uppercase">PRACTICE STATEMENT SETTINGS</h2>
              <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                Governs Section 01 on the home page — positioning Korals Design as an integrated architecture and PMC consultancy.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  SECTION TAGLINE / BADGE *
                </label>
                <input
                  type="text"
                  value={homepageContent.practice_tagline || ""}
                  onChange={(e) => updateField("practice_tagline", e.target.value)}
                  placeholder="01 / PRACTICE STATEMENT"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  PRIMARY STATEMENT HEADLINE *
                </label>
                <textarea
                  rows={2}
                  value={homepageContent.practice_heading || ""}
                  onChange={(e) => updateField("practice_heading", e.target.value)}
                  placeholder="WHERE ARCHITECTURAL VISION MEETS STATUTORY & STRUCTURAL REALITY."
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] font-bold focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  PRIMARY PARAGRAPH (LARGE LEAD-IN) *
                </label>
                <textarea
                  rows={3}
                  value={homepageContent.practice_paragraph_1 || ""}
                  onChange={(e) => updateField("practice_paragraph_1", e.target.value)}
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  SECONDARY PARAGRAPH (DETAILED SCOPE) *
                </label>
                <textarea
                  rows={3}
                  value={homepageContent.practice_paragraph_2 || ""}
                  onChange={(e) => updateField("practice_paragraph_2", e.target.value)}
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Headquarters Location */}
        {activeTab === "location" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4">
              <h2 className="text-xl font-bold text-[#171717] uppercase">HEADQUARTERS LOCATION COPY</h2>
              <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                Headline and descriptive copy for the Pune headquarters visual showcase.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  LOCATION SECTION TAGLINE *
                </label>
                <input
                  type="text"
                  value={homepageContent.location_tagline || ""}
                  onChange={(e) => updateField("location_tagline", e.target.value)}
                  placeholder="05 / PRACTICE HEADQUARTERS"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  LOCATION SECTION HEADING *
                </label>
                <input
                  type="text"
                  value={homepageContent.location_heading || ""}
                  onChange={(e) => updateField("location_heading", e.target.value)}
                  placeholder="GROUNDED IN PUNE."
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  LOCATION SUBHEADING / CONTEXT *
                </label>
                <textarea
                  rows={3}
                  value={homepageContent.location_subheading || ""}
                  onChange={(e) => updateField("location_subheading", e.target.value)}
                  placeholder="Registered office in Parvati, Pune — servicing key MIDC corridors and urban municipal corporations across Western India."
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Footer Project CTA */}
        {activeTab === "cta" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
            <div className="border-b border-[#E8E8E5] pb-4">
              <h2 className="text-xl font-bold text-[#171717] uppercase">FOOTER CALL TO ACTION BANNER</h2>
              <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                Controls the large dark engagement banner directly above the homepage footer.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    HEADING LINE 1 *
                  </label>
                  <input
                    type="text"
                    value={homepageContent.home_cta_heading_1 || ""}
                    onChange={(e) => updateField("home_cta_heading_1", e.target.value)}
                    placeholder="START YOUR"
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    HEADING LINE 2 (SERIF ITALIC) *
                  </label>
                  <input
                    type="text"
                    value={homepageContent.home_cta_heading_2 || ""}
                    onChange={(e) => updateField("home_cta_heading_2", e.target.value)}
                    placeholder="NEXT PROJECT."
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  SUBHEADING / ENGAGEMENT TEXT *
                </label>
                <textarea
                  rows={3}
                  value={homepageContent.home_cta_subheading || ""}
                  onChange={(e) => updateField("home_cta_subheading", e.target.value)}
                  placeholder="Consult our architectural and engineering teams on land viability, statutory sanctions, master planning, or structural execution."
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  CTA BUTTON TEXT *
                </label>
                <input
                  type="text"
                  value={homepageContent.home_cta_button_text || ""}
                  onChange={(e) => updateField("home_cta_button_text", e.target.value)}
                  placeholder="START A PROJECT"
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Save Bar */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8E8E5] flex items-center justify-between shadow-xs">
          <span className="text-xs font-mono text-[#6B6B6B]">
            Ensure all architectural information complies with Korals Design practice guidelines.
          </span>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#171717] text-white px-8 py-3 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "SAVING HOMEPAGE..." : "SAVE HOMEPAGE CONTENT"}</span>
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
