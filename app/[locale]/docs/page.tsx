'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Sparkles, CheckCircle, Zap, Globe, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from "@/lib/navigation";

export default function DocsIntroPage() {
  const t = useTranslations('documentation.introduction');

  return (
    <div className="container mx-auto pt-8 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-3xl">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="secondary" className="px-3 py-1">{t('badges.javascript')}</Badge>
            <Badge variant="secondary" className="px-3 py-1">{t('badges.react')}</Badge>
            <Badge variant="outline" className="px-3 py-1">{t('badges.api')}</Badge>
            <Badge variant="outline" className="px-3 py-1">{t('badges.opensource')}</Badge>
          </div>
        </div>

        {/* What is Ludiks */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t('whatIs.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 leading-relaxed mb-6">
              {t('whatIs.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary/5">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">{t('whatIs.features.engagement')}</h4>
                <p className="text-sm text-foreground/70">{t('whatIs.features.engagementDesc')}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/5">
                <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">{t('whatIs.features.progression')}</h4>
                <p className="text-sm text-foreground/70">{t('whatIs.features.progressionDesc')}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-500/5">
                <Sparkles className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">{t('whatIs.features.rewards')}</h4>
                <p className="text-sm text-foreground/70">{t('whatIs.features.rewardsDesc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('integration.title')}</CardTitle>
            <CardDescription>{t('integration.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {/* JavaScript SDK */}
              <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{t('integration.sdk.title')}</h3>
                  <p className="text-sm text-foreground/70">{t('integration.sdk.description')}</p>
                </div>
                <Link href="/docs/sdk">
                  <Button variant="outline" size="sm">
                    {t('integration.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* REST API */}
              <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-lg bg-green-100">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{t('integration.api.title')}</h3>
                  <p className="text-sm text-foreground/70">{t('integration.api.description')}</p>
                </div>
                <Link href="/docs/api">
                  <Button variant="outline" size="sm">
                    {t('integration.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* React Components */}
              <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{t('integration.react.title')}</h3>
                  <p className="text-sm text-foreground/70">{t('integration.react.description')}</p>
                </div>
                <Link href="/docs/components">
                  <Button variant="outline" size="sm">
                    {t('integration.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Installation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('installation.title')}</CardTitle>
            <CardDescription>{t('installation.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('installation.sdk')}</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                  <code className="text-sm">npm install @ludiks/sdk</code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('installation.react')}</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                  <code className="text-sm">npm install @ludiks/react</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              {t('nextSteps.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/docs/sdk">
                <Button className="w-full">
                  {t('nextSteps.startWithSDK')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  {t('nextSteps.getApiKey')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}