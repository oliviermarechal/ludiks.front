'use client';

import { useTranslations } from 'next-intl';

export function PricingTable() {
  const t = useTranslations('pricing');

  const tiers = [
    {
      range: t('pricing.tiers.tier1'),
      price: t('pricing.tiers.price1'),
      description: t('pricing.tiers.free'),
      highlight: true
    },
    {
      range: t('pricing.tiers.tier2'),
      price: t('pricing.tiers.price2'),
      description: 'Volume discount'
    },
    {
      range: t('pricing.tiers.tier3'),
      price: t('pricing.tiers.price3'),
      description: 'Better rate'
    },
    {
      range: t('pricing.tiers.tier4'),
      price: t('pricing.tiers.price4'),
      description: 'Best rate'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('pricing.tiers.title')}
          </h3>
          <p className="text-gray-600">
            {t('pricing.tiers.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`text-center p-6 rounded-xl transition-all ${
                tier.highlight 
                  ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200' 
                  : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-3">
                {tier.range}
              </div>
              <div className={`text-3xl font-bold mb-2 ${
                tier.highlight ? 'text-purple-600' : 'text-gray-900'
              }`}>
                {tier.price}
              </div>
              <div className={`text-sm ${
                tier.highlight ? 'text-purple-600 font-medium' : 'text-gray-600'
              }`}>
                {tier.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 