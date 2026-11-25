import { Link } from 'react-router-dom';
import { getMediaUrl } from '@/lib/media';

export function ContactHero() {
  return (
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
  );
}

export default ContactHero;
