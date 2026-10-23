import { Link, useLoaderData } from 'react-router-dom';
import { HeroReveal } from '@/components/animation/HeroReveal';
import { RevealController } from '@/components/animation/RevealController';
import { MumbaiMap } from '@/components/map/MumbaiMap';
import { ProjectAmenities } from '@/components/projects/ProjectAmenities';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { FinalCta } from '@/components/sections/FinalCta';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { Button } from '@/components/ui/Button';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { areas, statusLabel } from '@/lib/content';
import { JsonLd, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld';
import { opportunity as defaultProject } from '@/data/projects/opportunity';

export function Opportunity(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-paradise', name: 'VIR Paradise' };
  const company = props.company || loaderData.company || { founded: 1985 };
  const all = props.all || loaderData.all || [];

  const enquire = `/contact?project=${p.slug}`;
  let n = 0;
  const lv = () => `+${String(++n).padStart(2, '0')}.00`;

  const highlights = [
    { title: '4 Iconic Towers', subtitle: 'G+45 Residential Towers', icon: '🏢' },
    { title: '2-Acre Podium', subtitle: 'Integrated Lifestyle Podium', icon: '🌿' },
    { title: '1-2-3 BHK', subtitle: 'Expansive Configurations', icon: '✨' },
    { title: '1199999 sq.ft', subtitle: 'Total Carpet Area', icon: '📐' },
  ];

  const specifications = [
    { label: 'Property Type', value: 'Luxury Residential Development' },
    { label: 'Carpet Area', value: '1199999 sq.ft' },
    { label: 'Configuration', value: '1-2-3 BHK' },
    { label: 'Land Parcel', value: '2-Acre integrated podium' },
    { label: 'Towers', value: '4 Iconic G+45 residential towers' },
    { label: 'Location', value: 'Malad East, Mumbai' },
    { label: 'Status', value: statusLabel[p.status] || 'Under development' },
    { label: 'Developer', value: 'VIR Group' },
  ];

  const amenitiesList = p.amenities?.items || [
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

  const paragraphs = p.aboutParagraphs || [
    'Codename Opportunity is an exclusive luxury residential destination thoughtfully designed for those who appreciate refined living and timeless elegance. Located in the fast-growing neighborhood of Malad East, Mumbai, the development combines contemporary architecture, spacious residences, and thoughtfully curated amenities to create a lifestyle that is both sophisticated and serene.',
    'Spread across a 2-acre integrated podium, the project features four iconic G+45 residential towers, offering expansive homes crafted with exceptional attention to detail. Every space has been designed to enhance natural light, comfort, and functionality, creating an environment where everyday living feels effortless and inspiring.',
    "Beyond its impressive architecture, Codename Opportunity offers a carefully curated lifestyle with premium amenities, landscaped open spaces, and seamless connectivity to the city's major destinations. It is a place where luxury is expressed through thoughtful design, peaceful surroundings, and experiences that enrich everyday life.",
    'More than just a residential address, Codename Opportunity is a landmark that reflects modern aspirations, combining exclusivity, convenience, and lasting value for families seeking an elevated way of life.',
  ];

  const mapProjects = all.map((x) => ({ slug: x.slug, name: x.name, area: x.area, status: statusLabel[x.status] }));

  return (
    <>
      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />

      {/* Hero Section */}
      <ProjectHero p={p} status={statusLabel[p.status] || 'Under development'} config="1-2-3 BHK" />

      {/* Quick Highlights Strip */}
      <section className="sec" data-theme="lime" style={{ paddingTop: 'clamp(32px,4vw,56px)', paddingBottom: 'clamp(32px,4vw,56px)', borderBottom: '1px solid var(--rule)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--rule)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span style={{ fontSize: '28px', lineHeight: 1 }} aria-hidden="true">{h.icon}</span>
                <div>
                  <b style={{ display: 'block', fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>{h.title}</b>
                  <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>{h.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About This Property Section */}
      <section className="sec" data-theme="lime" aria-labelledby="about-h">
        <div className="wrap">
          <div className="sec-head">
            <LevelMarker level={lv()} name="The project" />
            <Headline id="about-h" variant="display" lines={['About This', 'Property.']} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'var(--gutter)',
              marginTop: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <div style={{ gridColumn: 'span 12' }}>
              <p
                className="t-lead"
                data-fade
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.65rem)',
                  lineHeight: 1.5,
                  color: 'var(--ink)',
                  marginBottom: '32px',
                  maxWidth: '48em',
                }}
              >
                {paragraphs[0]}
              </p>
            </div>

            <div
              style={{
                gridColumn: 'span 12',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '28px',
                marginTop: '16px',
              }}
            >
              {paragraphs.slice(1).map((para, idx) => (
                <div key={idx} style={{
                  padding: '28px',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--rule)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                >
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                    {para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Specifications Section */}
      <section className="sec" data-theme="lime" aria-labelledby="specs-h" style={{ paddingTop: 0 }}>
        <div className="wrap g12">
          <div className="ca">
            <LevelMarker level={lv()} name="Property Specifications" />
            <Headline id="specs-h" lines={['Property', 'Specifications.']} />
            <p className="t-small" style={{ marginTop: '20px', color: 'var(--ink-muted)', maxWidth: '28em' }}>
              Detailed structural and spatial specifications of Codename Opportunity.
            </p>
          </div>
          <div className="cb">
            <dl className="info">
              {specifications.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd style={{ fontWeight: 500 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Amenities & Features Section */}
      <section className="sec" data-theme="basalt" aria-labelledby="am-h">
        <div className="wrap">
          <div className="sec-head">
            <LevelMarker level={lv()} name="Amenities & Features" />
            <Headline id="am-h" variant="display" lines={['Curated for an', 'elevated lifestyle.']} style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }} />
          </div>

          {/* Grid of 20 Amenities */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '16px',
              marginBottom: 'clamp(48px, 6vw, 80px)',
            }}
          >
            {amenitiesList.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '20px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent, #c2a77d)',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#f5f2eb' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Interactive Visual Experience */}
          <ProjectAmenities items={amenitiesList} />
        </div>
      </section>

      {/* Location Section */}
      <section className="sec" data-theme="lime" aria-labelledby="loc-h">
        <div className="wrap">
          <LevelMarker level={lv()} name="Location" />
          <Headline id="loc-h" variant="display" lines={['Malad East,', 'Mumbai.']} style={{ marginBottom: 'clamp(48px,6vw,80px)' }} />
          <div className="map">
            {p.mapEmbed ? (
              <div className="map-fig-wrap map-embed-frame">
                <iframe
                  src={p.mapEmbed}
                  width="100%"
                  height="450"
                  style={{ border: 0, display: 'block', width: '100%', minHeight: '380px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${p.name} on Google Maps`}
                />
              </div>
            ) : (
              <MumbaiMap projects={mapProjects} areas={areas} office={company.geo} focus={p.area} />
            )}
            <div className="map-panel">
              <p className="t-lead">
                {p.name} is situated in Malad East, Mumbai, with seamless connectivity to the Western Express Highway, SV Road, metro stations, and leading commercial corridors.
              </p>
              <div className="actions">
                <Button href={`https://www.google.com/maps/search/${encodeURIComponent(`${p.name} ${p.area} Mumbai`)}`}>
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice Disclaimer Section */}
      <section className="sec" data-theme="lime" style={{ paddingTop: 0, paddingBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div className="wrap">
          <div
            style={{
              padding: '24px 28px',
              background: 'var(--surface-raised)',
              borderLeft: '4px solid var(--accent, #c2a77d)',
              borderRadius: '4px',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-muted)' }}>
              <b style={{ color: 'var(--ink)', marginRight: '6px' }}>Important:</b>
              All details are subject to change. Please verify with our sales team before making decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCta lines={['Find the address', 'that fits.']}>
        <ProjectForm projectName={p.name} />
      </FinalCta>

      {/* Next Project */}
      <section data-theme="basalt" aria-label="Next project">
        <div className="wrap">
          <Link className="nextp" to={`/projects/${next.slug}`}>
            <p className="t-label">Next project</p>
            <b>{next.name}</b>
          </Link>
        </div>
      </section>

      <HeroReveal />
      <RevealController />
    </>
  );
}
