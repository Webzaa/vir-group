import { Image } from '@/components/ui/Image';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Elevation } from '@/components/ui/Elevation';
const CONTEXT = [
  [40, 170, 150],
  [230, 120, 230],
  [640, 90, 190],
  [860, 130, 140],
  [930, 70, 260],
];
export function ProjectHero({ p, status, config }) {
  const enquire = `/contact?project=${p.slug}`;
  const e = p.elevation;
  const drawing = (dx, cls) => (
    <Elevation
      className={cls}
      floors={e.floors + 8}
      towerWidth={e.towerWidth * 1.1}
      columns={e.columns}
      crown={e.crown}
      drawable
      width={1000}
      height={700}
      base={60}
      floorHeight={16}
      podiumHeight={48}
      podiumExtra={120}
      offsetX={dx}
      context={CONTEXT}
    />
  );
  return (
    <section className="dhero" data-theme="basalt" data-hero="true" aria-labelledby="dh">
      <div className="hero-media">
        {p.hero ? (
          <Image src={p.hero.src} alt={p.hero.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        ) : (
          <>
            {drawing(200, 'only-desk')}
            {drawing(40, 'only-mob')}
          </>
        )}
      </div>
      <div className="hero-scrim" style={p.hero ? { background: 'linear-gradient(0deg, rgba(20,19,17,.8) 0%, rgba(20,19,17,.25) 60%)' } : undefined} />
      {!p.hero && <p className="hero-ph">Project film or render plays here once supplied</p>}
      <div className="wrap in">
        <p className="hero-since" data-intro style={{ marginBottom: 20 }}>
          {status}
          {p.hero?.artisticImpression ? ' · Artistic impression' : ''}
        </p>
        <h1 id="dh" className="t-display" aria-label={p.name}>
          <span className="line" aria-hidden="true">
            <span>{p.name}</span>
          </span>
        </h1>
        <div className="dmeta" data-intro>
          <span>{p.area}, Mumbai</span>
          {config && <span>{config}</span>}
          {p.rera && <span>MahaRERA No. {p.rera}</span>}
        </div>
        {p.tagline && (
          <p className="tagline" data-intro>
            {p.tagline}
          </p>
        )}
        <div className="actions" data-intro>
          <Button href={`${enquire}&subject=Site%20visit`} variant="solid" event="project_enquiry">
            Schedule site visit
          </Button>
          {p.brochureUrl ? (
            <Button href={p.brochureUrl} variant="ghost" event="brochure_download" download={`${p.name || 'Project'} Brochure.pdf`}>
              Download brochure
            </Button>
          ) : (
            <Button href={`${enquire}&subject=Brochure%20request`} variant="ghost" event="brochure_download">
              Request brochure
            </Button>
          )}
          <Button href="tel:+919326287741" variant="ghost" event="phone_click">
            Contact now
          </Button>
        </div>
        <p className="crumbs" data-intro style={{ marginTop: '24px', marginBottom: 0 }}>
          <Link to="/projects">Projects</Link>
          <span>/</span>
          <span>{p.name}</span>
        </p>
      </div>
    </section>
  );
}
