import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Share2, Bookmark, CheckCircle2, 
  ArrowRight, ShieldCheck, HelpCircle, Sparkles, ChevronDown, 
  ChevronUp, Copy, Check, FileCode, Tag 
} from 'lucide-react';
import { BlogPost } from '../types/blog';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blogs';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { BrewCalculator } from '../components/BrewCalculator';
import { SITE_CONFIG } from '../data/siteConfig';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
  onOpenSeoAuditor: () => void;
  customImage?: string;
  onOpenPhotoManager?: () => void;
}

export function BlogPostPage({ post, onNavigate, onOpenSeoAuditor, customImage, onOpenPhotoManager }: BlogPostPageProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const heroImageSrc = customImage || post.featuredImage;

  const relatedPosts = post.relatedArticleSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((p): p is BlogPost => p !== undefined);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <>
      <SEOHead
        title={post.seoTitle}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
        post={post}
        type="article"
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]}
          onNavigate={onNavigate}
        />

        {/* Article Header & Metadata */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#8C5332]">
            <span className="uppercase tracking-widest">{post.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#665448]">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span>·</span>
            <span className="text-[#665448]">{post.wordCount} words</span>
          </div>

          {/* Primary H1 Heading */}
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#241712] tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {/* Author & Published Info */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DFD5] gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover border border-[#DECFC0]"
              />
              <div>
                <span className="font-medium text-sm text-[#2D1E18] block">
                  {post.author.name}
                </span>
                <span className="text-xs text-[#7A675B] flex items-center gap-2">
                  <span>{post.author.role}</span>
                  <span>·</span>
                  <time dateTime={post.publishedDate}>{post.publishedDate}</time>
                </span>
              </div>
            </div>

            {/* Quick Actions & SEO Audit Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#F2EAE0] hover:bg-[#E5D7CC] text-[#2D1E18] transition-colors cursor-pointer"
                title="Copy Article URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
              </button>

              <button
                onClick={onOpenSeoAuditor}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#2D1E18] hover:bg-[#432D24] text-[#FAF7F2] transition-colors cursor-pointer"
                title="Inspect Page SEO & Schema"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>SEO Inspector</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <figure className="space-y-2">
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#2D1E18] shadow-md border border-[#E0D3C4]">
            <img
              src={heroImageSrc}
              alt={post.imageAlt}
              width={1200}
              height={675}
              loading="eager"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#8C7A6D] px-1 gap-1">
            <span>{post.imageAlt}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#A8988C]">
                Asset: <code>{post.localImageFilename}</code>
              </span>
              {onOpenPhotoManager && (
                <button
                  type="button"
                  onClick={onOpenPhotoManager}
                  className="text-[11px] font-semibold text-[#8C5332] hover:underline cursor-pointer"
                >
                  Change Photo →
                </button>
              )}
            </div>
          </figcaption>
        </figure>

        {/* KEY TAKEAWAYS BOX */}
        <section aria-label="Key Takeaways" className="bg-[#F5EFEB] border border-[#DFCFC1] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C5332] mb-3">
            <Sparkles className="w-4 h-4 text-[#8C5332]" />
            <span>Key Takeaways (At a Glance)</span>
          </div>
          <ul className="space-y-2.5 text-sm text-[#4A3B32]">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* BREW SPECS (if applicable) */}
        {post.brewSpecs && (
          <div className="bg-white p-5 rounded-xl border border-[#DECFC0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[#8C7A6D] block">Brew Ratio</span>
              <strong className="text-sm text-[#2D1E18]">{post.brewSpecs.ratio}</strong>
            </div>
            <div>
              <span className="text-[#8C7A6D] block">Grind Consistency</span>
              <strong className="text-sm text-[#2D1E18]">{post.brewSpecs.grind}</strong>
            </div>
            <div>
              <span className="text-[#8C7A6D] block">Water Temp</span>
              <strong className="text-sm text-[#2D1E18]">{post.brewSpecs.waterTemp}</strong>
            </div>
            <div>
              <span className="text-[#8C7A6D] block">Total Time</span>
              <strong className="text-sm text-[#2D1E18]">{post.brewSpecs.brewTime}</strong>
            </div>
          </div>
        )}

        {/* AEO DIRECT ANSWERS SECTION (H2 Question headings with 40-60 word answers) */}
        <section aria-labelledby="aeo-section-heading" className="space-y-8 pt-4">
          <div className="border-b border-[#E8DFD5] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C5332]">
              Answer Engine Optimization (AEO)
            </span>
            <h2 id="aeo-section-heading" className="font-editorial text-2xl font-bold text-[#241712] mt-0.5">
              Quick Answers & Common Questions
            </h2>
          </div>

          <div className="space-y-8">
            {post.aeoQuestions.map((q, idx) => (
              <div key={idx} className="space-y-3">
                {/* Question-based H2 heading */}
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#2D1E18]">
                  {q.question}
                </h2>

                {/* Direct 40-60 word direct answer callout for AI Overviews / Google Snippets */}
                <div className="p-4 rounded-xl bg-[#FAF0E6] border-l-4 border-[#8C5332] text-[#241712] text-base leading-relaxed font-medium">
                  {q.directAnswer}
                </div>

                {/* Follow-up details */}
                <div className="space-y-2 text-[#4A3B32] text-sm sm:text-base leading-relaxed pt-1">
                  {q.details.map((detail, dIdx) => (
                    <p key={dIdx}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IN-DEPTH ARTICLE SECTIONS */}
        <section className="space-y-10 pt-6">
          {post.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#241712]">
                {section.heading}
              </h2>

              <div className="article-prose space-y-4">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.tips && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-sm text-amber-900 space-y-1.5">
                  <strong className="block font-semibold">Key Barista Tips:</strong>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                    {section.tips.map((t, tIdx) => (
                      <li key={tIdx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {section.callout && (
                <div className="p-4 rounded-xl bg-[#F0EBE3] border border-[#DFCFC1] text-sm text-[#3D2F27] space-y-1">
                  <strong className="block font-editorial text-base text-[#241712]">
                    {section.callout.title}
                  </strong>
                  <p className="text-xs sm:text-sm leading-relaxed">{section.callout.text}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* INTERACTIVE BREW CALCULATOR ON BREWING ARTICLES */}
        {post.brewSpecs && (
          <section aria-label="Interactive Brewing Calculator">
            <BrewCalculator />
          </section>
        )}

        {/* FAQ SECTION (With Accordion & Schema.org FAQPage compliance) */}
        <section aria-labelledby="faq-heading" className="pt-8 border-t border-[#E8DFD5] space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C5332]">
              Frequently Asked Questions
            </span>
            <h2 id="faq-heading" className="font-editorial text-2xl sm:text-3xl font-bold text-[#241712] mt-1">
              Coffee Questions Answered
            </h2>
          </div>

          <div className="space-y-3">
            {post.faqs.map((faq, fIdx) => (
              <div 
                key={fIdx}
                className="bg-white rounded-xl border border-[#DECFC0] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(fIdx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-editorial text-base font-semibold text-[#2D1E18] hover:text-[#8C5332] transition-colors cursor-pointer"
                  aria-expanded={openFaqIndex === fIdx}
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === fIdx ? (
                    <ChevronUp className="w-5 h-5 text-[#8C5332] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#8C7A6D] shrink-0" />
                  )}
                </button>

                {openFaqIndex === fIdx && (
                  <div className="px-4 pb-5 sm:px-5 text-sm text-[#554338] leading-relaxed border-t border-[#F2EAE0] pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* TARGET KEYWORDS & SEO VERIFICATION BADGE */}
        <div className="p-4 rounded-xl bg-[#F4EDE4] border border-[#DECFC0] flex flex-wrap items-center justify-between text-xs text-[#7A675B] gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[#8C5332]" />
            <span>Target Keywords:</span>
            <strong className="text-[#2D1E18]">{post.mainKeyword}</strong>
            <span>·</span>
            <span>{post.relatedKeywords[0]}</span>
            <span>·</span>
            <span>{post.relatedKeywords[1]}</span>
          </div>

          <button
            onClick={onOpenSeoAuditor}
            className="text-xs font-bold text-[#8C5332] hover:underline cursor-pointer"
          >
            Audit this page's SEO →
          </button>
        </div>

        {/* AUTHOR BIO CARD */}
        <section aria-label="Author Information" className="p-6 bg-white rounded-2xl border border-[#DECFC0] flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            width={72}
            height={72}
            className="w-18 h-18 rounded-full object-cover border-2 border-[#D4A373] shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5332]">
              Written by
            </span>
            <h3 className="font-editorial text-lg font-bold text-[#2D1E18]">
              {post.author.name}
            </h3>
            <p className="text-xs text-[#7A675B] leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </section>

        {/* RELATED ARTICLES SECTION (Descriptive internal anchor text) */}
        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-heading" className="pt-8 border-t border-[#E8DFD5] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C5332]">
                  Keep Learning
                </span>
                <h2 id="related-heading" className="font-editorial text-2xl font-bold text-[#241712] mt-0.5">
                  Related Coffee Guides
                </h2>
              </div>
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/blog');
                }}
                className="text-xs font-bold text-[#8C5332] hover:underline"
              >
                View all articles →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="group bg-white rounded-xl border border-[#DECFC0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-16/10 overflow-hidden bg-[#2D1E18]">
                    <img
                      src={related.featuredImage}
                      alt={related.imageAlt}
                      width={400}
                      height={250}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-all duration-500 ease-out brightness-[0.98] contrast-[1.03] group-hover:brightness-100"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[11px] font-semibold text-[#8C5332] block">
                        {related.category}
                      </span>
                      <h3 className="font-editorial text-sm font-bold text-[#2D1E18] group-hover:text-[#8C5332] transition-colors line-clamp-2">
                        <a
                          href={`/blog/${related.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/blog/${related.slug}`);
                          }}
                        >
                          {related.title}
                        </a>
                      </h3>
                    </div>
                    <a
                      href={`/blog/${related.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${related.slug}`);
                      }}
                      className="text-xs font-bold text-[#8C5332] flex items-center gap-1 group-hover:underline pt-2"
                    >
                      Read Guide <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
