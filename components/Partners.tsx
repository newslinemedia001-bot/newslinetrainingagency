'use client';

import Image from 'next/image';
import { Building2 } from 'lucide-react';

const partners = [
    {
        name: 'Little Cubs Baby Shop',
        logo: '/partners/littlecubs.png',
    },
    {
        name: 'StarTimes',
        logo: '/partners/startimes.jpg',
    },
    {
        name: 'Cledun Realtors Ltd',
        logo: '/partners/cledun.jpg',
    },
    {
        name: 'Milestone Institute',
        logo: '/partners/milestone.png',
    },
    {
        name: 'Optiven',
        logo: '/partners/optiven.jpeg',
    },
];

export default function Partners() {
    return (
        <section className="py-6 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-2">
                            <Building2 className="text-red-600" size={20} />
                            <span className="text-sm font-semibold text-red-600">Trusted By Industry Leaders</span>
                        </div>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-red-600">Partners</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We collaborate with leading companies across various industries to provide exceptional
                        attachment opportunities and career development programs for our students.
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                    {partners.map((partner, index) => (
                        <div
                            key={partner.name}
                            className="group relative bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative w-full h-24 transition-all duration-300">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Partnership CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-red-600 p-12">
                        <h3 className="text-3xl font-bold text-white mb-4">
                            Become a Partner
                        </h3>
                        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                            Join our network of industry-leading partners and help shape the future workforce.
                            Partner with us to access talented students and build lasting relationships.
                        </p>
                        <a
                            href="/#contact"
                            className="inline-block bg-white text-red-600 px-10 py-4 font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Partner With Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
