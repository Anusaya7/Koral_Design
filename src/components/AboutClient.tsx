"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Compass,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface LeadershipMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
}

interface AboutClientProps {
  initialLeadership?: LeadershipMember[];
}

export default function AboutClient({ initialLeadership }: AboutClientProps) {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(2); // Default 2020 active
  const [activeCapabilityIdx, setActiveCapabilityIdx] = useState(0);
  const [openMobileCapIdx, setOpenMobileCapIdx] = useState<number | null>(0);

  const defaultLeaders: LeadershipMember[] = [
    {
      id: 1,
      name: "Mahesh Govardhan",
      role: "Director",
      bio: "Directs overall architectural planning, statutory authority coordination, and strategic practice growth across Maharashtra.",
    },
    {
      id: 2,
      name: "Uday Honap",
      role: "Director",
      bio: "Leads civil engineering project management, structural quality assurance, ground survey precision, and PMC site operations.",
    },
  ];

  const leaders =
    initialLeadership && initialLeadership.length > 0 ? initialLeadership : defaultLeaders;

  const timelineMilestones = [
    {
      year: "2005",
      label: "01 — ORIGIN",
      name: "Pensioners Land Surveyors Associates",
      category: "FOUNDATION & LAND SURVEYING",
      desc: "Established precision land surveying, demarcation, contour mapping, and revenue Mojani consultancy in Pune.",
      details:
        "Initiated operations focusing on precision ground survey, contour mapping, and land revenue demarcation in Pune.",
    },
    {
      year: "2013",
      label: "02 — EVOLUTION",
      name: "Korals Engineering Solutions Pvt Ltd",
      category: "ENGINEERING & INDUSTRIAL EXPANSION",
      desc: "Expanded into Special Economic Zones (SEZs), heavy industrial manufacturing plants, and municipal infrastructure.",
      details:
        "Broadened technical scope to civil engineering project management, process plant flow planning, and large-scale infrastructure.",
    },
    {
      year: "2020",
      label: "03 — KORALS DESIGN",
      name: "Korals Design Pvt Ltd",
      category: "INTEGRATED PRACTICE INCORPORATION",
      desc: "Incorporated single-window architectural, PMC, statutory government clearance, and 3D visualization practice.",
      details:
        "Established integrated practice offering architectural master planning, government department liaison (MIDC, MPCB, DISH, PMRDA, PMC, PCMC), and 3D visual walkthroughs.",
    },
  ];

  const capabilities = [
    {
      num: "01",
      title: "Architectural Planning & Design",
      desc: "Industrial master planning, process flow architecture, commercial layouts, and structural spatial design.",
    },
    {
      num: "02",
      title: "Sanctions & Approvals",
      desc: "Technical liaison and statutory file processing with MIDC, MPCB, DISH, PMRDA, PMC, PCMC, and DSLR.",
    },
    {
      num: "03",
      title: "Land Survey & Consultancy",
      desc: "Precision ground survey, contour mapping, plot demarcation, and revenue land Mojani consultancy.",
    },
    {
      num: "04",
      title: "Project Management Consultancy (PMC)",
      desc: "End-to-end PMC, site supervision, quantity surveying, contractor bill verification, and milestone tracking.",
    },
    {
      num: "05",
      title: "Project Works Consultancy",
      desc: "Structural engineering evaluation, site quality audits, material compliance, and safety coordination.",
    },
    {
      num: "06",
      title: "Industrial Project Planning",
      desc: "Heavy manufacturing plant layout, crane gantry planning, utility grid coordination, and factory logistics.",
    },
    {
      num: "07",
      title: "Corporate Interiors",
      desc: "Executive office spaces, workplace ergonomics, acoustical ceiling layouts, and turnkey interior design.",
    },
    {
      num: "08",
      title: "3D Visualization & Walkthrough",
      desc: "High-resolution architectural renderings, virtual spatial walkthroughs, and client design presentations.",
    },
  ];

  const verifiedProjects = [
    {
      id: "alfa",
      name: "ALFA LAVAL INDIA LTD",
      type: "Industrial Building (12,274 Sq.M.)",
      location: "Kasarwadi, Bhosari, Pune",
      image: "/images/architecture_exterior_1.jpg",
    },
    {
      id: "shrirampur",
      name: "SHRIRAMPUR MUNICIPAL CORP",
      type: "Institutional Masterplan & Survey",
      location: "Shrirampur, Maharashtra",
      image: "/images/hero_villa_render.jpg",
    },
    {
      id: "suzlon",
      name: "SUZLON ENERGY FACILITY",
      type: "Green Energy Campus Planning",
      location: "Pune, Maharashtra",
      image: "/images/interior_lounge_1.jpg",
    },
  ];

  const siteSettings = {
    company_name: "KORALS DESIGN PVT LTD",
    legal_name: "Korals Design Private Limited",
    address: "201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030",
    phone: "+020 - 24324648",
    mobile: "+91 9822864648",
    email: "projects@koralsdesign.com",
    google_maps_url: "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9?g_st=ac",
  };

  return (
    <div className="w-full bg-[#F7F7F5] text-[#171717] overflow-x-hidden">
      
      {/* SECTION 01 — CINEMATIC ABOUT HERO */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28 bg-[#181818] text-white border-b border-[#2A2A28] overflow-hidden">
        {/* Background Architectural Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-arch-grid-dark" />

        {/* Hero Background Image Crop */}
        <div className="absolute inset-0 w-full h-full opacity-35 select-none pointer-events-none">
          <Image
            src="/images/hero_villa_render.jpg"
            alt="Korals Design Architectural Practice Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#181818]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
          
          {/* Technical Section Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              01 / ABOUT KORALS DESIGN
            </span>
          </div>

          {/* Technical Metadata Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-[10px] font-mono text-white/70 uppercase">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">ARCHITECTURE + ENGINEERING</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">PUNE / INDIA</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">EST. 2005</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-[-0.035em] leading-[1.02] max-w-5xl mb-6">
            DESIGNING <br className="hidden sm:inline" />
            SPACES. <br />
            <span className="text-white/80 font-normal italic font-serif">ENGINEERING</span> POSSIBILITIES.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl font-normal leading-relaxed mb-12">
            Korals Design is an architecture, engineering and project consultancy practice focused on creating thoughtful, technically sound and purposeful built environments.
          </p>

          {/* Hero Scroll CTA */}
          <a
            href="#who-we-are"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-white/80 hover:text-white uppercase px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 animate-bounce"
          >
            <span>EXPLORE OUR JOURNEY ↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 02 — WHO WE ARE */}
      <section id="who-we-are" className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              02 / WHO WE ARE
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              KD / PRACTICE PHILOSOPHY
            </span>
          </div>

          {/* Editorial Split Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Headline Statement (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
                INTEGRATED CONSULTANCY PRACTICE
              </span>

              <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-black text-[#171717] tracking-tight leading-[0.98]">
                ARCHITECTURE <br />
                <span className="text-[#6B6B6B]">WITH PURPOSE.</span> <br />
                ENGINEERING <br />
                <span className="italic font-serif font-normal text-[#171717]">WITH PRECISION.</span>
              </h2>

              <div className="pt-8 border-t border-[#E8E8E5] grid grid-cols-2 gap-6 text-xs font-mono text-[#171717]">
                <div>
                  <span className="text-[#6B6B6B] block uppercase text-[10px] mb-1">FOUNDATION</span>
                  <span className="font-bold block">2005 Land Surveying</span>
                </div>
                <div>
                  <span className="text-[#6B6B6B] block uppercase text-[10px] mb-1">INCORPORATION</span>
                  <span className="font-bold block">2020 Korals Design Pvt Ltd</span>
                </div>
              </div>
            </div>

            {/* Right Column: Verified Narrative (6 cols) */}
            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-[#E8E8E5] pt-8 lg:pt-0 lg:pl-12 space-y-6 text-base text-[#171717] leading-relaxed">
              <div className="inline-block px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#E8E8E5] text-[11px] font-mono text-[#171717] font-semibold">
                SINGLE-WINDOW PRACTICE
              </div>

              <p className="text-lg font-medium text-[#171717] leading-relaxed">
                Korals Design Private Limited brings an integrated approach combining architectural planning, civil engineering project management, ground survey consultancy, and technical liaison with government departments across Maharashtra.
              </p>

              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Established with land surveying roots in 2005 as <em>Pensioners Land Surveyors Associates</em> and incorporated as Korals Design Private Limited in 2020, we manage complex industrial manufacturing facilities, corporate headquarters, commercial developments, and municipal civil infrastructure from concept through statutory clearances and site handover.
              </p>

              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Our interdisciplinary methodology ensures that aesthetic design vision is seamlessly backed by structural calculations, site survey accuracy, statutory regulatory compliance (MIDC, MPCB, DISH, PMRDA, PMC, PCMC), and rigorous project management.
              </p>

              <div className="pt-6 border-t border-[#E8E8E5] flex items-center justify-between">
                <span className="text-xs font-mono text-[#6B6B6B] uppercase">KORALS DESIGN / PUNE</span>
                <span className="text-xs font-mono font-bold text-[#171717]">KD / PRACTICE</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 03 — OUR JOURNEY */}
      <section className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              03 / OUR JOURNEY
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              VERIFIED PRACTICE MILESTONES
            </span>
          </div>

          {/* Section Header */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block mb-2">
              TWO DECADES OF EVOLUTION
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              A PRACTICE BUILT OVER TIME.
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 leading-relaxed">
              Select or hover over a milestone to inspect Koral&apos;s Design factual organizational history.
            </p>
          </div>

          {/* Architectural Drawing Interactive Timeline */}
          <div className="space-y-12">
            
            {/* Milestone Selectors Grid */}
            <div className="relative border-b-2 border-[#E8E8E5] pb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {timelineMilestones.map((item, idx) => {
                const isActive = activeTimelineIdx === idx;
                return (
                  <div
                    key={item.year}
                    onMouseEnter={() => setActiveTimelineIdx(idx)}
                    onClick={() => setActiveTimelineIdx(idx)}
                    className="relative cursor-pointer group space-y-4"
                  >
                    {/* Engineering Line Indicator */}
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-[#171717] w-full"
                          : "bg-[#D4D4CE] w-12 group-hover:w-24 group-hover:bg-[#171717]/60"
                      }`}
                    />

                    {/* Label & Year */}
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`text-5xl sm:text-7xl font-bold font-mono transition-all duration-300 ${
                          isActive
                            ? "text-[#171717] scale-105"
                            : "text-[#171717]/30 group-hover:text-[#171717]/70"
                        }`}
                      >
                        {item.year}
                      </span>
                      <span className="text-[10px] font-mono text-[#6B6B6B] uppercase border border-[#E8E8E5] px-2.5 py-0.5 rounded bg-white">
                        {item.label}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#171717] group-hover:text-black">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-wider">
                      {item.category}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Active Milestone Card */}
            {timelineMilestones[activeTimelineIdx] && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8E8E5] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 animate-fade-in">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold bg-[#171717] text-white px-3 py-1 rounded-full">
                      {timelineMilestones[activeTimelineIdx].label}
                    </span>
                    <span className="text-xs font-mono text-[#6B6B6B] uppercase">
                      {timelineMilestones[activeTimelineIdx].category}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#171717]">
                    {timelineMilestones[activeTimelineIdx].name}
                  </h4>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-3xl">
                    {timelineMilestones[activeTimelineIdx].details}
                  </p>
                </div>

                <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#E8E8E5]">
                  <div className="w-16 h-16 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] flex items-center justify-center text-[#171717] font-bold font-mono text-xl">
                    {timelineMilestones[activeTimelineIdx].year}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 04 — WHAT WE DO (OUR APPROACH) */}
      <section className="py-24 md:py-36 bg-[#181818] text-white border-b border-[#2A2A28] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-arch-grid-dark" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/60 block mb-3">
                04 / OUR APPROACH
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                FROM CONCEPT <br />
                <span className="italic font-serif font-normal text-white/70">TO REALITY.</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-white/80 max-w-md leading-relaxed font-normal">
              A conceptual 5-step integration linking architectural design, structural engineering, government approvals, project consultancy, and project realization.
            </p>
          </div>

          {/* Visual Approach Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: "01", title: "ARCHITECTURE", desc: "Master planning, CAD layout & 3D spatial design", icon: Compass },
              { num: "02", title: "ENGINEERING", desc: "Structural calculations & civil engineering specifications", icon: Layers },
              { num: "03", title: "APPROVALS", desc: "Statutory file preparation for MIDC, MPCB, DISH, PMRDA", icon: ShieldCheck },
              { num: "04", title: "CONSULTANCY", desc: "PMC, quantity surveying & site quality control", icon: CheckCircle2 },
              { num: "05", title: "REALIZATION", desc: "Final site execution & operational facility handover", icon: ArrowRight },
            ].map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-[#262624] p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-56 space-y-4 hover:border-white/30 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">STAGE {step.num}</span>
                    <IconComp className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-sm font-mono font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">{step.desc}</p>
                  </div>

                  {idx < 4 && (
                    <div className="hidden lg:block text-right">
                      <span className="text-[10px] font-mono text-white/30">→ NEXT STAGE</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 05 — OUR CAPABILITIES */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              05 / OUR CAPABILITIES
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              VERIFIED SERVICE INDEX
            </span>
          </div>

          {/* Section Header */}
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              OUR CAPABILITIES
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 leading-relaxed">
              Explore the 8 core capabilities of Korals Design Private Limited across Maharashtra.
            </p>
          </div>

          {/* DESKTOP INTERACTIVE CAPABILITY INDEX */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Capabilities Selector List (6 cols) */}
            <div className="lg:col-span-6 space-y-2">
              {capabilities.map((cap, idx) => {
                const isSelected = activeCapabilityIdx === idx;
                return (
                  <button
                    key={cap.num}
                    onClick={() => setActiveCapabilityIdx(idx)}
                    onMouseEnter={() => setActiveCapabilityIdx(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#171717] text-white border-[#171717] shadow-lg translate-x-1"
                        : "bg-[#F7F7F5] text-[#171717] border-[#E8E8E5] hover:border-[#171717]/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono font-bold ${isSelected ? "text-white/60" : "text-[#90908C]"}`}>
                        {cap.num}
                      </span>
                      <h3 className="text-sm font-bold tracking-tight">{cap.title}</h3>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#90908C]"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Capability Detail Display (6 cols) */}
            {capabilities[activeCapabilityIdx] && (
              <div className="lg:col-span-6 bg-[#F7F7F5] rounded-3xl p-8 md:p-12 border border-[#E8E8E5] shadow-xs flex flex-col justify-between space-y-8 animate-fade-in min-h-[420px]">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
                    <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                      CAPABILITY {capabilities[activeCapabilityIdx].num} / 08
                    </span>
                    <span className="text-[11px] font-mono bg-white px-3 py-1 rounded-full border border-[#E8E8E5] text-[#171717]">
                      PRACTICE SCOPE
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-[#171717] tracking-tight">
                    {capabilities[activeCapabilityIdx].title}
                  </h3>

                  <p className="text-base text-[#6B6B6B] leading-relaxed">
                    {capabilities[activeCapabilityIdx].desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E8E8E5] flex items-center justify-between">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
                  >
                    <span>EXPLORE ALL SERVICES →</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE ACCORDION STACKED PRESENTATION */}
          <div className="lg:hidden space-y-3">
            {capabilities.map((cap, idx) => {
              const isOpen = openMobileCapIdx === idx;
              return (
                <div
                  key={cap.num}
                  className="bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenMobileCapIdx(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between font-bold text-sm text-[#171717]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#6B6B6B]">{cap.num}</span>
                      <span>{cap.title}</span>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-2 border-t border-[#E8E8E5] bg-white animate-fade-in space-y-3">
                      <p className="text-xs text-[#6B6B6B] leading-relaxed pt-1">
                        {cap.desc}
                      </p>
                      <Link
                        href="/services"
                        className="inline-block text-xs font-mono font-bold uppercase text-[#171717] underline"
                      >
                        EXPLORE SERVICES →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 06 — LEADERSHIP */}
      <section className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              06 / LEADERSHIP
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              BOARD OF DIRECTORS
            </span>
          </div>

          {/* Section Header */}
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block mb-2">
              PRACTICE GOVERNANCE
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              THE PEOPLE BEHIND THE PRACTICE.
            </h2>
          </div>

          {/* Editorial Typographic Leadership Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white p-8 md:p-12 rounded-3xl border border-[#E8E8E5] shadow-lg space-y-6 flex flex-col justify-between hover:border-[#171717]/40 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F7F7F5] pb-4">
                    <span className="text-xs font-mono font-bold text-[#6B6B6B]">DIRECTOR</span>
                    <span className="text-[10px] font-mono bg-[#F7F7F5] px-3 py-1 rounded-full text-[#171717] border border-[#E8E8E5]">
                      KORALS DESIGN PVT LTD
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#171717] uppercase group-hover:translate-x-1 transition-transform">
                    {leader.name}
                  </h3>

                  <div className="w-16 h-1 bg-[#171717] rounded-full" />

                  <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-wider font-bold">
                    {leader.role}
                  </p>

                  {leader.bio && (
                    <p className="text-sm text-[#6B6B6B] leading-relaxed pt-2">
                      {leader.bio}
                    </p>
                  )}
                </div>

                <div className="pt-6 border-t border-[#E8E8E5] flex items-center justify-between text-xs font-mono text-[#171717]">
                  <span>PUNE HEADQUARTERS</span>
                  <span className="font-bold">VERIFIED DIRECTOR</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 07 — ARCHITECTURE + ENGINEERING */}
      <section className="py-24 md:py-36 bg-[#181818] text-white border-b border-[#2A2A28] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-arch-grid-dark" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
              SYNERGY OF DISCIPLINES
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              WHERE DESIGN MEETS <br />
              <span className="italic font-serif font-normal text-white/80">ENGINEERING.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
              We bring architectural planning, engineering understanding and project consultancy together to approach complex development requirements with clarity and precision.
            </p>
          </div>

          {/* Split Screen Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Architecture (5 cols) */}
            <div className="lg:col-span-5 bg-[#262624] p-8 md:p-10 rounded-3xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold block">01 / DESIGN VISION</span>
              <h3 className="text-3xl font-extrabold text-white">ARCHITECTURE</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Master planning, spatial aesthetics, process plant layouts, corporate interiors, and 3D visual walkthroughs.
              </p>
            </div>

            {/* Center Plus Sign (2 cols) */}
            <div className="lg:col-span-2 text-center py-4 lg:py-0">
              <div className="w-16 h-16 rounded-full bg-white text-[#171717] font-black text-3xl flex items-center justify-center mx-auto shadow-2xl">
                +
              </div>
            </div>

            {/* Right: Engineering (5 cols) */}
            <div className="lg:col-span-5 bg-[#262624] p-8 md:p-10 rounded-3xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold block">02 / TECHNICAL RIGOR</span>
              <h3 className="text-3xl font-extrabold text-white">ENGINEERING</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Structural calculations, PMC site supervision, ground survey accuracy, and statutory approvals liaison (MIDC, MPCB, DISH).
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 08 — OUR PROJECT PERSPECTIVE */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              07 / SELECTED WORK
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              VERIFIED PORTFOLIO
            </span>
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
                IDEAS TAKE FORM.
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 max-w-xl leading-relaxed">
                A selection of industrial manufacturing plants, corporate campuses, and civil infrastructure projects.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
            >
              <span>VIEW ALL PROJECTS →</span>
            </Link>
          </div>

          {/* Verified Project Cards Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {verifiedProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#F7F7F5] rounded-3xl border border-[#E8E8E5] overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[16/10] w-full bg-[#181818] overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono bg-white px-2.5 py-1 rounded border border-[#E8E8E5] text-[#171717]">
                    {proj.type}
                  </span>
                  <h3 className="text-xl font-bold text-[#171717]">{proj.name}</h3>
                  <p className="text-xs text-[#6B6B6B] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                    <span>{proj.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 09 — PUNE / INDIA LOCATION */}
      <section className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              08 / BASED IN PUNE
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              PARVATI / PUNE / INDIA
            </span>
          </div>

          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
                REGISTERED HEADQUARTERS
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
                PUNE / INDIA <br />
                <span className="italic font-serif font-normal text-[#6B6B6B]">PRACTICE HEADQUARTERS.</span>
              </h2>
            </div>

            <div className="lg:col-span-5 text-xs font-mono text-[#6B6B6B] space-y-2 border-t lg:border-t-0 lg:border-l border-[#E8E8E5] pt-4 lg:pt-0 lg:pl-8">
              <p className="font-bold text-[#171717] uppercase">KORALS DESIGN PRIVATE LIMITED</p>
              <p>201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune - 411030</p>
              <p>Telephone: +020 - 24324648 | Mobile: +91 9822864648</p>
            </div>
          </div>

          {/* Main Location Card */}
          <div className="bg-white rounded-3xl border border-[#E8E8E5] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Info Column (5 cols) */}
            <div className="lg:col-span-5 p-8 md:p-12 bg-[#181818] text-white flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono uppercase border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  PARVATI OFFICE
                </span>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{siteSettings.company_name}</h3>
                  <p className="text-xs font-mono text-white/60 mb-4">{siteSettings.legal_name}</p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {siteSettings.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/15 space-y-2 text-xs font-mono text-white/90">
                  <a href="tel:+02024324648" className="hover:underline flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Office: {siteSettings.phone}</span>
                  </a>
                  <a href="tel:+919822864648" className="hover:underline flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mobile: {siteSettings.mobile}</span>
                  </a>
                  <a href={`mailto:${siteSettings.email}`} className="hover:underline flex items-center gap-2 text-white">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{siteSettings.email}</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15">
                <a
                  href={siteSettings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-white text-[#171717] font-semibold text-xs font-mono uppercase flex items-center justify-center gap-2 hover:bg-white/90 transition-all shadow-md group"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Graphic Graphic Map Display (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] bg-[#181818] overflow-hidden flex items-center justify-center group">
              <Image
                src="/images/architecture_exterior_1.jpg"
                alt="Korals Design Office Location"
                fill
                className="object-cover brightness-[0.5] scale-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-arch-grid-dark opacity-30 pointer-events-none" />

              <div className="relative z-10 text-center p-8 max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#171717] text-white flex items-center justify-center mx-auto shadow-xl">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block mb-1">
                    REGISTERED OFFICE LOCATION
                  </span>
                  <h4 className="font-bold text-[#171717] text-base">Parvati, Pune Headquarters</h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed mt-1 font-sans">
                    201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune - 411030
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 10 — CLOSING STATEMENT */}
      <section className="py-24 md:py-36 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              09 / WHAT&apos;S NEXT
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              START A CONVERSATION
            </span>
          </div>

          <div className="bg-[#181818] text-white rounded-3xl p-8 sm:p-14 md:p-20 relative overflow-hidden shadow-2xl border border-[#2A2A28]">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 max-w-3xl space-y-8">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
                KORALS DESIGN PVT LTD
              </span>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02]">
                LET&apos;S BUILD <br />
                <span className="italic font-serif font-normal text-white/80">WHAT&apos;S NEXT.</span>
              </h2>

              <p className="text-base sm:text-xl text-white/80 font-normal leading-relaxed">
                Have a project, development requirement or consultancy need? Let&apos;s start a conversation.
              </p>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-9 py-4 rounded-full hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl"
                >
                  <span>START A CONVERSATION →</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
