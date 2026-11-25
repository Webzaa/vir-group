import { getMediaUrl } from '@/lib/media';

export function CareersGeneralCta({ onApplyGeneral }) {
  return (
    <section className="careers-v2-cta-sec" data-theme="basalt" aria-labelledby="cta-role-title">
      <div className="careers-v2-cta-bg" aria-hidden="true">
        <img
          src={getMediaUrl('/media/projects-hero-bg.jpg')}
          alt=""
          className="careers-v2-cta-bg-img"
          loading="lazy"
        />
        <div className="careers-v2-cta-scrim" />
      </div>
      <div className="wrap careers-v2-cta-wrap">
        <div className="careers-v2-cta-text">
          <span className="careers-v2-cta-tag">READY TO BUILD YOUR FUTURE?</span>
          <h2 id="cta-role-title" className="careers-v2-cta-title">
            Don't See Your Role?
          </h2>
          <p className="careers-v2-cta-sub">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button
            type="button"
            onClick={onApplyGeneral}
            className="careers-v2-btn-white"
          >
            <span>Send Your Resume</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CareersGeneralCta;
