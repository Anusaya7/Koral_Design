"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Bell, CheckCheck, Trash2, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  link: string | null;
  is_read: number;
  created_at: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(false);

  const loadNotifications = useCallback(async () => {
    try {
      const url = `/api/notifications?limit=100${filterUnread ? "&unreadOnly=true" : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount || 0);
        setTotalCount(data.totalCount || 0);
      }
    } catch (err) {
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [filterUnread]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      await loadNotifications();
    } catch (err) {
      console.error("Error marking all read:", err);
    }
  };

  const handleMarkSingleRead = async (id: number) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking read:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/notifications?id=${id}`, { method: "DELETE" });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to clear all notifications?")) return;
    try {
      await fetch("/api/notifications?clearAll=true", { method: "DELETE" });
      setNotifications([]);
      setUnreadCount(0);
      setTotalCount(0);
    } catch (err) {
      console.error("Error clearing all notifications:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              09 / NOTIFICATIONS CENTER
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              NOTIFICATIONS &amp; INCOMING ALERTS
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Live automated system events: contact form inquiries, job applications, and client interactions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadNotifications}
              className="p-2.5 rounded-full border border-[#E8E8E5] bg-white text-[#171717] hover:bg-[#F7F7F5] transition-colors"
              title="Refresh Notifications"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#171717] text-white text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] transition-all shadow-xs"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>MARK ALL AS READ</span>
              </button>
            )}

            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-rose-200 text-rose-700 bg-rose-50 text-xs font-mono font-bold uppercase hover:bg-rose-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>CLEAR ALL</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 font-mono text-xs border-b border-[#E8E8E5] pb-4">
          <button
            onClick={() => setFilterUnread(false)}
            className={`px-4 py-2 rounded-full font-bold uppercase transition-all cursor-pointer ${
              !filterUnread
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            ALL ALERTS ({totalCount})
          </button>

          <button
            onClick={() => setFilterUnread(true)}
            className={`px-4 py-2 rounded-full font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
              filterUnread
                ? "bg-[#171717] text-white shadow-xs"
                : "bg-white text-[#171717] border border-[#E8E8E5] hover:border-[#171717]"
            }`}
          >
            <span>UNREAD ALERTS</span>
            {unreadCount > 0 && (
              <span className="bg-rose-600 text-white px-1.5 py-0.2 rounded-full text-[10px]">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden shadow-2xs divide-y divide-[#E8E8E5]">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-[#6B6B6B]">
              LOADING NOTIFICATIONS...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center text-xs font-mono text-[#6B6B6B] space-y-2">
              <Bell className="w-8 h-8 text-[#6B6B6B] mx-auto opacity-50" />
              <p>NO NOTIFICATIONS LOGGED.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  !n.is_read ? "bg-amber-50/50" : "hover:bg-[#F7F7F5]"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    {!n.is_read ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-300 shrink-0" />
                    )}
                    <span className="text-[10px] font-mono uppercase bg-[#171717] text-white px-2 py-0.5 rounded font-bold">
                      {n.type}
                    </span>
                    <h3 className="text-sm font-bold text-[#171717] font-mono">{n.title}</h3>
                  </div>

                  <p className="text-xs text-[#6B6B6B] font-sans pl-5 leading-relaxed">
                    {n.message}
                  </p>

                  <span className="text-[10px] font-mono text-[#6B6B6B] pl-5 block">
                    {n.created_at ? new Date(n.created_at).toLocaleString() : "Recently"}
                  </span>
                </div>

                <div className="flex items-center gap-2 pl-5 sm:pl-0 shrink-0">
                  {n.link && (
                    <Link
                      href={n.link}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#E8E8E5] bg-white text-xs font-mono font-bold text-[#171717] hover:bg-[#F7F7F5]"
                    >
                      <span>VIEW RECORD</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}

                  {!n.is_read && (
                    <button
                      onClick={() => handleMarkSingleRead(n.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#171717] text-white text-xs font-mono font-bold uppercase hover:bg-[#2A2A28]"
                      title="Mark as read"
                    >
                      MARK READ
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(n.id)}
                    className="p-1.5 text-[#6B6B6B] hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
