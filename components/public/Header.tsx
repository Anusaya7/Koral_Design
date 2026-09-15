'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Building2, PhoneCall } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'SERVICES', href: '/services' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'CAREERS', href: '/careers' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                KORALS DESIGN
              </span>
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400">
                Pvt Ltd • Architecture & Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 text-[11px] font-bold tracking-[0.15em] transition-all rounded ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+919822864648"
              className="text-xs font-semibold text-slate-300 hover:text-amber-400 flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <span>+91 9822864648</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded hover:from-amber-300 hover:to-amber-500 transition-all shadow-md hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 text-xs font-bold tracking-[0.15em] rounded transition-colors ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <a
              href="tel:+919822864648"
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-amber-400"
            >
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>+91 9822864648</span>
            </a>
            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-950 bg-amber-400 rounded hover:bg-amber-300 transition-all shadow-lg"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
