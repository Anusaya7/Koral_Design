import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutClient from "@/components/AboutClient";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | KORALS DESIGN PVT LTD — Architectural & Engineering Consultancy Pune",
  description:
    "Learn about Korals Design Private Limited, an architectural planning, civil engineering, statutory approvals, and PMC consultancy located in Pune, Maharashtra. Established history since 2005.",
};

export default function AboutPage() {
  let leadership: { id: number; name: string; role: string; bio?: string }[] = [];
  try {
    leadership = db.prepare("SELECT id, name, role, bio FROM leadership ORDER BY display_order ASC").all() as {
      id: number;
      name: string;
      role: string;
      bio?: string;
    }[];
  } catch (err) {
    console.error("Error fetching leadership for about page:", err);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />
      <AboutClient initialLeadership={leadership} />
      <Footer />
    </main>
  );
}
