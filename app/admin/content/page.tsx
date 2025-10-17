'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Image as ImageIcon, MessageSquare, Upload, Loader2, Trash2, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'testimonials'>('gallery');
  const [uploading, setUploading] = useState(false);
  
  // Gallery states
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [galleryForm, setGalleryForm] = useState({ title: '', description: '', category: '', imageUrl: '', published: true });
  const [uploadedImageName, setUploadedImageName] = useState('');
  
  // Testimonials states
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', company: '', testimonial: '', rating: 5, imageUrl: '', published: true });
  const [uploadedTestimonialImageName, setUploadedTestimonialImageName] = useState('');

  useEffect(() => {
    fetchGallery();
    fetchTestimonials();
  }, []);

  const fetchGallery = async () => {
    const snapshot = await getDocs(collection(db, 'gallery'));
    setGalleryItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchTestimonials = async () => {
    const snapshot = await getDocs(collection(db, 'testimonials'));
    setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'testimonial') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    const setFileName = type === 'gallery' ? setUploadedImageName : setUploadedTestimonialImageName;
    setFileName(file.name);

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
        if (type === 'gallery') {
          setGalleryForm(prev => ({ ...prev, imageUrl: data.secure_url }));
        } else {
          setTestimonialForm(prev => ({ ...prev, imageUrl: data.secure_url }));
        }
      }
    } catch (error) {
      alert('Failed to upload image');
      setFileName('');
    } finally {
      setUploading(false);
    }
  };

  const handleAddGallery = async () => {
    if (!galleryForm.title || !galleryForm.imageUrl) {
      alert('Title and image are required');
      return;
    }

    try {
      await addDoc(collection(db, 'gallery'), {
        ...galleryForm,
        createdAt: new Date()
      });
      setGalleryForm({ title: '', description: '', category: '', imageUrl: '', published: true });
      setUploadedImageName('');
      fetchGallery();
      alert('Gallery item added!');
    } catch (error) {
      alert('Failed to add gallery item');
    }
  };

  const handleAddTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.testimonial) {
      alert('Name and testimonial are required');
      return;
    }

    try {
      await addDoc(collection(db, 'testimonials'), {
        ...testimonialForm,
        createdAt: new Date()
      });
      setTestimonialForm({ name: '', role: '', company: '', testimonial: '', rating: 5, imageUrl: '', published: true });
      setUploadedTestimonialImageName('');
      fetchTestimonials();
      alert('Testimonial added!');
    } catch (error) {
      alert('Failed to add testimonial');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (confirm('Delete this gallery item?')) {
      await deleteDoc(doc(db, 'gallery', id));
      fetchGallery();
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm('Delete this testimonial?')) {
      await deleteDoc(doc(db, 'testimonials', id));
      fetchTestimonials();
    }
  };

  const togglePublish = async (id: string, published: boolean, type: 'gallery' | 'testimonial') => {
    const collection_name = type === 'gallery' ? 'gallery' : 'testimonials';
    await updateDoc(doc(db, collection_name, id), { published: !published });
    type === 'gallery' ? fetchGallery() : fetchTestimonials();
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-black text-white shadow-sm py-6 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Content Management</h1>
                <p className="text-gray-300 text-sm">Manage Gallery & Testimonials</p>
              </div>
              <Link href="/admin" className="text-white hover:text-red-500 transition-colors">
                ← Back to Admin
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'gallery' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="inline mr-2" size={20} />
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'testimonials' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="inline mr-2" size={20} />
              Testimonials
            </button>
          </div>

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-4">Add Gallery Image</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Image *</label>
                      {!galleryForm.imageUrl ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-red-600 transition-colors">
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} className="hidden" />
                          {uploading ? <Loader2 className="animate-spin text-red-600" size={32} /> : <><Upload size={32} /><span className="text-sm mt-2">{uploadedImageName || 'Upload Image'}</span></>}
                        </label>
                      ) : (
                        <div className="relative w-full h-32">
                          <Image src={galleryForm.imageUrl} alt="Preview" fill className="object-cover rounded-lg" />
                          <button onClick={() => { setGalleryForm(prev => ({ ...prev, imageUrl: '' })); setUploadedImageName(''); }} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <input type="text" placeholder="Title *" value={galleryForm.title} onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Description" value={galleryForm.description} onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Category" value={galleryForm.category} onChange={(e) => setGalleryForm(prev => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={galleryForm.published} onChange={(e) => setGalleryForm(prev => ({ ...prev, published: e.target.checked }))} className="w-4 h-4" />
                      <span className="text-sm">Publish immediately</span>
                    </label>
                    <button onClick={handleAddGallery} className="w-full btn-primary text-white py-2 rounded-lg">Add to Gallery</button>
                  </div>
                </div>
              </div>

              {/* Gallery List */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="relative w-full h-48">
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        {item.category && <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs rounded mt-2">{item.category}</span>}
                        <div className="flex items-center justify-between mt-4">
                          <button onClick={() => togglePublish(item.id, item.published, 'gallery')} className={`text-sm font-semibold ${item.published ? 'text-green-600' : 'text-gray-500'}`}>
                            {item.published ? 'Published' : 'Draft'}
                          </button>
                          <button onClick={() => handleDeleteGallery(item.id)} className="text-red-600 hover:text-red-700"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-4">Add Testimonial</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Photo (Optional)</label>
                      {!testimonialForm.imageUrl ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-red-600 transition-colors">
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'testimonial')} className="hidden" />
                          {uploading ? <Loader2 className="animate-spin text-red-600" size={32} /> : <><Upload size={32} /><span className="text-sm mt-2">{uploadedTestimonialImageName || 'Upload Photo'}</span></>}
                        </label>
                      ) : (
                        <div className="relative w-full h-32">
                          <Image src={testimonialForm.imageUrl} alt="Preview" fill className="object-cover rounded-lg" />
                          <button onClick={() => { setTestimonialForm(prev => ({ ...prev, imageUrl: '' })); setUploadedTestimonialImageName(''); }} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <input type="text" placeholder="Name *" value={testimonialForm.name} onChange={(e) => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Role" value={testimonialForm.role} onChange={(e) => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Company" value={testimonialForm.company} onChange={(e) => setTestimonialForm(prev => ({ ...prev, company: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" />
                    <textarea placeholder="Testimonial *" value={testimonialForm.testimonial} onChange={(e) => setTestimonialForm(prev => ({ ...prev, testimonial: e.target.value }))} rows={4} className="w-full px-4 py-2 border rounded-lg resize-none" />
                    <div>
                      <label className="block text-sm font-semibold mb-2">Rating</label>
                      <select value={testimonialForm.rating} onChange={(e) => setTestimonialForm(prev => ({ ...prev, rating: Number(e.target.value) }))} className="w-full px-4 py-2 border rounded-lg">
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={testimonialForm.published} onChange={(e) => setTestimonialForm(prev => ({ ...prev, published: e.target.checked }))} className="w-4 h-4" />
                      <span className="text-sm">Publish immediately</span>
                    </label>
                    <button onClick={handleAddTestimonial} className="w-full btn-primary text-white py-2 rounded-lg">Add Testimonial</button>
                  </div>
                </div>
              </div>

              {/* Testimonials List */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {testimonials.map(item => (
                    <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start space-x-4">
                        {item.imageUrl && (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.role} {item.company && `at ${item.company}`}</p>
                          <p className="text-sm text-gray-700 mt-2">&quot;{item.testimonial}&quot;</p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-yellow-500">{'⭐'.repeat(item.rating)}</span>
                            <div className="flex items-center space-x-4">
                              <button onClick={() => togglePublish(item.id, item.published, 'testimonial')} className={`text-sm font-semibold ${item.published ? 'text-green-600' : 'text-gray-500'}`}>
                                {item.published ? 'Published' : 'Draft'}
                              </button>
                              <button onClick={() => handleDeleteTestimonial(item.id)} className="text-red-600 hover:text-red-700"><Trash2 size={18} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
