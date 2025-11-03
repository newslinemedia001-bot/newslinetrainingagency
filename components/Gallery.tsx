'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { X } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const galleryQuery = query(
          collection(db, 'gallery'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(galleryQuery);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryImage[];
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return null; // Don't show section if no images
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Gallery</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See our students in action during their training and attachment programs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    {image.category && (
                      <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs rounded-full mt-2">
                        {image.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button
            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[60vh]">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-white rounded-b-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-gray-700">{selectedImage.description}</p>
              )}
              {selectedImage.category && (
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full mt-3">
                  {selectedImage.category}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
