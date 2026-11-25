import { useState } from 'react';
import { ScrollTrigger } from '@/lib/animations/gsap';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { Flag } from '@/components/ui/Flag';

export function AboutGroupCompanies({ companies = [] }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="sec" data-theme="basalt" aria-labelledby="gc-h">
      <div className="wrap g12">
        <div className="ca">
          <LevelMarker name="Group companies" />
          <Headline id="gc-h" lines={['United by', 'excellence.']} />
          <p className="t-body muted" style={{ marginTop: 28 }} data-fade>
            Specialised expertise across the group, delivering integrated solutions.
          </p>
        </div>
        <div className="cb">
          <ul className="grp">
            {companies.map((g, i) => (
              <li key={g.name}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`gd${i}`}
                  onClick={() => {
                    setOpen(open === i ? null : i);
                    setTimeout(() => ScrollTrigger.refresh(), 650);
                  }}
                >
                  <b>{g.name}</b>
                  <span aria-hidden="true">+</span>
                </button>
                <div className="gd" id={`gd${i}`}>
                  <div>
                    <p>
                      {g.category}
                      {g.needsReview ? <> <Flag>Client to confirm placement</Flag></> : null}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutGroupCompanies;
