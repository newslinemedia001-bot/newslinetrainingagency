'use client';

import { useState } from 'react';
import { categories } from '@/lib/categories';
import { Send, Loader2, CheckCircle, Upload, FileText, X, AlertCircle } from 'lucide-react';
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
  cvUrl: string;
  coverLetterUrl: string;
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
    cvUrl: '',
    coverLetterUrl: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [flexibleWeeks, setFlexibleWeeks] = useState('');
  const [uploadingCV, setUploadingCV] = useState(false);
  const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);
  const [cvFileName, setCvFileName] = useState('');
  const [coverLetterFileName, setCoverLetterFileName] = useState('');

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

    // Clear validation errors when user starts fixing them
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const setUploading = type === 'cv' ? setUploadingCV : setUploadingCoverLetter;
    const setFileName = type === 'cv' ? setCvFileName : setCoverLetterFileName;

    setUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'newslinetrainingagency');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlvgrs5vp'}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          [type === 'cv' ? 'cvUrl' : 'coverLetterUrl']: data.secure_url
        }));
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
      setFileName('');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (type: 'cv' | 'coverLetter') => {
    if (type === 'cv') {
      setFormData(prev => ({ ...prev, cvUrl: '' }));
      setCvFileName('');
    } else {
      setFormData(prev => ({ ...prev, coverLetterUrl: '' }));
      setCoverLetterFileName('');
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.fullName.trim()) errors.push('Full Name is required');
    if (!formData.email.trim()) errors.push('Email Address is required');
    if (!formData.phone.trim()) errors.push('Phone Number is required');
    if (!formData.category) errors.push('Category is required');
    if (selectedCategory?.subcategories && !formData.subcategory) errors.push('Specialization is required');
    if (!formData.institution.trim()) errors.push('Institution is required');
    if (!formData.course.trim()) errors.push('Course/Program is required');
    if (!formData.yearOfStudy) errors.push('Year of Study is required');
    if (!formData.availability) errors.push('Available From date is required');
    if (!formData.duration) errors.push('Preferred Duration is required');
    if (formData.duration === 'Flexible' && !flexibleWeeks) errors.push('Number of weeks is required for flexible duration');
    if (!formData.coverLetter.trim()) errors.push('Cover letter is required');
    if (!formData.consent) errors.push('You must consent to data collection');

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setValidationErrors([]);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validate form
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

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
          cvUrl: '',
          coverLetterUrl: '',
          consent: false,
        });
        setCvFileName('');
        setCoverLetterFileName('');
        setFlexibleWeeks('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <section id="apply" className="py-6 bg-gray-50">
      {/* Full Width Header */}
      <div className="w-full bg-black py-12 mb-8 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Apply for <span className="text-red-600">Attachment</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll get back to you if an opportunity matches your profile.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl border border-gray-200">
            
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                  <div className="flex-1">
                    <p className="font-bold text-red-800 mb-2">Please fix the following errors:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-700">{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Section Header */}
              <div className="md:col-span-2 bg-red-600 rounded-lg px-4 py-2 mb-4">
                <h3 className="text-base font-bold text-white">Personal Information</h3>
              </div>

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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="+254 700 000000"
                />
              </div>

              {/* Section Header */}
              <div className="md:col-span-2 bg-red-600 rounded-lg px-4 py-2 mb-4 mt-4">
                <h3 className="text-base font-bold text-white">Attachment Details</h3>
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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                    className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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

              {/* Section Header */}
              <div className="md:col-span-2 bg-red-600 rounded-lg px-4 py-2 mb-4 mt-4">
                <h3 className="text-base font-bold text-white">Academic Background</h3>
              </div>

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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                    className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                      className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
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
                  className="w-full px-4 py-3  border-2 border-gray-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
                  placeholder="Tell us about yourself, your skills, and why you're interested in this attachment..."
                />
              </div>

              {/* CV Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload CV/Resume (Optional - PDF or Word, max 5MB)
                </label>
                <div className="relative">
                  {!formData.cvUrl ? (
                    <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300  hover:border-red-600 transition-colors cursor-pointer bg-gray-50 hover:bg-red-50">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, 'cv')}
                        className="hidden"
                      />
                      {uploadingCV ? (
                        <div className="flex items-center space-x-2 text-red-600">
                          <Loader2 className="animate-spin" size={24} />
                          <span>Uploading {cvFileName}...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2 text-gray-600">
                          <Upload size={32} />
                          <span className="font-semibold">Click to upload your CV</span>
                          <span className="text-xs">PDF, DOC, or DOCX (Optional)</span>
                        </div>
                      )}
                    </label>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 bg-green-50 border-2 border-green-500 ">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle size={20} />
                        <span className="font-semibold">{cvFileName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('cv')}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter Document Upload (Optional) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Cover Letter Document (Optional - PDF or Word, max 5MB)
                </label>
                <div className="relative">
                  {!formData.coverLetterUrl ? (
                    <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300  hover:border-red-600 transition-colors cursor-pointer bg-gray-50 hover:bg-red-50">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, 'coverLetter')}
                        className="hidden"
                      />
                      {uploadingCoverLetter ? (
                        <div className="flex items-center space-x-2 text-red-600">
                          <Loader2 className="animate-spin" size={24} />
                          <span>Uploading {coverLetterFileName}...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2 text-gray-600">
                          <FileText size={32} />
                          <span className="font-semibold">Click to upload cover letter</span>
                          <span className="text-xs">PDF, DOC, or DOCX (Optional)</span>
                        </div>
                      )}
                    </label>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 bg-green-50 border-2 border-green-500 ">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle size={20} />
                        <span className="font-semibold">{coverLetterFileName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('coverLetter')}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>
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
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
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
              <div className="mt-6 p-4 bg-green-50 border border-green-200 flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-green-800">Application submitted successfully!</p>
                  <p className="text-sm text-green-600">We&apos;ll review your application and get back to you soon.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200">
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
