'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Layers, ArrowUpRight, Building2, CheckCircle } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  area?: string | null;
  client?: string | null;
  year?: string | null;
  shortDesc: string;
  coverImage: string;
  isFeatured?: boolean;
}

interface ProjectsGridProps {
  projects: ProjectItem[];
  showFilters?: boolean;
  featuredOnly?: boolean;
}

const CATEGORIES = [
  'All',
  'Industrial',
  'Architecture',
  'Government',
  'Corporate',
  'Institutional',
  'Infrastructure',
];

export default function ProjectsGrid({ projects = [], showFilters = true, featuredOnly = false }: ProjectsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  let filteredProjects = featuredOnly
    ? projects.filter((p) => p.isFeatured)
    : projects;

  if (selectedCategory !== 'All') {
    filteredProjects = filteredProjects.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredProjects = filteredProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        (p.client && p.client.toLowerCase().includes(q))
    );
  }

  return (
    <div className="space-y-10">
      {/* Filtering & Search Bar */}
      {showFilters && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by name, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Grid Container */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded border border-slate-800 space-y-3">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Projects Found</h3>
          <p className="text-sm text-slate-400">Try adjusting your category filter or search query.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id || project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between transition-all duration-300"
              >
                {/* Image Cover */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-[11px] font-semibold uppercase tracking-wider rounded">
                    {project.category}
                  </span>

                  {project.slug === 'suzlon' && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded shadow-md">
                      Ahead of Schedule
                    </span>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{project.location}</span>
                      {project.area && (
                        <>
                          <span>•</span>
                          <span className="text-amber-400">{project.area}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    {project.client && (
                      <span className="text-xs text-slate-400 truncate max-w-[180px]">
                        Client: {project.client}
                      </span>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 ml-auto"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
