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
      title: "Ludiks - Plateforme de gamification",
      description: "Intégrez la gamification dans votre produit en quelques clics. Créez des parcours engageants, des récompenses et des challenges sans développement. Solution gamification clé en main.",
      keywords: "gamification as a service, gamification plateforme, récompenses utilisateur, challenges gamification, engagement produit, gamification clé en main, parcours gamification",
      openGraph: {
        title: "Ludiks - Plateforme de gamification",
        description: "Intégrez la gamification dans votre produit en quelques clics. Créez des parcours engageants, des récompenses et des challenges sans développement.",
        type: "website",
        locale: "fr_FR",
        images: [
          {
            url: "/logo-og.jpg",
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Ludiks - Gamification as a Service",
        description: "Intégrez la gamification dans votre produit en quelques clics. Créez des parcours engageants, des récompenses et des challenges sans développement.",
      },
    },
    en: {
      title: "Ludiks - Gamification as a Service Platform",
      description: "Integrate gamification into your product with just a few clicks. Create engaging journeys, rewards and challenges without development. Turnkey gamification solution.",
      keywords: "gamification as a service, gamification platform, user rewards, gamification challenges, product engagement, turnkey gamification, gamification journeys",
      openGraph: {
        title: "Ludiks - Gamification as a Service",
        description: "Integrate gamification into your product with just a few clicks. Create engaging journeys, rewards and challenges without development.",
        type: "website",
        locale: "en_US",
        images: [
          {
            url: "/logo-og.jpg",
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Ludiks - Gamification as a Service",
        description: "Integrate gamification into your product with just a few clicks. Create engaging journeys, rewards and challenges without development.",
      },
    },
  };

  const selectedMetadata = metadata[locale as keyof typeof metadata] || metadata.en;
  
  // Ajouter une image par défaut pour l'URL racine
  if (!locale || locale === 'en') {
    selectedMetadata.openGraph = {
      ...selectedMetadata.openGraph,
      images: [
        {
          url: "/logo-og.jpg",
          width: 1200,
          height: 630,
        },
      ],
    };
  }

  return selectedMetadata;
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
