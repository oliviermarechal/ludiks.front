import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function detectBrowserLocale(request: NextRequest) {
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
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = pathname.split('/')[1];
  
  // Si l'URL n'a pas de préfixe de langue, on redirige vers la langue détectée
  if (!locales.includes(pathnameLocale)) {
    const detectedLocale = detectBrowserLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}${url.pathname}`;
    return Response.redirect(url);
  }
  
  // Si l'URL a déjà un préfixe de langue valide, on l'utilise
  const locale = pathnameLocale;
  
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