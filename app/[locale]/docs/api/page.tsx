'use client'

import { Link } from "@/lib/navigation";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useTranslations } from 'next-intl';

export default function APIDocumentationPage() {
  const t = useTranslations('documentation.api');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const createUserCode = `curl -X POST https://api.ludiks.io/api/end-user \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "id": "user-123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "picture": "https://example.com/avatar.jpg",
    "metadata": {
      "plan": "premium",
      "source": "web"
    }
  }'`;

  const trackEventCode = `curl -X POST https://api.ludiks.io/api/tracking \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "userId": "user-123",
    "eventName": "profile_completed",
    "value": 1,
    "timestamp": "2024-01-15T10:30:00Z"
  }'`;

  const getProfileCode = `curl -X GET https://api.ludiks.io/api/end-user/user-123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`;

  const jsExample = `// Create a user
const createUser = async (userData) => {
  const response = await fetch('https://api.ludiks.io/api/end-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${API_KEY}\`
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Track an event
const trackEvent = async (eventData) => {
  const response = await fetch('https://api.ludiks.io/api/tracking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${API_KEY}\`
    },
    body: JSON.stringify(eventData)
  });
  return response.json();
};

// Get user profile
const getProfile = async (userId) => {
  const response = await fetch(\`https://api.ludiks.io/api/end-user/\${userId}\`, {
    method: 'GET',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`
    }
  });
  return response.json();
};`;

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
              {t('back')}
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-foreground/70">
              {t('subtitle')}
            </p>
          </div>

          {/* Authentification */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('auth.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('auth.description')}
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('auth.header')}</span>
                <button
                  onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'auth' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </Card>

          {/* Important : Identifiant utilisateur */}
          <Card className="p-6 mb-8 border-2 border-yellow-200 bg-yellow-50/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('important.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('important.description')}
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-foreground/70 mb-2">
                <strong>{t('important.examplesTitle')} :</strong>
              </p>
              <p className="text-sm text-foreground/60">
                {t('important.examples')}
              </p>
            </div>
          </Card>

          {/* Endpoint 1: Créer un utilisateur */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('endpoints.createUser.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('endpoints.createUser.description')}
            </p>
            
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mb-2">
                {t('endpoints.createUser.method')}
              </span>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('endpoints.createUser.curl')}</span>
                <button
                  onClick={() => copyToClipboard(createUserCode, 'create')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'create' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{createUserCode}</pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('endpoints.createUser.required.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>id</code> - {t('endpoints.createUser.required.id')}</li>
                  <li><code>fullName</code> - {t('endpoints.createUser.required.name')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('endpoints.createUser.optional.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>email</code> - {t('endpoints.createUser.optional.email')}</li>
                  <li><code>picture</code> - {t('endpoints.createUser.optional.picture')}</li>
                  <li><code>metadata</code> - {t('endpoints.createUser.optional.metadata')}</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Endpoint 2: Tracker un événement */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('endpoints.trackEvent.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('endpoints.trackEvent.description')}
            </p>
            
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mb-2">
                {t('endpoints.trackEvent.method')}
              </span>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('endpoints.trackEvent.curl')}</span>
                <button
                  onClick={() => copyToClipboard(trackEventCode, 'track')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'track' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{trackEventCode}</pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('endpoints.trackEvent.required.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>userId</code> - {t('endpoints.trackEvent.required.userId')}</li>
                  <li><code>eventName</code> - {t('endpoints.trackEvent.required.eventName')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('endpoints.trackEvent.optional.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>value</code> - {t('endpoints.trackEvent.optional.value')}</li>
                  <li><code>timestamp</code> - {t('endpoints.trackEvent.optional.timestamp')}</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Endpoint 3: Récupérer le profil utilisateur */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('endpoints.getProfile.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('endpoints.getProfile.description')}
            </p>
            
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mb-2">
                GET /end-user/:userId
              </span>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('endpoints.getProfile.curl')}</span>
                <button
                  onClick={() => copyToClipboard(getProfileCode, 'profile')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'profile' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{getProfileCode}</pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('endpoints.getProfile.required.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li><code>userId</code> - {t('endpoints.getProfile.required.userId')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('endpoints.getProfile.optional.title')}</h4>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>{t('endpoints.getProfile.optional.none')}</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Exemple JavaScript */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('examples.javascript.title')}</h2>
            <p className="text-foreground/70 mb-4">
              {t('examples.javascript.description')}
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{t('examples.javascript.code')}</span>
                <button
                  onClick={() => copyToClipboard(jsExample, 'js')}
                  className="text-gray-400 hover:text-white"
                >
                  {copied === 'js' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto">{jsExample}</pre>
            </div>
          </Card>

          {/* Réponses */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('responses.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('responses.success.title')}</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                  <pre>{`{
  "success": true,
  "data": {
    "id": "user-123",
    "fullName": "John Doe"
  }
}`}</pre>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{t('responses.error.title')}</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                  <pre>{`{
  "success": false,
  "error": "Invalid API key"
}`}</pre>
                </div>
              </div>
            </div>
          </Card>

          {/* Avantages */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('benefits.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.flexibility.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.flexibility.description')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.control.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.control.description')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.backend.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.backend.description')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('benefits.standard.title')}</h3>
                <p className="text-foreground/70 text-sm">
                  {t('benefits.standard.description')}
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
                href="/auth/registration"
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