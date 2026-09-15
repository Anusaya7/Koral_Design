'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Compass, ShieldCheck, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

export default function AboutPreview() {
  const capabilities = [
    'Architectural Design & Structural Planning',
    'Civil Engineering Project Management',
    'Industrial Project & SEZ Planning',
    'Government Approvals & Statutory Sanctions',
    'Technical Liaisoning & Regulatory Clearance',
    'High-Precision Land Survey & GPR Scanning',
    'Project Works & Feasibility Consultancy',
  ];

  return (
    <section className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Photography Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-lg overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                alt="Korals Design Architectural Planning"
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-slate-950/80 backdrop-blur-md border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block">Corporate Office</span>
                    <span className="text-white text-sm font-semibold">Parvati, Pune, Maharashtra</span>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded border border-amber-500/30">
                    Est. 2005
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Overlapping Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 z-20 w-64 p-5 rounded bg-slate-950 border border-slate-800 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-white text-sm">Pune Headquarters</span>
              </div>
              <p className="text-xs text-slate-400">
                Directing large-scale industrial & government engineering projects across India.
              </p>
            </div>
          </div>

          {/* Right Column: Information & Positioning */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <span>Company Introduction</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Pioneering Architecture & Project Consultancy in Pune
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              <strong className="text-white font-semibold">Korals Design Pvt Ltd</strong> is a leading architectural services provider located in Pune, Maharashtra, India. We deliver complete end-to-end design, approvals, and execution management for industrial facilities, corporate spaces, institutional buildings, and civic infrastructure.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Our Core Expertise:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {capabilities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership Highlight */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Executive Leadership</span>
                  <span className="text-sm font-semibold text-white">Mr. Mahesh Govardhan & Mr. Uday Honap</span>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
