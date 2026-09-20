"use client";

import { Compass, ShieldCheck, Layers, MapPin, CheckCircle2, Award } from "lucide-react";

export default function KoralsMethod() {
  const methodSteps = [
    {
      num: "01",
      title: "UNDERSTAND",
      subtitle: "Requirement & Site Mapping",
      desc: "Analyze client operational requirements, factory machinery flow, land topography, contour boundaries, and statutory site constraints.",
      icon: MapPin,
    },
    {
      num: "02",
      title: "PLAN",
      subtitle: "Master Plan & Feasibility",
      desc: "Develop master layout plans, zoning schemes, structural feasibility, budget estimation, and preliminary approval roadmap.",
      icon: Compass,
    },
    {
      num: "03",
      title: "DESIGN",
      subtitle: "Architectural & CAD Modeling",
      desc: "Prepare detailed architectural drawings, structural CAD blueprints, 3D visual walkthroughs, and technical specifications.",
      icon: Layers,
    },
    {
      num: "04",
      title: "COORDINATE",
      subtitle: "Government Department Liaison",
      desc: "Coordinate technical liaison, statutory documentation, and permissions with MIDC, MPCB, DISH, PMRDA, PMC, PCMC.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "EXECUTE",
      subtitle: "PMC & Site Quality Control",
      desc: "Oversee civil construction execution, contractor tendering, quality control audits, site safety supervision, and invoice verification.",
      icon: CheckCircle2,
    },
    {
      num: "06",
      title: "DELIVER",
      subtitle: "Certification & Handover",
      desc: "Perform final structural audit, obtain completion certificates, compile as-built documentation, and deliver operational facility.",
      icon: Award,
    },
  ];

  return (
    <section id="korals-method" className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E8E5] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block mb-3">
              KD / 05 — CORE METHODOLOGY
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              THE KORALS METHOD
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md leading-relaxed">
            Factual engineering methodology refined across two decades of industrial, commercial, and municipal project delivery.
          </p>
        </div>

        {/* Large Numbered Method Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methodSteps.map((m) => {
            const IconComp = m.icon;
            return (
              <div
                key={m.num}
                className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#E8E8E5] flex flex-col justify-between space-y-6 hover:border-[#171717] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
                    <span className="text-4xl font-bold font-mono text-[#171717]/20 group-hover:text-[#171717] transition-colors">
                      {m.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E5] flex items-center justify-center text-[#171717] shadow-xs">
                      <IconComp className="w-4.5 h-4.5 text-[#171717]" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6B6B] block mb-1">
                      {m.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-[#171717] tracking-tight">{m.title}</h3>
                  </div>

                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E8E5] text-[10px] font-mono text-[#90908C] uppercase">
                  METHODOLOGY STAGE {m.num}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
