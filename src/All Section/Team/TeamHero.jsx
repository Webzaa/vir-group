import { Link } from 'react-router-dom';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { getMediaUrl } from '@/lib/media';

export function TeamHero() {
  return (
    <section
      className="team-hero"
      data-theme="basalt"
      data-hero="true"
      aria-labelledby="leadership-heading"
    >
      <div className="team-hero-bg" aria-hidden="true">
        <img
          src={getMediaUrl('/media/careers-meeting.jpg')}
          alt=""
          className="team-hero-bg-img"
          loading="eager"
          fetchPriority="high"
        />
        <div className="team-hero-scrim" />
      </div>

      <div className="wrap team-hero-inner">
        <LevelMarker name="Leadership & Vision" />
        <Headline
          as="h1"
          id="leadership-heading"
          variant="display"
          lines={['Founders & Leadership.']}
          reveal={false}
        />
        <p className="team-hero-desc">
          Guided by decades of craftsmanship, ethical principles, and an enduring passion for redefining luxury living across Mumbai.
        </p>
        <p className="crumbs" style={{ marginTop: '24px', marginBottom: 0 }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Team</span>
        </p>
      </div>
    </section>
  );
}

export default TeamHero;
