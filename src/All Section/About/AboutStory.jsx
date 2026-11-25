import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';

export function AboutStory({ story = [] }) {
  return (
    <section className="sec" data-theme="lime" aria-labelledby="os-h" style={{ paddingTop: 0 }}>
      <div className="wrap g12">
        <div className="ca">
          <LevelMarker name="Our story" />
          <Headline id="os-h" lines={['A journey of', 'trust and excellence.']} />
        </div>
        <div className="cb stack">
          {story.map((t, i) => (
            <p key={t} className={i ? 't-body' : 't-lead'} data-fade>
              {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
