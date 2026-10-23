import { Link, useLoaderData } from 'react-router-dom';
import { HeroReveal } from '@/components/animation/HeroReveal';
import { RevealController } from '@/components/animation/RevealController';
import { getMediaUrl } from '@/lib/media';
import { GroupCompanies } from '@/components/about/GroupCompanies';
import { Founder } from '@/components/home/Founder';
import { FinalCta } from '@/components/sections/FinalCta';
import { Button } from '@/components/ui/Button';
import { Elevation } from '@/components/ui/Elevation';
import { Flag } from '@/components/ui/Flag';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { usePageMeta } from '@/lib/seo/usePageMeta';
const CONTEXT = [
  [40, 170, 150],
  [230, 120, 230],
  [640, 90, 190],
  [860, 130, 140],
  [930, 70, 260],
];
export function AboutPage() {
  const { company, timeline, values, group } = useLoaderData();
  usePageMeta({
    title: 'About | Veerabhai Prajapati, Founder and Managing Director',
    description: 'Since 2013, Veerabhai Prajapati has led VIR Group. Our story, values, journey and group companies.',
    path: '/about',
  });
  return (
    <>
      <section className="phero about-hero" data-theme="basalt" data-hero="true" aria-labelledby="ah" style={{ minHeight: '70vh', display: 'flex', alignItems: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-media">
          <img src={getMediaUrl('/media/about-bg.png')} alt="VIR Group Mumbai Skyline and Architecture" className="about-hero-img" loading="eager" fetchPriority="high" />
        </div>
        <div className="hero-scrim about-hero-scrim" />
        <div className="wrap" style={{ position: 'relative', zIndex: 1, width: '100%', paddingBottom: 'clamp(40px, 6vh, 80px)' }}>
          <p className="hero-since" data-intro style={{ marginBottom: 20 }}>
            Since {company.founded}
          </p>
          <Headline as="h1" id="ah" variant="display" lines={['Building legacy.', 'Creating homes.']} reveal={false} />
          <p className="crumbs" data-intro style={{ marginTop: '28px', marginBottom: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </p>
        </div>
      </section>
      <Founder company={company} full />
      <section className="sec" data-theme="lime" aria-labelledby="os-h" style={{ paddingTop: 0 }}>
        <div className="wrap g12">
          <div className="ca">
            <LevelMarker name="Our story" />
            <Headline id="os-h" lines={['A journey of', 'trust and excellence.']} />
          </div>
          <div className="cb stack">
            {company.story.map((t, i) => (
              <p key={t} className={i ? 't-body' : 't-lead'} data-fade>
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" data-theme="basalt" aria-labelledby="tl-h">
        <div className="wrap">
          <LevelMarker name="Our journey" />
          <Headline id="tl-h" variant="display" lines={['A decade', 'of excellence.']} style={{ marginBottom: 'clamp(56px,7vw,112px)' }} />
          <ol className="tl" id="tl">
            <span className="tl-fill" aria-hidden="true" />
            {timeline.map((t) => (
              <li key={t.year} data-fade>
                <b>{t.year}</b>
                <div className="tx">
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  {!t.verified && (
                    <p style={{ marginTop: 8 }}>
                      <Flag />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" data-theme="lime" aria-labelledby="cv-h">
        <div className="wrap">
          <LevelMarker name="Core values" />
          <Headline id="cv-h" lines={['Principles', 'that guide us.']} style={{ marginBottom: 'clamp(40px,5vw,64px)' }} />
          <div className="vals vals-big">
            {values.map((v) => (
              <div className="val" key={v.name}>
                <Headline as="h3" variant="h2" lines={[v.name]} italic={false} />
                <p data-fade>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" data-theme="basalt" aria-labelledby="gc-h">
        <div className="wrap g12">
          <div className="ca">
            <LevelMarker name="Group companies" />
            <Headline id="gc-h" lines={['United by', 'excellence.']} />
            <p className="t-body muted" style={{ marginTop: 28 }} data-fade>
              Specialised expertise across the group, delivering integrated solutions.
            </p>
          </div>
          <div className="cb">
            <GroupCompanies companies={group} reviewNote={<Flag>Client to confirm placement</Flag>} />
          </div>
        </div>
      </section>

      <section className="sec" data-theme="lime" aria-label="Vision and mission">
        <div className="wrap">
          <div className="vm">
            <div data-fade>
              <h3>Our vision</h3>
              <p>
                {company.vision[0]} <span className="it">{company.vision[1]}</span>
              </p>
              <p className="t-body">{company.visionText}</p>
            </div>
            <div data-fade>
              <h3>Our mission</h3>
              <p>
                {company.mission[0]} <span className="it">{company.mission[1]}</span>
              </p>
              <p className="t-body">{company.missionText}</p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta lines={['Build your', 'next chapter', 'with us.']}>
        <Button href="/projects" variant="ghost">
          Explore projects
        </Button>
        <Button href="/contact" variant="solid" event="project_enquiry">
          Get in touch
        </Button>
      </FinalCta>
      <HeroReveal />
      <RevealController />
    </>
  );
}
