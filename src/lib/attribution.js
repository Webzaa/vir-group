import { ATTRIBUTION_KEYS } from '@/lib/validation/lead';
const KEY = 'vir_attr';
/** First-touch attribution, captured once per visitor (30-day cookie) and sent with every lead. */
export function captureAttribution() {
  if (typeof document === 'undefined' || document.cookie.includes(`${KEY}=`)) return;
  const sp = new URLSearchParams(location.search);
  const a = Object.fromEntries(ATTRIBUTION_KEYS.map((k) => [k, '']));
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid'].forEach((k) => {
    a[k] = sp.get(k) ?? '';
  });
  a.landing_page = location.href;
  a.referrer = document.referrer;
  document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(a))}; Max-Age=${60 * 60 * 24 * 30}; Path=/; SameSite=Lax`;
}
export function readAttribution() {
  const m = document.cookie.match(new RegExp(`${KEY}=([^;]+)`));
  try {
    return m ? JSON.parse(decodeURIComponent(m[1])) : {};
  } catch {
    return {};
  }
}
