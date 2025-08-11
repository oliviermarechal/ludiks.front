'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Code, Copy, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from "@/lib/navigation";

export default function SDKGuidePage() {
  const t = useTranslations('documentation.sdk');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto pt-8 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div id="overview" className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              {t('guide.title')}
            </h1>
          </div>
          <p className="text-xl text-foreground/70">
            {t('guide.subtitle')}
          </p>
        </div>

          {/* Installation */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {t('guide.installation.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">npm</span>
                  <button
                    onClick={() => copyToClipboard('npm install @ludiks/sdk')}
                    className="text-gray-400 hover:text-white text-xs flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    {t('guide.copy')}
                  </button>
                </div>
                <code className="text-sm">npm install @ludiks/sdk</code>
              </div>
            </CardContent>
          </Card>

          {/* Quick Setup */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('guide.quickSetup.title')}</CardTitle>
              <CardDescription>{t('guide.quickSetup.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">{`import { Ludiks } from '@ludiks/sdk';

// ${t('guide.quickSetup.step1')}
Ludiks.configure('your-api-key');

// ${t('guide.quickSetup.step2')}
const response = await Ludiks.initUser({
  id: 'user-123',
  fullName: 'John Doe',
  email: 'john@example.com', // Optional
  picture: 'https://example.com/picture.jpg', // Optional
  metadata: {
    plan: 'premium',
    signupSource: 'website'
  } // Optional
});

// ${t('guide.quickSetup.step3')}
const eventResponse = await Ludiks.trackEvent('user-123', 'login');
console.log('Points earned:', eventResponse.points);`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Methods */}
          <div id="methods" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6">{t('guide.methods.title')}</h2>

            {/* Configure Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Ludiks.configure()
                </CardTitle>
                <CardDescription>
                  {t('guide.methods.configure.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.parameters')}</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">apiKey</span>
                        <Badge variant="destructive" className="ml-2">Required</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.configure.apiKeyDesc')}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.example')}</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <code className="text-sm">Ludiks.configure(&quot;ldk_live_abc123...&quot;);</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* InitUser Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Ludiks.initUser()
                </CardTitle>
                <CardDescription>
                  {t('guide.methods.initUser.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.parameters')}</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">id</span>
                        <Badge variant="destructive" className="ml-2">Required</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.initUser.idDesc')}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">fullName</span>
                        <Badge variant="destructive" className="ml-2">Required</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.initUser.fullNameDesc')}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">email</span>
                        <Badge variant="secondary" className="ml-2">Optional</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.initUser.emailDesc')}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">picture</span>
                        <Badge variant="secondary" className="ml-2">Optional</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.initUser.pictureDesc')}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">metadata</span>
                        <Badge variant="secondary" className="ml-2">Optional</Badge>
                      </div>
                      <div className="text-gray-600">object</div>
                      <div>{t('guide.methods.initUser.metadataDesc')}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.response')}</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">{`{
  "success": true
}`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.example')}</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">{`const user = await Ludiks.initUser({
  id: 'user-123',
  fullName: 'John Doe',
  email: 'john@example.com', // Optional
  picture: 'https://example.com/picture.jpg', // Optional
  metadata: {
    plan: 'premium',
    signupSource: 'website'
  } // Optional
});`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TrackEvent Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Ludiks.trackEvent()
                </CardTitle>
                <CardDescription>
                  {t('guide.methods.trackEvent.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.parameters')}</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">userId</span>
                        <Badge variant="destructive" className="ml-2">Required</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.trackEvent.userIdDesc')}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">eventName</span>
                        <Badge variant="destructive" className="ml-2">Required</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.trackEvent.eventNameDesc')}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">value</span>
                        <Badge variant="secondary" className="ml-2">Optional</Badge>
                      </div>
                      <div className="text-gray-600">number</div>
                      <div>{t('guide.methods.trackEvent.valueDesc')}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">timestamp</span>
                        <Badge variant="secondary" className="ml-2">Optional</Badge>
                      </div>
                      <div className="text-gray-600">Date</div>
                      <div>{t('guide.methods.trackEvent.timestampDesc')}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.response')}</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">{`{
  "success": true,
  "stepCompleted": true,
  "points": 150,
  "rewards": [
    {
      "name": "First Login",
      "description": "Welcome bonus for your first login"
    }
  ],
  "circuitCompleted": false,
  "currentStreak": 5
}`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.example')}</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">{`// Simple event tracking
const response = await Ludiks.trackEvent('user-123', 'login');

// With value and timestamp
const response = await Ludiks.trackEvent(
  'user-123', 
  'purchase', 
  99.99,
  new Date()
);`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GetProfile Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Ludiks.getProfile()
                </CardTitle>
                <CardDescription>
                  {t('guide.methods.getProfile.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.parameters')}</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-mono text-primary">userId</span>
                        <Badge variant="destructive" className="ml-2">Required</Badge>
                      </div>
                      <div className="text-gray-600">string</div>
                      <div>{t('guide.methods.getProfile.userIdDesc')}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.response')}</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">{`{
  "id": "user-123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "externalId": "user-123",
  "currentStreak": 5,
  "longestStreak": 12,
  "metadata": {
    "plan": "premium",
    "signupSource": "website"
  },
  "circuitProgress": [
    {
      "id": "circuit-1",
      "circuitName": "Onboarding",
      "status": "completed",
      "points": 500,
      "startedAt": "2024-01-01T00:00:00Z",
      "completedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "circuit-2", 
      "circuitName": "Power User",
      "status": "in_progress",
      "points": 250,
      "startedAt": "2024-01-16T00:00:00Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLoginAt": "2024-01-20T15:30:00Z"
}`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('guide.methods.example')}</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">{`const profile = await Ludiks.getProfile('user-123');
console.log('Current streak:', profile.currentStreak);
console.log('Circuit points:', profile.circuitProgress[0].points);
console.log('Metadata:', profile.metadata);`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Error Handling */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('guide.errorHandling.title')}</CardTitle>
              <CardDescription>
                {t('guide.errorHandling.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <pre className="text-sm">{`try {
  const response = await Ludiks.trackEvent('user-123', 'invalid-event');
} catch (error) {
  console.error('Ludiks error:', error.message);
  // ${t('guide.errorHandling.graceful')}
}`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <div id="examples" className="mt-12">
            <h2 className="text-3xl font-bold mb-6">{t('guide.examples.title')}</h2>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('guide.examples.complete.title')}</CardTitle>
                <CardDescription>
                  {t('guide.examples.complete.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`import { Ludiks } from '@ludiks/sdk';

// Initialize the SDK
Ludiks.configure('your-api-key');

// Create a new user
try {
  const userResponse = await Ludiks.initUser({
    id: 'user-123',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    metadata: {
      plan: 'premium',
      signupSource: 'mobile-app'
    }
  });
  
  console.log('User created successfully');
  
  // Track user events
  const loginEvent = await Ludiks.trackEvent('user-123', 'login');
  console.log('Login points:', loginEvent.points);
  
  const purchaseEvent = await Ludiks.trackEvent(
    'user-123', 
    'purchase', 
    299.99
  );
  console.log('Purchase rewards:', purchaseEvent.rewards);
  
  // Get user profile
  const profile = await Ludiks.getProfile('user-123');
  console.log('Current streak:', profile.currentStreak);
  
} catch (error) {
  console.error('SDK Error:', error.message);
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                {t('guide.nextSteps.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login">
                  <Button>
                    {t('guide.nextSteps.getApiKey')}
                  </Button>
                </Link>
                <Link href="/docs/components">
                  <Button variant="outline">
                    {t('guide.nextSteps.exploreReact')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}