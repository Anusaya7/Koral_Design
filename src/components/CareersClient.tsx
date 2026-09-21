"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  X,
  Send,
} from "lucide-react";

interface CareerItem {
  id: number;
  title: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  application_email: string;
  display_order?: number;
  is_published?: number;
}

interface CareersClientProps {
  initialCareers?: CareerItem[];
}

export default function CareersClient({ initialCareers = [] }: CareersClientProps) {
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);
  const [applicationSent, setApplicationSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    portfolioUrl: "",
    coverNote: "",
  });

  const siteSettings = {
    company_name: "KORALS DESIGN PVT LTD",
    legal_name: "Korals Design Private Limited",
    address: "201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030",
    phone: "+020 - 24324648",
    mobile: "+91 9822864648",
    email: "projects@koralsdesign.com",
    google_maps_url: "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9?g_st=ac",
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career_id: selectedJob.id,
          applicant_name: formData.applicantName,
          applicant_email: formData.applicantEmail,
          applicant_phone: formData.applicantPhone,
          portfolio_url: formData.portfolioUrl || null,
          cover_note: formData.coverNote || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setApplicationSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error submitting application. Please try again or email us directly.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F7F7F5] text-[#171717] selection:bg-[#171717] selection:text-white overflow-x-hidden">
      
      {/* SECTION 01 — CINEMATIC CAREERS HERO */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28 bg-[#181818] text-white border-b border-[#2A2A28] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-arch-grid-dark" />

        {/* Hero Background Image Crop */}
        <div className="absolute inset-0 w-full h-full opacity-35 select-none pointer-events-none">
          <Image
            src="/images/hero_villa_render.jpg"
            alt="Korals Design Careers Practice Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#181818]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
          
          {/* Section Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              01 / CAREERS AT KORALS DESIGN
            </span>
          </div>

          {/* Technical Metadata Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-[10px] font-mono text-white/70 uppercase">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">KD / CAREERS</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">PUNE / INDIA</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">ARCHITECTURE + ENGINEERING</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold text-white tracking-[-0.04em] leading-[0.98] max-w-5xl mb-6">
            BUILD YOUR <br />
            <span className="text-white/80 font-normal italic font-serif">NEXT CHAPTER.</span>
          </h1>

          <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-white/70 block mb-6 max-w-3xl">
            WORKING AT THE INTERSECTION OF ARCHITECTURE, ENGINEERING &amp; PROJECT CONSULTANCY.
          </span>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl font-normal leading-relaxed mb-12">
            Explore opportunities to contribute to projects that bring design, engineering and practical project requirements together.
          </p>

          {/* Scroll CTA */}
          <a
            href="#open-positions"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-white/80 hover:text-white uppercase px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 animate-bounce"
          >
            <span>VIEW OPENINGS ↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 02 — THE PRACTICE */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              02 / THE PRACTICE
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              PRACTICE ENVIRONMENT &amp; METHODOLOGY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
                INTEGRATED PROFESSIONAL DISCIPLINE
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-[#171717] tracking-tight leading-[1.02]">
                WHERE DESIGN <br />
                <span className="text-[#6B6B6B]">MEETS REAL-WORLD</span> <br />
                <span className="italic font-serif font-normal text-[#171717]">REQUIREMENTS.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-[#E8E8E5] pt-8 lg:pt-0 lg:pl-12 space-y-6 text-sm text-[#171717] leading-relaxed">
              <p className="text-base font-medium text-[#171717]">
                Korals Design Private Limited is an integrated architecture, civil engineering, land surveying, and project management consultancy headquartered in Pune, Maharashtra.
              </p>

              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                Our team works across industrial manufacturing plants, corporate headquarters, commercial developments, and municipal civil infrastructure. Professionals at Korals Design collaborate on architectural CAD modeling, structural PMC supervision, land revenue demarcation, and statutory clearance procedures with MIDC, MPCB, DISH, PMRDA, PMC, and PCMC.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 03 — CAREER JOURNEY PHILOSOPHY */}
      <section className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
              PRACTICE PHILOSOPHY
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717]">
              IDEAS. KNOWLEDGE. RESPONSIBILITY.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E8E5] shadow-xs space-y-4">
              <span className="text-xs font-mono font-bold bg-[#171717] text-white px-3 py-1 rounded-full inline-block">
                01 — LEARN
              </span>
              <h3 className="text-xl font-bold text-[#171717]">Technical Exposure</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Gain real-world exposure to complex industrial architectural requirements, structural civil engineering, and government liaison systems across Maharashtra.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8E8E5] shadow-xs space-y-4">
              <span className="text-xs font-mono font-bold bg-[#171717] text-white px-3 py-1 rounded-full inline-block">
                02 — CONTRIBUTE
              </span>
              <h3 className="text-xl font-bold text-[#171717]">Project Contribution</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Work as an integral part of project design, land survey demarcation, PMC site management, and statutory department coordination workflows.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8E8E5] shadow-xs space-y-4">
              <span className="text-xs font-mono font-bold bg-[#171717] text-white px-3 py-1 rounded-full inline-block">
                03 — GROW
              </span>
              <h3 className="text-xl font-bold text-[#171717]">Professional Responsibility</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Develop career experience through site responsibility, technical quality audits, client liaison, and structural project execution.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 04 — PRACTICE EVOLUTION TIMELINE */}
      <section className="py-24 md:py-36 bg-[#181818] text-white border-b border-[#2A2A28]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              PRACTICE EVOLUTION
            </span>
            <span className="text-xs font-mono text-white/50">EST. 2005</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              A PRACTICE THAT HAS EVOLVED.
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-mono">
              Over two decades of verified organizational growth in Pune, Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/15 pt-8">
            <div className="space-y-3">
              <span className="text-5xl font-mono font-bold text-white">2005</span>
              <h3 className="text-base font-bold text-white">Pensioners Land Surveyors Associates</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Established precision land survey, contour mapping, and revenue Mojani demarcation consultancy.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-5xl font-mono font-bold text-white">2013</span>
              <h3 className="text-base font-bold text-white">Korals Engineering Solutions Pvt Ltd</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Expanded operations across Special Economic Zones (SEZs), heavy industrial manufacturing plants, and civil infrastructure.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-5xl font-mono font-bold text-white">2020</span>
              <h3 className="text-base font-bold text-white">Korals Design Pvt Ltd</h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Incorporated single-window architectural, PMC, statutory clearance, and 3D visualization practice.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 05 — OPEN POSITIONS (MAIN FUNCTIONAL SECTION) */}
      <section id="open-positions" className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              03 / OPEN POSITIONS
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              VERIFIED OPPORTUNITIES
            </span>
          </div>

          {/* Section Header */}
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              FIND YOUR PLACE IN THE PRACTICE.
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 leading-relaxed">
              Explore open vacancies published directly by Korals Design Private Limited management.
            </p>
          </div>

          {/* EDITORIAL JOB DIRECTORY LIST */}
          {initialCareers.length === 0 ? (
            <div className="bg-[#F7F7F5] rounded-3xl p-12 border border-[#E8E8E5] text-center space-y-4">
              <Briefcase className="w-10 h-10 text-[#6B6B6B] mx-auto" />
              <h3 className="text-xl font-bold text-[#171717]">No Published Vacancies Currently</h3>
              <p className="text-xs font-mono text-[#6B6B6B] max-w-md mx-auto">
                We currently have no open job postings published. Please check back for future opportunities or connect directly with our Pune office.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {initialCareers.map((job, idx) => {
                const jobNum = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
                const reqs = job.requirements ? job.requirements.split(";") : [];

                return (
                  <div
                    key={job.id}
                    className="bg-[#F7F7F5] rounded-3xl border border-[#E8E8E5] p-6 sm:p-10 transition-all duration-300 hover:shadow-xl hover:border-[#171717]/40 group flex flex-col lg:flex-row lg:items-center justify-between gap-8"
                  >
                    {/* Job Information */}
                    <div className="space-y-4 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono font-bold text-[#171717]">
                          JOB {jobNum}
                        </span>
                        <span className="bg-[#171717] text-white px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase">
                          {job.employment_type}
                        </span>
                        <span className="text-xs font-mono text-[#6B6B6B] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                          {job.location}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight group-hover:translate-x-1 transition-transform">
                        {job.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed max-w-3xl">
                        {job.description}
                      </p>

                      {reqs.length > 0 && (
                        <div className="pt-2 space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#171717] font-bold block">
                            Key Requirements:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#171717]">
                            {reqs.slice(0, 4).map((r, rIdx) => (
                              <div key={rIdx} className="flex items-center gap-2 text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{r.trim()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E8E5] flex flex-col items-start lg:items-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setApplicationSent(false);
                        }}
                        className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-8 py-4 rounded-full hover:bg-[#2A2A28] transition-all shadow-md group-hover:scale-[1.02]"
                      >
                        <span>APPLY FOR POSITION</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/careers/${job.id}`}
                        className="text-[11px] font-mono text-[#6B6B6B] hover:text-[#171717] underline"
                      >
                        View Full Job Detail →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* SECTION 06 — THE WORK (CAREERS + REAL PROJECTS) */}
      <section className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E8E5] pb-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase block mb-1">
                04 / THE WORK
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#171717]">
                WORK THAT BECOMES PART OF THE BUILT WORLD.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
            >
              <span>EXPLORE PROJECTS →</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#E8E8E5] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#181818]">
              <Image src="/images/alfa_laval_facility.png" alt="Alfa Laval Industrial Facility" fill className="object-cover" />
            </div>

            <div className="lg:col-span-5 space-y-4 font-mono">
              <span className="text-xs text-[#6B6B6B] uppercase">REAL BUILT ENVIRONMENT PRACTICE</span>
              <h3 className="text-3xl font-bold text-[#171717]">ALFA LAVAL INDIA LTD</h3>
              <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed">
                Industrial manufacturing campus involving architectural layout design, structural PMC, and statutory MIDC sanctions (12,274 Sq.M.).
              </p>
              <div className="pt-4 border-t border-[#E8E8E5]">
                <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-[#171717] uppercase">
                  <span>EXPLORE PROJECT PORTFOLIO →</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 07 — PROFESSIONAL DISCIPLINES INDEX */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
              PRACTICE SCOPE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#171717]">
              PRACTICE DISCIPLINES
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            {[
              "ARCHITECTURE",
              "ENGINEERING",
              "PROJECT MANAGEMENT (PMC)",
              "LAND SURVEY",
              "PROJECT CONSULTANCY",
              "INDUSTRIAL PLANNING",
              "CORPORATE INTERIORS",
              "3D VISUALIZATION",
            ].map((disc, idx) => (
              <div key={idx} className="bg-[#F7F7F5] p-5 rounded-2xl border border-[#E8E8E5] space-y-1">
                <span className="text-[10px] text-[#6B6B6B] uppercase block">DISCIPLINE 0{idx + 1}</span>
                <span className="font-bold text-[#171717] block">{disc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 08 — LEADERSHIP CONTEXT */}
      <section className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              05 / LEADERSHIP
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              PRACTICE GOVERNANCE
            </span>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              BOARD OF DIRECTORS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E8E8E5] shadow-lg space-y-4 font-mono">
              <span className="text-xs text-[#6B6B6B] block">DIRECTOR</span>
              <h3 className="text-3xl font-extrabold text-[#171717]">MAHESH GOVARDHAN</h3>
              <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed">
                Directs architectural planning, statutory authority coordination, and strategic practice operations.
              </p>
              <span className="text-[10px] text-[#171717] font-bold block pt-4 border-t border-[#E8E8E5]">KORALS DESIGN PVT LTD</span>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E8E8E5] shadow-lg space-y-4 font-mono">
              <span className="text-xs text-[#6B6B6B] block">DIRECTOR</span>
              <h3 className="text-3xl font-extrabold text-[#171717]">UDAY HONAP</h3>
              <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed">
                Leads civil engineering project management, structural quality assurance, and PMC site operations.
              </p>
              <span className="text-[10px] text-[#171717] font-bold block pt-4 border-t border-[#E8E8E5]">KORALS DESIGN PVT LTD</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 09 — PUNE / INDIA LOCATION */}
      <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              06 / PUNE — INDIA
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              HEADQUARTERS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
                BASED IN PUNE.
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                Our registered headquarters is located at Parvati, Pune, Maharashtra.
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

      {/* SECTION 11 — FINAL CAREERS STATEMENT */}
      <section className="py-24 md:py-36 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#181818] text-white rounded-3xl p-8 sm:p-14 md:p-20 relative overflow-hidden shadow-2xl border border-[#2A2A28]">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 max-w-3xl space-y-8">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
                KORALS DESIGN PVT LTD
              </span>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02]">
                YOUR NEXT <br />
                <span className="italic font-serif font-normal text-white/80">CHAPTER STARTS HERE.</span>
              </h2>

              <p className="text-base sm:text-xl text-white/80 font-normal leading-relaxed">
                Explore current opportunities and discover where your skills can contribute to the work of Korals Design.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a
                  href="#open-positions"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-9 py-4 rounded-full hover:bg-white/90 transition-all shadow-xl"
                >
                  <span>VIEW OPENINGS →</span>
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all"
                >
                  <span>CONTACT KORALS DESIGN →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION DRAWER / MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="absolute inset-0" onClick={() => setSelectedJob(null)} />
          
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E8E8E5] p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B6B6B] block">JOB APPLICATION</span>
                <h3 className="text-xl font-bold text-[#171717]">{selectedJob.title}</h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-9 h-9 rounded-full bg-[#F7F7F5] border border-[#E8E8E5] flex items-center justify-center text-[#171717] hover:bg-[#E8E8E5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applicationSent ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-bold text-[#171717]">Application Received</h4>
                <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-md mx-auto font-sans">
                  Thank you, <strong>{formData.applicantName}</strong>. Your application for <strong>{selectedJob.title}</strong> has been logged in our internal recruitment system.
                </p>
                <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5] text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                  <p className="text-[#171717] font-bold">Have a detailed CV or drawings portfolio?</p>
                  <p className="text-[#6B6B6B]">
                    You may optionally email your PDF portfolio directly to{" "}
                    <a
                      href={`mailto:${selectedJob.application_email || siteSettings.email}?subject=${encodeURIComponent(`Portfolio Attachment — ${formData.applicantName} (${selectedJob.title})`)}`}
                      className="text-[#171717] font-bold underline"
                    >
                      {selectedJob.application_email || siteSettings.email}
                    </a>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setFormData({ applicantName: "", applicantEmail: "", applicantPhone: "", portfolioUrl: "", coverNote: "" });
                  }}
                  className="px-8 py-3 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all"
                >
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {submitError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#171717] uppercase block">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    className="w-full bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-[#171717] uppercase block">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                      className="w-full bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-[#171717] uppercase block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.applicantPhone}
                      onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                      className="w-full bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#171717] uppercase block">Portfolio / LinkedIn Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#171717] uppercase block">Cover Note / Qualifications</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly introduce your qualifications, software skills (AutoCAD, Revit, Staad.Pro), and relevant experience..."
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    className="w-full bg-[#F7F7F5] border border-[#E8E8E5] rounded-xl px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#E8E8E5] text-[11px] font-mono text-[#6B6B6B]">
                  Your application will be directly forwarded to the Korals Design talent review desk.
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-full border border-[#E8E8E5] text-xs font-mono font-bold uppercase text-[#6B6B6B] hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-7 py-2.5 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase flex items-center gap-2 hover:bg-[#2A2A28] transition-all shadow-md disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? "Submitting..." : "Submit Application"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
