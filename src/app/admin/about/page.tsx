"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, CheckCircle2, Eye, Award } from "lucide-react";
import Link from "next/link";

export default function AdminAboutPage() {
  const [aboutContent, setAboutContent] = useState({
    company_overview: "Korals Design Private Limited is an architectural services provider located in Pune, Maharashtra, India.",
    history_timeline: "Beginning in 2005 with Pensioners Land Surveyors Associates, expanding in 2013 into Korals Engineering Solutions Private Limited with experience across SEZs, industrial, institutional, and corporate projects, and establishing Korals Design Private Limited in 2020.",
    capabilities: "Architectural planning and design, civil engineering project management, government procedures, technical liaison with government departments, land surveying, and 3D spatial visualization.",
    culture_statement: "Professional growth, employee voice, team development, positive workplace environment, high productivity, and active employee engagement.",
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.about) {
          setAboutContent((prev) => ({ ...prev, ...data.about }));
        }
      })
      .catch((err) => console.error("Error loading about content:", err));
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
          section: "about",
          data: aboutContent,
        }),
      });

      if (!res.ok) throw new Error("Failed to save about content");

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving content";
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 font-sans">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              03 / PRACTICE IDENTITY
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              ABOUT PRACTICE CMS
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Practice history from 2005, organizational capabilities, and core values
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/about"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E8E5] bg-white text-xs font-mono text-[#171717] hover:bg-[#F7F7F5]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PREVIEW ABOUT PAGE</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "SAVING..." : "SAVE ABOUT CONTENT"}</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl animate-fade-in uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>ABOUT CONTENT SAVED AND PUBLISHED LIVE!</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xs space-y-6 text-xs">
          <div>
            <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
              COMPANY OVERVIEW &amp; INTRODUCTORY STATEMENT *
            </label>
            <textarea
              rows={4}
              required
              value={aboutContent.company_overview}
              onChange={(e) => setAboutContent({ ...aboutContent, company_overview: e.target.value })}
              className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <div>
            <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
              PRACTICE HISTORY TIMELINE (2005 &rarr; 2013 &rarr; 2020) *
            </label>
            <textarea
              rows={4}
              required
              value={aboutContent.history_timeline}
              onChange={(e) => setAboutContent({ ...aboutContent, history_timeline: e.target.value })}
              className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <div>
            <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
              CORE PRACTICE CAPABILITIES &amp; STATUTORY EXPERTISE *
            </label>
            <textarea
              rows={4}
              required
              value={aboutContent.capabilities}
              onChange={(e) => setAboutContent({ ...aboutContent, capabilities: e.target.value })}
              className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <div>
            <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
              ORGANIZATIONAL CULTURE &amp; VALUES STATEMENT *
            </label>
            <textarea
              rows={3}
              required
              value={aboutContent.culture_statement}
              onChange={(e) => setAboutContent({ ...aboutContent, culture_statement: e.target.value })}
              className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          {/* Leadership Governance Context */}
          <div className="pt-6 border-t border-[#E8E8E5] space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#171717]" />
              <h3 className="font-bold text-sm text-[#171717] uppercase font-mono">
                BOARD OF DIRECTORS (GOVERNANCE CONTEXT)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E8E8E5] space-y-1">
                <span className="text-[10px] text-[#6B6B6B] uppercase block">DIRECTOR</span>
                <span className="font-bold text-[#171717] block">Mahesh Govardhan</span>
                <span className="text-[11px] text-[#6B6B6B] block">Architecture, Master Planning &amp; Liaison</span>
              </div>
              <div className="p-4 bg-[#F7F7F5] rounded-xl border border-[#E8E8E5] space-y-1">
                <span className="text-[10px] text-[#6B6B6B] uppercase block">DIRECTOR</span>
                <span className="font-bold text-[#171717] block">Uday Honap</span>
                <span className="text-[11px] text-[#6B6B6B] block">Civil Engineering &amp; Structural PMC</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E8E5] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-8 py-3 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "SAVING..." : "SAVE ABOUT CONTENT"}</span>
            </button>
          </div>
        </form>

      </div>
    </AdminLayout>
  );
}
