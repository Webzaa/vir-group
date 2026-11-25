import { Image } from '@/components/ui/Image';
import { Button } from '@/components/ui/Button';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';

export function Founder({ company, level, full }) {
  return (
    <section className="sec" data-theme="lime" data-level={level} aria-labelledby="f-h">
      <div className="wrap g12">
        <figure className="ca" style={{ margin: 0 }}>
          <div className="portrait" data-reveal>
            {company.founderPhoto ? (
              <div className="media-in">
                <Image src={company.founderPhoto} alt={`${company.founder}, ${company.founderRole}`} fill sizes="(min-width: 1024px) 40vw, 100vw" style={{ objectFit: 'cover' }} />
              </div>
            ) : (
              <b>VP</b>
            )}
          </div>
          {full && (
            <figcaption className="cap t-small">
              <span>
                <b>{company.founder}</b>
              </span>
              <span>{company.founderRole}</span>
            </figcaption>
          )}
        </figure>
        <div className="cb" style={{ alignSelf: full ? 'center' : 'end' }}>
          <LevelMarker level={level} name={full ? 'Leadership message' : 'Founder and vision'} />
          <Headline id="f-h" lines={['The vision', 'behind VIR.']} style={{ marginBottom: 32 }} />
          <blockquote className="quote" data-fade>
            “{company.quote}”
          </blockquote>
          {full ? (
            <p className="t-body" data-fade>
              {company.message}
            </p>
          ) : (
            <>
              <div className="who" data-fade>
                <b>{company.founder}</b>
                <span className="t-label">{company.founderRole}</span>
              </div>
              <p style={{ marginTop: 28 }} data-fade>
                <Button href="/about" variant="ghost">Read his message</Button>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Founder;
