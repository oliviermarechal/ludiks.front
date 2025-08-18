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
      title: "Ludiks - Plateforme Gamification pour SaaS | Solutions Rétention",
      description: "Plateforme gamification clé en main pour SaaS. Améliorez la rétention utilisateur de 40%, réduisez le churn et implémentez des solutions gamification efficaces. ROI prouvé pour CTOs et PMs.",
      keywords: "solutions gamification, plateforme gamification SaaS, comment améliorer la rétention, outils engagement utilisateur, gamification ROI, rétention utilisateur, churn reduction",
      openGraph: {
        title: "Ludiks - Plateforme Gamification pour SaaS | Solutions Rétention",
        description: "Plateforme gamification clé en main pour SaaS. Améliorez la rétention utilisateur de 40%, réduisez le churn et implémentez des solutions gamification efficaces.",
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
        title: "Ludiks - Plateforme Gamification pour SaaS",
        description: "Plateforme gamification clé en main pour SaaS. Améliorez la rétention utilisateur, réduisez le churn. ROI prouvé pour CTOs.",
      },
    },
    en: {
      title: "Ludiks - Gamification Platform for SaaS User Engagement & ROI",
      description: "Turnkey gamification platform for SaaS CTOs and PMs. Boost user engagement by 40%, reduce churn, implement gamification tools with proven ROI. Built for technical decision makers.",
      keywords: "gamification platform, gamification tools for SaaS, user engagement platform, gamification ROI, user retention strategies, gamification implementation, SaaS engagement tools",
      openGraph: {
        title: "Ludiks - Gamification Platform for SaaS User Engagement & ROI",
        description: "Turnkey gamification platform for SaaS CTOs and PMs. Boost user engagement by 40%, reduce churn, implement gamification tools with proven ROI.",
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
        title: "Ludiks - Gamification Platform for SaaS",
        description: "Turnkey gamification platform for SaaS CTOs. Boost user engagement, reduce churn, implement gamification tools with proven ROI.",
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
