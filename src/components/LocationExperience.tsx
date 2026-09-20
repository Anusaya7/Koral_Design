"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink, Navigation } from "lucide-react";

export default function LocationExperience() {
  const [activeProjectPin, setActiveProjectPin] = useState<string | null>("alfa");

  const siteSettings = {
    company_name: "KORALS DESIGN PVT LTD",
    legal_name: "Korals Design Private Limited",
    address: "201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030",
    phone: "+020 - 24324648",
    mobile: "+91 9822864648",
    email: "projects@koralsdesign.com",
    google_maps_url: "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9?g_st=ac",
  };

  const projectNodes = [
    {
      id: "alfa",
      name: "ALFA LAVAL INDIA LTD",
      location: "Kasarwadi, Bhosari, Pune",
      type: "Industrial Building (12,274 Sq.M.)",
    },
    {
      id: "shrirampur",
      name: "SHRIRAMPUR MUNICIPAL CORP",
      location: "Shrirampur, Maharashtra",
      type: "Institutional Masterplan & Survey",
    },
    {
      id: "suzlon",
      name: "SUZLON ENERGY FACILITY",
      location: "Pune, Maharashtra",
      type: "Green Energy Campus Planning",
    },
  ];

  return (
    <section id="location-section" className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
          <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
            05 / LOCATION — PUNE / INDIA HEADQUARTERS
          </span>
          <span className="text-xs font-mono text-[#6B6B6B]">
            PARVATI / PUNE / MAHARASHTRA
          </span>
        </div>

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
              HEADQUARTERS &amp; REGIONAL PROJECT PRESENCE
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              PUNE / INDIA <br />
              <span className="italic font-serif font-normal text-[#6B6B6B]">WHERE WE WORK FROM.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-xs font-mono text-[#6B6B6B] space-y-2 border-t lg:border-t-0 lg:border-l border-[#E8E8E5] pt-4 lg:pt-0 lg:pl-8">
            <p className="font-bold text-[#171717] uppercase">KORALS DESIGN PRIVATE LIMITED</p>
            <p>201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune - 411030</p>
            <p>Telephone: +020 - 24324648 | Mobile: +91 9822864648</p>
          </div>
        </div>

        {/* Main Architectural Location Panel */}
        <div className="bg-white rounded-3xl border border-[#E8E8E5] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Location Info & Project Nodes (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-12 bg-[#181818] text-white flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono uppercase border border-white/20">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                PUNE HEADQUARTERS
              </span>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{siteSettings.company_name}</h3>
                <p className="text-xs font-mono text-white/60 mb-4">{siteSettings.legal_name}</p>
                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  {siteSettings.address}
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 space-y-2 text-xs font-mono text-white/90">
                <a href={`tel:+02024324648`} className="hover:underline flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Office: {siteSettings.phone}</span>
                </a>
                <a href={`tel:+919822864648`} className="hover:underline flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mobile: {siteSettings.mobile}</span>
                </a>
                <a href={`mailto:${siteSettings.email}`} className="hover:underline flex items-center gap-2 text-white">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{siteSettings.email}</span>
                </a>
              </div>

              {/* Projects Around Us Diagram Selector */}
              <div className="pt-6 border-t border-white/15 space-y-3">
                <span className="text-[10px] font-mono text-white/50 uppercase block">
                  PROJECTS AROUND US (EDITORIAL REGIONAL DIAGRAM)
                </span>

                <div className="space-y-2">
                  {projectNodes.map((p) => {
                    const isSelected = activeProjectPin === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveProjectPin(p.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-white text-[#171717] border-white font-bold"
                            : "bg-[#262624] text-white/80 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div>
                          <span className="block font-bold">{p.name}</span>
                          <span className="text-[10px] text-white/60 block">{p.location}</span>
                        </div>
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-600" : "text-white/40"}`} />
                      </button>
                    );
                  })}
                </div>
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

          {/* Right Column: Architectural Site-Plan Map Graphic (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[440px] bg-[#181818] overflow-hidden flex items-center justify-center group">
            {/* Background Graphic Image with Grid Overlay */}
            <Image
              src="/images/architecture_exterior_1.jpg"
              alt="Korals Design Headquarters Site Graphic"
              fill
              className="object-cover brightness-[0.5] scale-[1.02] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-arch-grid-dark opacity-30 pointer-events-none" />

            {/* Architectural Pin Marker */}
            <div className="relative z-10 text-center p-8 max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#171717] text-white flex items-center justify-center mx-auto shadow-xl">
                <MapPin className="w-7 h-7 text-emerald-400" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#6B6B6B] uppercase block mb-1">
                  KORALS DESIGN HEADQUARTERS
                </span>
                <h4 className="font-bold text-[#171717] text-lg mb-1">Parvati, Pune Facility</h4>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                  201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune - 411030
                </p>
              </div>

              {activeProjectPin && (
                <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E5] text-[11px] font-mono text-[#171717]">
                  <span className="text-[#6B6B6B] block text-[9px] uppercase">SELECTED REGIONAL LINK:</span>
                  <span className="font-bold">
                    {projectNodes.find((p) => p.id === activeProjectPin)?.name}
                  </span>
                </div>
              )}

              <a
                href={siteSettings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#171717] hover:underline pt-2"
              >
                <span>OPEN IN GOOGLE MAPS →</span>
              </a>
            </div>

            {/* Site Grid Labels Overlay */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-white/50 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded">
              PUNE / MAHARASHTRA / INDIA
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/50 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded">
              KD LOCATION / 01
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
