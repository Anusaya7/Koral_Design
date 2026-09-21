"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Mail, Phone, ExternalLink, Trash2, Eye, X, CheckCircle2 } from "lucide-react";

interface Application {
  id: number;
  career_id: number;
  job_title?: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  portfolio_url: string | null;
  cover_note: string | null;
  status: "NEW" | "REVIEWING" | "SHORTLISTED" | "INTERVIEW" | "REJECTED" | "HIRED";
  created_at: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [successMsg, setSuccessMsg] = useState("");

  const loadApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      if (Array.isArray(data)) {
        setApplications(data);
      }
    } catch (err) {
      console.error("Error loading applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus as Application["status"] } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus as Application["status"] } : null));
        }
        setSuccessMsg(`Application status updated to ${newStatus}`);
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this application record?")) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
        setSuccessMsg("Application record deleted");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  const filtered = applications.filter((app) => {
    if (filterStatus === "ALL") return true;
    return app.status === filterStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-amber-100 text-amber-900 border border-amber-300";
      case "REVIEWING":
        return "bg-blue-100 text-blue-900 border border-blue-300";
      case "SHORTLISTED":
        return "bg-purple-100 text-purple-900 border border-purple-300";
      case "INTERVIEW":
        return "bg-cyan-100 text-cyan-900 border border-cyan-300";
      case "HIRED":
        return "bg-emerald-100 text-emerald-900 border border-emerald-300";
      case "REJECTED":
        return "bg-stone-200 text-stone-700 border border-stone-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              08 / CANDIDATE PORTFOLIO
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              CAREER APPLICANTS REVIEW
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Review, qualify, and track candidate submissions for Korals Design architecture &amp; civil engineering roles
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white border border-[#E8E8E5] text-xs font-mono font-bold text-[#171717]">
              {applications.length} TOTAL APPLICATIONS
            </span>
          </div>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl animate-fade-in uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Status Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E8E5] pb-4 font-mono text-xs">
          {["ALL", "NEW", "REVIEWING", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full font-bold uppercase transition-all cursor-pointer ${
                filterStatus === s
                  ? "bg-[#171717] text-white shadow-xs"
                  : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Applications List Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden shadow-2xs">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-[#6B6B6B]">
              LOADING CANDIDATE APPLICATIONS...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs font-mono text-[#6B6B6B]">
              NO APPLICATIONS FOUND UNDER &ldquo;{filterStatus}&rdquo; FILTER.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#E8E8E5] bg-[#F7F7F5] text-[#6B6B6B] uppercase">
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">APPLICANT</th>
                    <th className="py-3.5 px-4">APPLIED ROLE</th>
                    <th className="py-3.5 px-4">CONTACT</th>
                    <th className="py-3.5 px-4">STATUS</th>
                    <th className="py-3.5 px-4">SUBMITTED</th>
                    <th className="py-3.5 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E5]">
                  {filtered.map((app) => (
                    <tr key={app.id} className="hover:bg-[#F7F7F5] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#171717]">#{app.id}</td>
                      <td className="py-3.5 px-4 font-bold text-[#171717]">{app.applicant_name}</td>
                      <td className="py-3.5 px-4 text-[#171717]">{app.job_title || `Role #${app.career_id}`}</td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">
                        <div className="leading-tight">
                          <div>{app.applicant_email}</div>
                          <div className="text-[10px] text-[#6B6B6B]">{app.applicant_phone}</div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono uppercase cursor-pointer border ${getStatusBadgeClass(
                            app.status
                          )}`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="REVIEWING">REVIEWING</option>
                          <option value="SHORTLISTED">SHORTLISTED</option>
                          <option value="INTERVIEW">INTERVIEW</option>
                          <option value="HIRED">HIRED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">
                        {app.created_at ? app.created_at.substring(0, 10) : "Today"}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#171717] hover:underline cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>VIEW</span>
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detailed Modal Drawer */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#E8E8E5] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6B6B6B] block">APPLICATION #{selectedApp.id}</span>
                  <h3 className="text-2xl font-bold text-[#171717]">{selectedApp.applicant_name}</h3>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1 rounded-full hover:bg-[#F7F7F5] text-[#6B6B6B] hover:text-[#171717]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 bg-[#F7F7F5] p-4 rounded-2xl border border-[#E8E8E5]">
                  <div>
                    <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block">Position Applied</span>
                    <span className="font-bold text-[#171717] text-sm">{selectedApp.job_title || `Role #${selectedApp.career_id}`}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block">Current Status</span>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getStatusBadgeClass(selectedApp.status)}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#6B6B6B] block font-bold">Contact Coordinates</span>
                  <div className="flex flex-wrap gap-4 font-mono">
                    <a
                      href={`mailto:${selectedApp.applicant_email}`}
                      className="inline-flex items-center gap-2 p-3 bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl hover:bg-[#E8E8E5] text-[#171717]"
                    >
                      <Mail className="w-4 h-4 text-[#171717]" />
                      <span>{selectedApp.applicant_email}</span>
                    </a>
                    <a
                      href={`tel:${selectedApp.applicant_phone}`}
                      className="inline-flex items-center gap-2 p-3 bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl hover:bg-[#E8E8E5] text-[#171717]"
                    >
                      <Phone className="w-4 h-4 text-[#171717]" />
                      <span>{selectedApp.applicant_phone}</span>
                    </a>
                  </div>
                </div>

                {selectedApp.portfolio_url && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#6B6B6B] block font-bold">Portfolio / Profile Link</span>
                    <a
                      href={selectedApp.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-700 font-mono font-bold hover:underline break-all"
                    >
                      <span>{selectedApp.portfolio_url}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#6B6B6B] block font-bold">Cover Note / Candidate Message</span>
                  <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5] text-xs text-[#171717] leading-relaxed whitespace-pre-wrap">
                    {selectedApp.cover_note || "No cover note provided."}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#171717]">Change Status:</span>
                    <select
                      value={selectedApp.status}
                      onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-[#E8E8E5] bg-white text-xs font-mono font-bold cursor-pointer"
                    >
                      <option value="NEW">NEW</option>
                      <option value="REVIEWING">REVIEWING</option>
                      <option value="SHORTLISTED">SHORTLISTED</option>
                      <option value="INTERVIEW">INTERVIEW</option>
                      <option value="HIRED">HIRED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>

                  <a
                    href={`mailto:${selectedApp.applicant_email}?subject=Regarding Your Application with Korals Design Private Limited`}
                    className="px-6 py-2.5 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase flex items-center gap-2 hover:bg-[#2A2A28] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>EMAIL CANDIDATE</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
