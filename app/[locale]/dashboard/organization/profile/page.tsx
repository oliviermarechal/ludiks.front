import { OrganizationGamificationProfile, OrganizationProfileInfoCard } from '@/components/dashboard/organization-gamification-profile';
import { useTranslations } from 'next-intl';

export default function OrganizationProfilePage() {
  const t = useTranslations('ludiksProfile');
  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto py-6 space-y-10">
        <section>
          <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
          <div className="space-y-2 text-base text-muted-foreground">
            <p>{t('intro1')}</p>
            <p>{t('intro2')}</p>
            <p>{t('intro3')}</p>
          </div>
        </section>
        <section>
          <OrganizationProfileInfoCard />
        </section>
        <section>
          <OrganizationGamificationProfile />
        </section>
      </div>
    </div>
  );
} 