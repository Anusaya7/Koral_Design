import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  KORALS DESIGN
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                  Pvt Ltd • Architecture & Engineering
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 font-normal">
              Korals Design Pvt Ltd is a premier architectural, civil engineering, industrial planning, and project consultancy based in Pune, Maharashtra, India. Delivering complete end-to-end design, sanctions, and project execution.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Est. 2005 • Reg. Corporate Consultancy
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white border-l-2 border-amber-500 pl-3">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About Us', 'Services', 'Projects', 'Careers', 'Contact'].map((item) => {
                const href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' us', '').replace(/\s+/g, '-')}`;
                return (
                  <li key={item}>
                    <Link href={href} className="hover:text-amber-400 transition-colors flex items-center gap-1 group">
                      <span>{item}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Key Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white border-l-2 border-amber-500 pl-3">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>Architectural Planning & Design</li>
              <li>Sanctions & Statutory Approvals</li>
              <li>Land Survey & GPR Utility Mapping</li>
              <li>Project Management Consultancy (PMC)</li>
              <li>Project Works & Feasibility Audits</li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white border-l-2 border-amber-500 pl-3">
              Corporate Office
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  201, Laximi Narayan, CTS No. 256B/5, Parvati, Pune, Maharashtra, India - 411030
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="flex flex-col text-xs space-y-0.5">
                  <a href="tel:+02024324648" className="hover:text-amber-400 transition-colors">
                    Tel: +020 - 24324648
                  </a>
                  <a href="tel:+919822864648" className="hover:text-amber-400 transition-colors font-semibold text-white">
                    Mob: +91 9822864648
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:projects@koralsdesign.com" className="hover:text-amber-400 transition-colors">
                  projects@koralsdesign.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Korals Design Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Pune, India</span>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-amber-400 transition-colors underline decoration-slate-700 underline-offset-4">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
