'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setStatusMessage({
        type: 'success',
        text: 'Thank you! Your inquiry has been received. Our project team will respond within 24 hours.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to send message. Please try calling us directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Contact Form Column */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl space-y-6">
        <div className="space-y-2">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Send an Inquiry</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Discuss Your Next Project With Us
          </h2>
          <p className="text-slate-400 text-sm">
            Fill out the form below for architectural planning, statutory sanctions, or land survey consultations.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone / Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 9822864648"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Subject / Project Type *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. MIDC Approvals, Industrial Master Planning, Land Survey"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Project Description / Scope Details *
            </label>
            <textarea
              rows={5}
              required
              placeholder="Provide plot details, area, timeline, or statutory requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded transition-all shadow-lg shadow-amber-500/20"
          >
            {submitting ? 'Transmitting Inquiry...' : 'Send Inquiry Message'}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Info & Map Column */}
      <div className="lg:col-span-5 space-y-8">
        {/* Verified Corporate Contact Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6 shadow-xl">
          <h3 className="font-display font-bold text-xl text-white border-b border-slate-800 pb-4">
            Corporate Office Details
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Address</span>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  201, Laximi Narayan, CTS No. 256B/5, Parvati, Pune, Maharashtra, India - 411030
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Direct Phone Lines</span>
                <div className="flex flex-col text-sm text-slate-200 space-y-1">
                  <a href="tel:+02024324648" className="hover:text-amber-400 transition-colors">
                    Landline: +020 - 24324648
                  </a>
                  <a href="tel:+919822864648" className="hover:text-amber-400 transition-colors font-bold text-amber-400">
                    Mobile: +91 9822864648
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Official Email</span>
                <a href="mailto:projects@koralsdesign.com" className="text-sm text-slate-200 hover:text-amber-400 transition-colors font-medium">
                  projects@koralsdesign.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Office Hours</span>
                <p className="text-sm text-slate-200">Monday — Saturday: 9:30 AM – 6:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Location Map */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl h-64 relative">
          <iframe
            title="Korals Design Pune Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568285517202!2d73.8504068!3d18.498808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c062c3e120d5%3A0x86b039cb01efaa30!2sParvati%2C%20Pune%2C%20Maharashtra%20411030!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) opacity(0.85)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
