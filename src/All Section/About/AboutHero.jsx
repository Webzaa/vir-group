import { Link } from 'react-router-dom';
import { Headline } from '@/components/ui/Headline';
import { getMediaUrl } from '@/lib/media';

export function AboutHero({ company }) {
  return (
    <section className="phero about-hero" data-theme="basalt" data-hero="true" aria-labelledby="ah" style={{ minHeight: '70vh', display: 'flex', alignItems: 'flex-end', position: 'relative', overflow: 'hidden' }}>
      <div className="hero-media">
        <img src={getMediaUrl('/media/about-bg.png')} alt="VIR Group Mumbai Skyline and Architecture" className="about-hero-img" loading="eager" fetchPriority="high" />
      </div>
      <div className="hero-scrim about-hero-scrim" />
      <div className="wrap" style={{ position: 'relative', zIndex: 1, width: '100%', paddingBottom: 'clamp(40px, 6vh, 80px)' }}>
        <p className="hero-since" data-intro style={{ marginBottom: 20 }}>
          Since {company?.founded || 1985}
        </p>
        <Headline as="h1" id="ah" variant="display" lines={['Building legacy.', 'Creating homes.']} reveal={false} />
        <p className="crumbs" data-intro style={{ marginTop: '28px', marginBottom: 0 }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>About</span>
        </p>
      </div>
    </section>
  );
}

export default AboutHero;
