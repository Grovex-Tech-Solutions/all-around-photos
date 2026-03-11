'use client';

import { useState } from 'react';
import { droneImages } from '@/lib/drone-images';
import DroneGalleryModal from './DroneGalleryModal';
import { Button } from '@/components/ui/Button';

interface DroneGalleryProps {
  onNavigateToForm: () => void;
}

export default function DroneGallery({ onNavigateToForm }: DroneGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < droneImages.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Professional Drone Work
          </h2>
          <p className="text-lg text-gray-600">
            Explore our portfolio of aerial photography and videography projects. Click any image to view in detail.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {droneImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800 cursor-pointer hover:border-red-600 transition-colors"
              onClick={() => handleImageClick(index)}
            >
              <div className="relative aspect-square bg-slate-700 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">{image.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={onNavigateToForm}
            className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg"
          >
            Ready to Get Your Drone Quote?
          </Button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && droneImages[currentImageIndex] && (
        <DroneGalleryModal
          image={droneImages[currentImageIndex]}
          images={droneImages}
          currentIndex={currentImageIndex}
          onClose={() => setIsModalOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
}
