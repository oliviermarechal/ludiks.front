import { getBlogPosts } from '@/lib/blog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from "@/lib/navigation";
import { Metadata } from 'next';
import Breadcrumbs from '@/components/blog/breadcrumbs';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'fr' ? 'Blog - Ludiks' : 'Blog - Ludiks',
    description: locale === 'fr' 
      ? 'Découvrez nos conseils et bonnes pratiques pour implémenter une gamification efficace dans vos applications.'
      : 'Discover our tips and best practices for implementing effective gamification in your applications.',
    openGraph: {
      title: locale === 'fr' ? 'Blog - Ludiks' : 'Blog - Ludiks',
      description: locale === 'fr' 
        ? 'Découvrez nos conseils et bonnes pratiques pour implémenter une gamification efficace dans vos applications.'
        : 'Discover our tips and best practices for implementing effective gamification in your applications.',
      type: 'website',
      url: `https://ludiks.io/${locale}/blog`,
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
      title: locale === 'fr' ? 'Blog - Ludiks' : 'Blog - Ludiks',
      description: locale === 'fr' 
        ? 'Découvrez nos conseils et bonnes pratiques pour implémenter une gamification efficace dans vos applications.'
        : 'Discover our tips and best practices for implementing effective gamification in your applications.',
      images: ['https://ludiks.io/logo-og.jpg'],
    },
    alternates: {
      canonical: `https://ludiks.io/${locale}/blog`,
      languages: {
        'en': 'https://ludiks.io/en/blog',
        'fr': 'https://ludiks.io/fr/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTimeText = () => {
    if (locale === 'fr') {
      return 'min de lecture';
    }
    return 'min read';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs locale={locale} currentPage="" />

      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {locale === 'fr' ? 'Blog' : 'Blog'}
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          {locale === 'fr' 
            ? 'Découvrez nos conseils et bonnes pratiques pour implémenter une gamification efficace dans vos applications.'
            : 'Discover our tips and best practices for implementing effective gamification in your applications.'
          }
        </p>
      </header>

      {/* Articles List */}
      <main>
        <div className="grid gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime} {getReadingTimeText()}</span>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" className="group">
                    <Link href={`/blog/${post.slug}`}>
                      {locale === 'fr' ? 'Lire l\'article' : 'Read Article'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/70 text-lg">
              {locale === 'fr' 
                ? 'Aucun article disponible pour le moment.'
                : 'No articles available at the moment.'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
} 