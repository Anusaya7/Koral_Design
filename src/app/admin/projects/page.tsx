"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Search, X, AlertTriangle } from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  location: string;
  category: string;
  area: string;
  description: string;
  completion_year: string;
  featured_image: string;
  gallery_images: string;
  is_featured: number;
  display_order: number;
  is_published: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    client: "",
    location: "",
    category: "Industrial Building",
    area: "",
    description: "",
    completion_year: "2023",
    featured_image: "/images/hero_villa_render.jpg",
    gallery_images: "[]",
    is_featured: 1,
    display_order: 0,
    is_published: 1,
  });

  const loadProjects = () => {
    fetch("/api/projects?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      name: "",
      client: "",
      location: "Pune, Maharashtra",
      category: "Industrial Building",
      area: "10,000 Sq.M.",
      description: "",
      completion_year: "2023",
      featured_image: "/images/hero_villa_render.jpg",
      gallery_images: "[]",
      is_featured: 1,
      display_order: projects.length + 1,
      is_published: 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      name: p.name,
      client: p.client,
      location: p.location,
      category: p.category,
      area: p.area || "",
      description: p.description,
      completion_year: p.completion_year || "2023",
      featured_image: p.featured_image,
      gallery_images: p.gallery_images || "[]",
      is_featured: p.is_featured,
      display_order: p.display_order,
      is_published: p.is_published,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
    const method = editingProject ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      loadProjects();
    } else {
      alert("Failed to save project record.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/projects/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setDeleteId(null);
      loadProjects();
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              02 / PROJECTS
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              PROJECT PORTFOLIO MANAGEMENT
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Manage architectural, industrial, institutional and green energy project records
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-[#171717] text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider hover:bg-[#2A2A28] transition-all shadow-md uppercase cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW PROJECT</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Filter projects by name, client, location, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E8E8E5] rounded-full pl-10 pr-4 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#171717] font-mono"
            />
          </div>
          <span className="text-xs font-mono text-[#6B6B6B]">
            SHOWING {filtered.length} OF {projects.length} PROJECTS
          </span>
        </div>

        {/* Projects Data Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#E8E8E5] bg-[#F7F7F5] text-[#6B6B6B] uppercase">
                  <th className="py-3.5 px-4">IMAGE</th>
                  <th className="py-3.5 px-4">PROJECT NAME</th>
                  <th className="py-3.5 px-4">CLIENT NAME</th>
                  <th className="py-3.5 px-4">LOCATION</th>
                  <th className="py-3.5 px-4">CATEGORY</th>
                  <th className="py-3.5 px-4">BUILT AREA</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E5]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#6B6B6B] uppercase">
                      No project records found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7F7F5]/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-[#181818] border border-[#E8E8E5]">
                          <Image src={p.featured_image} alt={p.name} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#171717]">{p.name}</td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">{p.client}</td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">{p.location}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-[#F7F7F5] border border-[#E8E8E5] px-2 py-0.5 rounded text-[10px] text-[#171717]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#171717]">{p.area || "N/A"}</td>
                      <td className="py-3.5 px-4">
                        {p.is_published ? (
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
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
                  PROJECT RECORD MANAGEMENT
                </span>
                <h2 className="text-xl font-bold text-[#171717] uppercase">
                  {editingProject ? "EDIT PROJECT RECORD" : "CREATE NEW PROJECT"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#F7F7F5] text-[#6B6B6B] hover:text-[#171717]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    PROJECT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ALFA LAVAL"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    CLIENT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alfa Laval India Ltd"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    LOCATION *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasarwadi, Pune"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    CATEGORY *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    <option>Industrial Building</option>
                    <option>Institutional &amp; Municipal</option>
                    <option>Corporate &amp; Green Energy</option>
                    <option>Architectural Masterplan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                    BUILT AREA
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12,274 Sq.M."
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  FEATURED IMAGE PATH / URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/hero_villa_render.jpg"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#171717] font-semibold mb-1">
                  PROJECT DESCRIPTION
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed architectural and engineering specification..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-[#E8E8E5] rounded-xl p-3.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#E8E8E5]">
                <label className="flex items-center gap-2 font-mono text-xs text-[#171717] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published === 1}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded border-[#E8E8E5]"
                  />
                  <span>PUBLISH ON PUBLIC PROJECTS PAGE</span>
                </label>
                <label className="flex items-center gap-2 font-mono text-xs text-[#171717] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured === 1}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded border-[#E8E8E5]"
                  />
                  <span>FEATURE ON HOMEPAGE SHOWCASE</span>
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
                  SAVE PROJECT RECORD
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
              <h3 className="text-lg font-bold text-[#171717] uppercase">DELETE PROJECT RECORD?</h3>
              <p className="text-xs text-[#6B6B6B]">This action will permanently delete the project record from the database.</p>
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
                DELETE PROJECT
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
