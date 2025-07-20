'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Users, Target, CheckCircle, Info } from 'lucide-react';

export function CostEstimator() {
  const t = useTranslations('home.estimator');
  const [users, setUsers] = useState(1000);
  const [steps, setSteps] = useState(5);

  const eventsPerMonth = useMemo(() => users * steps, [users, steps]);
  const monthlyCost = useMemo(() => {
    if (eventsPerMonth <= 5000) return 0;
    const paidEvents = eventsPerMonth - 5000;
    const calculatedCost = paidEvents * 0.001;

    return Math.max(calculatedCost, 5).toFixed(2);
  }, [eventsPerMonth]);

  const isFree = monthlyCost === '0';

  return (
    <div className="py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Cas d'utilisation - Version condensée */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-secondary" />
              {t('useCases.title')}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-muted">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">
                    {t('useCases.onboarding.title')}
                  </div>
                  <div className="text-xs text-foreground/60">
                    {t('useCases.onboarding.steps')} • {t('useCases.onboarding.frequency')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-muted">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Target className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">
                    {t('useCases.subscription.title')}
                  </div>
                  <div className="text-xs text-foreground/60">
                    {t('useCases.subscription.steps')} • {t('useCases.subscription.frequency')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculateur - Version principale */}
          <Card className="p-8 border border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {t('calculator.title')}
                </h3>
                
                <div>
                  <Label htmlFor="users" className="text-sm font-semibold text-foreground mb-2 block">
                    {t('calculator.users.label')}
                  </Label>
                  <Input
                    id="users"
                    type="number"
                    value={users}
                    onChange={(e) => setUsers(Number(e.target.value))}
                    placeholder={t('calculator.users.placeholder')}
                    className="mt-2 border-2 border-primary/30 focus:border-primary bg-background/80"
                    min="1"
                    max="100000"
                  />
                </div>

                <div>
                  <Label htmlFor="steps" className="text-sm font-semibold text-foreground mb-2 block">
                    {t('calculator.steps.label')}
                  </Label>
                  <Input
                    id="steps"
                    type="number"
                    value={steps}
                    onChange={(e) => setSteps(Number(e.target.value))}
                    placeholder={t('calculator.steps.placeholder')}
                    className="mt-2 border-2 border-primary/30 focus:border-primary bg-background/80"
                    min="1"
                    max="20"
                  />
                </div>

                {/* Exemples */}
                <div className="space-y-3 pt-4">
                  <h4 className="text-sm font-medium text-foreground">
                    {t('examples.title')}
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span className="text-foreground/70">{t('examples.startup.description')}</span>
                      <span className="text-green-600 font-medium ml-auto">{t('examples.startup.result')}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span className="text-foreground/70">{t('examples.medium.description')}</span>
                      <span className="text-foreground font-medium ml-auto">{t('examples.medium.result')}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span className="text-foreground/70">{t('examples.scaleup.description')}</span>
                      <span className="text-foreground font-medium ml-auto">{t('examples.scaleup.result')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Résultat */}
              <div className="flex items-center justify-center">
                <div className="text-center space-y-6 w-full max-w-sm">
                  <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-8 rounded-2xl border border-secondary/20">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Calculator className="h-5 w-5 text-secondary" />
                      <span className="text-sm font-medium text-foreground">
                        {t('calculator.result.events')}
                      </span>
                    </div>
                    
                    <div className="text-4xl font-bold text-foreground mb-6">
                      {eventsPerMonth.toLocaleString()}
                    </div>

                    <div className="pt-4 border-t border-secondary/20">
                      <div className="text-sm text-foreground/70 mb-2">
                        {t('calculator.result.cost')}
                      </div>
                      <div className={`text-3xl font-bold ${isFree ? 'text-green-600' : 'text-foreground'}`}>
                        {isFree ? t('calculator.result.free') : `${monthlyCost} ${t('calculator.result.paid')}`}
                      </div>
                      {!isFree && parseFloat(monthlyCost.toString()) === 5 && (
                        <div className="text-xs text-foreground/60 mt-2">
                          * Minimum de facturation de 5$/mois
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Note sur la facturation */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-lg text-sm text-foreground/70">
              <Info className="h-4 w-4 text-secondary" />
              <span>{t('billing.minimum')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 