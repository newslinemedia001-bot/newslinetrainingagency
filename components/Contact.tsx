'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 card-hover">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                  <a 
                    href="mailto:linkcontentdevelopers@gmail.com"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    linkcontentdevelopers@gmail.com
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Send us your queries and we&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 card-hover">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                  <a 
                    href="tel:+254720933350"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    +254 720 933350
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Monday to Friday, 9:00 AM - 5:00 PM EAT
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 card-hover">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
                  <a 
                    href="https://maps.app.goo.gl/zQvUsuzZiEQoodvS6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    View Location on Google Maps
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Visit our office for in-person consultations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 card-hover">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Working Hours</h3>
                  <div className="text-gray-700 space-y-1">
                    <p className="text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-sm">Saturday: Closed</p>
                    <p className="text-sm text-gray-500">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8196!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScxOC44IkU!5e0!3m2!1sen!2ske!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1rem', minHeight: '500px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Newsline Training Agency Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
