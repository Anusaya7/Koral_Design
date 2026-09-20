"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Edit, Trash2, CheckCircle2, XCircle, X, AlertTriangle } from "lucide-react";

interface Service {
  id: number;
  service_number: string;
  title: string;
  slug?: string;
  short_description: string;
  full_description: string;
  bullet_points: string;
  image: string;
  icon: string;
  cta_label?: string;
  cta_link?: string;
  display_order: number;
  is_published: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    service_number: "01",
    title: "",
    slug: "",
    short_description: "",
    full_description: "",
    bullet_points: "",
    image: "/images/architecture_exterior_1.jpg",
    icon: "Compass",
    cta_label: "EXPLORE SERVICES",
    cta_link: "/contact",
    display_order: 0,
    is_published: 1,
  });

  const loadServices = () => {
    fetch("/api/services?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      });
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    const nextNum = (services.length + 1).toString().padStart(2, "0");
    setFormData({
      service_number: nextNum,
      title: "",
      slug: "",
      short_description: "",
      full_description: "",
      bullet_points: "",
      image: "/images/architecture_exterior_1.jpg",
      icon: "Compass",
      cta_label: "EXPLORE SERVICES",
      cta_link: "/contact",
      display_order: services.length + 1,
      is_published: 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setFormData({
      service_number: s.service_number,
      title: s.title,
      slug: s.slug || "",
      short_description: s.short_description,
      full_description: s.full_description,
      bullet_points: s.bullet_points || "",
      image: s.image || "/images/architecture_exterior_1.jpg",
      icon: s.icon || "Compass",
      cta_label: s.cta_label || "EXPLORE SERVICES",
      cta_link: s.cta_link || "/contact",
      display_order: s.display_order,
      is_published: s.is_published,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingService ? `/api/services/${editingService.id}` : "/api/services";
    const method = editingService ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      loadServices();
    } else {
      alert("Failed to save service offering.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/services/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setDeleteId(null);
      loadServices();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              03 / SERVICES
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              SERVICES PRACTICE MANAGEMENT
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Manage architectural planning, statutory approvals, land surveying, and PMC service offerings
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-[#171717] text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider hover:bg-[#2A2A28] transition-all shadow-md uppercase cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW SERVICE</span>
          </button>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#E8E8E5] bg-[#F7F7F5] text-[#6B6B6B] uppercase">
                  <th className="py-3.5 px-4">NO.</th>
                  <th className="py-3.5 px-4">SERVICE TITLE</th>
                  <th className="py-3.5 px-4">SLUG</th>
                  <th className="py-3.5 px-4">SHORT OVERVIEW</th>
                  <th className="py-3.5 px-4">ORDER</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E5]">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-[#F7F7F5]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#171717]">{s.service_number}</td>
                    <td className="py-3.5 px-4 font-bold text-[#171717]">{s.title}</td>
                    <td className="py-3.5 px-4 text-[#6B6B6B] text-[11px]">{s.slug || "N/A"}</td>
                    <td className="py-3.5 px-4 text-[#6B6B6B] max-w-xs truncate">{s.short_description}</td>
                    <td className="py-3.5 px-4 text-[#171717]">{s.display_order}</td>
                    <td className="py-3.5 px-4">
                      {s.is_published ? (
                        <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> PUBLISHED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#6B6B6B] bg-[#F7F7F5] px-2 py-0.5 rounded text-[10px] border border-[#E8E8E5]">
                          <XCircle className="w-3 h-3" /> DRAFT
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] transition-colors"
                        title="Edit Service"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(s.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                        title="Delete Service"
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
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block">
                  SERVICE OFFERING MANAGEMENT
                </span>
                <h2 className="text-xl font-bold text-[#171717] uppercase">
                  {editingService ? "EDIT PROFESSIONAL SERVICE" : "CREATE NEW PROFESSIONAL SERVICE"}
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    NUMBER *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.service_number}
                    onChange={(e) => setFormData({ ...formData, service_number: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 font-mono text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    SERVICE TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architectural Planning & Design"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    URL SLUG
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. architectural-design"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 font-mono text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    ICON SELECTOR
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    <option value="Compass">Compass (Architectural)</option>
                    <option value="Layers">Layers (PMC)</option>
                    <option value="ShieldCheck">ShieldCheck (Approvals)</option>
                    <option value="MapPin">MapPin (Surveying)</option>
                    <option value="FileText">FileText (Consultancy)</option>
                    <option value="Factory">Factory (Industrial)</option>
                    <option value="Layout">Layout (Interiors)</option>
                    <option value="Eye">Eye (3D Render)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  SHORT OVERVIEW *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Master planning, conceptual design, structural layout..."
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  FULL DETAILED DESCRIPTION
                </label>
                <textarea
                  rows={4}
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl p-3.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  CAPABILITIES / BULLET POINTS (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Architectural Planning, Structural Layout, Space Planning"
                  value={formData.bullet_points}
                  onChange={(e) => setFormData({ ...formData, bullet_points: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
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
                  <span>PUBLISH ON PUBLIC SERVICES PAGE</span>
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
                  SAVE SERVICE OFFERING
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
              <h3 className="text-lg font-bold text-[#171717] uppercase">DELETE SERVICE OFFERING?</h3>
              <p className="text-xs text-[#6B6B6B]">This action will permanently delete this service offering from the database.</p>
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
                DELETE SERVICE
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
