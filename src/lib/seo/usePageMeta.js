import { useEffect } from 'react';
import { SITE_NAME, SITE_URL } from './site';

const DEFAULT_TITLE = 'VIR Group | Veerabhai Prajapati | Real Estate Developer, Mumbai';
const DEFAULT_DESCRIPTION =
  'VIR Group, founded in 2013 by Veerabhai Prajapati, develops residential projects across Mumbai’s western suburbs, including VIR Paradise in Malad West.';

function setTag(selector, tag, attrs, content) {
  let el = document.head.querySelector(selector);
  if (content == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(tag === 'link' ? 'href' : 'content', content);
}

/** Per-route <head>: title ("%s | VIR Group"), description, canonical and Open Graph. Call with no args for site defaults. */
export function usePageMeta({ title, description = DEFAULT_DESCRIPTION, path, image } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    document.title = fullTitle;
    setTag('meta[name="description"]', 'meta', { name: 'description' }, description);
    setTag('link[rel="canonical"]', 'link', { rel: 'canonical' }, path != null ? `${SITE_URL}${path}` : null);
    setTag('meta[property="og:title"]', 'meta', { property: 'og:title' }, fullTitle);
    const imgSrc = typeof image === 'string' ? image : image?.src;
    let ogImage = null;
    if (imgSrc) {
      try {
        ogImage = new URL(imgSrc, SITE_URL).href;
      } catch {
        ogImage = imgSrc;
      }
    }
    setTag('meta[property="og:image"]', 'meta', { property: 'og:image' }, ogImage);
    setTag('meta[property="og:image:alt"]', 'meta', { property: 'og:image:alt' }, image?.alt ?? null);
  }, [title, description, path, image?.src, image?.alt]);
}
