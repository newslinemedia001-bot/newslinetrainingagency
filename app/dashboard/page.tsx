'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FileText, Mail, Clock, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: string;
  fullName: string;
  email: string;
  category: string;
  subcategory: string;
  status: 'applied' | 'review' | 'approved' | 'rejected';
  createdAt: any;
  assignedCompany?: string;
}

interface Message {
  id: string;
  subject: string;
  body: string;
  createdAt: any;
  read: boolean;
}

export default function StudentDashboard() {
  const { userProfile } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userProfile) return;

      try {
        // Fetch applications
        const appsQuery = query(
          collection(db, 'applications'),
          where('email', '==', userProfile.email),
          orderBy('createdAt', 'desc')
        );
        const appsSnapshot = await getDocs(appsQuery);
        const appsData = appsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Application[];
        setApplications(appsData);

        // Fetch messages
        const messagesQuery = query(
          collection(db, 'messages'),
          where('to', '==', userProfile.uid),
          orderBy('createdAt', 'desc')
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesData = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userProfile]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="text-yellow-600" size={20} />;
      case 'review':
        return <AlertCircle className="text-blue-600" size={20} />;
      case 'approved':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-black text-white shadow-sm py-6 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Welcome, {userProfile?.name}!</h1>
                  <p className="text-gray-300 text-sm">Student Dashboard</p>
                </div>
              </div>
              <Link href="/" className="text-white hover:text-red-500 transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{applications.length}</p>
                </div>
                <FileText className="text-red-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Unread Messages</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {messages.filter(m => !m.read).length}
                  </p>
                </div>
                <Mail className="text-blue-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Approved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {applications.filter(a => a.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Applications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2" size={24} />
                My Applications
              </h2>

              {loading ? (
                <p className="text-gray-600">Loading applications...</p>
              ) : applications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven&apos;t submitted any applications yet.</p>
                  <Link 
                    href="/#apply"
                    className="btn-primary text-white px-6 py-2 rounded-full inline-block"
                  >
                    Apply Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map(app => (
                    <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-600 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{app.category}</h3>
                          <p className="text-sm text-gray-600">{app.subcategory}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Applied: {new Date(app.createdAt?.seconds * 1000).toLocaleDateString()}
                      </p>
                      {app.assignedCompany && (
                        <p className="text-xs text-blue-600 mt-1">
                          Assigned to: {app.assignedCompany}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="mr-2" size={24} />
                Messages
              </h2>

              {loading ? (
                <p className="text-gray-600">Loading messages...</p>
              ) : messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No messages yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`border rounded-lg p-4 ${message.read ? 'border-gray-200' : 'border-red-600 bg-red-50'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                        {!message.read && (
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{message.body}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.createdAt?.seconds * 1000).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
