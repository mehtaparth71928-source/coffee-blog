import React from 'react';
import { Coffee, Home, Search, ArrowRight, Compass } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/blogs';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export function NotFoundPage({ onNavigate, onOpenSearch }: NotFoundPageProps) {
  return (
    <>
      <SEOHead
        title="404 Page Not Found - The Coffee Journal"
        description="The coffee article you are looking for does not exist or has been moved. Explore our 10 comprehensive coffee brewing and bean guides."
        canonicalPath="/404"
        type="website"
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-8">
        <div className="w-20 h-20 rounded-2xl bg-[#F0E6DC] border border-[#DFCFC1] flex items-center justify-center text-[#8C5332] mx-auto shadow-sm">
          <Coffee className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C5332]">
            404 Error: Spilled Coffee
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#241712]">
            Page Not Found
          </h1>
          <p className="text-base text-[#665448] max-w-md mx-auto leading-relaxed">
            Looks like this cup was drunk, spilled, or moved to another table. Don't worry, there's plenty of fresh coffee brewing on the homepage.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2D1E18] text-[#FAF7F2] font-semibold text-sm hover:bg-[#432D24] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#D4A373]" />
            <span>Return to Homepage</span>
          </a>

          <button
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#D9CABE] text-[#2D1E18] font-semibold text-sm hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#8C5332]" />
            <span>Search Articles</span>
          </button>
        </div>

        {/* Quick Recommended Guides */}
        <div className="pt-12 border-t border-[#E8DFD5] text-left space-y-4">
          <h2 className="font-editorial text-lg font-bold text-[#2D1E18]">
            Popular Brewing Guides to Explore:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BLOG_POSTS.slice(0, 4).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/blog/${post.slug}`);
                }}
                className="p-3 bg-white rounded-xl border border-[#E0D3C4] hover:border-[#8C5332] transition-colors flex items-center justify-between group"
              >
                <span className="text-xs font-semibold text-[#2D1E18] group-hover:text-[#8C5332] line-clamp-1">
                  {post.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C4B2A5] group-hover:text-[#8C5332] shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
