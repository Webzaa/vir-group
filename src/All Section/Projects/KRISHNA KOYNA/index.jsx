import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { virKrishnaKoyna as defaultProject } from '@/data/projects/others';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Project-specific Hotspots for VIR Krishna Koyna
const krishnaKoynaHotspots = [
  {
    x: 22,
    y: 30,
    tag: 'Location',
    title: 'Borivali West, Mumbai',
    desc: 'VIR Krishna Koyna is situated in Shimpoli, Borivali West, offering rapid access to Western Express Highway, SV Road, and the metro line.',
  },
  {
    x: 46,
    y: 52,
    tag: 'Residences',
    title: '1, 2 and 3 BHK Premium Homes',
    desc: 'Crafted for optimal cross-ventilation, expansive privacy, natural daylight, and panoramic suburban vistas.',
  },
  {
    x: 68,
    y: 38,
    tag: 'Rooftop',
    title: 'Rooftop Yoga & Leisure Deck',
    desc: 'Open-air leisure deck above the city with dedicated yoga, morning meditation, and sunset seating.',
  },
  {
    x: 80,
    y: 70,
    tag: 'Arrival',
    title: 'Grand Entrance Lobby & Safety',
    desc: 'Double-height entrance lobby, high-speed elevators, closed car parking, 24/7 CCTV surveillance and backup power.',
  },
];

// Curated 9 Amenities
const krishnaKoynaAmenities = [
  'Parking',
  '24/7 Security',
  'Garden/Park',
  'Clubhouse',
  'Kids Play Area',
  '24x7 Water Supply',
  'Gas Pipeline',
  'Elevator',
  'Power Backup',
];

// Curated Amenity Pairs
const krishnaKoynaAmenityPairs = [
  {
    id: 'kk-pair-1',
    index: '01 / 02',
    left: {
      number: '01',
      title: 'Jogging Track',
      image: getMediaUrl('/media/projects/krishna-koy/amenities/Jogging-track.jpg'),
    },
    right: {
      number: '02',
      title: 'Landscape Garden',
      image: getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg'),
    },
  },
  {
    id: 'kk-pair-2',
    index: '03 / 04',
    left: {
      number: '03',
      title: 'Senior Citizen Sitting Area',
      image: getMediaUrl('/media/projects/krishna-koy/amenities/Senior-citizen-sitting-area.jpg'),
    },
    right: {
      number: '04',
      title: 'Yoga Area',
      image: getMediaUrl('/media/projects/krishna-koy/amenities/Yoga-area.jpg'),
    },
  },
];

// 7 Curated Floor Plans for Krishna Koyna
const krishnaKoynaFloorPlans = [
  {
    id: 'kp-01',
    title: '1 BHK 3D Isometric View',
    type: '1 BHK',
    carpet: '369 sq.ft',
    unitNo: '101',
    rooms: '1 Bed · 2 Bath · Modular Kitchen',
    facing: 'East Facing Sunrise View',
    finish: 'Premium Vitrified Flooring',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.07.jpg'),
  },
  {
    id: 'kp-02',
    title: 'Typical 1 & 2 BHK Floor Plan (2nd – 8th Floor)',
    type: '1 BHK',
    carpet: '369 – 425 sq.ft',
    unitNo: '102',
    rooms: '1 Bed · 2 Bath · Cross Ventilation',
    facing: 'Green Corridor View',
    finish: 'Modern Modular Finishes',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.03.jpg'),
  },
  {
    id: 'kp-03',
    title: '2 BHK 3D Isometric View',
    type: '2 BHK',
    carpet: '603 sq.ft',
    unitNo: '201',
    rooms: '2 Bed · 2 Bath · Master Bedroom Suite',
    facing: 'North-East Garden View',
    finish: 'Designer Vitrified Flooring',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.08.jpg'),
  },
  {
    id: 'kp-04',
    title: 'Typical 2 BHK Floor Plan (2nd – 8th Floor)',
    type: '2 BHK',
    carpet: '603 – 680 sq.ft',
    unitNo: '202',
    rooms: '2 Bed · 2 Bath · Wide Living Balcony',
    facing: 'South-West Sunset View',
    finish: 'Italian Pattern Glazed Tiles',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.03.jpg'),
  },
  {
    id: 'kp-05',
    title: '3 BHK 3D Isometric View',
    type: '3 BHK',
    carpet: '796 sq.ft',
    unitNo: '301',
    rooms: '3 Bed · 3 Bath · Spacious Dining & Living',
    facing: 'Panoramic City Skyline',
    finish: 'Premium Marble & Wooden Finishes',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.09.jpg'),
  },
  {
    id: 'kp-06',
    title: '9th Floor Plan (3 BHK Sky Residence)',
    type: '3 BHK',
    carpet: '796 – 960 sq.ft',
    unitNo: '302',
    rooms: '3 Bed · 3 Bath · Corner Deck',
    facing: 'West Facing Sunset View',
    finish: 'Italian Marble & Acoustic Glazing',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.04.jpg'),
  },
  {
    id: 'kp-07',
    title: '10th Floor Plan (Residence & Fitness Center)',
    type: '3 BHK',
    carpet: '796 – 1,050 sq.ft',
    unitNo: '303',
    rooms: '3 Bed · 3 Bath · Fitness Center Access',
    facing: 'Panoramic Skyline Orientation',
    finish: 'Custom Luxury Hardwood & Marble',
    img: getMediaUrl('/media/projects/krishna-koy/plans/Krishna-Koyna.05.jpg'),
  },
];

export function KrishnaKoyna(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'surya-prakash', name: 'Surya Prakash' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={krishnaKoynaHotspots}
      floorPlans={krishnaKoynaFloorPlans}
      amenityPairs={krishnaKoynaAmenityPairs}
      amenitiesList={krishnaKoynaAmenities}
      overviewImg={getMediaUrl('/media/overview/Krishna-Koyana.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/Krishna-Koyana.png')}
      amenIntroBg={getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg')}
    />
  );
}

export { KrishnaKoyna as KrishnaKoynaSection };
export default KrishnaKoyna;
