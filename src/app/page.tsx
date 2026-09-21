import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import InteractiveTimeline from "@/components/InteractiveTimeline";
import HomeProjects from "@/components/HomeProjects";
import HomeServices from "@/components/HomeServices";
import IdeaToReality from "@/components/IdeaToReality";
import KoralsMethod from "@/components/KoralsMethod";
import LocationExperience from "@/components/LocationExperience";
import HomeContactCTA from "@/components/HomeContactCTA";
import Footer from "@/components/Footer";
import db from "@/lib/db";

// Force dynamic execution so CMS updates sync instantly on reload
export const dynamic = "force-dynamic";

export default function Home() {
  // Query CMS Content
  const homepageContent: Record<string, string> = {};
  const siteSettings: Record<string, string> = {};
  let methodologyStages: { id?: number; stage_number: string; stage_code: string; title: string; subtitle: string; description: string; image?: string; display_order?: number; is_active?: number }[] = [];

  try {
    const homeRows = db.prepare("SELECT key, value FROM homepage_content").all() as { key: string; value: string }[];
    homeRows.forEach((r) => {
      homepageContent[r.key] = r.value;
    });

    const settingRows = db.prepare("SELECT key, value FROM site_settings").all() as { key: string; value: string }[];
    settingRows.forEach((s) => {
      siteSettings[s.key] = s.value;
    });

    methodologyStages = db.prepare("SELECT * FROM methodology_stages WHERE is_active = 1 ORDER BY display_order ASC").all() as { id?: number; stage_number: string; stage_code: string; title: string; subtitle: string; description: string; image?: string; display_order?: number; is_active?: number }[];
  } catch (err) {
    console.error("Error loading home CMS content:", err);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />
      <Hero content={homepageContent} />
      <BrandStatement content={homepageContent} />
      <InteractiveTimeline />
      <HomeProjects />
      <HomeServices />
      <IdeaToReality stages={methodologyStages} />
      <KoralsMethod />
      <LocationExperience settings={siteSettings} />
      <HomeContactCTA content={homepageContent} settings={siteSettings} />
      <Footer />
    </main>
  );
}
