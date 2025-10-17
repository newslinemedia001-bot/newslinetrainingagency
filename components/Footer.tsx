'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <div className="relative w-44 h-12">
                <Image
                  src="/logo.png"
                  alt="Newsline Training Agency"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Providing quality attachment and training opportunities across various fields 
              including Media, IT, Film Production, and more.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a 
                href="mailto:linkcontentdevelopers@gmail.com" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={18} className="mr-2" />
                <span className="text-sm">linkcontentdevelopers@gmail.com</span>
              </a>
              <a 
                href="tel:+254720933350" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={18} className="mr-2" />
                <span className="text-sm">+254 720 933350</span>
              </a>
              <a 
                href="https://maps.app.goo.gl/zQvUsuzZiEQoodvS6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start text-gray-400 hover:text-white transition-colors"
              >
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">View Location on Map</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link 
                href="/#categories" 
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Categories
              </Link>
              <Link 
                href="/#apply" 
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Apply for Attachment
              </Link>
              <Link 
                href="/admin" 
                className="block text-gray-400 hover:text-red-400 transition-colors text-sm"
              >
                Admin Dashboard
              </Link>
              <a 
                href="https://www.newsline.co.ke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Visit Newsline.co.ke
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Newsline Training Agency. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
