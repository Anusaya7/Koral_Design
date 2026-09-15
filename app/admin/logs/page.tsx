import React from 'react';
import { History, ShieldCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminLogsPage() {
  let logs: any[] = [];
  try {
    logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  } catch (e) {
    logs = [];
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="font-display font-bold text-2xl text-white">System Activity Logs</h1>
        <p className="text-xs text-slate-400">Security audit trail of administrator actions and content edits</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {logs.length === 0 ? (
          <p className="text-center py-12 text-slate-400 text-sm">No activity logs recorded yet.</p>
        ) : (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Action</th>
                <th className="p-4">Module</th>
                <th className="p-4">User</th>
                <th className="p-4">Details</th>
                <th className="p-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-amber-400 text-xs tracking-wider uppercase">{log.action}</td>
                  <td className="p-4 text-xs font-semibold text-white">{log.module}</td>
                  <td className="p-4 text-xs text-slate-300">{log.user}</td>
                  <td className="p-4 text-xs text-slate-400">{log.details || '—'}</td>
                  <td className="p-4 text-xs text-slate-500 text-right">{formatDate(log.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
