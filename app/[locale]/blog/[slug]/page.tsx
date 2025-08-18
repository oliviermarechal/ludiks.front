import { notFound } from 'next/navigation';
import { getBlogPost, TEMPLATE_MAPPING } from '@/lib/blog';
import ArticleLayout from '@/components/blog/article-layout';
import Breadcrumbs from '@/components/blog/breadcrumbs';
import { Metadata } from 'next';

const ImplementingRelevantGamification = () => import('@/components/blog/templates/en/implementing-relevant-gamification').then(mod => mod.default);
const ImplementerGamificationPertinente = () => import('@/components/blog/templates/fr/implementer-gamification-pertinente').then(mod => mod.default);
const GamificationROIGuideForCTOs = () => import('@/components/blog/templates/en/gamification-roi-guide-for-ctos').then(mod => mod.default);
const GuideROIGamificationPourCTO = () => import('@/components/blog/templates/fr/guide-roi-gamification-pour-cto').then(mod => mod.default);
const UserRetentionStrategiesGuide = () => import('@/components/blog/templates/en/user-retention-strategies-guide').then(mod => mod.default);
const CommentAmeliorerRetentionUtilisateur = () => import('@/components/blog/templates/fr/comment-ameliorer-retention-utilisateur').then(mod => mod.default);

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `https://ludiks.io/${locale}/blog/${slug}`,
      siteName: 'Ludiks',
      images: [
        {
          url: 'https://ludiks.io/logo-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Ludiks - Gamification Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['https://ludiks.io/logo-og.jpg'],
    },
    alternates: {
      canonical: `https://ludiks.io/${locale}/blog/${slug}`,
      languages: {
        'en': `https://ludiks.io/en/blog/${slug}`,
        'fr': `https://ludiks.io/fr/blog/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'fr'];
  const params = [];

  for (const locale of locales) {
    const templateMapping = TEMPLATE_MAPPING[locale as keyof typeof TEMPLATE_MAPPING];
    if (templateMapping) {
      for (const slug of Object.keys(templateMapping)) {
        params.push({ locale, slug });
      }
    }
  }

  return params;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  
  if (!post) {
    notFound();
  }

  // Récupérer le template correspondant
  const templateMapping = TEMPLATE_MAPPING[locale as keyof typeof TEMPLATE_MAPPING];
  const templateName = templateMapping?.[slug as keyof typeof templateMapping];
  
  if (!templateName) {
    notFound();
  }

  // Rendu conditionnel du template
  let TemplateComponent;
  
  if (locale === 'en' && templateName === 'ImplementingRelevantGamification') {
    TemplateComponent = await ImplementingRelevantGamification();
  } else if (locale === 'fr' && templateName === 'ImplementerGamificationPertinente') {
    TemplateComponent = await ImplementerGamificationPertinente();
  } else if (locale === 'en' && templateName === 'GamificationROIGuideForCTOs') {
    TemplateComponent = await GamificationROIGuideForCTOs();
  } else if (locale === 'fr' && templateName === 'GuideROIGamificationPourCTO') {
    TemplateComponent = await GuideROIGamificationPourCTO();
  } else if (locale === 'en' && templateName === 'UserRetentionStrategiesGuide') {
    TemplateComponent = await UserRetentionStrategiesGuide();
  } else if (locale === 'fr' && templateName === 'CommentAmeliorerRetentionUtilisateur') {
    TemplateComponent = await CommentAmeliorerRetentionUtilisateur();
  } else {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        locale={locale} 
        currentPage={post.title}
        currentPageUrl={`/blog/${slug}`}
      />
      
      <ArticleLayout post={post} locale={locale}>
        <TemplateComponent />
      </ArticleLayout>
    </div>
  );
} 