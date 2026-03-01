"use client";

import SectionWrapper from "@/components/SectionWrapper";
import HeroSection from "@/components/HeroSection";
import VSLSection from "@/components/VSLSection";
import PainSection from "@/components/PainSection";
import SolutionSection from "@/components/SolutionSection";
import SocialProofSection from "@/components/SocialProofSection";
import FilterSection from "@/components/FilterSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero no lleva wrapper para que cargue instantáneo */}
      <HeroSection />
      
      <SectionWrapper>
        <VSLSection />
      </SectionWrapper>

      <SectionWrapper>
        <PainSection />
      </SectionWrapper>

      <SectionWrapper>
        <SolutionSection />
      </SectionWrapper>

      <SectionWrapper>
        <SocialProofSection />
      </SectionWrapper>

      <SectionWrapper>
        <FilterSection />
      </SectionWrapper>

      <FooterSection />
    </main>
  );
}
