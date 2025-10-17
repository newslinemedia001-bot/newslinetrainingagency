'use client';

import { categories } from '@/lib/categories';
import { 
  Tv, 
  Megaphone, 
  Film, 
  Palette, 
  Video, 
  FileText, 
  Camera, 
  Monitor 
} from 'lucide-react';

const categoryIcons: { [key: string]: any } = {
  'media': Tv,
  'public-relations': Megaphone,
  'film-production': Film,
  'graphic-design': Palette,
  'animation-video-editing': Video,
  'scripting': FileText,
  'photography': Camera,
  'computer-science': Monitor,
};

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="text-red-600">Our Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from a wide range of professional fields and find the perfect attachment opportunity for your career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.id];
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl p-6 card-hover cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {category.name}
                </h3>
                
                {category.subcategories && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-500">Specializations:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {category.subcategories.slice(0, 3).map((sub, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2"></span>
                          {sub}
                        </li>
                      ))}
                      {category.subcategories.length > 3 && (
                        <li className="text-red-600 font-semibold">
                          +{category.subcategories.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
