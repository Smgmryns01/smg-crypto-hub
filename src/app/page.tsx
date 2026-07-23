import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { CoursesPreview } from "@/components/sections/CoursesPreview";
import { ICPSection } from "@/components/sections/ICPSection";
import { Partners } from "@/components/sections/Partners";
import { RoadmapPreview } from "@/components/sections/RoadmapPreview";
import { CommunityCTA } from "@/components/sections/CommunityCTA";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageLayout>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 btn-primary text-sm"
      >
        Skip to main content
      </a>
      <div id="main-content">
        <Hero />
        <Features />
        <CoursesPreview />
        <ICPSection />
        <Partners />
        <RoadmapPreview />
        <CommunityCTA />
      </div>
    </PageLayout>
  );
}
