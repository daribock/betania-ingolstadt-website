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
    image: `${siteUrl}/opengraph-image.jpg`,
    description: locale === 'de'
      ? 'Betania Ingolstadt – eine lebendige Pfingstgemeinde in Ingolstadt, Bayern.'
      : 'Betania Ingolstadt – o comunitate penticostală vie în Ingolstadt, Bavaria.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Manchinger Str. 85',
      addressLocality: 'Ingolstadt',
      postalCode: '85053',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@betania.de',
    },
    sameAs: [
      'https://www.instagram.com/betaniaingolstadt/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}
