'use me';
'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Building2, Trash2, CheckCircle2, Eye, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.inquiries) setInquiries(data.inquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
      fetchInquiries();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry record?')) return;
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (selectedStatus === 'All') return true;
    return inq.status.toLowerCase() === selectedStatus.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Contact Inquiries Inbox</h1>
          <p className="text-xs text-slate-400">Review, manage, and respond to incoming project inquiries</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'New', 'Read', 'In Progress', 'Resolved', 'Archived'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                selectedStatus === st ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <p className="text-center py-12 text-slate-400 text-sm">Loading inquiries...</p>
        ) : filteredInquiries.length === 0 ? (
          <p className="text-center py-12 text-slate-400 text-sm">No inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-white">
                      <div>{inq.name}</div>
                      {inq.company && <div className="text-xs text-slate-400 font-normal">{inq.company}</div>}
                    </td>
                    <td className="p-4 text-slate-200 font-semibold max-w-xs truncate">{inq.subject}</td>
                    <td className="p-4 text-xs">
                      <div>{inq.email}</div>
                      <div className="text-slate-400">{inq.phone}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded text-xs font-bold bg-slate-950 border border-slate-800 ${
                          inq.status === 'New' ? 'text-amber-400 border-amber-500/40' : 'text-slate-300'
                        }`}
                      >
                        {['New', 'Read', 'In Progress', 'Resolved', 'Archived'].map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-xs text-slate-400">{formatDate(inq.createdAt)}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => setSelectedInquiry(inq)} className="p-1.5 text-slate-400 hover:text-amber-400">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(inq.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
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

      {/* Detail Viewer Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase">Inquiry Detail</span>
                <h2 className="font-display font-bold text-xl text-white">{selectedInquiry.subject}</h2>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded border border-slate-800">
              <div>
                <span className="text-slate-400 block">Sender Name:</span>
                <span className="font-bold text-white text-sm">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Company:</span>
                <span className="font-bold text-white text-sm">{selectedInquiry.company || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email Address:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-amber-400 hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block">Phone Line:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="text-amber-400 hover:underline">
                  {selectedInquiry.phone}
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase">Message Content:</span>
              <div className="p-4 bg-slate-950 rounded border border-slate-800 text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase text-slate-950 bg-amber-400 rounded"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>
              <button onClick={() => setSelectedInquiry(null)} className="text-xs text-slate-400">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
