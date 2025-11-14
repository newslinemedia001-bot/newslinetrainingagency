'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  author: string;
  category?: string;
  publishedAt: any;
  seoTitle?: string;
  metaDescription?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postsQuery = query(
          collection(db, 'blog'),
          where('slug', '==', slug),
          where('published', '==', true)
        );
        const snapshot = await getDocs(postsQuery);
        if (!snapshot.empty) {
          const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost;
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-red-600 hover:text-red-700 font-semibold">
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold mb-8">
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>

          {post.featuredImage && (
            <div className="relative w-full h-96 mb-8">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {post.category && (
            <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-bold mb-4">
              {post.category}
            </span>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center space-x-2">
              <User size={20} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={20} />
              <span>{new Date(post.publishedAt?.toDate?.() || new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
