import { SITE_URL } from './site';

export { SITE_URL };
export function organizationJsonLd(c) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: c.name,
    alternateName: 'Veer Group',
    url: SITE_URL,
    foundingDate: String(c.founded),
    founder: { '@type': 'Person', name: c.founder, jobTitle: c.founderRole },
    email: c.email,
    telephone: c.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-605, Express Zone, Western Express Highway, Malad East',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400063',
      addressCountry: 'IN',
    },
    sameAs: c.social.map((s) => s.href),
  };
}
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}
export function projectJsonLd(p) {
  if (!p) return {};
  const imgSrc = typeof p.hero === 'string' ? p.hero : p.hero?.src;
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: p.name || '',
    description: p.description ?? p.seo?.description ?? p.tagline ?? '',
    url: `${SITE_URL}/projects/${p.slug || ''}`,
    address: { '@type': 'PostalAddress', addressLocality: `${p.area || 'Mumbai'}, Mumbai`, addressRegion: 'Maharashtra', addressCountry: 'IN' },
    ...(imgSrc ? { image: imgSrc } : {}),
    ...(p.amenities?.verified && p.amenities.items ? { amenityFeature: p.amenities.items.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })) } : {}),
  };
}
export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
