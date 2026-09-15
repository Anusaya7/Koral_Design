import React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Wrench,
  Briefcase,
  Users,
  MessageSquare,
  ShieldCheck,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export const revalidate = 0; // Fresh dashboard metrics

async function getDashboardStats() {
  try {
    const totalProjects = await prisma.project.count();
    const activeServices = await prisma.service.count({ where: { isPublished: true } });
    const openJobs = await prisma.job.count({ where: { isPublished: true } });
    const totalApplications = await prisma.jobApplication.count();
    const unreadInquiries = await prisma.contactInquiry.count({ where: { status: 'New' } });
    const totalInquiries = await prisma.contactInquiry.count();

    const recentInquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentActivity = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    return {
      totalProjects,
      activeServices,
      openJobs,
      totalApplications,
      unreadInquiries,
      totalInquiries,
      recentInquiries,
      recentActivity,
    };
  } catch (err) {
    return {
      totalProjects: 0,
      activeServices: 0,
      openJobs: 0,
      totalApplications: 0,
      unreadInquiries: 0,
      totalInquiries: 0,
      recentInquiries: [],
      recentActivity: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Total Projects',
      count: stats.totalProjects,
      label: 'Published & Draft Projects',
      icon: FolderKanban,
      href: '/admin/projects',
    },
    {
      title: 'Active Services',
      count: stats.activeServices,
      label: 'Specialized Engineering Services',
      icon: Wrench,
      href: '/admin/services',
    },
    {
      title: 'Open Careers',
      count: stats.openJobs,
      label: 'Active Job Openings',
      icon: Briefcase,
      href: '/admin/careers',
    },
    {
      title: 'Job Applicants',
      count: stats.totalApplications,
      label: 'Submitted Resumes',
      icon: Users,
      href: '/admin/applications',
    },
    {
      title: 'Unread Inquiries',
      count: stats.unreadInquiries,
      label: `Of ${stats.totalInquiries} total client inquiries`,
      icon: MessageSquare,
      href: '/admin/inquiries',
      highlight: stats.unreadInquiries > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-6 rounded-xl bg-slate-900 border transition-all shadow-xl group ${
                card.highlight
                  ? 'border-amber-500/70 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
                <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="font-display font-black text-3xl text-white mb-1">
                {card.count}
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Two Column Grid: Recent Inquiries & Activity Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Client Inquiries */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-white">Recent Contact Inquiries</h2>
              <p className="text-xs text-slate-400">Latest messages submitted via public website</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recentInquiries.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No contact inquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{inquiry.name}</span>
                      {inquiry.company && (
                        <span className="text-xs text-slate-400">({inquiry.company})</span>
                      )}
                      {inquiry.status === 'New' && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{inquiry.subject}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{inquiry.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {formatDate(inquiry.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Audit Log */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-display font-bold text-lg text-white">System Activity Audit Log</h2>
              <p className="text-xs text-slate-400">Recent administrator actions</p>
            </div>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>

          {stats.recentActivity.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No activity logged yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-bold text-amber-400 uppercase tracking-wider">{log.action}</span>
                    <span>{formatDate(log.createdAt)}</span>
                  </div>
                  <p className="text-slate-200 font-medium">{log.details}</p>
                  <span className="text-[10px] text-slate-500">By: {log.user}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
