import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getIgnoredPaths, isPathIgnored } from '@/lib/ignored-paths';

const intlMiddleware = createMiddleware(routing);
const ignoredPaths = getIgnoredPaths();

const hasAdminSegment = (path: string) =>
  path.split('/').some((segment) => segment === 'admin');

const isAdminReferer = (referer: string | null): boolean => {
  if (!referer) return false;
  try {
    return hasAdminSegment(new URL(referer).pathname);
  } catch {
    return false;
  }
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Don't block paths when admin is present in the path or referer —
  // this allows TinaCMS admin to access posts and locale-specific pages for editing.
  if (
    !hasAdminSegment(pathname) &&
    !isAdminReferer(request.headers.get('referer')) &&
    isPathIgnored(pathname, ignoredPaths)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue with internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … `/admin` paths (for Tina CMS)
  matcher: '/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)',
};
