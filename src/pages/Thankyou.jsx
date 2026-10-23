import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { usePageMeta } from '@/lib/seo/usePageMeta';

export function Thankyou() {
  const [searchParams] = useSearchParams();
  const rawName = searchParams.get('name') || '';
  const project = searchParams.get('project') || searchParams.get('projectSelectValues') || '';
  const type = searchParams.get('type') || '';

  const formattedName = rawName.trim()
    ? rawName.trim().charAt(0).toUpperCase() + rawName.trim().slice(1)
    : '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageMeta({
    title: 'Thank You | VIR Group',
    description:
      'Thank you for your enquiry with VIR Group. Our dedicated real estate advisory team will connect with you shortly.',
    path: '/thank-you',
  });

  return (
    <section className="thankyou-page" data-theme="white">
      <div className="thankyou-bg-layer" aria-hidden="true">
        <div className="thankyou-bg-pattern" />
        <div className="thankyou-bg-radial" />
      </div>
      <div className="wrap thankyou-wrap">
        <div className="thankyou-card" data-fade>
          <div className="thankyou-marker-wrap">
            <LevelMarker name="Enquiry Acknowledged" centered />
          </div>
          <div className="thankyou-emblem" aria-hidden="true">
            <div className="thankyou-emblem-ring" />
            <div className="thankyou-emblem-core">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
          </div>
          <Headline
            as="h1"
            variant="display"
            className="thankyou-title"
            lines={
              formattedName
                ? [`Thank You,`, `${formattedName}.`]
                : ['Thank You for', 'Reaching Out.']
            }
          />

          <p className="thankyou-lead">
            {project && project !== 'General Enquiry' ? (
              <>
                Your expression of interest for <strong>{project}</strong> has been received by our senior real estate advisory desk.
              </>
            ) : type === 'career' ? (
              <>
                Your application has been received by the VIR Group human resources team. We will review your profile shortly.
              </>
            ) : (
              <>
                We appreciate your trust in <strong>VIR Group</strong>. A senior property relationship manager will connect with you within one working day.
              </>
            )}
          </p>

          {/* Action CTAs */}
          <div className="thankyou-actions">
            <Button href="/projects" variant="solid">
              Explore Our Projects
            </Button>
            <Button href="/" variant="ghost">
              Back to Home
            </Button>
            {/* <Button href="/contact" variant="ghost">
              Contact Sales Office
            </Button> */}
          </div>
        </div>
        {/* <p className="crumbs" style={{ marginTop: '24px', marginBottom: 0 }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Confirmation</span>
        </p> */}
      </div>
    </section>
  );
}

export default Thankyou;
