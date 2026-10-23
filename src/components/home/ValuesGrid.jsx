import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
export function ValuesGrid({ values }) {
  return (
    <section className="sec" data-theme="lime" data-level="+08.00" aria-labelledby="v-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <LevelMarker level="+08.00" name="Values" />
        <Headline id="v-h" lines={['Principles', 'that guide us.']} style={{ marginBottom: 'clamp(48px,6vw,80px)' }} />
        <div className="vals">
          {values.map((v) => (
            <div className="val" key={v.name} data-fade>
              <h3>{v.name}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
