import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2nd Inversion Musical School — Premier Music Academy & Performance Training",
  description: "Comprehensive musical education, instrument masterclasses, vocal training, theory, and performance programs at 2nd Inversion Musical School.",
  keywords: ["2nd Inversion", "Musical School", "Music Academy", "Instrument Masterclasses", "Vocal Coaching", "Music Theory"],
  authors: [{ name: "2nd Inversion Musical School Team" }],
  openGraph: {
    title: "2nd Inversion Musical School — Premier Music Academy & Performance Training",
    description: "Comprehensive musical education, instrument masterclasses, vocal training, theory, and performance programs.",
    url: "https://2ndinversion.com",
    siteName: "2nd Inversion Musical School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2nd Inversion Musical School — Premier Music Academy",
    description: "Comprehensive musical education, instrument masterclasses, and vocal training.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F7F7F5] text-[#171717] antialiased selection:bg-[#171717] selection:text-[#FFFFFF] min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

