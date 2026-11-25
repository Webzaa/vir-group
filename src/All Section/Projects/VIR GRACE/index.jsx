import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { virGrace as defaultProject } from '@/data/projects/others';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Upcoming project hotspots
const virGraceHotspots = [
  {
    x: 24,
    y: 35,
    tag: 'Location',
    title: 'Malad West, Mumbai',
    desc: 'VIR Grace is an upcoming premium residential address in Malad West, Mumbai by VIR Group.',
  },
  {
    x: 48,
    y: 52,
    tag: 'Residences',
    title: 'Thoughtful Living',
    desc: 'Designed with modern elegance, efficient layouts, and natural daylight for urban families.',
  },
  {
    x: 75,
    y: 65,
    tag: 'Connectivity',
    title: 'Prime Connectivity',
    desc: 'Minutes away from Link Road, SV Road, and metro transit networks.',
  },
];

export function VirGraceSection(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-chandrapuri', name: 'VIR Chandrapuri' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={virGraceHotspots}
      floorPlans={[]}
      amenityPairs={[]}
      amenitiesList={p?.amenities?.items || []}
      overviewImg={getMediaUrl('/media/projects/project-detail/under-construction.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/under-construction.webp')}
      isUpcoming={true}
    />
  );
}

export { VirGraceSection as VirGrace };
export default VirGraceSection;
