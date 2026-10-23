/** Elevation line drawing: the system's placeholder for missing renders (and the hero motif). */
export function Elevation({
  floors,
  towerWidth: tw,
  columns,
  crown,
  width: W = 600,
  height: H = 400,
  base = 40,
  floorHeight: fh = 12,
  podiumHeight: ph = 34,
  podiumExtra = 64,
  offsetX: dx = 0,
  datum,
  drawable,
  context = [],
  fit = 'slice',
  className,
}) {
  const g = H - base,
    x0 = (W - tw) / 2 + dx,
    th = floors * fh,
    top = g - ph - th;
  const pw = tw + podiumExtra,
    px = (W - pw) / 2 + dx,
    ch = fh * 2.2,
    dxp = px - 40;
  const P = { pathLength: 1 };
  return (
    <svg
      className={`elev${drawable ? ' draw' : ''}${className ? ` ${className}` : ''}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={`xMidYMax ${fit}`}
      aria-hidden="true"
    >
      <line className="g" x1={0} y1={g} x2={W} y2={g} {...P} />
      {context.map(([x, w, h], i) => (
        <rect key={i} className="f" x={x} y={g - h} width={w} height={h} {...P} />
      ))}
      <rect className="l" x={px} y={g - ph} width={pw} height={ph} {...P} />
      <rect className="l" x={x0} y={top} width={tw} height={th} {...P} />
      {Array.from({ length: floors - 1 }, (_, i) => (
        <line key={`f${i}`} className="f" x1={x0} y1={top + (i + 1) * fh} x2={x0 + tw} y2={top + (i + 1) * fh} {...P} />
      ))}
      {Array.from({ length: columns - 1 }, (_, c) => {
        const x = x0 + ((c + 1) * tw) / columns;
        return <line key={`c${c}`} className="f" x1={x} y1={top} x2={x} y2={top + th} {...P} />;
      })}
      <rect className="l" x={x0 - 8} y={top - 8} width={tw + 16} height={8} {...P} />
      {crown && (
        <>
          {Array.from({ length: 5 }, (_, k) => {
            const cx = x0 + 12 + (k * (tw - 24)) / 4;
            return <line key={`p${k}`} className="f" x1={cx} y1={top - 8} x2={cx} y2={top - 8 - ch} {...P} />;
          })}
          <line className="l" x1={x0 + 4} y1={top - 8 - ch} x2={x0 + tw - 4} y2={top - 8 - ch} {...P} />
        </>
      )}
      <rect className="l" x={x0 + tw / 2 - 16} y={g - ph} width={32} height={ph} {...P} />
      {datum && (
        <>
          <circle className="dc" cx={dxp} cy={g} r={6} />
          <path className="dq" d={`M${dxp} ${g}L${dxp + 6} ${g}A6 6 0 0 0 ${dxp} ${g - 6}Z`} />
          <path className="dq" d={`M${dxp} ${g}L${dxp - 6} ${g}A6 6 0 0 0 ${dxp} ${g + 6}Z`} />
          <text className="dt" x={dxp - 14} y={g - 12} textAnchor="end">
            ±0.00
          </text>
        </>
      )}
    </svg>
  );
}
