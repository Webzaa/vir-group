import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { virSanket as defaultProject } from '@/data/projects/others';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Upcoming project hotspots
const virSanketHotspots = [
  {
    x: 24,
    y: 35,
    tag: 'Location',
    title: 'Andheri East, Mumbai',
    desc: 'VIR Sanket is an upcoming residential landmark in Andheri East, Mumbai by VIR Group.',
  },
  {
    x: 48,
    y: 52,
    tag: 'Residences',
    title: 'Contemporary Lifestyle',
    desc: 'Planned with exceptional attention to modern lifestyle amenities and cross ventilation.',
  },
  {
    x: 75,
    y: 65,
    tag: 'Connectivity',
    title: 'Prime Connectivity',
    desc: 'Moments away from Western Express Highway, metro stations, and commercial centers.',
  },
];

export function VirSanketSection(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-enclave', name: 'VIR Enclave' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={virSanketHotspots}
      floorPlans={[]}
      amenityPairs={[]}
      amenitiesList={p?.amenities?.items || []}
      overviewImg={getMediaUrl('/media/projects/project-detail/under-construction.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/under-construction.webp')}
      isUpcoming={true}
    />
  );
}

export { VirSanketSection as VirSanket };
export default VirSanketSection;
