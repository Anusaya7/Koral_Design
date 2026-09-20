"use client";

import { useState } from "react";
import { ArrowRight, Compass, ShieldCheck, Layers, FileText, Factory, CheckCircle2 } from "lucide-react";

export default function IdeaToReality() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "CONCEPT",
      subtitle: "Site Analysis & Vision",
      desc: "Topographic land survey, contour mapping, process flow analysis, and site layout feasibility study.",
      icon: Compass,
    },
    {
      num: "02",
      title: "DESIGN",
      subtitle: "Architectural CAD & 3D",
      desc: "Detailed architectural master planning, structural engineering design, CAD drafting, and 3D spatial walkthroughs.",
      icon: Layers,
    },
    {
      num: "03",
      title: "DOCUMENTATION",
      subtitle: "Statutory File Preparation",
      desc: "Comprehensive technical dossier compilation, statutory NOC checklist, and municipal building drawing preparation.",
      icon: FileText,
    },
    {
      num: "04",
      title: "APPROVALS",
      subtitle: "Government Sanctions & Liaison",
      desc: "Technical department liaison and follow-up support for permissions with MIDC, MPCB, DISH, PMRDA, PMC, PCMC.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "PROJECT MANAGEMENT",
      subtitle: "PMC & Quality Supervision",
      desc: "Site supervision, quantity estimation, contractor tendering, milestone tracking, and invoice certification.",
      icon: Factory,
    },
    {
      num: "06",
      title: "EXECUTION",
      subtitle: "Facility Handover & As-Built",
      desc: "Final structural compliance inspection, third-party quality verification, and operational facility handover.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="idea-to-reality" className="py-24 md:py-36 bg-[#181818] text-white border-b border-[#2A2A28] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-arch-grid-dark" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/60 block mb-3">
              KD / 04 — PROGRESSIVE METHODOLOGY
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[0.95]">
              FROM IDEA <br />
              <span className="italic font-serif font-normal text-white/70">TO REALITY.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/80 max-w-md leading-relaxed font-normal">
            A comprehensive 6-stage architectural, engineering, statutory clearance, and project execution delivery framework.
          </p>
        </div>

        {/* Desktop Progressive Process Timeline (Grid / Selector) */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4">
          {steps.map((item, idx) => {
            const isActive = activeStep === idx;
            const IconComp = item.icon;
            return (
              <button
                key={item.num}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-64 cursor-pointer relative group ${
                  isActive
                    ? "bg-white text-[#171717] border-white shadow-2xl scale-[1.03]"
                    : "bg-[#262624] text-white border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive ? "text-[#171717]" : "text-white/40 group-hover:text-emerald-400"
                    }`}
                  >
                    {item.num}
                  </span>
                  <IconComp className={`w-4 h-4 ${isActive ? "text-[#171717]" : "text-white/50"}`} />
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold tracking-wider mb-1">{item.title}</h3>
                  <p className={`text-[11px] font-mono mb-2 ${isActive ? "text-[#6B6B6B]" : "text-white/60"}`}>
                    {item.subtitle}
                  </p>
                  <p className={`text-[11px] leading-relaxed line-clamp-3 ${isActive ? "text-[#171717]" : "text-white/70"}`}>
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Vertical Process Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.num}
                className="bg-[#262624] p-6 rounded-2xl border border-white/10 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">STAGE {item.num}</span>
                  <IconComp className="w-4 h-4 text-white/60" />
                </div>
                <h3 className="text-base font-bold text-white font-mono">{item.title}</h3>
                <p className="text-xs text-white/60 font-mono">{item.subtitle}</p>
                <p className="text-xs text-white/80 leading-relaxed pt-2 border-t border-white/10">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Stage Highlight Banner */}
        {steps[activeStep] && (
          <div className="hidden lg:flex p-8 rounded-3xl bg-[#262624] border border-white/15 items-center justify-between gap-8 text-xs font-mono">
            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold font-mono text-emerald-400">{steps[activeStep].num}</span>
              <div>
                <span className="text-white font-bold block text-sm">{steps[activeStep].title} — {steps[activeStep].subtitle}</span>
                <span className="text-white/70 text-xs">{steps[activeStep].desc}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/60 shrink-0">
              <span>PROGRESSION {activeStep + 1} / 6</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
