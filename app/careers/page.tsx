import React from 'react';
import CareerCardModal from '@/components/public/CareerCardModal';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Careers | Build the Future With Us',
  description: 'Join Korals Design Pvt Ltd in Pune. Explore career opportunities for architectural designers, civil engineers PMC, and government liaison executives.',
};

export const revalidate = 30;

export default async function CareersPage() {
  let jobs: any[] = [];
  try {
    jobs = await prisma.job.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    jobs = [];
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20 space-y-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <span>Careers & Talent</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Build the Future With Us
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed">
            Korals Design Pvt Ltd is expanding. We are seeking talented architectural designers, civil engineers, project managers, and statutory liaison professionals to shape industrial and corporate spaces across India.
          </p>
        </div>
      </section>

      {/* Main Jobs Listing & Modal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CareerCardModal jobs={jobs} />
      </div>
    </div>
  );
}
