"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Compass, Edit3, Save, CheckCircle2, Eye, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Stage {
  id: number;
  stage_number: string;
  stage_code: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  display_order: number;
  is_active: number;
}

export default function AdminMethodologyPage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadStages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/methodology?all=true");
      const data = await res.json();
      if (Array.isArray(data)) {
        setStages(data);
      }
    } catch (err) {
      console.error("Error loading methodology stages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStages();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStage) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/methodology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStage),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to save methodology stage");
      }

      setSaveSuccess(true);
      setEditingStage(null);
      await loadStages();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving stage";
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              05 / METHODOLOGY WORKFLOW
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              METHODOLOGY 6-STAGE WORKFLOW
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Configure the 6 sequential stages rendered in the &ldquo;FROM IDEA TO REALITY&rdquo; homepage section
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#idea-to-reality"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E8E5] bg-white text-xs font-mono text-[#171717] hover:bg-[#F7F7F5]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PREVIEW SECTION</span>
            </Link>

            <button
              onClick={() => {
                setEditingStage({
                  id: 0,
                  stage_number: `0${stages.length + 1}`,
                  stage_code: "NEW STAGE",
                  title: "",
                  subtitle: "",
                  description: "",
                  image: "/images/hero_villa_render.jpg",
                  display_order: stages.length + 1,
                  is_active: 1,
                });
              }}
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-5 py-2 rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ADD STAGE</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl animate-fade-in uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>STAGE SAVED SUCCESSFULLY! CHANGES ARE LIVE ON HOMEPAGE.</span>
          </div>
        )}

        {/* Stages Grid */}
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B6B]">
            LOADING METHODOLOGY STAGES...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
              >
                <div className="relative aspect-[16/9] bg-[#181818]">
                  <Image
                    src={stage.image || "/images/hero_villa_render.jpg"}
                    alt={stage.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#171717]/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase">
                    STAGE {stage.stage_number}
                  </div>
                  {!stage.is_active && (
                    <div className="absolute top-3 right-3 bg-rose-600 text-white px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                      INACTIVE
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block">
                      {stage.stage_code}
                    </span>
                    <h3 className="text-lg font-bold text-[#171717]">{stage.title}</h3>
                    <p className="text-xs font-mono text-emerald-700 font-semibold">{stage.subtitle}</p>
                    <p className="text-xs text-[#6B6B6B] line-clamp-3 pt-1">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#6B6B6B]">
                      ORDER: #{stage.display_order}
                    </span>
                    <button
                      onClick={() => setEditingStage(stage)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#171717] hover:underline uppercase cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>EDIT STAGE</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal Drawer */}
        {editingStage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#E8E8E5] shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#171717]" />
                  <h2 className="text-lg font-bold text-[#171717] uppercase">
                    {editingStage.id ? `EDIT STAGE ${editingStage.stage_number}` : "NEW METHODOLOGY STAGE"}
                  </h2>
                </div>
                <button
                  onClick={() => setEditingStage(null)}
                  className="p-1 rounded-full hover:bg-[#F7F7F5] text-[#6B6B6B] hover:text-[#171717]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                      STAGE NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingStage.stage_number}
                      onChange={(e) => setEditingStage({ ...editingStage, stage_number: e.target.value })}
                      placeholder="01"
                      className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                      STAGE CODE / TAG *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingStage.stage_code}
                      onChange={(e) => setEditingStage({ ...editingStage, stage_code: e.target.value })}
                      placeholder="SURVEY"
                      className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    STAGE TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStage.title}
                    onChange={(e) => setEditingStage({ ...editingStage, title: e.target.value })}
                    placeholder="Site Survey &amp; Due Diligence"
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    STAGE SUBTITLE / TAG *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStage.subtitle}
                    onChange={(e) => setEditingStage({ ...editingStage, subtitle: e.target.value })}
                    placeholder="Ground Realities First"
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    DESCRIPTION / SCOPE SUMMARY *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingStage.description}
                    onChange={(e) => setEditingStage({ ...editingStage, description: e.target.value })}
                    placeholder="Describe the architectural and engineering tasks performed in this stage..."
                    className="w-full border border-[#E8E8E5] rounded-xl p-4 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                    REPRESENTATIVE IMAGE PATH *
                  </label>
                  <input
                    type="text"
                    value={editingStage.image}
                    onChange={(e) => setEditingStage({ ...editingStage, image: e.target.value })}
                    placeholder="/images/hero_villa_render.jpg"
                    className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block font-mono font-semibold uppercase text-[#171717] mb-1">
                      DISPLAY ORDER
                    </label>
                    <input
                      type="number"
                      value={editingStage.display_order}
                      onChange={(e) => setEditingStage({ ...editingStage, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] font-mono focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div className="pt-4 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_active_check"
                      checked={!!editingStage.is_active}
                      onChange={(e) => setEditingStage({ ...editingStage, is_active: e.target.checked ? 1 : 0 })}
                      className="w-4 h-4 rounded border-[#E8E8E5] text-[#171717]"
                    />
                    <label htmlFor="is_active_check" className="font-mono font-semibold text-[#171717] uppercase">
                      ACTIVE &amp; VISIBLE
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingStage(null)}
                    className="px-5 py-2.5 rounded-full border border-[#E8E8E5] text-xs font-mono font-bold uppercase text-[#6B6B6B] hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-7 py-2.5 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase flex items-center gap-2 hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? "SAVING..." : "SAVE STAGE"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
