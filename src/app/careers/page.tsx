import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersClient from "@/components/CareersClient";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers | KORALS DESIGN PVT LTD — Open Engineering & Architectural Positions",
  description:
    "Explore career opportunities at Korals Design Private Limited in Pune. Working at the intersection of architecture, civil engineering, land surveying, statutory clearances, and PMC project consultancy.",
};

interface CareerItem {
  id: number;
  title: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  application_email: string;
  display_order?: number;
  is_published?: number;
}

export default function CareersPage() {
  let initialCareers: CareerItem[] = [];
  try {
    initialCareers = db
      .prepare("SELECT * FROM careers WHERE is_published = 1 ORDER BY display_order ASC, id DESC")
      .all() as CareerItem[];
  } catch (err) {
    console.error("Error fetching careers from DB:", err);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />
      <CareersClient initialCareers={initialCareers} />
      <Footer />
    </main>
  );
}
