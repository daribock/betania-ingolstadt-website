import type { MetadataRoute } from 'next';
import client from '@/tina/__generated__/client';
import { routing } from '@/i18n/routing';
import { getIgnoredPaths, isPathIgnored } from '@/lib/ignored-paths';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.betania.de';
  const ignoredPaths = getIgnoredPaths();

  const entries: MetadataRoute.Sitemap = [];

  // Add locale home pages
  for (const locale of routing.locales) {
    const localizedHomePath = `/${locale}`;
    if (isPathIgnored(localizedHomePath, ignoredPaths)) continue;

    entries.push({
      url: `${siteUrl}${localizedHomePath}`,
      changeFrequency: 'weekly',
      priority: 1.0,
    });
  }

  // Add all content pages
  try {
    // ⚡ Bolt: Increase batch size to 100 to reduce sequential N+1 queries during sitemap generation
    let pages = await client.queries.pageConnection({ first: 100 });
    const pageEdges = [...(pages.data.pageConnection.edges ?? [])];

    while (pages.data.pageConnection.pageInfo.hasNextPage) {
      // ⚡ Bolt: Increase batch size to 100 to reduce sequential N+1 queries during sitemap generation
      pages = await client.queries.pageConnection({
        first: 100,
        after: pages.data.pageConnection.pageInfo.endCursor,
      });
      if (!pages.data.pageConnection.edges) break;
      pageEdges.push(...pages.data.pageConnection.edges);
    }

    for (const edge of pageEdges) {
      const breadcrumbs = edge?.node?._sys.breadcrumbs ?? [];
      if (breadcrumbs.length < 2) continue;
      const locale = breadcrumbs[0];
      const pathSegments = breadcrumbs.slice(1);

      if (!routing.locales.includes(locale)) continue;
      if (pathSegments.every((s: string) => s === 'home')) continue;

      const localizedPagePath = `/${locale}/${pathSegments.join('/')}`;
      if (isPathIgnored(localizedPagePath, ignoredPaths)) continue;

      entries.push({
        url: `${siteUrl}${localizedPagePath}`,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  } catch {
    // Silently skip if pages cannot be fetched
  }

  return entries;
}
