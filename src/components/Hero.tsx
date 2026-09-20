"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Pause, ChevronDown } from "lucide-react";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tiltPos, setTiltPos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check mobile breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check prefers-reduced-motion safely inside effect
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setTimeout(() => {
        setReducedMotion(true);
        setIsPlaying(false);
      }, 0);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    // Subtle desktop cursor tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || mediaQuery.matches) return;
      const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      setTiltPos({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section id="hero-section" className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#181818] text-white">
      
      {/* 1. Full-Screen Architectural Background Video / Image Layer */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${tiltPos.x}px, ${tiltPos.y}px, 0) scale(1.04)`,
        }}
      >
        <video
          ref={videoRef}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero_villa_render.jpg"
          key={isMobile ? "mobile-video" : "desktop-video"}
          className="w-full h-full object-cover object-center transition-opacity duration-1000"
        >
          <source
            src={isMobile ? "/videos/hero_bg_mobile.mp4" : "/videos/hero_bg.mp4"}
            type="video/mp4"
          />
          <Image
            src="/images/hero_villa_render.jpg"
            alt="KORALS DESIGN Architectural Visualization"
            fill
            className="object-cover"
            priority
          />
        </video>
      </div>

      {/* 2. Premium Subtle Dark Overlay for Editorial Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#181818]/95 z-[1] pointer-events-none" />

      {/* 3. Architectural Technical Linework & Grid System Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] z-[1]" />
      
      {/* Corner Technical Annotations */}
      <div className="absolute top-28 left-6 md:left-12 z-[2] hidden md:block text-[10px] font-mono text-white/40 tracking-widest uppercase">
        <span>01 / HOME</span>
      </div>
      <div className="absolute top-28 right-6 md:right-12 z-[2] hidden md:block text-[10px] font-mono text-white/40 tracking-widest uppercase">
        <span>KD / ARCHITECTURE + ENGINEERING</span>
      </div>

      {/* 4. Hero Main Content Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
        
        {/* Verified Technical Metadata Chips (Soft Corners & Linework) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-widest uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>KD / 01</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-widest uppercase shadow-sm">
            <span>PUNE / INDIA</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-mono tracking-widest uppercase shadow-sm">
            <span>ARCHITECTURE + ENGINEERING</span>
          </div>
        </div>

        {/* Practice Positioning Subtitle */}
        <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white/70 block mb-6">
          ARCHITECTURE • CIVIL ENGINEERING • PROJECT CONSULTANCY
        </span>

        {/* Main Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold text-white tracking-tighter leading-[1.02] max-w-5xl mb-8 drop-shadow-md uppercase">
          DESIGNING SPACES.<br />
          <span className="font-serif italic font-normal text-white/90 lowercase text-4xl sm:text-6xl md:text-7xl lg:text-[88px] pr-2">engineering</span>
          <span className="font-extrabold tracking-tighter text-white">POSSIBILITIES.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-normal leading-relaxed mb-10 drop-shadow-xs">
          Explore opportunities and project solutions that bring architectural design, structural engineering, and statutory project requirements together.
        </p>

        {/* CTA Action Buttons (Soft-Corner Studio Design) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          
          {/* Primary CTA */}
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs font-mono font-bold uppercase tracking-wider bg-white text-[#171717] px-8 py-4 rounded-xl hover:bg-[#F0F0ED] border border-white/40 transition-all duration-200 shadow-xl cursor-pointer group"
          >
            <span>EXPLORE PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-[#171717] group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/25 px-8 py-4 rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-200 shadow-md cursor-pointer"
          >
            <span>OUR SERVICES</span>
          </Link>

        </div>

        {/* Scroll Indicator */}
        <a
          href="#brand-statement"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/70 hover:text-white transition-colors animate-bounce pt-2 uppercase"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </a>

        {/* Floating Video Pause/Play Control Badge */}
        <div className="absolute bottom-4 right-6 md:bottom-6 md:right-12 z-20">
          <button
            onClick={togglePlay}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause Hero Background Video" : "Play Hero Background Video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? "Pause Video" : "Play Video"}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
