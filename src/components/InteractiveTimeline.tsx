"use client";

import { useState } from "react";

interface TimelineItem {
  year: string;
  name: string;
  category: string;
  description: string;
  details: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2005",
    name: "Pensioners Land Surveyors Associates",
    category: "FOUNDATION & SURVEYING",
    description: "Established precision land surveying, demarcation, and revenue Mojani consultancy.",
    details: "Initiated operations focusing on precision ground survey, contour mapping, and land revenue demarcation in Pune.",
  },
  {
    year: "2013",
    name: "Korals Engineering Solutions Pvt Ltd",
    category: "ENGINEERING & INDUSTRIAL EXPANSION",
    description: "Expanded into SEZs, industrial manufacturing facilities, and municipal infrastructure.",
    details: "Broadened technical scope to civil engineering project management, process plant flow planning, and large-scale infrastructure.",
  },
  {
    year: "2020",
    name: "Korals Design Pvt Ltd",
    category: "INTEGRATED PRACTICE INCORPORATION",
    description: "Incorporated single-window architectural, PMC, statutory clearance, and 3D visualization practice.",
    details: "Established integrated practice offering architectural master planning, government department liaison (MIDC, MPCB, DISH, PMRDA, PMC, PCMC), and 3D walkthroughs.",
  },
];

export default function InteractiveTimeline() {
  const [activeIdx, setActiveIdx] = useState(2); // Default 2020 active

  return (
    <section id="timeline-section" className="py-24 md:py-32 bg-[#F7F7F5] border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
            01 / JOURNEY — PRACTICE TIMELINE
          </span>
          <span className="text-xs font-mono text-[#6B6B6B]">
            FACTUAL PRACTICE MILESTONES
          </span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block mb-2">
            TWO DECADES OF VERIFIED EVOLUTION
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
            PRACTICE TIMELINE
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 leading-relaxed">
            Hover over a milestone year to inspect Koral&apos;s Design factual organizational progression.
          </p>
        </div>

        {/* Horizontal Interactive Timeline */}
        <div className="space-y-12">
          {/* Year Buttons / Line Grid */}
          <div className="relative border-b-2 border-[#E8E8E5] pb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {timelineData.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.year}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className="relative cursor-pointer group"
                >
                  {/* Top Line Indicator */}
                  <div
                    className={`h-1.5 rounded-full mb-6 transition-all duration-500 ${
                      isActive ? "bg-[#171717] w-full" : "bg-[#D4D4CE] w-12 group-hover:w-24 group-hover:bg-[#171717]/60"
                    }`}
                  />

                  {/* Year Number Display */}
                  <div className="flex items-baseline justify-between mb-3">
                    <span
                      className={`text-5xl sm:text-7xl font-bold font-mono transition-all duration-300 ${
                        isActive ? "text-[#171717] scale-105" : "text-[#171717]/30 group-hover:text-[#171717]/70"
                      }`}
                    >
                      {item.year}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B6B6B] uppercase border border-[#E8E8E5] px-2 py-0.5 rounded bg-white">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171717] mb-1 group-hover:text-black">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-wider mb-2">
                    {item.category}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Milestone Highlight Card */}
          {timelineData[activeIdx] && (
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8E8E5] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 animate-fade-in">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold bg-[#171717] text-white px-3 py-1 rounded-full">
                    MILESTONE {timelineData[activeIdx].year}
                  </span>
                  <span className="text-xs font-mono text-[#6B6B6B] uppercase">
                    {timelineData[activeIdx].category}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-[#171717]">
                  {timelineData[activeIdx].name}
                </h4>
                <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-3xl">
                  {timelineData[activeIdx].details}
                </p>
              </div>

              <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#E8E8E5]">
                <div className="w-16 h-16 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5] flex items-center justify-center text-[#171717] font-bold font-mono text-xl">
                  {timelineData[activeIdx].year.slice(2)}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
