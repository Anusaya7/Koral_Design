"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import {
  Building2,
  Layers,
  Briefcase,
  Mail,
  ArrowRight,
  Users,
  Bell,
  Compass,
  FileText,
  Settings,
  Activity,
  Globe,
} from "lucide-react";

interface Stats {
  totalEnquiries: number;
  unreadEnquiries: number;
  totalApplications: number;
  unreadApplications: number;
  publishedProjects: number;
  draftProjects: number;
  publishedServices: number;
  draftServices: number;
  openJobs: number;
  unreadNotifications: number;
}

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  project_type?: string;
  subject: string;
  status: string;
  created_at: string;
}

interface Application {
  id: number;
  position: string;
  applicant_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

interface ActivityEvent {
  id: number;
  admin_user: string;
  action: string;
  entity_type: string;
  details?: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalEnquiries: 0,
    unreadEnquiries: 0,
    totalApplications: 0,
    unreadApplications: 0,
    publishedProjects: 0,
    draftProjects: 0,
    publishedServices: 0,
    draftServices: 0,
    openJobs: 0,
    unreadNotifications: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setStats({
            totalEnquiries: data.totalEnquiries || 0,
            unreadEnquiries: data.unreadEnquiries || 0,
            totalApplications: data.totalApplications || 0,
            unreadApplications: data.unreadApplications || 0,
            publishedProjects: data.publishedProjects || 0,
            draftProjects: data.draftProjects || 0,
            publishedServices: data.publishedServices || 0,
            draftServices: data.draftServices || 0,
            openJobs: data.openJobs || 0,
            unreadNotifications: data.unreadNotifications || 0,
          });

          if (Array.isArray(data.recentEnquiries)) setRecentEnquiries(data.recentEnquiries);
          if (Array.isArray(data.recentApplications)) setRecentApplications(data.recentApplications);
          if (Array.isArray(data.recentActivity)) setRecentActivity(data.recentActivity);
        }
      })
      .catch((err) => console.error("Error fetching admin stats:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-10 font-sans">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              01 / OVERVIEW
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight uppercase">
              PRACTICE CONTROL CENTER
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              KORALS DESIGN PRIVATE LIMITED • Live Operational Telemetry &amp; Database State
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/notifications"
              className="inline-flex items-center gap-2 bg-white border border-[#E8E8E5] px-4 py-2.5 rounded-full text-xs font-mono text-[#171717] hover:bg-[#F7F7F5] transition-all"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{stats.unreadNotifications} UNREAD ALERTS</span>
            </Link>

            <Link
              href="/admin/home"
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider hover:bg-[#2A2A28] transition-all shadow-md uppercase"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>MANAGE HOMEPAGE</span>
            </Link>
          </div>
        </div>

        {/* 6 Real Database Operational Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Projects */}
          <Link
            href="/admin/projects"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  PROJECT PORTFOLIO
                </span>
                <Building2 className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717]">
                {loading ? "..." : stats.publishedProjects}
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                {stats.draftProjects > 0 ? `+ ${stats.draftProjects} DRAFT` : "PUBLISHED ARCHITECTURAL WORKS"}
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE PORTFOLIO</span>
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
                  PRACTICE SERVICES
                </span>
                <Layers className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717]">
                {loading ? "..." : stats.publishedServices}
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                ACTIVE DISCIPLINES &amp; OFFERINGS
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE SERVICES</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Enquiries */}
          <Link
            href="/admin/enquiries"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  CLIENT ENQUIRIES
                </span>
                <Mail className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717] flex items-baseline gap-2">
                <span>{loading ? "..." : stats.unreadEnquiries}</span>
                <span className="text-xs font-mono text-[#6B6B6B] font-normal">/ {stats.totalEnquiries} TOTAL</span>
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                {stats.unreadEnquiries > 0 ? "NEW SUBMISSIONS AWAITING REVIEW" : "ALL INQUIRIES ADDRESSED"}
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>VIEW INBOX</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Career Applications */}
          <Link
            href="/admin/applications"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  APPLICANTS &amp; TALENT
                </span>
                <Users className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717] flex items-baseline gap-2">
                <span>{loading ? "..." : stats.unreadApplications}</span>
                <span className="text-xs font-mono text-[#6B6B6B] font-normal">/ {stats.totalApplications} TOTAL</span>
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                {stats.unreadApplications > 0 ? "NEW CANDIDATES PENDING" : "RECRUITMENT UP TO DATE"}
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE APPLICANTS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Open Positions */}
          <Link
            href="/admin/careers"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  CAREER POSTINGS
                </span>
                <Briefcase className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717]">
                {loading ? "..." : stats.openJobs}
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                PUBLISHED ACTIVE VACANCIES
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE VACANCIES</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: Methodology Workflow */}
          <Link
            href="/admin/methodology"
            className="p-6 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">
                  METHODOLOGY STAGES
                </span>
                <Compass className="w-4 h-4 text-[#171717]" />
              </div>
              <div className="text-4xl font-mono font-bold text-[#171717]">
                6
              </div>
              <p className="text-[11px] font-mono text-[#6B6B6B] uppercase">
                IDEA TO REALITY WORKFLOW
              </p>
            </div>
            <div className="pt-4 border-t border-[#F7F7F5] mt-4 flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700">
              <span>MANAGE 6 STAGES</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* QUICK CONTROL MATRIX */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E8E5] shadow-2xs space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6B6B] block">
            PRACTICE NAVIGATION DIRECTORY
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 font-mono text-xs">
            <Link
              href="/admin/home"
              className="p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white transition-all border border-[#E8E8E5] flex flex-col justify-between"
            >
              <FileText className="w-4 h-4 mb-2" />
              <span className="font-bold">HOMEPAGE</span>
            </Link>
            <Link
              href="/admin/methodology"
              className="p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white transition-all border border-[#E8E8E5] flex flex-col justify-between"
            >
              <Compass className="w-4 h-4 mb-2" />
              <span className="font-bold">METHODOLOGY</span>
            </Link>
            <Link
              href="/admin/projects"
              className="p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white transition-all border border-[#E8E8E5] flex flex-col justify-between"
            >
              <Building2 className="w-4 h-4 mb-2" />
              <span className="font-bold">PROJECTS</span>
            </Link>
            <Link
              href="/admin/services"
              className="p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white transition-all border border-[#E8E8E5] flex flex-col justify-between"
            >
              <Layers className="w-4 h-4 mb-2" />
              <span className="font-bold">SERVICES</span>
            </Link>
            <Link
              href="/admin/seo"
              className="p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white transition-all border border-[#E8E8E5] flex flex-col justify-between"
            >
              <Globe className="w-4 h-4 mb-2" />
              <span className="font-bold">SEO META</span>
            </Link>
            <Link
              href="/admin/settings"
              className="p-3 rounded-xl bg-[#F7F7F5] hover:bg-[#171717] hover:text-white transition-all border border-[#E8E8E5] flex flex-col justify-between"
            >
              <Settings className="w-4 h-4 mb-2" />
              <span className="font-bold">SETTINGS</span>
            </Link>
          </div>
        </div>

        {/* TWO COLUMN SECTION: RECENT ENQUIRIES & RECENT APPLICANTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* RECENT BUSINESS ENQUIRIES */}
          <div className="bg-white rounded-2xl border border-[#E8E8E5] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                  CLIENT INTAKE
                </span>
                <h2 className="text-lg font-bold text-[#171717] uppercase">
                  RECENT ENQUIRIES
                </h2>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-mono font-bold text-[#171717] hover:underline uppercase flex items-center gap-1"
              >
                <span>ALL ENQUIRIES</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-[#6B6B6B]">
                NO CLIENT ENQUIRIES RECORDED.
              </div>
            ) : (
              <div className="divide-y divide-[#E8E8E5] font-mono text-xs">
                {recentEnquiries.map((enq) => (
                  <div key={enq.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#171717]">{enq.name}</span>
                        {enq.company && (
                          <span className="text-[10px] text-[#6B6B6B]">({enq.company})</span>
                        )}
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                            enq.status === "NEW"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-emerald-100 text-emerald-900"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6B6B6B] font-sans">
                        {enq.project_type || enq.subject}
                      </div>
                    </div>

                    <Link
                      href="/admin/enquiries"
                      className="text-xs font-bold text-[#171717] hover:underline shrink-0"
                    >
                      VIEW →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECENT CAREER APPLICANTS */}
          <div className="bg-white rounded-2xl border border-[#E8E8E5] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                  TALENT ACQUISITION
                </span>
                <h2 className="text-lg font-bold text-[#171717] uppercase">
                  RECENT APPLICANTS
                </h2>
              </div>
              <Link
                href="/admin/applications"
                className="text-xs font-mono font-bold text-[#171717] hover:underline uppercase flex items-center gap-1"
              >
                <span>ALL APPLICANTS</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-[#6B6B6B]">
                NO CANDIDATE APPLICATIONS RECORDED.
              </div>
            ) : (
              <div className="divide-y divide-[#E8E8E5] font-mono text-xs">
                {recentApplications.map((app) => (
                  <div key={app.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#171717]">{app.applicant_name}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                            app.status === "NEW"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-blue-100 text-blue-900"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6B6B6B]">
                        {app.position}
                      </div>
                    </div>

                    <Link
                      href="/admin/applications"
                      className="text-xs font-bold text-[#171717] hover:underline shrink-0"
                    >
                      VIEW →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* AUDIT LOG SNAPSHOT */}
        {recentActivity.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E8E8E5] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E5]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#171717]" />
                <h2 className="text-lg font-bold text-[#171717] uppercase font-mono">
                  LIVE AUDIT EVENTS FEED
                </h2>
              </div>
              <Link
                href="/admin/activity"
                className="text-xs font-mono font-bold text-[#171717] hover:underline uppercase flex items-center gap-1"
              >
                <span>FULL AUDIT TRAIL</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#E8E8E5] font-mono text-xs">
              {recentActivity.map((ev) => (
                <div key={ev.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] bg-[#171717] text-white px-2 py-0.5 rounded font-bold uppercase">
                      {ev.action}
                    </span>
                    <span className="text-[#171717] font-semibold">{ev.entity_type}</span>
                    <span className="text-[#6B6B6B] text-[11px] hidden sm:inline">{ev.details || ""}</span>
                  </div>
                  <span className="text-[10px] text-[#6B6B6B] shrink-0">
                    {ev.created_at ? new Date(ev.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
