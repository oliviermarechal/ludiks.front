import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface ArticleLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
  locale: string;
}

export default function ArticleLayout({ post, children, locale }: ArticleLayoutProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTimeText = () => {
    if (locale === 'fr') {
      return `${post.readingTime} min de lecture`;
    }
    return `${post.readingTime} min read`;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8" itemScope itemType="https://schema.org/Article">
      {/* Header */}
      <header className="mb-8">
        <h1 
          className="text-4xl font-bold text-foreground mb-4 leading-tight"
          itemProp="headline"
        >
          {post.title}
        </h1>
        
        <div 
          className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6"
          aria-label={locale === 'fr' ? 'Informations sur l\'article' : 'Article information'}
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time 
              dateTime={post.date}
              itemProp="datePublished"
            >
              {formatDate(post.date)}
            </time>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>{getReadingTimeText()}</span>
          </div>
        </div>
        
        <p 
          className="text-lg text-foreground/70 leading-relaxed"
          itemProp="description"
        >
          {post.excerpt}
        </p>
      </header>

      {/* Content */}
      <main itemProp="articleBody">
        {children}
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Organization",
              "name": "Ludiks"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Ludiks",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.ludiks.io/logo-black.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.ludiks.io/${locale}/blog/${post.slug}`
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://www.ludiks.io/logo-og.jpg",
              "width": 1200,
              "height": 630
            }
          })
        }}
      />
    </article>
  );
} 