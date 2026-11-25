import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { virVinayanand as defaultProject } from '@/data/projects/others';
import { ProjectDetailTemplate } from '@/components/project-details/ProjectDetailTemplate';
import { getMediaUrl } from '@/lib/media';

// Project-specific Hotspots for VIR Vinayanand
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

// Custom HUD rendering exclusively for VIR Vinayanand
const renderVinayanandHud = (hotspot) => (
  <div className="vinayanand-pointer-content" style={{ marginTop: '8px' }}>
    <span className="mi" id="pk" style={{ color: '#e5c38c', fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', display: 'inline-block', marginBottom: '4px' }}>
      {hotspot.tag}
    </span>
    <h3 id="pt" style={{ margin: '0 0 6px 0', fontSize: '2rem', color: '#ffffff', fontFamily: 'var(--serif)', fontWeight: 700, letterSpacing: '0.01em' }}>
      VIR Vinayanand
    </h3>
    <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#f3d9b1', fontWeight: 600 }}>
      {hotspot.location || 'Mumbai, Santacruz'}
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.22)', paddingTop: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#e2e8f0', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.1em', fontWeight: 600 }}>Type:</span>
        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '15.5px' }}>{hotspot.type || 'BHK'}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#e2e8f0', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.1em', fontWeight: 600 }}>Area:</span>
        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '15.5px' }}>{hotspot.area || 'N/A sqft'}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#e2e8f0', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.1em', fontWeight: 600 }}>Ready:</span>
        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '15.5px' }}>{hotspot.ready || 'TBD'}</span>
      </div>
    </div>
  </div>
);

export function Vinayanand(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-enclave', name: 'VIR Enclave' };
  const company = props.company || loaderData.company;

  return (
    <ProjectDetailTemplate
      p={p}
      next={next}
      company={company}
      hotspots={vinayanandHotspots}
      floorPlans={[]}
      amenityPairs={[]}
      amenitiesList={[]}
      overviewImg={getMediaUrl('/media/overview/vinayanand.webp')}
      heroImg={getMediaUrl('/media/projects/project-detail/vinayanand.png')}
      isUpcoming={true}
      customHotspotRenderer={renderVinayanandHud}
    />
  );
}

export { Vinayanand as VirVinayanand, Vinayanand as VirVinayanandSection };
export default Vinayanand;
