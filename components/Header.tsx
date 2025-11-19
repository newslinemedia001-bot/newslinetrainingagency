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
    <header className="w-full bg-white shadow-sm overflow-hidden relative z-50">
      <div className="w-full">
        {/* Logo + Banner Section */}
        <div className="bg-white py-6 px-4">
          <div className="hidden lg:flex items-center justify-between gap-6 max-w-7xl mx-auto">
            {/* Logo on Left */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-96 h-56 bg-gray-100 p-6 shadow-lg">
                <Image
                  src="/newsline-logo.png"
                  alt="Newsline"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            
            {/* Banner on Right - Pushed far right */}
            <Link href="/#apply" className="flex-1 ml-auto pl-12">
              <div className="relative w-full h-56 overflow-hidden ml-auto">
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
        <div className="bg-black relative z-50">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-1 py-3 relative z-50">
            <Link href="/" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              Home
            </Link>
            <Link href="/#categories" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              Categories
            </Link>
            <Link href="/#apply" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              Apply Now
            </Link>
            <Link href="/#contact" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              Contact
            </Link>
            <a href="https://newsline.co.ke" target="_blank" rel="noopener noreferrer" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              Newsline.co.ke
            </a>
            <a href="https://radio.newsline.co.ke" target="_blank" rel="noopener noreferrer" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              Newsline Radio
            </a>
            <a href="https://www.youtube.com/@newslinetv-i3q" target="_blank" rel="noopener noreferrer" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              YouTube
            </a>
            <Link href="/blog" className="text-white hover:bg-gray-800 transition-colors font-semibold px-4 py-3 uppercase text-sm cursor-pointer block">
              Blog
            </Link>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-2 ml-4">
              <a href="https://www.facebook.com/Newslineke" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/news.linetv?igsh=d3ZkcjNweWdmN3hh" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@newsline.media0?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </a>
            </div>
            
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
                className="bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-700 transition-colors uppercase text-sm ml-2 cursor-pointer"
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
              <a 
                href="https://www.youtube.com/@newslinetv-i3q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
              >
                YouTube
              </a>
              <Link 
                href="/blog" 
                className="text-white hover:bg-gray-800 transition-colors font-semibold py-2 uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
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
