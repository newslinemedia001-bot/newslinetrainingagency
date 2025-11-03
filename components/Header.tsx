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
    <header className="w-full bg-black shadow-sm overflow-hidden">
      <div className="w-full px-0">
        <div className="flex items-center h-42">
          <Link href="/" className="flex items-center flex-shrink-0 -ml-16">
            <div className="flex items-center">
              <div className="relative w-80 h-24">
                <Image
                  src="/logo.png"
                  alt="Newsline Training Agency"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Enhanced Contact & Opportunity Banner */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="contact-banner bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-2xl px-8 py-5 shadow-2xl border-2 border-red-400 w-full max-w-3xl">
              <div className="flex items-center justify-between text-white text-sm overflow-hidden">
                {/* Left Section - Opportunity Message */}
                <div className="flex items-center space-x-2">
                  <Briefcase size={22} className="contact-icon-bounce text-yellow-300" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-yellow-300">JOIN US TODAY!</span>
                    <span className="text-xs">Attachment Opportunities</span>
                  </div>
                </div>

                {/* Center Section - Contact Info */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Mail size={20} className="contact-icon-bounce" />
                    <a 
                      href="mailto:newslinedigitaltv@gmail.com" 
                      className="text-sm font-medium hover:text-yellow-300 transition-colors"
                    >
                      newslinedigitaltv@gmail.com
                    </a>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="flex items-center space-x-2">
                    <Phone size={20} className="contact-icon-bounce" style={{ animationDelay: '1s' }} />
                    <a 
                      href="tel:0742577038" 
                      className="text-sm font-medium hover:text-yellow-300 transition-colors"
                    >
                      0742577038
                    </a>
                  </div>
                </div>

                {/* Right Section - Clickable Call to Action */}
                <div className="flex items-center">
                  <Link href="/#apply" className="flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer">
                    <Star size={20} className="text-yellow-300 animate-pulse" />
                    <div className="flex flex-col text-right">
                      <span className="text-sm font-bold text-yellow-300">APPLY NOW</span>
                      <span className="text-xs">Start Career</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 flex-shrink-0 pr-8 ml-4">
            <Link href="/" className="text-white hover:text-red-500 transition-colors font-medium text-lg whitespace-nowrap">
              Home
            </Link>
            <Link href="/#categories" className="text-white hover:text-red-500 transition-colors font-medium text-lg whitespace-nowrap">
              Categories
            </Link>
            <Link href="/#apply" className="text-white hover:text-red-500 transition-colors font-medium text-lg whitespace-nowrap">
              Apply Now
            </Link>
            <Link href="/#contact" className="text-white hover:text-red-500 transition-colors font-medium text-lg whitespace-nowrap">
              Contact
            </Link>
            
            {user ? (
              <>
                <Link 
                  href={getDashboardLink()} 
                  className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors font-medium text-lg whitespace-nowrap"
                >
                  <User size={20} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors font-medium text-lg whitespace-nowrap"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                href="/auth/signin" 
                className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors text-lg whitespace-nowrap"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gray-700">
            {/* Mobile Enhanced Banner */}
            <div className="mb-6 p-5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl mx-2 border-2 border-red-400">
              <div className="flex flex-col space-y-4 text-white">
                {/* Opportunity Message */}
                <div className="flex items-center justify-center space-x-2 bg-red-800/50 rounded-lg p-2">
                  <Briefcase size={18} className="text-yellow-300" />
                  <span className="text-sm font-bold text-yellow-300">JOIN US - ATTACHMENT OPPORTUNITIES!</span>
                  <Users size={16} className="text-yellow-300" />
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
                  className="flex items-center justify-center space-x-2 bg-yellow-500/20 rounded-lg p-2 hover:bg-yellow-500/30 transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star size={16} className="text-yellow-300" />
                  <span className="text-sm font-bold text-yellow-300">START YOUR CAREER JOURNEY TODAY!</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <Link 
                href="/" 
                className="text-white hover:text-red-500 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#categories" 
                className="text-white hover:text-red-500 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/#apply" 
                className="text-white hover:text-red-500 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
              <Link 
                href="/#contact" 
                className="text-white hover:text-red-500 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href={getDashboardLink()} 
                    className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={22} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors font-medium text-left text-lg"
                  >
                    <LogOut size={22} />
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
        )}
      </div>
    </header>
  );
}
