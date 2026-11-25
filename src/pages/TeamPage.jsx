import { useLoaderData } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import {
  TeamHero,
  TeamLeadership,
  TeamCarousel,
  TeamCta,
} from '@/All Section/Team';

export function TeamPage() {
  const { team = [], company = {} } = useLoaderData();

  usePageMeta({
    title: 'Team | Leadership & Core Team',
    description: 'Meet the VIR Group team, led by founder Veerabhai Prajapati, Tarun Prajapati, Harsh Prajapati, and Simon Prajapati.',
    path: '/team',
  });

  // Founder and Managing Director (Top: Left Image, Right Text)
  const founder = {
    name: 'Veerabhai Prajapati',
    role: 'Founder and Managing Director',
    photo:
      team.find((m) => m.name === 'Veerabhai Prajapati')?.photo ||
      company.founderPhoto ||
      'https://res.cloudinary.com/dwssynxlw/image/upload/v1765974599/vir-group/team/vir-group/team/veerabhai-1765974595862.jpg',
    quote: company.quote || 'Our strength lies in our unwavering commitment to quality, integrity, and the trust our customers place in us.',
    bio: 'With over three decades of pioneering experience, Veerabhai Prajapati founded VIR Group in 2013 on the principles of transparency, craftsmanship, and timeless quality. His visionary leadership continues to shape landmark residential developments across Mumbai, taking every project from the first architectural line to handover.',
  };

  // Partner (Bottom: Left Text, Right Image)
  const partner = {
    name: 'Tarun Prajapati',
    role: 'Partner',
    photo:
      team.find((m) => m.name === 'Tarun Prajapati')?.photo ||
      'https://res.cloudinary.com/dwssynxlw/image/upload/v1767848913/vir-group/team/vir-group/team/whatsapp-image-2026-01-08-at-1-1767848913713.jpg',
    bio:
      team.find((m) => m.name === 'Tarun Prajapati')?.bio ||
      'Championing strategic execution, operational excellence, and lasting partnerships, Tarun Prajapati brings dynamic hands-on leadership to VIR Group. He oversees project delivery, modern construction methodologies, and business synergies to steer the group towards a forward-looking future.',
  };

  // Director (Left Image, Right Text)
  const director = {
    name: 'Harsh Prajapati',
    role: 'Director',
    photo:
      team.find((m) => m.name === 'Harsh Prajapati')?.photo ||
      'https://res.cloudinary.com/dwssynxlw/image/upload/v1765974482/vir-group/team/vir-group/team/harsh-prajapati--1765974479308.jpg',
    bio:
      team.find((m) => m.name === 'Harsh Prajapati')?.bio ||
      'Directing strategic growth, architectural innovation, and operational excellence, Harsh Prajapati brings dynamic executive leadership to VIR Group. He oversees project development, modern engineering standards, and execution rigor to ensure each residential development reflects lasting value and uncompromising quality.',
  };

  // Founders and leadership (Left Text, Right Image)
  const leadershipMember = {
    name: 'Simon Prajapati',
    role: 'Executive leadership',
    photo:
      team.find((m) => m.name === 'Simon Prajapati')?.photo ||
      'https://res.cloudinary.com/dwssynxlw/image/upload/v1767781041/vir-group/team/vir-group/team/simon-prajapati-1767781041058.jpg',
    bio:
      team.find((m) => m.name === 'Simon Prajapati')?.bio ||
      'Guiding VIR Group with foundational vision and enduring core values, Simon Prajapati fosters collaborative relationships, ethical governance, and customer trust. His dedication to stakeholder synergy and community-centric development strengthens the group’s mission of delivering timeless living spaces.',
  };

  // Core team members in the carousel (excluding the executive leadership team)
  const coreTeam = team.filter(
    (m) =>
      m.name !== 'Veerabhai Prajapati' &&
      m.name !== 'Tarun Prajapati' &&
      m.name !== 'Harsh Prajapati' &&
      m.name !== 'Simon Prajapati'
  );

  return (
    <>
      <TeamHero />
      <TeamLeadership
        founder={founder}
        partner={partner}
        director={director}
        leadershipMember={leadershipMember}
      />
      <TeamCarousel coreTeam={coreTeam} />
      <TeamCta />
    </>
  );
}

export default TeamPage;
