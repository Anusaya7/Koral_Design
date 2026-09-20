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

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717]">
      <Navbar />
      <Hero />
      <BrandStatement />
      <InteractiveTimeline />
      <HomeProjects />
      <HomeServices />
      <IdeaToReality />
      <KoralsMethod />
      <LocationExperience />
      <HomeContactCTA />
      <Footer />
    </main>
  );
}


