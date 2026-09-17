"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E8E8E5] pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Info (Span 2 cols on desktop) */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="2nd Inversion Musical School">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-bold font-mono text-lg shadow-inner">
                2nd
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-lg text-[#171717] leading-tight">
                  2nd Inversion
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6B6B]">
                  Musical School
                </span>
              </div>
            </Link>

            <p className="text-[#6B6B6B] max-w-sm leading-relaxed mb-6 text-xs">
              Premier musical academy offering instrument masterclasses, vocal coaching, music theory, and live performance ensemble training in Pune, Maharashtra.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-2 text-[#171717] text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#6B6B6B] shrink-0 mt-0.5" />
                <span>201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6B6B6B] shrink-0" />
                <div className="flex items-center gap-3 font-mono">
                  <a href="tel:+02024324648" className="hover:underline">+020 - 24324648</a>
                  <span>•</span>
                  <a href="tel:+919822864648" className="hover:underline">+91 9822864648</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#6B6B6B] shrink-0" />
                <a href="mailto:info@2ndinversion.com" className="font-mono text-[#171717] font-semibold hover:underline">
                  info@2ndinversion.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#171717] uppercase tracking-wider mb-4 font-mono text-[11px]">Navigation</h4>
            <ul className="space-y-2.5 text-[#6B6B6B]">
              <li>
                <Link href="/" className="hover:text-[#171717] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#171717] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#171717] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#171717] transition-colors">Projects Portfolio</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#171717] transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#171717] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services Quick List */}
          <div>
            <h4 className="font-bold text-[#171717] uppercase tracking-wider mb-4 font-mono text-[11px]">Programs</h4>
            <ul className="space-y-2.5 text-[#6B6B6B]">
              <li>
                <Link href="/services" className="hover:text-[#171717] transition-colors">Instrument Masterclasses</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#171717] transition-colors">Vocal Coaching &amp; Pitch</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#171717] transition-colors">Music Theory &amp; Ear Training</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#171717] transition-colors">Ensemble &amp; Live Band</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#171717] transition-colors">Studio Recording Techniques</Link>
              </li>
            </ul>
          </div>

          {/* Admin & Portals */}
          <div>
            <h4 className="font-bold text-[#171717] uppercase tracking-wider mb-4 font-mono text-[11px]">Management</h4>
            <ul className="space-y-2.5 text-[#6B6B6B]">
              <li>
                <Link href="/admin" className="hover:text-[#171717] transition-colors flex items-center gap-1 font-semibold text-[#171717]">
                  <span>Admin CMS Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#171717] transition-colors">Open Job Positions</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#171717] transition-colors">Business Enquiries</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E8E8E5] flex flex-col md:flex-row items-center justify-between text-[#6B6B6B] gap-4">
          <p>© 2026 2nd Inversion Musical School. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[11px]">
            <span>HQ: <span className="font-medium text-[#171717]">Pune, Maharashtra</span></span>
            <div className="flex flex-wrap items-center gap-3">
              <span>Status: <span className="text-emerald-600 font-medium">Operations Active</span></span>
              <span className="text-[#6B6B6B]/40 font-light select-none">|</span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 font-medium text-[#171717] hover:text-[#000000] transition-all px-2.5 py-1 rounded-full bg-[#F7F7F5] hover:bg-[#E8E8E5] border border-[#E8E8E5] hover:border-[#171717]/30 shadow-2xs font-mono text-[11px] focus:outline-hidden focus:ring-2 focus:ring-[#171717]/20"
                aria-label="Access Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#171717]" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

