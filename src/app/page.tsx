import HeroSection from "@/components/HeroSection";
import VSLSection from "@/components/VSLSection";
import PainSection from "@/components/PainSection";
import SolutionSection from "@/components/SolutionSection";
import SocialProofSection from "@/components/SocialProofSection";
import FilterSection from "@/components/FilterSection";
import ApplicationSection from "@/components/ApplicationSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="section-divider" />
      <VSLSection />
      <div className="section-divider" />
      <PainSection />
      <div className="section-divider" />
      <SolutionSection />
      <div className="section-divider" />
      <SocialProofSection />
      <div className="section-divider" />
      <FilterSection />
      <div className="section-divider" />
      <ApplicationSection />
      <FooterSection />
    </main>
  );
}
