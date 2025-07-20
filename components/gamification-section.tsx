'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function GamificationSection() {
  const t = useTranslations('home.gamification');
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

    const element = document.querySelector('#gamification-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: t('features.rewards.title'),
      description: t('features.rewards.description'),
      icon: t('features.rewards.icon')
    },
    {
      title: t('features.engagement.title'),
      description: t('features.engagement.description'),
      icon: t('features.engagement.icon')
    },
    {
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      icon: t('features.analytics.icon')
    },
    {
      title: t('features.simple.title'),
      description: t('features.simple.description'),
      icon: t('features.simple.icon')
    }
  ];

  return (
    <div id="gamification-section" className="py-16 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
              {t('subtitle')}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-sm font-medium text-secondary border border-secondary/20 shadow-sm">
              <Sparkles className="h-4 w-4" />
              {t('unique.title')}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 border border-primary/20 hover:border-primary transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-center space-y-4">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              {t('comparison.title')}
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 border border-primary/20 hover:shadow-lg transition-all duration-500 backdrop-blur-sm bg-card/80">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Competitors */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      {t('comparison.competitors.title')}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors duration-300">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{t('comparison.competitors.analytics')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors duration-300">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{t('comparison.competitors.gamification')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors duration-300">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{t('comparison.competitors.complex')}</span>
                      </div>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2 animate-pulse">VS</div>
                      <div className="text-sm text-foreground/60">{t('unique.title')}</div>
                    </div>
                  </div>

                  {/* Ludiks */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      {t('comparison.ludiks.title')}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors duration-300">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{t('comparison.ludiks.analytics')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors duration-300">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{t('comparison.ludiks.gamification')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors duration-300">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{t('comparison.ludiks.simple')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/10 backdrop-blur-sm border border-secondary/30 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('cta.title')}
              </h3>
              <p className="text-lg text-foreground/70 mb-6">
                {t('cta.description')}
              </p>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl group hover:scale-105"
              >
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 