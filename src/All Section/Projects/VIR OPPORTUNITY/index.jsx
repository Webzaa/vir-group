import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { opportunity as defaultProject } from '@/data/projects/opportunity';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Project-specific Hotspots for Codename Opportunity
const opportunityHotspots = [
  {
    x: 22,
    y: 30,
    tag: 'Location',
    title: 'Malad East, Mumbai',
    desc: 'Codename Opportunity sits in Malad East, Mumbai, with rapid access to the Western Express Highway, SV Road, and the suburban rail line.',
  },
  {
    x: 46,
    y: 52,
    tag: 'Residences',
    title: '1, 2 and 3 BHK Homes',
    desc: 'Homes planned for maximum cross-ventilation, expansive privacy, natural daylight, and panoramic suburban vistas across 4 iconic G+45 towers.',
  },
  {
    x: 68,
    y: 38,
    tag: 'Podium',
    title: '2-Acre Integrated Podium',
    desc: 'Integrated lifestyle podium with world-class wellness, infinity swimming pool, and landscaped green retreats.',
  },
  {
    x: 80,
    y: 70,
    tag: 'Arrival',
    title: 'Grand Entrance & 24/7 Security',
    desc: 'Triple-height entrance lobby, high-speed elevators, multi-tier car parking, and round-the-clock CCTV surveillance.',
  },
];

// Curated 20 Amenities for Opportunity
const opportunityAmenities = [
  'Gym',
  'Swimming Pool',
  'Parking',
  '24/7 Security',
  'WiFi',
  'Garden/Park',
  'Clubhouse',
  'Kids Play Area',
  'Gas Pipeline',
  '24x7 Water Supply',
  'Power Backup',
  'Elevator',
  'Shopping Center',
  'CCTV Surveillance',
  'Sports Facility',
  'Visitor Parking',
  'Medical Facility',
  'Cafeteria',
  'Library',
  'Party Hall',
];

// Curated Amenity Pairs for Opportunity
const opportunityAmenityPairs = [
  {
    id: 'opp-pair-1',
    index: '01 / 02',
    left: {
      number: '01',
      title: 'Infinity Swimming Pool',
      image: getMediaUrl('/media/projects/opportunity/amenities/Swimming-pool.jpg'),
    },
    right: {
      number: '02',
      title: 'Modern Fitness Gym',
      image: getMediaUrl('/media/projects/opportunity/amenities/Gym.jpg'),
    },
  },
  {
    id: 'opp-pair-2',
    index: '03 / 04',
    left: {
      number: '03',
      title: 'Landscaped Garden Area',
      image: getMediaUrl('/media/projects/opportunity/amenities/Garden-area.jpg'),
    },
    right: {
      number: '04',
      title: 'Kids Play Zone',
      image: getMediaUrl('/media/projects/opportunity/amenities/Kidsplay-area.jpg'),
    },
  },
  {
    id: 'opp-pair-3',
    index: '05 / 06',
    left: {
      number: '05',
      title: 'Grand Clubhouse',
      image: getMediaUrl('/media/projects/opportunity/amenities/Clubhouse.jpg'),
    },
    right: {
      number: '06',
      title: 'Multipurpose Party Hall',
      image: getMediaUrl('/media/projects/opportunity/amenities/Party-hall.jpg'),
    },
  },
];

// Curated Floor Plans for Opportunity
const opportunityFloorPlans = [
  {
    id: 'opp-01',
    title: '1 BHK 3D Isometric View',
    type: '1 BHK',
    carpet: '425 sq.ft',
    unitNo: '101',
    rooms: '1 Bed · 2 Bath · Balcony',
    facing: 'East Facing Sunrise View',
    finish: 'Italian Pattern Glazed Tiles',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-01.webp'),
  },
  {
    id: 'opp-02',
    title: '2 BHK Luxury Residence (680 sq.ft)',
    type: '2 BHK',
    carpet: '680 sq.ft',
    unitNo: '201',
    rooms: '2 Bed · 2 Bath · Sunlit Deck',
    facing: 'North-East Garden View',
    finish: 'Premium Vitrified Tiles',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-04.webp'),
  },
  {
    id: 'opp-03',
    title: '3 BHK 3D Isometric View',
    type: '3 BHK',
    carpet: '1,050 sq.ft',
    unitNo: '301',
    rooms: '3 Bed · 3 Bath · Corner Deck',
    facing: 'Panoramic City Skyline',
    finish: 'Imported Marble Living & Dining',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.09.jpg'),
  },
  {
    id: 'opp-04',
    title: '3 BHK Sky Residence (1,250 sq.ft)',
    type: '3 BHK',
    carpet: '1,250 sq.ft',
    unitNo: '302',
    rooms: '3 Bed · 3 Bath · Wrap Balcony',
    facing: 'West Facing Sunset View',
    finish: 'Italian Marble & Acoustic Glazing',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-05.webp'),
  },
];

export function Opportunity(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-paradise', name: 'VIR Paradise' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={opportunityHotspots}
      floorPlans={opportunityFloorPlans}
      amenityPairs={opportunityAmenityPairs}
      amenitiesList={opportunityAmenities}
      overviewImg={getMediaUrl('/media/overview/opportunity.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/opportunity.webp')}
      amenIntroBg={getMediaUrl('/media/projects/opportunity/amenities/Garden-area.jpg')}
    />
  );
}

export { Opportunity as VirOpportunity, Opportunity as VirOpportunitySection };
export default Opportunity;
