"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Eye } from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  location: string;
  category: string;
  area: string;
  description: string;
  completion_year: string;
  featured_image: string;
}

export default function HomeProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error loading home projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects-section" className="py-24 md:py-32 bg-[#F7F7F5] border-b border-[#E8E8E5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
            02 / PROJECTS
          </span>
          <span className="text-xs font-mono text-[#6B6B6B]">
            FEATURED PRACTICE PORTFOLIO
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
              FEATURED PROJECTS
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 max-w-xl leading-relaxed">
              Industrial plants, green energy campuses, and municipal infrastructure engineered with precision.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-[#171717] text-white px-6 py-3 rounded-full hover:bg-[#2A2A28] transition-all"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Editorial Project Grid */}
        {loading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 bg-white rounded-3xl animate-pulse border border-[#E8E8E5]" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {projects.map((proj, idx) => {
              const projectNumber = `KD / PROJECT 0${idx + 1}`;
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={proj.id}
                  data-cursor="project"
                  className={`bg-white rounded-3xl border border-[#E8E8E5] overflow-hidden p-6 md:p-10 hover:shadow-2xl transition-all duration-500 group flex flex-col ${
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* Column 1: Editorial Details */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#F7F7F5] pb-3">
                        <span className="text-xs font-mono font-bold text-[#6B6B6B] group-hover:text-[#171717] transition-colors">
                          {projectNumber}
                        </span>
                        <span className="text-[11px] font-mono bg-[#F7F7F5] px-3 py-1 rounded-full text-[#171717] border border-[#E8E8E5]">
                          {proj.category}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {proj.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-[#E8E8E5]">
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[#90908C] block uppercase text-[10px]">Location</span>
                          <span className="font-semibold text-[#171717] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                            {proj.location}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#90908C] block uppercase text-[10px]">Scale / Built Area</span>
                          <span className="font-semibold text-[#171717] block mt-0.5">{proj.area || "N/A"}</span>
                        </div>
                      </div>

                      <Link
                        href={`/projects/${proj.id}`}
                        className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase text-[#171717] group-hover:underline pt-2"
                      >
                        <span>VIEW PROJECT EXHIBITION</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Project Exhibition Image */}
                  <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#181818] border border-[#E8E8E5]">
                    <Image
                      src={proj.featured_image || "/images/hero_villa_render.jpg"}
                      alt={proj.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#E8E8E5] text-xs font-mono font-bold text-[#171717] flex items-center gap-2 shadow-md">
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{projectNumber}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
