'use client'

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Zap, 
  Code, 
  AlertTriangle, 
  Star, 
  Activity, 
  ArrowRight,
  Gift,
  Target as TargetIcon,
  Repeat,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { SimpleEstimator } from '@/components/pricing/simple-estimator';
import { StrategyGenerator } from '@/components/strategy/generator';
import { Modal } from '@/components/ui/modal';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function HomePage() {
  const t = useTranslations('home');
  const [isMobile, setIsMobile] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const engagementData = [
    { name: t('showcase.onboarding.chart.steps.1'), completion: 100, users: 1250 },
    { name: t('showcase.onboarding.chart.steps.2'), completion: 85, users: 1060 },
    { name: t('showcase.onboarding.chart.steps.3'), completion: 35, users: 440 }, // Significant drop
    { name: t('showcase.onboarding.chart.steps.4'), completion: 25, users: 310 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* Hero Features */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Gift className="h-5 w-5" />
              <span className="text-sm font-medium">{t('hero.features.rewards')}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
              <TargetIcon className="h-5 w-5" />
              <span className="text-sm font-medium">{t('hero.features.flexible')}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium">{t('hero.features.free')}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              {t('hero.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-foreground/60">
              {t('hero.cta.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Gamification Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('why.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {t('why.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-primary/10 mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('why.advantages.rewards.title')}</h3>
              <p className="text-foreground/70">{t('why.advantages.rewards.description')}</p>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-secondary/20 hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-secondary/10 mb-4">
                <TargetIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('why.advantages.flexible.title')}</h3>
              <p className="text-foreground/70">{t('why.advantages.flexible.description')}</p>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-green-500/20 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-green-500/10 mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('why.advantages.simple.title')}</h3>
              <p className="text-foreground/70">{t('why.advantages.simple.description')}</p>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-blue-500/20 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-blue-500/10 mb-4">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('why.advantages.insights.title')}</h3>
              <p className="text-foreground/70">{t('why.advantages.insights.description')}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('showcase.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {t('showcase.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Onboarding Journey */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TargetIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t('showcase.onboarding.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('showcase.onboarding.description')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,250</div>
                  <div className="text-sm text-foreground/60">{t('showcase.onboarding.stats.registered')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">25%</div>
                  <div className="text-sm text-foreground/60">{t('showcase.onboarding.stats.completion')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-foreground/60">{t('showcase.onboarding.stats.steps')}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>{t('showcase.onboarding.steps.1')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>{t('showcase.onboarding.steps.2')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>{t('showcase.onboarding.steps.3')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>{t('showcase.onboarding.steps.4')}</span>
                </div>
              </div>
            </article>

            {/* Repeated Actions Journey */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-secondary/20 hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Repeat className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t('showcase.activation.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('showcase.activation.description')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2,100</div>
                  <div className="text-sm text-foreground/60">{t('showcase.activation.stats.started')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">850</div>
                  <div className="text-sm text-foreground/60">{t('showcase.activation.stats.activated')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-foreground/60">{t('showcase.activation.stats.rewards')}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>{t('showcase.activation.steps.1')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>{t('showcase.activation.steps.2')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>{t('showcase.activation.steps.3')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>{t('showcase.activation.steps.4')}</span>
                </div>
              </div>
            </article>
          </div>

          {/* Problem Detection Analysis with Recharts */}
          <article className="p-4 md:p-8 bg-white dark:bg-gray-800/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-500 mb-1">{t('showcase.engagement.title')}</h3>
                <p className="text-sm text-foreground/60">
                  {t('showcase.engagement.description')}
                </p>
              </div>
              <div className="sm:ml-auto text-left sm:text-right mt-2 sm:mt-0">
                <span className="text-2xl font-bold text-orange-500">-59%</span>
                <p className="text-sm text-foreground/60">{t('showcase.engagement.engagement_rate')}</p>
              </div>
            </div>
            <div className="h-64 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--primary)" strokeOpacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--primary)"
                    strokeOpacity={0.5}
                    tick={{ fill: 'var(--foreground)', opacity: 0.5, fontSize: isMobile ? 8 : 12 }}
                  />
                  <YAxis 
                    stroke="var(--primary)"
                    strokeOpacity={0.5}
                    tick={{ 
                      fill: 'var(--foreground)', 
                      opacity: 0.5, 
                      fontSize: isMobile ? 8 : 12 
                    }}
                    tickFormatter={(value) => `${value}%`}
                    width={isMobile ? 8 : 45}
                    tickMargin={isMobile ? 0 : 4}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-popover border border-primary/20 p-3 rounded-lg shadow-xl">
                            <p className="text-foreground font-medium mb-1">{label}</p>
                            <div className="space-y-1 text-sm">
                              <p className="text-foreground/70">
                                <span className="text-secondary">{payload[0].payload.users}</span> users
                              </p>
                              <p className="text-foreground/70">
                                Completion rate: <span className="text-secondary">{payload[0].payload.completion}%</span>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completion"
                    stroke="var(--secondary)"
                    fill="url(#colorProgress)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Example Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">{t('showcase.advice.before.title')}</h4>
              <p className="text-sm text-red-600 dark:text-red-400">{t('showcase.advice.before.description')}</p>
            </article>
            <article className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">{t('showcase.advice.after.title')}</h4>
              <p className="text-sm text-green-600 dark:text-green-400">{t('showcase.advice.after.description')}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('usecases.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {t('usecases.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Objective Journeys */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <TargetIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('usecases.objectives.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('usecases.objectives.description')}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.objectives.examples.1')}</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.objectives.examples.2')}</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.objectives.examples.3')}</p>
                </div>
              </div>
            </article>

            {/* Repeated Actions */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-secondary/20 hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Repeat className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('usecases.repeated.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('usecases.repeated.description')}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.repeated.examples.1')}</p>
                </div>
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.repeated.examples.2')}</p>
                </div>
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.repeated.examples.3')}</p>
                </div>
              </div>
            </article>

            {/* Point System */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-green-500/20 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Coins className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('usecases.points.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('usecases.points.description')}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-500/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.points.examples.1')}</p>
                </div>
                <div className="p-3 bg-green-500/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.points.examples.2')}</p>
                </div>
                <div className="p-3 bg-green-500/5 rounded-lg">
                  <p className="text-sm font-medium">{t('usecases.points.examples.3')}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reward System */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-primary/10 mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('features.rewards.title')}</h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70">{t(`features.rewards.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Flexible Journeys */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-secondary/20 hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-secondary/10 mb-4">
                <TargetIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('features.journeys.title')}</h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70">{t(`features.journeys.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Simple Integration */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-green-500/20 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-green-500/10 mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('features.integration.title')}</h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70">{t(`features.integration.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Insights and Analytics */}
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-xl border border-blue-500/20 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="p-3 rounded-lg bg-blue-500/10 mb-4">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('features.insights.title')}</h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70">{t(`features.insights.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Cost Estimator Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SimpleEstimator />
        </div>
      </section>

      {/* Bonus Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('bonus.title')}
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            {t('bonus.description')}
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowStrategyModal(true)}
            className="text-lg px-8 py-6 h-auto"
          >
            {t('bonus.button')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-foreground/60 mt-4">
            {t('bonus.note')}
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="space-y-4">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              {t('cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-green-600" />
                <span>{t('cta.benefits.free')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span>{t('cta.benefits.setup')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Modal */}
      {showStrategyModal && (
        <Modal isOpen={showStrategyModal} onClose={() => setShowStrategyModal(false)} title={t('bonus.title')}>
          <div className="p-6">
            <StrategyGenerator />
          </div>
        </Modal>
      )}
    </div>
  );
}