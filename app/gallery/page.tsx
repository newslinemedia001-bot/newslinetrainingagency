'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { X, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

export default function FullGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold mb-4">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Full <span className="text-red-600">Gallery</span>
            </h1>
            <p className="text-lg text-gray-600">
              Browse through all our training moments and success stories
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && filteredImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No images found in this category</p>
            </div>
          )}
        </div>
      </main>
      <Footer />

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
