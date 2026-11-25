import { LevelMarker } from '@/components/ui/LevelMarker';
import { Headline } from '@/components/ui/Headline';
import { MumbaiMap } from '@/components/map/MumbaiMap';

export function MumbaiMapSection({ mapProjects, areas, company }) {
  return (
    <section className="sec map-sec" data-theme="white" data-level="+06.00" aria-labelledby="map-h">
      <div className="wrap map-header-wrap">
        <LevelMarker level="+06.00" name="Mumbai presence" />
        <Headline id="map-h" lines={['Rooted in the western suburbs.']} style={{ marginBottom: 'clamp(28px,4vw,48px)' }} />
      </div>
      <MumbaiMap projects={mapProjects} areas={areas} office={company.geo} withPanel enableScrollPin />
    </section>
  );
}

export default MumbaiMapSection;
