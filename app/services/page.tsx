import React from 'react';
import Link from 'next/link';
import {
  Compass,
  FileCheck,
  MapPin,
  Briefcase,
  CheckSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Services & Statutory Sanctions',
  description: 'Comprehensive services provided by Korals Design Pvt Ltd: Architectural Planning, MPCB/MIDC Sanctions, Land Survey & GPR, PMC, and Project Works Consultancy.',
};

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  FileCheck,
  MapPin,
  Briefcase,
  CheckSquare,
};

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (e) {
    services = [];
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20 space-y-20">
      {/* Hero Banner */}
      <section className="relative py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <span>Specialized Capabilities</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Our Architectural & Consultancy Services
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed">
            End-to-End Solutions — Architectural Planning, Statutory Approvals, Precision Land Surveying, PMC, and Technical Feasibility Audits.
          </p>
        </div>
      </section>

      {/* Services Breakdown List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {services.map((service, index) => {
          const Icon = ICON_MAP[service.icon] || Compass;
          let featuresList: string[] = [];
          if (service.features) {
            try {
              featuresList = JSON.parse(service.features);
            } catch {
              featuresList = service.features.split('\n').filter(Boolean);
            }
          }

          const isEven = index % 2 === 0;

          return (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row items-stretch gap-10 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-8 lg:p-10 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image & Number */}
              <div className="lg:w-5/12 relative rounded-lg overflow-hidden min-h-[300px] border border-slate-800">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute top-4 left-4 font-display font-black text-5xl text-amber-400">
                  {service.number}
                </span>
              </div>

              {/* Text Details & Features */}
              <div className="lg:w-7/12 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                      Service {service.number}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {service.title}
                  </h2>

                  <p className="text-slate-300 text-base leading-relaxed">{service.fullDesc}</p>

                  {featuresList.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Key Deliverables & Specifications:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {featuresList.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Korals Design Pvt Ltd • Pune</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Statutory Authorities Grid Section */}
      <section className="py-20 bg-slate-900 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Sanctions & Approvals
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Statutory Authorities & Clearances Handled
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We manage complete technical liaisoning, documentation, filing, and follow-up with key government bodies across Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                code: 'MPCB',
                title: 'Maharashtra Pollution Control Board',
                items: ['Consent to Establish (CTE)', 'Consent to Operate (CTO)', 'Hazardous Waste Authorization'],
              },
              {
                code: 'MIDC',
                title: 'Maharashtra Industrial Dev Corp',
                items: ['Building Plan Sanction', 'Plot Utilization Certificate', 'Water & Sewer Connection NOC'],
              },
              {
                code: 'DISH',
                title: 'Directorate of Industrial Safety',
                items: ['Factory Plan Approval', 'Structural Stability Clearance', 'Safety Audit Documentation'],
              },
              {
                code: 'DSLR / SLR',
                title: 'District Superintendent of Land Records',
                items: ['Government Mojani Sheet', 'Revenue Boundary Demarcation', 'Title Search Clearance'],
              },
              {
                code: 'PMRDA',
                title: 'Pune Metropolitan Region Dev Authority',
                items: ['Development Permissions', 'Regional Plan Layout Approval', 'Infrastructure NOC'],
              },
              {
                code: 'PMC',
                title: 'Pune Municipal Corporation',
                items: ['City Building Approvals', 'Completion & Occupancy Certificate', 'Fire NOC'],
              },
              {
                code: 'PCMC',
                title: 'Pimpri Chinchwad Municipal Corp',
                items: ['Industrial Zone Approvals', 'Sanctioned Layout Maps', 'Environmental Clearances'],
              },
              {
                code: 'Utility Scanning',
                title: 'GPR & EPL Technical Surveys',
                items: ['Underground Pipe Detection', 'Sub-surface Electrical Mapping', 'Contour Modeling'],
              },
            ].map((auth, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-slate-950 border border-slate-800 space-y-3 hover:border-amber-500/50 transition-colors shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="font-display font-black text-xl text-amber-400">{auth.code}</span>
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-bold text-sm text-white">{auth.title}</h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {auth.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
