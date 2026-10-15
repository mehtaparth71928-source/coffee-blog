import { useEffect } from 'react';
import { BlogPost } from '../types/blog';
import { SITE_CONFIG } from '../data/siteConfig';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  post?: BlogPost;
  type?: 'website' | 'article';
}

export function SEOHead({
  title,
  description,
  canonicalPath = '/',
  post,
  type = 'website'
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (nameAttr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Set Meta Description
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Set Canonical URL
    const canonicalUrl = `${SITE_CONFIG.siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Set Open Graph & Twitter Cards
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:site_name', SITE_CONFIG.name);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    const imageUrl = post?.featuredImage || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&h=630&q=80';
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:image', imageUrl);

    // 5. Ingest JSON-LD structured data if article
    const existingJsonLd = document.getElementById('dynamic-jsonld');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (post) {
      const script = document.createElement('script');
      script.id = 'dynamic-jsonld';
      script.type = 'application/ld+json';

      const jsonLdData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `${canonicalUrl}#article`,
            'isPartOf': {
              '@type': 'WebSite',
              '@id': `${SITE_CONFIG.siteUrl}/#website`,
              'name': SITE_CONFIG.name
            },
            'headline': post.title,
            'description': post.metaDescription,
            'image': [post.featuredImage],
            'datePublished': `${post.publishedDate}T08:00:00+00:00`,
            'dateModified': `${post.modifiedDate}T10:00:00+00:00`,
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': canonicalUrl
            },
            'author': {
              '@type': 'Person',
              'name': post.author.name,
              'jobTitle': post.author.role,
              'description': post.author.bio
            },
            'publisher': {
              '@type': 'Organization',
              'name': SITE_CONFIG.name,
              'logo': {
                '@type': 'ImageObject',
                'url': `${SITE_CONFIG.siteUrl}/favicon.svg`
              }
            },
            'keywords': [post.mainKeyword, ...post.relatedKeywords].join(', '),
            'wordCount': post.wordCount,
            'articleSection': post.category
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': SITE_CONFIG.siteUrl
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Blog',
                'item': `${SITE_CONFIG.siteUrl}/blog`
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': post.title,
                'item': canonicalUrl
              }
            ]
          },
          // FAQPage Schema for AEO rich snippets
          {
            '@type': 'FAQPage',
            '@id': `${canonicalUrl}#faq`,
            'mainEntity': post.faqs.map(faq => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
              }
            }))
          }
        ]
      };

      script.textContent = JSON.stringify(jsonLdData);
      document.head.appendChild(script);
    }

    return () => {
      const cleanupScript = document.getElementById('dynamic-jsonld');
      if (cleanupScript) cleanupScript.remove();
    };
  }, [title, description, canonicalPath, post, type]);

  return null;
}
