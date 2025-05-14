import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
        <script defer id="fairlytics-id-ajcu6jd9k7ysd6" data-fairlyticskey="3684570dd2885e085c78bf7630e599db" src="https://app.fairlytics.tech/tag/tag.js"></script>
      </body>
    </html>
  );
}
