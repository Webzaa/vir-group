import { redirect } from 'react-router-dom';
import {
  getCompany,
  getFeaturedProjects,
  getNextProject,
  getProject,
  getProjects,
  getStats,
  getTeam,
  getTimeline,
  getValues,
  getGroupCompanies,
} from '@/lib/content';

export const rootLoader = async () => ({ company: await getCompany() });

export const homeLoader = async () => {
  const [company, featured, all, paradise, stats, timeline, values] = await Promise.all([
    getCompany(),
    getFeaturedProjects(),
    getProjects(),
    getProject('vir-paradise'),
    getStats(),
    getTimeline(),
    getValues(),
  ]);
  return { company, featured, all, paradise, stats, timeline, values };
};

export const projectsLoader = async () => {
  const [projects, company] = await Promise.all([getProjects(), getCompany()]);
  return { projects, company };
};

export const projectLoader = async ({ params }) => {
  const slug = params.slug;
  const p = await getProject(slug);
  if (!p) throw new Response('Not Found', { status: 404 });
  const [next, company, all] = await Promise.all([getNextProject(slug), getCompany(), getProjects()]);
  return { p, next, company, all };
};

export const aboutLoader = async () => {
  const [company, timeline, values, group] = await Promise.all([getCompany(), getTimeline(), getValues(), getGroupCompanies()]);
  return { company, timeline, values, group };
};

export const teamLoader = async () => {
  const [team, company] = await Promise.all([getTeam(), getCompany()]);
  return { team, company };
};

export const contactLoader = async () => {
  const [company, projects] = await Promise.all([getCompany(), getProjects()]);
  return { company, projects };
};

export const careersLoader = async () => {
  const company = await getCompany();
  return { company };
};

export const faqLoader = async () => {
  const company = await getCompany();
  return { company };
};

export const legalLoader = async () => {
  const company = await getCompany();
  return { company };
};

export const redirectLoader = (to) => () => redirect(to);
