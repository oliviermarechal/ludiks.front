'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/hooks/use-auth.hook';
import { PricingTable } from '@/components/pricing/pricing-table';
import { Link } from '@/lib/navigation';
import { Check, Clock } from 'lucide-react';
import { Navigation } from '@/components/navigation';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const { isAuthenticated } = useAuth();

  const isComingSoon = (feature: string) => {
    return feature === t('features.comingSoon');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
       <Navigation />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>
          
          {/* Highlight Box */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {t('hero.title')}
            </h2>
            <p className="text-purple-100 mb-6">
              {t('hero.description')}
            </p>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-300">
                {t('hero.highlight')}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <PricingTable />
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('features.description')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              {t.raw('features.list').map((feature: string, index: number) => (
                <div key={index} className="flex items-center text-gray-700">
                  {isComingSoon(feature) ? (
                    <Clock className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  ) : (
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  )}
                  <span className={isComingSoon(feature) ? 'text-gray-500' : ''}>
                    {feature}
                    {isComingSoon(feature) && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        Coming soon
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={isAuthenticated ? '/dashboard' : '/auth/registration'}
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('cta.button')}
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center border border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>


      </div>
    </div>
  );
} 