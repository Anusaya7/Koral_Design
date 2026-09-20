"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface ServiceItem {
  id: number;
  service_number: string;
  title: string;
  slug?: string;
  short_description: string;
  full_description: string;
  bullet_points: string;
  image: string;
  cta_label?: string;
  cta_link?: string;
}

export default function HomeServices() {
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
      .catch((err) => console.error("Error loading home services:", err))
      .finally(() => setLoading(false));
  }, []);

  const activeService = services.find((s) => s.id === selectedId) || services[0];

  return (
    <section id="services-section" className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
            03 / SERVICES
          </span>
          <span className="text-xs font-mono text-[#6B6B6B]">
            INTERACTIVE EDITORIAL PRESENTATION
          </span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
            OUR SERVICES
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 leading-relaxed">
            Integrated architecture, engineering, statutory approvals, land surveying, and PMC services.
          </p>
        </div>

        {loading ? (
          <div className="h-96 bg-[#F7F7F5] rounded-3xl animate-pulse border border-[#E8E8E5]" />
        ) : (
          <>
            {/* DESKTOP INTERACTIVE EDITORIAL PRESENTATION */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Selector List (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                {services.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? "bg-[#171717] text-white border-[#171717] shadow-lg"
                          : "bg-[#F7F7F5] text-[#171717] border-[#E8E8E5] hover:border-[#171717]/40"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isSelected ? "text-white/60" : "text-[#90908C]"
                          }`}
                        >
                          SERVICE {item.service_number}
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

              {/* Right Detail Panel (7 cols) */}
              {activeService && (
                <div className="lg:col-span-7 bg-[#F7F7F5] rounded-3xl p-8 md:p-10 border border-[#E8E8E5] shadow-xs flex flex-col justify-between space-y-8 animate-fade-in">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
                      <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                        SERVICE NUMBER {activeService.service_number}
                      </span>
                      <span className="text-[11px] font-mono bg-white px-3 py-1 rounded-full border border-[#E8E8E5] text-[#171717]">
                        PRACTICE AREA
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-[#171717] tracking-tight">
                      {activeService.title}
                    </h3>

                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {activeService.full_description || activeService.short_description}
                    </p>

                    {activeService.bullet_points && (
                      <div className="pt-4 border-t border-[#E8E8E5] space-y-3">
                        <span className="text-xs font-mono font-semibold text-[#171717] uppercase block">
                          Scope &amp; Capabilities:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#171717]">
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
                      href={activeService.slug ? `/services/${activeService.slug}` : `/services`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
                    >
                      <span>EXPLORE SERVICE →</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* MOBILE ACCORDION STACKED PRESENTATION */}
            <div className="lg:hidden space-y-4">
              {services.map((item) => {
                const isOpen = openMobileId === item.id;
                return (
                  <div
                    key={item.id}
                    className="bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5] overflow-hidden transition-all"
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
                      <div className="px-5 pb-6 pt-2 space-y-4 border-t border-[#E8E8E5] bg-white animate-fade-in">
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
                          href={item.slug ? `/services/${item.slug}` : `/services`}
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
  );
}
