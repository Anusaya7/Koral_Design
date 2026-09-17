# KD — Korals Design Private Limited Website

Official web application and Content Management System (CMS) for **Korals Design Private Limited** (KORALS DESIGN PVT LTD), an architectural planning, civil engineering project management, statutory approvals, and land surveying practice located in Pune, Maharashtra.

## Overview

Built with Next.js (App Router), TypeScript, Vanilla CSS / Tailwind, and SQLite. Features an interactive corporate portal and an administrative dashboard for managing services, projects, careers, and public enquiries.

### Key Sections
- **Homepage**: Studio overview, core practice areas, featured architectural visualisations, and interactive service spotlights.
- **About Us**: Firm history (est. 2005 / inc. 2020), leadership team, and organizational positioning.
- **Services**: Detailed service pages covering architectural planning, statutory clearances (MIDC, MPCB, DISH, PMRDA, PMC, PCMC), land surveying, and PMC.
- **Projects**: Portfolio of industrial, municipal, and corporate developments.
- **Careers**: Active job listings and spontaneous application forms.
- **Contact**: Interactive location details, Pune HQ map integration, and direct enquiry submission.
- **Admin CMS**: Protected dashboard (`/admin`) for site settings, homepage/about content management, enquiry tracking, and career postings.

## Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typecheck & Production Build

```bash
# Typecheck
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm run start
```

## Tech Stack
- **Framework**: Next.js (App Router) & React
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **Database**: SQLite (`better-sqlite3`)
- **Authentication**: JWT (`jose`) & Cookie-based admin auth
- **Icons**: Lucide React
