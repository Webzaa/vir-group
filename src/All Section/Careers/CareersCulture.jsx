import { getMediaUrl } from '@/lib/media';

export function CareersCulture({ onScrollToPositions }) {
  return (
    <section className="careers-v2-workplace-sec" data-theme="lime" aria-labelledby="workplace-title">
      <div className="wrap">
        <div className="careers-v2-workplace-grid">
          <div className="careers-v2-workplace-content">
            <span className="careers-v2-micro-tag">OUR PEOPLE</span>
            <h2 id="workplace-title" className="careers-v2-sec-title">
              More Than Just a Workplace
            </h2>
            <p className="careers-v2-workplace-text">
              At VIR Group, you'll be part of a passionate team that values collaboration, innovation, and making a positive impact on communities.
            </p>

            <div className="careers-v2-workplace-action">
              <button
                type="button"
                onClick={onScrollToPositions}
                className="careers-v2-btn-dark"
              >
                <span>Life at VIR Group</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            <div className="careers-v2-badges-row">
              <div className="careers-v2-badge-pill">
                <span className="careers-v2-badge-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </span>
                <span>Collaborative Culture</span>
              </div>

              <div className="careers-v2-badge-pill">
                <span className="careers-v2-badge-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </span>
                <span>Diverse Opportunities</span>
              </div>

              <div className="careers-v2-badge-pill">
                <span className="careers-v2-badge-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </span>
                <span>Meaningful Impact</span>
              </div>
            </div>
          </div>

          <div className="careers-v2-mosaic">
            <div className="careers-v2-mosaic-main">
              <img
                src={getMediaUrl('/media/careers-team.jpg')}
                alt="VIR Group Team Collaboration"
                loading="lazy"
                className="careers-v2-mosaic-img"
              />
            </div>
            <div className="careers-v2-mosaic-stack">
              <div className="careers-v2-mosaic-item">
                <img
                  src={getMediaUrl('/media/careers-lounge.jpg')}
                  alt="VIR Group Office Lobby & Reception"
                  loading="lazy"
                  className="careers-v2-mosaic-img"
                />
              </div>
              <div className="careers-v2-mosaic-item">
                <img
                  src={getMediaUrl('/media/careers-meeting.jpg')}
                  alt="Executive Boardroom Conference"
                  loading="lazy"
                  className="careers-v2-mosaic-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersCulture;
