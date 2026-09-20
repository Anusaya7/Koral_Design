"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import {
  Building2,
  Layers,
  Briefcase,
  Mail,
  Plus,
  ArrowRight,
  Eye,
} from "lucide-react";

interface Stats {
  totalProjects: number;
  activeServices: number;
  openJobs: number;
  newEnquiries: number;
  totalEnquiries: number;
}

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    activeServices: 0,
    openJobs: 0,
    newEnquiries: 0,
    totalEnquiries: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then((res) => res.json()),
      fetch("/api/enquiries").then((res) => res.json()),
    ])
      .then(([statsData, enquiriesData]) => {
        if (!statsData.error) setStats(statsData);
        if (Array.isArray(enquiriesData)) setRecentEnquiries(enquiriesData.slice(0, 5));
      })
      .catch((err) => console.error("Error fetching admin home data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              01 / OVERVIEW
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight uppercase">
              GOOD MORNING.
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              KORALS DESIGN PVT LTD • Live Practice Database &amp; CMS Status
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider hover:bg-[#2A2A28] transition-all shadow-md uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>NEW PROJECT</span>
            </Link>
          </div>
        </div>

        {/* Real DB Metrics Cards (Editorial Architectural Linework Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Projects */}
          <Link
            href="/admin/projects"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  PROJECTS
                </span>
                <Building2 className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717]">
                {loading ? (
                  <span className="w-8 h-8 rounded bg-[#F7F7F5] animate-pulse inline-block" />
                ) : (
                  stats.totalProjects
                )}
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                ACTIVE PORTFOLIO RECORDS
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE ARCHIVE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Services */}
          <Link
            href="/admin/services"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  SERVICES
                </span>
                <Layers className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717]">
                {loading ? (
                  <span className="w-8 h-8 rounded bg-[#F7F7F5] animate-pulse inline-block" />
                ) : (
                  stats.activeServices
                )}
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                PUBLISHED PRACTICE OFFERINGS
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE SERVICES</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Open Positions */}
          <Link
            href="/admin/careers"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  OPEN POSITIONS
                </span>
                <Briefcase className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717]">
                {loading ? (
                  <span className="w-8 h-8 rounded bg-[#F7F7F5] animate-pulse inline-block" />
                ) : (
                  stats.openJobs
                )}
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                ACTIVE RECRUITMENT OPENINGS
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE CAREERS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Enquiries */}
          <Link
            href="/admin/enquiries"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  ENQUIRIES
                </span>
                <Mail className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717] flex items-baseline gap-2">
                <span>{loading ? "..." : stats.newEnquiries}</span>
                <span className="text-xs font-mono text-[#6B6B6B] font-normal">/ {stats.totalEnquiries} TOTAL</span>
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                CLIENT PROJECT SUBMISSIONS
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>VIEW INBOX</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* QUICK ACTIONS ROW */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E8E5] shadow-2xs space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6B6B] block">
            QUICK ACTIONS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/admin/projects"
              className="px-4 py-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-mono font-bold flex items-center justify-between transition-all border border-[#E8E8E5]"
            >
              <span>+ NEW PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/services"
              className="px-4 py-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-mono font-bold flex items-center justify-between transition-all border border-[#E8E8E5]"
            >
              <span>+ NEW SERVICE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/careers"
              className="px-4 py-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-mono font-bold flex items-center justify-between transition-all border border-[#E8E8E5]"
            >
              <span>+ NEW POSITION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/enquiries"
              className="px-4 py-3 rounded-xl bg-[#171717] text-white hover:bg-[#2A2A28] text-xs font-mono font-bold flex items-center justify-between transition-all shadow-xs"
            >
              <span>VIEW ENQUIRIES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* RECENT BUSINESS ENQUIRIES TABLE */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8E5]">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                RECENT SUBMISSIONS
              </span>
              <h2 className="text-xl font-bold text-[#171717] uppercase tracking-tight">
                RECENT BUSINESS ENQUIRIES
              </h2>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono font-bold text-[#171717] hover:underline uppercase flex items-center gap-1.5"
            >
              <span>VIEW ALL ENQUIRIES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="text-center py-12 text-xs font-mono text-[#6B6B6B]">
              NO CONTACT ENQUIRIES FOUND IN DATABASE.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#E8E8E5] bg-[#F7F7F5] text-[#6B6B6B] uppercase">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">CLIENT NAME</th>
                    <th className="py-3 px-4">EMAIL ADDRESS</th>
                    <th className="py-3 px-4">ENQUIRY CATEGORY</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4">SUBMITTED DATE</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E5]">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#F7F7F5] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#171717]">#{enq.id}</td>
                      <td className="py-3.5 px-4 font-bold text-[#171717]">{enq.name}</td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">{enq.email}</td>
                      <td className="py-3.5 px-4 text-[#171717]">{enq.subject}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold uppercase ${
                            enq.status === "NEW"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : enq.status === "READ"
                              ? "bg-blue-100 text-blue-900 border border-blue-300"
                              : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B6B6B]">
                        {enq.created_at ? enq.created_at.substring(0, 10) : "Today"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href="/admin/enquiries"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#171717] hover:underline"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>INSPECT</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
