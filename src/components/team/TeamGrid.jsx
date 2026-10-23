import { Image } from '@/components/ui/Image';
const initials = (n) =>
  n
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);
function Portrait({ m, sizes, reveal }) {
  return (
    <div className="portrait" data-reveal={reveal ? '' : undefined}>
      {m.photo ? (
        <div className="media-in">
          <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes={sizes} style={{ objectFit: 'cover' }} />
        </div>
      ) : (
        <b>{initials(m.name)}</b>
      )}
    </div>
  );
}
/** Founder feature, then a staggered editorial grid. Names and roles are always visible (touch-friendly). */
export function TeamGrid({ team }) {
  const lead = team.find((t) => t.lead);
  const rest = team.filter((t) => !t.lead);
  return (
    <div className="team">
      {lead && (
        <figure className="person lead-p">
          <Portrait m={lead} sizes="(min-width: 1024px) 40vw, 100vw" reveal />
          <figcaption>
            <b>{lead.name}</b>
            <span>{lead.role}</span>
          </figcaption>
        </figure>
      )}
      {rest.map((m) => (
        <figure className="person" key={m.name} data-fade>
          <Portrait m={m} sizes="(min-width: 1024px) 25vw, 50vw" />
          <figcaption>
            <b>{m.name}</b>
            <span>{m.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
