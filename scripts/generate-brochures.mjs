import fs from 'node:fs';
import path from 'node:path';

const brochuresDir = path.resolve(process.cwd(), 'public', 'brochures');
if (!fs.existsSync(brochuresDir)) {
  fs.mkdirSync(brochuresDir, { recursive: true });
}

const projects = [
  {
    slug: 'opportunity',
    name: 'Codename Opportunity',
    area: 'Malad East',
    rera: 'MahaRERA Approved',
    config: '1, 2 and 3 BHK Luxury Residences',
  },
  {
    slug: 'vir-paradise',
    name: 'VIR Paradise',
    area: 'Malad West',
    rera: 'P51800079526',
    config: '1, 2 and 3 BHK Homes with Rooftop Retreat',
  },
  {
    slug: 'vir-enclave',
    name: 'VIR Enclave',
    area: 'Borivali West',
    rera: 'P51800049641',
    config: '1, 2 and 3 BHK Thoughtfully Planned Homes',
  },
  {
    slug: 'global-residency',
    name: 'Global Residency',
    area: 'Goregaon',
    rera: 'P51800009478',
    config: '1 and 2 BHK Ready Homes',
  },
  {
    slug: 'vir-krishna-koyna',
    name: 'VIR Krishna Koyna',
    area: 'Borivali West',
    rera: 'P51800051234',
    config: '1, 2 and 3 BHK Premium Residences',
  },
  {
    slug: 'surya-prakash',
    name: 'Surya Prakash CHSL',
    area: 'Vile Parle',
    rera: 'MahaRERA Registered',
    config: '1, 2 and 3 BHK Residences',
  },
  {
    slug: 'vir-vinayanand',
    name: 'VIR Vinayanand',
    area: 'Santacruz',
    rera: 'Coming Soon',
    config: '1, 2 and 3 BHK Luxury Apartments',
  },
  {
    slug: 'vir-grace',
    name: 'VIR Grace',
    area: 'Borivali West',
    rera: 'Upcoming Project',
    config: 'Exclusive 1, 2 and 3 BHK Apartments',
  },
  {
    slug: 'vir-chandrapuri',
    name: 'VIR Chandrapuri',
    area: 'Kandivali West',
    rera: 'Upcoming Project',
    config: 'Modern 1, 2 and 3 BHK Residences',
  },
  {
    slug: 'vir-sanket',
    name: 'VIR Sanket',
    area: 'Goregaon East',
    rera: 'Upcoming Project',
    config: 'Spacious 1, 2 and 3 BHK Residences',
  },
];

function sanitize(str) {
  return (str || '').replace(/[()\\]/g, '');
}

function buildPdf(p) {
  const content = [
    'BT',
    '/F1 26 Tf',
    '50 720 Td',
    '(VIR GROUP) Tj',
    'ET',
    'BT',
    '/F1 18 Tf',
    '50 670 Td',
    `(${sanitize(p.name)} - OFFICIAL BROCHURE) Tj`,
    'ET',
    'BT',
    '/F2 13 Tf',
    '50 625 Td',
    `(Location: ${sanitize(p.area)}, Mumbai) Tj`,
    'ET',
    'BT',
    '/F2 13 Tf',
    '50 595 Td',
    `(Configuration: ${sanitize(p.config)}) Tj`,
    'ET',
    'BT',
    '/F2 12 Tf',
    '50 565 Td',
    `(MahaRERA Registration: ${sanitize(p.rera)}) Tj`,
    'ET',
    'BT',
    '/F2 11 Tf',
    '50 500 Td',
    `(${sanitize(p.name)} is an exceptional development by VIR Group in ${sanitize(p.area)}, Mumbai.) Tj`,
    'ET',
    'BT',
    '/F2 10.5 Tf',
    '50 470 Td',
    '(Featuring contemporary architecture, curated lifestyle amenities, and prime connectivity.) Tj',
    'ET',
    'BT',
    '/F1 12 Tf',
    '50 410 Td',
    '(KEY AMENITIES & FEATURES:) Tj',
    'ET',
    'BT',
    '/F2 10 Tf',
    '50 380 Td',
    '(- World-Class Fitness Center & Gymnasium) Tj',
    'ET',
    'BT',
    '/F2 10 Tf',
    '50 360 Td',
    '(- Landscaped Gardens & Senior Citizen Seating Areas) Tj',
    'ET',
    'BT',
    '/F2 10 Tf',
    '50 340 Td',
    '(- 24/7 Multi-Tier High Tech Security & CCTV Surveillance) Tj',
    'ET',
    'BT',
    '/F2 10 Tf',
    '50 320 Td',
    '(- High-Speed Elevators & Grand Entrance Lobby) Tj',
    'ET',
    'BT',
    '/F2 10 Tf',
    '50 300 Td',
    '(- Children Play Zone & Recreation Area) Tj',
    'ET',
    'BT',
    '/F1 11 Tf',
    '50 230 Td',
    '(FOR SALES & SITE VISIT ENQUIRIES:) Tj',
    'ET',
    'BT',
    '/F2 10.5 Tf',
    '50 205 Td',
    '(Phone: +91 93262 87741  |  Email: contact@virgroup.in) Tj',
    'ET',
    'BT',
    '/F2 10.5 Tf',
    '50 185 Td',
    '(Website: www.virgroup.in) Tj',
    'ET',
    'BT',
    '/F2 8 Tf',
    '50 80 Td',
    '(Disclaimer: Artistic impression. Specifications, layouts and details are subject to approval by relevant authorities.) Tj',
    'ET',
  ].join('\n');

  const streamLength = Buffer.byteLength(content, 'utf8');

  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 =
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents 4 0 R >>\nendobj\n';
  const obj4 = `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${content}\nendstream\nendobj\n`;

  const header = '%PDF-1.4\n';
  const offset1 = Buffer.byteLength(header, 'utf8');
  const offset2 = offset1 + Buffer.byteLength(obj1, 'utf8');
  const offset3 = offset2 + Buffer.byteLength(obj2, 'utf8');
  const offset4 = offset3 + Buffer.byteLength(obj3, 'utf8');
  const xrefOffset = offset4 + Buffer.byteLength(obj4, 'utf8');

  const pad = (n) => String(n).padStart(10, '0');

  const xref = [
    'xref',
    '0 5',
    '0000000000 65535 f ',
    `${pad(offset1)} 00000 n `,
    `${pad(offset2)} 00000 n `,
    `${pad(offset3)} 00000 n `,
    `${pad(offset4)} 00000 n `,
    'trailer',
    '<< /Size 5 /Root 1 0 R >>',
    'startxref',
    String(xrefOffset),
    '%%EOF',
  ].join('\n');

  return Buffer.from(header + obj1 + obj2 + obj3 + obj4 + xref, 'utf8');
}

for (const p of projects) {
  const filePath = path.join(brochuresDir, `${p.slug}-brochure.pdf`);
  const pdfBytes = buildPdf(p);
  fs.writeFileSync(filePath, pdfBytes);
  console.log(`Created: ${p.slug}-brochure.pdf (${pdfBytes.length} bytes)`);
}
