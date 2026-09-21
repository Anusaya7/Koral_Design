"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, CheckCircle2, RefreshCw } from "lucide-react";

interface SeoSetting {
  page_key: string;
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
}

export default function AdminSeoPage() {
  const [seoList, setSeoList] = useState<SeoSetting[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [currentSeo, setCurrentSeo] = useState<SeoSetting>({
    page_key: "home",
    title: "",
    description: "",
    og_title: "",
    og_description: "",
    og_image: "",
    canonical_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadSeo = useCallback(async () => {
    try {
      const res = await fetch("/api/seo");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSeoList(data);
        const homeEntry = data.find((item) => item.page_key === selectedPage) || data[0];
        if (homeEntry) setCurrentSeo(homeEntry);
      }
    } catch (err) {
      console.error("Error loading SEO:", err);
    }
  }, [selectedPage]);

  useEffect(() => {
    loadSeo();
  }, [loadSeo]);

  const handleSelectPage = (pageKey: string) => {
    setSelectedPage(pageKey);
    const found = seoList.find((item) => item.page_key === pageKey);
    if (found) {
      setCurrentSeo(found);
    } else {
      setCurrentSeo({
        page_key: pageKey,
        title: `Korals Design Private Limited | ${pageKey.toUpperCase()}`,
        description: "",
        og_title: "",
        og_description: "",
        og_image: "/images/hero_villa_render.jpg",
        canonical_url: `https://www.koralsdesign.com/${pageKey === "home" ? "" : pageKey}`,
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSeo),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save SEO metadata");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      await loadSeo();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving SEO";
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  const pages = [
    { key: "home", label: "HOME PAGE" },
    { key: "about", label: "ABOUT PRACTICE" },
    { key: "projects", label: "PROJECTS PORTFOLIO" },
    { key: "services", label: "SERVICES & DISCIPLINES" },
    { key: "careers", label: "CAREERS & VACANCIES" },
    { key: "contact", label: "CONTACT & PUNE HQ" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              10 / SEARCH ENGINE OPTIMIZATION
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              PRACTICE SEO &amp; SOCIAL METADATA
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Configure search engine titles, descriptions, and OpenGraph social preview tags across all public pages
            </p>
          </div>

          <button
            onClick={loadSeo}
            className="p-2.5 rounded-full border border-[#E8E8E5] bg-white text-[#171717] hover:bg-[#F7F7F5] transition-colors self-start sm:self-auto"
            title="Refresh SEO Settings"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl animate-fade-in uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>SEO METADATA UPDATED AND SAVED TO DATABASE!</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {/* Page Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E8E5] pb-4 font-mono text-xs">
          {pages.map((p) => (
            <button
              key={p.key}
              onClick={() => handleSelectPage(p.key)}
              className={`px-5 py-2.5 rounded-full font-bold uppercase transition-all cursor-pointer ${
                selectedPage === p.key
                  ? "bg-[#171717] text-white shadow-xs"
                  : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* SEO Editor Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs font-sans">
          <div className="border-b border-[#E8E8E5] pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#171717] uppercase font-sans">
                EDITING: /{selectedPage === "home" ? "" : selectedPage}
              </h2>
              <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                Canonical URL: {currentSeo.canonical_url || `https://www.koralsdesign.com/${selectedPage === "home" ? "" : selectedPage}`}
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#E8E8E5] font-bold uppercase">
              PAGE: {selectedPage}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono font-semibold uppercase text-[#171717]">
                  PAGE HTML TITLE TAG *
                </label>
                <span className="text-[10px] font-mono text-[#6B6B6B]">
                  {currentSeo.title.length}/60 chars (optimal: 50-60)
                </span>
              </div>
              <input
                type="text"
                required
                value={currentSeo.title}
                onChange={(e) => setCurrentSeo({ ...currentSeo, title: e.target.value })}
                placeholder="Korals Design Private Limited | Architecture &amp; Civil Engineering • Pune"
                className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono font-semibold uppercase text-[#171717]">
                  META DESCRIPTION *
                </label>
                <span className="text-[10px] font-mono text-[#6B6B6B]">
                  {currentSeo.description.length}/160 chars (optimal: 120-160)
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={currentSeo.description}
                onChange={(e) => setCurrentSeo({ ...currentSeo, description: e.target.value })}
                placeholder="Korals Design Private Limited is an integrated architecture, civil engineering, land surveying, and project management consultancy in Pune, Maharashtra."
                className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            {/* Google Search Engine Preview Card */}
            <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#6B6B6B] block">Search Result Snippet Preview</span>
              <div className="text-[#1a0dab] font-sans text-base hover:underline cursor-pointer font-medium line-clamp-1">
                {currentSeo.title || "Page Title Here"}
              </div>
              <div className="text-[#006621] text-xs font-sans">
                {currentSeo.canonical_url || `https://www.koralsdesign.com/${selectedPage}`}
              </div>
              <div className="text-[#545454] text-xs font-sans line-clamp-2">
                {currentSeo.description || "Page meta description snippet preview..."}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E8E5] space-y-4">
              <h3 className="font-bold text-sm text-[#171717] uppercase font-mono">
                OPEN GRAPH / SOCIAL SHARING METADATA
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    OG:TITLE
                  </label>
                  <input
                    type="text"
                    value={currentSeo.og_title || ""}
                    onChange={(e) => setCurrentSeo({ ...currentSeo, og_title: e.target.value })}
                    placeholder={currentSeo.title}
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    OG:IMAGE PATH
                  </label>
                  <input
                    type="text"
                    value={currentSeo.og_image || ""}
                    onChange={(e) => setCurrentSeo({ ...currentSeo, og_image: e.target.value })}
                    placeholder="/images/hero_villa_render.jpg"
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  OG:DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={currentSeo.og_description || ""}
                  onChange={(e) => setCurrentSeo({ ...currentSeo, og_description: e.target.value })}
                  placeholder={currentSeo.description}
                  className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                  CANONICAL URL
                </label>
                <input
                  type="url"
                  value={currentSeo.canonical_url || ""}
                  onChange={(e) => setCurrentSeo({ ...currentSeo, canonical_url: e.target.value })}
                  placeholder={`https://www.koralsdesign.com/${selectedPage === "home" ? "" : selectedPage}`}
                  className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#171717] text-white px-8 py-3 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "SAVING..." : `SAVE SEO FOR ${selectedPage.toUpperCase()}`}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </AdminLayout>
  );
}
