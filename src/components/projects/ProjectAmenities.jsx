import { useRef, useState } from 'react';
import { gsap } from '@/lib/animations/gsap';
import { Elevation } from '@/components/ui/Elevation';
/** Sticky visual + list. Each amenity gets its own image once renders exist (swap the Elevation for an <Image>). */
export function ProjectAmenities({ items }) {
  const [active, setActive] = useState(0);
  const nameRef = useRef(null);
  const pick = (i) => {
    if (i === active) return;
    setActive(i);
    if (nameRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      gsap.fromTo(nameRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' });
  };
  return (
    <div className="amen">
      <div className="amen-vis" aria-hidden="true">
        <Elevation floors={22} towerWidth={150} columns={5} crown width={400} height={500} floorHeight={13} />
        <b ref={nameRef}>{items[active]}</b>
      </div>
      <div className="amen-side">
        <ul className="amen-list">
          {items.map((a, i) => (
            <li key={a}>
              <button
                type="button"
                aria-current={i === active ? 'true' : undefined}
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
              >
                {a}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
