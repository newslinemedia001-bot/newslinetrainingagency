'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FileText, Upload, Loader2, Trash2, Edit, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SEOAnalyzer from '@/components/SEOAnalyzer';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Newsline Team',
    category: '',
    published: true,
    seoTitle: '',
    metaDescription: '',
    focusKeyword: ''
  });

  const blogCategories = [
    'Media Training',
    'IT & Technology',
    'Career Tips',
    'Industry News',
    'Student Success',
    'Attachment Guide',
    'Skills Development'
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'blog'));
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seoTitle: title
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'newslinetrainingagency');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlvgrs5vp'}/image/upload`,
        { method: 'POST', body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, featuredImage: data.secure_url }));
      }
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      alert('Title and content are required');
      return;
    }

    try {
      if (editingPost) {
        await updateDoc(doc(db, 'blog', editingPost.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'blog'), {
          ...formData,
          publishedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        });
      }
      
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        author: 'Newsline Team',
        published: true,
        seoTitle: '',
        metaDescription: '',
        focusKeyword: ''
      });
      setShowEditor(false);
      setEditingPost(null);
      fetchPosts();
      alert(editingPost ? 'Post updated!' : 'Post published!');
    } catch (error) {
      alert('Failed to save post');
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImage: post.featuredImage || '',
      author: post.author || 'Newsline Team',
      category: post.category || '',
      published: post.published,
      seoTitle: post.seoTitle || '',
      metaDescription: post.metaDescription || '',
      focusKeyword: post.focusKeyword || ''
    });
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this post?')) {
      await deleteDoc(doc(db, 'blog', id));
      fetchPosts();
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-black text-white shadow-sm py-6 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Blog Management</h1>
                <p className="text-gray-300 text-sm">Create and manage blog posts</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setShowEditor(!showEditor);
                    setEditingPost(null);
                    setFormData({
                      title: '',
                      slug: '',
                      excerpt: '',
                      content: '',
                      featuredImage: '',
                      author: 'Newsline Team',
                      category: '',
                      published: true,
                      seoTitle: '',
                      metaDescription: '',
                      focusKeyword: ''
                    });
                  }}
                  className="bg-red-600 text-white px-6 py-2 font-bold hover:bg-red-700 transition-colors"
                >
                  {showEditor ? 'Cancel' : '+ New Post'}
                </button>
                <Link href="/admin" className="text-white hover:text-red-500 transition-colors">
                  ← Back to Admin
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showEditor && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Main Editor */}
              <div className="lg:col-span-2 bg-white shadow-md p-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold mb-6">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
                
                <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">URL Slug (auto-generated)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none bg-gray-50"
                    placeholder="url-slug"
                  />
                  <p className="text-sm text-gray-500 mt-1">URL: /blog/{formData.slug || 'your-post-slug'}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Featured Image</label>
                  {!formData.featuredImage ? (
                    <label className="flex items-center justify-center w-full px-4 py-12 border-2 border-dashed border-gray-300 hover:border-red-600 transition-colors cursor-pointer">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      {uploading ? (
                        <Loader2 className="animate-spin text-red-600" size={32} />
                      ) : (
                        <div className="text-center">
                          <Upload size={32} className="mx-auto mb-2" />
                          <span>Upload Featured Image</span>
                        </div>
                      )}
                    </label>
                  ) : (
                    <div className="relative w-full h-64">
                      <Image src={formData.featuredImage} alt="Featured" fill className="object-cover" />
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                  >
                    <option value="">Select category</option>
                    {blogCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none resize-none"
                    placeholder="Brief description for blog listing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Content *</label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    modules={modules}
                    className="bg-white"
                    style={{ height: '400px', marginBottom: '50px' }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-semibold">Publish immediately</span>
                    </label>
                  </div>
                </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-red-600 text-white py-4 font-bold hover:bg-red-700 transition-colors"
                  >
                    {editingPost ? 'Update Post' : 'Publish Post'}
                  </button>
                </div>
              </div>

              {/* SEO Analyzer Sidebar */}
              <div className="lg:col-span-1">
                <SEOAnalyzer
                  title={formData.title}
                  seoTitle={formData.seoTitle}
                  metaDescription={formData.metaDescription}
                  slug={formData.slug}
                  content={formData.content}
                  focusKeyword={formData.focusKeyword}
                  onFocusKeywordChange={(keyword) => setFormData(prev => ({ ...prev, focusKeyword: keyword }))}
                  onSeoTitleChange={(title) => setFormData(prev => ({ ...prev, seoTitle: title }))}
                  onMetaDescriptionChange={(desc) => setFormData(prev => ({ ...prev, metaDescription: desc }))}
                />
              </div>
            </div>
          )}

          {/* Posts List */}
          <div className="bg-white shadow-md p-8 border-2 border-gray-200">
            <h2 className="text-2xl font-bold mb-6">All Posts ({posts.length})</h2>
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="flex items-center justify-between p-4 border-2 border-gray-200 hover:border-red-600 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    {post.featuredImage && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <p className="text-sm text-gray-600">/blog/{post.slug}</p>
                      <span className={`text-xs px-2 py-1 ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-700 p-2">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-700 p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
