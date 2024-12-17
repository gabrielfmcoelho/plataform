'use client';

import { useEffect } from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title,
  description,
  image = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200',
  url = 'https://solude.tech',
  type = 'website'
}: SEOProps) {
  const siteTitle = 'Solude Health Tech';
  const fullTitle = `${title} | ${siteTitle}`;

  useEffect(() => {
    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteTitle },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#1E40AF' }
    ];

    metaTags.forEach(({ name, property, content }) => {
      if (name) {
        document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', content);
      }
      if (property) {
        document.querySelector(`meta[property="${property}"]`)?.setAttribute('content', content);
      }
    });

    // Update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [title, description, image, url, type]);

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
}