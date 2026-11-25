export function ContactWays({ company }) {
  if (!company) return null;
  return (
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
  );
}

export default ContactWays;
