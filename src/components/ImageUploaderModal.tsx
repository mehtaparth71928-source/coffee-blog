import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, Image as ImageIcon, RefreshCw, Trash2, ShieldCheck, Download } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';

interface ImageUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  customImages: Record<string, string>;
  onSaveCustomImages: (images: Record<string, string>) => void;
  onResetImages: () => void;
}

export function ImageUploaderModal({
  isOpen,
  onClose,
  customImages,
  onSaveCustomImages,
  onResetImages,
}: ImageUploaderModalProps) {
  const [localCustom, setLocalCustom] = useState<Record<string, string>>(customImages);

  useEffect(() => {
    setLocalCustom(customImages);
  }, [customImages]);

  if (!isOpen) return null;

  const handleFileUpload = (slug: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const updated = { ...localCustom, [slug]: dataUrl };
        setLocalCustom(updated);
        onSaveCustomImages(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBatchUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const updated = { ...localCustom };
    const fileArray = Array.from(files);

    // Try matching by number in filename (1.jpeg -> blog 1, etc.) or in sequential order
    fileArray.forEach((file, index) => {
      const numMatch = file.name.match(/(\d+)/);
      let targetIndex = index;
      if (numMatch && numMatch[1]) {
        const parsed = parseInt(numMatch[1], 10) - 1;
        if (parsed >= 0 && parsed < BLOG_POSTS.length) {
          targetIndex = parsed;
        }
      }

      if (targetIndex < BLOG_POSTS.length) {
        const slug = BLOG_POSTS[targetIndex].slug;
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          if (dataUrl) {
            updated[slug] = dataUrl;
            setLocalCustom({ ...updated });
            onSaveCustomImages({ ...updated });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (slug: string) => {
    const updated = { ...localCustom };
    delete updated[slug];
    setLocalCustom(updated);
    onSaveCustomImages(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-uploader-title"
        className="bg-[#FAF7F2] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-[#D9CABE] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#2D1E18] text-[#FAF7F2] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-[#D4A373]" />
            <div>
              <h2 id="image-uploader-title" className="font-editorial text-lg font-bold">
                Custom Blog Photo Manager
              </h2>
              <p className="text-xs text-[#C4B2A5]">
                Upload your exact photos (1.jpeg to 10.jpeg) to replace the default images
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#C4B2A5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close photo manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Batch Dropzone Banner */}
        <div className="p-5 bg-[#F4EDE4] border-b border-[#E0D3C4]">
          <div className="border-2 border-dashed border-[#C4B2A5] rounded-xl p-4 text-center hover:border-[#8C5332] bg-white transition-colors cursor-pointer relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleBatchUpload(e.target.files)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
              <Upload className="w-6 h-6 text-[#8C5332]" />
              <span className="text-sm font-bold text-[#2D1E18]">
                Select All 10 Images (1.jpeg – 10.jpeg)
              </span>
              <span className="text-xs text-[#7A675B]">
                Drag & drop your 10 files here, or click to browse. They will automatically map to Articles 1 through 10 in order.
              </span>
            </div>
          </div>
        </div>

        {/* 10 Articles Image Slots List */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-[#EFE7DD] flex-1">
          {BLOG_POSTS.map((post, idx) => {
            const hasCustom = !!localCustom[post.slug];
            const currentSrc = localCustom[post.slug] || post.featuredImage;

            return (
              <div key={post.slug} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[#241712] border border-[#D9CABE] shrink-0">
                    <img
                      src={currentSrc}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    {hasCustom && (
                      <span className="absolute bottom-0 right-0 bg-emerald-600 text-white p-0.5 rounded-tl text-[9px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#8C5332]">Article {idx + 1}</span>
                      <span className="text-[11px] text-[#7A675B]">({idx + 1}.jpeg)</span>
                      {hasCustom ? (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Your Custom Photo Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#8C7A6D]">Default Photo</span>
                      )}
                    </div>
                    <h4 className="font-editorial text-sm font-semibold text-[#2D1E18] line-clamp-1">
                      {post.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#D9CABE] hover:bg-[#F5EFEB] text-[#2D1E18] transition-colors cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-[#8C5332]" />
                    <span>{hasCustom ? 'Replace' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(post.slug, file);
                      }}
                      className="hidden"
                    />
                  </label>

                  {hasCustom && (
                    <button
                      onClick={() => handleRemoveImage(post.slug)}
                      className="p-1.5 text-[#A8988C] hover:text-rose-600 transition-colors cursor-pointer"
                      title="Reset to default image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#F4EDE4] px-6 py-3 border-t border-[#E0D3C4] flex items-center justify-between text-xs text-[#7A675B]">
          <button
            onClick={() => {
              onResetImages();
              setLocalCustom({});
            }}
            className="text-[#8C5332] font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All to Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#2D1E18] text-white font-semibold hover:bg-[#432D24] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
