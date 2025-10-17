'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-purple-700 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl sm:text-2xl font-bold">
                  <span className="text-red-600">NEWS</span>
                  <span className="text-purple-700">LINE</span>
                </h1>
                <p className="text-xs text-purple-700 font-semibold">TRAINING AGENCY</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/#categories" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Categories
            </Link>
            <Link href="/#apply" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Apply Now
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#categories" 
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/#apply" 
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
              <Link 
                href="/#contact" 
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
