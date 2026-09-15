import type { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Korals Design Pvt Ltd | Architecture & Civil Engineering Consultancy Pune',
    template: '%s | Korals Design Pvt Ltd',
  },
  description:
    'Korals Design Pvt Ltd is a premier architectural, civil engineering project management, industrial planning, and government approvals consultancy based in Pune, Maharashtra, India.',
  keywords: [
    'Korals Design',
    'Architectural Design Pune',
    'Industrial Planning Maharashtra',
    'Civil Engineering PMC',
    'MIDC Approvals Pune',
    'MPCB Clearances',
    'Land Survey Pune',
    'GPR Utility Scanning',
    'PMRDA Sanctions',
  ],
  authors: [{ name: 'Korals Design Pvt Ltd' }],
  creator: 'Korals Design Pvt Ltd',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.koralsdesign.com',
    title: 'Korals Design Pvt Ltd | Architecture & Civil Engineering Consultancy',
    description:
      'End-to-End Solutions — Design, Approvals and Execution for Industrial, Corporate, and Government Projects in Pune.',
    siteName: 'Korals Design Pvt Ltd',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
