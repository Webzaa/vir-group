import { Link, useLoaderData } from 'react-router-dom';
import { HeroReveal } from '@/components/animation/HeroReveal';
import { RevealController } from '@/components/animation/RevealController';
import { MumbaiMap } from '@/components/map/MumbaiMap';
import { Project3D } from '@/components/projects/Project3D';
import { ProjectAmenities } from '@/components/projects/ProjectAmenities';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ResidenceExplorer } from '@/components/projects/ResidenceExplorer';
import { FinalCta } from '@/components/sections/FinalCta';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { Button } from '@/components/ui/Button';
import { Flag } from '@/components/ui/Flag';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { SHOW_UNVERIFIED, areas, configLong, configShort, statusLabel } from '@/lib/content';
import { JsonLd, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld';
import { globalResidency as defaultProject } from '@/data/projects/others';

export function GlobalResidency(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-krishna-koyna', name: 'VIR Krishna Koyna' };
  const company = props.company || loaderData.company || { founded: 1985 };
  const all = props.all || loaderData.all || [];

  const enquire = `/contact?project=${p.slug}`;
  let n = 0;
  const lv = () => `+${String(++n).padStart(2, '0')}.00`;

  const info = [
    ['Status', statusLabel[p.status] || p.status],
    ['Location', `${p.area}, Mumbai`],
    ...(p.configurations?.length ? [['Configuration', configLong(p)]] : []),
    ...(p.rera ? [['MahaRERA No.', p.rera]] : []),
    ['Developer', 'VIR Group'],
  ];

  const hidden = [
    !p.description && 'Project story',
    !p.explorer && 'Residence explorer',
    !p.model3d && '3D model',
    'Interiors',
    'Floor plans',
    'Nearby landmarks',
    'Gallery',
  ].filter(Boolean);

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
      <ProjectHero p={p} status={statusLabel[p.status] || p.status} config={configShort(p)} />

      {p.description && p.statement && (
        <section className="sec" data-theme="lime" aria-labelledby="ps-h">
          <div className="wrap g12">
            <div className="cw">
              <LevelMarker level={lv()} name="The project" />
              <Headline id="ps-h" variant="display" lines={p.statement} />
            </div>
            <div className="cs" style={{ alignSelf: 'end' }}>
              <p className="t-lead" data-fade>
                {p.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {(p.explorer || p.model3d) && (
        <section className="sec" data-theme="lime" aria-labelledby="ex-h" style={{ paddingTop: p.description ? 0 : undefined }}>
          <div className="wrap">
            <div className="sec-head">
              <LevelMarker level={lv()} name="Architecture" />
              <Headline id="ex-h" lines={['From street', 'to sky.']} />
            </div>
            {p.explorer && <ResidenceExplorer explorer={p.explorer} />}
            {p.model3d && (
              <div style={{ marginTop: p.explorer ? 'clamp(64px,8vw,120px)' : 0 }}>
                <h3 className="t-h2" style={{ marginBottom: 24 }}>
                  The building in 3D
                </h3>
                <Project3D glb={p.model3d.glb} elevation={p.elevation} isMassing={!p.model3d.glb} />
              </div>
            )}
          </div>
        </section>
      )}

      {p.amenities && p.amenities.items?.length > 0 && (
        <section className="sec" data-theme="basalt" aria-labelledby="am-h">
          <div className="wrap">
            <LevelMarker level={lv()} name="Amenities" />
            <Headline id="am-h" variant="display" lines={['Designed for', 'the way you live.']} style={{ marginBottom: 'clamp(48px,6vw,80px)' }} />
            {!p.amenities.verified && (
              <p style={{ marginBottom: 20 }}>
                <Flag>Pending verification: hidden in production</Flag>
              </p>
            )}
            <ProjectAmenities items={p.amenities.items} />
          </div>
        </section>
      )}

      <section className="sec" data-theme="lime" aria-labelledby="loc-h">
        <div className="wrap">
          <LevelMarker level={lv()} name="Location" />
          <Headline id="loc-h" variant="display" lines={[`${p.area},`, 'Mumbai.']} style={{ marginBottom: 'clamp(48px,6vw,80px)' }} />
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
                {p.name} sits in {p.area}, part of Mumbai’s western suburbs where VIR Group has built since {company.founded}.
              </p>
              <div className="actions">
                <Button href={`https://www.google.com/maps/search/${encodeURIComponent(`${p.name} ${p.area} Mumbai`)}`}>Open in Google Maps</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" data-theme="lime" aria-labelledby="in-h" style={{ paddingTop: 0 }}>
        <div className="wrap g12">
          <div className="ca">
            <LevelMarker level={lv()} name="Project information" />
            <Headline id="in-h" lines={['At a', 'glance.']} />
          </div>
          <div className="cb">
            <dl className="info">
              {info.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              {p.facts?.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>
                    {f.value} {!f.verified && <Flag>Pending verification: hidden in production</Flag>}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="t-small" style={{ marginTop: 20 }}>
              Only verified fields are shown. All details are subject to change; please verify with our sales team.
            </p>
          </div>
          {SHOW_UNVERIFIED && (
            <div className="devnote cf t-small">
              <p>
                <b>Preview note:</b> hidden for this project until content is supplied: {hidden.join(', ')}.
              </p>
            </div>
          )}
        </div>
      </section>

      <FinalCta lines={['Find the address', 'that fits.']}>
        <ProjectForm projectName={p.name} />
      </FinalCta>

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
