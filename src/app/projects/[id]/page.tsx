import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, ChevronLeft, Calendar, Maximize2 } from "lucide-react";
import db from "@/lib/db";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = db
    .prepare("SELECT * FROM projects WHERE id = ? OR LOWER(name) = LOWER(?)")
    .get(resolvedParams.id, resolvedParams.id) as { name: string; description: string } | undefined;

  if (!project) {
    return {
      title: "Project Not Found | Korals Design Private Limited",
    };
  }

  return {
    title: `${project.name} | Architectural Case Study | KORALS DESIGN PVT LTD`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = db
    .prepare("SELECT * FROM projects WHERE id = ? OR LOWER(name) = LOWER(?)")
    .get(resolvedParams.id, resolvedParams.id) as {
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
  } | undefined;

  if (!project) {
    notFound();
  }

  let gallery: string[] = [];
  if (project.gallery_images) {
    try {
      gallery = JSON.parse(project.gallery_images);
    } catch {
      gallery = [];
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#181818] text-white overflow-hidden border-b border-[#2A2A28]">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-arch-grid-dark" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
          
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/70 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK TO SELECTED PROJECTS</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-mono uppercase tracking-wider border border-white/20">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
              {project.name}
            </h1>
            <p className="text-sm sm:text-base text-white/70 font-mono">
              CLIENT: <span className="text-white font-bold">{project.client}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Case Study Content */}
      <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Image Showcase (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-[#181818] border border-[#E8E8E5] shadow-2xl">
                <Image
                  src={project.featured_image || "/images/hero_villa_render.jpg"}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {gallery.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-[#E8E8E5]">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6B6B6B] block">
                    PROJECT GALLERY &amp; DRAWINGS
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    {gallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#181818] border border-[#E8E8E5]">
                        <Image src={img} alt={`${project.name} view ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Meta Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#F7F7F5] rounded-3xl p-8 md:p-10 border border-[#E8E8E5] shadow-xs space-y-8">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6B6B6B] block mb-2">
                  TECHNICAL SPECIFICATIONS
                </span>
                <h3 className="text-2xl font-bold text-[#171717]">{project.name}</h3>
              </div>

              <div className="space-y-4 text-xs font-mono border-y border-[#E8E8E5] py-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">CLIENT</span>
                  <span className="font-bold text-[#171717] text-right">{project.client}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">CATEGORY</span>
                  <span className="font-bold text-[#171717] text-right">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">LOCATION</span>
                  <span className="font-bold text-[#171717] text-right flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                    {project.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">BUILT AREA / SCALE</span>
                  <span className="font-bold text-[#171717] text-right flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#171717]" />
                    {project.area || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">COMPLETION YEAR</span>
                  <span className="font-bold text-[#171717] text-right flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#171717]" />
                    {project.completion_year}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#171717] block mb-2">
                  CASE STUDY OVERVIEW
                </span>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E8E5]">
                <Link
                  href="/contact"
                  className="w-full py-4 rounded-full bg-[#171717] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2A2A28] transition-all shadow-md"
                >
                  <span>INQUIRE ABOUT THIS PROJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
