'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Calendar,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  area?: string | null;
  client?: string | null;
  year?: string | null;
  shortDesc: string;
  fullDesc: string;
  scopeOfWork?: string | null;
  coverImage: string;
  images?: { id: string; url: string; caption?: string | null }[];
}

interface ProjectDetailViewProps {
  project: ProjectDetail;
  relatedProjects?: { slug: string; title: string; coverImage: string; category: string }[];
}

export default function ProjectDetailView({ project, relatedProjects = [] }: ProjectDetailViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Parse scope of work if stored as JSON or string
  let scopeList: string[] = [];
  if (project.scopeOfWork) {
    try {
      scopeList = JSON.parse(project.scopeOfWork);
    } catch {
      scopeList = project.scopeOfWork.split('\n').filter(Boolean);
    }
  }

  // Combine cover image and gallery images for full lightbox
  const gallery = [
    { id: 'cover', url: project.coverImage, caption: `${project.title} - Main Exterior` },
    ...(project.images || []),
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null && prev < gallery.length - 1 ? prev + 1 : 0));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : gallery.length - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, gallery.length]);

  return (
    <article className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Portfolio</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative h-[480px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded shadow-md">
                {project.category}
              </span>
              {project.slug === 'suzlon' && (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider rounded">
                  Completed Months Ahead of Schedule
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
              {project.shortDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Main Specs & Detailed Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-white border-l-4 border-amber-500 pl-4">
                Project Overview & Vision
              </h2>
              <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-4">
                <p>{project.fullDesc}</p>
              </div>
            </div>

            {/* Scope of Work */}
            {scopeList.length > 0 && (
              <div className="p-8 rounded-lg bg-slate-900 border border-slate-800 space-y-6">
                <h3 className="font-display font-bold text-xl text-amber-400">
                  Engineering & Consultancy Scope of Work
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {scopeList.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-200 leading-relaxed font-normal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Image Gallery */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-white">
                  Project Architectural Gallery ({gallery.length})
                </h3>
                <span className="text-xs text-slate-400">Click any image for full-screen lightbox</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, index) => (
                  <div
                    key={img.id || index}
                    onClick={() => setLightboxIndex(index)}
                    className="group relative h-48 rounded-lg overflow-hidden border border-slate-800 cursor-pointer shadow-lg hover:border-amber-500/50 transition-all"
                  >
                    <img
                      src={img.url}
                      alt={img.caption || project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Project Specifications */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 space-y-6 shadow-xl sticky top-28">
              <h3 className="font-display font-bold text-lg text-white border-b border-slate-800 pb-4">
                Project Details
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-500" /> Category
                  </span>
                  <span className="font-semibold text-white text-right">{project.category}</span>
                </div>

                <div className="flex items-start justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" /> Location
                  </span>
                  <span className="font-semibold text-white text-right">{project.location}</span>
                </div>

                {project.area && (
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/60 pb-3">
                    <span className="text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-500" /> Area
                    </span>
                    <span className="font-bold text-amber-400 text-right">{project.area}</span>
                  </div>
                )}

                {project.client && (
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/60 pb-3">
                    <span className="text-slate-400">Client</span>
                    <span className="font-semibold text-white text-right">{project.client}</span>
                  </div>
                )}

                {project.year && (
                  <div className="flex items-start justify-between gap-2 pb-1">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" /> Year
                    </span>
                    <span className="font-semibold text-white text-right">{project.year}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-all shadow-md"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : gallery.length - 1))
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] p-2 space-y-3 text-center">
            <img
              src={gallery[lightboxIndex].url}
              alt={gallery[lightboxIndex].caption || project.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg mx-auto shadow-2xl border border-slate-800"
            />
            <p className="text-sm text-slate-300 font-medium">
              {gallery[lightboxIndex].caption || `${project.title} - Image ${lightboxIndex + 1} of ${gallery.length}`}
            </p>
          </div>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev !== null && prev < gallery.length - 1 ? prev + 1 : 0))
            }
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </article>
  );
}
