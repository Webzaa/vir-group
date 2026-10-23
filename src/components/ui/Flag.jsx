import { SHOW_UNVERIFIED } from '@/lib/flags';
/** Marks data that exists on the current site but is not yet confirmed. Never renders in production. */
export function Flag({ children = 'Pending verification' }) {
  if (!SHOW_UNVERIFIED) return null;
  return <span className="flag">{children}</span>;
}
