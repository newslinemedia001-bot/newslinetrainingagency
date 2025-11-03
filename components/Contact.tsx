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
                    href="mailto:newslinedigitaltv@gmail.com"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    newslinedigitaltv@gmail.com
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
                    href="tel:0742577038"
                    className="text-red-600 hover:text-red-700 transition-colors block mb-2"
                  >
                    0742577038
                  </a>
                  <a 
                    href="https://wa.me/254742577038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors text-sm font-semibold"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
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
