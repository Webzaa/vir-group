import { useEffect, useState } from 'react';
/** full: desktop, pinned 3D. reduced: tablet/phone, lighter 3D unpinned. static: no WebGL or reduced motion. */
export function useDeviceTier() {
  const [tier, setTier] = useState(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webgl = false;
    try {
      const c = document.createElement('canvas');
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      webgl = false;
    }
    const mem = navigator.deviceMemory ?? 8;
    if (!webgl || reduced || mem < 2) setTier('static');
    else if (window.matchMedia('(min-width: 1024px)').matches && (navigator.hardwareConcurrency ?? 4) >= 4) setTier('full');
    else setTier('reduced');
  }, []);
  return tier;
}
