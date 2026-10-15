import React, { useState } from 'react';
import { Coffee, Search, Menu, X, CheckCircle2, ShieldCheck, BookOpen, Image as ImageIcon } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenSeoAuditor: () => void;
  onOpenPhotoManager: () => void;
}

export function Header({ currentPath, onNavigate, onOpenSearch, onOpenSeoAuditor, onOpenPhotoManager }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      {/* Top Banner */}
      <div className="bg-[#2D1E18] text-[#EFE7DD] py-1.5 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#82C341] animate-pulse" />
            <span className="hidden sm:inline">Specialty Coffee Editorial</span>
            <span className="text-[#8D6E63] hidden sm:inline">/</span>
            <span>AEO-Optimized Guide for Students & Home Baristas</span>
          </div>
          <button
            onClick={onOpenSeoAuditor}
            className="flex items-center gap-1.5 text-xs text-[#E2D4C3] hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
            title="Inspect Live SEO, AEO & JSON-LD Structure"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C49A6C]" />
            <span>SEO Inspector</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/');
          }}
          className="flex items-center gap-3 group focus-visible:outline-[#8C5332]"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2D1E18] flex items-center justify-center text-[#EFE7DD] shadow-sm group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5 text-[#D4A373]" />
          </div>
          <div>
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#2D1E18] block leading-none">
              The Coffee Journal
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8C5332] font-semibold">
              Brewing · Beans · Science
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A3B32]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className={`transition-colors hover:text-[#8C5332] ${currentPath === '/' ? 'text-[#8C5332] font-semibold' : ''}`}
          >
            Home
          </a>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/blog');
            }}
            className={`transition-colors hover:text-[#8C5332] ${currentPath === '/blog' ? 'text-[#8C5332] font-semibold' : ''}`}
          >
            All Articles
          </a>
          <a
            href="/blog?category=Cold+Coffee"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/blog?category=Cold+Coffee');
            }}
            className="transition-colors hover:text-[#8C5332]"
          >
            Cold Coffee
          </a>
          <a
            href="/blog?category=Brewing+Guides"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/blog?category=Brewing+Guides');
            }}
            className="transition-colors hover:text-[#8C5332]"
          >
            Brewing Guides
          </a>
          <a
            href="/blog?category=Coffee+Beans"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/blog?category=Coffee+Beans');
            }}
            className="transition-colors hover:text-[#8C5332]"
          >
            Coffee Beans
          </a>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/about');
            }}
            className={`transition-colors hover:text-[#8C5332] ${currentPath === '/about' ? 'text-[#8C5332] font-semibold' : ''}`}
          >
            About
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#4A3B32] hover:text-[#2D1E18] hover:bg-[#EFE7DD]/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Search articles"
            title="Search articles"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenPhotoManager}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#FAF0E6] hover:bg-[#F2E4D4] text-[#8C5332] border border-[#DFCFC1] transition-colors cursor-pointer"
            title="Upload or Change the 10 Blog Photos"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">My Photos</span>
          </button>

          <button
            onClick={onOpenSeoAuditor}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#EFE7DD] hover:bg-[#E2D4C3] text-[#2D1E18] border border-[#D9CABE] transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#8C5332]" />
            <span>SEO Audit</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A3B32] hover:text-[#2D1E18] rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFD5] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#4A3B32]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className="py-1 hover:text-[#8C5332]"
            >
              Home
            </a>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/blog');
              }}
              className="py-1 hover:text-[#8C5332]"
            >
              All Articles (10 Guides)
            </a>
            <a
              href="/blog?category=Cold+Coffee"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/blog?category=Cold+Coffee');
              }}
              className="py-1 hover:text-[#8C5332] pl-3 border-l-2 border-[#D4A373]"
            >
              Cold Coffee
            </a>
            <a
              href="/blog?category=Brewing+Guides"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/blog?category=Brewing+Guides');
              }}
              className="py-1 hover:text-[#8C5332] pl-3 border-l-2 border-[#D4A373]"
            >
              Brewing Guides
            </a>
            <a
              href="/blog?category=Coffee+Beans"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/blog?category=Coffee+Beans');
              }}
              className="py-1 hover:text-[#8C5332] pl-3 border-l-2 border-[#D4A373]"
            >
              Coffee Beans
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/about');
              }}
              className="py-1 hover:text-[#8C5332]"
            >
              About & Methodology
            </a>
          </nav>
          <div className="pt-4 border-t border-[#E8DFD5] flex gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSeoAuditor();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#2D1E18] text-[#FAF7F2] text-sm font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>Inspect Page SEO & AEO</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
