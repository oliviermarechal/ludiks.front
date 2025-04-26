'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AuthLayout({
 children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <main className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-card to-background -z-10"/>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 mix-blend-overlay -z-10"/>
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-center min-h-screen p-4">
          {children}
        </div>
      </main>
    </GoogleOAuthProvider>
  );
}