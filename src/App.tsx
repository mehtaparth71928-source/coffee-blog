import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SearchModal } from './components/SearchModal';
import { SeoAuditorModal } from './components/SeoAuditorModal';
import { ImageUploaderModal } from './components/ImageUploaderModal';
import { getBlogPostBySlug, BLOG_POSTS } from './data/blogs';
import { BlogPost } from './types/blog';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [seoAuditorOpen, setSeoAuditorOpen] = useState(false);
  const [photoManagerOpen, setPhotoManagerOpen] = useState(false);

  // Persistent custom photos mapping: slug -> dataUrl
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem('thecoffeejournal_custom_photos');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const handleSaveCustomImages = (updated: Record<string, string>) => {
    setCustomImages(updated);
    try {
      localStorage.setItem('thecoffeejournal_custom_photos', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage limit reached for custom photos', e);
    }
  };

  const handleResetImages = () => {
    setCustomImages({});
    try {
      localStorage.removeItem('thecoffeejournal_custom_photos');
    } catch (e) {
      console.warn(e);
    }
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Smooth scroll to top on path change
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Resolve current route
  let content: React.ReactNode = null;
  let activePost: BlogPost | undefined = undefined;

  // Clean path (strip trailing slash if not root)
  const normalizedPath = currentPath.length > 1 && currentPath.endsWith('/')
    ? currentPath.slice(0, -1)
    : currentPath;

  if (normalizedPath === '/') {
    content = (
      <HomePage 
        onNavigate={navigate} 
        onOpenSeoAuditor={() => setSeoAuditorOpen(true)}
        onOpenPhotoManager={() => setPhotoManagerOpen(true)}
        customImages={customImages}
      />
    );
  } else if (normalizedPath === '/blog') {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category') || undefined;
    content = (
      <BlogListPage 
        onNavigate={navigate} 
        initialCategory={categoryParam}
        customImages={customImages}
      />
    );
  } else if (normalizedPath.startsWith('/blog/')) {
    const slug = normalizedPath.replace('/blog/', '');
    const post = getBlogPostBySlug(slug);
    if (post) {
      activePost = post;
      content = (
        <BlogPostPage 
          post={post} 
          onNavigate={navigate} 
          onOpenSeoAuditor={() => setSeoAuditorOpen(true)}
          customImage={customImages[post.slug]}
          onOpenPhotoManager={() => setPhotoManagerOpen(true)}
        />
      );
    } else {
      content = (
        <NotFoundPage 
          onNavigate={navigate} 
          onOpenSearch={() => setSearchModalOpen(true)} 
        />
      );
    }
  } else if (normalizedPath === '/about') {
    content = (
      <AboutPage 
        onNavigate={navigate} 
        onOpenSeoAuditor={() => setSeoAuditorOpen(true)} 
      />
    );
  } else {
    content = (
      <NotFoundPage 
        onNavigate={navigate} 
        onOpenSearch={() => setSearchModalOpen(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D1E18]">
      {/* Top Header */}
      <Header
        currentPath={normalizedPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenSeoAuditor={() => setSeoAuditorOpen(true)}
        onOpenPhotoManager={() => setPhotoManagerOpen(true)}
      />

      {/* Main Page Content */}
      <div className="flex-1">
        {content}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        onOpenSeoAuditor={() => setSeoAuditorOpen(true)}
      />

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectArticle={(slug) => navigate(`/blog/${slug}`)}
      />

      <SeoAuditorModal
        isOpen={seoAuditorOpen}
        onClose={() => setSeoAuditorOpen(false)}
        currentPost={activePost}
        currentPath={normalizedPath}
      />

      <ImageUploaderModal
        isOpen={photoManagerOpen}
        onClose={() => setPhotoManagerOpen(false)}
        customImages={customImages}
        onSaveCustomImages={handleSaveCustomImages}
        onResetImages={handleResetImages}
      />
    </div>
  );
}
