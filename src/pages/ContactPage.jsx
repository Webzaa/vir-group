import { useLoaderData, useSearchParams } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import {
  ContactHero,
  ContactFormSection,
  ContactMapSection,
} from '@/All Section/Contact';

export function ContactPage() {
  const { company, projects = [] } = useLoaderData();
  const [params] = useSearchParams();
  const project = params.get('project') ?? '';
  const subject = params.get('subject') ?? '';

  usePageMeta({
    title: 'Contact | Malad East office',
    description: 'Contact VIR Group: call, email or visit our office in Malad East, Mumbai. Monday to Saturday, 10am to 7pm.',
    path: '/contact',
  });

  const options = projects.map((p) => ({ slug: p.slug, label: `${p.name}, ${p.area}` }));

  return (
    <>
      <ContactHero />
      <ContactFormSection
        company={company}
        options={options}
        project={project}
        subject={subject}
      />
      <ContactMapSection />
    </>
  );
}

export default ContactPage;
