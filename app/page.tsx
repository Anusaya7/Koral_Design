import React from 'react';
import Hero from '@/components/public/Hero';
import AboutPreview from '@/components/public/AboutPreview';
import ServicesPreview from '@/components/public/ServicesPreview';
import ProjectsGrid from '@/components/public/ProjectsGrid';
import Timeline from '@/components/public/Timeline';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

async function getHomeData() {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    const services = await prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });

    const settingsList = await prisma.websiteSetting.findMany();
    const settings = settingsList.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return { projects, services, settings };
  } catch (err) {
    console.error('Database connection error in home page:', err);
    return { projects: [], services: [], settings: {} };
  }
}

export default async function HomePage() {
  const { projects, services, settings } = await getHomeData();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero
        heroTitle={settings.hero_title || 'INNOVATING INDUSTRIAL SPACES'}
        heroSubtitle={settings.hero_subtitle || 'End-to-End Solutions — Design, Approvals and Execution'}
      />

      {/* Company Introduction / About Preview */}
      <AboutPreview />

      {/* Dynamic Services Showcase */}
      <ServicesPreview services={services} />

      {/* Featured Projects Spotlight */}
      <section className="py-24 bg-slate-950 text-white relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                <span>Featured Work</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                Landmark Architecture & Engineering Projects
              </h2>
              <p className="text-slate-400 text-base">
                Discover our portfolio across Kasarwadi Pune, Shrirampur, Chakan, and pan-India industrial hubs.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProjectsGrid projects={projects} showFilters={true} />
        </div>
      </section>

      {/* History Timeline */}
      <Timeline />

      {/* Statutory & Regulatory Trust Banner */}
      <section className="py-20 bg-slate-900 border-t border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Trusted Technical Liaison & Government Approvals
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We navigate complex statutory frameworks to secure end-to-end building sanctions, consents, and licenses from state and municipal authorities in Maharashtra.
            </p>
          </div>

          {/* Authorities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 pt-4">
            {['MPCB', 'MIDC', 'DISH', 'DSLR / SLR', 'PMRDA', 'PMC', 'PCMC'].map((authority) => (
              <div
                key={authority}
                className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-2 group hover:border-amber-500/50 transition-colors"
              >
                <ShieldCheck className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="font-display font-bold text-sm text-white tracking-wider">
                  {authority}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Cleared</span>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="pt-8">
            <div className="p-8 sm:p-12 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-white">
                  Ready to Start Your Architectural or Industrial Project?
                </h3>
                <p className="text-sm text-slate-300">
                  Connect with our Directors and senior engineering consultants in Pune today.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
              >
                <span>Initiate Project Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
