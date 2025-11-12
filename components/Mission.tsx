'use client';

import { Target, Eye } from 'lucide-react';

export default function Mission() {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Target className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To empower the next generation of media, communication, and IT professionals through hands-on training, mentorship, and industry attachment — bridging the gap between academic learning and real-world innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Eye className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be a leading hub for Media and IT excellence in Africa — empowering individuals to combine creativity and technology to communicate, innovate, and inspire change in a digital world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
