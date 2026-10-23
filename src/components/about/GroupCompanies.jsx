import { useState } from 'react';
import { ScrollTrigger } from '@/lib/animations/gsap';
/** Editorial list; each company expands to show its domain. `reviewNote` is rendered by the server (dev only). */
export function GroupCompanies({ companies, reviewNote }) {
  const [open, setOpen] = useState(null);
  return (
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
                {g.needsReview && reviewNote ? <> {reviewNote}</> : null}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
