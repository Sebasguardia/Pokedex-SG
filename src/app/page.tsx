import { Suspense } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { QuickAccessSection } from "@/components/home/quick-access-section";
import { FeaturedPokemon } from "@/components/home/featured-pokemon";
import { TypesShowcase } from "@/components/home/types-showcase";
import { GenerationsTimeline } from "@/components/home/generations-timeline";
import { ComparatorBanner } from "@/components/home/comparator-banner";
import { SectionDivider } from "@/components/shared/ui/section-divider";
import { ScrollProgressBar } from "@/components/shared/ui/scroll-progress-bar";
import { PageCurtain } from "@/components/shared/ui/page-curtain";
import { CustomCursor } from "@/components/shared/ui/custom-cursor";

// Basic Skeletons for Suspense
function StatsSectionSkeleton() { return <div className="h-[200px] bg-[#111]" />; }
function FeaturedPokemonSkeleton() { return <div className="h-[400px] bg-[#F8F8F8]" />; }
function TypesShowcaseSkeleton() { return <div className="h-[300px] bg-white" />; }

export default function HomePage() {
  return (
    <>
      <PageCurtain />
      <ScrollProgressBar />
      <CustomCursor />

      <main className="bg-white overflow-hidden">
        {/* S1: Hero */}
        <HeroSection />

        <SectionDivider variant="light-to-dark" />

        {/* S2: Stats */}
        <Suspense fallback={<StatsSectionSkeleton />}>
          <StatsSection />
        </Suspense>

        <SectionDivider variant="dark-to-light" />

        {/* S3: Quick Access */}
        <QuickAccessSection />

        <SectionDivider variant="light-to-light" />

        {/* S4: Featured Pokémon */}
        <Suspense fallback={<FeaturedPokemonSkeleton />}>
          <FeaturedPokemon />
        </Suspense>

        {/* S5: Types Showcase */}
        <Suspense fallback={<TypesShowcaseSkeleton />}>
          <TypesShowcase />
        </Suspense>

        <SectionDivider variant="light-to-dark" />

        {/* S6: Generations */}
        <GenerationsTimeline />

        <SectionDivider variant="dark-to-red" />

        {/* S7: Comparator CTA */}
        <ComparatorBanner />

        <SectionDivider variant="red-to-dark" />
      </main>
    </>
  );
}
