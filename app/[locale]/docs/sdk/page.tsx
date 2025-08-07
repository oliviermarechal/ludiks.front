'use client'

import { Link } from "@/lib/navigation";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useTranslations } from 'next-intl';

export default function SDKDocumentationPage() {
  const t = useTranslations('documentation.sdk');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const initUserCode = `import { Ludiks } from '@ludiks/sdk';

// Initialize or update a user
await Ludiks.initUser({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    full_name: 'John Doe',
    email: 'john@example.com',
    picture: 'https://example.com/avatar.jpg',
    metadata: {
      plan: 'premium',
      source: 'web',
      country: 'FR',
      subscription_date: '2024-01-15'
    }
  }
});`;

  const trackEventCode = `// Track an event
const response = await Ludiks.trackEvent({
  apiKey: 'your-api-key',
  userId: 'user-123',
  eventName: 'profile_completed',
  value: 1,
  timestamp: new Date()
});

console.log(response);
// {
//   "success": true,
//   "updated": true,
//   "stepCompleted": true,
//   "circuitCompleted": false,
//   "alreadyCompleted": false,
//   "points": 150,
//   "rewards": [
//     { "name": "Badge Profile" }
//   ]
// }`;

  const completeExample = `import { Ludiks } from '@ludiks/sdk';

// 1. Initialize user (once)
await Ludiks.initUser({
  apiKey: 'your-api-key',
  user: {
    id: 'user-123',
    full_name: 'John Doe',
    email: 'john@example.com',
    metadata: {
      plan: 'premium',
      source: 'web',
      country: 'FR'
    }
  }
});

// 2. Track events
const loginResponse = await Ludiks.trackEvent({ 
  apiKey: 'your-api-key',
  userId: 'user-123',
  eventName: 'login' 
});

const profileResponse = await Ludiks.trackEvent({ 
  apiKey: 'your-api-key',
  userId: 'user-123',
  eventName: 'profile_completed', 
  value: 1 
});

const purchaseResponse = await Ludiks.trackEvent({ 
  apiKey: 'your-api-key',
  userId: 'user-123',
  eventName: 'purchase', 
  value: 99.99 
});`;

  const responseFormat = `{
  "success": true,
  "updated": true,
  "stepCompleted": true,
  "circuitCompleted": false,
  "alreadyCompleted": false,
  "points": 150,
  "rewards": [
    {
      "name": "Badge Profile"
    }
  ]
}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/docs"
              className="inline-flex items-center text-foreground/70 hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la documentation
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-foreground/70">
              {t('subtitle')}
            </p>
          </div>

          {/* Installation */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('installation.title')}</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('installation.terminal')}</span>
                <button
                  onClick={() => copyToClipboard('npm install @ludiks/sdk', 'install')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'install' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <code>npm install @ludiks/sdk</code>
            </div>
          </Card>

          {/* Setup */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('setup.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('setup.description')}
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('setup.javascript')}</span>
                <button
                  onClick={() => copyToClipboard(initUserCode, 'setup')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'setup' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{initUserCode}</pre>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('setup.required')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>apiKey</code> - Votre clé API</li>
                  <li><code>user.id</code> - Identifiant unique</li>
                  <li><code>user.full_name</code> - Nom complet</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('setup.optional')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>user.email</code> - Adresse email</li>
                  <li><code>user.picture</code> - URL de l&apos;avatar</li>
                  <li><code>user.metadata</code> - Données personnalisées</li>
                </ul>
              </div>
            </div>

            {/* Métadonnées */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">{t('setup.metadata.title')}</h4>
              <p className="text-blue-800 text-sm mb-2">
                {t('setup.metadata.description')}
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Exemples :</strong> {t('setup.metadata.examples')}
              </p>
            </div>
          </Card>

          {/* Tracking */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('tracking.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('tracking.description')}
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('tracking.javascript')}</span>
                <button
                  onClick={() => copyToClipboard(trackEventCode, 'track')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'track' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{trackEventCode}</pre>
            </div>
          </Card>

          {/* Format de réponse */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('response.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('response.description')}
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('response.json')}</span>
                <button
                  onClick={() => copyToClipboard(responseFormat, 'response')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'response' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{responseFormat}</pre>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('response.progression.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>updated</code> - {t('response.progression.updated')}</li>
                  <li><code>stepCompleted</code> - {t('response.progression.step')}</li>
                  <li><code>circuitCompleted</code> - {t('response.progression.circuit')}</li>
                  <li><code>alreadyCompleted</code> - {t('response.progression.already')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('response.data.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>points</code> - {t('response.data.points')}</li>
                  <li><code>stepCompleted</code> - {t('response.data.step')}</li>
                  <li><code>rewards</code> - {t('response.data.rewards')}</li>
                  <li><code>success</code> - {t('response.data.info')}</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Exemple complet */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('example.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('example.description')}
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('example.javascript')}</span>
                <button
                  onClick={() => copyToClipboard(completeExample, 'complete')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'complete' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{completeExample}</pre>
            </div>
          </Card>

          {/* Avantages */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('benefits.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.simplicity.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.simplicity.description')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.automatic.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.automatic.description')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.typescript.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.typescript.description')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.performance.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.performance.description')}
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
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
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
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