import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';

export function BrandStatement() {
  return (
    <section className="statement" data-theme="basalt" data-level="+01.00" aria-label="Brand statement">
      <div className="wrap statement-wrap">
        <div className="statement-marker">
          <LevelMarker level="+01.00" name="Our approach" />
        </div>
        <div className="statement-block statement-block-left">
          <Headline variant="display" lines={["We don't simply", 'develop spaces.']} reveal={false} />
        </div>
        <div className="statement-block statement-block-right">
          <Headline as="p" variant="display" className="indent" lines={['We shape places', 'where life unfolds.']} reveal={false} />
        </div>
      </div>
    </section>
  );
}

export default BrandStatement;
