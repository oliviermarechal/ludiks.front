import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  const headersList = await headers();
  const middlewareLocale = headersList.get('x-next-intl-locale');
  
  const validLocale = (middlewareLocale && locales.includes(middlewareLocale))
    ? middlewareLocale
    : (locale && locales.includes(locale) ? locale : defaultLocale);
  
  try {
    const [
      common,
      home,
      authLogin,
      authRegistration,
      dashboardCommon,
      onboardingSteps
    ] = await Promise.all([
      import(`./messages/${validLocale}/common.json`),
      import(`./messages/${validLocale}/home.json`),
      import(`./messages/${validLocale}/auth/login.json`),
      import(`./messages/${validLocale}/auth/registration.json`),
      import(`./messages/${validLocale}/dashboard/common.json`),
      import(`./messages/${validLocale}/onboarding/steps.json`),
    ]);

    return {
      locale: validLocale,
      timeZone: 'Europe/Paris',
      now: new Date(),
      messages: {
        common: common.default,
        home: home.default,
        auth: {
          login: authLogin.default,
          registration: authRegistration.default
        },
        dashboard: {
          common: dashboardCommon.default
        },
        onboarding: {
          steps: onboardingSteps.default
        }
      }
    };
  } catch {
    const [
      common,
      home,
      authLogin,
      authRegistration,
      dashboardCommon,
      onboardingSteps
    ] = await Promise.all([
      import(`./messages/${defaultLocale}/common.json`),
      import(`./messages/${defaultLocale}/home.json`),
      import(`./messages/${defaultLocale}/auth/login.json`),
      import(`./messages/${defaultLocale}/auth/registration.json`),
      import(`./messages/${defaultLocale}/dashboard/common.json`),
      import(`./messages/${defaultLocale}/onboarding/steps.json`),
    ]);

    return {
      locale: defaultLocale,
      timeZone: 'Europe/Paris',
      now: new Date(),
      messages: {
        common: common.default,
        home: home.default,
        auth: {
          login: authLogin.default,
          registration: authRegistration.default
        },
        dashboard: {
          common: dashboardCommon.default
        },
        onboarding: {
          steps: onboardingSteps.default
        }
      }
    };
  }
}); 