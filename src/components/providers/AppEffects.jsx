import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';
import { installClickTracking } from '@/lib/analytics/track';
/** Global side effects: first-touch attribution, delegated analytics clicks, and auto-refresh on mobile/desktop toggle. */
export function AppEffects() {
  useEffect(() => {
    captureAttribution();
    return installClickTracking();
  }, []);

  // Auto-refresh when inspecting and toggling between desktop and mobile view (< 900px)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(max-width: 899px)');
    const handleBreakpointChange = () => {
      window.location.reload();
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handleBreakpointChange);
    } else if (mql.addListener) {
      mql.addListener(handleBreakpointChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleBreakpointChange);
      } else if (mql.removeListener) {
        mql.removeListener(handleBreakpointChange);
      }
    };
  }, []);

  return null;
}
