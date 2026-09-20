import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ChevronLeft, CheckCircle2, Mail } from "lucide-react";
import db from "@/lib/db";

interface CareerPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CareerPageProps) {
  const resolvedParams = await params;
  const career = db
    .prepare("SELECT * FROM careers WHERE id = ?")
    .get(resolvedParams.id) as { title: string; description: string } | undefined;

  if (!career) {
    return {
      title: "Position Not Found | Korals Design Private Limited",
    };
  }

  return {
    title: `${career.title} | Careers | KORALS DESIGN PVT LTD`,
    description: career.description,
  };
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const resolvedParams = await params;
  const career = db
    .prepare("SELECT * FROM careers WHERE id = ?")
    .get(resolvedParams.id) as {
    id: number;
    title: string;
    location: string;
    employment_type: string;
    description: string;
    requirements: string;
    application_email: string;
    is_published: number;
  } | undefined;

  if (!career || !career.is_published) {
    notFound();
  }

  const reqs = career.requirements ? career.requirements.split(";") : [];

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#181818] text-white overflow-hidden border-b border-[#2A2A28]">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-arch-grid-dark" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
          
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/70 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK TO OPEN POSITIONS</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-mono uppercase tracking-wider border border-white/20">
                {career.employment_type}
              </span>
              <span className="text-xs font-mono text-white/60 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {career.location}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
              {career.title}
            </h1>

            <p className="text-sm sm:text-base text-white/70 font-mono">
              KORALS DESIGN PRIVATE LIMITED • PUNE PRACTICE
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6B6B6B] block mb-2">
                  POSITION OVERVIEW
                </span>
                <h2 className="text-3xl font-bold text-[#171717] mb-4">About the Role</h2>
                <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-normal whitespace-pre-line">
                  {career.description}
                </p>
              </div>

              {reqs.length > 0 && (
                <div className="bg-[#F7F7F5] p-8 rounded-3xl border border-[#E8E8E5] space-y-6">
                  <h3 className="text-xl font-bold text-[#171717]">
                    Key Responsibilities &amp; Requirements
                  </h3>
                  <div className="space-y-3">
                    {reqs.map((r, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E8E8E5]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-[#171717]">{r.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Meta Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#F7F7F5] rounded-3xl p-8 md:p-10 border border-[#E8E8E5] shadow-xs space-y-8 lg:sticky lg:top-36">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6B6B6B] block mb-2">
                  JOB SPECIFICATIONS
                </span>
                <h3 className="text-2xl font-bold text-[#171717]">{career.title}</h3>
              </div>

              <div className="space-y-4 text-xs font-mono border-y border-[#E8E8E5] py-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">LOCATION</span>
                  <span className="font-bold text-[#171717]">{career.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">TYPE</span>
                  <span className="font-bold text-[#171717]">{career.employment_type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">PRACTICE</span>
                  <span className="font-bold text-[#171717]">KORALS DESIGN PVT LTD</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${career.application_email || "projects@koralsdesign.com"}?subject=Application for ${encodeURIComponent(career.title)}`}
                  className="w-full py-4 rounded-full bg-[#171717] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2A2A28] transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>APPLY VIA EMAIL</span>
                </a>

                <p className="text-[11px] font-mono text-[#6B6B6B] text-center">
                  Direct email: {career.application_email || "projects@koralsdesign.com"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
