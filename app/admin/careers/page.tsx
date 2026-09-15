'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Users, Plus, Edit, Trash2, ExternalLink, CheckCircle2, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  isPublished: boolean;
  _count?: { applications: number };
}

interface JobApplication {
  id: string;
  position: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl?: string | null;
  coverMessage?: string | null;
  status: string;
  createdAt: string;
}

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Architectural Planning',
    location: 'Pune, Maharashtra',
    experience: '3-5 Years',
    type: 'Full-time',
    description: '',
    requirements: '',
    responsibilities: '',
    isPublished: true,
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/careers');
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (data.applications) setApplications(data.applications);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchJobs(), fetchApplications()]).finally(() => setLoading(false));
  }, []);

  const openCreateJob = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'Architectural Planning',
      location: 'Pune, Maharashtra',
      experience: '3-5 Years',
      type: 'Full-time',
      description: '',
      requirements: '',
      responsibilities: '',
      isPublished: true,
    });
    setJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingJob ? `/api/careers/${editingJob.id}` : '/api/careers';
      const method = editingJob ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setJobModalOpen(false);
        fetchJobs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Delete this job posting?')) return;
    try {
      await fetch(`/api/careers/${id}`, { method: 'DELETE' });
      fetchJobs();
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async (appId: string, status: string) => {
    try {
      await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchApplications();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Careers & Job Applicants</h1>
          <p className="text-xs text-slate-400">Manage job postings and review submitted candidate resumes</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-1.5 text-xs font-bold rounded ${activeTab === 'jobs' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
            >
              Job Openings ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-1.5 text-xs font-bold rounded ${activeTab === 'applications' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
            >
              Applications ({applications.length})
            </button>
          </div>

          {activeTab === 'jobs' && (
            <button
              onClick={openCreateJob}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase text-slate-950 bg-amber-400 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Post Job</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase">{job.department}</span>
                  <span className="text-[10px] text-slate-400">{job.experience} • {job.type}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">{job.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{job.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Applications: {job._count?.applications || 0}</span>
                <div className="space-x-2">
                  <button onClick={() => handleDeleteJob(job.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Candidate</th>
                <th className="p-4">Applied Position</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Resume Link</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">{app.name}</td>
                  <td className="p-4 text-amber-400 font-semibold">{app.position}</td>
                  <td className="p-4 text-xs">
                    <div>{app.email}</div>
                    <div className="text-slate-400">{app.phone}</div>
                  </td>
                  <td className="p-4 text-xs">
                    {app.resumeUrl ? (
                      <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                        <span>View Resume</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-500">None</span>
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    >
                      {['New', 'Shortlisted', 'Interview', 'Rejected', 'Selected'].map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-xs text-slate-400">{formatDate(app.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Post Job Modal */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-lg">Post New Job Position</h2>
              <button onClick={() => setJobModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveJob} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Job Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Department *</label>
                  <input type="text" required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Experience *</label>
                  <input type="text" required value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white" />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Job Description *</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-white" />
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setJobModalOpen(false)} className="px-4 py-2 text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded">Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
