"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, Menu, X, ShieldCheck, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PROJECTS", href: "/projects" },
    { label: "SERVICES", href: "/services" },
    { label: "CAREERS", href: "/careers" },
    { label: "CONTACT", href: "/contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Determine logo source based on mode and scroll state across all public pages
  const isDarkVisual = theme === "dark" || !scrolled;
  const logoSrc = isDarkVisual
    ? "/images/logo/korals_logo_white.svg"
    : "/images/logo/korals_logo.svg";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-[#181818]/95 backdrop-blur-md py-3.5 border-b border-[#2A2A28] shadow-xs text-white"
            : "bg-white/95 backdrop-blur-md py-3.5 border-b border-[#E8E8E5] shadow-xs text-[#171717]"
          : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 border-b border-white/10 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Official KORALS DESIGN Brand Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-3 group"
          aria-label="KORALS DESIGN PVT LTD Homepage"
        >
          <div className="relative h-11 sm:h-12 w-[220px] sm:w-[260px] transition-transform duration-300 group-hover:scale-[1.01]">
            <Image
              src={logoSrc}
              alt="KORALS DESIGN PVT LTD Logo"
              fill
              className="object-contain object-left transition-opacity duration-300"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const isDarkNav = theme === "dark" || !scrolled;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-[13px] font-mono tracking-widest transition-all py-1 ${
                  isDarkNav
                    ? isActive
                      ? "text-white font-bold"
                      : "text-white/70 hover:text-white"
                    : isActive
                    ? "text-[#171717] font-bold"
                    : "text-[#171717]/70 hover:text-[#171717]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                      isDarkNav ? "bg-white" : "bg-[#171717]"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls: Mode Toggle + Studio CTA */}
        <div className="hidden lg:flex items-center gap-3.5">
          
          {/* Architectural Light / Dark Mode Control */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`h-9 px-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
              theme === "dark" || !scrolled
                ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                : "bg-[#F7F7F5] hover:bg-[#E8E8E5] border-[#E8E8E5] text-[#171717]"
            }`}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">DARK</span>
              </>
            )}
          </button>

          {/* Primary Studio Header CTA Button */}
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group ${
              scrolled && theme === "light"
                ? "bg-[#171717] text-white hover:bg-[#2A2A28]"
                : "bg-white text-[#171717] hover:bg-[#F0F0ED] border border-white/40"
            }`}
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

        {/* Mobile Controls: Compact Mode Toggle + Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          
          {/* Mobile Quick Mode Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={`p-2 rounded-xl border transition-colors ${
              theme === "dark" || !scrolled
                ? "bg-white/10 border-white/20 text-white"
                : "bg-[#F7F7F5] border-[#E8E8E5] text-[#171717]"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className={`p-2 rounded-xl transition-colors ${
              scrolled && theme === "light"
                ? "text-[#171717] hover:bg-[#E8E8E5]/50"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className={`lg:hidden fixed inset-x-0 top-[65px] px-6 py-6 shadow-xl animate-fade-in z-50 border-b transition-colors ${
          theme === "dark"
            ? "bg-[#181818] border-[#2A2A28] text-white"
            : "bg-[#F7F7F5] border-[#E8E8E5] text-[#171717]"
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm font-mono tracking-wider py-3 border-b flex items-center justify-between transition-colors ${
                    theme === "dark" ? "border-white/10" : "border-[#E8E8E5]"
                  } ${
                    isActive
                      ? "font-bold text-emerald-500"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </Link>
              );
            })}

            {/* Mobile Theme Mode Row */}
            <div className={`flex items-center justify-between py-3 border-b font-mono text-xs ${
              theme === "dark" ? "border-white/10" : "border-[#E8E8E5]"
            }`}>
              <span className="uppercase opacity-70">DESIGN SYSTEM MODE</span>
              <button
                onClick={toggleTheme}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-[#E8E8E5] border-[#D0D0CD] text-[#171717]"
                }`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>LIGHT MODE</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>DARK MODE</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-mono font-bold tracking-wider uppercase bg-[#171717] text-white dark:bg-white dark:text-[#171717] rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>START A PROJECT</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
