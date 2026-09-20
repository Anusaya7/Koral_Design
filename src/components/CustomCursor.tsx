"use client";

import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch or prefers-reduced-motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setTargetPos({ x: e.clientX, y: e.clientY });

      // Check hovered elements for context text
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest("[data-cursor='project']");
      const exploreEl = target.closest("[data-cursor='explore']");
      const openEl = target.closest("[data-cursor='open']");
      const buttonEl = target.closest("button, a, select, input, textarea");

      if (projectEl) {
        setCursorText("VIEW PROJECT");
        setIsHovered(true);
      } else if (exploreEl) {
        setCursorText("EXPLORE");
        setIsHovered(true);
      } else if (openEl) {
        setCursorText("OPEN");
        setIsHovered(true);
      } else if (buttonEl) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Smooth lerp animation loop for architectural dot
  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;

    const render = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.25,
        y: prev.y + (targetPos.y - prev.y) * 0.25,
      }));
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPos, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block select-none transition-opacity duration-300"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Precision Center Dot */}
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-200 ${
          cursorText
            ? "px-3 py-1.5 bg-[#171717] text-white border border-white/30 text-[10px] font-mono tracking-widest uppercase shadow-2xl"
            : isHovered
            ? "w-8 h-8 bg-white/20 backdrop-blur-xs border border-white/60"
            : "w-3.5 h-3.5 bg-[#171717] border border-white/40"
        }`}
      >
        {cursorText && <span className="whitespace-nowrap font-bold">{cursorText}</span>}
      </div>
    </div>
  );
}
