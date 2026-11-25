export function AboutVisionMission({ company }) {
  if (!company) return null;
  return (
    <section className="sec" data-theme="lime" aria-label="Vision and mission">
      <div className="wrap">
        <div className="vm">
          <div data-fade>
            <h3>Our vision</h3>
            <p>
              {company.vision?.[0]} <span className="it">{company.vision?.[1]}</span>
            </p>
            <p className="t-body">{company.visionText}</p>
          </div>
          <div data-fade>
            <h3>Our mission</h3>
            <p>
              {company.mission?.[0]} <span className="it">{company.mission?.[1]}</span>
            </p>
            <p className="t-body">{company.missionText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutVisionMission;
