/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ludiks.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/auth/*',
    '/dashboard/*',
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/auth/',
          '/dashboard/',
          '/api/',
          '/admin/',
          '/_next/',
        ],
      },
    ],
    additionalSitemaps: [
      'https://ludiks.io/sitemap.xml',
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async () => {
    const locales = ['fr', 'en'];
    const pages = [
      { path: '', changefreq: 'weekly', priority: 1.0 }, // landing
      { path: 'pricing', changefreq: 'monthly', priority: 0.8 },
      { path: 'docs', changefreq: 'monthly', priority: 0.9 }, // Introduction
      { path: 'docs/sdk', changefreq: 'monthly', priority: 0.8 }, // SDK Guide
      { path: 'docs/api', changefreq: 'monthly', priority: 0.8 }, // API Guide
      { path: 'docs/components', changefreq: 'monthly', priority: 0.7 }, // React Components
      { path: 'onboarding', changefreq: 'monthly', priority: 0.5 },
      { path: 'blog', changefreq: 'weekly', priority: 0.8 },
    ];

    const result = [];

    // Fallback landing page (no locale prefix, fallback en)
    result.push({
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    });

    // Blog articles data
    const blogArticles = {
      'en': [
        { slug: 'implementing-relevant-gamification', date: '2025-08-07' }
      ],
      'fr': [
        { slug: 'implementer-gamification-pertinente', date: '2025-08-07' }
      ]
    };

    for (const locale of locales) {
      // Add regular pages
      for (const page of pages) {
        result.push({
          loc: `/${locale}${page.path ? '/' + page.path : ''}`,
          changefreq: page.changefreq,
          priority: page.priority,
          lastmod: new Date().toISOString(),
        });
      }

      // Add blog articles
      const articles = blogArticles[locale] || [];
      for (const article of articles) {
        result.push({
          loc: `/${locale}/blog/${article.slug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date(article.date).toISOString(),
        });
      }
    }

    return result;
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 