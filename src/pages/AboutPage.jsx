import { useLoaderData } from 'react-router-dom';
import { HeroReveal } from '@/components/animation/HeroReveal';
import { RevealController } from '@/components/animation/RevealController';
import {
  AboutHero,
  AboutFounder,
  AboutStory,
  AboutJourney,
  AboutValues,
  AboutGroupCompanies,
  AboutVisionMission,
  AboutCta,
} from '@/All Section/About';
import { usePageMeta } from '@/lib/seo/usePageMeta';

export function AboutPage() {
  const { company, timeline, values, group } = useLoaderData();
  usePageMeta({
    title: 'About | Veerabhai Prajapati, Founder and Managing Director',
    description: 'Since 2013, Veerabhai Prajapati has led VIR Group. Our story, values, journey and group companies.',
    path: '/about',
  });

  return (
    <>
      <AboutHero company={company} />
      <AboutFounder company={company} />
      <AboutStory story={company?.story} />
      <AboutJourney timeline={timeline} />
      <AboutValues values={values} />
      <AboutGroupCompanies companies={group} />
      <AboutVisionMission company={company} />
      <AboutCta />
      <HeroReveal />
      <RevealController />
    </>
  );
}
