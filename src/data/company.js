// Source: virgroup.in (home, about, team, contact), reviewed 5 Oct 2026.
export const company = {
  name: 'VIR Group',
  founded: 2013,
  founder: 'Veerabhai Prajapati',
  founderRole: 'Founder and Managing Director',
  founderPhoto: 'https://res.cloudinary.com/dwssynxlw/image/upload/v1765974599/vir-group/team/vir-group/team/veerabhai-1765974595862.jpg',
  quote: 'Our strength lies in our unwavering commitment to quality, integrity, and the trust our customers place in us.',
  message:
    'From its roots in Malad, every VIR project, including its landmark VIR Paradise, reflects a commitment to quality and an understanding of what makes a house a home. The customer-centric approach Veerabhai Prajapati set from day one remains the foundation of the group.',
  story: [
    'Founded in 2013, VIR Group set out to create quality homes in Malad. That vision has grown into a legacy of trust, craftsmanship and innovation across Mumbai.',
    'Over more than a decade the group has built more than structures: communities where families settle, grow and stay.',
    'Today VIR Group operates through Global Housing Ventures, Parth Life Space, Digicon Developers and JKD Engineering and Infrastructure.',
  ],
  vision: ['To be Mumbai’s most', 'trusted real estate partner.'],
  visionText: 'A future where every family finds its home, every community thrives, and every structure stands for quality and timeless design.',
  mission: ['Creating homes', 'that inspire life.'],
  missionText: 'Exceptional residential and commercial spaces built on integrity, quality craftsmanship and customer satisfaction.',
  address: 'B-605, Express Zone, Western Express Highway, near Oberoi Mall, Panch Bawadi, Malad East, Mumbai 400063',
  hours: 'Monday to Saturday, 10am to 7pm. Closed Sunday.',
  phone: '+919326287741',
  phoneDisplay: '+91 93262 87741',
  email: 'virgroupmumbai@gmail.com',
  whatsapp: 'https://wa.me/919326287741',
  mapsUrl: 'https://www.google.com/maps?q=19.1766679,72.8580976',
  careersUrl: 'https://www.virgroup.in/careers',
  privacyUrl: 'https://www.virgroup.in/privacy',
  termsUrl: 'https://www.virgroup.in/terms',
  geo: [19.1767, 72.8581],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/vir.group' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/virgroup' },
    { label: 'Facebook', href: 'https://www.facebook.com/virgroupofcompaniesmalad' },
  ],
};
export const companyStats = [
  { id: 'years', value: 13, suffix: '+', label: 'Years building in Mumbai', source: 'virgroup.in/about', verified: true },
  {
    id: 'families',
    value: 100,
    suffix: '+',
    label: 'Families at home',
    source: 'virgroup.in/about',
    verified: false,
    note: 'About page says 100+, homepage says 500+.',
  },
  { id: 'area', value: 1.5, decimals: 1, suffix: 'M+', label: 'Square feet completed', source: 'virgroup.in/about timeline (2025)', verified: false },
];
export const timeline = [
  { year: 2013, title: 'Foundation', text: 'Established with a vision to transform Mumbai.', verified: true },
  { year: 2016, title: 'Expansion', text: 'Completed five residential projects across Mumbai.', verified: false },
  { year: 2020, title: 'Milestone', text: 'Delivered projects for more than 50 families.', verified: false },
  { year: 2022, title: 'Innovation', text: 'Introduced eco-friendly construction practices.', verified: false },
  { year: 2023, title: 'Recognition', text: 'Recognised for excellence in real estate development.', verified: false },
  { year: 2025, title: 'Legacy', text: '1,500,000+ sq ft completed and 100+ families at home.', verified: false },
];
export const values = [
  { name: 'Integrity', text: 'Conducting business with honesty and transparency.' },
  { name: 'Excellence', text: 'An uncompromising commitment to quality.' },
  { name: 'Customer first', text: 'Building relationships that last.' },
  { name: 'Innovation', text: 'Embracing progress while respecting tradition.' },
  { name: 'Trust', text: 'Earning confidence through consistent delivery.' },
  { name: 'Care', text: 'Treating every project as our own home.' },
];
export const groupCompanies = [
  { name: 'Global Housing Ventures', category: 'Real estate development' },
  { name: 'JKD Engineering and Infrastructure Pvt Ltd', category: 'Real estate development' },
  { name: 'Parth Life Space', category: 'Real estate development' },
  { name: 'Viriconic developers pvt ltd', category: 'Real estate development' },
  { name: 'Viru Gems', category: 'Luxury gems and jewellery', needsReview: true },
];
export const mainNav = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];
/** Locality centroids (approximate) for the schematic map. */
export const areas = {
  'Borivali West': [19.2307, 72.8467],
  'Malad West': [19.187, 72.8372],
  'Malad East': [19.1866, 72.86],
  'Goregaon East': [19.165, 72.861],
  'Vile Parle': [19.099, 72.848],
  Santacruz: [19.081, 72.841],
};
