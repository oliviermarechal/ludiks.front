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
import { Link } from "@/lib/navigation";

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
    { name: t('showcase.onboarding.chart.steps.3'), completion: 35, users: 440 },
    { name: t('showcase.onboarding.chart.steps.4'), completion: 25, users: 310 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
            {t('hero.subtitle')}
          </p>
          
          {/* Hero Features */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-delay-2">
            <div className="flex items-center gap-2 bg-primary/15 text-primary px-6 py-3 rounded-full hover:bg-primary/25 transition-all duration-300 hover:scale-105 shadow-sm">
              <Gift className="h-5 w-5" />
              <span className="text-sm font-semibold">{t('hero.features.rewards')}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/15 text-secondary px-6 py-3 rounded-full hover:bg-secondary/25 transition-all duration-300 hover:scale-105 shadow-sm">
              <TargetIcon className="h-5 w-5" />
              <span className="text-sm font-semibold">{t('hero.features.flexible')}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/15 text-green-600 px-6 py-3 rounded-full hover:bg-green-500/25 transition-all duration-300 hover:scale-105 shadow-sm">
              <Star className="h-5 w-5" />
              <span className="text-sm font-semibold">{t('hero.features.free')}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6 animate-fade-in-delay-3">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 h-auto bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl" 
              asChild
            >
              <Link href="/auth/login">
                {t('hero.cta.button')}
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-sm text-foreground/60">
              {t('hero.cta.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="px-4 py-24 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
              {t('implementation.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('implementation.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="text-center p-8 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:bg-green-500/20 transition-colors duration-300">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-extrabold text-green-600 mb-3">{t('implementation.badges.setup.value')}</div>
              <div className="text-sm text-foreground/70 font-medium">{t('implementation.badges.setup.label')}</div>
            </article>

            <article className="text-center p-8 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:bg-blue-500/20 transition-colors duration-300">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-extrabold text-blue-600 mb-3">{t('implementation.badges.resources.value')}</div>
              <div className="text-sm text-foreground/70 font-medium">{t('implementation.badges.resources.label')}</div>
            </article>

            <article className="text-center p-8 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:bg-purple-500/20 transition-colors duration-300">
                <TargetIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-extrabold text-purple-600 mb-3">{t('implementation.badges.impact.value')}</div>
              <div className="text-sm text-foreground/70 font-medium">{t('implementation.badges.impact.label')}</div>
            </article>

            <article className="text-center p-8 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:bg-orange-500/20 transition-colors duration-300">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-extrabold text-orange-600 mb-3">{t('implementation.badges.risk.value')}</div>
              <div className="text-sm text-foreground/70 font-medium">{t('implementation.badges.risk.label')}</div>
            </article>
          </div>

          <div className="text-center mt-16">
            <div className="p-8 bg-muted/50 rounded-2xl max-w-2xl mx-auto hover:bg-muted/70 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4">{t('implementation.technical.title')}</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">{t('implementation.technical.description')}</p>
              
              {/* Code Snippet - Less prominent */}
              <div className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm mb-6">
                <div className="text-gray-400 mb-2">{t('hero.codeSnippet.comment')}</div>
                <div className="font-mono space-y-1">
                  <div><span className="text-blue-400">{t('hero.codeSnippet.step1')}</span> <span className="text-green-400">@ludiks/sdk</span></div>
                  <div><span className="text-yellow-400">{t('hero.codeSnippet.step2')}</span>.<span className="text-blue-400">{t('hero.codeSnippet.step2Method')}</span>(...)</div>
                  <div><span className="text-gray-400">{t('hero.codeSnippet.step3Comment')}</span></div>
                </div>
              </div>
              
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-white transition-all duration-300" asChild>
                <Link href="/docs" className="inline-flex items-center gap-2">
                  {t('implementation.technical.button')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Gamification Section */}
      <section className="px-4 py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
              {t('why.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('why.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="p-4 rounded-2xl bg-primary/15 mb-6 hover:bg-primary/25 transition-colors duration-300 relative z-10">
                <Gift className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">{t('why.advantages.rewards.title')}</h3>
              <p className="text-foreground/70 leading-relaxed relative z-10">{t('why.advantages.rewards.description')}</p>
            </article>

            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="p-4 rounded-2xl bg-secondary/15 mb-6 hover:bg-secondary/25 transition-colors duration-300 relative z-10">
                <TargetIcon className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">{t('why.advantages.flexible.title')}</h3>
              <p className="text-foreground/70 leading-relaxed relative z-10">{t('why.advantages.flexible.description')}</p>
            </article>

            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="p-4 rounded-2xl bg-green-500/15 mb-6 hover:bg-green-500/25 transition-colors duration-300 relative z-10">
                <Code className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">{t('why.advantages.simple.title')}</h3>
              <p className="text-foreground/70 leading-relaxed relative z-10">{t('why.advantages.simple.description')}</p>
            </article>

            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="p-4 rounded-2xl bg-blue-500/15 mb-6 hover:bg-blue-500/25 transition-colors duration-300 relative z-10">
                <Activity className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">{t('why.advantages.insights.title')}</h3>
              <p className="text-foreground/70 leading-relaxed relative z-10">{t('why.advantages.insights.description')}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="px-4 py-24 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
              {t('showcase.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('showcase.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Onboarding Journey */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                  <TargetIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('showcase.onboarding.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('showcase.onboarding.description')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-primary">1,250</div>
                  <div className="text-sm text-foreground/60 font-medium">{t('showcase.onboarding.stats.registered')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-secondary">25%</div>
                  <div className="text-sm text-foreground/60 font-medium">{t('showcase.onboarding.stats.completion')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-green-600">4</div>
                  <div className="text-sm text-foreground/60 font-medium">{t('showcase.onboarding.stats.steps')}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="font-medium">{t('showcase.onboarding.steps.1')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="font-medium">{t('showcase.onboarding.steps.2')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span className="font-medium">{t('showcase.onboarding.steps.3')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="font-medium">{t('showcase.onboarding.steps.4')}</span>
                </div>
              </div>
            </article>

            {/* Repeated Actions Journey */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300">
                  <Repeat className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('showcase.activation.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('showcase.activation.description')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-primary">2,100</div>
                  <div className="text-sm text-foreground/60 font-medium">{t('showcase.activation.stats.started')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-secondary">850</div>
                  <div className="text-sm text-foreground/60 font-medium">{t('showcase.activation.stats.activated')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-green-600">4</div>
                  <div className="text-sm text-foreground/60 font-medium">{t('showcase.activation.stats.rewards')}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="font-medium">{t('showcase.activation.steps.1')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="font-medium">{t('showcase.activation.steps.2')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span className="font-medium">{t('showcase.activation.steps.3')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="font-medium">{t('showcase.activation.steps.4')}</span>
                </div>
              </div>
            </article>
          </div>

          {/* Problem Detection Analysis with Recharts */}
          <article className="p-6 md:p-10 bg-white dark:bg-gray-800/60 border border-border hover:border-primary rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <div className="p-4 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 transition-colors duration-300">
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-orange-500 mb-2">{t('showcase.engagement.title')}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {t('showcase.engagement.description')}
                </p>
              </div>
              <div className="sm:ml-auto text-left sm:text-right mt-4 sm:mt-0">
                <span className="text-3xl font-extrabold text-orange-500">-59%</span>
                <p className="text-sm text-foreground/60 font-medium">{t('showcase.engagement.engagement_rate')}</p>
              </div>
            </div>
            <div className="h-64 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    strokeOpacity={0.7}
                    tick={{ fill: '#374151', fontSize: isMobile ? 10 : 14, fontWeight: '500' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    strokeOpacity={0.7}
                    tick={{ 
                      fill: '#374151', 
                      fontSize: isMobile ? 10 : 14,
                      fontWeight: '500'
                    }}
                    tickFormatter={(value) => `${value}%`}
                    width={isMobile ? 30 : 50}
                    tickMargin={isMobile ? 4 : 8}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-2xl">
                            <p className="text-gray-900 font-bold mb-2">{label}</p>
                            <div className="space-y-1 text-sm">
                              <p className="text-gray-600">
                                <span className="text-purple-600 font-semibold">{payload[0].payload.users}</span> users
                              </p>
                              <p className="text-gray-600">
                                Completion rate: <span className="text-purple-600 font-semibold">{payload[0].payload.completion}%</span>
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
                    stroke="#8b5cf6"
                    fill="url(#colorProgress)"
                    strokeWidth={4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Example Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <article className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-3">{t('showcase.advice.before.title')}</h4>
              <p className="text-sm text-red-600 dark:text-red-400 leading-relaxed">{t('showcase.advice.before.description')}</p>
            </article>
            <article className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-300">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-3">{t('showcase.advice.after.title')}</h4>
              <p className="text-sm text-green-600 dark:text-green-400 leading-relaxed">{t('showcase.advice.after.description')}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-4 py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
              {t('usecases.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('usecases.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Objective Journeys */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                  <TargetIcon className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('usecases.objectives.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('usecases.objectives.description')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.objectives.examples.1')}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.objectives.examples.2')}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.objectives.examples.3')}</p>
                </div>
              </div>
            </article>

            {/* Repeated Actions */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300">
                  <Repeat className="h-10 w-10 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('usecases.repeated.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('usecases.repeated.description')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.repeated.examples.1')}</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.repeated.examples.2')}</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.repeated.examples.3')}</p>
                </div>
              </div>
            </article>

            {/* Point System */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300">
                  <Coins className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('usecases.points.title')}</h3>
                  <p className="text-sm text-foreground/60">{t('usecases.points.description')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-500/5 rounded-xl hover:bg-green-500/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.points.examples.1')}</p>
                </div>
                <div className="p-4 bg-green-500/5 rounded-xl hover:bg-green-500/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.points.examples.2')}</p>
                </div>
                <div className="p-4 bg-green-500/5 rounded-xl hover:bg-green-500/10 transition-colors duration-300">
                  <p className="text-sm font-semibold">{t('usecases.points.examples.3')}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="px-4 py-24 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
              {t('components.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('components.subtitle')}
            </p>
          </div>

          {/* Components Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-primary/10 mb-6 hover:bg-primary/20 transition-colors duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">UP</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3">{t('components.list.userProfile.name')}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{t('components.list.userProfile.description')}</p>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-secondary/10 mb-6 hover:bg-secondary/20 transition-colors duration-300">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <span className="text-secondary font-bold text-sm">LB</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3">{t('components.list.leaderboard.name')}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{t('components.list.leaderboard.description')}</p>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-orange-500/10 mb-6 hover:bg-orange-500/20 transition-colors duration-300">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">🔥</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3">{t('components.list.streakCounter.name')}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{t('components.list.streakCounter.description')}</p>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-green-500/10 mb-6 hover:bg-green-500/20 transition-colors duration-300">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">🎉</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3">{t('components.list.toaster.name')}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{t('components.list.toaster.description')}</p>
            </article>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">{t('components.benefits.time')}</h4>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">{t('components.benefits.customizable')}</h4>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">{t('components.benefits.typescript')}</h4>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-foreground/70 mb-6">{t('components.cta.description')}</p>
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-white transition-all duration-300" asChild>
              <Link href="/docs/components" className="inline-flex items-center gap-2">
                {t('components.cta.button')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
              {t('features.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reward System */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-primary/10 mb-6 hover:bg-primary/20 transition-colors duration-300">
                <Gift className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-6">{t('features.rewards.title')}</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 leading-relaxed">{t(`features.rewards.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Flexible Journeys */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-secondary/10 mb-6 hover:bg-secondary/20 transition-colors duration-300">
                <TargetIcon className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-6">{t('features.journeys.title')}</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 leading-relaxed">{t(`features.journeys.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Simple Integration */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-green-500/10 mb-6 hover:bg-green-500/20 transition-colors duration-300">
                <Code className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-6">{t('features.integration.title')}</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 leading-relaxed">{t(`features.integration.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Insights and Analytics */}
            <article className="p-8 bg-white dark:bg-gray-800/60 rounded-2xl border border-border hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-4 rounded-2xl bg-blue-500/10 mb-6 hover:bg-blue-500/20 transition-colors duration-300">
                <Activity className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-6">{t('features.insights.title')}</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 leading-relaxed">{t(`features.insights.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Cost Estimator Section */}
      <section className="px-4 py-24 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <SimpleEstimator />
        </div>
      </section>

      {/* Bonus Section */}
      <section className="px-4 py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-foreground">
            {t('bonus.title')}
          </h2>
          <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
            {t('bonus.description')}
          </p>
                      <Button 
              size="lg" 
              onClick={() => setShowStrategyModal(true)}
              className="text-lg px-10 py-7 h-auto bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {t('bonus.button')}
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          <p className="text-sm text-foreground/60 mt-6">
            {t('bonus.note')}
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-foreground">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 h-auto bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {t('cta.button')}
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                <span className="font-medium">{t('cta.benefits.free')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="font-medium">{t('cta.benefits.setup')}</span>
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

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Ludiks",
            "description": "Gamification platform for SaaS user engagement and retention. Turnkey solution with React components, SDK, and analytics.",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "url": "https://www.ludiks.io",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Free up to 5000 events per month",
              "availability": "https://schema.org/InStock"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Ludiks",
              "url": "https://www.ludiks.io",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.ludiks.io/logo-black.png"
              }
            },
            "featureList": [
              "Gamification SDK for developers",
              "Ready-to-use React components",
              "User engagement analytics",
              "Retention tracking dashboard",
              "Progressive reward systems",
              "Custom user journeys"
            ],
            "screenshot": {
              "@type": "ImageObject",
              "url": "https://www.ludiks.io/logo-og.jpg"
            }
          })
        }}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}