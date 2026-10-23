import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { RevealController } from '@/components/animation/RevealController';
import { ContactForm } from '@/components/forms/ContactForm';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { getMediaUrl } from '@/lib/media';

export function ContactPage() {
  const { company, projects } = useLoaderData();
  const [params] = useSearchParams();
  const project = params.get('project') ?? '';
  const subject = params.get('subject') ?? '';
  usePageMeta({
    title: 'Contact | Malad East office',
    description: 'Contact VIR Group: call, email or visit our office in Malad East, Mumbai. Monday to Saturday, 10am to 7pm.',
    path: '/contact',
  });
  const options = projects.map((p) => ({ slug: p.slug, label: `${p.name}, ${p.area}` }));
  return (
    <>
      <section className="contact-hero" data-theme="basalt" data-hero="true" aria-labelledby="ch">
        <div className="contact-hero-bg">
          <img
            src={getMediaUrl('/media/Contact-Us_Deskto-Slider.jpg')}
            alt="Contact VIR Group"
            className="contact-hero-img"
          />
          <div className="contact-hero-overlay" />
        </div>
        <div className="wrap contact-hero-content">
          <h1 id="ch" className="contact-hero-title">
            GET IN TOUCH.
          </h1>
          <p className="contact-hero-subtitle" data-fade>
            Questions about a project, a site visit or working with us. We’re here to help.
          </p>
          <p className="crumbs" style={{ marginTop: '24px', marginBottom: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </p>
        </div>
      </section>
      <section data-theme="lime" aria-label="Contact details and form" style={{ paddingBottom: 'clamp(96px,12vw,160px)', paddingTop: 'clamp(56px,7vw,96px)' }}>
        <div className="wrap">
          <div className="ways">
            <div className="way" data-fade>
              <h2>Call</h2>
              <a href={`tel:${company.phone}`} data-event="phone_click">
                {company.phoneDisplay}
              </a>
              <p className="t-small muted">{company.hours}</p>
            </div>
            <div className="way" data-fade>
              <h2>Email</h2>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <p className="t-small muted">
                <a href={company.whatsapp} data-event="whatsapp_click" style={{ font: 'inherit' }}>
                  Or message us on WhatsApp
                </a>
              </p>
            </div>
            <div className="way" data-fade>
              <h2>Visit</h2>
              <address style={{ fontStyle: 'normal' }}>
                <p style={{ fontSize: 'clamp(0.92rem, 1.05vw, 1.15rem)', lineHeight: 1.5 }}>{company.address}</p>
              </address>
              <p className="t-small">
                <a href={company.mapsUrl} style={{ font: 'inherit', textDecoration: 'underline' }}>
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
          <div className="g12 contact-form-grid">
            <div className="ca">
              <LevelMarker name="Send a message" />
              <Headline lines={['Tell us what', 'you’re looking for.']} />
              <p className="t-body muted" style={{ marginTop: 24 }} data-fade>
                We reply within one working day.
              </p>
            </div>
            <ContactForm projects={options} defaultProject={options.some((o) => o.slug === project) ? project : ''} defaultSubject={subject.slice(0, 160)} />
          </div>
        </div>
      </section>

      {/* Office Location Map (Pure White Background) */}
      <section className="contact-map-sec" aria-label="Visit Our Head Office">
        <div className="wrap">
          <div className="contact-map-block" data-fade>
            <div className="contact-map-header">
              <LevelMarker name="Location Map" />
              <h2 className="contact-map-title">Visit Our Head Office</h2>
            </div>
            <div className="contact-map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.424154186001!2d72.8580976!3d19.176667899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b834ff28e9%3A0x9f6fd34672620c06!2sVIR%20GROUP!5e0!3m2!1sen!2sin!4v1791622634636!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="VIR GROUP Location Map"
                className="contact-map-iframe"
              />
            </div>
          </div>
        </div>
      </section>
      <RevealController />
    </>
  );
}
