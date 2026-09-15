import React from 'react';
import ProjectsGrid from '@/components/public/ProjectsGrid';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Projects Portfolio | Architecture & Industrial Engineering',
  description: 'Explore Korals Design Pvt Ltd portfolio including Alfa Laval Kasarwadi Pune, Shrirampur Municipal Corporation, Suzlon, and PMRDA industrial hubs.',
};

export const revalidate = 30;

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    projects = [];
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20 space-y-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <span>Portfolio Showcase</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Our Architectural & Engineering Projects
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed">
            State-of-the-Art Industrial Buildings, Civic Infrastructure, Corporate Headquarters, and Renewable Energy Facilities across Maharashtra.
          </p>
        </div>
      </section>

      {/* Main Filterable Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsGrid projects={projects} showFilters={true} />
      </div>
    </div>
  );
}
