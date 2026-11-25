export function TeamLeadership({ founder, partner, director, leadershipMember }) {
  return (
    <section
      className="team-leadership-sec"
      data-theme="lime"
      aria-label="Executive Leadership"
    >
      <div className="team-leadership-inner">
        <div className="team-leadership-stack">
          {founder && (
            <article className="leader-feature leader-feature--image-left">
              <div className="leader-feature-media">
                <div className="leader-feature-frame">
                  <img
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role}`}
                    loading="eager"
                  />
                </div>
              </div>
              <div className="leader-feature-content">
                <span className="leader-feature-role">{founder.role}</span>
                <h2 className="leader-feature-name">{founder.name}</h2>
                {founder.quote && (
                  <blockquote className="leader-feature-quote">
                    “{founder.quote}”
                  </blockquote>
                )}
                <p className="leader-feature-bio">{founder.bio}</p>
              </div>
            </article>
          )}

          {partner && (
            <article className="leader-feature leader-feature--image-right">
              <div className="leader-feature-content">
                <span className="leader-feature-role">{partner.role}</span>
                <h2 className="leader-feature-name">{partner.name}</h2>
                <p className="leader-feature-bio">{partner.bio}</p>
              </div>
              <div className="leader-feature-media">
                <div className="leader-feature-frame">
                  <img
                    src={partner.photo}
                    alt={`${partner.name}, ${partner.role}`}
                    loading="eager"
                  />
                </div>
              </div>
            </article>
          )}

          {director && (
            <article className="leader-feature leader-feature--image-left">
              <div className="leader-feature-media">
                <div className="leader-feature-frame">
                  <img
                    src={director.photo}
                    alt={`${director.name}, ${director.role}`}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="leader-feature-content">
                <span className="leader-feature-role">{director.role}</span>
                <h2 className="leader-feature-name">{director.name}</h2>
                <p className="leader-feature-bio">{director.bio}</p>
              </div>
            </article>
          )}

          {leadershipMember && (
            <article className="leader-feature leader-feature--image-right">
              <div className="leader-feature-content">
                <span className="leader-feature-role">{leadershipMember.role}</span>
                <h2 className="leader-feature-name">{leadershipMember.name}</h2>
                <p className="leader-feature-bio">{leadershipMember.bio}</p>
              </div>
              <div className="leader-feature-media">
                <div className="leader-feature-frame">
                  <img
                    src={leadershipMember.photo}
                    alt={`${leadershipMember.name}, ${leadershipMember.role}`}
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

export default TeamLeadership;
