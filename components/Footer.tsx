'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
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
                href="mailto:newslinedigitaltv@gmail.com" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={18} className="mr-2" />
                <span className="text-sm">newslinedigitaltv@gmail.com</span>
              </a>
              <a 
                href="tel:0742577038" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={18} className="mr-2" />
                <span className="text-sm">0742577038</span>
              </a>
              <a 
                href="https://wa.me/254742577038" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg className="w-[18px] h-[18px] mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm">WhatsApp Us</span>
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
