export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
/** One delegated listener: any element with data-event="..." is tracked on click. */
export function installClickTracking() {
  const onClick = (e) => {
    const el = e.target?.closest('[data-event]');
    if (el?.dataset.event) track(el.dataset.event, { href: el.getAttribute('href') ?? undefined, page: location.pathname });
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
