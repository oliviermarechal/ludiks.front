'use client'

import { Button } from "@/components/ui/button";
import { 
  Eye, 
  TrendingUp,
  HelpCircle,
  BarChart3,
  Users2,
  Trophy,
  ArrowRight,
  Star,
  Target,
  AlertTriangle,
  Activity,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useEffect, useState } from 'react';
import { StrategyFormData, StrategyGenerator } from "@/components/strategy/generator";
import { StrategySuggestions } from "@/components/strategy/suggestions";
import { Modal } from "@/components/ui/modal";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/lib/navigation";
import { Navigation } from "@/components/navigation";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default function Home() {
  const t = useTranslations('home');
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [strategyData, setStrategyData] = useState<StrategyFormData | null>(null);
  const router = useRouter();

  const completionData = [
    { name: t('solution.funnel.chart.steps.1'), completion: 100, users: 1250 },
    { name: t('solution.funnel.chart.steps.2'), completion: 60, users: 750 },
    { name: t('solution.funnel.chart.steps.3'), completion: 52, users: 650 },
    { name: t('solution.funnel.chart.steps.4'), completion: 50, users: 625 },
  ];

  const handleComplete = (data: StrategyFormData) => {
    setStrategyData(data);
    setShowSuggestions(true);
  };

  const handleGenerate = () => {
    router.push('/auth/registration');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowSuggestions(false);
    setStrategyData(null);
  };

  const handleGetStarted = () => {
    router.push('/auth/registration');
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      {/* Hero Section - Focus sur le pain point */}
      <div className="relative landing-hero">
        <div className="container mx-auto pt-24 pb-16 relative px-4 md:px-8">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-black landing-title pb-2">
              {t('hero.title')}
            </h1>

            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl font-light">
              {t('hero.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8 text-left max-w-3xl">
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <Eye className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">{t('hero.features.track')}</span>
              </div>
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <AlertTriangle className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">{t('hero.features.identify')}</span>
              </div>
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <TrendingUp className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">{t('hero.features.increase')}</span>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="mt-8">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl group"
              >
                {t('hero.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-foreground/60 mt-3">
                {t('hero.cta.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Problématiques */}
      <div className="gradient-section py-16 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('problems.title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('problems.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <HelpCircle className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t('problems.issues.conversion.title')}</h3>
                <p className="text-foreground/70">{t('problems.issues.conversion.description')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <BarChart3 className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t('problems.issues.visibility.title')}</h3>
                <p className="text-foreground/70">{t('problems.issues.visibility.description')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <Users2 className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t('problems.issues.retention.title')}</h3>
                <p className="text-foreground/70">{t('problems.issues.retention.description')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <TrendingUp className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t('problems.issues.cost.title')}</h3>
                <p className="text-foreground/70">{t('problems.issues.cost.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative gradient-section py-16 before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-primary/5 before:to-transparent">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('solution.title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('solution.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Browser-like container */}
            <div className="rounded-xl overflow-hidden border border-primary/20 shadow-2xl bg-card/40 backdrop-blur-sm dark:bg-black/40">
              {/* Browser header */}
              <div className="bg-background border-b border-primary/10 flex items-center gap-2 px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 backdrop-blur-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 backdrop-blur-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 backdrop-blur-sm"></div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4 md:p-8 space-y-8 bg-gradient-to-b from-background/50 to-background dark:from-gray-900/50 dark:to-gray-900/80">
                {/* Tunnel d'achat Demo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group p-4 md:p-6 bg-white dark:bg-gray-800/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-5 w-5 text-secondary" />
                          <h3 className="text-lg font-semibold text-foreground">{t('solution.funnel.title')}</h3>
                        </div>
                        <p className="text-sm text-foreground/60">
                          {t('solution.funnel.description')}
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                          {t('solution.funnel.type')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500">-40%</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                      {[
                        t('solution.funnel.steps.1'),
                        t('solution.funnel.steps.2'),
                        t('solution.funnel.steps.3'),
                        t('solution.funnel.steps.4')
                      ].map((step, i) => (
                        <div key={i} className="flex-shrink-0 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                          <Activity className="h-4 w-4 text-secondary" />
                          <span className="text-xs text-foreground/80 whitespace-nowrap">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Users2 className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">1,250</span>
                        <span className="text-xs text-foreground/60">{t('solution.funnel.stats.visitors')}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Activity className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">50%</span>
                        <span className="text-xs text-foreground/60">{t('solution.funnel.stats.conversion')}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Trophy className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">625</span>
                        <span className="text-xs text-foreground/60">{t('solution.funnel.stats.orders')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Second card with same responsive adjustments */}
                  <div className="group p-4 md:p-6 bg-white dark:bg-gray-800/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-secondary" />
                          <h3 className="text-lg font-semibold text-foreground">{t('solution.onboarding.title')}</h3>
                        </div>
                        <p className="text-sm text-foreground/60">
                          {t('solution.onboarding.description')}
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                          {t('solution.onboarding.type')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                      {[
                        t('solution.onboarding.steps.1'),
                        t('solution.onboarding.steps.2'),
                        t('solution.onboarding.steps.3'),
                        t('solution.onboarding.steps.4')
                      ].map((step, i) => (
                        <div key={i} className="flex-shrink-0 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                          <Activity className="h-4 w-4 text-secondary" />
                          <span className="text-xs text-foreground/80 whitespace-nowrap">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Users2 className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">890</span>
                        <span className="text-xs text-foreground/60">{t('solution.onboarding.stats.registered')}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Activity className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">45%</span>
                        <span className="text-xs text-foreground/60">{t('solution.onboarding.stats.completion')}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Trophy className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">8</span>
                        <span className="text-xs text-foreground/60">{t('solution.onboarding.stats.steps')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Friction Point Analysis with Recharts */}
                <div className="p-4 md:p-8 bg-white dark:bg-gray-800/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-red-500/10">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-500 mb-1">{t('solution.friction.title')}</h3>
                      <p className="text-sm text-foreground/60">
                        {t('solution.friction.description')}
                      </p>
                    </div>
                    <div className="sm:ml-auto text-left sm:text-right mt-2 sm:mt-0">
                      <span className="text-2xl font-bold text-red-500">-40%</span>
                      <p className="text-sm text-foreground/60">{t('solution.friction.conversion')}</p>
                    </div>
                  </div>

                  <div className="h-64 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={completionData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
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
                                      <span className="text-secondary">{payload[0].payload.users}</span> {t('solution.friction.users')}
                                    </p>
                                    <p className="text-foreground/70">
                                      {t('solution.friction.conversion_rate')}: <span className="text-secondary">{payload[0].payload.completion}%</span>
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
                </div>

                {/* Bloc comparatif explicatif moderne */}
                <div className="relative z-10 mt-8 flex flex-col items-center">
                  <span className="mb-3 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wide shadow-sm">
                    {t('solution.advice.title')}
                  </span>
                  <div className="w-full grid md:grid-cols-2 gap-4">
                    <div className="bg-white/90 dark:bg-black/60 rounded-xl shadow-lg border border-primary/10 p-6 flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">❌</span>
                      <span className="text-secondary font-semibold mb-2">{t('solution.advice.without.title')}</span>
                      <p className="text-foreground/80 text-sm">
                        {t('solution.advice.without.description')}
                      </p>
                    </div>
                    <div className="bg-secondary/10 rounded-xl shadow-lg border border-secondary/30 p-6 flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">✅</span>
                      <span className="text-secondary font-semibold mb-2">{t('solution.advice.with.title')}</span>
                      <p className="text-foreground/90 text-sm">
                        {t('solution.advice.with.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Valeur Ajoutée */}
      <div className="py-16 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Users2 className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">{t('features.gamification.title')}</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                {[
                  t('features.gamification.items.1'),
                  t('features.gamification.items.2'),
                  t('features.gamification.items.3')
                ].map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">{t('features.export.title')}</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                {[
                  t('features.export.items.1'),
                  t('features.export.items.2'),
                  t('features.export.items.3')
                ].map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">{t('features.segmentation.title')}</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                {[
                  t('features.segmentation.items.1'),
                  t('features.segmentation.items.2'),
                  t('features.segmentation.items.3')
                ].map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">{t('features.analytics.title')}</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                {[
                  t('features.analytics.items.1'),
                  t('features.analytics.items.2'),
                  t('features.analytics.items.3')
                ].map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/20 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span role="img" aria-label="cadeau">🎁</span> {t('bonus.title')}
            </h2>
            <p className="text-lg text-foreground/80 mb-6">
              {t('bonus.description')}
            </p>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer w-full md:w-auto"
            >
              {t('bonus.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              {t('bonus.note')}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative landing-footer py-16 before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/10 backdrop-blur-sm border border-secondary/30 shadow-2xl flex flex-col items-center">
            <div className="mb-6">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 shadow-lg mb-4">
                <Trophy className="text-secondary w-8 h-8" />
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                {t('cta.title')}
              </h2>
            </div>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto font-light">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl group"
              >
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t('cta.benefits.free')}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t('cta.benefits.setup')}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t('cta.benefits.support')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={t('bonus.title')}
        className="max-h-[90vh] overflow-y-auto"
      >
        {!showSuggestions ? (
          <StrategyGenerator mode="landing" onComplete={handleComplete} />
        ) : (
          <StrategySuggestions
            formData={strategyData as StrategyFormData}
            onGenerate={handleGenerate}
            onClose={handleClose}
            mode="landing"
          />
        )}
      </Modal>
    </main>
  );
}
