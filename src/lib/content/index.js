/**
 * Content repository. Pages never import /data directly, so this adapter can later read
 * from a CMS or the Laravel API without touching UI code.
 */
import { areas, company, companyStats, groupCompanies, mainNav, timeline, values } from '@/data/company';
import { projects } from '@/data/projects';
import { team } from '@/data/team';
import { SHOW_UNVERIFIED } from '@/lib/flags';
export { SHOW_UNVERIFIED };
function clean(p) {
  if (SHOW_UNVERIFIED) return p;
  return {
    ...p,
    amenities: p.amenities?.verified ? p.amenities : undefined,
    facts: p.facts?.filter((f) => f.verified),
  };
}
export async function getProjects() {
  return projects.map(clean);
}
export async function getFeaturedProjects() {
  const list = projects.filter((p) => p.featured).map(clean);
  return list.sort((a, b) => (a.slug === 'vir-paradise' ? -1 : b.slug === 'vir-paradise' ? 1 : 0));
}
export async function getProject(slug) {
  const p = projects.find((x) => x.slug === slug);
  return p ? clean(p) : undefined;
}
export async function getNextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
export async function getStats() {
  return SHOW_UNVERIFIED ? companyStats : companyStats.filter((s) => s.verified);
}
export async function getTimeline() {
  return timeline;
}
export async function getValues() {
  return values;
}
export async function getGroupCompanies() {
  return groupCompanies;
}
export async function getTeam() {
  return team;
}
export async function getCompany() {
  return company;
}
export { areas, mainNav };
export const statusLabel = {
  ongoing: 'Under development',
  available: 'Available',
  completed: 'Completed',
  upcoming: 'Upcoming',
};
export const filterLabel = {
  ongoing: 'Ongoing',
  available: 'Available',
  completed: 'Completed',
  upcoming: 'Upcoming',
};
/** "1, 2 and 3 BHK" */
export function configLong(p) {
  const c = p?.configurations;
  if (!c || !c.length) return '';
  return `${c.length === 1 ? c[0] : `${c.slice(0, -1).join(', ')} and ${c[c.length - 1]}`} BHK`;
}
/** "1 / 2 / 3 BHK" */
export function configShort(p) {
  const c = p?.configurations;
  return c && c.length ? `${c.join(' / ')} BHK` : '';
}
/** "Borivali West" -> "Borivali" for the location filter. */
export function locality(area) {
  return area.replace(/ (East|West)$/, '');
}
