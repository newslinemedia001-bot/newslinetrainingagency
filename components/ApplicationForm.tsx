'use client';

import { useState } from 'react';
import { categories } from '@/lib/categories';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  subcategory: string;
  institution: string;
  course: string;
  yearOfStudy: string;
  availability: string;
  duration: string;
  coverLetter: string;
  consent: boolean;
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    category: '',
    subcategory: '',
    institution: '',
    course: '',
    yearOfStudy: '',
    availability: '',
    duration: '',
    coverLetter: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [flexibleWeeks, setFlexibleWeeks] = useState('');

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset subcategory if category changes
      ...(name === 'category' ? { subcategory: '' } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Prepare duration with flexible weeks if applicable
      const finalDuration = formData.duration === 'Flexible' 
        ? `Flexible (${flexibleWeeks} weeks)` 
        : formData.duration;

      // First, save to Firestore
      const applicationsRef = collection(db, 'applications');
      const docRef = await addDoc(applicationsRef, {
        ...formData,
        duration: finalDuration,
        submittedAt: serverTimestamp(),
        status: 'pending',
      });

      // Then send email notification via API
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          duration: finalDuration,
          applicationId: docRef.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          category: '',
          subcategory: '',
          institution: '',
          course: '',
          yearOfStudy: '',
          availability: '',
          duration: '',
          coverLetter: '',
          consent: false,
        });
        setFlexibleWeeks('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Apply for <span className="text-red-600">Attachment</span>
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we&apos;ll get back to you if an opportunity matches your profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="+254 700 000000"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory (conditional) */}
              {selectedCategory?.subcategories && (
                <div className="md:col-span-2">
                  <label htmlFor="subcategory" className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    required
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  >
                    <option value="">Select a specialization</option>
                    {selectedCategory.subcategories.map((sub, idx) => (
                      <option key={idx} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Institution */}
              <div>
                <label htmlFor="institution" className="block text-sm font-semibold text-gray-700 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  required
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="University/College name"
                />
              </div>

              {/* Course */}
              <div>
                <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">
                  Course/Program *
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="e.g., Computer Science"
                />
              </div>

              {/* Year of Study */}
              <div>
                <label htmlFor="yearOfStudy" className="block text-sm font-semibold text-gray-700 mb-2">
                  Year of Study *
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  required
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-2">
                  Available From *
                </label>
                <input
                  type="date"
                  id="availability"
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                />
              </div>

              {/* Duration */}
              <div className="md:col-span-2">
                <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Duration *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    id="duration"
                    name="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  >
                    <option value="">Select duration</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="Flexible">Flexible (specify weeks)</option>
                  </select>
                  
                  {formData.duration === 'Flexible' && (
                    <input
                      type="number"
                      placeholder="Number of weeks"
                      min="1"
                      max="52"
                      required
                      value={flexibleWeeks}
                      onChange={(e) => setFlexibleWeeks(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    />
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div className="md:col-span-2">
                <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to join this attachment program? *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
                  placeholder="Tell us about yourself, your skills, and why you're interested in this attachment..."
                />
              </div>

              {/* Consent Checkbox */}
              <div className="md:col-span-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to Newsline Training Agency collecting and storing my personal information for the purpose of processing my attachment application. I understand that my data will be handled in accordance with privacy regulations. *
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-green-800">Application submitted successfully!</p>
                  <p className="text-sm text-green-600">We&apos;ll review your application and get back to you soon.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="font-semibold text-red-800">Error submitting application</p>
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
