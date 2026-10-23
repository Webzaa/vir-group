import { HeroReveal } from '@/components/animation/HeroReveal';
import { RevealController } from '@/components/animation/RevealController';
import { Achievements } from '@/components/home/Achievements';
import { BrandStatement } from '@/components/home/BrandStatement';
import { Founder } from '@/components/home/Founder';
import { Hero } from '@/components/home/Hero';
import { LegacyBackdrop } from '@/components/home/LegacyBackdrop';
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase';
import { Story } from '@/components/home/Story';
import { Testimonial } from '@/components/home/Testimonial';
import { ValuesWePreserve } from '@/components/home/ValuesWePreserve';

import { MumbaiMap } from '@/components/map/MumbaiMap';
import { FinalCta } from '@/components/sections/FinalCta';
import { Button } from '@/components/ui/Button';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { siteMedia } from '@/data/media';
import { areas, configShort, statusLabel } from '@/lib/content';
import { JsonLd, organizationJsonLd } from '@/lib/seo/jsonld';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { useLoaderData } from 'react-router-dom';
import { PopupDetail } from '@/components/forms/PopupDetail';

export function HomePage() {
  const { company, featured, all, paradise, stats, timeline, values } = useLoaderData();
  usePageMeta({ path: '/' });
  const allProjects = all && all.length >= 7 ? all : (featured || []);
  const items = allProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    area: p.area,
    config: configShort(p),
    status: statusLabel[p.status],
    description: p.description,
    rera: p.rera,
    cutout: p.cutout,
    hero: p.hero,
    elevation: p.elevation,
  }));
  const mapProjects = (all || []).map((p) => ({ slug: p.slug, name: p.name, area: p.area, status: statusLabel[p.status] }));
  return (
    <>
      <JsonLd data={organizationJsonLd(company)} />
      <Hero founded={company.founded} video={siteMedia.heroVideo} />
      <Achievements stats={stats} />
      <LegacyBackdrop>
        <BrandStatement />
        <Story company={company} timeline={timeline} />
        <ProjectsShowcase items={items} />
      </LegacyBackdrop>
      {/* ==================================================================== */}
      {/* SECTION: 06 MUMBAI FULL MAP (7 Projects Interactive Scroll Zoom)     */}
      {/* ==================================================================== */}
      <section className="sec map-sec" data-theme="white" data-level="+06.00" aria-labelledby="map-h">
        <div className="wrap map-header-wrap">
          <LevelMarker level="+06.00" name="Mumbai presence" />
          <Headline id="map-h" lines={['Rooted in the western suburbs.']} style={{ marginBottom: 'clamp(28px,4vw,48px)' }} />
        </div>
        <MumbaiMap projects={mapProjects} areas={areas} office={company.geo} withPanel enableScrollPin />
      </section>
      {/* SECTION: 08 VALUES WE PRESERVE */}
      <ValuesWePreserve level="+08.00" />
      {/* 09 Client Testimonials ("What Our Clients Say") */}
      <Testimonial level="+09.00" />
      <FinalCta lines={['Your next address', 'starts here.']} level="Rooftop">
        <Button href="/projects" variant="ghost">
          Explore projects
        </Button>
        <Button href="/contact" variant="solid" event="project_enquiry">
          Enquire now
        </Button>
      </FinalCta>

      <HeroReveal />
      <RevealController />
      <PopupDetail delay={5000} />
    </>
  );
}
