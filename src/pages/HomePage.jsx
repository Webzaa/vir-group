import { HeroReveal } from '@/components/animation/HeroReveal';
import { RevealController } from '@/components/animation/RevealController';
import {
  Hero,
  Achievements,
  BrandStatement,
  Founder,
  LegacyBackdrop,
  ProjectsShowcase,
  Story,
  Testimonial,
  ValuesWePreserve,
  MumbaiMapSection,
  HomeFinalCta,
} from '@/All Section/Home';

import { siteMedia } from '@/data/media';
import { areas, configShort, statusLabel } from '@/lib/content';
import { JsonLd, organizationJsonLd } from '@/lib/seo/jsonld';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { useLoaderData } from 'react-router-dom';
import { PopupDetail } from '@/components/forms/PopupDetail';

export function HomePage() {
  const { company, featured, all, paradise, stats, timeline, values } = useLoaderData();
  usePageMeta({ path: '/' });
  const SIGNATURE_7_SLUGS = [
    'opportunity',
    'vir-paradise',
    'vir-vinayanand',
    'vir-enclave',
    'global-residency',
    'vir-krishna-koyna',
    'surya-prakash',
  ];
  const signatureProjects = (all || []).filter((p) => SIGNATURE_7_SLUGS.includes(p.slug));
  const landmarkProjects = signatureProjects.length === 7 ? signatureProjects : (all || []).slice(0, 7);
  const items = landmarkProjects.map((p) => ({
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
      <MumbaiMapSection mapProjects={mapProjects} areas={areas} company={company} />
      {/* SECTION: 08 VALUES WE PRESERVE */}
      <ValuesWePreserve level="+08.00" />
      {/* 09 Client Testimonials ("What Our Clients Say") */}
      <Testimonial level="+09.00" />
      <HomeFinalCta />

      <HeroReveal />
      <RevealController />
      <PopupDetail delay={10000} />
    </>
  );
}
