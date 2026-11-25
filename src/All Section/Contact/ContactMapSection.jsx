import { LevelMarker } from '@/components/ui/LevelMarker';

export function ContactMapSection() {
  return (
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
              style={{ border: 0, display: 'block', width: '100%', minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VIR Group Head Office Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMapSection;
