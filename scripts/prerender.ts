import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BLOG_POSTS } from '../src/data/blogs.ts';
import { SITE_CONFIG } from '../src/data/siteConfig.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

async function prerender() {
  console.log('🚀 Starting Pre-render for Technical SEO...');

  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist. Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // Helper to construct article HTML for search engine crawlers
  function generateArticleHtml(post: typeof BLOG_POSTS[0]) {
    const canonical = `${SITE_CONFIG.siteUrl}/blog/${post.slug}`;
    const faqSchema = {
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      'mainEntity': post.faqs.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
      }))
    };

    const articleSchema = {
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      'headline': post.title,
      'description': post.metaDescription,
      'image': [post.featuredImage],
      'datePublished': `${post.publishedDate}T08:00:00+00:00`,
      'dateModified': `${post.modifiedDate}T10:00:00+00:00`,
      'mainEntityOfPage': canonical,
      'author': {
        '@type': 'Person',
        'name': post.author.name
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_CONFIG.name,
        'logo': `${SITE_CONFIG.siteUrl}/favicon.svg`
      },
      'keywords': [post.mainKeyword, ...post.relatedKeywords].join(', '),
      'wordCount': post.wordCount,
      'articleSection': post.category
    };

    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE_CONFIG.siteUrl },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${SITE_CONFIG.siteUrl}/blog` },
        { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': canonical }
      ]
    };

    return {
      title: post.seoTitle,
      description: post.metaDescription,
      canonical,
      image: post.featuredImage,
      type: 'article',
      schemas: [articleSchema, breadcrumbSchema, faqSchema],
      bodyHtml: `
        <article class="max-w-4xl mx-auto px-4 py-8">
          <nav aria-label="Breadcrumb" class="py-2 text-sm text-[#7D6B5E]">
            <a href="/">Home</a> / <a href="/blog">Blog</a> / <span>${post.title}</span>
          </nav>

          <header class="space-y-4 my-6">
            <div class="text-xs font-semibold text-[#8C5332] uppercase tracking-wider">${post.category} · ${post.readTime} · ${post.wordCount} words</div>
            <h1 class="text-4xl font-bold text-[#241712]">${post.title}</h1>
            <div class="text-sm text-[#7A675B]">By ${post.author.name} · Published ${post.publishedDate}</div>
          </header>

          <figure class="my-6">
            <img src="${post.featuredImage}" alt="${post.imageAlt}" class="w-full rounded-2xl" width="1200" height="675" />
            <figcaption class="text-xs text-[#8C7A6D] mt-2">${post.imageAlt}</figcaption>
          </figure>

          <section class="my-6 p-6 bg-[#F5EFEB] rounded-2xl border border-[#DFCFC1]">
            <h2 class="text-lg font-bold text-[#241712] mb-2">Key Takeaways</h2>
            <ul class="list-disc list-inside space-y-1 text-sm text-[#4A3B32]">
              ${post.keyTakeaways.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </section>

          ${post.brewSpecs ? `
          <section class="my-6 p-4 bg-white rounded-xl border border-[#DECFC0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div><strong>Ratio:</strong> ${post.brewSpecs.ratio}</div>
            <div><strong>Grind:</strong> ${post.brewSpecs.grind}</div>
            <div><strong>Temp:</strong> ${post.brewSpecs.waterTemp}</div>
            <div><strong>Time:</strong> ${post.brewSpecs.brewTime}</div>
          </section>
          ` : ''}

          <section class="my-8 space-y-6">
            <h2 class="text-2xl font-bold text-[#241712]">Quick Answers & Questions</h2>
            ${post.aeoQuestions.map(q => `
              <div class="space-y-2">
                <h2 class="text-xl font-bold text-[#2D1E18]">${q.question}</h2>
                <div class="p-4 bg-[#FAF0E6] border-l-4 border-[#8C5332] text-[#241712] font-medium text-base">
                  ${q.directAnswer}
                </div>
                ${q.details.map(d => `<p class="text-sm text-[#4A3B32]">${d}</p>`).join('')}
              </div>
            `).join('')}
          </section>

          <section class="my-8 space-y-6">
            ${post.sections.map(s => `
              <div class="space-y-3">
                <h2 class="text-2xl font-bold text-[#241712]">${s.heading}</h2>
                ${s.paragraphs.map(p => `<p class="text-base text-[#4A3B32] leading-relaxed mb-4">${p}</p>`).join('')}
                ${s.tips ? `
                  <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                    <strong>Tips:</strong>
                    <ul class="list-disc list-inside mt-1">${s.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </section>

          <section class="my-8 pt-6 border-t border-[#E8DFD5] space-y-4">
            <h2 class="text-2xl font-bold text-[#241712]">Frequently Asked Questions</h2>
            ${post.faqs.map(f => `
              <div class="p-4 bg-white rounded-xl border border-[#DECFC0] space-y-1">
                <h3 class="font-bold text-[#2D1E18]">${f.question}</h3>
                <p class="text-sm text-[#554338]">${f.answer}</p>
              </div>
            `).join('')}
          </section>

          <footer class="my-8 pt-6 border-t border-[#E8DFD5] text-xs text-[#7A675B]">
            <div><strong>Main Target Keyword:</strong> ${post.mainKeyword}</div>
            <div><strong>Related Keywords:</strong> ${post.relatedKeywords.join(', ')}</div>
          </footer>
        </article>
      `
    };
  }

  // Compile routes to prerender
  const routes: Array<{
    urlPath: string;
    outputPath: string;
    title: string;
    description: string;
    canonical: string;
    image?: string;
    type?: string;
    schemas?: any[];
    bodyHtml?: string;
  }> = [
    {
      urlPath: '/',
      outputPath: path.join(distDir, 'index.html'),
      title: 'The Coffee Journal - Coffee Brewing, Beans & Cold Coffee Guides',
      description: 'Master artisanal home brewing with The Coffee Journal. Discover easy cold coffee recipes, cold brew vs iced coffee, bean buying guides, and latte art on a budget.',
      canonical: `${SITE_CONFIG.siteUrl}/`,
      type: 'website'
    },
    {
      urlPath: '/blog',
      outputPath: path.join(distDir, 'blog/index.html'),
      title: 'All Coffee Brewing Guides & Bean Articles | The Coffee Journal',
      description: 'Browse all 10 comprehensive guides on cold brew, espresso, iced lattes, Vietnamese coffee, bean buying, and manual brewing methods without machines.',
      canonical: `${SITE_CONFIG.siteUrl}/blog`,
      type: 'website',
      bodyHtml: `
        <div class="max-w-6xl mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold mb-4">Coffee Brewing & Bean Guides</h1>
          <p class="mb-6">Explore our 10 comprehensive coffee articles.</p>
          <ul class="space-y-4">
            ${BLOG_POSTS.map(p => `
              <li>
                <a href="/blog/${p.slug}" class="text-lg font-bold text-[#8C5332]">${p.title}</a>
                <p class="text-sm text-[#554338]">${p.excerpt}</p>
              </li>
            `).join('')}
          </ul>
        </div>
      `
    },
    {
      urlPath: '/about',
      outputPath: path.join(distDir, 'about/index.html'),
      title: 'About The Coffee Journal - Philosophy & Brewing Standards',
      description: 'Learn about The Coffee Journal, an independent publication dedicated to accessible coffee education, brewing science, and home barista recipes.',
      canonical: `${SITE_CONFIG.siteUrl}/about`,
      type: 'website',
      bodyHtml: `
        <div class="max-w-4xl mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold mb-4">About The Coffee Journal</h1>
          <p class="text-base text-[#4A3B32]">An educational coffee publication created to bridge the gap between complex specialty coffee science and practical, budget-conscious home brewing.</p>
        </div>
      `
    },
    {
      urlPath: '/404',
      outputPath: path.join(distDir, '404.html'),
      title: '404 Page Not Found - The Coffee Journal',
      description: 'The coffee article you are looking for does not exist or has been moved.',
      canonical: `${SITE_CONFIG.siteUrl}/404`,
      type: 'website',
      bodyHtml: `
        <div class="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p>Please return to the <a href="/" class="text-[#8C5332]">homepage</a>.</p>
        </div>
      `
    }
  ];

  // Add all 10 articles
  for (const post of BLOG_POSTS) {
    const articleData = generateArticleHtml(post);
    routes.push({
      urlPath: `/blog/${post.slug}`,
      outputPath: path.join(distDir, `blog/${post.slug}/index.html`),
      title: articleData.title,
      description: articleData.description,
      canonical: articleData.canonical,
      image: articleData.image,
      type: articleData.type,
      schemas: articleData.schemas,
      bodyHtml: articleData.bodyHtml
    });
  }

  // Generate HTML files
  for (const r of routes) {
    const dir = path.dirname(r.outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let html = templateHtml;

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${r.title}</title>`);

    // 2. Replace Description
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${r.description}" />`);

    // 3. Replace Canonical
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${r.canonical}" />`);

    // 4. Replace OG tags
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${r.title}" />`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${r.description}" />`);
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${r.canonical}" />`);
    if (r.image) {
      html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:image" content="${r.image}" />`);
      html = html.replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image" content="${r.image}" />`);
    }

    // 5. Replace Twitter tags
    html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${r.title}" />`);
    html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${r.description}" />`);

    // 6. Ingest additional JSON-LD schemas
    if (r.schemas && r.schemas.length > 0) {
      const jsonLdBlock = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": ${JSON.stringify(r.schemas)}
      }
      </script>
      `;
      html = html.replace('</head>', `${jsonLdBlock}\n</head>`);
    }

    // 7. Inject crawlable HTML into <div id="root">
    if (r.bodyHtml) {
      html = html.replace('<div id="root"></div>', `<div id="root">${r.bodyHtml}</div>`);
    }

    fs.writeFileSync(r.outputPath, html, 'utf-8');
    console.log(`✓ Pre-rendered: ${r.urlPath} -> ${path.relative(distDir, r.outputPath)}`);
  }

  // Ensure sitemap.xml and robots.txt are copied to dist
  const publicDir = path.resolve(__dirname, '../public');
  if (fs.existsSync(path.join(publicDir, 'sitemap.xml'))) {
    fs.copyFileSync(path.join(publicDir, 'sitemap.xml'), path.join(distDir, 'sitemap.xml'));
    console.log('✓ Copied sitemap.xml to dist');
  }
  if (fs.existsSync(path.join(publicDir, 'robots.txt'))) {
    fs.copyFileSync(path.join(publicDir, 'robots.txt'), path.join(distDir, 'robots.txt'));
    console.log('✓ Copied robots.txt to dist');
  }

  console.log('🎉 Technical SEO Static Pre-render Complete! 100% crawlable pages generated.');
}

prerender().catch(err => {
  console.error(err);
  process.exit(1);
});
