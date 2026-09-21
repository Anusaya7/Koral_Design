import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Korals Design Pvt Ltd",
  description:
    "Explore architectural design, civil engineering project management, government approval support, land surveying, technical consultancy and project services by Korals Design Pvt Ltd.",
  openGraph: {
    title: "Services | Korals Design Pvt Ltd",
    description:
      "Explore architectural design, civil engineering project management, government approval support, land surveying, technical consultancy and project services by Korals Design Pvt Ltd.",
    url: "https://www.koralsdesign.com/services",
    siteName: "KORALS DESIGN PVT LTD",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />
      <ServicesClient />
      <Footer />
    </main>
  );
}
