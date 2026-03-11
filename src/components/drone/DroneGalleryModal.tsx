'use client';

import { useEffect, useRef } from 'react';
import { DroneImage } from '@/lib/drone-images';

interface DroneGalleryModalProps {
  image: DroneImage;
  images: DroneImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function DroneGalleryModal({
  image,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: DroneGalleryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-label="Image viewer"
      ref={modalRef}
    >
      <div
        className="relative w-full max-w-4xl max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
          aria-label="Close image viewer"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative w-full h-auto bg-black rounded-lg overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        {/* Image Title and Counter */}
        <div className="mt-4 text-white text-center">
          <h3 className="text-lg font-semibold">{image.title}</h3>
          <p className="text-sm text-gray-400 mt-2">
            {currentIndex + 1} of {images.length}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="text-white hover:text-red-500 disabled:text-gray-600 disabled:hover:text-gray-600 transition-colors"
            aria-label="Previous image"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex-1 text-center text-sm text-gray-400">
            Use arrow keys or click buttons to navigate • Press ESC to close
          </div>

          <button
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
            className="text-white hover:text-red-500 disabled:text-gray-600 disabled:hover:text-gray-600 transition-colors"
            aria-label="Next image"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
