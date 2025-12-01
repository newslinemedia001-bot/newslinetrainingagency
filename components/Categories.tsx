'use client';

import Link from 'next/link';
import { categories } from '@/lib/categories';
import { 
  Tv, 
  Megaphone, 
  Film, 
  Palette, 
  Video, 
  FileText, 
  Camera, 
  Monitor,
  Shield,
  Smartphone,
  Globe,
  Layout,
  Network,
  Layers
} from 'lucide-react';

const categoryIcons: { [key: string]: any } = {
  'media': Tv,
  'public-relations': Megaphone,
  'film-production': Film,
  'graphic-design': Palette,
  'animation-video-editing': Video,
  'scripting': FileText,
  'photography': Camera,
  'computer-science-general': Monitor,
  'cybersecurity': Shield,
  'mobile-development-android': Smartphone,
  'mobile-development-ios': Smartphone,
  'web-development': Globe,
  'web-design': Layout,
  'networking': Network,
  'information-technology': Monitor,
  'it-graphic-design': Layers,
};

export default function Categories() {
  return (
    <section id="categories" className="py-6 bg-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-2 mb-4">
            <span className="text-sm font-semibold text-red-600">16+ Specializations Available</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="text-red-600">Our Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from a wide range of professional fields and find the perfect attachment opportunity for your career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.id] || Monitor;
            return (
              <Link
                key={category.id}
                href="/#apply"
                className="bg-white p-6 shadow-md hover:shadow-lg cursor-pointer group block transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-red-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-300">
                    <Icon className="text-white" size={32} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                  {category.name}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 group-hover:text-red-600 transition-colors mt-3">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Can&apos;t find what you&apos;re looking for?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            <span>Contact us for custom programs</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
