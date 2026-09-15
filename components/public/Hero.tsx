'use me';
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, ChevronDown } from 'lucide-react';

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
}

export default function Hero({
  heroTitle = 'INNOVATING INDUSTRIAL SPACES',
  heroSubtitle = 'End-to-End Solutions — Design, Approvals and Execution',
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
      {/* Background Architectural Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=2000"
          alt="Architectural & Engineering Masterwork"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      {/* Grid Pattern & Accent Architectural Lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-10 w-px h-64 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-px h-64 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden lg:block" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>Korals Design Pvt Ltd • Pune, India</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6"
          >
            {heroTitle.split(' ').map((word, idx) => (
              <span key={idx} className={idx === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 block sm:inline' : 'inline'}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl border-l-2 border-amber-500 pl-4"
          >
            {heroSubtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded transition-all backdrop-blur-md"
            >
              <span>Talk to Our Experts</span>
            </Link>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-800/80"
        >
          <div className="space-y-1">
            <span className="font-display font-bold text-3xl sm:text-4xl text-white">150+</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Projects Delivered</p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-bold text-3xl sm:text-4xl text-amber-400">5.2M+</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sq.Ft. Industrial Area</p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-bold text-3xl sm:text-4xl text-white">20+</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Years Legacy</p>
          </div>
          <div className="space-y-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              100% Statutory Clearance
            </div>
            <p className="text-xs text-slate-400">MPCB, MIDC, PMRDA, DISH</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-[10px] uppercase font-semibold tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
