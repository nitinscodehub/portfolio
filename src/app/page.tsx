import Hero from "@/components/home/Hero";
import TechStrip from "@/components/home/TechStrip";
import FeaturedWork from "@/components/home/FeaturedWork";
import AchievementPreview from "@/components/home/AchievementPreview";
import MobileShowcase from "@/components/home/MobileShowcase";
import DotNetSpotlight from "@/components/home/DotNetSpotlight";
import CareerPreview from "@/components/home/CareerPreview";
import SkillsSnapshot from "@/components/home/SkillsSnapshot";
import GitHubPulse from "@/components/home/GitHubPulse";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechStrip />
      <FeaturedWork />
      <AchievementPreview />
      <MobileShowcase />
      <DotNetSpotlight />
      <CareerPreview />
      <SkillsSnapshot />
      <GitHubPulse />
      <ContactCTA />
    </>
  );
}
