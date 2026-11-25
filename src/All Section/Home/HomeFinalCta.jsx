import { FinalCta } from '@/components/sections/FinalCta';
import { Button } from '@/components/ui/Button';

export function HomeFinalCta() {
  return (
    <FinalCta lines={['Your next address', 'starts here.']} level="Rooftop">
      <Button href="/projects" variant="ghost">
        Explore projects
      </Button>
      <Button href="/contact" variant="solid" event="project_enquiry">
        Enquire now
      </Button>
    </FinalCta>
  );
}

export default HomeFinalCta;
