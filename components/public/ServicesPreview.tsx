'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass,
  FileCheck,
  MapPin,
  Briefcase,
  CheckSquare,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  icon: string;
  image: string;
  shortDesc: string;
  features: string;
}

interface ServicesPreviewProps {
  services?: ServiceItem[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  FileCheck,
  MapPin,
  Briefcase,
  CheckSquare,
};

export default function ServicesPreview({ services = [] }: ServicesPreviewProps) {
  // Fallback verified services if database array is empty initially
  const defaultServices = [
    {
      id: '1',
      number: '01',
      title: 'Architectural Planning and Design',
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      shortDesc: 'Comprehensive architectural concepts, master planning, structural planning, and modern facility design tailored for SEZ and industrial zones.',
    },
    {
      id: '2',
      number: '02',
      title: 'Sanctions & Approvals',
      icon: 'FileCheck',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      shortDesc: 'Complete statutory clearance & technical liaisoning with MPCB, MIDC, DISH, PMRDA, PMC, PCMC, and revenue authorities.',
    },
    {
      id: '3',
      number: '03',
      title: 'Land Survey and Consultancy',
      icon: 'MapPin',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
      shortDesc: 'High-precision geospatial surveys, sub-surface scanning, topographic mapping, contour analysis, and government Mojani.',
    },
    {
      id: '4',
      number: '04',
      title: 'Project Management Consultancy (PMC)',
      icon: 'Briefcase',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=800',
      shortDesc: 'End-to-end execution supervision, scheduling, quality assurance, estimation, tendering, and invoice certification.',
    },
    {
      id: '5',
      number: '05',
      title: 'Project Works Consultancy',
      icon: 'CheckSquare',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      shortDesc: 'Technical feasibility studies, third-party independent inspection, structural stability audits, and handover documentation.',
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <span>Core Specializations</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Integrated Architectural & Engineering Services
            </h2>
            <p className="text-slate-400 text-base">
              End-to-end Solutions — Design, Statutory Approvals and Civil Execution Management.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors self-start md:self-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Compass;

            return (
              <motion.div
                key={service.id || service.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/60 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between"
              >
                {/* Background Image Preview on Hover */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  <span className="absolute top-4 left-4 font-display font-black text-4xl text-amber-400/90 tracking-wider">
                    {service.number}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-400 group-hover:text-amber-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
