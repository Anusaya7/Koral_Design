'use client';

import React, { useState, useEffect } from 'react';
import { Wrench, Plus, Edit, Trash2, Eye, EyeOff, X, AlertCircle } from 'lucide-react';

interface Service {
  id: string;
  number: string;
  title: string;
  icon: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  features: string;
  isPublished: boolean;
  sortOrder: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState({
    number: '01',
    title: '',
    icon: 'Compass',
    image: '',
    shortDesc: '',
    fullDesc: '',
    features: '',
    isPublished: true,
    sortOrder: 1,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      number: `0${services.length + 1}`,
      title: '',
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      shortDesc: '',
      fullDesc: '',
      features: '',
      isPublished: true,
      sortOrder: services.length + 1,
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    let featStr = s.features || '';
    if (featStr.startsWith('[')) {
      try {
        featStr = JSON.parse(featStr).join('\n');
      } catch {}
    }
    setFormData({
      number: s.number,
      title: s.title,
      icon: s.icon,
      image: s.image,
      shortDesc: s.shortDesc,
      fullDesc: s.fullDesc,
      features: featStr,
      isPublished: s.isPublished,
      sortOrder: s.sortOrder,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const featArray = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      features: featArray,
    };

    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service.');

      setModalOpen(false);
      fetchServices();
    } catch (err: any) {
      setError(err.message || 'Error saving service.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Services CMS</h1>
          <p className="text-xs text-slate-400">Manage engineering, architectural, PMC, and land survey offerings</p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-slate-400 text-sm col-span-full text-center py-8">Loading services...</p>
        ) : services.map((s) => (
          <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-2xl text-amber-400">{s.number}</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${s.isPublished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                  {s.isPublished ? 'Active' : 'Draft'}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">{s.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{s.shortDesc}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Icon: {s.icon}</span>
              <div className="space-x-2">
                <button onClick={() => openEditModal(s)} className="p-1.5 text-slate-400 hover:text-amber-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 space-y-6 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="font-display font-bold text-xl text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && <div className="p-3 bg-rose-500/10 text-rose-300 text-xs rounded">{error}</div>}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Icon *</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                  >
                    {['Compass', 'FileCheck', 'MapPin', 'Briefcase', 'CheckSquare'].map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Image URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Features (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-400">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded">
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
