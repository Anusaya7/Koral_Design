"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ShieldCheck } from "lucide-react";

export default function HomeAbout() {
  const timeline = [
    {
      year: "2005",
      title: "Pensioners Land Surveyors Associates",
      description: "Established precision land surveying, demarcation, and topographic survey practice.",
    },
    {
      year: "2013",
      title: "Korals Engineering Solutions Pvt Ltd",
      description: "Expanded operations into SEZs, industrial manufacturing facilities, and municipal projects.",
    },
    {
      year: "2020",
      title: "Korals Design Pvt Ltd",
      description: "Integrated architectural planning, civil engineering PMC, statutory approvals, and 3D visualization.",
    },
  ];

  const directors = [
    {
      name: "Mahesh Govardhan",
      role: "Director",
      description: "Overseeing architectural planning, statutory government permissions (MIDC, MPCB, DISH, PMRDA), and strategic project execution.",
    },
    {
      name: "Uday Honap",
      role: "Director",
      description: "Leading civil engineering project management, land survey consultancy, and technical government liaison.",
    },
  ];

  return (
    <section id="about-section" className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
            01 / ABOUT
          </span>
          <span className="text-xs font-mono text-[#6B6B6B]">
            PUNE • MAHARASHTRA • EST. 2005
          </span>
        </div>

        {/* Headline & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717] leading-[1.05]">
              BUILT ON EXPERIENCE. <br />
              <span className="italic font-serif font-normal text-[#6B6B6B]">DRIVEN BY DESIGN.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed">
              Korals Design Private Limited is an architectural services, civil engineering project management, and statutory clearance provider headquartered in Pune, Maharashtra, India.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              We specialize in industrial master planning, technical liaison with government departments (MIDC, MPCB, DISH, PMRDA, PMC, PCMC), land surveying, and spatial 3D visualization for industrial plants, corporate headquarters, and institutional developments.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
              >
                <span>MORE ABOUT US</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#181818] border border-[#E8E8E5] shadow-2xl">
            <Image
              src="/images/architecture_exterior_1.jpg"
              alt="Korals Design Architectural Facility"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#E8E8E5]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#171717] font-bold uppercase mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>KORALS DESIGN PVT LTD</span>
              </div>
              <p className="text-xs text-[#6B6B6B]">201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune - 411030</p>
            </div>
          </div>
        </div>

        {/* Verified Timeline */}
        <div className="mb-24 pt-12 border-t border-[#E8E8E5]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block mb-8">
            VERIFIED COMPANY TIMELINE
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#E8E8E5] relative flex flex-col justify-between group hover:border-[#171717] transition-all"
              >
                <div>
                  <div className="text-4xl font-bold font-mono text-[#171717] mb-3 group-hover:translate-x-1 transition-transform">
                    {item.year}
                  </div>
                  <h3 className="text-lg font-bold text-[#171717] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8E8E5] text-[10px] font-mono text-[#90908C] uppercase">
                  MILESTONE {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="pt-12 border-t border-[#E8E8E5]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block mb-8">
            BOARD OF DIRECTORS
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {directors.map((d) => (
              <div key={d.name} className="bg-[#F7F7F5] rounded-3xl p-8 border border-[#E8E8E5] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#171717] text-white flex items-center justify-center font-bold text-lg">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#171717]">{d.name}</h3>
                    <p className="text-xs font-mono text-[#6B6B6B] uppercase">{d.role}</p>
                  </div>
                </div>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{d.description}</p>
                <div className="pt-3 border-t border-[#E8E8E5] flex items-center justify-between text-[11px] font-mono text-[#171717]">
                  <span>Korals Design Pvt Ltd</span>
                  <Award className="w-3.5 h-3.5 text-[#171717]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
