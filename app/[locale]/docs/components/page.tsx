'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { useTranslations } from 'next-intl';

import {
  UserProfile,
  StreakCounter,
  Leaderboard,
  GamificationToaster,
  setLudiksConfig,
  NotificationData
} from '@ludiks/react';
import { Input } from '@/components/ui/input';

setLudiksConfig('mock');

// Color picker minimaliste avec présets + input personnalisé
const CustomColorPicker = React.memo(({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  // Couleurs prédéfinies populaires et élégantes
  const presetColors = [
    '#8b5cf6', '#06d6a0', '#10b981', '#3b82f6', '#ef4444',
    '#f59e0b', '#ec4899', '#6366f1', '#8b5cf6', '#06b6d4',
    '#84cc16', '#f97316', '#a855f7', '#22c55e', '#eab308',
    '#14b8a6', '#f43f5e', '#6366f1', '#000000', '#ffffff',
    '#6b7280', '#374151', '#1f2937', '#111827', '#f9fafb'
  ];

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Valider si c'est un hex valide
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handlePresetClick = (color: string) => {
    setInputValue(color);
    onChange(color);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* Aperçu de la couleur + input */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none"
          style={{ backgroundColor: value }}
          title="Cliquer pour ouvrir le sélecteur"
        />
        <div className="flex-1">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="#8b5cf6"
            className="font-mono text-sm"
          />
        </div>
      </div>

      {/* Sélecteur de couleurs prédéfinies */}
      {isOpen && (
        <div className="p-4 bg-background border border-gray-200 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="grid grid-cols-8 gap-2 mb-3">
            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => handlePresetClick(color)}
                className="w-8 h-8 rounded-md border border-gray-200 hover:scale-110 hover:shadow-md transition-all focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          
          {/* Input couleur natif en fallback */}
          <div className="pt-2 border-t">
            <Label className="text-xs text-gray-600 mb-1 block">Couleur personnalisée</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={value}
                onChange={(e) => handlePresetClick(e.target.value)}
                className="w-full h-8 rounded border border-gray-200 cursor-pointer"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

CustomColorPicker.displayName = 'CustomColorPicker';

export default function ComponentsPage() {
  const t = useTranslations('documentation.components');

  const [globalColors, setGlobalColors] = useState({
    primary: '#8b5cf6',
    secondary: '#06d6a0',
    success: '#10b981',
  });

  const [userProfileConfig, setUserProfileConfig] = useState({
    showCircuits: true,
    showRewards: true,
    showStreak: true,
    variant: 'card' as 'card' | 'minimal',
  });

  const [streakConfig, setStreakConfig] = useState({
    variant: 'flame' as 'flame' | 'detailed' | 'calendar' | 'minimal',
    showRecord: true,
    animate: true,
  });

  const [leaderboardConfig, setLeaderboardConfig] = useState({
    period: 'week' as 'week' | 'month' | 'all',
    limit: 5,
    variant: 'podium' as 'podium' | 'table' | 'minimal',
    showUserDetails: true,
  });

  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [toasterVisible, setToasterVisible] = useState(false);

  // Memoized color change handlers
  const handlePrimaryColorChange = useCallback((value: string) => {
    setGlobalColors(prev => ({ ...prev, primary: value }));
  }, []);

  const handleSecondaryColorChange = useCallback((value: string) => {
    setGlobalColors(prev => ({ ...prev, secondary: value }));
  }, []);

  const handleSuccessColorChange = useCallback((value: string) => {
    setGlobalColors(prev => ({ ...prev, success: value }));
  }, []);

  const showToast = (type: 'step-completed' | 'circuit-completed' | 'reward-earned') => {
    const notifications = {
      'step-completed': {
        type: 'step-completed' as const,
        title: t('toaster.notifications.stepCompleted.title'),
        description: t('toaster.notifications.stepCompleted.description'),
        points: 150,
      },
      'circuit-completed': {
        type: 'circuit-completed' as const,
        title: t('toaster.notifications.circuitCompleted.title'),
        description: t('toaster.notifications.circuitCompleted.description'),
        points: 500,
        rewards: [{ name: t('toaster.notifications.circuitCompleted.reward') }],
      },
      'reward-earned': {
        type: 'reward-earned' as const,
        title: t('toaster.notifications.rewardEarned.title'),
        description: t('toaster.notifications.rewardEarned.description'),
        rewards: [{ name: t('toaster.notifications.rewardEarned.rewards.0') }, { name: t('toaster.notifications.rewardEarned.rewards.1') }],
      },
    };

    setNotification(notifications[type]);
    setToasterVisible(true);
  };

  return (
    <div className="container mx-auto pt-8 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-foreground/70">
            {t('subtitle')}
          </p>
        </div>

        {/* Global Theme */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 mb-8">
          <CardHeader>
            <CardTitle className="text-purple-700">{t('theme.title')}</CardTitle>
            <CardDescription className="text-purple-600">
              {t('theme.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CustomColorPicker
                label={t('theme.colors.primary')}
                value={globalColors.primary}
                onChange={handlePrimaryColorChange}
              />
              <CustomColorPicker
                label={t('theme.colors.secondary')}
                value={globalColors.secondary}
                onChange={handleSecondaryColorChange}
              />
              <CustomColorPicker
                label={t('theme.colors.success')}
                value={globalColors.success}
                onChange={handleSuccessColorChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Component Demos */}
        <Tabs defaultValue="userprofile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="userprofile">{t('tabs.userProfile')}</TabsTrigger>
            <TabsTrigger value="streak">{t('tabs.streakCounter')}</TabsTrigger>
            <TabsTrigger value="leaderboard">{t('tabs.leaderboard')}</TabsTrigger>
            <TabsTrigger value="toaster">{t('tabs.toaster')}</TabsTrigger>
          </TabsList>

          {/* UserProfile Demo */}
          <TabsContent value="userprofile" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('userProfile.title')}</h2>
              <p className="text-foreground/70">{t('userProfile.description')}</p>
            </div>

            {/* Demo */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('demo.title')}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-8">
                <UserProfile
                  userId="demo-user-123"
                  showCircuits={userProfileConfig.showCircuits}
                  showRewards={userProfileConfig.showRewards}
                  showStreak={userProfileConfig.showStreak}
                  variant={userProfileConfig.variant}
                  colors={globalColors}
                />
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>{t('configuration.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showCircuits">{t('userProfile.config.showCircuits')}</Label>
                    <Checkbox
                      id="showCircuits"
                      checked={userProfileConfig.showCircuits}
                      onCheckedChange={(checked: boolean) =>
                        setUserProfileConfig({ ...userProfileConfig, showCircuits: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showRewards">{t('userProfile.config.showRewards')}</Label>
                    <Checkbox
                      id="showRewards"
                      checked={userProfileConfig.showRewards}
                      onCheckedChange={(checked: boolean) =>
                        setUserProfileConfig({ ...userProfileConfig, showRewards: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showStreak">{t('userProfile.config.showStreak')}</Label>
                    <Checkbox
                      id="showStreak"
                      checked={userProfileConfig.showStreak}
                      onCheckedChange={(checked: boolean) =>
                        setUserProfileConfig({ ...userProfileConfig, showStreak: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t('userProfile.config.variant.label')}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setUserProfileConfig({ ...userProfileConfig, variant: 'card' })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          userProfileConfig.variant === 'card'
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-primary/20 to-primary/40 rounded-md border border-primary/30"></div>
                          <span className="text-xs font-medium">{t('userProfile.config.variant.options.card')}</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setUserProfileConfig({ ...userProfileConfig, variant: 'minimal' })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          userProfileConfig.variant === 'minimal'
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-md border border-gray-400"></div>
                          <span className="text-xs font-medium">{t('userProfile.config.variant.options.minimal')}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Example */}
            <Card>
              <CardHeader>
                <CardTitle>{t('codeExample.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">{`import { UserProfile } from '@ludiks/react';

<UserProfile 
  userId="user123"
  showCircuits={${userProfileConfig.showCircuits}}
  showRewards={${userProfileConfig.showRewards}}
  showStreak={${userProfileConfig.showStreak}}
  variant="${userProfileConfig.variant}"
  colors={{
    primary: "${globalColors.primary}",
    secondary: "${globalColors.secondary}",
    success: "${globalColors.success}"
  }}
/>`}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* StreakCounter Demo */}
          <TabsContent value="streak" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('streakCounter.title')}</h2>
              <p className="text-foreground/70">{t('streakCounter.description')}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('demo.title')}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center p-8">
                  <StreakCounter
                    userId="demo-user-123"
                    variant={streakConfig.variant}
                    showRecord={streakConfig.showRecord}
                    animate={streakConfig.animate}
                    colors={globalColors}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('configuration.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t('streakCounter.config.showRecord')}</Label>
                    <Checkbox
                      checked={streakConfig.showRecord}
                      onCheckedChange={(checked: boolean) =>
                        setStreakConfig({ ...streakConfig, showRecord: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>{t('streakCounter.config.animate')}</Label>
                    <Checkbox
                      checked={streakConfig.animate}
                      onCheckedChange={(checked: boolean) =>
                        setStreakConfig({ ...streakConfig, animate: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t('streakCounter.config.variant.label')}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setStreakConfig({ ...streakConfig, variant: 'flame' })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          streakConfig.variant === 'flame'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-md flex items-center justify-center">
                            <span className="text-white text-lg">🔥</span>
                          </div>
                          <span className="text-xs font-medium">{t('streakCounter.config.variant.options.flame')}</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setStreakConfig({ ...streakConfig, variant: 'detailed' })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          streakConfig.variant === 'detailed'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                            <span className="text-white text-lg">📊</span>
                          </div>
                          <span className="text-xs font-medium">{t('streakCounter.config.variant.options.detailed')}</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setStreakConfig({ ...streakConfig, variant: 'calendar' })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          streakConfig.variant === 'calendar'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                            <span className="text-white text-lg">📅</span>
                          </div>
                          <span className="text-xs font-medium">{t('streakCounter.config.variant.options.calendar')}</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setStreakConfig({ ...streakConfig, variant: 'minimal' })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          streakConfig.variant === 'minimal'
                            ? 'border-gray-500 bg-gray-50 text-gray-700'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-gray-300 to-gray-500 rounded-md flex items-center justify-center">
                            <span className="text-white text-lg">⚡</span>
                          </div>
                          <span className="text-xs font-medium">{t('streakCounter.config.variant.options.minimal')}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leaderboard Demo */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('leaderboard.title')}</h2>
              <p className="text-foreground/70">{t('leaderboard.description')}</p>
            </div>

            {/* Demo */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('demo.title')}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-8">
                <Leaderboard
                  period={leaderboardConfig.period}
                  limit={leaderboardConfig.limit}
                  variant={leaderboardConfig.variant}
                  showUserDetails={leaderboardConfig.showUserDetails}
                  colors={globalColors}
                />
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>{t('configuration.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{t('leaderboard.config.period.label')}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, period: 'week' })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.period === 'week'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">📅</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.period.options.week')}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, period: 'month' })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.period === 'month'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">📊</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.period.options.month')}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, period: 'all' })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.period === 'all'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-purple-400 to-purple-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">🏆</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.period.options.all')}</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{t('leaderboard.config.variant.label')}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, variant: 'podium' })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.variant === 'podium'
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">🥇</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.variant.options.podium')}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, variant: 'table' })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.variant === 'table'
                          ? 'border-gray-500 bg-gray-50 text-gray-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-gray-400 to-gray-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">📋</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.variant.options.table')}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, variant: 'minimal' })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.variant === 'minimal'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs">⚡</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.variant.options.minimal')}</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{t('leaderboard.config.limit.label')}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, limit: 3 })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.limit === 3
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-red-400 to-red-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.limit.options.3')}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, limit: 5 })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.limit === 5
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs font-bold">5</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.limit.options.5')}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setLeaderboardConfig({ ...leaderboardConfig, limit: 10 })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        leaderboardConfig.limit === 10
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-6 h-6 mx-auto mb-1 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs font-bold">10</span>
                        </div>
                        <span className="text-xs font-medium">{t('leaderboard.config.limit.options.10')}</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t('leaderboard.config.showUserDetails')}</Label>
                  <Checkbox
                    checked={leaderboardConfig.showUserDetails}
                    onCheckedChange={(checked: boolean) =>
                      setLeaderboardConfig({ ...leaderboardConfig, showUserDetails: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Toaster Demo */}
          <TabsContent value="toaster" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{t('toaster.title')}</h2>
              <p className="text-foreground/70">{t('toaster.description')}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('toaster.demo.title')}</CardTitle>
                <CardDescription>
                  {t('toaster.demo.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => showToast('step-completed')}
                    className="w-full"
                    style={{ backgroundColor: globalColors.primary, color: 'white' }}
                  >
                    {t('toaster.buttons.stepCompleted')}
                  </Button>
                  <Button
                    onClick={() => showToast('circuit-completed')}
                    className="w-full"
                    style={{ backgroundColor: globalColors.secondary, color: 'white' }}
                  >
                    {t('toaster.buttons.circuitCompleted')}
                  </Button>
                  <Button
                    onClick={() => showToast('reward-earned')}
                    className="w-full"
                    style={{ backgroundColor: globalColors.success, color: 'white' }}
                  >
                    {t('toaster.buttons.rewardEarned')}
                  </Button>
                </div>

                <div className="mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`import { GamificationToaster } from '@ludiks/react';

<GamificationToaster 
  notification={{
    type: 'step-completed',
    title: '` + t('toaster.codeExample.title') + `',
    description: '` + t('toaster.codeExample.description') + `',
    points: 150
  }}
  showRewards={true}
  showPoints={true}
  animations={true}
  colors={{ success: "` + globalColors.success + `" }}
/>`}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Installation Note */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">{t('installation.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <code>npm install @ludiks/react</code>
            </div>
            <p className="text-blue-800 text-sm">
              {t('installation.note')}
            </p>
          </CardContent>
        </Card>
      </div>

      {notification && toasterVisible && (
        <GamificationToaster
          notification={notification}
          visible={toasterVisible}
          onClose={() => {
            setToasterVisible(false);
            setTimeout(() => setNotification(null), 300);
          }}
          showRewards={true}
          showPoints={true}
          animations={true}
          colors={globalColors}
        />
      )}
    </div>
  );
}