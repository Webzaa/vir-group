import { useState, useRef, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap';
import { JsonLd, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld';
import { opportunity as defaultProject } from '@/data/projects/opportunity';
import { configLong, configShort, statusLabel } from '@/lib/content';
import { getMediaUrl } from '@/lib/media';
import { FinalCta } from '@/components/sections/FinalCta';
import { PopupForm } from '@/components/forms/PopupForm';
import { ProjectForm } from '@/components/forms/ProjectForm';

export function InteractiveProjectDetail(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-paradise', name: 'VIR Paradise' };
  const company = props.company || loaderData.company || { founded: 1985, phone: '+919326287741', phoneDisplay: '+91 93262 87741' };

  const stageRef = useRef(null);
  const colInRef = useRef(null);
  const amenSectionRef = useRef(null);
  const amenColLeftRef = useRef(null);
  const amenColRightRef = useRef(null);

  const isVinayanand = p?.slug === 'vir-vinayanand' || p?.slug === 'virvinayanand';
  const isOpportunity = p?.slug === 'opportunity';

  // Hotspots definitions from original project data
  const defaultHotspots = [
    {
      x: 22,
      y: 30,
      tag: 'Location',
      title: `${p.area || 'Malad East'}, Mumbai`,
      desc: `${p.name} sits in ${p.area || 'Malad East'}, in Mumbai's western suburbs, with rapid access to the Western Express Highway, SV Road, and the suburban rail line.`,
    },
    {
      x: 46,
      y: 52,
      tag: 'Residences',
      title: configLong(p) || '1, 2 and 3 BHK',
      desc: 'Homes planned for maximum cross-ventilation, expansive privacy, natural daylight, and panoramic suburban vistas.',
    },
    {
      x: 68,
      y: 38,
      tag: 'Rooftop',
      title: 'Rooftop Retreat',
      desc: 'Landscaped leisure deck above the city with dedicated yoga, morning meditation, and open-air sunset seating.',
    },
    {
      x: 80,
      y: 70,
      tag: 'Arrival',
      title: 'Grand Lobby & Security',
      desc: 'Double-height entrance lobby, high-speed elevators, podium car parking, 24/7 CCTV surveillance and generator backup.',
    },
  ];

  // Specific data for VIR Vinayanand
  const vinayanandHotspots = [
    {
      x: 22,
      y: 30,
      tag: 'Location',
      title: 'VIR Vinayanand',
      location: 'Mumbai, Santacruz',
      type: 'BHK',
      area: 'N/A sqft',
      ready: 'TBD',
    },
    {
      x: 46,
      y: 52,
      tag: 'Residences',
      title: 'VIR Vinayanand',
      location: 'Mumbai, Santacruz',
      type: 'BHK',
      area: 'N/A sqft',
      ready: 'TBD',
    },
    {
      x: 68,
      y: 38,
      tag: 'Rooftop',
      title: 'VIR Vinayanand',
      location: 'Mumbai, Santacruz',
      type: 'BHK',
      area: 'N/A sqft',
      ready: 'TBD',
    },
    {
      x: 80,
      y: 70,
      tag: 'Arrival',
      title: 'VIR Vinayanand',
      location: 'Mumbai, Santacruz',
      type: 'BHK',
      area: 'N/A sqft',
      ready: 'TBD',
    },
  ];

  const hotspots = isVinayanand ? vinayanandHotspots : defaultHotspots;

  const amenStickyStageRef = useRef(null);

  // ============================================================================
  // PROJECT-SPECIFIC CURATED AMENITIES (Displayed in Intro Section Right-Bottom)
  // ============================================================================
  const PROJECT_AMENITIES_MAP = {
    // --------------------------------------------------------------------------
    // 1. Codename Opportunity (Malad East) - 20 Curated Amenities
    // --------------------------------------------------------------------------
    'opportunity': [
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
    ],

    // --------------------------------------------------------------------------
    // 2. VIR Paradise (Malad West) - 8 Curated Amenities
    // --------------------------------------------------------------------------
    'vir-paradise': [
      'Parking',
      '24/7 Security',
      'Clubhouse',
      'Kids Play Area',
      'Gas Pipeline',
      '24x7 Water Supply',
      'Power Backup',
      'Elevator',
    ],

    // --------------------------------------------------------------------------
    // 3. VIR Enclave (Borivali West) - 8 Curated Amenities
    // --------------------------------------------------------------------------
    'vir-enclave': [
      'Parking',
      '24/7 Security',
      'Kids Play Area',
      'Gas Pipeline',
      '24x7 Water Supply',
      'Power Backup',
      'Elevator',
      'CCTV Surveillance',
    ],

    // --------------------------------------------------------------------------
    // 4. Global Residency (Goregaon) - 9 Curated Amenities
    // --------------------------------------------------------------------------
    'global-residency': [
      'Parking',
      '24/7 Security',
      'Kids Play Area',
      'Clubhouse',
      'Garden/Park',
      'Elevator',
      '24x7 Water Supply',
      'Gas Pipeline',
      'CCTV Surveillance',
    ],

    // --------------------------------------------------------------------------
    // 5. VIR Krishna Koyna (Borivali West) - 9 Curated Amenities
    // --------------------------------------------------------------------------
    'vir-krishna-koyna': [
      'Parking',
      '24/7 Security',
      'Garden/Park',
      'Clubhouse',
      'Kids Play Area',
      '24x7 Water Supply',
      'Gas Pipeline',
      'Elevator',
      'Power Backup',
    ],

    // --------------------------------------------------------------------------
    // 6. Surya Prakash (Vile Parle) - 8 Curated Amenities
    // --------------------------------------------------------------------------
    'surya-prakash': [
      'Gym',
      'Parking',
      '24/7 Security',
      'Garden/Park',
      'Kids Play Area',
      '24x7 Water Supply',
      'Elevator',
      'CCTV Surveillance',
    ],
  };

  const projectAmenitiesList = PROJECT_AMENITIES_MAP[p?.slug] || p?.amenities?.items || [];

  // Dynamic Floor Plans Per Project Folder with Verified 1, 2 & 3 BHK Images
  const PROJECT_FLOOR_PLANS = {
    'vir-krishna-koyna': [
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
    ],
    'vir-paradise': [
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
    ],
    'vir-enclave': [
      {
        id: 've-01',
        title: '1 BHK 3D Isometric View',
        type: '1 BHK',
        carpet: '372 sq.ft',
        unitNo: '101',
        rooms: '1 Bed · 2 Bath · Cross Breeze',
        facing: 'East Facing Open View',
        finish: 'High Grade Vitrified Tiles',
        img: getMediaUrl('/media/projects/Enclave/plans/02.jpg'),
      },
      {
        id: 've-02',
        title: 'Typical 1 BHK Floor Plan',
        type: '1 BHK',
        carpet: '372 – 415 sq.ft',
        unitNo: '102',
        rooms: '1 Bed · 2 Bath · Open Living',
        facing: 'East Facing Garden View',
        finish: 'Designer Ceramic & Vitrified',
        img: getMediaUrl('/media/projects/Enclave/plans/01.jpg'),
      },
      {
        id: 've-03',
        title: '2 BHK 3D Isometric View',
        type: '2 BHK',
        carpet: '612 sq.ft',
        unitNo: '201',
        rooms: '2 Bed · 2 Bath · Master Bedroom Suite',
        facing: 'North-East Green View',
        finish: 'Italian Pattern Glazed Tiles',
        img: getMediaUrl('/media/projects/Enclave/plans/05.jpg'),
      },
      {
        id: 've-04',
        title: 'Typical 2 BHK Floor Plan',
        type: '2 BHK',
        carpet: '612 – 680 sq.ft',
        unitNo: '202',
        rooms: '2 Bed · 2 Bath · Utility Area',
        facing: 'South-West Sunset View',
        finish: 'Designer Ceramic & Vitrified',
        img: getMediaUrl('/media/projects/Enclave/plans/01.jpg'),
      },
      {
        id: 've-05',
        title: '3 BHK 3D Isometric View',
        type: '3 BHK',
        carpet: '989 sq.ft',
        unitNo: '301',
        rooms: '3 Bed · 3 Bath · Spacious Living & Balcony',
        facing: 'Panoramic Western Suburbs View',
        finish: 'Premium Marble & Designer Wood',
        img: getMediaUrl('/media/projects/Enclave/plans/04.jpg'),
      },
      {
        id: 've-06',
        title: 'Typical 3 BHK Floor Plan (13th, 15th & 16th Floor)',
        type: '3 BHK',
        carpet: '989 – 1,060 sq.ft',
        unitNo: '302',
        rooms: '3 Bed · 3 Bath · Double Balcony',
        facing: 'South-East Skyline Panorama',
        finish: 'Custom Luxury Marble & Fixtures',
        img: getMediaUrl('/media/projects/Enclave/plans/03.jpg'),
      },
    ],
    'opportunity': [
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
    ],
  };

  // Dynamic Amenities in Pairs per Project Folder
  const PROJECT_AMENITIES = {
    'vir-paradise': [
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
    ],
    'opportunity': [
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
    ],
    'vir-krishna-koyna': [
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
    ],
    'vir-enclave': [
      {
        id: 've-pair-1',
        index: '01 / 02',
        left: {
          number: '01',
          title: 'Jogging Track & Green Deck',
          image: getMediaUrl('/media/projects/krishna-koy/amenities/Jogging-track.jpg'),
        },
        right: {
          number: '02',
          title: 'Lush Landscaped Garden',
          image: getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg'),
        },
      },
      {
        id: 've-pair-2',
        index: '03 / 04',
        left: {
          number: '03',
          title: 'Senior Citizen Corner',
          image: getMediaUrl('/media/projects/krishna-koy/amenities/Senior-citizen-sitting-area.jpg'),
        },
        right: {
          number: '04',
          title: 'Yoga & Meditation Deck',
          image: getMediaUrl('/media/projects/krishna-koy/amenities/Yoga-area.jpg'),
        },
      },
    ],
  };

  // Dynamic Amenities Intro Cover Background per Project Folder
  const PROJECT_INTRO_BG = {
    'vir-paradise': getMediaUrl('/media/projects/paradise/amenities/Roofttop-Launge-area.webp'),
    'opportunity': getMediaUrl('/media/projects/opportunity/amenities/Garden-area.jpg'),
    'vir-krishna-koyna': getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg'),
    'vir-enclave': getMediaUrl('/media/projects/Enclave/Dekstop-image.jpg.jpeg'),
  };

  // Dynamic Image 2 for Hero Pinned Transition
  const PROJECT_IMG2 = {
    'vir-paradise': getMediaUrl('/media/projects/paradise/amenities/Open Air Gym.webp'),
    'opportunity': getMediaUrl('/media/projects/opportunity/amenities/Swimming-pool.jpg'),
    'vir-krishna-koyna': getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg'),
    'vir-enclave': getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg'),
  };

  // Dynamic Col Photo for Left Scrolling Column
  const PROJECT_COL_PHOTO = {
    'vir-paradise': getMediaUrl('/media/projects/paradise/amenities/Fitness-Area.webp'),
    'opportunity': getMediaUrl('/media/projects/opportunity/amenities/Clubhouse.jpg'),
    'vir-krishna-koyna': getMediaUrl('/media/projects/krishna-koy/amenities/Jogging-track.jpg'),
    'vir-enclave': getMediaUrl('/media/projects/krishna-koy/amenities/Jogging-track.jpg'),
  };

  const floorPlansList = PROJECT_FLOOR_PLANS[p.slug] || (!isVinayanand ? PROJECT_FLOOR_PLANS['vir-krishna-koyna'] : []);

  // Cards show a small thumbnail (/thumbs/<name>.webp); the full-size file opens only in the lightbox.
  // Decoding the 2000-8000px originals for every card is what made scrolling stutter here.
  const fpThumb = (src) => (typeof src === 'string' ? src.replace(/\/([^/]+?)\.[a-z0-9]+$/i, '/thumbs/$1.webp') : src);
  const fpImgFallback = (e, original) => {
    if (e.currentTarget.dataset.fb) return;
    e.currentTarget.dataset.fb = '1';
    e.currentTarget.src = original;
  };
  const amenityPairs = PROJECT_AMENITIES[p.slug] || PROJECT_AMENITIES['vir-krishna-koyna'];
  const amenIntroBg = PROJECT_INTRO_BG[p.slug] || getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg');
  const colPhotoSrc = PROJECT_COL_PHOTO[p.slug] || getMediaUrl('/media/projects/krishna-koy/amenities/Jogging-track.jpg');

  const totalFloors = p.elevation?.floors || 10;

  // React States
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [pendingHotspotIndex, setPendingHotspotIndex] = useState(null);
  const [hasUnlockedHotspots, setHasUnlockedHotspots] = useState(() => {
    try {
      return sessionStorage.getItem('vir_hotspot_lead_submitted') === 'true';
    } catch {
      return false;
    }
  });
  const [planFilter, setPlanFilter] = useState('ALL');
  const [modalPlan, setModalPlan] = useState(null);
  const [likedPlans, setLikedPlans] = useState({});
  const [selectedPlanForEnquiry, setSelectedPlanForEnquiry] = useState(null);
  const [isBrochureRequest, setIsBrochureRequest] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [mobileFpIdx, setMobileFpIdx] = useState(0);
  const mobileFpTrackRef = useRef(null);

  // When Read More expands on mobile, allow stage to take full content height without clipping
  useEffect(() => {
    if (stageRef.current && typeof window !== 'undefined' && window.innerWidth < 760) {
      const pinSpacer = stageRef.current.closest('.pin-spacer');
      if (pinSpacer) {
        if (isReadMore) {
          pinSpacer.style.height = 'auto';
          pinSpacer.style.minHeight = 'auto';
          pinSpacer.style.paddingBottom = '0px';
        } else {
          pinSpacer.style.height = '';
          pinSpacer.style.minHeight = '';
          pinSpacer.style.paddingBottom = '';
        }
      }
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [isReadMore]);

  const [hasUnlockedFloorPlans, setHasUnlockedFloorPlans] = useState(() => {
    try {
      return sessionStorage.getItem('vir_floorplan_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // Touch and drag tracking to prevent accidental clicks when scrolling/swiping floor plans or stage on mobile
  const fpTouchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const fpIsDraggingRef = useRef(false);
  const fpPreventClickRef = useRef(false);
  const fpLastScrollTimeRef = useRef(0);
  const fpScrollTimeoutRef = useRef(null);
  const fpPreventTimeoutRef = useRef(null);

  const markFpScrollingOrDragging = () => {
    fpLastScrollTimeRef.current = Date.now();
    fpPreventClickRef.current = true;
    clearTimeout(fpScrollTimeoutRef.current);
    fpScrollTimeoutRef.current = setTimeout(() => {
      fpPreventClickRef.current = false;
      fpIsDraggingRef.current = false;
    }, 500);
  };

  const handleFpTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    fpTouchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    fpIsDraggingRef.current = false;
    if (Date.now() - fpLastScrollTimeRef.current < 500) {
      fpPreventClickRef.current = true;
    }
  };

  const handleFpTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - fpTouchStartRef.current.x);
    const dy = Math.abs(touch.clientY - fpTouchStartRef.current.y);
    if (dx > 3 || dy > 3) {
      fpIsDraggingRef.current = true;
      fpPreventClickRef.current = true;
      fpLastScrollTimeRef.current = Date.now();
    }
  };

  const handleFpTouchEnd = () => {
    if (fpIsDraggingRef.current) {
      fpPreventClickRef.current = true;
      clearTimeout(fpPreventTimeoutRef.current);
      fpPreventTimeoutRef.current = setTimeout(() => {
        fpPreventClickRef.current = false;
        fpIsDraggingRef.current = false;
      }, 500);
    }
  };

  const isFpScrollOrDrag = () => {
    return (
      fpIsDraggingRef.current ||
      fpPreventClickRef.current ||
      Date.now() - fpLastScrollTimeRef.current < 500
    );
  };

  const handleFpClickCapture = (e) => {
    if (isFpScrollOrDrag()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  useEffect(() => {
    const onScrollUpdate = () => {
      markFpScrollingOrDragging();
    };
    window.addEventListener('scroll', onScrollUpdate, { passive: true });
    window.addEventListener('wheel', onScrollUpdate, { passive: true });
    ScrollTrigger.addEventListener('scrollStart', onScrollUpdate);
    ScrollTrigger.addEventListener('scrollEnd', onScrollUpdate);
    return () => {
      window.removeEventListener('scroll', onScrollUpdate);
      window.removeEventListener('wheel', onScrollUpdate);
      ScrollTrigger.removeEventListener('scrollStart', onScrollUpdate);
      ScrollTrigger.removeEventListener('scrollEnd', onScrollUpdate);
      clearTimeout(fpScrollTimeoutRef.current);
      clearTimeout(fpPreventTimeoutRef.current);
    };
  }, []);

  const handleMobileFpScroll = () => {
    markFpScrollingOrDragging();
    const el = mobileFpTrackRef.current;
    if (!el) return;
    const slideW = el.clientWidth;
    if (slideW > 0) {
      const idx = Math.round(el.scrollLeft / slideW);
      setMobileFpIdx(Math.max(0, Math.min(idx, filteredPlans.length - 1)));
    }
  };

  const scrollMobileFp = (direction) => {
    const el = mobileFpTrackRef.current;
    if (!el) return;
    const targetIdx = direction === 'next' ? Math.min(mobileFpIdx + 1, filteredPlans.length - 1) : Math.max(mobileFpIdx - 1, 0);
    el.scrollTo({ left: targetIdx * el.clientWidth, behavior: 'smooth' });
    setMobileFpIdx(targetIdx);
  };

  const scrollMobileFpTo = (targetIdx) => {
    const el = mobileFpTrackRef.current;
    if (!el) return;
    el.scrollTo({ left: targetIdx * el.clientWidth, behavior: 'smooth' });
    setMobileFpIdx(targetIdx);
  };

  useEffect(() => {
    setMobileFpIdx(0);
    if (mobileFpTrackRef.current) {
      mobileFpTrackRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  }, [planFilter]);

  const handleFloorPlanClick = (plan) => {
    if (hasUnlockedFloorPlans) {
      setModalPlan(plan);
    } else {
      setSelectedPlanForEnquiry(plan);
      setPendingHotspotIndex(null);
      setPopupOpen(true);
    }
  };

  // Hotspot interaction:
  // All 4 points trigger PopupForm if user hasn't submitted; after submission, the detail point opens.
  const handleHotspotClick = (index) => {
    if (hasUnlockedHotspots) {
      setActiveHotspot((prev) => (prev === index ? null : index));
    } else {
      setSelectedPlanForEnquiry(null);
      setPendingHotspotIndex(index);
      setPopupOpen(true);
    }
  };

  const toggleLikePlan = (id) => {
    setLikedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPlans = planFilter === 'ALL'
    ? floorPlansList
    : floorPlansList.filter((plan) => plan.type === planFilter);

  // The floor-plan grid changes height when the BHK filter changes. Every pinned
  // section below it was measured for the old height, so re-measure them (two frames
  // later, once React has committed and the browser has laid out the new grid).
  const filterMountedRef = useRef(false);
  useEffect(() => {
    if (!filterMountedRef.current) {
      filterMountedRef.current = true;
      return undefined;
    }
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [planFilter]);

  // Dedicated Overview Images from /media/overview/ for each project
  const PROJECT_OVERVIEW_IMAGES = {
    'opportunity': '/media/overview/opportunity.webp',
    'vir-paradise': '/media/overview/paradise.webp',
    'vir-vinayanand': '/media/overview/vinayanand.webp',
    'vir-enclave': '/media/overview/VIR-Enclave.webp',
    'global-residency': '/media/overview/globli-residency.webp',
    'vir-krishna-koyna': '/media/overview/Krishna-Koyana.webp',
    'surya-prakash': '/media/overview/surya-prakash.webp',
  };

  const overviewImgSrc = getMediaUrl(
    PROJECT_OVERVIEW_IMAGES[p.slug] || '/media/overview/opportunity.webp'
  );
  const heroImgSrc = getMediaUrl(p.hero?.src || '/media/projects/project-detail/opportunity.webp');
  const img2Src = overviewImgSrc;
  const statusDisplay = statusLabel[p.status] || (p.status === 'ongoing' ? 'Under development' : (p.status === 'available' ? 'Ready · Available' : 'Under development'));

  const aboutParas = p.aboutParagraphs || [p.description || p.tagline];

  // GSAP Springs Reveal Pinned Timeline & Amenities Parallax
  useEffect(() => {
    if (!stageRef.current || !colInRef.current) return;

    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const colIn = colInRef.current;
      const mobile = () => window.innerWidth < 760;

      // Hero intro lines entrance
      gsap.from('.hero-copy h1 b', { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.12, delay: 0.2 });
      gsap.from('.hero-copy .mi', { opacity: 0, y: 14, duration: 1, ease: 'power3.out', delay: 0.1 });

      // Springs Pinned Reveal Timeline (Desktop Only: Split-screen wipe & column scroll)
      // On Mobile: NORMAL SCROLL is preserved without pinning, touch traps, or text clipping!
      if (!mobile()) {
        const getColPositions = () => {
          const winH = window.innerHeight;
          const actionsEl = colIn.querySelector('.col__actions');
          let colH = Math.max(colIn.scrollHeight, colIn.offsetHeight);
          if (actionsEl) {
            const actionBottom = actionsEl.offsetTop + actionsEl.offsetHeight;
            colH = Math.max(colH, actionBottom);
          }
          const navEl = document.querySelector('.hdr');
          const navH = (navEl && navEl.offsetHeight > 0) ? navEl.offsetHeight : 76;
          const topBuffer = Math.max(navH + 20, Math.round(winH * 0.07));
          const botBuffer = 32;

          if (colH + topBuffer + botBuffer <= winH) {
            const start = Math.max(topBuffer, Math.round((winH - colH) / 2));
            const end = Math.max(topBuffer, winH - colH - botBuffer);
            return { start, end };
          }
          const start = topBuffer;
          const end = Math.min(-10, winH - colH - botBuffer);
          return { start, end };
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => '+=' + Math.max(Math.round(window.innerHeight * 2.2), (colIn.scrollHeight || 0) * 1.2 + Math.round(window.innerHeight * 0.8)),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        /* initial states */
        gsap.set('.layer--2 .ph', { yPercent: 10 });
        gsap.set(colIn, {
          opacity: 0,
          y: () => getColPositions().start + 45,
        });
        gsap.set('.layer--2', { clipPath: 'inset(100% 0% 0% 0%)' });

        /* 1) hero copy leaves, panel wipes in from the left, hero image clips to right half */
        tl.to('.hero-copy', { y: -90, opacity: 0, duration: 0.8 }, 0)
          .to('.stage-hotspots', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
          .to('.panel', { width: '50%', duration: 1, ease: 'power2.inOut' }, 0.35)
          .to('.layer--1', { clipPath: 'inset(0 0 0 50%)', duration: 1, ease: 'power2.inOut' }, 0.35)
          .to('.layer--1 .ph', { scale: 1.12, duration: 3.5 }, 0)

          /* 2) left copy smoothly enters with ample top space, and glides to retain ample bottom space */
          .to(colIn, {
            opacity: 1,
            y: () => getColPositions().start,
            duration: 0.8,
            ease: 'power2.out',
          }, 0.5)
          .to(colIn, {
            y: () => getColPositions().end,
            duration: 2.8,
            ease: 'none',
          }, 1.3)
          /* 2b) Hold stage pinned with buttons fully resting and comfortably visible */
          .to({}, { duration: 1.4 }, '+=0')

          /* 3) right-hand overview image wipes up smoothly as panel wipes in */
          .to('.layer--2', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, 0.35)
          .to('.layer--2 .ph', { yPercent: -4, duration: 2.2 }, 0.35);
      }

      // 3. Dual-Direction Split-Screen Amenities Reveal Stage (Dynamic for all pairs)
      if (amenStickyStageRef.current) {
        const stageEl = amenStickyStageRef.current;
        const numPairs = amenityPairs.length;

        // Dynamic initial setup for all pairs:
        amenityPairs.forEach((pair, idx) => {
          const pNum = idx + 1;
          const isOdd = pNum % 2 !== 0;
          // Odd pairs (1, 3): left pane from bottom, right pane from top
          // Even pairs (2): left pane from top, right pane from bottom
          gsap.set(`.amen-pair--${pNum} .amen-pane-left`, {
            clipPath: isOdd ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          });
          gsap.set(`.amen-pair--${pNum} .amen-pane-right`, {
            clipPath: isOdd ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.amen-pair--${pNum} .amen-pane-img`, { scale: 1.14 });
        });

        const amenTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stageEl,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * (numPairs >= 3 ? 4.2 : 2.8)),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // 1. Reveal Pair 1 OVER Intro Card:
        amenTl
          .to('.amen-intro-center-wrap', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, 0.2)
          .to('.amen-intro-opp-amenities', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 0.2)
          .to('.amen-intro-img', { scale: 1.15, duration: 1.4 }, 0.2);

        // 2. Animate each amenity pair in sequence
        amenityPairs.forEach((pair, idx) => {
          const pNum = idx + 1;
          const prevNum = idx;
          const startTime = 0.4 + idx * 1.5;

          // Fade out previous pair HUD if not the first pair
          if (prevNum > 0) {
            amenTl.to(
              `.amen-pair--${prevNum} .amen-pane-hud`,
              { opacity: 0, y: -20, duration: 0.5 },
              startTime - 0.1
            );
          }

          // Wipe in left and right panes
          amenTl
            .to(
              `.amen-pair--${pNum} .amen-pane-left`,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power2.inOut',
              },
              startTime
            )
            .to(
              `.amen-pair--${pNum} .amen-pane-right`,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power2.inOut',
              },
              startTime
            )
            .to(
              `.amen-pair--${pNum} .amen-pane-img`,
              { scale: 1.0, duration: 1.4 },
              startTime
            );
        });

        // Hold last pair comfortably
        amenTl.to({}, { duration: 0.8 });
      }
    });

    return () => ctx.revert();
  }, [p.slug, heroImgSrc, img2Src]);

  return (
    <div className="pdetail-root" aria-label={`${p.name} Project Overview`}>
      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />

      {/* 1. SPRINGS PINNED REVEAL SCROLL HERO STAGE */}
      <section
        className={`stage ${isReadMore ? 'stage--expanded' : ''}`}
        id="stage"
        ref={stageRef}
        data-hero="true"
        data-theme="glass"
      >
        {/* Hero Visual Fold (Image + Title + Hotspots) */}
        <div className="stage-hero-visual">
          {/* Right-hand Image Stack */}
          <div className="stack">
            {/* Layer 1 = Hero Image */}
            <div className="layer layer--1">
              <div className="ph" style={{ backgroundImage: `url(${heroImgSrc})` }} />
            </div>

            {/* Layer 2 = Overview building image on the right */}
            <div className="layer layer--2">
              <div className="ph" style={{ backgroundImage: `url(${img2Src})` }} />
            </div>
          </div>

          {/* Panel that wipes in from the left (desktop only) */}
          <div className="panel" />

          {/* Hero Initial Copy */}
          <div className="hero-copy">
            <p className="mi" id="dk" style={{ margin: '0 0 14px 0', opacity: 0.95, fontSize: '11.5px', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
              {p.area || 'Malad East'}, Mumbai · {statusDisplay}
            </p>
            <h1>
              <span><b>{p.name}</b></span>
            </h1>
            <p className="crumbs" style={{ marginTop: '16px', marginBottom: 0, pointerEvents: 'auto' }}>
              <Link to="/projects">Projects</Link>
              <span>/</span>
              <span>{p.name}</span>
            </p>
          </div>

          {/* Hotspots overlay positioned on top of the hero visual */}
          <div className="stage-hotspots">
            <span className="mi pick">Select a point of interest +</span>
            <div id="hss">
              {hotspots.map((h, i) => {
                const isHot = activeHotspot === i;
                return (
                  <button
                    key={h.tag}
                    type="button"
                    className={`hs ${isHot ? 'on' : ''}`}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    onClick={(e) => {
                      if (isFpScrollOrDrag()) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      handleHotspotClick(i);
                    }}
                    aria-label={h.tag}
                  >
                    <i>+</i>
                    <span className="mi">{h.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Floating HUD Panel */}
            <div id="pan" className={activeHotspot !== null ? 'on' : ''} aria-live="polite">
              {activeHotspot !== null && (
                <>
                  <span className="mi" id="pk" style={{ color: '#e5c38c', fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', display: 'inline-block', marginBottom: '4px' }}>
                    {hotspots[activeHotspot].tag}
                  </span>
                  {isVinayanand ? (
                    <div className="vinayanand-pointer-content" style={{ marginTop: '8px' }}>
                      <h3 id="pt" style={{ margin: '0 0 6px 0', fontSize: '2rem', color: '#ffffff', fontFamily: 'var(--serif)', fontWeight: 700, letterSpacing: '0.01em' }}>
                        VIR Vinayanand
                      </h3>
                      <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#f3d9b1', fontWeight: 600 }}>
                        Mumbai, Santacruz
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.22)', paddingTop: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#e2e8f0', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.1em', fontWeight: 600 }}>Type:</span>
                          <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '15.5px' }}>BHK</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#e2e8f0', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.1em', fontWeight: 600 }}>Area:</span>
                          <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '15.5px' }}>N/A sqft</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#e2e8f0', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.1em', fontWeight: 600 }}>Ready:</span>
                          <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '15.5px' }}>TBD</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 id="pt">{hotspots[activeHotspot].title}</h3>
                      <p id="pp">{hotspots[activeHotspot].desc}</p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overview & About Column that sits right below the hero fold on mobile */}
        <div className={`col ${isReadMore ? 'col--expanded' : ''}`}>
          <div className="col__inner" ref={colInRef}>
            {/* Overview Image on Mobile (Above text) */}
            <div className="col__mobile-overview-wrap" aria-hidden="true">
              <img
                src={img2Src}
                alt={`${p.name} Overview`}
                className="col__mobile-overview-img"
                loading="eager"
              />
            </div>

            <div className="col__head">
              <h2>Open the doors of {p.name} and step into your true self</h2>
            </div>
            {aboutParas.map((para, i) => {
              const isHiddenOnMobile = !isReadMore && i >= 1;
              const isFirst = i === 0;
              const isLast = i === aboutParas.length - 1;
              const hasMultiple = aboutParas.length > 1;

              return (
                <p
                  key={i}
                  className={`col__para ${isFirst ? 'col__para--lead' : ''} ${isHiddenOnMobile ? 'col__para--mobile-hidden' : ''}`}
                >
                  {para}
                  {/* Inline Read More at the end of the first paragraph on mobile (~7-8 lines) */}
                  {isFirst && hasMultiple && !isReadMore && (
                    <button
                      type="button"
                      className="col__read-more-inline"
                      onClick={() => {
                        setIsReadMore(true);
                        setTimeout(() => {
                          ScrollTrigger.refresh();
                        }, 120);
                      }}
                      aria-expanded={false}
                    >
                      ... Read More
                    </button>
                  )}
                  {/* Inline Read Less at the end of the last paragraph when expanded on mobile */}
                  {isLast && hasMultiple && isReadMore && (
                    <button
                      type="button"
                      className="col__read-more-inline col__read-more-inline--less"
                      onClick={() => {
                        setIsReadMore(false);
                        setTimeout(() => {
                          ScrollTrigger.refresh();
                        }, 120);
                      }}
                      aria-expanded={true}
                    >
                      {' '}Read Less
                    </button>
                  )}
                </p>
              );
            })}

            {/* CTA Buttons below about content: ONLY Download Brochure */}
            <div className="col__actions">
              <button
                type="button"
                onClick={() => {
                  setIsBrochureRequest(true);
                  setSelectedPlanForEnquiry(null);
                  setPendingHotspotIndex(null);
                  setPopupOpen(true);
                }}
                className="col__cta-btn col__cta-btn--primary"
                id="col-brochure-btn"
              >
                <span>Download Brochure</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE RESIDENCES / CURATED FLOOR PLANS */}
      {!isVinayanand && floorPlansList.length > 0 && (
        <section className="fp-section" id="residences" data-theme="basalt" aria-label="Floor Plans and Residence Configurations">
        <div className="fp-container">
          {/* Left Sticky Column */}
          <aside className="fp-sidebar">
            <div className="fp-sidebar-sticky">
              <span className="fp-eyebrow">The Residences</span>
              <h2 className="fp-heading">
                Curated <em>Floor Plans.</em>
              </h2>
              <p className="fp-description">
                Explore meticulously planned layouts designed for exceptional natural cross-ventilation, abundant sunlight, and absolute privacy.
              </p>

              {/* Filter Tabs */}
              <div className="fp-filter-group" role="tablist" aria-label="Filter configurations">
                {['ALL', '1 BHK', '2 BHK', '3 BHK'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={planFilter === tab}
                    className={`fp-filter-pill ${planFilter === tab ? 'active' : ''}`}
                    onClick={() => setPlanFilter(tab)}
                  >
                    {tab === 'ALL' ? 'All Configurations' : tab}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Scrollable Column of Floor Plan Cards */}
          <main className="fp-content">
            {/* Desktop 2-Column Grid */}
            <div className="fp-grid only-desktop-fp">
              {filteredPlans.map((plan) => {
                return (
                  <article
                    key={plan.id}
                    className="fp-card"
                    onClick={() => handleFloorPlanClick(plan)}
                  >
                    {/* Clean Header */}
                    <div className="fp-card-head-clean">
                      <span className="fp-card-type-tag">{plan.type} Floor Plan</span>
                      <span className="fp-card-confidential-tag">
                        {hasUnlockedFloorPlans ? '✓ Unlocked' : '🔒 Confidential'}
                      </span>
                    </div>

                    {/* Image Box with Blur and Lock Overlay */}
                    <div className="fp-card-image-wrap">
                      <img
                        src={fpThumb(plan.img)}
                        alt={`${p.name} - ${plan.type} Floor Plan`}
                        className={`fp-card-image ${hasUnlockedFloorPlans ? '' : 'blurred'}`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => fpImgFallback(e, plan.img)}
                      />
                      {!hasUnlockedFloorPlans ? (
                        <div className="fp-blur-overlay">
                          <span className="fp-lock-cta-text">Unlock Floor Plan</span>
                        </div>
                      ) : (
                        <span className="fp-zoom-hint">🔍 Tap to Zoom</span>
                      )}
                    </div>

                    {/* Footer Action */}
                    <div className="fp-card-footer-clean">
                      <button
                        type="button"
                        className="fp-unlock-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFloorPlanClick(plan);
                        }}
                      >
                        {hasUnlockedFloorPlans ? (
                          <span>View Full Floor Plan ↗</span>
                        ) : (
                          <span>Unlock Floor Plan ↗</span>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile Touch Swiper */}
            <div
              className="fp-mobile-swiper"
              aria-label="Mobile Floor Plans Swiper"
              onClickCapture={handleFpClickCapture}
              onTouchStartCapture={handleFpTouchStart}
              onTouchMoveCapture={handleFpTouchMove}
              onTouchEndCapture={handleFpTouchEnd}
              onTouchCancelCapture={handleFpTouchEnd}
            >
              <div
                className="fp-swiper-track"
                ref={mobileFpTrackRef}
                onScroll={handleMobileFpScroll}
              >
                {filteredPlans.map((plan) => (
                  <div key={plan.id} className="fp-swiper-slide">
                    <article className="fp-card">
                      <div className="fp-card-head-clean">
                        <span className="fp-card-type-tag">{plan.type} Floor Plan</span>
                        <span className="fp-card-confidential-tag">
                          {hasUnlockedFloorPlans ? '✓ Unlocked' : '🔒 Confidential'}
                        </span>
                      </div>
                      <div
                        className="fp-card-image-wrap"
                        onClick={() => {
                          if (!isFpScrollOrDrag()) {
                            handleFloorPlanClick(plan);
                          }
                        }}
                      >
                        <img
                          src={fpThumb(plan.img)}
                          alt={`${p.name} - ${plan.type} Floor Plan`}
                          className={`fp-card-image ${hasUnlockedFloorPlans ? '' : 'blurred'}`}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => fpImgFallback(e, plan.img)}
                        />
                        {!hasUnlockedFloorPlans ? (
                          <div className="fp-blur-overlay">
                            <span className="fp-lock-cta-text">Unlock Floor Plan</span>
                          </div>
                        ) : (
                          <span className="fp-zoom-hint">🔍 Tap to Zoom</span>
                        )}
                      </div>
                      <div className="fp-card-footer-clean">
                        <button
                          type="button"
                          className="fp-unlock-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isFpScrollOrDrag()) {
                              handleFloorPlanClick(plan);
                            }
                          }}
                        >
                          {hasUnlockedFloorPlans ? (
                            <span>View Full Floor Plan ↗</span>
                          ) : (
                            <span>Unlock Floor Plan ↗</span>
                          )}
                        </button>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

              {/* Swiper Controls: Prev/Next Buttons, Pagination Dots & Counter */}
              {filteredPlans.length > 1 && (
                <div className="fp-swiper-controls">
                  <button
                    type="button"
                    className="fp-swiper-arrow fp-swiper-arrow--prev"
                    onClick={() => scrollMobileFp('prev')}
                    disabled={mobileFpIdx === 0}
                    aria-label="Previous floor plan"
                  >
                    ‹
                  </button>
                  <div className="fp-swiper-dots">
                    {filteredPlans.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        className={`fp-swiper-dot ${mobileFpIdx === dotIdx ? 'is-active' : ''}`}
                        onClick={() => scrollMobileFpTo(dotIdx)}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="fp-swiper-arrow fp-swiper-arrow--next"
                    onClick={() => scrollMobileFp('next')}
                    disabled={mobileFpIdx >= filteredPlans.length - 1}
                    aria-label="Next floor plan"
                  >
                    ›
                  </button>
                  <span className="fp-swiper-counter">
                    {mobileFpIdx + 1} / {filteredPlans.length}
                  </span>
                </div>
              )}
            </div>
          </main>
        </div>
      </section>
      )}

      {/* 3. PINNED STICKY REVEAL AMENITIES SECTION (Commented out for VIR Vinayanand) */}
      {!isVinayanand && (
        <section
          className="amen-pinned-stage"
          id="amenities"
          ref={amenStickyStageRef}
          data-theme="basalt"
          aria-label="Curated Amenities & Lifestyle"
        >
        {/* Card 1: Intro Card (Base Layer) */}
        <div className="amen-intro-layer">
          <div className="df-card-img-wrap">
            <div
              className="df-card-img amen-intro-img"
              style={{ backgroundImage: `url(${amenIntroBg})` }}
            />
          </div>
          <div className="amen-intro-overlay" aria-hidden="true" />
          
          <div className="amen-intro-center-wrap">
            <div className="amen-intro-label">
              Curated Lifestyle & Wellness
            </div>

            <div className="amen-intro-big">
              <span>AMENITIES</span>
            </div>

            <p className="amen-intro-txt">
              Immerse yourself in world-class wellness, leisure, and open-air rooftop experiences crafted with timeless elegance.
            </p>
          </div>

          {/* Curated Amenities in Right Bottom */}
          {projectAmenitiesList.length > 0 && (
            <div className="amen-intro-opp-amenities" aria-label={`${p?.name || 'Project'} amenities list`}>
              <div className="amen-opp-tag">
                <span className="amen-opp-tag-sparkle">✦</span>
                <span>{projectAmenitiesList.length} Curated Amenities</span>
              </div>
              <div className="amen-opp-list">
                {projectAmenitiesList.map((item) => (
                  <div key={item} className="amen-opp-item">
                    <span className="amen-opp-dot" aria-hidden="true" />
                    <span className="amen-opp-name">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Subsequent Cards: 2-by-2 Amenity Pairs (Dual-Direction Up/Down Reveal) */}
        {amenityPairs.map((pair, pIdx) => (
          <div
            key={pair.id}
            className={`amen-pair-layer amen-pair--${pIdx + 1}`}
          >
            {/* Left Amenity Pane */}
            <div className="amen-pane amen-pane-left">
              <div
                className="amen-pane-img"
                style={{ backgroundImage: `url(${pair.left.image})` }}
              />
              <div className="amen-pane-hud">
                <h3 className="amen-pane-title">{pair.left.title}</h3>
              </div>
            </div>

            {/* Right Amenity Pane */}
            <div className="amen-pane amen-pane-right">
              <div
                className="amen-pane-img"
                style={{ backgroundImage: `url(${pair.right.image})` }}
              />
              <div className="amen-pane-hud">
                <h3 className="amen-pane-title">{pair.right.title}</h3>
              </div>
            </div>
          </div>
        ))}
        </section>
      )}

      {/* 5. FINAL CTA: FIND THE ADDRESS THAT FITS (WITH INLINE PROJECT FORM) */}
      <FinalCta lines={['Find the address', 'that fits.']} level="Rooftop">
        <ProjectForm projectName={p?.name} />
      </FinalCta>

      {/* Floor Plan Lightbox Modal */}
      {modalPlan && (
        <div
          className="fp-modal-backdrop"
          onClick={() => setModalPlan(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="fp-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="fp-modal-close"
              onClick={() => setModalPlan(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="fp-modal-head">
              <span className="fp-card-type">{modalPlan.type}</span>
              <h3>{modalPlan.type} Floor Plan</h3>
            </div>
            <div className="fp-modal-img-container">
              <img
                src={modalPlan.img}
                alt={`${p.name} - ${modalPlan.type} Floor Plan`}
                className="fp-modal-full-img"
                decoding="async"
              />
            </div>
            <div className="fp-modal-foot">
              <a
                href={`https://wa.me/919326287741?text=Hi%2C+I+want+to+schedule+a+site+visit+for+${encodeURIComponent(p.name)}+${encodeURIComponent(modalPlan.type)}+Floor+Plan`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Schedule Site Visit ↗
              </a>
              <a
                href={`https://wa.me/919326287741?text=Hi%2C+please+share+high-res+PDF+floor+plan+for+${encodeURIComponent(p.name)}+${encodeURIComponent(modalPlan.type)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Request High-Res PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Modal using PopupForm */}
      <PopupForm
        isOpen={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setSelectedPlanForEnquiry(null);
          setIsBrochureRequest(false);
        }}
        onSuccess={() => {
          if (isBrochureRequest) {
            if (p.brochureUrl) {
              window.open(p.brochureUrl, '_blank');
            } else {
              window.open(
                `https://wa.me/919326287741?text=Hello+VIR+Group%2C+please+share+the+brochure+for+${encodeURIComponent(p.name)}`,
                '_blank'
              );
            }
            setIsBrochureRequest(false);
          } else if (selectedPlanForEnquiry) {
            setHasUnlockedFloorPlans(true);
            try {
              sessionStorage.setItem('vir_floorplan_unlocked', 'true');
            } catch {}
            setModalPlan(selectedPlanForEnquiry);
            setSelectedPlanForEnquiry(null);
          } else {
            setHasUnlockedHotspots(true);
            try {
              sessionStorage.setItem('vir_hotspot_lead_submitted', 'true');
            } catch {}
            if (pendingHotspotIndex !== null) {
              setActiveHotspot(pendingHotspotIndex);
            }
          }
        }}
        title={
          isBrochureRequest
            ? `Download Brochure · ${p.name}`
            : selectedPlanForEnquiry
            ? `Unlock ${selectedPlanForEnquiry.type || ''} Floor Plan`
            : pendingHotspotIndex !== null
            ? `Enquire - ${hotspots[pendingHotspotIndex]?.tag}`
            : `Enquire for ${p.name}`
        }
        subtitle={`${p.name} · ${p.area || 'Mumbai'}`}
        defaultProject={p.name}
        defaultSubject={
          isBrochureRequest
            ? `Brochure Download Request: ${p.name}`
            : selectedPlanForEnquiry
            ? `Floor Plan Request: ${p.name} (${selectedPlanForEnquiry.type || 'Configuration'})`
            : pendingHotspotIndex !== null
            ? `Point of Interest: ${hotspots[pendingHotspotIndex]?.tag} (${p.name})`
            : `Project Enquiry: ${p.name}`
        }
      />
    </div>
  );
}