import React from 'react';
import { Coffee, ShieldCheck, FileText, Globe, ArrowUpRight, Heart } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { SITE_CONFIG } from '../data/siteConfig';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenSeoAuditor: () => void;
}

export function Footer({ onNavigate, onOpenSeoAuditor }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#241712] text-[#E5D7CC] pt-16 pb-12 border-t border-[#3E2A21]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#3A2820]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#3A261D] flex items-center justify-center text-[#D4A373]">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#FAF7F2]">
                The Coffee Journal
              </span>
            </div>
            <p className="text-sm text-[#B3A194] leading-relaxed max-w-sm">
              An independent coffee education project dedicated to demystifying manual brewing, bean origins, cold extractions, and home barista technique on a student budget.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenSeoAuditor}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded bg-[#38271E] hover:bg-[#483328] text-[#E8D9CE] border border-[#53392B] transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>SEO & AEO Evaluation Panel</span>
              </button>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="font-editorial text-base font-semibold text-[#FAF7F2] mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B3A194]">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Homepage
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog');
                  }}
                  className="hover:text-white transition-colors"
                >
                  All 10 Blog Guides
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                  }}
                  className="hover:text-white transition-colors"
                >
                  About the Journal
                </a>
              </li>
              <li>
                <a
                  href="/blog?category=Cold+Coffee"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog?category=Cold+Coffee');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Cold Coffee Recipes
                </a>
              </li>
              <li>
                <a
                  href="/blog?category=Brewing+Guides"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog?category=Brewing+Guides');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Manual Brewing Guides
                </a>
              </li>
            </ul>
          </div>

          {/* 10 Indexable Articles Deep Links (Part 1) */}
          <div>
            <h3 className="font-editorial text-base font-semibold text-[#FAF7F2] mb-4">
              Featured Guides
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B3A194]">
              {BLOG_POSTS.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/blog/${post.slug}`);
                    }}
                    className="hover:text-white transition-colors line-clamp-1"
                    title={post.title}
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 10 Indexable Articles Deep Links (Part 2) & Technical SEO */}
          <div>
            <h3 className="font-editorial text-base font-semibold text-[#FAF7F2] mb-4">
              Technical SEO
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B3A194]">
              {BLOG_POSTS.slice(5, 10).map((post) => (
                <li key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/blog/${post.slug}`);
                    }}
                    className="hover:text-white transition-colors line-clamp-1"
                    title={post.title}
                  >
                    {post.title}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-[#3A2820]">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-xs text-[#D4A373]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>XML Sitemap (/sitemap.xml)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-xs text-[#D4A373]"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Robots Directive (/robots.txt)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution & Academic Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8E7C70] gap-4">
          <div className="flex items-center gap-2">
            <span>© {currentYear} The Coffee Journal. All rights reserved.</span>
            <span>·</span>
            <span>College SEO Assignment Project</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#8E7C70]">Crafted with semantic HTML5, Schema.org JSON-LD & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
