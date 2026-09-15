'use me';
'use client';

import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, CheckCircle2, X, Send, AlertCircle, FileText } from 'lucide-react';

export interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  requirements?: string | null;
  responsibilities?: string | null;
}

interface CareerCardModalProps {
  jobs: JobItem[];
}

export default function CareerCardModal({ jobs = [] }: CareerCardModalProps) {
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverMessage: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyClick = (job: JobItem) => {
    setSelectedJob(job);
    setStatusMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob.id,
          position: selectedJob.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          resumeUrl: formData.resumeUrl || 'Not provided',
          coverMessage: formData.coverMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application.');

      setStatusMessage({
        type: 'success',
        text: 'Your application has been successfully submitted! Our team will get in touch with you.',
      });
      setFormData({ name: '', email: '', phone: '', resumeUrl: '', coverMessage: '' });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'An error occurred while submitting your application.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => {
          let reqs: string[] = [];
          if (job.requirements) {
            try {
              reqs = JSON.parse(job.requirements);
            } catch {
              reqs = job.requirements.split('\n').filter(Boolean);
            }
          }

          return (
            <div
              key={job.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded uppercase tracking-wider">
                    {job.department}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> {job.type}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-white leading-snug">
                  {job.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-300 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> {job.location}
                  </span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">{job.experience}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {job.description}
                </p>

                {reqs.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Requirements:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {reqs.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleApplyClick(job)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-all shadow-md"
              >
                <span>Apply for Position</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Job Application</span>
              <h2 className="font-display font-extrabold text-2xl text-white">
                Applying for: {selectedJob.title}
              </h2>
              <p className="text-xs text-slate-400">
                {selectedJob.department} • {selectedJob.location} • {selectedJob.experience}
              </p>
            </div>

            {statusMessage && (
              <div
                className={`p-4 rounded border text-sm flex items-start gap-3 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Resume / Portfolio Link (Drive / Dropbox)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://drive.google.com/your-resume"
                    value={formData.resumeUrl}
                    onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Cover Message / Key Qualifications
                </label>
                <textarea
                  rows={4}
                  placeholder="Summarize your professional background and relevant experience..."
                  value={formData.coverMessage}
                  onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded transition-all"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
