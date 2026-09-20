"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ServiceItem {
  id: number;
  service_number: string;
  title: string;
  slug?: string;
  short_description: string;
  full_description: string;
  bullet_points: string;
  image: string;
  icon: string;
  cta_label?: string;
  cta_link?: string;
  display_order: number;
  is_published: number;
}



export default function ServicesClient() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openMobileId, setOpenMobileId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
          setSelectedId(data[0].id);
          setOpenMobileId(data[0].id);
        }
      })
      .catch((err) => console.error("Failed to load services:", err))
      .finally(() => setLoading(false));
  }, []);

  const activeService = services.find((s) => s.id === selectedId) || services[0];

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
    <div className="w-full bg-[#F7F7F5] text-[#171717] selection:bg-[#171717] selection:text-white overflow-x-hidden">
      
      {/* SECTION 01 — CINEMATIC SERVICES HERO */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28 bg-[#181818] text-white border-b border-[#2A2A28] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-arch-grid-dark" />

        {/* Hero Background Image Crop */}
        <div className="absolute inset-0 w-full h-full opacity-35 select-none pointer-events-none">
          <Image
            src="/images/hero_villa_render.jpg"
            alt="Korals Design Services Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#181818]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
          
          {/* Technical Section Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              01 / OUR SERVICES
            </span>
          </div>

          {/* Technical Metadata Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-[10px] font-mono text-white/70 uppercase">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">KD / SERVICES</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">PUNE / INDIA</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">ARCHITECTURE + ENGINEERING</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold text-white tracking-[-0.04em] leading-[0.98] max-w-5xl mb-6">
            FROM IDEA <br />
            TO REALITY.
          </h1>

          <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-white/70 block mb-6">
            ARCHITECTURE • ENGINEERING • CONSULTANCY
          </span>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-normal leading-relaxed mb-12">
            Integrated architectural, engineering and project consultancy services for industrial, commercial and institutional developments.
          </p>

          {/* Scroll CTA */}
          <a
            href="#services-index"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-white/80 hover:text-white uppercase px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 animate-bounce"
          >
            <span>EXPLORE SERVICES ↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 02 — SERVICES PHILOSOPHY */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              02 / OUR APPROACH
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              INTEGRATED PRACTICE SYSTEM
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
                SINGLE-WINDOW CONSULTANCY
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-[#171717] tracking-tight leading-[1.02]">
                ONE PROJECT. <br />
                <span className="text-[#6B6B6B]">MANY LAYERS.</span> <br />
                <span className="italic font-serif font-normal text-[#171717]">ONE INTEGRATED APPROACH.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-[#E8E8E5] pt-8 lg:pt-0 lg:pl-12 space-y-6 text-sm text-[#171717] leading-relaxed">
              <p className="text-base font-medium text-[#171717]">
                At Korals Design Private Limited, we bridge the gap between spatial design vision, structural civil engineering, ground truth land surveying, statutory government clearances, and project execution management.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-[#E8E8E5]">
                <div className="space-y-1">
                  <span className="font-bold block uppercase text-[#171717]">01 DESIGN</span>
                  <span className="text-[#6B6B6B]">Master Planning &amp; CAD</span>
                </div>
                <div className="space-y-1">
                  <span className="font-bold block uppercase text-[#171717]">02 ENGINEERING</span>
                  <span className="text-[#6B6B6B]">Structural &amp; Civil PMC</span>
                </div>
                <div className="space-y-1">
                  <span className="font-bold block uppercase text-[#171717]">03 APPROVALS</span>
                  <span className="text-[#6B6B6B]">MIDC, MPCB, DISH Liaison</span>
                </div>
                <div className="space-y-1">
                  <span className="font-bold block uppercase text-[#171717]">04 CONSULTANCY</span>
                  <span className="text-[#6B6B6B]">Works Supervision &amp; Audit</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 03 — SIGNATURE SERVICE INDEX (MAIN VISUAL FEATURE) */}
      <section id="services-index" className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              03 / SIGNATURE SERVICE INDEX
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              VERIFIED PRACTICE CAPABILITIES
            </span>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              OUR CAPABILITIES
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 leading-relaxed">
              Explore the 8 core services offered by Korals Design Private Limited across Maharashtra.
            </p>
          </div>

          {loading ? (
            <div className="h-96 bg-white rounded-3xl animate-pulse border border-[#E8E8E5]" />
          ) : (
            <>
              {/* DESKTOP INTERACTIVE SPLIT SERVICE INDEX */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Stacked Service List (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  {services.map((item) => {
                    const isSelected = selectedId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        onMouseEnter={() => setSelectedId(item.id)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                          isSelected
                            ? "bg-[#171717] text-white border-[#171717] shadow-xl translate-x-1"
                            : "bg-white text-[#171717] border-[#E8E8E5] hover:border-[#171717]/40"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-xs font-mono font-bold ${
                              isSelected ? "text-white/60" : "text-[#90908C]"
                            }`}
                          >
                            0{item.service_number}
                          </span>
                          <h3 className="text-sm font-bold tracking-tight">{item.title}</h3>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected
                              ? "text-white translate-x-1"
                              : "text-[#90908C] group-hover:translate-x-1 group-hover:text-[#171717]"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right Dynamic Visual & Content Display Panel (7 cols) */}
                {activeService && (
                  <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-[#E8E8E5] shadow-xl flex flex-col justify-between space-y-8 animate-fade-in min-h-[500px]">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#F7F7F5] pb-4">
                        <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                          SERVICE 0{activeService.service_number} / 08
                        </span>
                        <span className="text-[11px] font-mono bg-[#F7F7F5] px-3 py-1 rounded-full border border-[#E8E8E5] text-[#171717]">
                          PRACTICE AREA
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                        {activeService.title}
                      </h3>

                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        {activeService.full_description || activeService.short_description}
                      </p>

                      {activeService.bullet_points && (
                        <div className="pt-4 border-t border-[#E8E8E5] space-y-3">
                          <span className="text-xs font-mono font-semibold text-[#171717] uppercase block">
                            Key Capabilities &amp; Deliverables:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#171717]">
                            {activeService.bullet_points.split(",").map((bullet, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{bullet.trim()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#181818] border border-[#E8E8E5]">
                      <Image
                        src={activeService.image || "/images/architecture_exterior_1.jpg"}
                        alt={activeService.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                      <Link
                        href={activeService.slug ? `/services/${activeService.slug}` : `/services/${activeService.id}`}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
                      >
                        <span>EXPLORE FULL SERVICE SPECIFICATIONS →</span>
                      </Link>
                    </div>
                  </div>
                )}

              </div>

              {/* MOBILE STACKED ACCORDION */}
              <div className="lg:hidden space-y-4">
                {services.map((item) => {
                  const isOpen = openMobileId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => setOpenMobileId(isOpen ? null : item.id)}
                        className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-[#171717]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-[#6B6B6B]">0{item.service_number}</span>
                          <span>{item.title}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 pt-2 space-y-4 border-t border-[#E8E8E5] bg-[#F7F7F5] animate-fade-in">
                          <p className="text-xs text-[#6B6B6B] leading-relaxed pt-2">
                            {item.short_description}
                          </p>
                          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#181818]">
                            <Image
                              src={item.image || "/images/architecture_exterior_1.jpg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Link
                            href={item.slug ? `/services/${item.slug}` : `/services/${item.id}`}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#171717] underline pt-2"
                          >
                            <span>EXPLORE SERVICE →</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </section>

      {/* SECTION 04 — ARCHITECTURE */}
      <section className="py-24 md:py-36 bg-[#181818] text-white border-b border-[#2A2A28] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-arch-grid-dark" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              03 / ARCHITECTURE
            </span>
            <span className="text-xs font-mono text-white/50">SPATIAL &amp; MASTER PLANNING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.02]">
                DESIGNING THE <br />
                SPACE BETWEEN <br />
                <span className="italic font-serif font-normal text-white/80">IDEA AND REALITY.</span>
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Industrial master planning, process flow architecture, commercial developments, and 3D visual walkthroughs engineered with spatial clarity.
              </p>

              <div className="pt-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-8 py-4 rounded-full hover:bg-white/90 transition-all shadow-xl"
                >
                  <span>EXPLORE ARCHITECTURAL PROJECTS →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-[#262624] border border-white/15 shadow-2xl group">
              <Image
                src="/images/hero_villa_render.jpg"
                alt="Korals Design Architecture Feature"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — ENGINEERING + INDUSTRIAL PLANNING */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              04 / ENGINEERING
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              CIVIL &amp; INDUSTRIAL RIGOR
            </span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              BUILT AROUND PRECISION.
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Industrial project planning, PMC site supervision, ground survey accuracy, and technical works consultancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Industrial Project Planning", desc: "Heavy manufacturing layout, crane gantry planning, utility grid coordination." },
              { num: "02", title: "Project Works Consultancy", desc: "Structural compliance, quality audits, site supervision, and bill verification." },
              { num: "03", title: "Project Management (PMC)", desc: "End-to-end site management, quantity surveying, contractor tendering." },
              { num: "04", title: "Land Survey & Consultancy", desc: "Precision ground survey, contour mapping, and revenue Mojani demarcation." },
            ].map((card) => (
              <div key={card.num} className="bg-[#F7F7F5] p-8 rounded-3xl border border-[#E8E8E5] space-y-4 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#171717] bg-white px-3 py-1 rounded-full border border-[#E8E8E5] inline-block">
                  {card.num}
                </span>
                <h3 className="text-base font-bold text-[#171717]">{card.title}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 06 — APPROVALS & CONSULTANCY */}
      <section className="py-24 md:py-36 bg-[#181818] text-white border-b border-[#2A2A28]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              05 / CONSULTANCY
            </span>
            <span className="text-xs font-mono text-white/50">STATUTORY DEPARTMENT LIAISON</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.02]">
                NAVIGATING <br />
                PROJECT REQUIREMENTS.
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Coordination and consultancy support for statutory building clearances, environmental consents, and regulatory department documentation across Maharashtra.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#262624] p-8 rounded-3xl border border-white/15 space-y-4">
              <span className="text-xs font-mono text-white/50 uppercase block">RELEVANT AUTHORITIES &amp; FRAMEWORKS</span>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-white">
                {["MIDC", "MPCB", "DISH", "DSLR / SLR", "PMRDA", "PMC", "PCMC"].map((auth) => (
                  <span key={auth} className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20">
                    {auth}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/60 pt-2 border-t border-white/10 font-mono">
                Technical file compilation, department liaison, and compliance tracking.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 07 — VISUALIZATION + INTERIORS */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
              VISUAL &amp; SPATIAL EXPERIENCE
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              SEE THE POSSIBILITY.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#E8E8E5] space-y-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#181818]">
                <Image src="/images/interior_lounge_1.jpg" alt="Corporate Interiors" fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#6B6B6B] uppercase block mb-1">07 / PRACTICE</span>
                <h3 className="text-2xl font-bold text-[#171717]">Corporate Interiors</h3>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                  Executive workplace design, acoustical layout, furniture integration, and interior architectural planning.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#E8E8E5] space-y-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#181818]">
                <Image src="/images/hero_villa_render.jpg" alt="3D Visualization" fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#6B6B6B] uppercase block mb-1">08 / PRACTICE</span>
                <h3 className="text-2xl font-bold text-[#171717]">3D Visualization &amp; Walkthrough</h3>
                <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                  High-definition architectural renderings, 3D walkthroughs, and visual client presentations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 08 — SERVICE JOURNEY */}
      <section className="py-24 md:py-36 bg-[#181818] text-white border-b border-[#2A2A28]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              06 / HOW WE WORK
            </span>
            <span className="text-xs font-mono text-white/50">SERVICE DELIVERY METHODOLOGY</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              FROM REQUIREMENT <br />
              <span className="italic font-serif font-normal text-white/80">TO REALIZATION.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: "01", title: "UNDERSTAND", desc: "Assess project scope, land parameters, and client goals." },
              { num: "02", title: "PLAN", desc: "Develop master layout, site survey, and preliminary CAD." },
              { num: "03", title: "DESIGN", desc: "Refine architectural design, structural concepts, and 3D." },
              { num: "04", title: "COORDINATE", desc: "Technical liaison and statutory file preparation." },
              { num: "05", title: "MANAGE", desc: "PMC site supervision, quality control, and handover." },
            ].map((step) => (
              <div key={step.num} className="bg-[#262624] p-6 rounded-2xl border border-white/10 space-y-3">
                <span className="text-3xl font-mono font-bold text-emerald-400">{step.num}</span>
                <h3 className="font-mono font-bold text-sm text-white">{step.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 09 — SERVICE + PROJECT CONNECTION */}
      <section className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block mb-2">
                SERVICES IN PRACTICE
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
                SERVICES BECOME SPACES.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
            >
              <span>VIEW ALL PROJECTS →</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#E8E8E5] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#181818]">
              <Image src="/images/architecture_exterior_1.jpg" alt="Alfa Laval Facility" fill className="object-cover" />
            </div>

            <div className="lg:col-span-5 space-y-4 font-mono">
              <span className="text-xs text-[#6B6B6B] uppercase">FEATURED CASE STUDY CONNECTION</span>
              <h3 className="text-3xl font-bold text-[#171717]">ALFA LAVAL INDIA LTD</h3>
              <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed">
                Industrial facility involving architectural layout planning, structural PMC supervision, and statutory MIDC approval coordination (12,274 Sq.M.).
              </p>
              <div className="pt-4 border-t border-[#E8E8E5]">
                <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-[#171717] uppercase">
                  <span>EXPLORE PROJECT CASE STUDY →</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 11 — LOCATION */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              07 / PUNE — INDIA
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              REGISTERED HEADQUARTERS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
                ROOTED IN PUNE.
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                Serving industrial, commercial and municipal development clients across Pune and Maharashtra from our Parvati practice headquarters.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#181818] text-white p-8 rounded-3xl space-y-4 font-mono text-xs shadow-xl">
              <p className="font-bold text-emerald-400">KORALS DESIGN PRIVATE LIMITED</p>
              <p className="text-white/80">{siteSettings.address}</p>
              <div className="pt-2 border-t border-white/15 space-y-1">
                <a href="tel:+02024324648" className="block hover:underline">Office: {siteSettings.phone}</a>
                <a href="tel:+919822864648" className="block hover:underline">Mobile: {siteSettings.mobile}</a>
                <a href={`mailto:${siteSettings.email}`} className="block hover:underline text-white font-bold">{siteSettings.email}</a>
              </div>
              <a
                href={siteSettings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-2 text-white font-bold hover:underline"
              >
                <span>OPEN IN GOOGLE MAPS →</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 12 — FINAL CTA */}
      <section className="py-24 md:py-36 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              08 / START A PROJECT
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              KORALS DESIGN CONSULTANCY
            </span>
          </div>

          <div className="bg-[#181818] text-white rounded-3xl p-8 sm:p-14 md:p-20 relative overflow-hidden shadow-2xl border border-[#2A2A28]">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 max-w-3xl space-y-8">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
                KORALS DESIGN PVT LTD
              </span>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02]">
                HAVE A PROJECT <br />
                <span className="italic font-serif font-normal text-white/80">IN MIND?</span>
              </h2>

              <p className="text-base sm:text-xl text-white/80 font-normal leading-relaxed">
                Let&apos;s discuss your architectural, engineering or project consultancy requirements.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-9 py-4 rounded-full hover:bg-white/90 transition-all shadow-xl"
                >
                  <span>START A CONVERSATION →</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all"
                >
                  <span>VIEW OUR PROJECTS →</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
