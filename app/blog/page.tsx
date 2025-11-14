'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category?: string;
  publishedAt: any;
  published: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, 'blog'),
          where('published', '==', true)
        );
        const snapshot = await getDocs(postsQuery);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        // Sort by publishedAt in JavaScript instead
        data.sort((a, b) => {
          const dateA = a.publishedAt?.toDate?.() || new Date(0);
          const dateB = b.publishedAt?.toDate?.() || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Blog</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tips, and stories from the world of media and IT training
            </p>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-red-600 group"
                >
                  {post.featuredImage && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold mb-3">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{new Date(post.publishedAt?.toDate?.() || new Date()).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-red-600 font-semibold mt-4 group-hover:translate-x-2 transition-transform">
                      <span>Read more</span>
                      <ArrowRight size={18} className="ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
