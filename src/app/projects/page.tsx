import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsClient from "@/components/ProjectsClient";
import db from "@/lib/db";

export const metadata = {
  title: "Projects Portfolio | KORALS DESIGN PVT LTD — Architectural & Engineering Projects",
  description:
    "Explore featured industrial, commercial, and municipal projects engineered by Korals Design Private Limited in Pune, Maharashtra.",
};

interface Project {
  id: number;
  name: string;
  client: string;
  location: string;
  category: string;
  area: string;
  description: string;
  completion_year: string;
  featured_image: string;
  gallery_images?: string;
  is_featured?: number;
}

export default function ProjectsPage() {
  let initialProjects: Project[] = [];
  try {
    initialProjects = db
      .prepare("SELECT * FROM projects WHERE is_published = 1 ORDER BY display_order ASC")
      .all() as Project[];
  } catch (err) {
    console.error("Error fetching projects from DB:", err);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />
      <ProjectsClient initialProjects={initialProjects} />
      <Footer />
    </main>
  );
}
