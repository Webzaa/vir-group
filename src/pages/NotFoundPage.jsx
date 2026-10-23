import { Button } from '@/components/ui/Button';
import { Headline } from '@/components/ui/Headline';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { useRouteError } from 'react-router-dom';

export function NotFoundPage() {
  const error = useRouteError();
  if (error) {
    console.error('Route error caught by NotFoundPage:', error);
  }
  usePageMeta({ title: 'Page not found' });
  return (
    <section className="phero" data-theme="lime" style={{ minHeight: '80vh' }}>
      <div className="wrap">
        <Headline as="h1" variant="display" lines={['This address', 'doesn’t exist.']} reveal={false} />
        <p className="t-lead">The page may have moved. Every VIR project is listed on the projects page.</p>
        <div className="actions">
          <Button href="/projects" variant="solid">
            View all projects
          </Button>
          <Button href="/" variant="ghost">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
