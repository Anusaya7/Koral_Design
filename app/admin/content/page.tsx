'use me';
'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminContentPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_title: 'INNOVATING INDUSTRIAL SPACES',
    hero_subtitle: 'End-to-End Solutions — Design, Approvals and Execution',
    company_address: '201, Laximi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030',
    company_phone: '+020 - 24324648',
    company_mobile: '+91 9822864648',
    company_email: 'projects@koralsdesign.com',
  });

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update settings.');

      setStatusMessage({ type: 'success', text: 'Website content updated successfully! Public site synced.' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error updating content.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="font-display font-bold text-2xl text-white">Website Content CMS</h1>
        <p className="text-xs text-slate-400">Edit hero headlines, company address, and contact lines</p>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded border text-sm flex items-center gap-3 ${statusMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl text-sm">
        <div className="space-y-4">
          <h2 className="font-display font-bold text-lg text-white border-b border-slate-800 pb-2">Hero Section Content</h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Hero Headline Title</label>
            <input
              type="text"
              required
              value={settings.hero_title || ''}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Hero Subtitle / Supporting Text</label>
            <textarea
              rows={2}
              required
              value={settings.hero_subtitle || ''}
              onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="font-display font-bold text-lg text-white border-b border-slate-800 pb-2">Verified Contact & Office Info</h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Corporate Address</label>
            <input
              type="text"
              required
              value={settings.company_address || ''}
              onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Landline Phone</label>
              <input
                type="text"
                required
                value={settings.company_phone || ''}
                onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Mobile Number</label>
              <input
                type="text"
                required
                value={settings.company_mobile || ''}
                onChange={(e) => setSettings({ ...settings, company_mobile: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={settings.company_email || ''}
                onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Content...' : 'Save Website Content'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
