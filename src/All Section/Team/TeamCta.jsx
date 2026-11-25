import { FinalCta } from '@/components/sections/FinalCta';
import { Button } from '@/components/ui/Button';

export function TeamCta() {
  return (
    <FinalCta
      tag="Join Our Team"
      lines={['Want to Be Part of', 'Something Amazing?']}
      description="We're always looking for talented individuals who share our passion for creating exceptional real estate experiences."
    >
      <Button href="/careers" variant="ghost">
        View Open Positions
      </Button>
      <Button href="/contact?subject=Careers" variant="solid">
        Contact HR
      </Button>
    </FinalCta>
  );
}

export default TeamCta;
