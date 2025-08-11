'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Copy, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from "@/lib/navigation";

export default function APIDocPage() {
  const t = useTranslations('documentation.api');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto pt-8 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div id="overview" className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-100">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              {t('guide.title')}
            </h1>
          </div>
          <p className="text-xl text-foreground/70">
            {t('guide.subtitle')}
          </p>
        </div>

        {/* Base URL */}
        <Card className="mb-8 border-2 border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('guide.baseUrl.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Base URL</span>
                <button
                  onClick={() => copyToClipboard('https://api.ludiks.io')}
                  className="text-gray-400 hover:text-white text-xs flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  {t('guide.copy')}
                </button>
              </div>
              <code className="text-sm">https://api.ludiks.io</code>
            </div>
          </CardContent>
        </Card>

        {/* Authentication */}
        <Card className="mb-8 border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              {t('guide.authentication.title')}
            </CardTitle>
            <CardDescription className="text-yellow-700">
              {t('guide.authentication.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm">{`Authorization: Bearer ldk_live_abc123...`}</pre>
            </div>
            <p className="text-sm text-yellow-700 mt-2">
              {t('guide.authentication.note')}
            </p>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div id="endpoints" className="space-y-8">
          <h2 className="text-3xl font-bold mb-6">{t('guide.endpoints.title')}</h2>

          {/* Create User */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-500">POST</Badge>
                <span className="font-mono text-lg">/end-user</span>
              </CardTitle>
              <CardDescription>
                {t('guide.endpoints.createUser.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.headers')}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`Content-Type: application/json
Authorization: Bearer YOUR_API_KEY`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.requestBody')}</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">id</span>
                      <Badge variant="destructive" className="ml-2">Required</Badge>
                    </div>
                    <div className="text-gray-600">string</div>
                    <div>{t('guide.endpoints.createUser.idDesc')}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">fullName</span>
                      <Badge variant="secondary" className="ml-2">Optional</Badge>
                    </div>
                    <div className="text-gray-600">string</div>
                    <div>{t('guide.endpoints.createUser.fullNameDesc')}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">email</span>
                      <Badge variant="secondary" className="ml-2">Optional</Badge>
                    </div>
                    <div className="text-gray-600">string</div>
                    <div>{t('guide.endpoints.createUser.emailDesc')}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.exampleRequest')}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`curl -X POST https://api.ludiks.io/end-user \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "id": "user-123",
    "fullName": "John Doe",
    "picture": "https://example.com/picture.jpg",
    "email": "john@example.com"
  }'`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.response')} (201 Created)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`{
  "success": true,
  "user": {
    "id": "user-123",
    "fullName": "John Doe",
    "picture": "https://example.com/picture.jpg",
    "email": "john@example.com",
    "externalId": "user-123",
    "metadata": {},
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-01T00:00:00Z"
  }
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Track Event */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="default" className="bg-blue-500">POST</Badge>
                <span className="font-mono text-lg">/tracking</span>
              </CardTitle>
              <CardDescription>
                {t('guide.endpoints.trackEvent.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.headers')}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`Content-Type: application/json
Authorization: Bearer YOUR_API_KEY`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.requestBody')}</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">userId</span>
                      <Badge variant="destructive" className="ml-2">Required</Badge>
                    </div>
                    <div className="text-gray-600">string</div>
                    <div>{t('guide.endpoints.trackEvent.userIdDesc')}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">eventName</span>
                      <Badge variant="destructive" className="ml-2">Required</Badge>
                    </div>
                    <div className="text-gray-600">string</div>
                    <div>{t('guide.endpoints.trackEvent.eventNameDesc')}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">value</span>
                      <Badge variant="secondary" className="ml-2">Optional</Badge>
                    </div>
                    <div className="text-gray-600">number</div>
                    <div>{t('guide.endpoints.trackEvent.valueDesc')}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">timestamp</span>
                      <Badge variant="secondary" className="ml-2">Optional</Badge>
                    </div>
                    <div className="text-gray-600">string (ISO 8601)</div>
                    <div>{t('guide.endpoints.trackEvent.timestampDesc')}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.exampleRequest')}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`curl -X POST https://api.ludiks.io/tracking \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "userId": "user-123",
    "eventName": "purchase",
    "value": 99.99,
    "timestamp": "2024-01-20T15:30:00Z"
  }'`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.response')} (200 OK)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`{
  "success": true,
  "stepCompleted": true,
  "points": 150,
  "rewards": [
    {
      "name": "Big Spender",
      "description": "Made a significant purchase"
    }
  ],
  "circuitCompleted": false,
  "currentStreak": 5
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Get User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-500 text-white">GET</Badge>
                <span className="font-mono text-lg">/end-user/{`{userId}`}</span>
              </CardTitle>
              <CardDescription>
                {t('guide.endpoints.getUserProfile.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.headers')}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`Authorization: Bearer YOUR_API_KEY`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.pathParameters')}</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-mono text-primary">userId</span>
                      <Badge variant="destructive" className="ml-2">Required</Badge>
                    </div>
                    <div className="text-gray-600">string</div>
                    <div>{t('guide.endpoints.getUserProfile.userIdDesc')}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.exampleRequest')}</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`curl -X GET https://api.ludiks.io/end-user/user-123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('guide.endpoints.response')} (200 OK)</h4>
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
            </CardContent>
          </Card>
        </div>

        {/* Error Responses */}
        <Card className="mt-8 border-2 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">{t('guide.errorResponses.title')}</CardTitle>
            <CardDescription className="text-red-700">
              {t('guide.errorResponses.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-800 mb-2">400 Bad Request</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`{
  "error": "Invalid request",
  "message": "Missing required field: userId",
  "code": "VALIDATION_ERROR"
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-red-800 mb-2">401 Unauthorized</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`{
  "error": "Unauthorized",
  "message": "Invalid or missing API key",
  "code": "AUTH_ERROR"
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-red-800 mb-2">404 Not Found</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`{
  "error": "Not found",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}`}</pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rate Limiting */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t('guide.rateLimiting.title')}</CardTitle>
            <CardDescription>
              {t('guide.rateLimiting.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2 text-sm">
                <li>• {t('guide.rateLimiting.limit1')}</li>
                <li>• {t('guide.rateLimiting.limit2')}</li>
                <li>• {t('guide.rateLimiting.headers')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <div id="examples" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">{t('guide.examples.title')}</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('guide.examples.workflow.title')}</CardTitle>
              <CardDescription>
                {t('guide.examples.workflow.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <pre className="text-sm">{`# 1. Create a new user
curl -X POST https://api.ludiks.io/end-user \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "id": "user-456",
    "fullName": "Alice Smith",
    "email": "alice@example.com"
  }'

# 2. Track user events
curl -X POST https://api.ludiks.io/tracking \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "userId": "user-456",
    "eventName": "signup_completed"
  }'

curl -X POST https://api.ludiks.io/tracking \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "userId": "user-456",
    "eventName": "purchase",
    "value": 49.99
  }'

# 3. Get user profile with progress
curl -X GET https://api.ludiks.io/end-user/user-456 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</pre>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('guide.examples.javascript.title')}</CardTitle>
              <CardDescription>
                {t('guide.examples.javascript.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <pre className="text-sm">{`const API_BASE = 'https://api.ludiks.io';
const API_KEY = 'your-api-key';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + API_KEY
};

async function createUser(userData) {
  const response = await fetch(API_BASE + '/end-user', {
    method: 'POST',
    headers,
    body: JSON.stringify(userData)
  });
  return response.json();
}

async function trackEvent(userId, eventName, value = null) {
  const response = await fetch(API_BASE + '/tracking', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      userId,
      eventName,
      value,
      timestamp: new Date().toISOString()
    })
  });
  return response.json();
}

async function getUserProfile(userId) {
  const response = await fetch(API_BASE + '/end-user/' + userId, {
    headers
  });
  return response.json();
}

// Usage example
(async () => {
  try {
    // Create user
    const user = await createUser({
      id: 'user-789',
      fullName: 'Bob Johnson',
      email: 'bob@example.com'
    });
    
    // Track events
    const loginEvent = await trackEvent('user-789', 'login');
    const purchaseEvent = await trackEvent('user-789', 'purchase', 199.99);
    
    // Get profile
    const profile = await getUserProfile('user-789');
    console.log('User streak:', profile.currentStreak);
    
  } catch (error) {
    console.error('API Error:', error);
  }
})();`}</pre>
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
              <Link href="/docs/sdk">
                <Button variant="outline">
                  {t('guide.nextSteps.trySDK')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}