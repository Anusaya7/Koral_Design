'use me';
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Building2,
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Briefcase,
  Users,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  History,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Careers', href: '/admin/careers', icon: Briefcase },
  { name: 'Applications', href: '/admin/applications', icon: Users },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare, badgeKey: 'inquiries' },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Website Content', href: '/admin/content', icon: FileText },
  { name: 'Activity Logs', href: '/admin/logs', icon: History },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;

    // Verify session
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => router.push('/admin/login'));

    // Fetch unread inquiries count
    fetch('/api/inquiries')
      .then((res) => res.json())
      .then((data) => {
        if (data.unreadCount) setUnreadCount(data.unreadCount);
      })
      .catch(() => {});
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 sticky top-0 h-screen justify-between">
        <div className="p-6 space-y-6">
          {/* Admin Header Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                KORALS CMS
              </span>
              <span className="text-[10px] text-amber-400 uppercase font-semibold tracking-wider">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
                    isActive
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badgeKey === 'inquiries' && unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white truncate max-w-[140px]">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                {user?.email || 'admin@koralsdesign.com'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-amber-400 bg-slate-950 border border-slate-800 rounded transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-display font-bold text-base sm:text-lg text-white capitalize">
              {pathname.replace('/admin/', '').replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <Link
                href="/admin/inquiries"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{unreadCount} Unread Inquiry</span>
              </Link>
            )}
            <span className="text-xs text-slate-400 hidden sm:inline">Korals Design CMS v1.0</span>
          </div>
        </header>

        {/* Dynamic Page Children */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md md:hidden flex">
          <div className="w-64 bg-slate-900 h-full p-6 flex flex-col justify-between border-r border-slate-800">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-white text-lg">Menu</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1">
                {ADMIN_NAV.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-amber-500" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-rose-400 font-semibold py-3"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
