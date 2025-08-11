'use client';

import React from 'react';
import { Link, usePathname } from "@/lib/navigation";
import { useTranslations } from 'next-intl';
import { 
  Book, 
  Package, 
  Globe, 
  Sparkles, 
  ChevronRight,
  FileText,
  Code2,
  Layers
} from 'lucide-react';

export function DocsSidebar() {
  const pathname = usePathname();
  const t = useTranslations('documentation.sidebar');

  const isActive = (path: string) => {
    if (path === '/docs' && pathname === '/docs') return true;
    if (path !== '/docs' && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClasses = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
    if (isActive(path)) {
      return `${baseClasses} bg-primary/15 text-primary border-l-3 border-primary shadow-sm`;
    }
    return `${baseClasses} text-foreground/70 hover:text-foreground hover:bg-muted/50`;
  };

  const getSubLinkClasses = (path: string) => {
    const baseClasses = "flex items-center gap-2 px-6 py-1.5 text-sm transition-colors";
    if (isActive(path)) {
      return `${baseClasses} text-primary font-semibold bg-primary/5 rounded`;
    }
    return `${baseClasses} text-foreground/60 hover:text-foreground`;
  };

  return (
    <div className="w-64 border-r border-border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {/* Introduction */}
          <Link href="/docs" className={getLinkClasses('/docs')}>
            <Book className="h-4 w-4" />
            {t('introduction')}
          </Link>

          {/* SDK Section */}
          <div>
            <Link href="/docs/sdk" className={getLinkClasses('/docs/sdk')}>
              <Package className="h-4 w-4" />
              {t('sdk.title')}
              <ChevronRight className={`h-3 w-3 ml-auto transition-transform ${
                pathname.startsWith('/docs/sdk') ? 'rotate-90' : ''
              }`} />
            </Link>
            
            {pathname.startsWith('/docs/sdk') && (
              <div className="ml-4 mt-1 space-y-1 border-l border-border/50">
                <Link href="/docs/sdk#overview" className={getSubLinkClasses('/docs/sdk#overview')}>
                  <FileText className="h-3 w-3" />
                  {t('sdk.overview')}
                </Link>
                <Link href="/docs/sdk#methods" className={getSubLinkClasses('/docs/sdk#methods')}>
                  <Code2 className="h-3 w-3" />
                  {t('sdk.methods')}
                </Link>
                <Link href="/docs/sdk#examples" className={getSubLinkClasses('/docs/sdk#examples')}>
                  <Layers className="h-3 w-3" />
                  {t('sdk.examples')}
                </Link>
              </div>
            )}
          </div>

          {/* API Section */}
          <div>
            <Link href="/docs/api" className={getLinkClasses('/docs/api')}>
              <Globe className="h-4 w-4" />
              {t('api.title')}
              <ChevronRight className={`h-3 w-3 ml-auto transition-transform ${
                pathname.startsWith('/docs/api') ? 'rotate-90' : ''
              }`} />
            </Link>
            
            {pathname.startsWith('/docs/api') && (
              <div className="ml-4 mt-1 space-y-1 border-l border-border/50">
                <Link href="/docs/api#overview" className={getSubLinkClasses('/docs/api#overview')}>
                  <FileText className="h-3 w-3" />
                  {t('api.overview')}
                </Link>
                <Link href="/docs/api#endpoints" className={getSubLinkClasses('/docs/api#endpoints')}>
                  <Code2 className="h-3 w-3" />
                  {t('api.endpoints')}
                </Link>
                <Link href="/docs/api#examples" className={getSubLinkClasses('/docs/api#examples')}>
                  <Layers className="h-3 w-3" />
                  {t('api.examples')}
                </Link>
              </div>
            )}
          </div>

          {/* React Components */}
          <Link href="/docs/components" className={getLinkClasses('/docs/components')}>
            <Sparkles className="h-4 w-4" />
            {t('components')}
          </Link>
        </div>
      </div>
    </div>
  );
}