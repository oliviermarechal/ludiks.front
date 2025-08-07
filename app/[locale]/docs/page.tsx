'use client'

import { Link } from "@/lib/navigation";
import { Card } from "@/components/ui/card";
import { ArrowRight, Package, Code } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Navigation } from "@/components/navigation";

export default function DocumentationPage() {
  const t = useTranslations('documentation');

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

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* SDK JavaScript */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('sdk.title')}
              </h3>
            </div>
            <p className="text-foreground/70 mb-4">
              {t('sdk.subtitle')}
            </p>
            <Link
              href="/docs/sdk"
              className="inline-flex items-center w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors"
            >
              {t('sdk.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Card>

          {/* API REST */}
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
              {t('api.subtitle')}
            </p>
            <Link
              href="/docs/api"
              className="inline-flex items-center w-full justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-md font-medium transition-colors"
            >
              {t('api.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
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
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
              >
                {t('cta.button')}
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 