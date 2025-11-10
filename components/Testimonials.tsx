'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  imageUrl?: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsQuery = query(
          collection(db, 'testimonials'),
          where('published', '==', true)
        );
        const snapshot = await getDocs(testimonialsQuery);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Testimonial[];
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Success <span className="text-red-600">Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Voices from Our Community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-2xl p-8 card-hover relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-4 right-4 text-red-600 opacity-20" size={48} />
              
              <div className="flex flex-col items-center text-center mb-6">
                {testimonial.imageUrl ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-red-100 mb-4">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-5xl flex-shrink-0 mb-4">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-red-600 font-semibold">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                &quot;{testimonial.testimonial}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
