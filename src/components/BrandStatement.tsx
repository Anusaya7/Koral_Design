"use client";

import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Layers } from "lucide-react";

export default function BrandStatement() {
  return (
    <section id="brand-statement" className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5] relative overflow-hidden">
      {/* Background Blueprint Lines */}
      <div className="absolute inset-0 opacity-40 bg-arch-grid pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header Indicator */}
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
            KD / 01 — PRACTICE STATEMENT
          </span>
          <span className="text-xs font-mono text-[#6B6B6B]">
            PUNE / MAHARASHTRA / INDIA
          </span>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Large Editorial Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest block mb-2">
              KORALS DESIGN PRACTICE PHILOSOPHY
            </span>

            <h2 className="text-5xl sm:text-7xl lg:text-[84px] font-black text-[#171717] tracking-[-0.04em] leading-[0.95]">
              WE DESIGN. <br />
              <span className="text-[#6B6B6B]">WE ENGINEER.</span> <br />
              <span className="italic font-serif font-normal text-[#171717]">WE COORDINATE.</span>
            </h2>

            <div className="pt-8 grid grid-cols-3 gap-4 text-xs font-mono border-t border-[#E8E8E5] mt-8 text-[#171717]">
              <div className="space-y-1">
                <Compass className="w-4 h-4 text-[#171717]" />
                <span className="font-bold block uppercase">ARCHITECTURE</span>
                <span className="text-[11px] text-[#6B6B6B]">Master Planning &amp; Design</span>
              </div>
              <div className="space-y-1">
                <Layers className="w-4 h-4 text-[#171717]" />
                <span className="font-bold block uppercase">ENGINEERING</span>
                <span className="text-[11px] text-[#6B6B6B]">PMC &amp; Site Supervision</span>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#171717]" />
                <span className="font-bold block uppercase">COORDINATION</span>
                <span className="text-[11px] text-[#6B6B6B]">Statutory Department Liaison</span>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Narrative & Technical Divider (5 cols) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#E8E8E5] pt-8 lg:pt-0 lg:pl-12 space-y-8 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#E8E8E5] text-[11px] font-mono text-[#171717] font-semibold">
                INTEGRATED SINGLE-WINDOW SOLUTION
              </span>

              <p className="text-base sm:text-lg text-[#171717] font-medium leading-relaxed">
                Korals Design Private Limited brings an integrated approach combining architectural planning, civil engineering project management, ground survey consultancy, and technical liaison with government departments across Maharashtra.
              </p>

              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                Established with land surveying roots in 2005 and incorporated as Korals Design Private Limited in 2020, we manage complex industrial manufacturing facilities, corporate headquarters, commercial developments, and municipal civil infrastructure from concept through statutory clearances and site handover.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E8E5]">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:translate-x-1 transition-transform group"
              >
                <span>READ COMPLETE COMPANY HISTORY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
