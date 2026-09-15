import React from 'react';
import ContactForm from '@/components/public/ContactForm';

export const metadata = {
  title: 'Contact Us | Corporate Office Pune',
  description: 'Get in touch with Korals Design Pvt Ltd in Pune, Maharashtra. Address: 201, Laximi Narayan, CTS No. 256B/5, Parvati, Pune - 411030. Tel: +020 - 24324648, Mobile: +91 9822864648.',
};

export default function ContactPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20 space-y-12">
      {/* Hero Header */}
      <section className="relative py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <span>Corporate Communication</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Contact Korals Design Pvt Ltd
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed">
            Have an architectural, civil engineering, land survey, or statutory sanction inquiry? Our project directors and consultants are ready to assist.
          </p>
        </div>
      </section>

      {/* Main Interactive Contact Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </div>
  );
}
