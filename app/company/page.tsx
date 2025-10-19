'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Building2, Users, CheckCircle, XCircle, Mail, Phone, Calendar, FileText, Download } from 'lucide-react';
import Link from 'next/link';

interface Student {
  id: string;
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
  cvUrl?: string;
  coverLetterUrl?: string;
  status: string;
  createdAt: any;
}

export default function CompanyDashboard() {
  const { userProfile } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const companyName = (userProfile as any)?.companyName || userProfile?.name;
      if (!companyName || !userProfile?.approved) {
        setLoading(false);
        return;
      }

      try {
        const studentsQuery = query(
          collection(db, 'applications'),
          where('assignedCompany', '==', companyName)
        );
        const snapshot = await getDocs(studentsQuery);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Student[];
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [userProfile]);

  const handleFeedback = async (studentId: string, decision: 'approved' | 'rejected', feedback: string) => {
    try {
      await updateDoc(doc(db, 'applications', studentId), {
        companyDecision: decision,
        companyFeedback: feedback,
        companyReviewedAt: new Date()
      });
      
      // Refresh list
      const updatedStudents = students.map(s => 
        s.id === studentId 
          ? { ...s, companyDecision: decision, companyFeedback: feedback } 
          : s
      );
      setStudents(updatedStudents as any);
      setSelectedStudent(null);
      alert(`Feedback sent to admin. Status: ${decision}`);
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send feedback');
    }
  };

  // Check if company is approved
  if (userProfile && !userProfile.approved) {
    return (
      <ProtectedRoute allowedRoles={['company']}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="text-yellow-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Pending Approval</h2>
            <p className="text-gray-600 mb-4">
              Your company registration is being reviewed by our admin team. You will receive an email once your account is approved.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Company:</strong> {(userProfile as any).companyName || userProfile.name}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {userProfile.email}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              This usually takes 1-2 business days. Thank you for your patience!
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['company']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-black text-white shadow-sm py-6 mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{(userProfile as any)?.companyName || userProfile?.name}</h1>
                  <p className="text-gray-300 text-sm">Company Dashboard</p>
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
                  <p className="text-gray-600 text-sm font-semibold">Assigned Students</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
                </div>
                <Users className="text-red-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Approved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {students.filter((s: any) => s.companyDecision === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {students.filter((s: any) => !s.companyDecision).length}
                  </p>
                </div>
                <XCircle className="text-yellow-600" size={32} />
              </div>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="mr-2" size={24} />
              Assigned Students
            </h2>

            {loading ? (
              <p className="text-gray-600">Loading students...</p>
            ) : students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">No students assigned yet.</p>
                <p className="text-gray-500 text-sm mt-2">Students will appear here once admin assigns them to your company.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {students.map(student => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-6 hover:border-red-600 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{student.fullName}</h3>
                        <p className="text-sm text-gray-600">{student.institution} - {student.course}</p>
                      </div>
                      {(student as any).companyDecision ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          (student as any).companyDecision === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {(student as any).companyDecision === 'approved' ? 'Approved' : 'Rejected'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          Pending Review
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={16} className="mr-2" />
                        {student.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={16} className="mr-2" />
                        {student.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        Available: {student.availability}
                      </div>
                      <div className="text-sm text-gray-600">
                        Duration: {student.duration}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Applied for:</p>
                      <p className="text-sm text-gray-600">{student.category} - {student.subcategory}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Cover Letter:</p>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{student.coverLetter}</p>
                    </div>

                    {/* Documents Section */}
                    {(student.cvUrl || student.coverLetterUrl) && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <FileText className="mr-2" size={18} />
                          Documents
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {student.cvUrl && (
                            <a
                              href={student.cvUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold"
                            >
                              <Download size={16} />
                              <span>Download CV/Resume</span>
                            </a>
                          )}
                          {student.coverLetterUrl && (
                            <a
                              href={student.coverLetterUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold"
                            >
                              <Download size={16} />
                              <span>Download Cover Letter</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {!(student as any).companyDecision && (
                      <div className="flex space-x-3 pt-4 border-t">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="flex-1 btn-primary text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2"
                        >
                          <CheckCircle size={18} />
                          <span>Review Student</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Review Student</h3>
              <p className="text-gray-700 mb-6">
                <strong>{selectedStudent.fullName}</strong> - {selectedStudent.category}
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    const feedback = prompt('Enter approval message (optional):') || 'Approved for attachment';
                    if (feedback) handleFeedback(selectedStudent.id, 'approved', feedback);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>Approve Student</span>
                </button>

                <button
                  onClick={() => {
                    const feedback = prompt('Enter rejection reason:');
                    if (feedback) handleFeedback(selectedStudent.id, 'rejected', feedback);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <XCircle size={20} />
                  <span>Reject Student</span>
                </button>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-full border-2 border-gray-300 hover:border-gray-400 py-3 rounded-lg font-semibold"
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
