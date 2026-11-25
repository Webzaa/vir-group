import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { virChandrapuri as defaultProject } from '@/data/projects/others';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Upcoming project hotspots
const virChandrapuriHotspots = [
  {
    x: 24,
    y: 35,
    tag: 'Location',
    title: 'Malad East, Mumbai',
    desc: 'VIR Chandrapuri is an upcoming premium residential landmark in Malad East, Mumbai by VIR Group.',
  },
  {
    x: 48,
    y: 52,
    tag: 'Residences',
    title: 'Serene Living',
    desc: 'Carefully designed apartments blending serenity with modern conveniences.',
  },
  {
    x: 75,
    y: 65,
    tag: 'Connectivity',
    title: 'Connected Address',
    desc: 'Direct access to Western Express Highway and central suburban transit.',
  },
];

export function VirChandrapuriSection(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-sanket', name: 'VIR Sanket' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={virChandrapuriHotspots}
      floorPlans={[]}
      amenityPairs={[]}
      amenitiesList={p?.amenities?.items || []}
      overviewImg={getMediaUrl('/media/projects/project-detail/under-construction.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/under-construction.webp')}
      isUpcoming={true}
    />
  );
}

export { VirChandrapuriSection as VirChandrapuri };
export default VirChandrapuriSection;
