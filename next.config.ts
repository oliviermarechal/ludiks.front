import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const config = {
  // Désactiver le SSR pour les pages du dashboard
  experimental: {
    // Optimiser le rendu côté client
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
  // Configuration pour forcer le client-side rendering sur le dashboard
  async headers() {
    return [
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(config);
