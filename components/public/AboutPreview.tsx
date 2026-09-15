'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Calendar } from 'lucide-react';

export default function AboutPreview() {
  const capabilities = [
    'Architectural Design & Structural Planning',
    'Civil Engineering Project Management (PMC)',
    'Industrial Facility & Logistics Park Design',
    'Statutory Approvals & Technical Liaisoning',
    'MPCB, MIDC & PMRDA Sanction Clearances',
    'Geospatial Land Survey & GPR Utility Scanning',
    'Technical & Financial Feasibility Studies',
  ];

  const milestones = [
    { year: '2005', title: 'Pensioners Land Surveyors Associates', desc: 'Precision land surveying & revenue mapping' },
    { year: '2013', title: 'Korals Engineering Solutions', desc: 'Civil project management & industrial consultancy' },
    { year: '2020', title: 'Korals Design Pvt Ltd', desc: 'Integrated architectural & engineering consultancy' },
  ];

  return (
    <section className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Editorial Heading & Imagery */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
                <span>Corporate Story & Heritage</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Pioneering Architectural & Engineering Excellence in Pune
              </h2>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                alt="Korals Design Architectural Planning"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">Corporate Office</span>
                  <span className="text-white text-sm font-semibold">Parvati, Pune, Maharashtra</span>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded border border-amber-500/30">
                  Est. 2005
                </span>
              </div>
            </div>

            {/* Timeline Milestones Horizontal Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {milestones.map((m) => (
                <div key={m.year} className="p-4 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-amber-400 text-lg">{m.year}</span>
                    <Calendar className="w-3.5 h-3.5 text-amber-500/70" />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{m.title}</h4>
                  <p className="text-[10px] text-slate-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Capabilities */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                <strong className="text-white font-semibold">Korals Design Pvt Ltd</strong> is a premier architectural design, civil project management consultancy (PMC), and government permissions specialist based in Pune, Maharashtra.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Led by Directors <strong className="text-slate-200 font-semibold">Mr. Mahesh Govardhan</strong> and <strong className="text-slate-200 font-semibold">Mr. Uday Honap</strong>, our firm bridges complex architectural concepts with rigid statutory frameworks and heavy engineering requirements.
              </p>
            </div>

            {/* Core Capabilities Checklist */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-400">Our Technical Capabilities:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Leadership & Action Banner */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Executive Leadership</span>
                  <span className="text-xs font-bold text-white">Mr. Mahesh Govardhan & Mr. Uday Honap</span>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap shadow-md shadow-amber-500/10"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
