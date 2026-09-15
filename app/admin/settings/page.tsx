'use me';
'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_title: 'Korals Design Pvt Ltd | Architecture & Engineering Consultancy',
    meta_description: 'Korals Design Pvt Ltd is an architectural services provider located in Pune, Maharashtra, India.',
    site_url: 'https://www.koralsdesign.com',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="font-display font-bold text-2xl text-white">System & SEO Settings</h1>
        <p className="text-xs text-slate-400">Configure global metadata, canonical URL, and index settings</p>
      </div>

      {success && (
        <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>SEO and System settings saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5 text-sm shadow-xl">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Global Site Title</label>
          <input
            type="text"
            value={settings.site_title || ''}
            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Default Meta Description</label>
          <textarea
            rows={3}
            value={settings.meta_description || ''}
            onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Production Site URL</label>
          <input
            type="text"
            value={settings.site_url || ''}
            onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button type="submit" disabled={saving} className="px-6 py-2.5 text-xs font-bold uppercase text-slate-950 bg-amber-400 rounded">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
