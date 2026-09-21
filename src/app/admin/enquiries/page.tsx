"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Mail, Trash2, Eye, X, Phone, User, Search, AlertTriangle } from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  project_type?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadEnquiries = () => {
    fetch("/api/enquiries")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEnquiries(data);
      });
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
      loadEnquiries();
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/enquiries/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      if (selectedEnquiry?.id === deleteId) setSelectedEnquiry(null);
      setDeleteId(null);
      loadEnquiries();
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "ALL" ? true : e.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      e.message.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              05 / ENQUIRIES
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              CLIENT ENQUIRIES DATABASE
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Inspect, track status, filter and respond to project enquiries from the public contact form
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono">
            {["ALL", "NEW", "READ", "IN PROGRESS", "REPLIED", "CLOSED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#171717] text-white shadow-xs"
                    : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Counter Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, email, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E8E8E5] rounded-full pl-10 pr-4 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#171717] font-mono"
            />
          </div>
          <span className="text-xs text-[#6B6B6B] font-mono">
            SHOWING {filteredEnquiries.length} OF {enquiries.length} TOTAL ENQUIRIES
          </span>
        </div>

        {/* Enquiries Data Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#E8E8E5] bg-[#F7F7F5] text-[#6B6B6B] uppercase">
                  <th className="py-3.5 px-4">ID</th>
                  <th className="py-3.5 px-4">CLIENT NAME</th>
                  <th className="py-3.5 px-4">EMAIL ADDRESS</th>
                  <th className="py-3.5 px-4">PHONE</th>
                  <th className="py-3.5 px-4">ENQUIRY CATEGORY</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4">DATE</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E5]">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#6B6B6B] uppercase">
                      No contact enquiries found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((e) => (
                    <tr
                      key={e.id}
                      className={`hover:bg-[#F7F7F5]/60 transition-colors ${
                        e.status === "NEW" ? "bg-amber-50/40 font-bold" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-[#171717]">#{e.id}</td>
                      <td className="py-3.5 px-4 text-[#171717]">
                        <div className="font-bold">{e.name}</div>
                        {e.company && <div className="text-[10px] text-[#6B6B6B]">{e.company}</div>}
                      </td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">{e.email}</td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">{e.phone || "N/A"}</td>
                      <td className="py-3.5 px-4 text-[#171717]">
                        <span className="font-semibold">{e.project_type || e.subject}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={e.status}
                          onChange={(evt) => updateStatus(e.id, evt.target.value)}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase border focus:outline-none cursor-pointer ${
                            e.status === "NEW"
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : e.status === "READ"
                              ? "bg-blue-100 text-blue-900 border-blue-300"
                              : e.status === "REPLIED"
                              ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                              : "bg-[#F7F7F5] text-[#171717] border-[#E8E8E5]"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="READ">READ</option>
                          <option value="IN PROGRESS">IN PROGRESS</option>
                          <option value="REPLIED">REPLIED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">
                        {e.created_at ? e.created_at.substring(0, 10) : "Today"}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            if (e.status === "NEW") updateStatus(e.id, "READ");
                            setSelectedEnquiry(e);
                          }}
                          className="p-1.5 rounded-lg bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] transition-colors"
                          title="Inspect Enquiry Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(e.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                          title="Delete Enquiry"
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

      {/* DETAIL INSPECTION MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E8E5] shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block">
                  ENQUIRY RECORD #{selectedEnquiry.id}
                </span>
                <h2 className="text-xl font-bold text-[#171717] uppercase tracking-tight">
                  {selectedEnquiry.subject}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-full hover:bg-[#F7F7F5] text-[#6B6B6B] hover:text-[#171717]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#6B6B6B]" />
                <span className="font-bold text-[#171717]">{selectedEnquiry.name}</span>
                {selectedEnquiry.company && (
                  <span className="text-[#6B6B6B]">({selectedEnquiry.company})</span>
                )}
              </div>
              {selectedEnquiry.project_type && (
                <div className="text-[11px] text-[#171717]">
                  <span className="text-[#6B6B6B]">Project Scope: </span>
                  <span className="font-bold">{selectedEnquiry.project_type}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6B6B6B]" />
                <a href={`mailto:${selectedEnquiry.email}`} className="text-[#171717] font-bold hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              {selectedEnquiry.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#6B6B6B]" />
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-[#171717] hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] text-xs leading-relaxed text-[#171717] whitespace-pre-wrap font-mono">
              {selectedEnquiry.message}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8E8E5] text-xs font-mono">
              <span className="text-[#6B6B6B] text-[11px]">Submitted: {selectedEnquiry.created_at}</span>
              <a
                href={`mailto:${selectedEnquiry.email}?subject=RE: ${encodeURIComponent(selectedEnquiry.subject)}`}
                onClick={() => updateStatus(selectedEnquiry.id, "REPLIED")}
                className="px-6 py-2.5 rounded-full bg-[#171717] text-white font-bold uppercase hover:bg-[#2A2A28] inline-flex items-center gap-2 shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>REPLY VIA EMAIL</span>
              </a>
            </div>

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
              <h3 className="text-lg font-bold text-[#171717] uppercase">DELETE ENQUIRY RECORD?</h3>
              <p className="text-xs text-[#6B6B6B]">This action will permanently delete this client enquiry record from the database.</p>
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
                DELETE RECORD
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
