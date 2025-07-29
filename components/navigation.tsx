'use client'

import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Link } from "@/lib/navigation";
import { useAuth } from "@/lib/hooks/use-auth.hook";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Navigation() {
  const t = useTranslations('home.navigation');
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center h-full"
            >
                <Image
                  src="/ludiks-7.png"
                  alt="Ludiks Logo"
                  width={120}
                  height={40}
                  style={{
                    objectFit: "contain",
                    background: "transparent",
                  }}
                  priority
                />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/pricing"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t('pricing')}
            </Link>
            <Link
              href="/docs"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {t('documentation')}
            </Link>
            <Link
              href={isAuthenticated ? '/dashboard' : '/auth/registration'}
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-md font-medium transition-colors"
            >
              {isAuthenticated ? 'Dashboard' : t('getStarted')}
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                {t('pricing')}
              </Link>
              <Link
                href="/docs"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                {t('documentation')}
              </Link>
              <Link
                href={isAuthenticated ? '/dashboard' : '/auth/registration'}
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-md font-medium transition-colors"
              >
                {isAuthenticated ? 'Dashboard' : t('getStarted')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 