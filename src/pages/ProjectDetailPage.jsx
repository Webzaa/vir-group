import { useLoaderData } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { InteractiveProjectDetail } from '@/components/project-details/InteractiveProjectDetail';

export function ProjectDetailPage() {
  const { p, next, company, all } = useLoaderData();
  usePageMeta({
    title: p?.seo?.title || `${p?.name}, ${p?.area}`,
    description: p?.seo?.description || `${p?.name} by VIR Group`,
    path: `/projects/${p?.slug}`,
    image: p?.hero,
  });

  return <InteractiveProjectDetail p={p} next={next} company={company} all={all} />;
}
