"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, MapPin, Search, ArrowRight, X, Sparkles } from "lucide-react";

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
  gallery_images?: string;
  is_featured?: number;
}

interface ProjectsClientProps {
  initialProjects?: Project[];
}

export default function ProjectsClient({ initialProjects = [] }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    if (initialProjects.length === 0) {
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProjects(data);
          }
        })
        .catch((err) => console.error("Error fetching projects:", err))
        .finally(() => setLoading(false));
    }
  }, [initialProjects]);

  // Extract unique categories from real projects dynamically
  const dynamicCategories = [
    "ALL",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCat = activeCategory === "ALL" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredProject = projects.find((p) => p.is_featured === 1) || projects[0];

  return (
    <div className="w-full bg-[#F7F7F5] text-[#171717] overflow-x-hidden">
      
      {/* SECTION 01 — PROJECTS HERO */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28 bg-[#181818] text-white border-b border-[#2A2A28] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-arch-grid-dark" />

        {/* Hero Background Image Crop */}
        <div className="absolute inset-0 w-full h-full opacity-35 select-none pointer-events-none">
          <Image
            src={featuredProject?.featured_image || "/images/architecture_exterior_1.jpg"}
            alt="Korals Design Projects Portfolio Hero"
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
              01 / SELECTED PROJECTS
            </span>
          </div>

          {/* Technical Metadata Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-[10px] font-mono text-white/70 uppercase">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">KD / PROJECT ARCHIVE</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">PUNE / INDIA</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">ARCHITECTURE + ENGINEERING</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold text-white tracking-[-0.04em] leading-[0.98] max-w-5xl mb-6">
            SPACES <br />
            THAT TAKE <br />
            <span className="text-white/80 font-normal italic font-serif">FORM.</span>
          </h1>

          <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-white/70 block mb-6">
            ARCHITECTURE • ENGINEERING • EXECUTION
          </span>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-normal leading-relaxed mb-12">
            A selection of projects reflecting our approach to architectural planning, engineering consultancy and project development.
          </p>

          {/* Scroll CTA */}
          <a
            href="#project-archive"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-white/80 hover:text-white uppercase px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 animate-bounce"
          >
            <span>EXPLORE PROJECTS ↓</span>
          </a>
        </div>
      </section>

      {/* SECTION 02 — PROJECT ARCHIVE INTRO & FILTER BAR */}
      <section id="project-archive" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E8E5] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Section Indicator */}
          <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4">
            <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
              02 / PROJECT ARCHIVE
            </span>
            <span className="text-xs font-mono text-[#6B6B6B]">
              EDITORIAL EXHIBITION &amp; DISCOVERY
            </span>
          </div>

          {/* Headline Statement */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] block">
              VERIFIED KD PRACTICE PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] tracking-tight leading-[1.02]">
              SELECTED WORK. <br />
              <span className="text-[#6B6B6B]">REAL REQUIREMENTS.</span> <br />
              <span className="italic font-serif font-normal text-[#171717]">PRECISE SOLUTIONS.</span>
            </h2>
          </div>

          {/* Editorial Discovery Filter & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-[#E8E8E5]">
            {/* Dynamic Category Pill Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {dynamicCategories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                      isSelected
                        ? "bg-[#171717] text-white shadow-md"
                        : "bg-[#F7F7F5] text-[#171717] border border-[#E8E8E5] hover:border-[#171717]/40"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Architectural Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search project or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F7F5] border border-[#E8E8E5] rounded-full pl-11 pr-4 py-2.5 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717] transition-colors"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 06 — FULL-SCREEN FEATURED PROJECT SHOWCASE */}
      {featuredProject && activeCategory === "ALL" && !searchQuery && (
        <section className="py-20 bg-[#181818] text-white border-b border-[#2A2A28] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                FEATURED PRACTICE EXHIBITION
              </span>
              <span className="text-xs font-mono text-white/50">KD / FEATURED 01</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#262624] border border-white/15 shadow-2xl group">
                <Image
                  src={featuredProject.featured_image || "/images/architecture_exterior_1.jpg"}
                  alt={featuredProject.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-white border border-white/20">
                  {featuredProject.category}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono text-white/60 uppercase tracking-widest block">
                  CLIENT: {featuredProject.client}
                </span>

                <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {featuredProject.name}
                </h3>

                <p className="text-sm text-white/80 leading-relaxed font-normal">
                  {featuredProject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono border-y border-white/15 py-4">
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase">Location</span>
                    <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {featuredProject.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase">Built Area</span>
                    <span className="font-semibold text-white block mt-0.5">{featuredProject.area || "N/A"}</span>
                  </div>
                </div>

                <Link
                  href={`/projects/${featuredProject.id}`}
                  className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-7 py-3.5 rounded-full hover:bg-white/90 transition-all shadow-xl"
                >
                  <span>VIEW FEATURED CASE STUDY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 03 & 05 — EDITORIAL PROJECT EXHIBITION (ALTERNATING LAYOUTS) */}
      <section className="py-24 md:py-32 bg-[#F7F7F5] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          
          {loading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-[#E8E8E5]" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E8E5] p-8 space-y-4">
              <h3 className="text-2xl font-bold text-[#171717]">No projects match your filter</h3>
              <p className="text-xs font-mono text-[#6B6B6B]">Try adjusting your search query or selecting ALL categories.</p>
              <button
                onClick={() => {
                  setActiveCategory("ALL");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#171717] text-white rounded-full text-xs font-mono font-bold uppercase"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            filteredProjects.map((p, idx) => {
              const projectNum = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
              const isEven = idx % 2 === 1;
              const isFullWidth = idx % 4 === 3;

              if (isFullWidth) {
                {/* Full-Width Panoramic Exhibition Card */}
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-3xl border border-[#E8E8E5] overflow-hidden p-6 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 group space-y-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E8E5] pb-4 gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-mono font-bold text-[#171717]">
                          {projectNum}
                        </span>
                        <div>
                          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#171717] group-hover:translate-x-1 transition-transform">
                            {p.name}
                          </h3>
                          <span className="text-xs font-mono text-[#6B6B6B]">Client: {p.client}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-[#F7F7F5] px-3.5 py-1.5 rounded-full border border-[#E8E8E5] text-[#171717] self-start sm:self-auto">
                        {p.category}
                      </span>
                    </div>

                    {/* Cinematic Panoramic Image */}
                    <Link href={`/projects/${p.id}`} className="block relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[#181818] border border-[#E8E8E5]">
                      <Image
                        src={p.featured_image || "/images/architecture_exterior_1.jpg"}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    </Link>

                    {/* Specifications Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-xs font-mono border-t border-[#E8E8E5]">
                      <div>
                        <span className="text-[#90908C] block uppercase text-[10px]">PROJECT</span>
                        <span className="font-bold text-[#171717] block mt-0.5">{p.name}</span>
                      </div>
                      <div>
                        <span className="text-[#90908C] block uppercase text-[10px]">TYPE</span>
                        <span className="font-bold text-[#171717] block mt-0.5">{p.category}</span>
                      </div>
                      <div>
                        <span className="text-[#90908C] block uppercase text-[10px]">LOCATION</span>
                        <span className="font-bold text-[#171717] block mt-0.5">{p.location}</span>
                      </div>
                      <div>
                        <span className="text-[#90908C] block uppercase text-[10px]">SCALE / BUILT AREA</span>
                        <span className="font-bold text-[#171717] block mt-0.5">{p.area || "N/A"}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <p className="text-xs text-[#6B6B6B] max-w-2xl leading-relaxed">
                        {p.description}
                      </p>
                      <Link
                        href={`/projects/${p.id}`}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#171717] hover:underline shrink-0"
                      >
                        <span>VIEW PROJECT EXHIBITION →</span>
                      </Link>
                    </div>
                  </div>
                );
              }

              {/* Standard Alternating Editorial Card */}
              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-3xl border border-[#E8E8E5] overflow-hidden p-6 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col ${
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* Info Column */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#F7F7F5] pb-3">
                        <span className="text-sm font-mono font-bold text-[#171717]">
                          KD / EXHIBITION {projectNum}
                        </span>
                        <span className="text-[11px] font-mono bg-[#F7F7F5] px-3 py-1 rounded-full text-[#171717] border border-[#E8E8E5]">
                          {p.category}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-5xl font-black text-[#171717] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {p.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-[#E8E8E5]">
                      {/* Micro-typography Specs Area */}
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[#90908C] block uppercase text-[10px]">Location</span>
                          <span className="font-semibold text-[#171717] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                            {p.location}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#90908C] block uppercase text-[10px]">Built Area / Scale</span>
                          <span className="font-semibold text-[#171717] block mt-0.5">{p.area || "N/A"}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Link
                          href={`/projects/${p.id}`}
                          className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase text-[#171717] group-hover:underline"
                        >
                          <span>VIEW CASE STUDY</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                        <button
                          onClick={() => setSelectedProject(p)}
                          className="text-xs font-mono text-[#6B6B6B] hover:text-[#171717] flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#181818] border border-[#E8E8E5]">
                    <Image
                      src={p.featured_image || "/images/hero_villa_render.jpg"}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8E8E5] text-xs font-mono font-bold text-[#171717] flex items-center gap-2 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{projectNum}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}

        </div>
      </section>

      {/* SECTION 07 — ARCHITECTURAL GRID VISUAL PAUSE */}
      <section className="py-16 bg-[#181818] text-white border-b border-[#2A2A28]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-6 text-xs font-mono tracking-widest uppercase text-white/60">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            PLAN
          </span>
          <span>{"///"}</span>
          <span>SPACE</span>
          <span>{"///"}</span>
          <span>STRUCTURE</span>
          <span>{"///"}</span>
          <span>DETAIL</span>
          <span>{"///"}</span>
          <span>KD ARCHITECTURAL SYSTEM</span>
        </div>
      </section>

      {/* SECTION 10 — PROJECT DETAIL CTA */}
      <section className="py-24 md:py-36 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
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
                Let&apos;s discuss your architectural, engineering or consultancy requirements.
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
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all"
                >
                  <span>EXPLORE OUR SERVICES →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW LIGHTBOX MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
          <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E8E8E5] flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#171717] border border-[#E8E8E5] flex items-center justify-center transition-all shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative flex-1 bg-[#181818] min-h-[300px] md:min-h-[450px]">
              <Image
                src={selectedProject.featured_image || "/images/architecture_exterior_1.jpg"}
                alt={selectedProject.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full md:w-[380px] p-6 md:p-8 bg-[#F7F7F5] border-t md:border-t-0 md:border-l border-[#E8E8E5] flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="inline-block bg-[#171717] text-white px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-[#171717] mb-2">{selectedProject.name}</h3>
                <p className="text-xs font-mono text-[#6B6B6B] mb-6">Client: {selectedProject.client}</p>

                <div className="space-y-3 mb-6 text-xs border-y border-[#E8E8E5] py-4 font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Location</span>
                    <span className="font-semibold text-[#171717]">{selectedProject.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Built Area</span>
                    <span className="font-semibold text-[#171717]">{selectedProject.area || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Year</span>
                    <span className="font-semibold text-[#171717]">{selectedProject.completion_year}</span>
                  </div>
                </div>

                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/projects/${selectedProject.id}`}
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-3.5 rounded-full bg-[#171717] text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#2A2A28] transition-all shadow-md"
                >
                  <span>VIEW FULL CASE STUDY →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
