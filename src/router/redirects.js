import { projects } from '@/data/projects';

/** Preserves SEO equity from the previous virgroup.in. Used by the client router and, via scripts/generate-seo-files.mjs, by the server (real 301s). */
export const redirects = [
  ...projects.flatMap((p) => (p.legacySlugs ?? []).map((s) => ({ source: `/projects/${s}`, destination: `/projects/${p.slug}`, permanent: true }))),
  { source: '/residential', destination: '/projects', permanent: true },
  { source: '/commercial', destination: '/projects', permanent: true },
  { source: '/upcoming', destination: '/projects', permanent: true },
];
