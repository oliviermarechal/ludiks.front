import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = pathname.split('/')[1];
  
  if (locales.includes(pathnameLocale)) {
    return pathnameLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(browserLocale)) {
      return browserLocale;
    }
  }

  return defaultLocale;
}

export default function middleware(request: NextRequest) {
  const locale = getLocale(request);
  
  const url = request.nextUrl.clone();
  if (!locales.includes(url.pathname.split('/')[1])) {
    url.pathname = `/${locale}${url.pathname}`;
    return Response.redirect(url);
  }
  
  const requestWithLocale = new NextRequest(request.url, {
    headers: new Headers(request.headers),
  });
  requestWithLocale.headers.set('x-next-intl-locale', locale);
  
  return createMiddleware({
    locales,
    defaultLocale,
    localeDetection: false,
    localePrefix: 'always'
  })(requestWithLocale);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};