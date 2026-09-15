'use me';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Shield, Award, Sparkles } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    year: '2005',
    title: 'Establishment of Land Surveying Firm',
    description: 'Pensioners Land Surveyors Associates established as a partnership firm under the Indian Partnership Act, 1932. Pioneer in precision land surveying, revenue Mojani, and contour mapping.',
    icon: Calendar,
    accent: 'border-slate-700',
  },
  {
    year: '2013',
    title: 'Expansion into Engineering Solutions',
    description: 'Expansion into Korals Engineering Solutions Private Limited. Extended capabilities into civil engineering project management, statutory approvals, and industrial layout planning.',
    icon: Shield,
    accent: 'border-slate-700',
  },
  {
    year: '2020',
    title: 'Korals Design Pvt Ltd Incorporated',
    description: 'Establishment of Korals Design Pvt Ltd, consolidating architectural design, master planning, government liaisoning, and PMC services under a unified corporate umbrella.',
    icon: Award,
    accent: 'border-amber-500/50 bg-amber-500/5',
  },
  {
    year: 'Present',
    title: 'Pan-India Project Consultancy',
    description: 'Continuing to deliver world-class architectural, structural, engineering, industrial planning, and project works consultancy across Pune, Maharashtra, and pan-India.',
    icon: Sparkles,
    accent: 'border-amber-400',
  },
];

export default function Timeline() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Subtle Line Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <span>Our Growth Journey</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Two Decades of Engineering & Architectural Excellence
          </h2>
          <p className="text-slate-400 text-base">
            From specialized land survey beginnings in 2005 to full-scale corporate architectural consultancy.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-800 via-amber-500 to-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, index) => {
              const IconComponent = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-1/2 px-0 lg:px-8 mb-6 lg:mb-0">
                    <div className={`p-6 sm:p-8 rounded-lg bg-slate-900 border ${event.accent} shadow-xl hover:border-amber-500/50 transition-colors group`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display font-extrabold text-2xl sm:text-3xl text-amber-400 tracking-wider">
                          {event.year}
                        </span>
                        <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-amber-300 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-400 items-center justify-center z-10 shadow-lg shadow-amber-500/20">
                    <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                  </div>

                  {/* Spacer for 2-column alignment */}
                  <div className="w-full lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
