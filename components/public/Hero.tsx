'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, ChevronDown, Award, Building } from 'lucide-react';

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
}

export default function Hero({
  heroTitle = 'QUALITY YOU CAN TRUST',
  heroSubtitle = 'Innovating Industrial Spaces — End-to-End Solutions for Architectural Design, Statutory Approvals, and Engineering Execution.',
}: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 overflow-hidden pt-24 pb-16">
      {/* Background Architectural Image Overlay with Dark Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=2000"
          alt="Architectural & Engineering Masterwork"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      {/* Grid Pattern & Subtle Gold Architectural Accent Lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/3 left-8 w-px h-80 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/3 right-8 w-px h-80 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden lg:block" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full">
        <div className="max-w-4xl space-y-8">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>ARCHITECTURE • ENGINEERING • PROJECT CONSULTANCY</span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
              QUALITY YOU CAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">TRUST</span>
            </h1>
            <p className="font-display font-semibold text-lg sm:text-2xl text-amber-400/90 tracking-wide uppercase">
              Innovating Industrial Spaces
            </p>
          </motion.div>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl border-l-2 border-amber-500 pl-5 py-1"
          >
            {heroSubtitle}
          </motion.p>

          {/* Action Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded hover:from-amber-300 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5"
            >
              <span>VIEW OUR PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded transition-all backdrop-blur-md"
            >
              <span>START A PROJECT</span>
            </Link>
          </motion.div>
        </div>

        {/* Verified Performance Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-800/80"
        >
          <div className="space-y-1">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">150+</span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Projects Delivered</p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-amber-400 tracking-tight">5.2M+</span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sq.Ft. Industrial Space</p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">20+</span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Years Legacy (Est. 2005)</p>
          </div>
          <div className="space-y-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              100% Statutory Clearance
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">MPCB • MIDC • PMRDA • DISH</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-[9px] uppercase font-semibold tracking-widest">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 text-amber-500/70" />
      </div>
    </section>
  );
}
