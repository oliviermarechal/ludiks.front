'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book, Code, Zap, ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/lib/navigation";
import { Navigation } from "@/components/navigation";

export default function DocumentationPage() {
  const t = useTranslations('documentation');
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/register');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto pt-32 pb-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {/* Quick Start */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('quickStart.title')}
              </h3>
            </div>
            <p className="text-foreground/70 mb-4">
              {t('quickStart.description')}
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/docs/quick-start')}
              className="w-full"
            >
              {t('quickStart.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          {/* API Reference */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Code className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('api.title')}
              </h3>
            </div>
            <p className="text-foreground/70 mb-4">
              {t('api.description')}
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/docs/api')}
              className="w-full"
            >
              {t('api.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          {/* Guides */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Book className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('guides.title')}
              </h3>
            </div>
            <p className="text-foreground/70 mb-4">
              {t('guides.description')}
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/docs/guides')}
              className="w-full"
            >
              {t('guides.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-foreground/70 mb-6">
                {t('cta.description')}
              </p>
              <Button
                onClick={handleGetStarted}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {t('cta.button')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 