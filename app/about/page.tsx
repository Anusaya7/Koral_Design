import React from 'react';
import Timeline from '@/components/public/Timeline';
import Link from 'next/link';
import { Building2, Compass, ShieldCheck, UserCheck, CheckCircle2, ArrowRight, Award, Layers } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'About Us | Leadership & History',
  description: 'Learn about Korals Design Pvt Ltd, our history since 2005, directors Mr. Mahesh Govardhan & Mr. Uday Honap, and our expertise in architectural design, civil engineering PMC, and statutory approvals.',
};

export default async function AboutPage() {
  let teamMembers: any[] = [];
  try {
    teamMembers = await prisma.teamMember.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  } catch (e) {
    teamMembers = [];
  }

  const defaultLeaders = [
    {
      name: 'Mr. Mahesh Govardhan',
      role: 'Director',
      bio: 'Co-Director of Korals Design Pvt Ltd with over two decades of expertise in architectural design, civil engineering project management, and strategic industrial planning across Maharashtra.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Mr. Uday Honap',
      role: 'Director',
      bio: 'Co-Director specializing in technical liaison, government permissions, statutory compliance, and large-scale infrastructure project execution.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const leaders = teamMembers.length > 0 ? teamMembers : defaultLeaders;

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20 space-y-20">
      {/* Hero Banner */}
      <section className="relative py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <span>Corporate Overview</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            About Korals Design Pvt Ltd
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed">
            Korals Design Pvt Ltd is a leading architectural and engineering consultancy based in Pune, Maharashtra, India. We deliver master planning, structural design, statutory approvals, and civil project management across India.
          </p>
        </div>
      </section>

      {/* Core Sectors & Domain Experience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Multidisciplinary Engineering & Architectural Experience
          </h2>
          <p className="text-slate-400 text-base">
            Our team possesses verified track records across SEZ developments, heavy industrial plants, civic infrastructure, and high-density commercial complexes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'SEZ & Industrial Projects',
              desc: 'Heavy manufacturing plants, assembly halls, logistics hubs, and Special Economic Zone master planning.',
              icon: Building2,
            },
            {
              title: 'Institutional & Corporate',
              desc: 'Corporate headquarters, municipal civic centers, administrative complexes, and educational institutes.',
              icon: Layers,
            },
            {
              title: 'Government Permissions',
              desc: 'Technical liaisoning with MPCB, MIDC, DISH, PMRDA, PMC, PCMC, and revenue authorities.',
              icon: ShieldCheck,
            },
            {
              title: 'Project Management (PMC)',
              desc: 'On-site execution monitoring, scheduling, BOQ verification, quality audits, and billing certification.',
              icon: Award,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-500/50 transition-colors shadow-xl"
              >
                <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-slate-900 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Executive Leadership</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Guided by Experienced Industry Leaders
            </h2>
            <p className="text-slate-400 text-sm">
              Our directors combine decades of technical engineering precision with strategic statutory clearance expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leaders.map((leader, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-8 space-y-5 shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={leader.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'}
                      alt={leader.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                    />
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-white">{leader.name}</h3>
                      <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider block">
                        {leader.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">{leader.bio}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Korals Design Pvt Ltd</span>
                  <span className="text-amber-400 font-semibold">Pune, Maharashtra</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <Timeline />

      {/* Why Choose Korals Design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Why Partner With Korals Design?
          </h2>
          <p className="text-slate-400 text-base">
            From initial DGPS land survey to final occupancy clearance, we safeguard cost, quality, and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Single-Window Approvals',
              desc: 'Seamless filing and follow-up with MPCB, MIDC, DISH, PMRDA, PMC, and PCMC eliminates administrative delays.',
            },
            {
              title: 'Geospatial Precision',
              desc: 'Sub-surface utility mapping (GPR), DGPS topographic survey, and accurate earthwork volume calculations prevent cost overruns.',
            },
            {
              title: 'Fast-Track PMC Execution',
              desc: 'Rigorous vendor supervision and BOQ audits ensure projects like Suzlon are completed months ahead of schedule.',
            },
          ].map((card, idx) => (
            <div key={idx} className="p-8 rounded-lg bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-display font-bold text-xl text-white">{card.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
