import { ChevronRight, Home } from 'lucide-react';
import { Link } from '@/lib/navigation';

interface BreadcrumbsProps {
  locale: string;
  currentPage: string;
  currentPageUrl?: string;
}

export default function Breadcrumbs({ locale, currentPage, currentPageUrl }: BreadcrumbsProps) {
  const breadcrumbItems = [
    {
      label: locale === 'fr' ? 'Accueil' : 'Home',
      href: `/${locale}`,
      icon: Home,
    },
    {
      label: 'Blog',
      href: `/${locale}/blog`,
    },
  ];

  if (currentPage) {
    breadcrumbItems.push({
      label: currentPage,
      href: currentPageUrl || '#',
    });
  }

  return (
    <nav aria-label={locale === 'fr' ? 'Fil d\'Ariane' : 'Breadcrumb'} className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2" aria-hidden="true" />
              )}
              
              {isLast ? (
                <span 
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {Icon && <Icon className="h-4 w-4 inline mr-1" aria-hidden="true" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors flex items-center"
                >
                  {Icon && <Icon className="h-4 w-4 mr-1" aria-hidden="true" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 