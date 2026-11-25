import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { virParadise as defaultProject } from '@/data/projects/vir-paradise';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Project-specific Hotspots for VIR Paradise
const paradiseHotspots = [
  {
    x: 22,
    y: 30,
    tag: 'Location',
    title: 'Malad West, Mumbai',
    desc: 'VIR Paradise is located in the prime residential hub of Malad West, with rapid access to SV Road, Link Road, and the metro line.',
  },
  {
    x: 46,
    y: 52,
    tag: 'Residences',
    title: '1, 2 and 3 BHK Homes',
    desc: 'Homes planned for maximum cross-ventilation, expansive privacy, natural daylight, and panoramic suburban vistas.',
  },
  {
    x: 68,
    y: 38,
    tag: 'Rooftop',
    title: 'Exclusive Rooftop Retreat',
    desc: 'Landscaped leisure deck above the city with dedicated yoga, morning meditation, and open-air sunset seating.',
  },
  {
    x: 80,
    y: 70,
    tag: 'Arrival',
    title: 'Grand Entrance Lobby',
    desc: 'Double-height entrance lobby, high-speed elevators, podium car parking, 24/7 CCTV surveillance and generator backup.',
  },
];

// Curated 8 Amenities for VIR Paradise
const paradiseAmenities = [
  'Parking',
  '24/7 Security',
  'Clubhouse',
  'Kids Play Area',
  'Gas Pipeline',
  '24x7 Water Supply',
  'Power Backup',
  'Elevator',
];

// Curated Amenity Pairs for VIR Paradise
const paradiseAmenityPairs = [
  {
    id: 'vp-pair-1',
    index: '01 / 02',
    left: {
      number: '01',
      title: 'Open-Air Sky Gym',
      image: getMediaUrl('/media/projects/paradise/amenities/Open-Air-Gym.webp'),
    },
    right: {
      number: '02',
      title: 'Rooftop Lounge Area',
      image: getMediaUrl('/media/projects/paradise/amenities/Roofttop-Launge-area.webp'),
    },
  },
  {
    id: 'vp-pair-2',
    index: '03 / 04',
    left: {
      number: '03',
      title: 'Yoga & Meditation Deck',
      image: getMediaUrl('/media/projects/paradise/amenities/Yoga-area.webp'),
    },
    right: {
      number: '04',
      title: 'Rooftop Sky Sitting Area',
      image: getMediaUrl('/media/projects/paradise/amenities/Roofttop-sitting-area.webp'),
    },
  },
  {
    id: 'vp-pair-3',
    index: '05 / 06',
    left: {
      number: '05',
      title: 'Indoor Fitness Center',
      image: getMediaUrl('/media/projects/paradise/amenities/Fitness-Area.webp'),
    },
    right: {
      number: '06',
      title: 'Grand Entrance Lobby',
      image: getMediaUrl('/media/projects/paradise/amenities/Lobby.webp'),
    },
  },
];

// Curated Floor Plans for VIR Paradise
const paradiseFloorPlans = [
  {
    id: 'vp-01',
    title: 'Wing-A Typical Floor Plan (Executive Units)',
    type: '1 BHK',
    carpet: '410 – 450 sq.ft',
    unitNo: '101',
    rooms: '1 Bed · 2 Bath · Balcony',
    facing: 'East Facing Sunrise View',
    finish: 'Italian Marble Finish Vitrified',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-01.webp'),
  },
  {
    id: 'vp-02',
    title: '2 BHK Luxury Residence (776 sq.ft)',
    type: '2 BHK',
    carpet: '776 sq.ft',
    unitNo: '201',
    rooms: '2 Bed · 2 Bath · Sunlit Deck',
    facing: 'North-East Garden View',
    finish: 'Premium Quartz & Wooden Textures',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-04.webp'),
  },
  {
    id: 'vp-03',
    title: 'Wing-A Typical 2 BHK Layout',
    type: '2 BHK',
    carpet: '776 – 820 sq.ft',
    unitNo: '202',
    rooms: '2 Bed · 2 Bath · Wide Balcony',
    facing: 'South-West Sunset View',
    finish: 'Designer Italian Glazed Tiles',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-01.webp'),
  },
  {
    id: 'vp-04',
    title: '3 BHK Sky Residence (1,050 sq.ft)',
    type: '3 BHK',
    carpet: '1,050 sq.ft',
    unitNo: '301',
    rooms: '3 Bed · 3 Bath · Wrap Balcony',
    facing: 'Panoramic City View',
    finish: 'Imported Marble Living & Dining',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-05.webp'),
  },
  {
    id: 'vp-05',
    title: 'Wing-A Lower Penthouse (3 BHK Duplex)',
    type: '3 BHK',
    carpet: '1,250 – 1,400 sq.ft',
    unitNo: '302',
    rooms: '3 Bed · 4 Bath · Terrace Garden',
    facing: 'South-East Skyline Orientation',
    finish: 'Acoustic Glazing & Premium Stone',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-02.webp'),
  },
  {
    id: 'vp-06',
    title: 'Wing-A Upper Penthouse (3 BHK Duplex)',
    type: '3 BHK',
    carpet: '1,250 – 1,400 sq.ft',
    unitNo: '303',
    rooms: '3 Bed · 4 Bath · Private Sky Deck',
    facing: 'Unobstructed 270° Suburban View',
    finish: 'Custom Luxury Hardwood & Marble',
    img: getMediaUrl('/media/projects/paradise/plan/VIR Paradise Floor Plan-03.webp'),
  },
];

export function Paradise(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-vinayanand', name: 'VIR Vinayanand' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={paradiseHotspots}
      floorPlans={paradiseFloorPlans}
      amenityPairs={paradiseAmenityPairs}
      amenitiesList={paradiseAmenities}
      overviewImg={getMediaUrl('/media/overview/paradise.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/paradise.png')}
      amenIntroBg={getMediaUrl('/media/projects/paradise/amenities/Roofttop-Launge-area.webp')}
    />
  );
}

export { Paradise as VirParadise, Paradise as VirParadiseSection };
export default Paradise;
