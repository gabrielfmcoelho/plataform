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

  // Update document title
  document.title = fullTitle;

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

  // Update meta tags in document head
  metaTags.forEach(({ name, property, content }) => {
    // Remove existing tag if it exists
    const existingTag = document.querySelector(`meta[${name ? 'name' : 'property'}="${name || property}"]`);
    if (existingTag) {
      existingTag.remove();
    }

    // Create and append new tag
    const meta = document.createElement('meta');
    if (name) meta.setAttribute('name', name);
    if (property) meta.setAttribute('property', property);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  });

  // Update canonical link
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  if (existingCanonical) {
    existingCanonical.remove();
  }
  const canonical = document.createElement('link');
  canonical.setAttribute('rel', 'canonical');
  canonical.setAttribute('href', url);
  document.head.appendChild(canonical);

  return null;
}