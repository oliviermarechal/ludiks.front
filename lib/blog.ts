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

export const TEMPLATE_MAPPING = {
  'en': {
    'implementing-relevant-gamification': 'ImplementingRelevantGamification',
  },
  'fr': {
    'implementer-gamification-pertinente': 'ImplementerGamificationPertinente',
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

  // Pour l'instant, retourner les autres articles
  return allPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
} 