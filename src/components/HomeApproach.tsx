"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Layers, Eye, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeApproach() {
  const approvalSteps = [
    { title: "DESIGN", desc: "Building drawings & CAD masterplan" },
    { title: "DOCUMENTATION", desc: "Statutory file & annexure compilation" },
    { title: "SUBMISSION", desc: "Filing at department portal desk" },
    { title: "TECHNICAL COORDINATION", desc: "Liaison with municipal engineers" },
    { title: "AUTHORITY FOLLOW-UP", desc: "Clarifications & site inspection" },
    { title: "APPROVAL SUPPORT", desc: "Assisting NOC & consent issuance" },
    { title: "PROJECT PROGRESSION", desc: "Uninterrupted site construction" },
  ];

  const pmSteps = [
    { step: "01", title: "PLANNING", desc: "Master timeline & site logistics plan" },
    { step: "02", title: "SCHEDULING", desc: "Critical path method & resource allocations" },
    { step: "03", title: "ESTIMATION", desc: "Detailed BOQ & quantity estimation" },
    { step: "04", title: "TENDERING", desc: "Vendor pre-qualification & bid evaluation" },
    { step: "05", title: "EXECUTION MONITORING", desc: "Daily site progress & milestone audit" },
    { step: "06", title: "SUPERVISION", desc: "Structural & safety site inspection" },
    { step: "07", title: "QUALITY CONTROL", desc: "Material lab testing & standard audits" },
    { step: "08", title: "INVOICE CERTIFICATION", desc: "Contractor bill verification & handover" },
  ];

  const [activePmStep, setActivePmStep] = useState(0);

  return (
    <section id="approach-section" className="py-24 md:py-32 bg-[#181818] text-white border-b border-[#2A2A28]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28">
        
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xs font-mono tracking-widest text-white/90 font-bold uppercase">
            04 / APPROACH
          </span>
          <span className="text-xs font-mono text-white/60">
            STATUTORY LIAISON &amp; PROJECT MANAGEMENT
          </span>
        </div>

        {/* 1. GOVERNMENT APPROVALS PROCESS */}
        <div className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              STATUTORY COMPLIANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              FROM DESIGN TO APPROVAL
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Technical coordination support for building permits, consents, and NOC clearances with statutory bodies.
            </p>
          </div>

          {/* Process Flow Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {approvalSteps.map((s, idx) => (
              <div
                key={s.title}
                className="bg-[#262624] p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3 relative group hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white/40 group-hover:text-emerald-400 transition-colors">
                    STEP 0{idx + 1}
                  </span>
                  {idx < approvalSteps.length - 1 && (
                    <span className="hidden lg:block text-white/20 text-xs">→</span>
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-wide text-white mb-1">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-white/60 leading-normal">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Authorities Badges */}
          <div className="p-6 rounded-2xl bg-[#262624] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <span className="text-white/60">Statutory Authority Coordination Scope:</span>
            <div className="flex flex-wrap items-center gap-2">
              {["MPCB", "MIDC", "DISH", "DSLR/SLR", "PMRDA", "PMC", "PCMC"].map((auth) => (
                <span
                  key={auth}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[11px]"
                >
                  {auth}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. PROJECT MANAGEMENT INTERACTIVE PROCESS */}
        <div className="pt-16 border-t border-white/10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
              <Layers className="w-4 h-4 text-emerald-400" />
              PMC WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              PROJECT MANAGEMENT PROCESS
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Structured 8-stage civil engineering PMC execution model from site estimation to final facility certification.
            </p>
          </div>

          {/* Interactive Step Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {pmSteps.map((item, idx) => {
              const isActive = activePmStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActivePmStep(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-36 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#171717] border-white shadow-xl scale-[1.02]"
                      : "bg-[#262624] text-white border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? "text-[#171717]" : "text-white/40"
                      }`}
                    >
                      {item.step}
                    </span>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>

                  <div>
                    <h3 className="text-xs font-mono font-bold tracking-wider">{item.title}</h3>
                    <p
                      className={`text-[11px] leading-tight mt-1 ${
                        isActive ? "text-[#6B6B6B]" : "text-white/60"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. VISUALIZATION SECTION */}
        <div className="pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
              <Eye className="w-4 h-4 text-emerald-400" />
              SPATIAL PRESENTATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              VISUALIZE BEFORE YOU BUILD
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Photorealistic 3D architectural rendering, walkthroughs, spatial presentations, and material lighting simulations.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
              <div className="p-4 rounded-xl bg-[#262624] border border-white/10">
                <span className="text-emerald-400 font-bold block mb-1">3D VISUALIZATION</span>
                <span className="text-white/70">Architectural &amp; plant renders</span>
              </div>
              <div className="p-4 rounded-xl bg-[#262624] border border-white/10">
                <span className="text-emerald-400 font-bold block mb-1">WALKTHROUGHS</span>
                <span className="text-white/70">Interactive spatial walkthroughs</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-8 py-4 rounded-full hover:bg-white/90 transition-all"
              >
                <span>EXPLORE VISUALIZATION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#262624] border border-white/15 shadow-2xl">
            <Image
              src="/images/hero_villa_render.jpg"
              alt="3D Architectural Visualization"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-xs font-mono text-white font-bold uppercase">ARCHITECTURAL VISUALIZATION</p>
              <p className="text-[11px] text-white/70">Industrial Plant Master Plan &amp; Spatial Walkthrough</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
