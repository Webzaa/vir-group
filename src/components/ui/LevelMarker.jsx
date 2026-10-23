import { Datum } from './Datum';
/** Datum symbol + optional level + section name. Levels only on real sequences (home, project chapters). */
export function LevelMarker({ level, name, centered }) {
  const label = name || level;
  return (
    <div className="lvl" style={centered ? { justifyContent: 'center' } : undefined}>
      {label && (
        <>
          <span className="lvl-r" />
          <span className="lvl-n">{label}</span>
          {centered && <span className="lvl-r" />}
        </>
      )}
    </div>
  );
}
