"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Layers,
  Mail,
  FileText,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("Admin");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unauthorized");
      })
      .then((data) => {
        setAuthenticated(data.authenticated);
        if (data.username) setUsername(data.username);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    router.push("/admin");
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#181818] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>VERIFYING PRACTICE SECURITY SESSION...</span>
        </div>
      </div>
    );
  }

  // Render Login Screen if not authenticated
  if (!authenticated) {
    return <AdminLoginScreen onLoginSuccess={() => setAuthenticated(true)} />;
  }

  const navGroups = [
    {
      group: "MAIN",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard, tag: "01" },
      ],
    },
    {
      group: "CONTENT",
      items: [
        { label: "Projects", href: "/admin/projects", icon: Building2, tag: "02" },
        { label: "Services", href: "/admin/services", icon: Layers, tag: "03" },
        { label: "Careers", href: "/admin/careers", icon: Briefcase, tag: "04" },
      ],
    },
    {
      group: "COMMUNICATION",
      items: [
        { label: "Enquiries", href: "/admin/enquiries", icon: Mail, tag: "05" },
      ],
    },
    {
      group: "SYSTEM",
      items: [
        { label: "Site Content", href: "/admin/content", icon: FileText, tag: "06" },
        { label: "Media Library", href: "/admin/media", icon: ImageIcon, tag: "07" },
      ],
    },
  ];

  // Helper function to derive page title
  const getPageTitle = () => {
    if (pathname === "/admin") return { num: "01", title: "DASHBOARD OVERVIEW" };
    if (pathname.startsWith("/admin/projects")) return { num: "02", title: "PROJECT PORTFOLIO MANAGEMENT" };
    if (pathname.startsWith("/admin/services")) return { num: "03", title: "SERVICES PRACTICE MANAGEMENT" };
    if (pathname.startsWith("/admin/careers")) return { num: "04", title: "CAREERS & OPEN POSITIONS" };
    if (pathname.startsWith("/admin/enquiries")) return { num: "05", title: "CLIENT ENQUIRIES DATABASE" };
    if (pathname.startsWith("/admin/content")) return { num: "06", title: "WEBSITE CONTENT CMS" };
    if (pathname.startsWith("/admin/media")) return { num: "07", title: "MEDIA LIBRARY & ASSETS" };
    return { num: "00", title: "PRACTICE CONTROL CENTER" };
  };

  const pageMeta = getPageTitle();

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171717] flex flex-col md:flex-row font-sans selection:bg-[#171717] selection:text-white">
      
      {/* Mobile Topbar */}
      <div className="md:hidden bg-[#181818] text-white p-4 flex items-center justify-between z-40 border-b border-[#2A2A28]">
        <div className="flex items-center gap-3">
          <div className="relative h-7 w-[150px]">
            <Image
              src="/images/logo/korals_logo_white.svg"
              alt="Korals Design Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="text-[9px] font-mono text-emerald-400 border border-emerald-400/30 px-1.5 py-0.5 rounded">
            ADMIN
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Toggle Sidebar Menu"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 animate-fade-in"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#181818] text-white z-50 flex flex-col justify-between p-6 transition-transform duration-300 border-r border-[#2A2A28] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Sidebar Branding Header */}
          <div className="border-b border-white/10 pb-6">
            <Link href="/" className="inline-block">
              <div className="relative h-9 w-[190px]">
                <Image
                  src="/images/logo/korals_logo_white.svg"
                  alt="Korals Design Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <div className="flex items-center justify-between mt-2 pt-1">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                KD / CONTROL CENTER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {navGroups.map((group) => (
              <div key={group.group} className="space-y-2">
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block px-3">
                  {group.group}
                </span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 ${
                          isActive
                            ? "bg-white text-[#171717] font-bold shadow-md"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        {isActive ? (
                          <ChevronRight className="w-3.5 h-3.5 text-[#171717]" />
                        ) : (
                          <span className="text-[9px] opacity-40 font-mono">{item.tag}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px] border border-emerald-500/30">
                AD
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-white font-mono">{username}</p>
                <p className="text-[9px] text-emerald-400 font-mono">PRACTICE ADMIN</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-white/70 hover:text-rose-300 transition-colors"
              title="Logout from CMS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-[11px] font-mono flex items-center justify-center gap-2 transition-all border border-white/10"
          >
            <span>VIEW LIVE WEBSITE</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Desktop Top Header Bar */}
        <header className="bg-white border-b border-[#E8E8E5] py-4 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F7F5] border border-[#E8E8E5] text-[#171717] font-bold">
              {pageMeta.num}
            </span>
            <h1 className="text-sm sm:text-base font-bold text-[#171717] tracking-tight uppercase">
              {pageMeta.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#6B6B6B] hover:text-[#171717] transition-colors"
            >
              <span>PUBLIC SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="h-4 w-[1px] bg-[#E8E8E5] hidden sm:block" />

            <div className="flex items-center gap-2 text-xs font-mono text-[#171717]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold">{username}</span>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs font-mono text-rose-600 hover:underline uppercase flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LOGOUT</span>
            </button>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="p-6 sm:p-8 md:p-10 flex-1 space-y-8">
          {children}
        </main>

        {/* Admin Footer */}
        <footer className="py-4 px-6 md:px-10 border-t border-[#E8E8E5] bg-white text-[11px] font-mono text-[#6B6B6B] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KORALS DESIGN PVT LTD • DIGITAL PRACTICE CONTROL CENTER</span>
          <span>PUNE HEADQUARTERS</span>
        </footer>

      </div>
    </div>
  );
}

// Subcomponent: Architectural Admin Login Screen
function AdminLoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Invalid username or password.");
      }
      onLoginSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid admin credentials";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans selection:bg-white selection:text-[#181818]">
      {/* Background Architectural Technical Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Top Header Label */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
          00 / AUTHENTICATION
        </span>
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          KORALS DESIGN PVT LTD
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10">
        <div className="bg-[#222222] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8">
          
          <div className="text-center space-y-3">
            <div className="relative h-11 w-[220px] mx-auto">
              <Image
                src="/images/logo/korals_logo_white.svg"
                alt="Korals Design Pvt Ltd Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="pt-2">
              <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase block">
                DIGITAL PRACTICE CONTROL CENTER
              </span>
              <p className="text-xs text-white/80 mt-1 font-normal">
                Authorized Architectural Administrator Access
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-mono">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono uppercase text-white/70 tracking-widest mb-2">
                ADMIN USERNAME *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#181818] border-b-2 border-white/30 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors rounded-t-lg"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-white/70 tracking-widest mb-2">
                SECURITY PASSWORD *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#181818] border-b-2 border-white/30 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors rounded-t-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-white text-[#171717] font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#F0F0ED] transition-all shadow-xl disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3.5 h-3.5 border-2 border-[#171717]/30 border-t-[#171717] rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#171717]" />
                  <span>SIGN IN TO CONTROL CENTER</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center text-[10px] font-mono text-white/40 pt-4 border-t border-white/10 space-y-1">
            <p>201, Laxmi Narayan, Parvati, Pune - 411030</p>
            <p>Direct: +020 - 24324648 | projects@koralsdesign.com</p>
          </div>

        </div>
      </div>

      {/* Bottom Footer Label */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full relative z-10 text-[10px] font-mono text-white/40">
        <span>KORALS DESIGN ARCHITECTURE &amp; ENGINEERING</span>
        <span>PUNE, INDIA</span>
      </div>
    </div>
  );
}
