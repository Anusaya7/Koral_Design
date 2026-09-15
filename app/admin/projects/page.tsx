'use me';
'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  MapPin,
  Building2,
  AlertCircle,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  area?: string | null;
  client?: string | null;
  year?: string | null;
  shortDesc: string;
  fullDesc: string;
  scopeOfWork?: string | null;
  coverImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  images?: { id: string; url: string; caption?: string | null }[];
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Industrial',
    location: '',
    area: '',
    client: '',
    year: '',
    shortDesc: '',
    fullDesc: '',
    scopeOfWork: '',
    coverImage: '',
    isFeatured: false,
    isPublished: true,
    galleryUrl: '',
    galleryImages: [] as { url: string; caption?: string }[],
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Industrial',
      location: '',
      area: '',
      client: '',
      year: '',
      shortDesc: '',
      fullDesc: '',
      scopeOfWork: '',
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1200',
      isFeatured: false,
      isPublished: true,
      galleryUrl: '',
      galleryImages: [],
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    let scopeStr = project.scopeOfWork || '';
    if (scopeStr.startsWith('[')) {
      try {
        scopeStr = JSON.parse(scopeStr).join('\n');
      } catch {}
    }

    setFormData({
      title: project.title,
      category: project.category,
      location: project.location,
      area: project.area || '',
      client: project.client || '',
      year: project.year || '',
      shortDesc: project.shortDesc,
      fullDesc: project.fullDesc,
      scopeOfWork: scopeStr,
      coverImage: project.coverImage,
      isFeatured: project.isFeatured,
      isPublished: project.isPublished,
      galleryUrl: '',
      galleryImages: project.images ? project.images.map((img) => ({ url: img.url, caption: img.caption || '' })) : [],
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const scopeArray = formData.scopeOfWork
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      area: formData.area,
      client: formData.client,
      year: formData.year,
      shortDesc: formData.shortDesc,
      fullDesc: formData.fullDesc,
      scopeOfWork: scopeArray,
      coverImage: formData.coverImage,
      isFeatured: formData.isFeatured,
      isPublished: formData.isPublished,
      galleryImages: formData.galleryImages,
    };

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project.');

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setError(err.message || 'Error saving project.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !project.isPublished }),
      });
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const addGalleryImage = () => {
    if (!formData.galleryUrl.trim()) return;
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, { url: formData.galleryUrl.trim() }],
      galleryUrl: '',
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      galleryImages: formData.galleryImages.filter((_, idx) => idx !== index),
    });
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Project Portfolio Management</h1>
          <p className="text-xs text-slate-400">Create, edit, publish, and order corporate architectural projects</p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Industrial', 'Architecture', 'Government', 'Corporate', 'Institutional', 'Infrastructure'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <p className="text-center py-12 text-slate-400 text-sm">Loading projects database...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center py-12 text-slate-400 text-sm">No projects found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Cover</th>
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Area</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-14 h-10 object-cover rounded border border-slate-800"
                      />
                    </td>
                    <td className="p-4 font-bold text-white">
                      <div>
                        {project.title}
                        {project.isFeatured && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            <Star className="w-3 h-3 fill-amber-400" /> Featured
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-normal">/projects/{project.slug}</span>
                    </td>
                    <td className="p-4 font-semibold text-amber-400">{project.category}</td>
                    <td className="p-4 text-xs text-slate-300">{project.location}</td>
                    <td className="p-4 text-xs text-slate-300">{project.area || '—'}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(project)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold ${
                          project.isPublished
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {project.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{project.isPublished ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(project.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Project Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="font-display font-extrabold text-2xl text-white">
                {editingProject ? 'Edit Project' : 'Create New Architectural Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="p-4 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ALFA LAVAL INDUSTRIAL PLANT"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                  >
                    {['Industrial', 'Architecture', 'Government', 'Corporate', 'Institutional', 'Infrastructure'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Kasarwadi, Bhosari, Pune"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Area (Sq.M. / Sq.Ft.)
                  </label>
                  <input
                    type="text"
                    placeholder="12,274 Sq.M."
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="Alfa Laval India Pvt Ltd"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Brief 1-2 sentence overview for cards"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Description & Project Narrative *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed architectural & engineering description..."
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Scope of Work (One item per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Architectural Master Planning&#10;MIDC Building Plan Sanctions&#10;MPCB Environmental Clearance"
                  value={formData.scopeOfWork}
                  onChange={(e) => setFormData({ ...formData, scopeOfWork: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Cover Image URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Gallery Images Manager */}
              <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Project Gallery Images
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Image URL..."
                    value={formData.galleryUrl}
                    onChange={(e) => setFormData({ ...formData, galleryUrl: e.target.value })}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded"
                  >
                    Add Image
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {formData.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded overflow-hidden h-16 border border-slate-800">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute inset-0 bg-slate-950/80 text-rose-400 font-bold text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold uppercase text-slate-300">Published on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold uppercase text-slate-300">Feature on Home Spotlight</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 text-xs font-bold uppercase text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded"
                >
                  {saving ? 'Saving Project...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="font-display font-bold text-lg text-white">Delete Project?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 text-xs font-bold uppercase text-white bg-rose-600 hover:bg-rose-500 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
