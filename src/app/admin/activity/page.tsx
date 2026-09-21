"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Activity, RefreshCw } from "lucide-react";

interface ActivityLog {
  id: number;
  user_name: string;
  action: string;
  target_table: string;
  record_id?: number;
  details?: string;
  ip_address?: string;
  created_at: string;
}

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      const res = await fetch("/api/admin/activity?limit=100");
      const data = await res.json();
      if (Array.isArray(data)) {
        setLogs(data);
      }
    } catch (err) {
      console.error("Error loading activity logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const getActionBadgeClass = (action: string) => {
    if (action.includes("CREATE")) return "bg-emerald-100 text-emerald-900 border border-emerald-300";
    if (action.includes("UPDATE")) return "bg-blue-100 text-blue-900 border border-blue-300";
    if (action.includes("DELETE")) return "bg-rose-100 text-rose-900 border border-rose-300";
    if (action.includes("LOGIN")) return "bg-purple-100 text-purple-900 border border-purple-300";
    return "bg-stone-100 text-stone-800 border border-stone-200";
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E8E5]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#6B6B6B] uppercase block mb-1">
              12 / AUDIT TRAIL
            </span>
            <h1 className="text-3xl font-bold text-[#171717] tracking-tight uppercase">
              SYSTEM ACTIVITY &amp; AUDIT LOG
            </h1>
            <p className="text-xs font-mono text-[#6B6B6B] mt-1">
              Comprehensive tamper-evident history of content edits, status updates, logins, and project mutations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white border border-[#E8E8E5] text-xs font-mono font-bold text-[#171717]">
              {logs.length} LOGGED EVENTS
            </span>

            <button
              onClick={loadLogs}
              className="p-2.5 rounded-full border border-[#E8E8E5] bg-white text-[#171717] hover:bg-[#F7F7F5] transition-colors"
              title="Refresh Activity Log"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E5] overflow-hidden shadow-2xs">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-[#6B6B6B]">
              LOADING AUDIT LOGS...
            </div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-xs font-mono text-[#6B6B6B] space-y-2">
              <Activity className="w-8 h-8 text-[#6B6B6B] mx-auto opacity-50" />
              <p>NO AUDIT LOGS RECORDED YET.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#E8E8E5] bg-[#F7F7F5] text-[#6B6B6B] uppercase">
                    <th className="py-3.5 px-4">TIMESTAMP</th>
                    <th className="py-3.5 px-4">ACTOR</th>
                    <th className="py-3.5 px-4">ACTION</th>
                    <th className="py-3.5 px-4">ENTITY</th>
                    <th className="py-3.5 px-4">EVENT DETAILS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E5]">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F7F7F5] transition-colors">
                      <td className="py-3.5 px-4 text-[#6B6B6B] whitespace-nowrap">
                        {log.created_at ? new Date(log.created_at).toLocaleString() : "Just now"}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#171717] whitespace-nowrap">
                        {log.user_name || "System"}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getActionBadgeClass(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#171717] font-semibold whitespace-nowrap">
                        {log.target_table} {log.record_id ? `#${log.record_id}` : ""}
                      </td>
                      <td className="py-3.5 px-4 text-[#6B6B6B] max-w-md truncate">
                        {log.details || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
