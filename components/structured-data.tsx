interface StructuredDataProps {
  locale: string;
}

export function OrganizationStructuredData({ locale }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://betania-ingolstadt.de';

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'Betania Ingolstadt',
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/uploads/logos/betania-logo-bg.png`,
    description: locale === 'de'
      ? 'Betania Ingolstadt - Gemeinde'
      : 'Betania Ingolstadt - Comunitate',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Manchinger Str. 85',
      addressLocality: 'Ingolstadt',
      postalCode: '85053',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiry',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@betania.de',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}
