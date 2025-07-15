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
      strategy,
      pricing,
      navigation,
      documentation,
      authLogin,
      authRegistration,
      dashboardCommon,
      dashboardUsers,
      dashboardCircuitsCommon,
      dashboardCircuitsList,
      dashboardCircuitsSteps,
      dashboardCircuitsRewards,
      dashboardCircuitsInsight,
      dashboardCircuitsApiDoc,
      dashboardOrganizationsTeam,
      dashboardOrganizationsBilling,
      onboardingSteps,
      onboardingProject,
      ludiksProfile
    ] = await Promise.all([
      import(`./messages/${validLocale}/common.json`),
      import(`./messages/${validLocale}/home.json`),
      import(`./messages/${validLocale}/strategy.json`),
      import(`./messages/${validLocale}/pricing.json`),
      import(`./messages/${validLocale}/navigation.json`),
      import(`./messages/${validLocale}/documentation.json`),
      import(`./messages/${validLocale}/auth/login.json`),
      import(`./messages/${validLocale}/auth/registration.json`),
      import(`./messages/${validLocale}/dashboard/common.json`),
      import(`./messages/${validLocale}/dashboard/users.json`),
      import(`./messages/${validLocale}/dashboard/circuits/common.json`),
      import(`./messages/${validLocale}/dashboard/circuits/list.json`),
      import(`./messages/${validLocale}/dashboard/circuits/steps.json`),
      import(`./messages/${validLocale}/dashboard/circuits/rewards.json`),
      import(`./messages/${validLocale}/dashboard/circuits/insight.json`),
      import(`./messages/${validLocale}/dashboard/circuits/api-doc.json`),
      import(`./messages/${validLocale}/dashboard/organizations/team.json`),
      import(`./messages/${validLocale}/dashboard/organizations/billing.json`),
      import(`./messages/${validLocale}/onboarding/steps.json`),
      import(`./messages/${validLocale}/onboarding/project.json`),
      import(`./messages/${validLocale}/ludiks-profile.json`),
    ]);

    return {
      locale: validLocale,
      timeZone: 'Europe/Paris',
      now: new Date(),
      messages: {
        common: common.default,
        home: home.default,
        strategy: strategy.default,
        pricing: pricing.default,
        navigation: navigation.default,
        documentation: documentation.default,
        auth: {
          login: authLogin.default,
          registration: authRegistration.default
        },
        dashboard: {
          common: dashboardCommon.default,
          users: dashboardUsers.default,
          circuits: {
            common: dashboardCircuitsCommon.default,
            list: dashboardCircuitsList.default,
            steps: dashboardCircuitsSteps.default,
            rewards: dashboardCircuitsRewards.default,
            insight: dashboardCircuitsInsight.default,
            apiDoc: dashboardCircuitsApiDoc.default
          },
          organizations: {
            team: dashboardOrganizationsTeam.default,
            billing: dashboardOrganizationsBilling.default
          }
        },
        onboarding: {
          steps: onboardingSteps.default,
          project: onboardingProject.default
        },
        ludiksProfile: ludiksProfile.default
      }
    };
  } catch {
    const [
      common,
      home,
      pricing,
      navigation,
      documentation,
      strategy,
      authLogin,
      authRegistration,
      dashboardCommon,
      dashboardUsers,
      dashboardCircuitsCommon,
      dashboardCircuitsList,
      dashboardCircuitsSteps,
      dashboardCircuitsRewards,
      dashboardCircuitsInsight,
      dashboardCircuitsApiDoc,
      dashboardOrganizationsTeam,
      dashboardOrganizationsBilling,
      onboardingSteps,
      onboardingProject
    ] = await Promise.all([
      import(`./messages/${defaultLocale}/common.json`),
      import(`./messages/${defaultLocale}/home.json`),
      import(`./messages/${defaultLocale}/strategy.json`),
      import(`./messages/${defaultLocale}/pricing.json`),
      import(`./messages/${defaultLocale}/navigation.json`),
      import(`./messages/${defaultLocale}/documentation.json`),
      import(`./messages/${defaultLocale}/auth/login.json`),
      import(`./messages/${defaultLocale}/auth/registration.json`),
      import(`./messages/${defaultLocale}/dashboard/common.json`),
      import(`./messages/${defaultLocale}/dashboard/users.json`),
      import(`./messages/${defaultLocale}/dashboard/circuits/common.json`),
      import(`./messages/${defaultLocale}/dashboard/circuits/list.json`),
      import(`./messages/${defaultLocale}/dashboard/circuits/steps.json`),
      import(`./messages/${defaultLocale}/dashboard/circuits/rewards.json`),
      import(`./messages/${defaultLocale}/dashboard/circuits/insight.json`),
      import(`./messages/${defaultLocale}/dashboard/circuits/api-doc.json`),
      import(`./messages/${defaultLocale}/dashboard/organizations/team.json`),
      import(`./messages/${defaultLocale}/dashboard/organizations/billing.json`),
      import(`./messages/${defaultLocale}/onboarding/steps.json`),
      import(`./messages/${defaultLocale}/onboarding/project.json`),
    ]);

    return {
      locale: defaultLocale,
      timeZone: 'Europe/Paris',
      now: new Date(),
      messages: {
        common: common.default,
        home: home.default,
        strategy: strategy.default,
        pricing: pricing.default,
        navigation: navigation.default,
        documentation: documentation.default,
        auth: {
          login: authLogin.default,
          registration: authRegistration.default
        },
        dashboard: {
          common: dashboardCommon.default,
          users: dashboardUsers.default,
          circuits: {
            common: dashboardCircuitsCommon.default,
            list: dashboardCircuitsList.default,
            steps: dashboardCircuitsSteps.default,
            rewards: dashboardCircuitsRewards.default,
            insight: dashboardCircuitsInsight.default,
            apiDoc: dashboardCircuitsApiDoc.default
          },
          organizations: {
            team: dashboardOrganizationsTeam.default,
            billing: dashboardOrganizationsBilling.default
          }
        },
        onboarding: {
          steps: onboardingSteps.default,
          project: onboardingProject.default
        }
      }
    };
  }
}); 