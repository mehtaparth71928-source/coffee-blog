import React, { useState, useEffect } from 'react';
import { Search, X, Coffee, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPost } from '../types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export function SearchModal({ isOpen, onClose, onSelectArticle }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPosts = query.trim() === ''
    ? BLOG_POSTS.slice(0, 5)
    : BLOG_POSTS.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.mainKeyword.toLowerCase().includes(q) ||
          post.relatedKeywords.some((k) => k.toLowerCase().includes(q)) ||
          post.category.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q)
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        className="bg-[#FAF7F2] rounded-2xl w-full max-w-xl shadow-2xl border border-[#D9CABE] overflow-hidden"
      >
        <div className="p-4 border-b border-[#E0D3C4] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#8C5332]" />
          <input
            id="search-modal-title"
            type="text"
            placeholder="Search brewing guides, cold coffee, beans..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#2D1E18] text-base focus:outline-none placeholder:text-[#A8988C]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8C7A6D] hover:text-[#2D1E18] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-[#EFE7DD]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6D] pb-2">
            {query.trim() === '' ? 'Popular Guides' : `Found ${filteredPosts.length} Results`}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#7A675B]">
              No guides found matching "{query}". Try searching for "cold brew", "latte", or "beans".
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.slug}
                onClick={() => {
                  onSelectArticle(post.slug);
                  onClose();
                }}
                className="py-3 px-2 flex items-center justify-between rounded-lg hover:bg-[#F2EAE0] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] flex items-center justify-center text-[#8C5332] shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-sm font-semibold text-[#2D1E18] group-hover:text-[#8C5332] transition-colors">
                      {post.title}
                    </h4>
                    <span className="text-[11px] text-[#7A675B]">
                      {post.category} · {post.readTime}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C4B2A5] group-hover:text-[#8C5332] group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-[#F4EDE4] border-t border-[#E0D3C4] text-[11px] text-[#7A675B] flex justify-between items-center">
          <span>Search 10 full coffee articles & recipes</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#D9CABE] rounded text-[10px]">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
}
