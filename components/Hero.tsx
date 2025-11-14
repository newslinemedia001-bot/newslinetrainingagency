'use client';

import { ArrowRight, Award, Users, Briefcase, TrendingUp, CheckCircle, Building2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative bg-white overflow-hidden pt-0">


        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-8 lg:py-12">
            {/* Trust Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-red-50 border-2 border-red-200 rounded-full px-10 py-4">
                <Award className="text-red-600" size={28} />
                <span className="text-lg font-bold text-red-600">Kenya&apos;s Leading Training Agency</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left animate-fade-in">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-tight">
                  Newsline Media & Training Agency
                </h1>
                <div className="bg-red-600 text-white px-8 py-6 mb-6 shadow-lg inline-block">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                    Kenya&apos;s Leading Media, PR, IT Attachment Placement Center
                  </h2>
                </div>

                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Join our comprehensive attachment programs across <span className="font-semibold text-red-600">Media, IT, Film Production</span>,
                  and various other exciting fields. Whether you&apos;re a student seeking real-world experience
                  or a company looking for talented attachment students and partnership opportunities.
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">Industry-Ready Skills</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">10+ Partner Companies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">Certified Programs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                    <span className="text-gray-700 font-medium">Career Placement Support</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/#apply"
                    className="btn-primary text-white px-10 py-5 font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-lg"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight size={22} />
                  </Link>
                  <Link
                    href="/#categories"
                    className="bg-white text-gray-800 px-10 py-5 font-bold text-lg hover:bg-red-600 hover:text-white transition-all shadow-lg"
                  >
                    Explore Programs
                  </Link>
                </div>
              </div>

              {/* Right Column - Mission Statement */}
              <div className="relative">
                <div className="bg-white shadow-2xl p-8 border-l-4 border-blue-600">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-40 h-40 overflow-hidden flex-shrink-0 mb-4 shadow-lg">
                      <Image
                        src="/director.png"
                        alt="Faith Mukundi - Managing Director"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Mission Statement</h3>
                      <p className="text-sm text-blue-600 font-semibold">From the Director — Faith Mukundi</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      At Newsline Media and Training Agency, our mission is to bridge the gap between learning and industry by offering practical, hands-on attachment opportunities in both media and information technology. We believe true mastery comes through experience — that&apos;s why our approach blends classroom instruction with real-world exposure to ensure our trainees are fully prepared for the job market.
                    </p>
                    
                    <p>
                      We are dedicated to nurturing creative and tech-driven minds who can tell impactful stories, manage modern communication tools, and adapt to the fast-changing digital landscape. Through strong partnerships with leading media houses, IT firms, and corporate organizations, we provide our students with meaningful attachment placements that build confidence, competence, and character.
                    </p>
                    
                    <p>
                      At Newsline Media and Training Agency, we don&apos;t just train — we connect talent to opportunity, shaping professionals who are ready to inform, innovate, and inspire change in their communities and beyond.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-900 font-bold">— Faith Mukundi</p>
                    <p className="text-sm text-gray-600">Managing Director, Newsline Media and Training Agency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Briefcase className="text-white" size={40} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">8+</div>
              <div className="text-gray-300 font-medium">Industry Categories</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Building2 className="text-white" size={40} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-300 font-medium">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Users className="text-white" size={40} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300 font-medium">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Award className="text-white" size={40} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
