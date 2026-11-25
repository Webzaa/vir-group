import { LevelMarker } from '@/components/ui/LevelMarker';
import { Headline } from '@/components/ui/Headline';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactWays } from './ContactWays';

export function ContactFormSection({ company, options, project, subject }) {
  return (
    <section data-theme="lime" aria-label="Contact details and form" style={{ paddingBottom: 'clamp(96px,12vw,160px)', paddingTop: 'clamp(56px,7vw,96px)' }}>
      <div className="wrap">
        <ContactWays company={company} />
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
  );
}

export default ContactFormSection;
