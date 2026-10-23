import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Elevation } from '@/components/ui/Elevation';
// three.js, R3F and drei live in their own chunk, fetched one viewport before the viewer.
const BuildingScene = lazy(() => import('@/components/three/BuildingScene'));
const STAGES = [
  { label: 'Overview', stage: 0 },
  { label: 'Arrival', stage: 1 },
  { label: 'Residences', stage: 2 },
  { label: 'Rooftop', stage: 3 },
];
/** 3D viewer with authored views. Falls back to the elevation drawing without WebGL or on low-end devices. */
export function Project3D({ glb, elevation, isMassing }) {
  const box = useRef(null);
  const [near, setNear] = useState(false);
  const [stage, setStage] = useState(0);
  const api = useRef(null);
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const onReady = useCallback((a) => {
    api.current = a;
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '100% 0px' },
    );
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);
  const canRender = near && (tier === 'full' || tier === 'reduced');
  return (
    <div>
      <div className="view-toggle" role="group" aria-label="Camera views">
        {STAGES.map((s) => (
          <button key={s.label} type="button" aria-pressed={stage === s.stage} onClick={() => setStage(s.stage)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="viewer3d" ref={box}>
        {canRender ? (
          <>
            <Suspense fallback={null}>
              <BuildingScene stage={stage} glb={glb} tier={tier === 'full' ? 'full' : 'reduced'} reducedMotion={reduced} onReady={onReady} />
            </Suspense>
            <p className="hint3d">Drag to rotate. Pinch or use + / − to zoom.</p>
            <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', gap: 8 }} className="view-toggle">
              <button type="button" aria-label="Zoom in" onClick={() => api.current?.zoom(8)}>
                +
              </button>
              <button type="button" aria-label="Zoom out" onClick={() => api.current?.zoom(-8)}>
                −
              </button>
              <button
                type="button"
                onClick={() => {
                  setStage(0);
                  api.current?.reset();
                }}
              >
                Reset
              </button>
            </div>
          </>
        ) : (
          <div className="arch-poster">
            <Elevation {...elevation} width={600} height={500} floorHeight={12} podiumHeight={40} podiumExtra={90} fit="meet" />
          </div>
        )}
      </div>
      <p className="t-small" style={{ marginTop: 14 }}>
        {tier === 'static' ? 'The 3D view isn’t available on this device, so the elevation is shown instead. ' : ''}
        {isMassing ? 'Massing study, not to scale. It is replaced by the architect’s model when supplied.' : 'Artistic impression.'}
      </p>
    </div>
  );
}
