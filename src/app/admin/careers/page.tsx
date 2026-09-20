"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Edit, Trash2, CheckCircle2, XCircle, X, AlertTriangle } from "lucide-react";

interface Career {
  id: number;
  title: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  application_email: string;
  display_order: number;
  is_published: number;
}

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    location: "Pune, Maharashtra",
    employment_type: "Full-Time",
    description: "",
    requirements: "",
    application_email: "projects@koralsdesign.com",
    display_order: 0,
    is_published: 1,
  });

  const loadCareers = () => {
    fetch("/api/careers?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCareers(data);
      });
  };

  useEffect(() => {
    loadCareers();
  }, []);

  const openCreateModal = () => {
    setEditingCareer(null);
    setFormData({
      title: "",
      location: "Pune, Maharashtra",
      employment_type: "Full-Time",
      description: "",
      requirements: "",
      application_email: "projects@koralsdesign.com",
      display_order: careers.length + 1,
      is_published: 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (c: Career) => {
    setEditingCareer(c);
    setFormData({
      title: c.title,
      location: c.location,
      employment_type: c.employment_type,
      description: c.description,
      requirements: c.requirements || "",
      application_email: c.application_email || "projects@koralsdesign.com",
      display_order: c.display_order,
      is_published: c.is_published,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingCareer ? `/api/careers/${editingCareer.id}` : "/api/careers";
    const method = editingCareer ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      loadCareers();
    } else {
      alert("Failed to save job opening.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/careers/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setDeleteId(null);
      loadCareers();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              04 / CAREERS
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              CAREERS &amp; OPEN POSITIONS MANAGEMENT
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Add, edit or remove publicly listed recruitment openings for Korals Design Private Limited
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-[#171717] text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider hover:bg-[#2A2A28] transition-all shadow-md uppercase cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW POSITION</span>
          </button>
        </div>

        {/* Careers Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#E8E8E5] bg-[#F7F7F5] text-[#6B6B6B] uppercase">
                  <th className="py-3.5 px-4">JOB TITLE</th>
                  <th className="py-3.5 px-4">LOCATION</th>
                  <th className="py-3.5 px-4">TYPE</th>
                  <th className="py-3.5 px-4">APPLICATION EMAIL</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E5]">
                {careers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F7F7F5]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#171717]">{c.title}</td>
                    <td className="py-3.5 px-4 text-[#6B6B6B]">{c.location}</td>
                    <td className="py-3.5 px-4 text-[#171717]">{c.employment_type}</td>
                    <td className="py-3.5 px-4 text-[#6B6B6B]">{c.application_email}</td>
                    <td className="py-3.5 px-4">
                      {c.is_published ? (
                        <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> PUBLISHED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#6B6B6B] bg-[#F7F7F5] px-2 py-0.5 rounded text-[10px] border border-[#E8E8E5]">
                          <XCircle className="w-3 h-3" /> HIDDEN
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] transition-colors"
                        title="Edit Job"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(c.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block">
                  RECRUITMENT POSITION MANAGEMENT
                </span>
                <h2 className="text-xl font-bold text-[#171717] uppercase">
                  {editingCareer ? "EDIT JOB POSITION" : "CREATE NEW JOB POSITION"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#F7F7F5] text-[#6B6B6B] hover:text-[#171717]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  JOB TITLE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Construction Safety Manager"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    LOCATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    EMPLOYMENT TYPE *
                  </label>
                  <select
                    value={formData.employment_type}
                    onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract / Project-Based</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  JOB OVERVIEW / DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl p-3.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  REQUIREMENTS (semicolon ; separated)
                </label>
                <textarea
                  rows={3}
                  placeholder="Degree in Civil Safety; 5+ years experience; DISH safety norms"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl p-3.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  APPLICATION TARGET EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.application_email}
                  onChange={(e) => setFormData({ ...formData, application_email: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-[#E8E8E5]">
                <label className="flex items-center gap-2 font-mono text-xs text-[#171717] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published === 1}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded border-[#E8E8E5]"
                  />
                  <span>PUBLISH JOB ON PUBLIC CAREERS PAGE</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-[#E8E8E5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E8E8E5] text-[#171717] font-mono font-bold text-xs uppercase hover:bg-[#F7F7F5]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#171717] text-white font-mono font-bold text-xs uppercase hover:bg-[#2A2A28] shadow-md"
                >
                  SAVE JOB POSITION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#E8E8E5] shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#171717] uppercase">DELETE JOB POSITION?</h3>
              <p className="text-xs text-[#6B6B6B]">This action will permanently remove this position from the database.</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2 rounded-full border border-[#E8E8E5] text-[#171717] font-mono text-xs font-bold uppercase"
              >
                CANCEL
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-full bg-rose-600 text-white font-mono text-xs font-bold uppercase hover:bg-rose-700 shadow-md"
              >
                DELETE POSITION
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
