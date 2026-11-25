import { FinalCta } from '@/components/sections/FinalCta';
import { Button } from '@/components/ui/Button';

export function AboutCta() {
  return (
    <FinalCta lines={['Build your', 'next chapter', 'with us.']}>
      <Button href="/projects" variant="ghost">
        Explore projects
      </Button>
      <Button href="/contact" variant="solid" event="project_enquiry">
        Get in touch
      </Button>
    </FinalCta>
  );
}

export default AboutCta;
