import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectImageGallery({ images, isOpen, onClose }) {
  const [viewMode, setViewMode] = useState('scroll');
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Gallery Header */}
      <div className="sticky top-0 bg-background border-b z-10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            size="sm"
            className="text-sm"
          >
            <X className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </span>
          </Button>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'scroll' ? 'default' : 'outline'}
              onClick={() => setViewMode('scroll')}
              size="sm"
              className="text-xs sm:text-sm"
            >
              Scroll
            </Button>
            <Button
              variant={viewMode === 'carousel' ? 'default' : 'outline'}
              onClick={() => setViewMode('carousel')}
              size="sm"
              className="text-xs sm:text-sm"
            >
              Carousel
            </Button>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {viewMode === 'scroll' ? (
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={image.id || index} className="w-full" onClick={() => { setViewMode('carousel'); setCurrentIndex(index); }}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {index + 1} / {images.length}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mx-auto">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="w-full md:h-[80dvh] h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-secondary/70 shadow-lg hover:bg-secondary w-8 h-8 sm:w-10 sm:h-10"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-secondary/70 shadow-lg hover:bg-secondary w-8 h-8 sm:w-10 sm:h-10"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </>
              )}

              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/60 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 overflow-x-auto pb-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-2 h-2 rounded-full transition-all ${index === currentIndex
                      ? 'bg-gray-800 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
