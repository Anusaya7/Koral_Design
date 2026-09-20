"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function HomeContactCTA() {
  return (
    <section id="contact-section" className="py-24 md:py-36 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-[#E8E8E5] pb-4 mb-16">
          <span className="text-xs font-mono tracking-widest text-[#171717] font-bold uppercase">
            06 / CONTACT — LET&apos;S BUILD WHAT&apos;S NEXT
          </span>
          <span className="text-xs font-mono text-[#6B6B6B]">
            PUNE HEADQUARTERS
          </span>
        </div>

        {/* Main CTA Block */}
        <div className="bg-[#181818] text-white rounded-3xl p-8 sm:p-14 md:p-20 relative overflow-hidden shadow-2xl border border-[#2A2A28]">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
              KORALS DESIGN PVT LTD
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02]">
              LET&apos;S BUILD <br />
              <span className="italic font-serif font-normal text-white/80">WHAT&apos;S NEXT.</span>
            </h2>

            <p className="text-base sm:text-xl text-white/80 font-normal leading-relaxed">
              Discuss your next architectural, engineering or industrial project with Koral&apos;s Design.
            </p>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-9 py-4 rounded-full hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl"
              >
                <span>START A CONVERSATION →</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Verified Contact Bar */}
            <div className="pt-10 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-white/90">
              <div className="space-y-1">
                <span className="text-white/50 block text-[10px] uppercase">ADDRESS</span>
                <p className="font-sans text-[#FFFFFF] leading-snug">201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune - 411030</p>
              </div>

              <div className="space-y-1">
                <span className="text-white/50 block text-[10px] uppercase">PHONE &amp; MOBILE</span>
                <div className="space-y-0.5">
                  <a href="tel:+02024324648" className="hover:underline block flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>+020 - 24324648</span>
                  </a>
                  <a href="tel:+919822864648" className="hover:underline block flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>+91 9822864648</span>
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-white/50 block text-[10px] uppercase">EMAIL</span>
                <a href="mailto:projects@koralsdesign.com" className="font-bold hover:underline block flex items-center gap-1.5 text-white">
                  <Mail className="w-3 h-3 text-emerald-400" />
                  <span>projects@koralsdesign.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
