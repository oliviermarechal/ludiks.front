export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  template: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  template: string;
}

export interface SitemapBlogEntry {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod: string;
}

export const TEMPLATE_MAPPING = {
  'en': {
    'implementing-relevant-gamification': 'ImplementingRelevantGamification',
    'gamification-roi-guide-for-ctos': 'GamificationROIGuideForCTOs',
    'user-retention-strategies-guide': 'UserRetentionStrategiesGuide',
  },
  'fr': {
    'implementer-gamification-pertinente': 'ImplementerGamificationPertinente',
    'guide-roi-gamification-pour-cto': 'GuideROIGamificationPourCTO',
    'comment-ameliorer-retention-utilisateur': 'CommentAmeliorerRetentionUtilisateur',
  }
} as const;

export const BLOG_POSTS = {
  'en': {
    'implementing-relevant-gamification': {
      slug: 'implementing-relevant-gamification',
      title: 'How to Implement Relevant Gamification in Your Application',
      date: '2025-08-07',
      excerpt: 'Discover the key principles and strategies to implement gamification that truly engages your users and drives meaningful results.',
      readingTime: 3,
      template: 'ImplementingRelevantGamification'
    },
    'gamification-roi-guide-for-ctos': {
      slug: 'gamification-roi-guide-for-ctos',
      title: 'ROI of Gamification: Complete Business Case Guide for CTOs',
      date: '2025-08-12',
      excerpt: 'Comprehensive guide to measuring and maximizing gamification ROI. Learn how to build a business case, calculate returns, and implement gamification with proven financial impact for SaaS companies.',
      readingTime: 12,
      template: 'GamificationROIGuideForCTOs'
    },
    'user-retention-strategies-guide': {
      slug: 'user-retention-strategies-guide',
      title: 'User Retention Strategies: Complete Guide to Reduce Churn & Increase Loyalty',
      date: '2025-08-12',
      excerpt: 'Master proven user retention strategies that reduce churn by 40%. Complete playbook with actionable tactics, metrics to track, and real-world examples from successful SaaS companies.',
      readingTime: 10,
      template: 'UserRetentionStrategiesGuide'
    }
  },
  'fr': {
    'implementer-gamification-pertinente': {
      slug: 'implementer-gamification-pertinente',
      title: 'Comment Implémenter une Gamification Pertinente dans Votre Application',
      date: '2025-08-07',
      excerpt: 'Découvrez les principes clés et stratégies pour implémenter une gamification qui engage vraiment vos utilisateurs et génère des résultats concrets.',
      readingTime: 3,
      template: 'ImplementerGamificationPertinente'
    },
    'guide-roi-gamification-pour-cto': {
      slug: 'guide-roi-gamification-pour-cto',
      title: 'ROI Gamification: Guide Business Case Complet pour CTOs',
      date: '2025-08-12',
      excerpt: 'Guide complet pour mesurer et maximiser le ROI de la gamification. Apprenez à construire un business case, calculer les retours et implémenter la gamification avec impact financier prouvé.',
      readingTime: 12,
      template: 'GuideROIGamificationPourCTO'
    },
    'comment-ameliorer-retention-utilisateur': {
      slug: 'comment-ameliorer-retention-utilisateur',
      title: 'Comment Améliorer la Rétention Utilisateur : Guide Complet Anti-Churn',
      date: '2025-08-12',
      excerpt: 'Maîtrisez les stratégies de rétention qui réduisent le churn de 40%. Guide pratique avec tactiques actionnables, métriques à suivre et exemples concrets d\'entreprises SaaS à succès.',
      readingTime: 10,
      template: 'CommentAmeliorerRetentionUtilisateur'
    }
  }
} as const;

export async function getBlogPosts(locale: string): Promise<BlogPostMeta[]> {
  const posts = BLOG_POSTS[locale as keyof typeof BLOG_POSTS] || {};
  
  return Object.values(posts).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
  const posts = BLOG_POSTS[locale as keyof typeof BLOG_POSTS] || {};
  const post = posts[slug as keyof typeof posts];
  
  return post || null;
}

export async function getRelatedPosts(currentSlug: string, locale: string, limit: number = 3): Promise<BlogPostMeta[]> {
  const allPosts = await getBlogPosts(locale);
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) {
    return [];
  }

  return allPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
} 