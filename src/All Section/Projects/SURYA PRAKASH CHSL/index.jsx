import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { suryaPrakash as defaultProject } from '@/data/projects/others';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';

// Static image imports
import gymImg from '@media/projects/opportunity/amenities/Gym.jpg';
import gardenImg from '@media/projects/krishna-koy/amenities/Landscape-garden.jpg';
import kidsPlayImg from '@media/projects/opportunity/amenities/Kidsplay-area.jpg';
import seniorSittingImg from '@media/projects/krishna-koy/amenities/Senior-citizen-sitting-area.jpg';
import overviewImg from '@media/overview/surya-prakash.webp';
import heroImg from '@media/projects/project-detail/surya-prakash.png';

// Project-specific Hotspots for Surya Prakash
const suryaPrakashHotspots = [
  {
    x: 22,
    y: 30,
    tag: 'Location',
    title: 'Vile Parle, Mumbai',
    desc: 'Surya Prakash sits in Vile Parle, Mumbai, with seamless connectivity to Western Express Highway, SV Road, domestic airport, and suburban transit corridors.',
  },
  {
    x: 46,
    y: 52,
    tag: 'Residences',
    title: '1, 2 and 3 BHK Homes',
    desc: 'Carefully designed residences maximizing natural ventilation, abundant sunlight, and efficient space layout.',
  },
  {
    x: 68,
    y: 38,
    tag: 'Rooftop',
    title: 'Rooftop Greens & Recreation',
    desc: 'Landscaped rooftop open-air sitting corners tailored for quiet relaxation and fresh evening breezes.',
  },
  {
    x: 80,
    y: 70,
    tag: 'Arrival',
    title: 'Secure Entrance & Car Parking',
    desc: 'Well-appointed entrance lobby, high-speed elevator, 24/7 CCTV surveillance and dedicated parking.',
  },
];

// Curated 8 Amenities for Surya Prakash
const suryaPrakashAmenities = [
  'Gym',
  'Parking',
  '24/7 Security',
  'Garden/Park',
  'Kids Play Area',
  '24x7 Water Supply',
  'Elevator',
  'CCTV Surveillance',
];

// Curated Amenity Pairs for Surya Prakash using imported images
const suryaPrakashAmenityPairs = [
  {
    id: 'sp-pair-1',
    index: '01 / 02',
    left: {
      number: '01',
      title: 'Modern Fitness Gym',
      image: gymImg,
    },
    right: {
      number: '02',
      title: 'Lush Garden Park',
      image: gardenImg,
    },
  },
  {
    id: 'sp-pair-2',
    index: '03 / 04',
    left: {
      number: '03',
      title: 'Children Play Zone',
      image: kidsPlayImg,
    },
    right: {
      number: '04',
      title: 'Senior Citizen Sitting',
      image: seniorSittingImg,
    },
  },
];

export function SuryaPrakash(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-vinayanand', name: 'VIR Vinayanand' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={suryaPrakashHotspots}
      floorPlans={[]}
      amenityPairs={suryaPrakashAmenityPairs}
      amenitiesList={suryaPrakashAmenities}
      overviewImg={overviewImg}
      heroImg={heroImg}
      amenIntroBg={gardenImg}
    />
  );
}

export { SuryaPrakash as SuryaPrakashSection, SuryaPrakash as SuryaPrakashChsl };
export default SuryaPrakash;
