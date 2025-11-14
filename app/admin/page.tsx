'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { LogIn, LogOut, Mail, Phone, Calendar, Trash2, Eye, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  category: string;
  subcategory?: string;
  institution: string;
  course: string;
  yearOfStudy: string;
  availability: string;
  duration: string;
  coverLetter: string;
  submittedAt: any;
  status: 'pending' | 'reviewed' | 'contacted';
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user has admin role
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;
          setUserRole(role);
          
          // If user is not admin, sign them out
          if (role !== 'admin') {
            await signOut(auth);
            setUser(null);
            setUserRole(null);
            setError('Access denied. Admin privileges required. Please log in with an admin account.');
            setLoading(false);
            return;
          }
        } else {
          // No user document found, sign them out
          await signOut(auth);
          setUser(null);
          setUserRole(null);
          setError('Admin account not found. Please log in with an admin account.');
          setLoading(false);
          return;
        }
        setUser(user);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && userRole === 'admin') {
      const applicationsRef = collection(db, 'applications');
      const q = query(applicationsRef, orderBy('submittedAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const apps: Application[] = [];
        snapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() } as Application);
        });
        setApplications(apps);
      });

      return () => unsubscribe();
    }
  }, [user, userRole]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success - will be handled by onAuthStateChanged
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password. Make sure you created an admin account.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found. Please create an admin account first.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format');
      } else {
        setError(`Login failed: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteDoc(doc(db, 'applications', id));
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleStatusUpdate = async (id: string, status: 'pending' | 'reviewed' | 'contacted') => {
    try {
      await updateDoc(doc(db, 'applications', id), { status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Category', 'Institution', 'Course', 'Year', 'Availability', 'Duration', 'Status', 'Submitted'];
    const rows = filteredApplications.map(app => [
      app.fullName,
      app.email,
      app.phone,
      `${app.category}${app.subcategory ? ` - ${app.subcategory}` : ''}`,
      app.institution,
      app.course,
      app.yearOfStudy,
      app.availability,
      app.duration,
      app.status,
      app.submittedAt ? format(app.submittedAt.toDate(), 'yyyy-MM-dd HH:mm') : 'N/A'
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user || userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-3xl">N</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Newsline Training Agency</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-red-600">
                  NEWSLINE
                </h1>
                <p className="text-xs text-gray-600">Admin Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Links */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-white text-lg font-bold mb-4">Admin Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/enhanced" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors">
              <div className="text-white font-semibold">Enhanced Admin</div>
              <div className="text-white/70 text-xs mt-1">Assign Students</div>
            </a>
            <a href="/admin/companies" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors">
              <div className="text-white font-semibold">Companies</div>
              <div className="text-white/70 text-xs mt-1">Approve Companies</div>
            </a>
            <a href="/admin/content" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors">
              <div className="text-white font-semibold">Content</div>
              <div className="text-white/70 text-xs mt-1">Gallery & Testimonials</div>
            </a>
            <a href="/admin/blog" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors">
              <div className="text-white font-semibold">Blog</div>
              <div className="text-white/70 text-xs mt-1">Manage Blog Posts</div>
            </a>
            <a href="/" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors">
              <div className="text-white font-semibold">View Site</div>
              <div className="text-white/70 text-xs mt-1">Public Homepage</div>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-red-600">{applications.length}</div>
            <div className="text-gray-600 text-sm">Total Applications</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-yellow-600">
              {applications.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600">
              {applications.filter(a => a.status === 'reviewed').length}
            </div>
            <div className="text-gray-600 text-sm">Reviewed</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600">
              {applications.filter(a => a.status === 'contacted').length}
            </div>
            <div className="text-gray-600 text-sm">Contacted</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
            </select>
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{app.fullName}</div>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <Mail size={14} className="mr-1" />
                            {app.email}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center mt-1">
                            <Phone size={14} className="mr-1" />
                            {app.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{app.category}</div>
                        {app.subcategory && (
                          <div className="text-sm text-gray-600">{app.subcategory}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{app.institution}</div>
                        <div className="text-sm text-gray-600">{app.course}</div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusUpdate(app.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            app.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : app.status === 'reviewed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {app.submittedAt ? format(app.submittedAt.toDate(), 'MMM dd, yyyy') : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-red-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedApp.fullName}</h2>
                  <p className="text-white/90 mt-1">{selectedApp.email}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Phone</h3>
                  <p className="text-gray-900">{selectedApp.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Category</h3>
                  <p className="text-gray-900">{selectedApp.category}</p>
                </div>
                {selectedApp.subcategory && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Subcategory</h3>
                    <p className="text-gray-900">{selectedApp.subcategory}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Institution</h3>
                  <p className="text-gray-900">{selectedApp.institution}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Course</h3>
                  <p className="text-gray-900">{selectedApp.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Year of Study</h3>
                  <p className="text-gray-900">{selectedApp.yearOfStudy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Available From</h3>
                  <p className="text-gray-900">{selectedApp.availability}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Duration</h3>
                  <p className="text-gray-900">{selectedApp.duration}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Cover Letter</h3>
                <div className="bg-gray-50 rounded-xl p-4 text-gray-900 whitespace-pre-wrap">
                  {selectedApp.coverLetter}
                </div>
              </div>

              <div className="pt-4 border-t flex space-x-3">
                <a
                  href={`mailto:${selectedApp.email}`}
                  className="flex-1 btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                >
                  <Mail size={18} />
                  <span>Send Email</span>
                </a>
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="flex-1 border-2 border-red-600 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone size={18} />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
