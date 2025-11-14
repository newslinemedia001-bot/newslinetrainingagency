'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
          orderBy('createdAt', 'desc'),
          limit(8)
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
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Gallery</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See our students in action during their training and attachment programs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-all shadow-lg"
            >
              <span>View Full Gallery</span>
              <ArrowRight size={20} />
            </Link>
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
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.imageUrl}
                alt="Gallery Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
