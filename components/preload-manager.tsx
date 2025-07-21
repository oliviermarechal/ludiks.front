'use client'

import { useEffect } from 'react';

interface PreloadManagerProps {
  urls?: string[];
}

export function PreloadManager({ urls = [] }: PreloadManagerProps) {
  useEffect(() => {
    // Preload critical resources
    const criticalResources = [
      '/api/auth/check', // Preload auth check
      '/api/circuits', // Preload circuits API
    ];

    const allUrls = [...criticalResources, ...urls];

    allUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    // Preload fonts
    const fontLinks = [
      { rel: 'preload', href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    ];

    fontLinks.forEach(font => {
      const link = document.createElement('link');
      Object.assign(link, font);
      document.head.appendChild(link);
    });

    // Preload critical images
    const criticalImages = [
      '/logo-black.png',
      '/logo-purple.jpg',
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup if needed
    };
  }, [urls]);

  return null;
}

// Hook for resource hints
export function useResourceHints() {
  useEffect(() => {
    // DNS prefetch for external domains
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);
} 