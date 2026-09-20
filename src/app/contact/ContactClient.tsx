"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  ArrowDown,
  Compass,
} from "lucide-react";

interface SiteSettings {
  company_name: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  career_email: string;
  google_maps_url: string;
}

const PROJECT_TYPES = [
  { id: "ARCHITECTURE", label: "ARCHITECTURE" },
  { id: "INDUSTRIAL", label: "INDUSTRIAL" },
  { id: "COMMERCIAL", label: "COMMERCIAL" },
  { id: "INSTITUTIONAL", label: "INSTITUTIONAL" },
  { id: "INTERIORS", label: "INTERIORS" },
  { id: "CONSULTANCY", label: "CONSULTANCY" },
  { id: "OTHER", label: "OTHER" },
];

const DISCUSS_TOPICS = [
  {
    num: "01",
    title: "ARCHITECTURAL PLANNING & DESIGN",
    desc: "Master planning, conceptual design, structural layout, space utilization, and detailed architectural drawings.",
  },
  {
    num: "02",
    title: "SANCTIONS & STATUTORY APPROVALS",
    desc: "Coordination for MIDC, MPCB, DISH, PMRDA, PMC, PCMC, and DSLR clearances for industrial and commercial facilities.",
  },
  {
    num: "03",
    title: "LAND SURVEY & CONSULTANCY",
    desc: "Topographical surveys, contouring, boundary verification, and government Mojani coordination.",
  },
  {
    num: "04",
    title: "PROJECT MANAGEMENT CONSULTANCY (PMC)",
    desc: "End-to-end execution supervision, quality audit, timeline control, contractor billing, and safety compliance.",
  },
  {
    num: "05",
    title: "PROJECT WORKS CONSULTANCY",
    desc: "Technical site assessment, structural integrity evaluation, material specification, and engineering supervision.",
  },
  {
    num: "06",
    title: "INDUSTRIAL PROJECT PLANNING",
    desc: "Specialized planning for manufacturing plants, warehousing, logistics hubs, and industrial utility integration.",
  },
  {
    num: "07",
    title: "CORPORATE INTERIORS",
    desc: "Executive office design, workspace optimization, interior fit-outs, and MEP coordination.",
  },
  {
    num: "08",
    title: "3D VISUALIZATION & WALKTHROUGH",
    desc: "Photorealistic 3D architectural renders, exterior modeling, spatial animation, and walkthrough presentations.",
  },
];

export default function ContactClient() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    company_name: "KORALS DESIGN PVT LTD",
    address: "201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030",
    phone: "+020 - 24324648",
    mobile: "+91 9822864648",
    email: "projects@koralsdesign.com",
    career_email: "projects@koralsdesign.com",
    google_maps_url: "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    enquiryType: "ARCHITECTURE",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.siteSettings) {
          setSiteSettings((prev) => ({
            ...prev,
            ...data.siteSettings,
          }));
        }
      })
      .catch((err) => console.error("Failed to load live site settings:", err));
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = "Please select a project category.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please describe your project or requirement.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide at least 10 characters detailing your request.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Build concise message incorporating optional company/location if provided
    let fullMessage = formData.message.trim();
    const metaParts = [];
    if (formData.company.trim()) metaParts.push(`Company/Org: ${formData.company.trim()}`);
    if (formData.location.trim()) metaParts.push(`Project Location: ${formData.location.trim()}`);
    if (metaParts.length > 0) {
      fullMessage = `[${metaParts.join(" | ")}]\n\n${fullMessage}`;
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.enquiryType,
          message: fullMessage,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit enquiry. Please try again.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        location: "",
        enquiryType: "ARCHITECTURE",
        message: "",
      });
      setErrors({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cleanPhone = (phoneStr: string) => phoneStr.replace(/[^0-9+]/g, "");

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717] selection:bg-[#171717] selection:text-white">
      <Navbar />

      {/* SECTION 01 — CINEMATIC CONTACT HERO */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-[#181818] text-white overflow-hidden border-b border-[#2A2A28]">
        {/* Architectural Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            {/* Left Col: Hero Typography */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-widest text-[#A1A19D] uppercase">
                  01 / CONTACT
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
                <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PUNE / INDIA
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.95] text-white">
                LET&apos;S BUILD<br />
                <span className="text-white/40 font-light">WHAT&apos;S NEXT.</span>
              </h1>

              <div className="pt-2 max-w-2xl space-y-3">
                <p className="text-lg sm:text-xl font-mono text-white/90 uppercase tracking-tight">
                  START A CONVERSATION ABOUT YOUR NEXT PROJECT.
                </p>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                  Architecture, engineering and project consultancy for developments that require thoughtful planning and technical understanding.
                </p>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-6">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#171717] font-semibold text-xs uppercase tracking-wider hover:bg-white/90 transition-all duration-200 shadow-xl cursor-pointer group"
                >
                  <span>START AN ENQUIRY</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <a
                  href={`tel:${cleanPhone(siteSettings.phone)}`}
                  className="text-xs font-mono tracking-widest text-white/70 hover:text-white transition-colors uppercase flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DIRECT CALL: {siteSettings.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Col: Hero Architectural Image Card */}
            <div className="lg:col-span-4 relative group">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#222]">
                <Image
                  src="/images/hero_villa_render.jpg"
                  alt="Korals Design Architecture Studio"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-white/60 border-b border-white/10 pb-2 uppercase">
                    <span>KORALS DESIGN</span>
                    <span>PUNE</span>
                  </div>
                  <p className="text-xs text-white/90 font-medium">
                    Integrated Architectural &amp; Engineering Consultancy
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 02 — EDITORIAL CONTACT INFORMATION */}
      <section className="py-20 md:py-32 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-xl mb-16">
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-3">
              02 / KORALS DESIGN
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717] uppercase leading-none">
              COME TALK<br />TO US.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* 1. Address */}
            <div className="pt-6 border-t border-[#171717]/20 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  HEADQUARTERS ADDRESS
                </span>
                <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                  REGISTERED OFFICE
                </h3>
                <p className="text-xs text-[#555] leading-relaxed font-normal">
                  <strong className="text-[#171717] font-semibold block mb-1">{siteSettings.company_name}</strong>
                  {siteSettings.address}
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={siteSettings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#171717] group-hover:underline uppercase"
                >
                  <span>MAP LOCATION</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* 2. Office Telephone */}
            <div className="pt-6 border-t border-[#171717]/20 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  TELEPHONE DIRECT
                </span>
                <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                  LANDLINE
                </h3>
                <a
                  href={`tel:${cleanPhone(siteSettings.phone)}`}
                  className="text-lg font-mono font-bold text-[#171717] block hover:text-emerald-700 transition-colors"
                >
                  {siteSettings.phone}
                </a>
                <p className="text-[11px] text-[#6B6B6B]">
                  Monday to Saturday • 9:30 AM to 6:30 PM IST
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={`tel:${cleanPhone(siteSettings.phone)}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#171717] group-hover:underline uppercase"
                >
                  <span>CALL OFFICE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* 3. Mobile Direct */}
            <div className="pt-6 border-t border-[#171717]/20 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  MOBILE / DIRECT
                </span>
                <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                  MOBILE CONTACT
                </h3>
                <a
                  href={`tel:${cleanPhone(siteSettings.mobile)}`}
                  className="text-lg font-mono font-bold text-[#171717] block hover:text-emerald-700 transition-colors"
                >
                  {siteSettings.mobile}
                </a>
                <p className="text-[11px] text-[#6B6B6B]">
                  Direct Project Consultation &amp; Urgent Inquiries
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={`tel:${cleanPhone(siteSettings.mobile)}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#171717] group-hover:underline uppercase"
                >
                  <span>CALL MOBILE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* 4. Official Email */}
            <div className="pt-6 border-t border-[#171717]/20 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  ELECTRONIC MAIL
                </span>
                <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                  PROJECT ENQUIRIES
                </h3>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-sm font-mono font-bold text-[#171717] block hover:underline truncate"
                >
                  {siteSettings.email}
                </a>
                <p className="text-[11px] text-[#6B6B6B]">
                  Architectural, Engineering &amp; Statutory Proposals
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#171717] group-hover:underline uppercase"
                >
                  <span>SEND EMAIL</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 03 & 04 — START A PROJECT & ENQUIRY FORM */}
      <section id="enquiry-form" className="py-20 md:py-32 bg-white border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Col: Section Guidance & Discipline Scope */}
            <div className="lg:col-span-5 space-y-8 sticky top-28">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-3">
                  03 / START A PROJECT
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#171717] uppercase leading-[1.05] mb-4">
                  TELL US ABOUT<br />YOUR PROJECT.
                </h2>
                <p className="text-sm text-[#555] leading-relaxed font-normal">
                  Share the essential details of your requirement and the team will review the enquiry to assess project feasibility, technical scope, and statutory steps.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#171717] font-bold block border-b border-[#E8E8E5] pb-2">
                  PRACTICE CORE DISCIPLINES
                </span>
                <ul className="space-y-2 text-xs text-[#555] font-mono">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                    <span>Architectural Planning &amp; Master Layouts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                    <span>Structural Engineering &amp; Utility Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                    <span>Government Sanctions: MIDC, MPCB, DISH, PMRDA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                    <span>Project Management Consultancy (PMC)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                    <span>Topographical Land Surveying &amp; Mojani</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 text-xs font-mono text-[#6B6B6B] leading-relaxed">
                <p>Korals Design Private Limited — Pune, India</p>
                <p className="text-[#171717] font-semibold mt-1">Direct: +020 - 24324648 | +91 9822864648</p>
              </div>
            </div>

            {/* Right Col: Premium Editorial Bottom-Border Form */}
            <div className="lg:col-span-7 bg-[#F7F7F5] p-8 sm:p-12 rounded-3xl border border-[#E8E8E5] shadow-sm">
              
              {success ? (
                <div className="py-12 px-6 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase block">
                      ENQUIRY CONFIRMED
                    </span>
                    <h3 className="text-3xl font-bold text-[#171717] uppercase tracking-tight">
                      THANK YOU.
                    </h3>
                    <p className="text-sm text-[#555] leading-relaxed">
                      Your enquiry has been received. Our technical team will review your project requirements and connect with you.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-8 py-3.5 rounded-full bg-[#171717] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#2A2A28] transition-all shadow-md cursor-pointer"
                    >
                      SUBMIT ANOTHER ENQUIRY
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  
                  {serverError && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* SECTION 04 — PROJECT TYPE SEGMENTED SELECTOR */}
                  <div className="space-y-3">
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-[#171717] font-bold">
                      PROJECT CATEGORY *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const isSelected = formData.enquiryType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, enquiryType: type.id });
                              if (errors.enquiryType) setErrors({ ...errors, enquiryType: "" });
                            }}
                            className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-[#171717] text-white font-bold shadow-sm"
                                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
                            }`}
                          >
                            {type.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.enquiryType && (
                      <p className="text-xs text-rose-600 mt-1 font-mono">{errors.enquiryType}</p>
                    )}
                  </div>

                  {/* YOUR DETAILS FIELDS */}
                  <div className="space-y-6 pt-4 border-t border-[#E8E8E5]">
                    <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                      YOUR INFORMATION
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#171717] font-semibold mb-1">
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rajesh Sharma"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          className={`w-full bg-transparent border-b-2 py-2.5 text-sm text-[#171717] placeholder:text-[#999] focus:outline-none transition-colors ${
                            errors.name ? "border-rose-500" : "border-[#171717]/30 focus:border-[#171717]"
                          }`}
                        />
                        {errors.name && <p className="text-xs text-rose-600 mt-1 font-mono">{errors.name}</p>}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#171717] font-semibold mb-1">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. sharma@company.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full bg-transparent border-b-2 py-2.5 text-sm text-[#171717] placeholder:text-[#999] focus:outline-none transition-colors ${
                            errors.email ? "border-rose-500" : "border-[#171717]/30 focus:border-[#171717]"
                          }`}
                        />
                        {errors.email && <p className="text-xs text-rose-600 mt-1 font-mono">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#171717] font-semibold mb-1">
                          PHONE / MOBILE
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 9822864648"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-[#171717]/30 py-2.5 text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#171717] transition-colors"
                        />
                      </div>

                      {/* Organization (Optional) */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#171717] font-semibold mb-1">
                          COMPANY / ORGANIZATION
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Alfa Laval / Private Development"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-[#171717]/30 py-2.5 text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#171717] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Project Location (Optional) */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#171717] font-semibold mb-1">
                        PROJECT LOCATION / SITE CITY
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kasarwadi, Bhosari, Chakan, Pune"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-[#171717]/30 py-2.5 text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#171717] transition-colors"
                      />
                    </div>
                  </div>

                  {/* PROJECT BRIEF / MESSAGE */}
                  <div className="space-y-3 pt-4 border-t border-[#E8E8E5]">
                    <span className="text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                      REQUIREMENT BRIEF
                    </span>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#171717] font-semibold mb-2">
                        PROJECT BRIEF &amp; DETAILS *
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Describe your project, plot area, facility requirements, statutory clearances needed, or timeline goals..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                        className={`w-full bg-white border rounded-xl p-4 text-xs text-[#171717] placeholder:text-[#999] focus:outline-none transition-all ${
                          errors.message
                            ? "border-rose-500 bg-rose-50/20"
                            : "border-[#E8E8E5] focus:border-[#171717]"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-600 mt-1 font-mono">{errors.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full bg-[#171717] text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#2A2A28] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>SENDING ENQUIRY...</span>
                        </span>
                      ) : (
                        <>
                          <span>SUBMIT PROJECT ENQUIRY</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 05 — LOCATION EXPERIENCE */}
      <section className="py-20 md:py-32 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-3">
                04 / FIND US
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717] uppercase leading-none">
                PUNE / INDIA
              </h2>
            </div>
            <a
              href={siteSettings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171717] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#2A2A28] transition-all shadow-md group"
            >
              <span>OPEN IN MAPS</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Architectural Site Plan Visual Card */}
          <div className="bg-[#181818] rounded-3xl overflow-hidden border border-[#2A2A28] shadow-2xl grid grid-cols-1 lg:grid-cols-12 text-white">
            
            {/* Left Location Metadata */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Compass className="w-4 h-4" />
                  <span>PARVATI • PUNE • MAHARASHTRA</span>
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-tight">
                  KORALS DESIGN PVT LTD
                </h3>

                <div className="text-xs text-white/70 leading-relaxed font-mono space-y-2 border-t border-white/10 pt-4">
                  <p className="text-white font-semibold">{siteSettings.address}</p>
                  <p className="pt-2">Landline: {siteSettings.phone}</p>
                  <p>Mobile: {siteSettings.mobile}</p>
                  <p>Email: {siteSettings.email}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                <span>ESTABLISHED 2005</span>
                <span>PUNE PRACTICE</span>
              </div>
            </div>

            {/* Right Architectural Linework & Map Container */}
            <div className="lg:col-span-7 relative min-h-[350px] bg-[#222] flex items-center justify-center p-8 overflow-hidden group">
              {/* Decorative Linework & Grid Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
              
              <Image
                src="/images/architecture_exterior_1.jpg"
                alt="Korals Design Pune Location"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.5]"
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />

              <div className="relative z-10 text-center p-8 max-w-sm bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl space-y-4">
                <div className="w-12 h-12 rounded-full bg-white text-[#171717] flex items-center justify-center mx-auto shadow-xl animate-bounce">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base uppercase tracking-wider mb-1">
                    PARVATI HEADQUARTERS
                  </h4>
                  <p className="text-xs font-mono text-white/70 leading-relaxed">
                    201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune - 411030
                  </p>
                </div>
                <a
                  href={siteSettings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline pt-2 uppercase"
                >
                  <span>VIEW ON GOOGLE MAPS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 06 — CONTACT METHODS EDITORIAL CARDS */}
      <section className="py-20 md:py-28 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. CALL LANDLINE */}
            <a
              href={`tel:${cleanPhone(siteSettings.phone)}`}
              className="p-8 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 group flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  TELEPHONE
                </span>
                <h3 className="text-2xl font-mono font-bold text-[#171717]">
                  {siteSettings.phone}
                </h3>
                <p className="text-xs text-[#6B6B6B]">
                  Call our Pune office directly during business hours.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700 uppercase pt-4 border-t border-[#F7F7F5]">
                <span>CALL NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 2. CALL MOBILE */}
            <a
              href={`tel:${cleanPhone(siteSettings.mobile)}`}
              className="p-8 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 group flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  MOBILE
                </span>
                <h3 className="text-2xl font-mono font-bold text-[#171717]">
                  {siteSettings.mobile}
                </h3>
                <p className="text-xs text-[#6B6B6B]">
                  Direct line for project discussions and consultations.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700 uppercase pt-4 border-t border-[#F7F7F5]">
                <span>CALL MOBILE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 3. EMAIL ENQUIRIES */}
            <a
              href={`mailto:${siteSettings.email}`}
              className="p-8 rounded-2xl bg-white border border-[#E8E8E5] hover:border-[#171717] transition-all duration-300 group flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  EMAIL
                </span>
                <h3 className="text-lg font-mono font-bold text-[#171717] truncate">
                  {siteSettings.email}
                </h3>
                <p className="text-xs text-[#6B6B6B]">
                  Send detailed project briefs, drawings, and RFP inquiries.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#171717] group-hover:text-emerald-700 uppercase pt-4 border-t border-[#F7F7F5]">
                <span>SEND EMAIL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* SECTION 07 — WHAT CAN WE DISCUSS? */}
      <section className="py-20 md:py-32 bg-white border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-3">
              05 / DISCUSS
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717] uppercase leading-tight">
              FROM FIRST IDEA<br />TO PROJECT REQUIREMENTS.
            </h2>
          </div>

          <div className="divide-y divide-[#E8E8E5]">
            {DISCUSS_TOPICS.map((topic) => (
              <div
                key={topic.num}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-[#F7F7F5]/60 transition-colors px-4 rounded-xl"
              >
                <div className="md:col-span-2 text-sm font-mono text-[#6B6B6B] font-bold">
                  {topic.num}
                </div>
                <div className="md:col-span-5 text-lg font-bold text-[#171717] uppercase tracking-tight group-hover:translate-x-1 transition-transform">
                  {topic.title}
                </div>
                <div className="md:col-span-5 text-xs text-[#6B6B6B] leading-relaxed">
                  {topic.desc}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 08 — ARCHITECTURAL VISUAL TRANSITION */}
      <section className="relative py-32 bg-[#181818] text-white overflow-hidden border-b border-[#2A2A28]">
        <Image
          src="/images/hero_industrial_facade.jpg"
          alt="Korals Design Architecture Engineering Consultancy"
          fill
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              KORALS DESIGN • PUNE
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase leading-none">
              ARCHITECTURE • ENGINEERING • CONSULTANCY
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Bringing design, structural precision, statutory compliance, and construction management together for industrial, commercial, and institutional projects.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 09 — FINAL CTA */}
      <section className="py-24 md:py-36 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
              06 / NEXT STEP
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717] uppercase">
              HAVE A PROJECT<br />IN MIND?
            </h2>
            <p className="text-base text-[#555] leading-relaxed font-normal">
              Let&apos;s start with a conversation. Explore our portfolio or send your project details.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-full bg-[#171717] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#2A2A28] transition-all shadow-xl cursor-pointer"
              >
                START AN ENQUIRY →
              </button>
              <Link
                href="/projects"
                className="px-8 py-4 rounded-full bg-white text-[#171717] border border-[#E8E8E5] font-semibold text-xs uppercase tracking-widest hover:border-[#171717] transition-all shadow-sm"
              >
                EXPLORE PROJECTS →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
