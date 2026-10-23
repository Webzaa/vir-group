/**
 * Robust media URL resolver for VIR Group.
 * Ensures all image paths (/media/...) resolve correctly at runtime:
 * - When hosted on domain root (https://virgroup.in/media/...)
 * - When hosted in a subfolder (https://example.com/vir-group/media/...)
 * - Across all HTML5 pushState routes (/projects, /team, /projects/slug)
 * - Without 404s or broken relative paths.
 */
export function getMediaUrl(path) {
  if (!path || typeof path !== 'string') return path || '';

  // Already absolute (http://, https://, data:, blob:)
  if (/^(https?:|data:|blob:|\/\/)/i.test(path)) {
    return path;
  }

  // Remove leading slashes or "./"
  const clean = path.replace(/^\.?\/+/, '');
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;

  return `${prefix}${clean}`;
}

