'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/lib/navigation";
import { Navigation } from "@/components/navigation";
import { useAuth } from "@/lib/hooks/use-auth.hook";
import SubscriptionSetup from "@/components/subscription/subscription-setup";

export default function PricingPage() {
  const t = useTranslations('pricing');
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Si l'utilisateur est connecté, on pourrait rediriger vers le dashboard
      router.push('/dashboard');
    } else {
      router.push('/auth/register');
    }
  };

  const renderProButton = () => {
    if (isAuthenticated) {
      // Si l'utilisateur est connecté, afficher le bouton d'activation Pro
      return (
        <SubscriptionSetup 
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          variant="default"
        />
      );
    } else {
      // Sinon, afficher le bouton d'inscription
      return (
        <Button
          onClick={handleGetStarted}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          {t('pro.button')}
        </Button>
      );
    }
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

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card className="p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t('free.name')}
              </h3>
              <div className="text-4xl font-bold text-foreground mb-2">
                {t('free.price')}
              </div>
              <p className="text-foreground/60">
                {t('free.description')}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {t.raw('free.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleGetStarted}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              {t('free.button')}
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 border-2 border-secondary/40 hover:border-secondary/60 transition-all duration-300 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground">
              {t('pro.badge')}
            </Badge>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t('pro.name')}
              </h3>
              <div className="text-4xl font-bold text-foreground mb-2">
                {t('pro.price')}
              </div>
              <p className="text-foreground/60">
                {t('pro.description')}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {t.raw('pro.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            {renderProButton()}
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-foreground/60 mb-4">
            {t('footer.text')}
          </p>
          <Button
            variant="outline"
            onClick={() => router.push('/docs')}
            className="text-foreground/80 hover:text-foreground"
          >
            {t('footer.link')}
          </Button>
        </div>
      </div>
    </main>
  );
} 