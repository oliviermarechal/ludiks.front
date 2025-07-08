import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner"
import { getMessages } from 'next-intl/server';
import { headers } from 'next/headers';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') || 'en';

  const metadata = {
    fr: {
      title: "Ludiks - Plateforme de Gamification et d'Engagement Utilisateur",
      description: "Créez des parcours utilisateurs engageants, mesurez leur progression et optimisez leur expérience sans recoder votre produit. Solution de gamification simple et puissante.",
      keywords: "gamification, engagement utilisateur, parcours utilisateur, onboarding, analytics, rétention utilisateur, product analytics",
      openGraph: {
        title: "Ludiks - Transformez vos Parcours Utilisateurs",
        description: "Créez des parcours utilisateurs engageants, mesurez leur progression et optimisez leur expérience sans recoder votre produit.",
        type: "website",
        locale: "fr_FR",
      },
      twitter: {
        card: "summary_large_image",
        title: "Ludiks - Plateforme de Gamification",
        description: "Créez des parcours utilisateurs engageants, mesurez leur progression et optimisez leur expérience.",
      },
    },
    en: {
      title: "Ludiks - Gamification and User Engagement Platform",
      description: "Create engaging user journeys, measure their progress and optimize their experience without recoding your product. Simple and powerful gamification solution.",
      keywords: "gamification, user engagement, user journey, onboarding, analytics, user retention, product analytics",
      openGraph: {
        title: "Ludiks - Transform Your User Journeys",
        description: "Create engaging user journeys, measure their progress and optimize their experience without recoding your product.",
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Ludiks - Gamification Platform",
        description: "Create engaging user journeys, measure their progress and optimize their experience.",
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') || 'en';
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <Providers locale={locale} messages={messages}>
          {children}
          <Toaster />
        </Providers>
        {process.env.NODE_ENV === "production" && (
          <script defer id="fairlytics-id-ajcu6jd9k7ysd6" data-fairlyticskey="3684570dd2885e085c78bf7630e599db" src="https://app.fairlytics.tech/tag/tag.js"></script>
        )}
      </body>
    </html>
  );
}
