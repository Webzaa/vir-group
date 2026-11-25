import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';

export function AboutValues({ values = [] }) {
  return (
    <section className="sec" data-theme="lime" aria-labelledby="cv-h">
      <div className="wrap">
        <LevelMarker name="Core values" />
        <Headline id="cv-h" lines={['Principles', 'that guide us.']} style={{ marginBottom: 'clamp(40px,5vw,64px)' }} />
        <div className="vals vals-big">
          {values.map((v) => (
            <div className="val" key={v.name}>
              <Headline as="h3" variant="h2" lines={[v.name]} italic={false} />
              <p data-fade>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
