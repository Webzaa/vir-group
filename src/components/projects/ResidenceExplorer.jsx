import { useId, useState } from 'react';
import { LevelMarker } from '@/components/ui/LevelMarker';
const W = 600,
  H = 640,
  G = 600,
  PH = 54,
  FH = 19,
  TW = 230,
  X0 = (W - TW) / 2 - 40;
/**
 * Image-free residence explorer: a schematic elevation where each level is selectable by hover,
 * click, slider or the three zone buttons. Floor plates and unit plans plug into the panel
 * once drawings exist (see `explorer` in the project data).
 */
export function ResidenceExplorer({ explorer }) {
  const F = explorer.floors;
  const top = G - PH - F * FH,
    crownTop = top - 8 - 44;
  const [level, setLevel] = useState(Math.round(F * 0.6));
  const id = useId();
  const clamp = (l) => Math.max(0, Math.min(F + 1, l));
  const zone = level === 0 ? 'arrival' : level === F + 1 ? 'rooftop' : 'residences';
  const Z = explorer.zones[zone];
  const name = level === 0 ? 'Ground and podium' : level === F + 1 ? 'Roof' : `Level ${String(level).padStart(2, '0')}`;
  const tag = level === 0 ? 'Arrival' : level === F + 1 ? 'Rooftop' : `Level ${String(level).padStart(2, '0')}`;
  const y = level === 0 ? G - PH / 2 : level === F + 1 ? (crownTop + top) / 2 : G - PH - (level - 0.5) * FH;
  const set = (l) => setLevel(clamp(l));
  return (
    <div className="exp">
      <div className="exp-fig">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <line className="g" x1={0} y1={G} x2={W} y2={G} />
          <rect className="l" x={X0 - 50} y={G - PH} width={TW + 100} height={PH} />
          <rect className="l" x={X0} y={top} width={TW} height={F * FH} />
          {Array.from({ length: F - 1 }, (_, i) => (
            <line key={`f${i}`} className="f" x1={X0} y1={top + (i + 1) * FH} x2={X0 + TW} y2={top + (i + 1) * FH} />
          ))}
          {Array.from({ length: 5 }, (_, c) => (
            <line key={`c${c}`} className="f" x1={X0 + ((c + 1) * TW) / 6} y1={top} x2={X0 + ((c + 1) * TW) / 6} y2={top + F * FH} />
          ))}
          <rect className="l" x={X0 - 8} y={top - 8} width={TW + 16} height={8} />
          {Array.from({ length: 5 }, (_, k) => {
            const cx = X0 + 12 + (k * (TW - 24)) / 4;
            return <line key={`p${k}`} className="f" x1={cx} y1={top - 8} x2={cx} y2={crownTop} />;
          })}
          <line className="l" x1={X0 + 4} y1={crownTop} x2={X0 + TW - 4} y2={crownTop} />
          <rect
            className={`hit${level === 0 ? ' on' : ''}`}
            x={X0 - 50}
            y={G - PH}
            width={TW + 100}
            height={PH}
            onMouseEnter={() => set(0)}
            onClick={() => set(0)}
          />
          {Array.from({ length: F }, (_, i) => i + 1).map((l) => (
            <rect
              key={l}
              className={`hit${level === l ? ' on' : ''}`}
              x={X0}
              y={G - PH - l * FH}
              width={TW}
              height={FH}
              onMouseEnter={() => set(l)}
              onClick={() => set(l)}
            />
          ))}
          <rect
            className={`hit${level === F + 1 ? ' on' : ''}`}
            x={X0 - 8}
            y={crownTop}
            width={TW + 16}
            height={top - crownTop}
            onMouseEnter={() => set(F + 1)}
            onClick={() => set(F + 1)}
          />
          <line className="tagline" x1={X0 + TW} x2={X0 + TW + 60} y1={y} y2={y} />
          <text className="tag" x={X0 + TW + 68} y={y + 4}>
            {tag}
          </text>
        </svg>
      </div>
      <div className="exp-panel">
        <LevelMarker name="Residence explorer" />
        <div aria-live="polite">
          <p className="t-label">{name}</p>
          <h3 className="t-h2">{Z.title}</h3>
          <p className="t-body">{Z.text}</p>
          {zone === 'residences' && (
            <p className="t-small" style={{ marginTop: 12 }}>
              Floor plate and unit plans for this level: awaiting drawings.
            </p>
          )}
        </div>
        <div className="exp-ctrl">
          <button type="button" aria-label="Level down" onClick={() => set(level - 1)}>
            ↓
          </button>
          <input
            id={id}
            type="range"
            min={0}
            max={F + 1}
            value={level}
            aria-label="Choose a level"
            aria-valuetext={name}
            onChange={(e) => set(Number(e.target.value))}
          />
          <button type="button" aria-label="Level up" onClick={() => set(level + 1)}>
            ↑
          </button>
        </div>
        <div className="exp-zones">
          <button type="button" aria-pressed={zone === 'arrival'} onClick={() => set(0)}>
            Arrival
          </button>
          <button type="button" aria-pressed={zone === 'residences'} onClick={() => set(Math.round(F / 2))}>
            Residences
          </button>
          <button type="button" aria-pressed={zone === 'rooftop'} onClick={() => set(F + 1)}>
            Rooftop
          </button>
        </div>
        <p className="t-small exp-cap">Schematic elevation. Floor count and zones are indicative until architectural drawings are supplied.</p>
      </div>
    </div>
  );
}
