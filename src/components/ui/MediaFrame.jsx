import { Image } from '@/components/ui/Image';
import { Elevation } from './Elevation';
/**
 * Fixed-aspect frame with clip-path reveal (data-reveal) and an optional caption.
 * Missing media renders the elevation drawing: never a stock building under a project name.
 */
export function MediaFrame({ media, aspect, sizes, priority, drawing, caption, note = 'Render pending', parallax, className, reveal = true, fit = 'cover' }) {
  const legal = media?.artisticImpression ? 'Artistic impression' : media?.credit;
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div className="media" style={aspect ? { aspectRatio: aspect } : undefined} data-reveal={reveal ? '' : undefined}>
        <div className="media-in" data-parallax={parallax ? '' : undefined}>
          {media ? (
            <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} style={{ objectFit: fit, objectPosition: 'center' }} />
          ) : drawing ? (
            <Elevation {...drawing} />
          ) : null}
        </div>
        {!media && note && <span className="ph-tag">{note}</span>}
        {media && legal && !caption && (
          <span className="ph-tag" style={{ background: 'transparent', color: '#f1ede5' }}>
            {legal}
          </span>
        )}
      </div>
      {caption && (
        <figcaption className="cap t-small">
          <span>
            <b>{caption.subject}</b>
            {caption.detail ? `, ${caption.detail}` : ''}
          </span>
          {legal && <span>{legal}</span>}
        </figcaption>
      )}
    </figure>
  );
}
