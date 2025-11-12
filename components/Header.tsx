'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut, Mail, Phone, Briefcase, Users, Star } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();

  const getDashboardLink = () => {
    if (!userProfile) return '/dashboard';
    if (userProfile.role === 'admin') return '/admin';
    if (userProfile.role === 'company') return '/company';
    return '/dashboard';
  };

  return (
    <header className="w-full bg-white shadow-sm overflow-hidden">
      <div className="w-full">
        {/* Banner Section */}
        <div className="bg-white py-6 px-4">
          <div className="hidden lg:flex items-center justify-center">
            <Link href="/#apply" className="w-full max-w-7xl">
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src="/banner.jpg"
                  alt="Newsline Training Agency - Attachment Opportunities"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation Bar Below Banner */}
        <div className="bg-black">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-1 py-3">
            <Link href="/" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm">
              Home
            </Link>
            <Link href="/#categories" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm">
              Categories
            </Link>
            <Link href="/#apply" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm">
              Apply Now
            </Link>
            <Link href="/#contact" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm">
              Contact
            </Link>
            <a href="https://newsline.co.ke" target="_blank" rel="noopener noreferrer" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm">
              Newsline.co.ke
            </a>
            <a href="https://radio.newsline.co.ke" target="_blank" rel="noopener noreferrer" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm">
              Newsline Radio
            </a>
            
            {user ? (
              <>
                <Link 
                  href={getDashboardLink()} 
                  className="flex items-center space-x-1 text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-2 uppercase text-sm"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                href="/auth/signin" 
                className="bg-red-600 text-white px-6 py-2 font-bold hover:bg-red-700 transition-colors uppercase text-sm ml-2"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-black">
            <span className="text-white font-bold">Menu</span>
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black">
          <nav className="py-6 px-4">
            {/* Mobile Enhanced Banner */}
            <div className="mb-6 p-5 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl border-2 border-gray-700">
              <div className="flex flex-col space-y-4 text-white">
                {/* Opportunity Message */}
                <div className="flex items-center justify-center space-x-2 bg-gray-900/50 rounded-lg p-2">
                  <Briefcase size={18} className="text-white" />
                  <span className="text-sm font-bold text-white">JOIN US - ATTACHMENT OPPORTUNITIES!</span>
                  <Users size={16} className="text-white" />
                </div>
                
                {/* Contact Info */}
                <div className="flex flex-col space-y-3 text-base">
                  <a href="mailto:newslinedigitaltv@gmail.com" className="flex items-center space-x-3">
                    <Mail size={20} />
                    <span>newslinedigitaltv@gmail.com</span>
                  </a>
                  <a href="tel:0742577038" className="flex items-center space-x-3">
                    <Phone size={20} />
                    <span>0742577038</span>
                  </a>
                </div>
                
                {/* Call to Action */}
                <Link 
                  href="/#apply" 
                  className="flex items-center justify-center space-x-2 bg-white/20 rounded-lg p-2 hover:bg-white/30 transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star size={16} className="text-white" />
                  <span className="text-sm font-bold text-white">START YOUR CAREER JOURNEY TODAY!</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#categories" 
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/#apply" 
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
              <Link 
                href="/#contact" 
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <a 
                href="https://newsline.co.ke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
              >
                Newsline.co.ke
              </a>
              <a 
                href="https://radio.newsline.co.ke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
              >
                Newsline Radio
              </a>
              
              {user ? (
                <>
                  <Link 
                    href={getDashboardLink()} 
                    className="flex items-center space-x-2 text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white hover:bg-gray-800 transition-colors font-semibold text-left py-2 uppercase"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors text-center text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
