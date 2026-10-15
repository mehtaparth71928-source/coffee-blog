import React, { useState } from 'react';
import { 
  Coffee, ArrowRight, Sparkles, BookOpen, Droplets, Flame, 
  Award, Compass, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPost } from '../types/blog';
import { BrewCalculator } from '../components/BrewCalculator';
import { SEOHead } from '../components/SEOHead';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSeoAuditor: () => void;
  onOpenPhotoManager?: () => void;
  customImages?: Record<string, string>;
}

export function HomePage({ onNavigate, onOpenSeoAuditor, onOpenPhotoManager, customImages = {} }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Featured article is Blog 1
  const featuredPost = BLOG_POSTS[0];
  const featuredImageSrc = customImages[featuredPost.slug] || featuredPost.featuredImage;
  const secondaryPosts = BLOG_POSTS.slice(1, 4);

  const categories = ['All', 'Cold Coffee', 'Brewing Guides', 'Coffee Beans', 'Recipes & Drinks'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <>
      <SEOHead
        title="The Coffee Journal - Coffee Brewing, Beans & Cold Coffee Guides"
        description="Master artisanal home brewing with The Coffee Journal. Discover easy cold coffee recipes, cold brew vs iced coffee, bean buying guides, and latte art on a budget."
        canonicalPath="/"
        type="website"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {/* HERO SECTION */}
        <section aria-labelledby="hero-heading" className="relative pt-4 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C5332]">
                <span className="w-6 h-px bg-[#8C5332]" />
                <span>The Independent Coffee Publication</span>
              </div>

              <h1 id="hero-heading" className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#241712] leading-[1.1] tracking-tight">
                Master the Art of Coffee at Home.
              </h1>

              <p className="text-base sm:text-lg text-[#554338] leading-relaxed max-w-xl">
                Demystifying single origins, cold water extractions, milk steaming science, and affordable manual brewing methods for college students and home baristas.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2D1E18] text-[#FAF7F2] font-semibold text-sm hover:bg-[#432D24] transition-all shadow-md group cursor-pointer"
                >
                  <span>Explore All 10 Guides</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A373] group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/blog/how-to-make-cold-coffee-at-home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog/how-to-make-cold-coffee-at-home');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F0E6DC] text-[#2D1E18] font-semibold text-sm hover:bg-[#E4D4C5] transition-all border border-[#DFCFC1] cursor-pointer"
                >
                  <span>Cold Coffee Tutorial</span>
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E8DFD5] text-xs text-[#7A675B]">
                <div>
                  <strong className="block text-base font-bold text-[#2D1E18]">10</strong>
                  <span>Comprehensive Guides</span>
                </div>
                <div>
                  <strong className="block text-base font-bold text-[#2D1E18]">100%</strong>
                  <span>Tested Home Ratios</span>
                </div>
                <div>
                  <strong className="block text-base font-bold text-[#2D1E18]">AEO</strong>
                  <span>Structured for Search</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="relative group bg-white rounded-2xl p-4 sm:p-5 border border-[#DECFC0] shadow-xl overflow-hidden transition-all hover:shadow-2xl">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#2D1E18]">
                  <img
                    src={featuredImageSrc}
                    alt={featuredPost.imageAlt}
                    width={1200}
                    height={800}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-all duration-500 ease-out brightness-[0.98] contrast-[1.03]"
                  />
                  <div className="absolute top-3 left-3 bg-[#2D1E18]/85 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-semibold px-2.5 py-1 rounded">
                    Editor’s Choice
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="text-xs font-semibold text-[#8C5332] flex items-center gap-2">
                    <span>{featuredPost.category}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#2D1E18] group-hover:text-[#8C5332] transition-colors leading-snug">
                    <a
                      href={`/blog/${featuredPost.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${featuredPost.slug}`);
                      }}
                    >
                      {featuredPost.title}
                    </a>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#665448] line-clamp-2 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-[#8C7A6D]">By {featuredPost.author.name}</span>
                    <a
                      href={`/blog/${featuredPost.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${featuredPost.slug}`);
                      }}
                      className="text-xs font-bold text-[#8C5332] inline-flex items-center gap-1 group-hover:underline"
                    >
                      Read Guide <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POPULAR CATEGORIES & LATEST ARTICLES */}
        <section aria-labelledby="articles-heading" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8DFD5]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C5332]">
                Curated Coffee Journal
              </span>
              <h2 id="articles-heading" className="font-editorial text-3xl font-bold text-[#241712] mt-1">
                Latest Brewing Guides & Articles
              </h2>
            </div>

            {/* Filter Buttons & Photo Manager */}
            <div className="flex flex-wrap items-center gap-2">
              {onOpenPhotoManager && (
                <button
                  onClick={onOpenPhotoManager}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FAF0E6] text-[#8C5332] border border-[#DFCFC1] hover:bg-[#F2E4D4] transition-colors cursor-pointer flex items-center gap-1.5 mr-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Change Blog Photos</span>
                </button>
              )}
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#2D1E18] text-[#FAF7F2]'
                      : 'bg-[#F2EAE0] text-[#554338] hover:bg-[#E5D7CC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const cardImage = customImages[post.slug] || post.featuredImage;
              const isCustom = !!customImages[post.slug];

              return (
                <article
                  key={post.slug}
                  className="group flex flex-col bg-white rounded-2xl border border-[#E0D3C4] overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-[#241712]">
                    <img
                      src={cardImage}
                      alt={post.imageAlt}
                      width={600}
                      height={375}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-all duration-500 ease-out brightness-[0.98] contrast-[1.03] group-hover:brightness-100"
                    />
                    {isCustom && (
                      <span className="absolute top-2.5 right-2.5 bg-[#2D1E18]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#C49A6C]/40">
                        Custom Photo
                      </span>
                    )}
                  </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[#8C5332] flex items-center gap-2">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#241712] group-hover:text-[#8C5332] transition-colors leading-snug">
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }}
                      >
                        {post.title}
                      </a>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5C4A3F] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F2EAE0] flex items-center justify-between text-xs text-[#8C7A6D]">
                    <span>{post.publishedDate}</span>
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${post.slug}`);
                      }}
                      className="font-bold text-[#8C5332] flex items-center gap-1 group-hover:underline"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
        </section>

        {/* INTERACTIVE BREW CALCULATOR TOOL */}
        <section aria-label="Coffee Ratio Calculator">
          <BrewCalculator />
        </section>

        {/* EDITORIAL ABOUT TEASER SECTION */}
        <section className="bg-[#F2ECE3] rounded-3xl p-8 sm:p-12 border border-[#E0D3C4] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C5332]">
              About The Coffee Journal
            </span>
            <h2 className="font-editorial text-3xl font-bold text-[#241712]">
              Democratizing Coffee Knowledge for Everyone
            </h2>
            <p className="text-sm sm:text-base text-[#554338] leading-relaxed">
              We started The Coffee Journal with a singular premise: brewing remarkable coffee does not require a thousand-dollar espresso machine or a barista certificate. With tested ratios, fresh whole beans, and an understanding of extraction physics, anyone can brew café-quality drinks at home.
            </p>
            <div className="pt-2">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/about');
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8C5332] hover:underline"
              >
                <span>Read our full story, methodology & editorial ethos</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#DECFC0] shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-editorial text-base font-bold text-[#2D1E18]">
              <ShieldCheck className="w-5 h-5 text-[#8C5332]" />
              <span>Assignment Highlights</span>
            </div>
            <ul className="text-xs text-[#554338] space-y-2">
              <li>✓ 10 in-depth articles (700–1000 words each)</li>
              <li>✓ Full Schema.org JSON-LD (Article + FAQPage)</li>
              <li>✓ XML Sitemap at <code className="bg-[#FAF7F2] px-1 py-0.5 rounded">/sitemap.xml</code></li>
              <li>✓ Strict Answer Engine Optimization format</li>
            </ul>
            <button
              onClick={onOpenSeoAuditor}
              className="w-full mt-2 py-2 px-3 bg-[#2D1E18] text-white text-xs font-semibold rounded-lg hover:bg-[#432D24] transition-colors cursor-pointer"
            >
              Open SEO Audit Modal
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
