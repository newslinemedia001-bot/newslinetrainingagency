'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Users, Building2, Mail, Send, ArrowRight, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  category: string;
  subcategory?: string;
  institution: string;
  course: string;
  status: 'applied' | 'review' | 'approved' | 'rejected';
  assignedCompany?: string;
  submittedAt: any;
}

interface Company {
  uid: string;
  companyName: string;
  email: string;
  name: string;
}

export default function EnhancedAdminDashboard() {
  const { userProfile } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [messageData, setMessageData] = useState({ subject: '', body: '' });

  useEffect(() => {
    // Fetch applications
    const appsRef = collection(db, 'applications');
    const q = query(appsRef, orderBy('submittedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Application[];
      setApplications(apps);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch companies
    const fetchCompanies = async () => {
      const usersQuery = query(collection(db, 'users'), where('role', '==', 'company'));
      const snapshot = await getDocs(usersQuery);
      const comps = snapshot.docs.map(doc => doc.data() as Company);
      setCompanies(comps);
    };
    fetchCompanies();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'applied' | 'review' | 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'applications', id), { status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAssignCompany = async (appId: string, companyName: string) => {
    try {
      await updateDoc(doc(db, 'applications', appId), {
        assignedCompany: companyName,
        status: 'review'
      });
      setShowAssignModal(false);
      setSelectedApp(null);
      alert(`Student assigned to ${companyName}`);
    } catch (error) {
      console.error('Error assigning company:', error);
      alert('Failed to assign company');
    }
  };

  const handleSendMessage = async () => {
    if (!selectedApp || !messageData.subject || !messageData.body) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Find user by email
      const usersQuery = query(collection(db, 'users'), where('email', '==', selectedApp.email));
      const usersSnapshot = await getDocs(usersQuery);
      
      if (usersSnapshot.empty) {
        alert('User not found. Student may not have created an account yet.');
        return;
      }

      const userId = usersSnapshot.docs[0].id;

      // Create message
      await addDoc(collection(db, 'messages'), {
        from: userProfile?.uid,
        to: userId,
        subject: messageData.subject,
        body: messageData.body,
        createdAt: new Date(),
        read: false
      });

      // TODO: Send email notification here using your email API

      setShowMessageModal(false);
      setMessageData({ subject: '', body: '' });
      setSelectedApp(null);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock className="text-yellow-600" size={18} />;
      case 'review': return <AlertCircle className="text-blue-600" size={18} />;
      case 'approved': return <CheckCircle className="text-green-600" size={18} />;
      case 'rejected': return <XCircle className="text-red-600" size={18} />;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-black text-white shadow-sm py-6 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-300 text-sm">Manage Applications & Users</p>
              </div>
              <Link href="/admin" className="text-white hover:text-red-500 transition-colors">
                Old Dashboard →
              </Link>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-red-600">{applications.length}</div>
              <div className="text-gray-600 text-sm">Total Applications</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-yellow-600">
                {applications.filter(a => a.status === 'applied').length}
              </div>
              <div className="text-gray-600 text-sm">New Applications</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600">
                {applications.filter(a => a.status === 'review').length}
              </div>
              <div className="text-gray-600 text-sm">In Review</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600">
                {applications.filter(a => a.status === 'approved').length}
              </div>
              <div className="text-gray-600 text-sm">Approved</div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">All Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Company</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No applications yet
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{app.fullName}</div>
                          <div className="text-sm text-gray-600">{app.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{app.category}</div>
                          {app.subcategory && <div className="text-xs text-gray-600">{app.subcategory}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusUpdate(app.id, e.target.value as any)}
                            className="text-xs font-semibold px-3 py-1 rounded-full border-0 focus:ring-2 focus:ring-red-500"
                          >
                            <option value="applied">Applied</option>
                            <option value="review">Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          {app.assignedCompany ? (
                            <span className="text-sm text-blue-600 font-semibold">{app.assignedCompany}</span>
                          ) : (
                            <span className="text-sm text-gray-400">Not assigned</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setShowAssignModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Assign to Company"
                            >
                              <Building2 size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setShowMessageModal(true);
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Send Message"
                            >
                              <Mail size={18} />
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

        {/* Assign Company Modal */}
        {showAssignModal && selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Assign to Company</h3>
              <p className="text-gray-700 mb-6">
                <strong>{selectedApp.fullName}</strong> - {selectedApp.category}
              </p>

              {companies.length === 0 ? (
                <p className="text-gray-600 mb-6">No companies registered yet.</p>
              ) : (
                <div className="space-y-2 mb-6">
                  {companies.map(company => (
                    <button
                      key={company.uid}
                      onClick={() => handleAssignCompany(selectedApp.id, company.companyName)}
                      className="w-full text-left p-4 border-2 border-gray-200 hover:border-red-600 rounded-lg transition-colors"
                    >
                      <div className="font-semibold text-gray-900">{company.companyName}</div>
                      <div className="text-sm text-gray-600">{company.email}</div>
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedApp(null);
                }}
                className="w-full border-2 border-gray-300 py-3 rounded-lg font-semibold hover:border-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Send Message Modal */}
        {showMessageModal && selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Send Message</h3>
              <p className="text-gray-700 mb-6">
                To: <strong>{selectedApp.fullName}</strong> ({selectedApp.email})
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={messageData.subject}
                    onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none"
                    placeholder="Enter message subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={messageData.body}
                    onChange={(e) => setMessageData(prev => ({ ...prev, body: e.target.value }))}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none resize-none"
                    placeholder="Enter your message..."
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSendMessage}
                  className="flex-1 btn-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setSelectedApp(null);
                    setMessageData({ subject: '', body: '' });
                  }}
                  className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold hover:border-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
