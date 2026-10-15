import React, { useState, useMemo } from 'react';
import { Search, Coffee, ArrowRight, Filter, Calendar, Clock, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPost } from '../types/blog';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
  initialCategory?: string;
  customImages?: Record<string, string>;
}

export function BlogListPage({ onNavigate, initialCategory, customImages = {} }: BlogListPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');

  const categories = ['All', 'Cold Coffee', 'Brewing Guides', 'Coffee Beans', 'Recipes & Drinks'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.mainKeyword.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.relatedKeywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <SEOHead
        title="All Coffee Brewing Guides & Bean Articles | The Coffee Journal"
        description="Browse all 10 comprehensive guides on cold brew, espresso, iced lattes, Vietnamese coffee, bean buying, and manual brewing methods without machines."
        canonicalPath="/blog"
        type="website"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[{ label: 'Blog Listing' }]}
          onNavigate={onNavigate}
        />

        {/* Page Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-[#8C5332]">
            The Complete Library
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#241712] tracking-tight">
            Coffee Brewing & Bean Guides
          </h1>
          <p className="text-base text-[#554338] leading-relaxed">
            Explore all {BLOG_POSTS.length} educational guides, recipes, and origin comparisons. Each article provides tested ratios, science-backed extraction tips, and AEO answers.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#DECFC0] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A6D]" />
              <input
                type="text"
                placeholder="Search by topic, recipe, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CABE] text-sm text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8C5332]"
              />
            </div>

            {/* Total Count */}
            <div className="text-xs font-medium text-[#7A675B] shrink-0">
              Showing <strong>{filteredPosts.length}</strong> of {BLOG_POSTS.length} Articles
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F2EAE0]">
            <span className="text-xs font-semibold text-[#7A675B] flex items-center gap-1 mr-2 py-1.5">
              <Filter className="w-3.5 h-3.5 text-[#8C5332]" /> Category:
            </span>
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

        {/* Articles List / Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#DECFC0] space-y-3">
            <Coffee className="w-8 h-8 text-[#8C5332] mx-auto" />
            <h3 className="font-editorial text-xl font-bold text-[#2D1E18]">
              No articles match your search
            </h3>
            <p className="text-sm text-[#7A675B]">
              Try searching for "espresso", "latte", or reset your category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-xs font-semibold px-4 py-2 rounded-lg bg-[#2D1E18] text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-white rounded-2xl border border-[#DECFC0] overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                <div className="aspect-16/10 overflow-hidden bg-[#2D1E18]">
                  <img
                    src={customImages[post.slug] || post.featuredImage}
                    alt={post.imageAlt}
                    width={600}
                    height={375}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-all duration-500 ease-out brightness-[0.98] contrast-[1.03] group-hover:brightness-100"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[#8C5332] flex items-center gap-2">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-editorial text-xl font-bold text-[#241712] group-hover:text-[#8C5332] transition-colors leading-snug">
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }}
                      >
                        {post.title}
                      </a>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#5C4A3F] line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F2EAE0] flex items-center justify-between text-xs text-[#8C7A6D]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.publishedDate}
                    </span>
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${post.slug}`);
                      }}
                      className="font-bold text-[#8C5332] flex items-center gap-1 group-hover:underline"
                    >
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
