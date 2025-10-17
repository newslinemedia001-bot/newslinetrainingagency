'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/20 to-gray-50/30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-80 h-80 bg-white rounded-full shadow-xl p-8 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/logo.png"
                  alt="Newsline Training Agency"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Launch Your Career with
            <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent block mt-2">Professional Training</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our comprehensive attachment programs across Media, IT, Film Production, 
            and various other exciting fields. Get real-world experience and kickstart your career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/#apply"
              className="btn-primary text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 shadow-lg"
            >
              <span>Apply Now</span>
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/#categories"
              className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-50 transition-colors"
            >
              Explore Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">8+</div>
              <div className="text-gray-600 mt-2 text-sm sm:text-base">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">100+</div>
              <div className="text-gray-600 mt-2 text-sm sm:text-base">Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">24/7</div>
              <div className="text-gray-600 mt-2 text-sm sm:text-base">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-75"></div>
    </section>
  );
}
