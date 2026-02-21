import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Block access to posts page (for all locales)
  const pathname = request.nextUrl.pathname;
  const isPostsPage = pathname === '/posts' || pathname.startsWith('/posts/') || pathname.match(/^\/[a-z]{2}\/posts/);
  
  if (isPostsPage) {
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
