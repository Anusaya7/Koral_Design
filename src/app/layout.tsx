import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Korals Design Private Limited — Architectural & Civil Engineering Consultancy",
  description: "Architectural planning, civil engineering project management, statutory government approvals, land surveying, and 3D spatial visualization in Pune, Maharashtra.",
  keywords: ["Korals Design", "KORALS DESIGN PVT LTD", "Architectural Planning", "Civil Engineering Pune", "Statutory Approvals MIDC PMRDA", "Land Surveying Pune"],
  authors: [{ name: "Korals Design Team" }],
  openGraph: {
    title: "Korals Design Private Limited — Architectural & Civil Engineering Consultancy",
    description: "Architectural planning, civil engineering project management, statutory government approvals, land surveying, and 3D spatial visualization in Pune, Maharashtra.",
    url: "https://www.koralsdesign.com",
    siteName: "Korals Design Private Limited",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Korals Design Private Limited — Architectural Practice Pune",
    description: "Architectural planning, civil engineering project management, and statutory clearances in Pune.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('kd_theme');
                  if (saved === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#F7F7F5] dark:bg-[#181818] text-[#171717] dark:text-[#F7F7F5] antialiased selection:bg-[#171717] selection:text-[#FFFFFF] dark:selection:bg-white dark:selection:text-[#171717] min-h-screen flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
