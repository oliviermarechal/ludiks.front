'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator, Users, ArrowRight, Check, TrendingUp, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Link } from '@/lib/navigation';

export function SimpleEstimator() {
  const t = useTranslations('home');
  const [events, setEvents] = useState([5000]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#simple-estimator');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const monthlyCost = useMemo(() => {
    if (events[0] <= 5000) return 0;
    const paidEvents = events[0] - 5000;
    const calculatedCost = paidEvents * 0.001;
    return Math.max(calculatedCost, 5).toFixed(2);
  }, [events]);

  const isFree = monthlyCost === '0';

  // Calcul pour l'exemple d'onboarding
  const onboardingUsers = useMemo(() => {
    const eventsPerUser = 3; // 3 étapes d'onboarding
    return Math.floor(events[0] / eventsPerUser);
  }, [events]);

  return (
    <div id="simple-estimator" className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-24 h-24 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section Pricing */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Grille tarifaire */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-green-200 bg-green-50/50 hover:shadow-lg hover:scale-105 transition-all duration-500 group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  {t('pricing.grid.free.title')}
                </h3>
                <p className="text-lg font-semibold text-green-600 mb-4">
                  {t('pricing.grid.free.events')}
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="text-sm">{t('pricing.grid.free.features')}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-primary/20 bg-card/50 hover:shadow-lg hover:scale-105 transition-all duration-500 group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t('pricing.grid.paid.title')}
                </h3>
                <p className="text-lg font-semibold text-foreground mb-2">
                  {t('pricing.grid.paid.events')}
                </p>
                <p className="text-2xl font-bold text-primary mb-2">
                  {t('pricing.grid.paid.price')}
                </p>
                <p className="text-sm text-foreground/70 mb-2">
                  {t('pricing.grid.paid.minimum')}
                </p>
                <p className="text-xs text-primary font-medium">
                  {t('pricing.grid.paid.discount')}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Section Exemple */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t('example.title')}
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t('example.subtitle')}
          </p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <Card className="p-8 border border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Slider */}
              <div className="space-y-8">
                <div>
                  <div className="mb-4">
                    <Label className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Zap className="h-5 w-5 text-secondary" />
                      {t('example.events.label')}
                    </Label>
                  </div>
                  <Slider
                    value={events}
                    onValueChange={setEvents}
                    max={50000}
                    min={1000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground/60 mt-2">
                    <span>1,000</span>
                    <span>50,000</span>
                  </div>
                </div>

                {/* Exemple d'onboarding */}
                <div className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300 border border-muted/50">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    {t('example.example.title')}
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {t('example.example.description', { users: onboardingUsers.toLocaleString() })}
                  </p>
                </div>

                <Link href="/pricing">
                  <Button
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group hover:scale-105 transition-all duration-300"
                  >
                    {t('example.cta.button')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Résultat */}
              <div className="flex items-center justify-center">
                <div className="text-center space-y-6 w-full max-w-sm">
                  <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-8 rounded-2xl border border-secondary/20 hover:shadow-lg transition-all duration-500 hover:scale-105">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Calculator className="h-5 w-5 text-secondary" />
                      <span className="text-sm font-medium text-foreground">
                        {t('example.result.events')}
                      </span>
                    </div>
                    
                    <div className="text-4xl font-bold text-foreground mb-6 animate-pulse">
                      {events[0].toLocaleString()}
                    </div>

                    <div className="pt-4 border-t border-secondary/20">
                      <div className="text-sm text-foreground/70 mb-2">
                        {t('example.result.cost')}
                      </div>
                      <div className={`text-3xl font-bold ${isFree ? 'text-green-600' : 'text-foreground'} transition-colors duration-300`}>
                        {isFree ? t('example.result.free') : `${monthlyCost} ${t('example.result.paid')}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 