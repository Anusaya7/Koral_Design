'use me';
'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Copy, Check, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.media) setMedia(data.media);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        fetchMedia();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Media Assets Library</h1>
          <p className="text-xs text-slate-400">Upload and manage architectural imagery for projects & services</p>
        </div>

        <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-all shadow-md">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Image Asset'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          <p className="text-slate-400 text-sm col-span-full text-center py-12">Loading media assets...</p>
        ) : media.length === 0 ? (
          <p className="text-slate-400 text-sm col-span-full text-center py-12">No uploaded media files yet.</p>
        ) : (
          media.map((item) => (
            <div key={item.id} className="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden space-y-2 p-2 shadow-lg">
              <div className="h-32 rounded bg-slate-950 overflow-hidden relative">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <button
                  onClick={() => copyUrl(item.url, item.id)}
                  className="absolute inset-0 bg-slate-950/80 text-amber-400 font-bold text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === item.id ? 'Copied!' : 'Copy URL'}</span>
                </button>
              </div>
              <p className="text-[11px] font-semibold text-white truncate px-1">{item.name}</p>
              <span className="text-[10px] text-slate-500 block px-1">{formatDate(item.createdAt)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
