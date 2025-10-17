'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut } from 'lucide-react';
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
    <header className="fixed w-full top-0 z-50 bg-black shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="relative w-44 h-12">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-red-500 transition-colors font-medium">
              Home
            </Link>
            <Link href="/#categories" className="text-white hover:text-red-500 transition-colors font-medium">
              Categories
            </Link>
            <Link href="/#apply" className="text-white hover:text-red-500 transition-colors font-medium">
              Apply Now
            </Link>
            <Link href="/#contact" className="text-white hover:text-red-500 transition-colors font-medium">
              Contact
            </Link>
            
            {user ? (
              <>
                <Link 
                  href={getDashboardLink()} 
                  className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors font-medium"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                href="/auth/signin" 
                className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-white hover:text-red-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#categories" 
                className="text-white hover:text-red-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/#apply" 
                className="text-white hover:text-red-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
              <Link 
                href="/#contact" 
                className="text-white hover:text-red-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href={getDashboardLink()} 
                    className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-1 text-white hover:text-red-500 transition-colors font-medium text-left"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors text-center"
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
