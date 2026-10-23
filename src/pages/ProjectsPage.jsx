import { RevealController } from '@/components/animation/RevealController';
import { ProjectDirectory } from '@/components/projects/ProjectDirectory';
import { FinalCta } from '@/components/sections/FinalCta';
import { Button } from '@/components/ui/Button';
import { useLoaderData } from 'react-router-dom';
import { JsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { usePageMeta } from '@/lib/seo/usePageMeta';

export function ProjectsPage() {
  const { projects, company } = useLoaderData();
  usePageMeta({
    title: 'Projects · VIR Group',
    description: 'Residential projects by VIR Group across Mumbai’s western suburbs: Malad, Borivali, Goregaon, Vile Parle and Santacruz.',
    path: '/projects',
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <ProjectDirectory items={projects} />
      <FinalCta lines={['Find the address', 'that fits.']}>
        <Button href="/contact" variant="solid" event="project_enquiry">
          Talk to our team
        </Button>
        <Button href={`tel:${company.phone}`} variant="ghost" event="phone_click">
          Call {company.phoneDisplay}
        </Button>
      </FinalCta>
      <RevealController />
    </>
  );
}
