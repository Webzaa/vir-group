import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { Flag } from '@/components/ui/Flag';

export function AboutJourney({ timeline = [] }) {
  return (
    <section className="sec" data-theme="basalt" aria-labelledby="tl-h">
      <div className="wrap">
        <LevelMarker name="Our journey" />
        <Headline id="tl-h" variant="display" lines={['A decade', 'of excellence.']} style={{ marginBottom: 'clamp(56px,7vw,112px)' }} />
        <ol className="tl" id="tl">
          <span className="tl-fill" aria-hidden="true" />
          {timeline.map((t) => (
            <li key={t.year} data-fade>
              <b>{t.year}</b>
              <div className="tx">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                {!t.verified && (
                  <p style={{ marginTop: 8 }}>
                    <Flag />
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default AboutJourney;
