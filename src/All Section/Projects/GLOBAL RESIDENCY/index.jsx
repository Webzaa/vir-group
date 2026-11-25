import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { globalResidency as defaultProject } from '@/data/projects/others';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Project-specific Hotspots for Global Residency
const globalResidencyHotspots = [
  {
    x: 24,
    y: 32,
    tag: 'Location',
    title: 'Goregaon, Mumbai',
    desc: 'Global Residency is well-situated in Goregaon, MMR, enjoying seamless connectivity to key commercial hubs and lifestyle destinations.',
  },
  {
    x: 48,
    y: 50,
    tag: 'Residences',
    title: '1 and 2 BHK Ready Homes',
    desc: 'Thoughtfully planned homes with optimal cross-ventilation, daylight, and quality construction for comfortable urban living.',
  },
  {
    x: 70,
    y: 36,
    tag: 'Rooftop',
    title: 'Rooftop Leisure Deck',
    desc: 'Open-air green relaxation zones offering peaceful suburban vistas.',
  },
  {
    x: 78,
    y: 68,
    tag: 'Arrival',
    title: 'Entrance Lobby & High-Speed Elevators',
    desc: 'Grand entrance lobby with 24/7 CCTV surveillance, backup power, and dedicated parking.',
  },
];

// Curated Amenities for Global Residency
const globalResidencyAmenities = [
  'Parking',
  '24/7 Security',
  'Kids Play Area',
  'Clubhouse',
  'Garden/Park',
  'Elevator',
  '24x7 Water Supply',
  'Gas Pipeline',
  'CCTV Surveillance',
];

// Dual-direction reveal amenity pairs
const globalResidencyAmenityPairs = [
  {
    id: 'gr-pair-1',
    index: '01 / 02',
    left: {
      number: '01',
      title: 'Landscaped Garden Area',
      image: getMediaUrl('/media/projects/opportunity/amenities/Garden-area.jpg'),
    },
    right: {
      number: '02',
      title: 'Kids Play Zone',
      image: getMediaUrl('/media/projects/opportunity/amenities/Kidsplay-area.jpg'),
    },
  },
  {
    id: 'gr-pair-2',
    index: '03 / 04',
    left: {
      number: '03',
      title: 'Community Clubhouse',
      image: getMediaUrl('/media/projects/opportunity/amenities/Clubhouse.jpg'),
    },
    right: {
      number: '04',
      title: 'Senior Citizen Sitting Area',
      image: getMediaUrl('/media/projects/krishna-koy/amenities/Senior-citizen-sitting-area.jpg'),
    },
  },
];

// Curated floor plans
const globalResidencyFloorPlans = [
  {
    id: 'gr-01',
    title: '1 BHK Master Suite',
    type: '1 BHK',
    carpet: '420 – 460 sq.ft',
    unitNo: '101',
    rooms: '1 Bed · 2 Bath · Cross Breeze',
    facing: 'East Facing Open View',
    finish: 'Vitrified Tiles',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.07.jpg'),
  },
  {
    id: 'gr-02',
    title: '2 BHK Luxury Residence',
    type: '2 BHK',
    carpet: '620 – 680 sq.ft',
    unitNo: '201',
    rooms: '2 Bed · 2 Bath · Master Bedroom Suite',
    facing: 'North-East Green View',
    finish: 'Designer Ceramic & Vitrified',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.08.jpg'),
  },
];

export function GlobalResidency(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-krishna-koyna', name: 'VIR Krishna Koyna' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={globalResidencyHotspots}
      floorPlans={globalResidencyFloorPlans}
      amenityPairs={globalResidencyAmenityPairs}
      amenitiesList={globalResidencyAmenities}
      overviewImg={getMediaUrl('/media/overview/globli-residency.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/globli-residency.png')}
      amenIntroBg={getMediaUrl('/media/projects/opportunity/amenities/Garden-area.jpg')}
    />
  );
}

export { GlobalResidency as GlobalResidencySection };
export default GlobalResidency;
